
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

const createMoodSchema = z.object({
  category: z.enum(['stressed', 'low_energy', 'sad', 'excited', 'anxious', 'happy']),
  note: z.string().optional(),
});

export class MoodService {
  static async createMood(userId: string, data: any) {
    const validData = createMoodSchema.parse(data);
    
    const mood = await prisma.mood.create({
      data: {
        userId,
        ...validData
      }
    });

    return mood;
  }

  static async getTodayMoods(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const moods = await prisma.mood.findMany({
      where: {
        userId,
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return moods;
  }

  static async getMoodTimeline(userId: string, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const moods = await prisma.mood.findMany({
      where: {
        userId,
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'desc' }
    });

    return moods;
  }
}
