import { RequestHandler } from "express";

export interface MoodRecommendationRequest {
  mood: "positive" | "low-energy" | "fever" | "stressed" | "tired" | "sick";
  currentCalories?: number;
  dietaryRestrictions?: string[];
  goals?: string[];
}

export interface FoodRecommendation {
  id: string;
  name: string;
  description: string;
  calories: number;
  macros: {
    protein: string;
    carbs: string;
    fat: string;
  };
  benefits: string;
  cookingTime?: number;
  difficulty?: "easy" | "medium" | "hard";
  ingredients?: string[];
  image: string;
}

export interface MoodRecommendationResponse {
  mood: string;
  recommendations: FoodRecommendation[];
  generalTips: string[];
  nutritionalAdvice: string;
}

const moodFoodDatabase: Record<string, FoodRecommendation[]> = {
  "low-energy": [
    {
      id: "green-smoothie-1",
      name: "Revitalizing Green Smoothie",
      description: "Boosts energy & aids recovery.",
      calories: 250,
      macros: { protein: "10P", carbs: "35C", fat: "8F" },
      benefits: "Rich in iron and B-vitamins for natural energy boost",
      cookingTime: 5,
      difficulty: "easy",
      ingredients: ["Spinach", "Banana", "Almond milk", "Chia seeds", "Honey"],
      image: "🥬",
    },
    {
      id: "quinoa-salad-1",
      name: "Hearty Quinoa Power Bowl",
      description: "Rich in protein and complex carbs.",
      calories: 380,
      macros: { protein: "18P", carbs: "50C", fat: "12F" },
      benefits: "Complete protein and sustained energy release",
      cookingTime: 25,
      difficulty: "medium",
      ingredients: [
        "Quinoa",
        "Chickpeas",
        "Bell peppers",
        "Cucumber",
        "Olive oil",
      ],
      image: "🥗",
    },
    {
      id: "oatmeal-1",
      name: "Energy-Boosting Oatmeal",
      description: "Sustained energy with natural sweetness.",
      calories: 320,
      macros: { protein: "12P", carbs: "45C", fat: "10F" },
      benefits: "Slow-release carbs for steady energy levels",
      cookingTime: 10,
      difficulty: "easy",
      ingredients: ["Oats", "Banana", "Walnuts", "Cinnamon", "Honey"],
      image: "🥣",
    },
  ],
  positive: [
    {
      id: "salmon-1",
      name: "Grilled Salmon with Vegetables",
      description: "Omega-3 rich for brain health.",
      calories: 420,
      macros: { protein: "35P", carbs: "15C", fat: "25F" },
      benefits: "Supports mood and cognitive function",
      cookingTime: 20,
      difficulty: "medium",
      ingredients: [
        "Salmon fillet",
        "Asparagus",
        "Sweet potato",
        "Lemon",
        "Herbs",
      ],
      image: "🐟",
    },
    {
      id: "berry-bowl-1",
      name: "Antioxidant Berry Bowl",
      description: "Packed with mood-boosting nutrients.",
      calories: 280,
      macros: { protein: "15P", carbs: "40C", fat: "8F" },
      benefits: "Antioxidants support overall well-being",
      cookingTime: 5,
      difficulty: "easy",
      ingredients: [
        "Mixed berries",
        "Greek yogurt",
        "Granola",
        "Honey",
        "Mint",
      ],
      image: "🫐",
    },
  ],
  fever: [
    {
      id: "ginger-soup-1",
      name: "Healing Ginger Chicken Soup",
      description: "Soothing and immune-boosting.",
      calories: 220,
      macros: { protein: "25P", carbs: "12C", fat: "8F" },
      benefits: "Anti-inflammatory properties aid recovery",
      cookingTime: 45,
      difficulty: "medium",
      ingredients: [
        "Chicken breast",
        "Ginger",
        "Garlic",
        "Vegetables",
        "Broth",
      ],
      image: "🍲",
    },
    {
      id: "citrus-tea-1",
      name: "Immune-Boosting Citrus Tea",
      description: "Vitamin C rich hydration.",
      calories: 45,
      macros: { protein: "0P", carbs: "12C", fat: "0F" },
      benefits: "High vitamin C content supports immune system",
      cookingTime: 5,
      difficulty: "easy",
      ingredients: ["Green tea", "Lemon", "Orange", "Honey", "Ginger"],
      image: "🍋",
    },
  ],
  stressed: [
    {
      id: "magnesium-bowl-1",
      name: "Calming Magnesium Bowl",
      description: "Stress-reducing nutrients.",
      calories: 360,
      macros: { protein: "14P", carbs: "35C", fat: "18F" },
      benefits: "Magnesium helps reduce stress and anxiety",
      cookingTime: 15,
      difficulty: "easy",
      ingredients: ["Dark chocolate", "Almonds", "Spinach", "Avocado", "Seeds"],
      image: "🥑",
    },
  ],
};

