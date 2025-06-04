import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/payments - List all payments
export async function GET() {
  try {
    const payments = await prisma.payment.findMany({ orderBy: { createdAt: 'desc' }, include: { event: true, client: true } });
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

// POST /api/payments - Create a new payment
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const payment = await prisma.payment.create({ data });
    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}

// PUT /api/payments - Update a payment
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const payment = await prisma.payment.update({ where: { id: data.id }, data });
    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
  }
}

// DELETE /api/payments - Delete a payment
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.payment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete payment' }, { status: 500 });
  }
} 