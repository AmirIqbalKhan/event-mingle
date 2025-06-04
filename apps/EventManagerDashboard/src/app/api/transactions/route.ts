import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/transactions - List all transactions
export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, include: { event: true } });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

// POST /api/transactions - Create a new transaction
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const transaction = await prisma.transaction.create({ data });
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

// PUT /api/transactions - Update a transaction
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const transaction = await prisma.transaction.update({ where: { id: data.id }, data });
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

// DELETE /api/transactions - Delete a transaction
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.transaction.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
} 