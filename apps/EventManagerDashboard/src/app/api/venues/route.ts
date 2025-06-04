import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/venues - List all venues
export async function GET() {
  try {
    const venues = await prisma.venue.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(venues);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
  }
}

// POST /api/venues - Create a new venue
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const venue = await prisma.venue.create({ data });
    return NextResponse.json(venue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create venue' }, { status: 500 });
  }
}

// PUT /api/venues - Update a venue
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const venue = await prisma.venue.update({ where: { id: data.id }, data });
    return NextResponse.json(venue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update venue' }, { status: 500 });
  }
}

// DELETE /api/venues - Delete a venue
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.venue.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete venue' }, { status: 500 });
  }
} 