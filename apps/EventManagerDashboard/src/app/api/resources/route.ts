import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/resources - List all resources
export async function GET() {
  try {
    const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' }, include: { event: true } });
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

// POST /api/resources - Create a new resource
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const resource = await prisma.resource.create({ data });
    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}

// PUT /api/resources - Update a resource
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const resource = await prisma.resource.update({ where: { id: data.id }, data });
    return NextResponse.json(resource);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
  }
}

// DELETE /api/resources - Delete a resource
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.resource.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
  }
} 