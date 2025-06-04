import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/communications - List all communications
export async function GET() {
  try {
    const communications = await prisma.communication.findMany({ orderBy: { createdAt: 'desc' }, include: { event: true } });
    return NextResponse.json(communications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch communications' }, { status: 500 });
  }
}

// POST /api/communications - Create a new communication
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const communication = await prisma.communication.create({ data });
    return NextResponse.json(communication, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create communication' }, { status: 500 });
  }
}

// PUT /api/communications - Update a communication
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const communication = await prisma.communication.update({ where: { id: data.id }, data });
    return NextResponse.json(communication);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update communication' }, { status: 500 });
  }
}

// DELETE /api/communications - Delete a communication
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.communication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete communication' }, { status: 500 });
  }
} 