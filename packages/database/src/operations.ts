import { DatabaseClient } from './client';
import { DatabaseConfig, validateDatabaseConfig } from './config';
import { Prisma, User, Event, Message, Notification, Payment, Connection, EventParticipant } from '@prisma/client';

let db: DatabaseClient | null = null;

export function initializeDatabase(env: Record<string, string | undefined>) {
  if (!db) {
    db = DatabaseClient.getInstance(env);
  }
  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return db;
}

export class DatabaseOperations {
  constructor(private readonly db: DatabaseClient) {}

  // User operations
  async createUser(data: Prisma.UserCreateInput) {
    return this.db.createUser(data);
  }

  async findUserById(id: string) {
    return this.db.getUserById(id);
  }

  async findUserByEmail(email: string) {
    return this.db.getUserByEmail(email);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return this.db.updateUser(id, data);
  }

  // Event operations
  async createEvent(data: Prisma.EventCreateInput) {
    return this.db.createEvent(data);
  }

  async findEventById(id: string) {
    return this.db.getEventById(id);
  }

  async updateEvent(id: string, data: Prisma.EventUpdateInput) {
    return this.db.updateEvent(id, data);
  }

  async deleteEvent(id: string) {
    return this.db.deleteEvent(id);
  }

  // Message operations
  async createMessage(data: Prisma.MessageCreateInput) {
    return this.db.createMessage(data);
  }

  async findMessagesByUser(userId: string) {
    return this.db.getMessages(userId);
  }

  // Notification operations
  async createNotification(data: Prisma.NotificationCreateInput) {
    return this.db.createNotification(data);
  }

  async findNotificationsByUser(userId: string) {
    return this.db.getNotifications(userId);
  }

  async markNotificationAsRead(id: string) {
    return this.db.markNotificationAsRead(id);
  }
}

// Export a singleton instance
export const dbOps = new DatabaseOperations(getDatabase()); 