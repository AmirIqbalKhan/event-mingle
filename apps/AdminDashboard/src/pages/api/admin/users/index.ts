import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'admin') return res.status(403).end();

  if (req.method === 'GET') {
    // If you get a type error here, run `npx prisma generate` to update types.
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } as any });
    return res.status(200).json({ users });
  }
  return res.status(405).end();
} 