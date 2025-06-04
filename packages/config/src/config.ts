import { z } from 'zod';

// Database configuration
export const databaseConfigSchema = z.object({
  url: z.string().optional(),
  host: z.string(),
  port: z.number(),
  username: z.string(),
  password: z.string(),
  database: z.string(),
});

// Auth configuration
export const authConfigSchema = z.object({
  jwtSecret: z.string(),
  jwtExpiresIn: z.string(),
  refreshTokenExpiresIn: z.string(),
});

// API configuration
export const apiConfigSchema = z.object({
  baseUrl: z.string(),
  timeout: z.number(),
});

// System configuration
export const systemConfigSchema = z.object({
  auth: authConfigSchema,
  database: databaseConfigSchema,
  api: apiConfigSchema,
});

// Environment variables validation
export const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().optional(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().transform(Number),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

  // Auth
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),

  // API
  API_BASE_URL: z.string(),
  API_TIMEOUT: z.string().transform(Number),

  // App
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
});

export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;
export type AuthConfig = z.infer<typeof authConfigSchema>;
export type ApiConfig = z.infer<typeof apiConfigSchema>;
export type SystemConfig = z.infer<typeof systemConfigSchema>;
export type EnvConfig = z.infer<typeof envSchema>;

export function validateConfig(env: Record<string, string | undefined>): SystemConfig {
  const envConfig = envSchema.parse(env);

  return {
    auth: {
      jwtSecret: envConfig.JWT_SECRET,
      jwtExpiresIn: envConfig.JWT_EXPIRES_IN,
      refreshTokenExpiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN,
    },
    database: {
      url: envConfig.DATABASE_URL,
      host: envConfig.DATABASE_HOST,
      port: envConfig.DATABASE_PORT,
      username: envConfig.DATABASE_USER,
      password: envConfig.DATABASE_PASSWORD,
      database: envConfig.DATABASE_NAME,
    },
    api: {
      baseUrl: envConfig.API_BASE_URL,
      timeout: envConfig.API_TIMEOUT,
    },
  };
}

export function validateDatabaseConfig(env: Record<string, string | undefined>): DatabaseConfig {
  const envConfig = envSchema.parse(env);

  return {
    url: envConfig.DATABASE_URL,
    host: envConfig.DATABASE_HOST,
    port: envConfig.DATABASE_PORT,
    username: envConfig.DATABASE_USER,
    password: envConfig.DATABASE_PASSWORD,
    database: envConfig.DATABASE_NAME,
  };
}

export function validateAuthConfig(env: Record<string, string | undefined>): AuthConfig {
  const envConfig = envSchema.parse(env);

  return {
    jwtSecret: envConfig.JWT_SECRET,
    jwtExpiresIn: envConfig.JWT_EXPIRES_IN,
    refreshTokenExpiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN,
  };
}

export function validateApiConfig(env: Record<string, string | undefined>): ApiConfig {
  const envConfig = envSchema.parse(env);

  return {
    baseUrl: envConfig.API_BASE_URL,
    timeout: envConfig.API_TIMEOUT,
  };
} 