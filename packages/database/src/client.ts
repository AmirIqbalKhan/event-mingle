import { PrismaClient } from '@prisma/client';

export class DatabaseClient {
  private static instance: DatabaseClient;
  private client: PrismaClient;

  private constructor() {
    this.client = new PrismaClient();
  }

  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  public getClient(): PrismaClient {
    return this.client;
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }

  // User methods
  async createUser(data: { email: string; name: string; password: string; role?: string }) {
    return this.client.user.create({ data });
  }

  async getUserById(id: string) {
    return this.client.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return this.client.user.findUnique({ where: { email } });
  }

  async updateUser(id: string, data: { email?: string; name?: string; password?: string; role?: string }) {
    return this.client.user.update({ where: { id }, data });
  }

  // Event methods
  async createEvent(data: { 
    title: string; 
    description: string; 
    startDate: Date; 
    endDate: Date; 
    location: string; 
    capacity: number; 
    price: number; 
    organizerId: string; 
    status?: string 
  }) {
    return this.client.event.create({ data });
  }

  async getEventById(id: string) {
    return this.client.event.findUnique({ where: { id } });
  }

  async updateEvent(id: string, data: { 
    title?: string; 
    description?: string; 
    startDate?: Date; 
    endDate?: Date; 
    location?: string; 
    capacity?: number; 
    price?: number; 
    status?: string 
  }) {
    return this.client.event.update({ where: { id }, data });
  }

  async deleteEvent(id: string) {
    return this.client.event.delete({ where: { id } });
  }

  // Event participant methods
  async addParticipant(data: { 
    eventId: string; 
    userId: string; 
    status?: string; 
    paymentStatus?: string 
  }) {
    return this.client.eventParticipant.create({ data });
  }

  async updateParticipantStatus(id: string, status: string) {
    return this.client.eventParticipant.update({ where: { id }, data: { status } });
  }

  // Message methods
  async createMessage(data: { 
    senderId: string; 
    recipientId: string; 
    content: string; 
    read?: boolean 
  }) {
    return this.client.message.create({ data });
  }

  async getMessages(userId: string) {
    return this.client.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Connection methods
  async createConnection(data: { 
    userId1: string; 
    userId2: string; 
    type: string; 
    status?: string 
  }) {
    return this.client.connection.create({ data });
  }

  async updateConnectionStatus(id: string, status: string) {
    return this.client.connection.update({ where: { id }, data: { status } });
  }

  // Payment methods
  async createPayment(data: { 
    userId: string; 
    eventId: string; 
    amount: number; 
    status?: string; 
    paymentMethod: string 
  }) {
    return this.client.payment.create({ data });
  }

  async updatePaymentStatus(id: string, status: string) {
    return this.client.payment.update({ where: { id }, data: { status } });
  }

  // Notification methods
  async createNotification(data: { 
    userId: string; 
    type: string; 
    content: string; 
    read?: boolean 
  }) {
    return this.client.notification.create({ data });
  }

  async getNotifications(userId: string) {
    return this.client.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async markNotificationAsRead(id: string) {
    return this.client.notification.update({ where: { id }, data: { read: true } });
  }
}

export const db = DatabaseClient.getInstance().getClient(); 