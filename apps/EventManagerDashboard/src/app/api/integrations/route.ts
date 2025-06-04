import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/integrations - List all integrations
export async function GET() {
  try {
    const integrations = await prisma.integration.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(integrations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 });
  }
}

// POST /api/integrations - Create a new integration
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const integration = await prisma.integration.create({ data });
    return NextResponse.json(integration, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create integration' }, { status: 500 });
  }
}

// PUT /api/integrations - Update an integration
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const integration = await prisma.integration.update({ where: { id: data.id }, data });
    return NextResponse.json(integration);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update integration' }, { status: 500 });
  }
}

// DELETE /api/integrations - Delete an integration
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.integration.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete integration' }, { status: 500 });
  }
} 