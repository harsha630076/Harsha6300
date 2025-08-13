
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

const mealItemSchema = z.object({
  name: z.string(),
  quantity: z.number().positive(),
  kcal: z.number().optional(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fat: z.number().optional(),
  meta: z.any().optional(),
});

const createMealSchema = z.object({
  time: z.string().datetime().optional(),
  items: z.array(mealItemSchema),
});

export class MealsService {
  static async createMeal(userId: string, data: any) {
    const validData = createMealSchema.parse(data);
    
    const totalKcal = validData.items.reduce((sum, item) => sum + (item.kcal || 0), 0);
    
    const meal = await prisma.meal.create({
      data: {
        userId,
        time: validData.time ? new Date(validData.time) : new Date(),
        totalKcal: Math.round(totalKcal),
        items: {
          create: validData.items
        }
      },
      include: { items: true }
    });

    return meal;
  }

  static async getMeal(userId: string, mealId: string) {
    const meal = await prisma.meal.findFirst({
      where: { id: mealId, userId },
      include: { items: true }
    });

    if (!meal) {
      throw new Error('Meal not found');
    }

    return meal;
  }

  static async getMealsForDay(userId: string, date: string) {
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const meals = await prisma.meal.findMany({
      where: {
        userId,
        time: {
          gte: dayStart,
          lt: dayEnd
        }
      },
      include: { items: true },
      orderBy: { time: 'asc' }
    });

    return meals;
  }
}
