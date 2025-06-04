import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/analytics - List all analytics
export async function GET() {
  try {
    const analytics = await prisma.analytics.findMany({ orderBy: { createdAt: 'desc' }, include: { event: true } });
    return NextResponse.json(analytics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

// POST /api/analytics - Create a new analytics record
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const analytics = await prisma.analytics.create({ data });
    return NextResponse.json(analytics, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create analytics' }, { status: 500 });
  }
}

// PUT /api/analytics - Update an analytics record
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const analytics = await prisma.analytics.update({ where: { id: data.id }, data });
    return NextResponse.json(analytics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update analytics' }, { status: 500 });
  }
}

// DELETE /api/analytics - Delete an analytics record
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.analytics.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete analytics' }, { status: 500 });
  }
} 