
import { env } from '../../env';
import { cache } from '../../lib/cache';

// Fallback nutrition data for common foods
const fallbackFoods = [
  { name: 'Apple', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, per100g: true },
  { name: 'Banana', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, per100g: true },
  { name: 'Chicken Breast', kcal: 165, protein: 31, carbs: 0, fat: 3.6, per100g: true },
  { name: 'Brown Rice', kcal: 111, protein: 2.6, carbs: 23, fat: 0.9, per100g: true },
  { name: 'Broccoli', kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, per100g: true },
  { name: 'Salmon', kcal: 208, protein: 20, carbs: 0, fat: 13, per100g: true },
  { name: 'Oatmeal', kcal: 389, protein: 16.9, carbs: 66, fat: 6.9, per100g: true },
  { name: 'Almonds', kcal: 579, protein: 21, carbs: 22, fat: 50, per100g: true },
  { name: 'Greek Yogurt', kcal: 59, protein: 10, carbs: 3.6, fat: 0.4, per100g: true },
  { name: 'Eggs', kcal: 155, protein: 13, carbs: 1.1, fat: 11, per100g: true },
];

export class NutritionService {
  static async searchFoods(query: string) {
    const cacheKey = `nutrition_search_${query}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    // Try external API if available
    if (env.USDA_API_KEY) {
      try {
        const response = await fetch(
          `${env.NUTRITION_API_BASE}/foods/search?query=${encodeURIComponent(query)}&api_key=${env.USDA_API_KEY}&pageSize=10`
        );
        const data = await response.json();
        
        const results = data.foods?.map((food: any) => ({
          id: food.fdcId,
          name: food.description,
          kcal: food.foodNutrients?.find((n: any) => n.nutrientNumber === '208')?.value || 0,
          protein: food.foodNutrients?.find((n: any) => n.nutrientNumber === '203')?.value || 0,
          carbs: food.foodNutrients?.find((n: any) => n.nutrientNumber === '205')?.value || 0,
          fat: food.foodNutrients?.find((n: any) => n.nutrientNumber === '204')?.value || 0,
          per100g: true
        })) || [];

        cache.set(cacheKey, results, 3600); // Cache for 1 hour
        return results;
      } catch (error) {
        console.log('USDA API failed, falling back to local data');
      }
    }

    // Fallback to local data
    const results = fallbackFoods.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    
    cache.set(cacheKey, results, 3600);
    return results;
  }

  static calculateTotals(items: Array<{ quantity: number; kcal?: number; protein?: number; carbs?: number; fat?: number }>) {
    return items.reduce(
      (totals, item) => ({
        kcal: totals.kcal + (item.kcal || 0) * (item.quantity / 100),
        protein: totals.protein + (item.protein || 0) * (item.quantity / 100),
        carbs: totals.carbs + (item.carbs || 0) * (item.quantity / 100),
        fat: totals.fat + (item.fat || 0) * (item.quantity / 100),
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }
}
