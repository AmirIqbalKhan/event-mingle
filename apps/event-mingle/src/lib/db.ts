import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Create a new PrismaClient instance
const prismaClient = new PrismaClient();

// In development, use a global variable to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prismaClient;
}

// Export the PrismaClient instance
export { prismaClient as prisma }; 