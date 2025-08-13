
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

const updateProfileSchema = z.object({
  name: z.string().optional(),
  age: z.number().int().min(1).max(120).optional(),
  gender: z.string().optional(),
  heightCm: z.number().int().min(50).max(300).optional(),
  weightKg: z.number().min(20).max(500).optional(),
  activity: z.enum(['sedentary', 'light', 'moderate', 'active']).optional(),
  goals: z.any().optional(),
  preferences: z.any().optional(),
  conditions: z.any().optional(),
});

export class ProfileService {
  static async getProfile(userId: string) {
    let profile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: { userId }
      });
    }

    return profile;
  }

  static async updateProfile(userId: string, data: any) {
    const validData = updateProfileSchema.parse(data);
    
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: validData,
      create: { userId, ...validData }
    });

    return profile;
  }
}
