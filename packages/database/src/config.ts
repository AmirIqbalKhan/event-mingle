import { z } from 'zod';

export const databaseConfigSchema = z.object({
  url: z.string().optional(),
  host: z.string(),
  port: z.number(),
  username: z.string(),
  password: z.string(),
  database: z.string(),
});

export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;

export function validateDatabaseConfig(env: Record<string, string | undefined>): DatabaseConfig {
  return databaseConfigSchema.parse({
    url: env.DATABASE_URL,
    host: env.DATABASE_HOST || 'localhost',
    port: parseInt(env.DATABASE_PORT || '5432'),
    username: env.DATABASE_USER || 'postgres',
    password: env.DATABASE_PASSWORD || 'postgres',
    database: env.DATABASE_NAME || 'event_mingle',
  });
} 