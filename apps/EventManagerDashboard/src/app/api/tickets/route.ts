import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/tickets - List all tickets
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({ orderBy: { createdAt: 'desc' }, include: { event: true, client: true } });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

// POST /api/tickets - Create a new ticket
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const ticket = await prisma.ticket.create({ data });
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}

// PUT /api/tickets - Update a ticket
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const ticket = await prisma.ticket.update({ where: { id: data.id }, data });
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}

// DELETE /api/tickets - Delete a ticket
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.ticket.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
  }
} 