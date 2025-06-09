import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { eventId, direction } = await request.json();

    if (!eventId || !direction) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (direction === 'right') {
      // Add event to user's interests
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          events: {
            connect: { id: eventId },
          },
        },
      });

      // Create a chat for the event if it doesn't exist
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { chats: true },
      });

      if (event && event.chats.length === 0) {
        await prisma.chat.create({
          data: {
            type: 'group',
            name: `${event.title} Chat`,
            event: {
              connect: { id: eventId },
            },
            users: {
              connect: { id: session.user.id },
            },
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing swipe:', error);
    return NextResponse.json(
      { error: 'Failed to process swipe' },
      { status: 500 }
    );
  }
} 