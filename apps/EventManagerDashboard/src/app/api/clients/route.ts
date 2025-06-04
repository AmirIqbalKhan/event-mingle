import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/clients - List all clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

// POST /api/clients - Create a new client
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await prisma.client.create({ data });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}

// PUT /api/clients - Update a client
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await prisma.client.update({ where: { id: data.id }, data });
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

// DELETE /api/clients - Delete a client
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
} 