import { RequestHandler } from "express";

export interface FoodScanRequest {
  image?: string; // Base64 encoded image
  imageUrl?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  weight: string;
  accuracy: number;
  portionSize: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
  nutrients?: {
    [key: string]: number;
  };
}

export interface FoodScanResponse {
  success: boolean;
  items: FoodItem[];
  totalCalories: number;
  confidence: number;
  processingTime: number;
}

// Mock food database for scanning simulation
const mockFoodDatabase: Omit<FoodItem, "id" | "portionSize">[] = [
  {
    name: "Grilled Chicken Breast",
    calories: 250,
    weight: "180g",
    accuracy: 95,
    macros: { protein: 46, carbs: 0, fat: 5.5 },
  },
  {
    name: "Steamed Broccoli Florets",
    calories: 55,
    weight: "150g",
    accuracy: 98,
    macros: { protein: 6, carbs: 11, fat: 0.6, fiber: 5 },
  },
  {
    name: "Brown Rice",
    calories: 180,
    weight: "120g",
    accuracy: 92,
    macros: { protein: 4, carbs: 36, fat: 1.8, fiber: 3 },
  },
  {
    name: "Salmon Fillet",
    calories: 280,
    weight: "160g",
    accuracy: 94,
    macros: { protein: 39, carbs: 0, fat: 12 },
  },
  {
    name: "Avocado Toast",
    calories: 320,
    weight: "200g",
    accuracy: 89,
    macros: { protein: 8, carbs: 24, fat: 22, fiber: 12 },
  },
  {
    name: "Greek Yogurt",
    calories: 130,
    weight: "170g",
    accuracy: 96,
    macros: { protein: 20, carbs: 9, fat: 0.4 },
  },
  {
    name: "Mixed Green Salad",
    calories: 45,
    weight: "100g",
    accuracy: 91,
    macros: { protein: 3, carbs: 8, fat: 0.3, fiber: 4 },
  },
];

const generateRandomItems = (count: number = 3): FoodItem[] => {
  const shuffled = [...mockFoodDatabase].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((item, index) => ({
    ...item,
    id: `food_${Date.now()}_${index}`,
    portionSize: Math.floor(Math.random() * 40) + 60, // Random portion size between 60-100%
  }));
};

export const handleFoodScan: RequestHandler = async (req, res) => {
  try {
    const { image, imageUrl }: FoodScanRequest = req.body;

    if (!image && !imageUrl) {
      return res.status(400).json({
        success: false,
        error: "Either image or imageUrl is required",
      });
    }

    // Simulate processing time
    const processingStartTime = Date.now();

    // Simulate AI processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 1000),
    );

    // Generate mock scan results
    const itemCount = Math.floor(Math.random() * 3) + 2; // 2-4 items
    const items = generateRandomItems(itemCount);

    const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
    const avgAccuracy =
      items.reduce((sum, item) => sum + item.accuracy, 0) / items.length;
    const processingTime = Date.now() - processingStartTime;

    const response: FoodScanResponse = {
      success: true,
      items,
      totalCalories,
      confidence: Math.round(avgAccuracy),
      processingTime,
    };

    res.json(response);
  } catch (error) {
    console.error("Food scan error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process food scan",
    });
  }
};

// Alternative endpoint for quick scan (faster response)
export const handleQuickScan: RequestHandler = async (req, res) => {
  try {
    // Much faster response for quick scans
    await new Promise((resolve) => setTimeout(resolve, 500));

    const items = generateRandomItems(2);
    const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
    const avgAccuracy =
      items.reduce((sum, item) => sum + item.accuracy, 0) / items.length;

    const response: FoodScanResponse = {
      success: true,
      items,
      totalCalories,
      confidence: Math.round(avgAccuracy),
      processingTime: 500,
    };

    res.json(response);
  } catch (error) {
    console.error("Quick scan error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process quick scan",
    });
  }
};
