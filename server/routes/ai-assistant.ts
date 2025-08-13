import { RequestHandler } from "express";

export interface AIAssistantRequest {
  message: string;
  context?: {
    dailyCalories?: number;
    goals?: string[];
    mood?: string;
    recentMeals?: string[];
  };
}

export interface AIAssistantResponse {
  response: string;
  suggestions?: string[];
  recommendations?: {
    type: "food" | "exercise" | "tip";
    content: string;
  }[];
}

// Mock AI responses for different types of queries
const mockResponses = {
  nutrition: [
    "Based on your current intake, you're doing great! Consider adding more leafy greens for extra vitamins.",
    "Your protein intake looks good today. Try to include some healthy fats like avocado or nuts.",
    "You're slightly under your calorie goal. A healthy snack like Greek yogurt with berries could help.",
  ],
  mood: [
    "I understand you're feeling low energy. Foods rich in iron and B-vitamins like spinach and eggs can help boost energy naturally.",
    "For better mood, try foods rich in omega-3s like salmon, or magnesium-rich dark chocolate.",
    "When feeling stressed, chamomile tea and foods with tryptophan like turkey can be calming.",
  ],
  general: [
    "I'm here to help with your nutrition goals! What would you like to know about your food intake?",
    "Great job tracking your meals today! Consistency is key to reaching your health goals.",
    "Remember to stay hydrated! Aim for 8-10 glasses of water throughout the day.",
  ],
};

const getResponseCategory = (message: string): keyof typeof mockResponses => {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("tired") ||
    lowerMessage.includes("energy") ||
    lowerMessage.includes("mood") ||
    lowerMessage.includes("stress")
  ) {
    return "mood";
  }

  if (
    lowerMessage.includes("calories") ||
    lowerMessage.includes("protein") ||
    lowerMessage.includes("nutrition") ||
    lowerMessage.includes("eat")
  ) {
    return "nutrition";
  }

  return "general";
};

export const handleAIAssistant: RequestHandler = (req, res) => {
  try {
    const { message, context }: AIAssistantRequest = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required and must be a string",
      });
    }

    // Determine response category based on message content
    const category = getResponseCategory(message);
    const responses = mockResponses[category];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    // Generate contextual suggestions based on user context
    const suggestions: string[] = [];
    const recommendations: AIAssistantResponse["recommendations"] = [];

    if (context?.mood === "low-energy") {
      suggestions.push(
        "Try iron-rich foods",
        "Get some sunlight",
        "Consider a short walk",
      );
      recommendations.push({
        type: "food",
        content: "Spinach and quinoa bowl with lemon dressing",
      });
    }

    if (context?.dailyCalories && context.dailyCalories < 1500) {
      suggestions.push(
        "Add healthy snacks",
        "Include more protein",
        "Try nuts or seeds",
      );
      recommendations.push({
        type: "food",
        content: "Greek yogurt with mixed berries and honey",
      });
    }

    // Add general tips
    recommendations.push({
      type: "tip",
      content:
        "Eating regularly throughout the day helps maintain stable energy levels",
    });

    const response: AIAssistantResponse = {
      response: randomResponse,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
      recommendations,
    };

    res.json(response);
  } catch (error) {
    console.error("AI Assistant error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
