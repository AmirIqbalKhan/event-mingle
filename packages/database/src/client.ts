import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, or, desc } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './schema';
import { DatabaseConfig, validateDatabaseConfig } from './config';

export class DatabaseClient {
  private static instance: DatabaseClient;
  private client: ReturnType<typeof drizzle>;

  private constructor(config: DatabaseConfig) {
    const connectionString = config.url || `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
    const queryClient = postgres(connectionString);
    this.client = drizzle(queryClient, { schema });
  }

  public static getInstance(env: Record<string, string | undefined>): DatabaseClient {
    if (!DatabaseClient.instance) {
      const config = validateDatabaseConfig(env);
      DatabaseClient.instance = new DatabaseClient(config);
    }
    return DatabaseClient.instance;
  }

  public getClient() {
    return this.client;
  }

  // User methods
  async createUser(data: typeof schema.users.$inferInsert) {
    return this.client.insert(schema.users).values(data).returning();
  }

  async getUserById(id: number) {
    return this.client.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
  }

  async getUserByEmail(email: string) {
    return this.client.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
  }

  async updateUser(id: number, data: Partial<typeof schema.users.$inferInsert>) {
    return this.client.update(schema.users)
      .set(data)
      .where(eq(schema.users.id, id))
      .returning();
  }

  // Event methods
  async createEvent(data: typeof schema.events.$inferInsert) {
    return this.client.insert(schema.events).values(data).returning();
  }

  async getEventById(id: number) {
    return this.client.select().from(schema.events).where(eq(schema.events.id, id)).limit(1);
  }

  async updateEvent(id: number, data: Partial<typeof schema.events.$inferInsert>) {
    return this.client.update(schema.events)
      .set(data)
      .where(eq(schema.events.id, id))
      .returning();
  }

  async deleteEvent(id: number) {
    return this.client.delete(schema.events)
      .where(eq(schema.events.id, id))
      .returning();
  }

  // Event participant methods
  async addParticipant(data: typeof schema.eventParticipants.$inferInsert) {
    return this.client.insert(schema.eventParticipants).values(data).returning();
  }

  async updateParticipantStatus(id: number, status: string) {
    return this.client.update(schema.eventParticipants)
      .set({ status })
      .where(eq(schema.eventParticipants.id, id))
      .returning();
  }

  // Message methods
  async createMessage(data: typeof schema.messages.$inferInsert) {
    return this.client.insert(schema.messages).values(data).returning();
  }

  async getMessages(userId: number) {
    return this.client.select().from(schema.messages)
      .where(or(
        eq(schema.messages.senderId, userId),
        eq(schema.messages.recipientId, userId)
      ))
      .orderBy(desc(schema.messages.createdAt));
  }

  // Connection methods
  async createConnection(data: typeof schema.connections.$inferInsert) {
    return this.client.insert(schema.connections).values(data).returning();
  }

  async updateConnectionStatus(id: number, status: string) {
    return this.client.update(schema.connections)
      .set({ status })
      .where(eq(schema.connections.id, id))
      .returning();
  }

  // Payment methods
  async createPayment(data: typeof schema.payments.$inferInsert) {
    return this.client.insert(schema.payments).values(data).returning();
  }

  async updatePaymentStatus(id: number, status: string) {
    return this.client.update(schema.payments)
      .set({ status })
      .where(eq(schema.payments.id, id))
      .returning();
  }

  // Notification methods
  async createNotification(data: typeof schema.notifications.$inferInsert) {
    return this.client.insert(schema.notifications).values(data).returning();
  }

  async getNotifications(userId: number) {
    return this.client.select().from(schema.notifications)
      .where(eq(schema.notifications.userId, userId))
      .orderBy(desc(schema.notifications.createdAt));
  }

  async markNotificationAsRead(id: number) {
    return this.client.update(schema.notifications)
      .set({ read: true })
      .where(eq(schema.notifications.id, id))
      .returning();
  }
} 