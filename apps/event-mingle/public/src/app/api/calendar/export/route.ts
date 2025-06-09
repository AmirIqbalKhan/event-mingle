import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { events } = await request.json();

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Get the user's Google Calendar access token from the database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { googleAccessToken: true },
    });

    if (!user?.googleAccessToken) {
      return NextResponse.json(
        { error: 'Google Calendar not connected' },
        { status: 400 }
      );
    }

    oauth2Client.setCredentials({
      access_token: user.googleAccessToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Create events in Google Calendar
    const createdEvents = await Promise.all(
      events.map(async (event: any) => {
        const response = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: event,
        });
        return response.data;
      })
    );

    return NextResponse.json({ events: createdEvents });
  } catch (error) {
    console.error('Error exporting to Google Calendar:', error);
    return NextResponse.json(
      { error: 'Failed to export to Google Calendar' },
      { status: 500 }
    );
  }
} 