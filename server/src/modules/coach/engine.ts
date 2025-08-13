
export interface HealthData {
  currentMood?: string;
  healthStatus?: any;
  recentMeals?: any[];
  profile?: any;
}

export interface Recommendations {
  immediate: string[];
  mealPlanning: string[];
  lifestyle: string[];
  warnings: string[];
}

export class CoachEngine {
  static generateRecommendations(data: HealthData): Recommendations {
    const recommendations: Recommendations = {
      immediate: [],
      mealPlanning: [],
      lifestyle: [],
      warnings: []
    };

    // Mood-based recommendations
    if (data.currentMood) {
      switch (data.currentMood) {
        case 'stressed':
          recommendations.immediate.push('Try deep breathing exercises');
          recommendations.mealPlanning.push('Include magnesium-rich foods like dark chocolate, nuts, and leafy greens');
          recommendations.lifestyle.push('Consider adding meditation to your daily routine');
          break;
        case 'low_energy':
          recommendations.immediate.push('Take a short walk or do light stretching');
          recommendations.mealPlanning.push('Focus on iron-rich foods like lean meats, spinach, and lentils');
          recommendations.lifestyle.push('Ensure you\'re getting 7-9 hours of sleep');
          break;
        case 'anxious':
          recommendations.immediate.push('Practice the 4-7-8 breathing technique');
          recommendations.mealPlanning.push('Include omega-3 rich foods like salmon, walnuts, and chia seeds');
          recommendations.lifestyle.push('Limit caffeine intake, especially in the afternoon');
          break;
        case 'sad':
          recommendations.immediate.push('Get some sunlight or bright light exposure');
          recommendations.mealPlanning.push('Include vitamin D rich foods and consider B-complex vitamins');
          recommendations.lifestyle.push('Try to connect with friends or family');
          break;
        case 'excited':
          recommendations.immediate.push('Channel this energy into a productive activity');
          recommendations.mealPlanning.push('Maintain balanced meals to sustain energy levels');
          break;
        case 'happy':
          recommendations.immediate.push('Great job maintaining your positive mood!');
          recommendations.mealPlanning.push('Continue your current healthy eating patterns');
          break;
      }
    }

    // Meal analysis
    if (data.recentMeals && data.recentMeals.length > 0) {
      const totalKcal = data.recentMeals.reduce((sum, meal) => sum + (meal.totalKcal || 0), 0);
      
      if (totalKcal < 1200) {
        recommendations.warnings.push('Your calorie intake seems low. Consider adding healthy snacks.');
      } else if (totalKcal > 3000) {
        recommendations.warnings.push('Your calorie intake is quite high. Consider portion control.');
      }

      // Check for missing food groups
      const hasProtein = data.recentMeals.some(meal => 
        meal.items?.some((item: any) => item.protein > 5)
      );
      const hasVegetables = data.recentMeals.some(meal =>
        meal.items?.some((item: any) => 
          item.name.toLowerCase().includes('vegetable') || 
          item.name.toLowerCase().includes('salad') ||
          item.name.toLowerCase().includes('broccoli') ||
          item.name.toLowerCase().includes('spinach')
        )
      );

      if (!hasProtein) {
        recommendations.mealPlanning.push('Add more protein sources like lean meats, fish, eggs, or legumes');
      }
      if (!hasVegetables) {
        recommendations.mealPlanning.push('Include more vegetables in your meals for essential vitamins and minerals');
      }
    }

    // Profile-based recommendations
    if (data.profile) {
      if (data.profile.goals?.type === 'weight_loss') {
        recommendations.lifestyle.push('Create a moderate calorie deficit through diet and exercise');
        recommendations.mealPlanning.push('Focus on high-protein, high-fiber foods for satiety');
      } else if (data.profile.goals?.type === 'muscle_gain') {
        recommendations.mealPlanning.push('Increase protein intake to 1.6-2.2g per kg body weight');
        recommendations.lifestyle.push('Incorporate resistance training 3-4 times per week');
      }

      if (data.profile.activity === 'sedentary') {
        recommendations.lifestyle.push('Try to incorporate 150 minutes of moderate activity per week');
        recommendations.immediate.push('Take regular breaks to stand and move throughout the day');
      }
    }

    return recommendations;
  }
}
