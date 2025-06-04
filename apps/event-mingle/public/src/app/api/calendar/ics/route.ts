import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import ical from 'ical-generator';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { events } = await request.json();

    const calendar = ical({
      name: 'EventMingle Events',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    events.forEach((event: any) => {
      calendar.createEvent({
        start: new Date(event.start),
        end: new Date(event.end),
        summary: event.title,
        description: event.description,
        location: event.location,
      });
    });

    const icsContent = calendar.toString();

    return new NextResponse(icsContent, {
      headers: {
        'Content-Type': 'text/calendar',
        'Content-Disposition': 'attachment; filename=events.ics',
      },
    });
  } catch (error) {
    console.error('Error generating ICS file:', error);
    return NextResponse.json(
      { error: 'Failed to generate ICS file' },
      { status: 500 }
    );
  }
} 