const generalTipsByMood: Record<string, string[]> = {
  "low-energy": [
    "Stay hydrated with water and herbal teas",
    "Eat small, frequent meals to maintain energy",
    "Include iron-rich foods like spinach and beans",
    "Get some natural sunlight when possible",
  ],
  positive: [
    "Maintain your great routine!",
    "Include colorful fruits and vegetables",
    "Stay active and enjoy your meals",
    "Share healthy meals with friends and family",
  ],
  fever: [
    "Focus on hydration - drink plenty of fluids",
    "Eat light, easily digestible foods",
    "Include foods with anti-inflammatory properties",
    "Rest and allow your body to recover",
  ],
  stressed: [
    "Practice mindful eating",
    "Limit caffeine and sugar intake",
    "Include calming foods like chamomile tea",
    "Take time to enjoy your meals without distractions",
  ],
};

const nutritionalAdviceByMood: Record<string, string> = {
  "low-energy":
    "Focus on complex carbohydrates and iron-rich foods. B-vitamins from whole grains can help convert food into energy more efficiently.",
  positive:
    "Keep up the great work! Continue with a balanced diet rich in omega-3s, antioxidants, and whole foods to maintain your positive mood.",
  fever:
    "Your body needs extra nutrients to fight infection. Focus on easily digestible foods rich in vitamin C, zinc, and anti-inflammatory compounds.",
  stressed:
    "Chronic stress depletes certain nutrients. Prioritize magnesium-rich foods, omega-3 fatty acids, and avoid excessive caffeine or sugar.",
};

export const handleMoodRecommendations: RequestHandler = (req, res) => {
  try {
    const {
      mood,
      currentCalories,
      dietaryRestrictions,
      goals,
    }: MoodRecommendationRequest = req.body;

    if (!mood) {
      return res.status(400).json({
        error: "Mood is required",
      });
    }

    // Get recommendations for the specified mood
    let recommendations =
      moodFoodDatabase[mood] || moodFoodDatabase["positive"];

    // Filter based on dietary restrictions if provided
    if (dietaryRestrictions && dietaryRestrictions.length > 0) {
      recommendations = recommendations.filter((rec) => {
        return !dietaryRestrictions.some((restriction) =>
          rec.ingredients?.some((ingredient) =>
            ingredient.toLowerCase().includes(restriction.toLowerCase()),
          ),
        );
      });
    }

    // If user is low on calories, prioritize higher calorie options
    if (currentCalories && currentCalories < 1200) {
      recommendations = recommendations.sort((a, b) => b.calories - a.calories);
    }

    const response: MoodRecommendationResponse = {
      mood,
      recommendations: recommendations.slice(0, 4), // Limit to 4 recommendations
      generalTips: generalTipsByMood[mood] || generalTipsByMood["positive"],
      nutritionalAdvice:
        nutritionalAdviceByMood[mood] || nutritionalAdviceByMood["positive"],
    };

    res.json(response);
  } catch (error) {
    console.error("Mood recommendations error:", error);
    res.status(500).json({
      error: "Failed to get mood-based recommendations",
    });
  }
};

// Get available moods endpoint
export const handleGetMoods: RequestHandler = (req, res) => {
  const moods = [
    { id: "positive", label: "Positive", emoji: "😊" },
    { id: "low-energy", label: "Low Energy", emoji: "⚡" },
    { id: "fever", label: "Fever/Cold", emoji: "🤒" },
    { id: "stressed", label: "Stressed", emoji: "😰" },
    { id: "tired", label: "Tired", emoji: "😴" },
  ];

  res.json({ moods });
};
