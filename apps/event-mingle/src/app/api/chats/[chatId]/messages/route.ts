import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get('cursor');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Verify user is part of the chat
    const chat = await prisma.chat.findFirst({
      where: {
        id: params.chatId,
        participants: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!chat) {
      return new NextResponse('Chat not found', { status: 404 });
    }

    // Fetch messages
    const messages = await prisma.message.findMany({
      where: {
        chatId: params.chatId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit + 1,
      ...(cursor
        ? {
            cursor: {
              id: cursor,
            },
            skip: 1,
          }
        : {}),
    });

    // Mark unread messages as read
    await prisma.message.updateMany({
      where: {
        chatId: params.chatId,
        senderId: {
          not: session.user.id,
        },
        read: false,
      },
      data: {
        read: true,
      },
    });

    const hasMore = messages.length > limit;
    const messagesToReturn = hasMore ? messages.slice(0, -1) : messages;

    return NextResponse.json({
      messages: messagesToReturn,
      nextCursor: hasMore ? messagesToReturn[messagesToReturn.length - 1].id : null,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { content } = body;

    if (!content) {
      return new NextResponse('Message content is required', { status: 400 });
    }

    // Verify user is part of the chat
    const chat = await prisma.chat.findFirst({
      where: {
        id: params.chatId,
        participants: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!chat) {
      return new NextResponse('Chat not found', { status: 404 });
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content,
        chatId: params.chatId,
        senderId: session.user.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Update chat's lastMessageAt
    await prisma.chat.update({
      where: {
        id: params.chatId,
      },
      data: {
        lastMessageAt: new Date(),
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 