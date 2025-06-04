import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/events - List all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST /api/events - Create a new event
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const event = await prisma.event.create({
      data: {
        name: data.name,
        description: data.description,
        date: new Date(data.date),
        venue: data.venue,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
} 