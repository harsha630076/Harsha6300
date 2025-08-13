
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().default('super-secret-change-me'),
  OPENAI_API_KEY: z.string().optional(),
  USDA_API_KEY: z.string().optional(),
  NUTRITION_API_BASE: z.string().default('https://api.nal.usda.gov/fdc/v1'),
  MODEL_SERVER_URL: z.string().optional(),
  CLOUDINARY_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);
