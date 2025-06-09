import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { initSocket } from '@/server/socket';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!io) {
      const server = new NetServer();
      io = initSocket(server);
      server.listen(3001);
    }

    return new NextResponse('Socket server initialized', { status: 200 });
  } catch (error) {
    console.error('Error initializing socket server:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 