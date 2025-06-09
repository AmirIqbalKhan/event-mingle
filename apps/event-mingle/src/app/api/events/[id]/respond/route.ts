import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { action } = await request.json();
    if (!['accept', 'decline'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if user has already responded to this event
    const existingResponse = await prisma.eventParticipant.findFirst({
      where: {
        eventId: params.id,
        userId: session.user.id,
      },
    });

    if (existingResponse) {
      return NextResponse.json(
        { error: 'You have already responded to this event' },
        { status: 400 }
      );
    }

    // Create event participant record
    await prisma.eventParticipant.create({
      data: {
        eventId: params.id,
        userId: session.user.id,
        status: action === 'accept' ? 'accepted' : 'declined',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error responding to event:', error);
    return NextResponse.json(
      { error: 'Failed to respond to event' },
      { status: 500 }
    );
  }
} 