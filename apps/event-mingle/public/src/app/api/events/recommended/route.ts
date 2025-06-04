import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's interests and preferences
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        interests: true,
        location: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get recommended events based on user's interests and location
    const recommendedEvents = await prisma.event.findMany({
      where: {
        AND: [
          {
            category: {
              in: user.interests,
            },
          },
          {
            date: {
              gt: new Date(),
            },
          },
          {
            capacity: {
              gt: 0,
            },
          },
        ],
      },
      include: {
        location: true,
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: 20,
    });

    // Format the response
    const formattedEvents = recommendedEvents.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      location: event.location,
      images: event.images || [],
      category: event.category,
      price: event.price,
      capacity: event.capacity,
      currentAttendees: event._count.attendees,
    }));

    return NextResponse.json(formattedEvents);
  } catch (error) {
    console.error('Error fetching recommended events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommended events' },
      { status: 500 }
    );
  }
} 