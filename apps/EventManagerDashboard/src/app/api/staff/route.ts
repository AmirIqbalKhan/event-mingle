import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/staff - List all staff
export async function GET() {
  try {
    const staff = await prisma.staff.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

// POST /api/staff - Create a new staff member
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const staff = await prisma.staff.create({ data });
    return NextResponse.json(staff, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create staff' }, { status: 500 });
  }
}

// PUT /api/staff - Update a staff member
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const staff = await prisma.staff.update({ where: { id: data.id }, data });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update staff' }, { status: 500 });
  }
}

// DELETE /api/staff - Delete a staff member
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.staff.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete staff' }, { status: 500 });
  }
} 