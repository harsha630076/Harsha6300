
import { PrismaClient } from '@prisma/client';
import { env } from '../env';

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}
