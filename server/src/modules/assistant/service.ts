
import { env } from '../../env';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class AssistantService {
  static async chat(messages: ChatMessage[], stream = false) {
    if (env.OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are QuickCal AI, a helpful health and nutrition assistant. Provide personalized advice about nutrition, meal planning, and healthy lifestyle choices. Keep responses concise and actionable.'
              },
              ...messages
            ],
            stream,
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          throw new Error('OpenAI API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.log('OpenAI API failed, using fallback');
      }
    }

    // Fallback response
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content.toLowerCase();

    if (userMessage.includes('meal') || userMessage.includes('food')) {
      return "I'd be happy to help with meal planning! Based on your profile and recent activities, I recommend focusing on balanced meals with adequate protein, healthy fats, and plenty of vegetables. Would you like specific meal suggestions?";
    } else if (userMessage.includes('calories') || userMessage.includes('nutrition')) {
      return "For nutrition tracking, aim for a balanced approach. Focus on whole foods, adequate protein (0.8-1g per kg body weight), and don't forget about micronutrients from fruits and vegetables. What specific nutrition questions do you have?";
    } else if (userMessage.includes('exercise') || userMessage.includes('workout')) {
      return "Regular physical activity is great for overall health! Aim for at least 150 minutes of moderate-intensity exercise per week, plus strength training twice weekly. What type of activities do you enjoy?";
    } else {
      return "Hello! I'm your QuickCal AI assistant. I can help you with nutrition advice, meal planning, and healthy lifestyle tips. What would you like to know about today?";
    }
  }
}
