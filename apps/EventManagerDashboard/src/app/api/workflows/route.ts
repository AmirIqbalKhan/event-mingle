import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/workflows - List all workflows
export async function GET() {
  try {
    const workflows = await prisma.workflow.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(workflows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workflows' }, { status: 500 });
  }
}

// POST /api/workflows - Create a new workflow
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const workflow = await prisma.workflow.create({ data });
    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workflow' }, { status: 500 });
  }
}

// PUT /api/workflows - Update a workflow
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const workflow = await prisma.workflow.update({ where: { id: data.id }, data });
    return NextResponse.json(workflow);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update workflow' }, { status: 500 });
  }
}

// DELETE /api/workflows - Delete a workflow
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.workflow.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete workflow' }, { status: 500 });
  }
} 