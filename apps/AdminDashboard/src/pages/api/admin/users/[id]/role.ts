import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'admin') return res.status(403).end();

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const { role } = req.body;
    if (!['user', 'manager', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role' });
    // If you get a type error here, run `npx prisma generate` to update types.
    await prisma.user.update({ where: { id: id as string }, data: { role } as any });
    return res.status(200).json({ message: 'Role updated' });
  }
  return res.status(405).end();
} 