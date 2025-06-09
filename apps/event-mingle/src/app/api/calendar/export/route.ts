import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  // Example usage of prisma
  // const user = await prisma.user.findUnique({ where: { id: 'some-id' } });
  return new Response(JSON.stringify({ message: 'Google Calendar export coming soon.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 