import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export const initSocket = (server: NetServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  // Store connected users
  const connectedUsers = new Map<string, string>();

  io.use(async (socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error('Authentication error'));
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.data.userId = userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.userId;
    connectedUsers.set(userId, socket.id);

    // Join chat room
    socket.on('join-chat', async (chatId: string) => {
      try {
        const chat = await prisma.chat.findFirst({
          where: {
            id: chatId,
            participants: {
              some: {
                userId,
              },
            },
          },
        });

        if (!chat) {
          socket.emit('error', 'Chat not found');
          return;
        }

        socket.join(chatId);
      } catch (error) {
        socket.emit('error', 'Failed to join chat');
      }
    });

    // Handle new messages
    socket.on('new-message', async ({ chatId, message }) => {
      try {
        const chat = await prisma.chat.findFirst({
          where: {
            id: chatId,
            participants: {
              some: {
                userId,
              },
            },
          },
          include: {
            participants: {
              include: {
                user: true,
              },
            },
          },
        });

        if (!chat) {
          socket.emit('error', 'Chat not found');
          return;
        }

        // Broadcast message to all participants in the chat
        io.to(chatId).emit('new-message', message);

        // Update chat's lastMessageAt
        await prisma.chat.update({
          where: { id: chatId },
          data: { lastMessageAt: new Date() },
        });
      } catch (error) {
        socket.emit('error', 'Failed to send message');
      }
    });

    // Handle typing status
    socket.on('typing', ({ chatId, isTyping }) => {
      socket.to(chatId).emit('typing', {
        userId,
        isTyping,
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      connectedUsers.delete(userId);
    });
  });

  return io;
};

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
}; 