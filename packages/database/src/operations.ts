import { DatabaseClient } from './client';
import { DatabaseConfig, validateDatabaseConfig } from './config';
import * as schema from './schema';

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
  async createUser(data: typeof schema.users.$inferInsert) {
    return this.db.createUser(data);
  }

  async findUserById(id: number) {
    return this.db.getUserById(id);
  }

  async findUserByEmail(email: string) {
    return this.db.getUserByEmail(email);
  }

  async updateUser(id: number, data: Partial<typeof schema.users.$inferInsert>) {
    return this.db.updateUser(id, data);
  }

  // Event operations
  async createEvent(data: typeof schema.events.$inferInsert) {
    return this.db.createEvent(data);
  }

  async findEventById(id: number) {
    return this.db.getEventById(id);
  }

  async updateEvent(id: number, data: Partial<typeof schema.events.$inferInsert>) {
    return this.db.updateEvent(id, data);
  }

  async deleteEvent(id: number) {
    return this.db.deleteEvent(id);
  }

  // Message operations
  async createMessage(data: typeof schema.messages.$inferInsert) {
    return this.db.createMessage(data);
  }

  async findMessagesByUser(userId: number) {
    return this.db.getMessages(userId);
  }

  // Notification operations
  async createNotification(data: typeof schema.notifications.$inferInsert) {
    return this.db.createNotification(data);
  }

  async findNotificationsByUser(userId: number) {
    return this.db.getNotifications(userId);
  }

  async markNotificationAsRead(id: number) {
    return this.db.markNotificationAsRead(id);
  }
}

// Export a singleton instance
export const dbOps = new DatabaseOperations(getDatabase()); 