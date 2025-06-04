import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const chats = await prisma.chat.findMany({
      where: {
        participants: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        event: true,
        participants: true,
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          include: {
            sender: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 