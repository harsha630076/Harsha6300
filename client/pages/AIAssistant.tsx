import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Send, Mic, Camera, User, Bot, Sparkles, Heart, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  quickActions?: Array<{
    label: string;
    action: string;
    icon?: string;
  }>;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversation database
  const initialMessages: Message[] = [
    {
      id: '1',
      type: 'assistant',
      content: 'Hi Alex! 👋 I\'m your AI nutrition assistant. I can help you with meal planning, nutrition advice, food recommendations, and tracking your health goals. What would you like to know today?',
      timestamp: new Date(),
      quickActions: [
        { label: 'Meal Suggestions', action: 'meal_suggestions', icon: '🍽️' },
        { label: 'Nutrition Tips', action: 'nutrition_tips', icon: '💡' },
        { label: 'Track Progress', action: 'track_progress', icon: '📊' },
        { label: 'Recipe Ideas', action: 'recipe_ideas', icon: '👨‍🍳' }
      ]
    }
  ];

  // Pre-defined responses database
  const responseDatabase = {
    greetings: [
      'Hello! How can I help you with your nutrition today?',
      'Hi there! Ready to make some healthy choices?',
      'Hey! What nutrition question can I answer for you?'
    ],
    nutrition: [
      'Great question! Based on your current intake, I recommend focusing on protein-rich foods like lean chicken, fish, or Greek yogurt to help with muscle recovery and satiety.',
      'For optimal nutrition, try to include a variety of colorful vegetables. Each color provides different vitamins and antioxidants your body needs.',
      'Remember that timing matters too! Eating protein within 30 minutes after exercise can help with muscle recovery.',
      'Hydration is key! Aim for at least 8 glasses of water daily, and more if you\'re active or in hot weather.'
    ],
    meal_planning: [
      'I\'d love to help you plan meals! For balanced nutrition, try to include: 1/2 plate vegetables, 1/4 lean protein, 1/4 whole grains, plus healthy fats.',
      'Based on your goals, here\'s what I recommend for tomorrow: Breakfast - Greek yogurt with berries, Lunch - Quinoa salad with grilled chicken, Dinner - Baked salmon with roasted vegetables.',
      'Meal prep tip: Cook proteins and grains in bulk on weekends. This makes healthy eating easier during busy weekdays!',
      'For sustainable meal planning, choose 3-4 go-to healthy meals you enjoy and rotate them weekly.'
    ],
    weight_loss: [
      'For healthy weight loss, aim for a moderate calorie deficit of 300-500 calories per day. This typically leads to 1-2 pounds per week.',
      'Focus on whole foods, lean proteins, and fiber-rich vegetables. These keep you full longer and provide better nutrition.',
      'Don\'t skip meals! Regular eating helps maintain stable blood sugar and prevents overeating later.',
      'Remember, sustainable weight loss is about building healthy habits, not quick fixes. You\'re doing great!'
    ],
    mood_food: [
      'Food definitely affects mood! Foods rich in omega-3s (like salmon), complex carbs (like oats), and dark chocolate can help boost serotonin levels.',
      'When feeling low energy, try foods with B-vitamins and iron: spinach, eggs, beans, and whole grains can help naturally boost energy.',
      'For stress relief, magnesium-rich foods like almonds, dark leafy greens, and avocados can help your body manage stress better.',
      'If you\'re feeling anxious, avoid excess caffeine and try calming foods like chamomile tea, bananas, or turkey.'
    ]
  };

  const quickSuggestions = [
    'What should I eat for breakfast?',
    'How can I increase my protein intake?',
    'I feel tired, what foods can help?',
    'Give me a healthy snack idea',
    'How much water should I drink?',
    'What\'s a good post-workout meal?'
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponseCategory = (message: string): keyof typeof responseDatabase => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'greetings';
    }
    if (lowerMessage.includes('meal') || lowerMessage.includes('plan') || lowerMessage.includes('breakfast') || lowerMessage.includes('lunch') || lowerMessage.includes('dinner')) {
      return 'meal_planning';
    }
    if (lowerMessage.includes('weight') || lowerMessage.includes('lose') || lowerMessage.includes('diet')) {
      return 'weight_loss';
    }
    if (lowerMessage.includes('tired') || lowerMessage.includes('mood') || lowerMessage.includes('energy') || lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
      return 'mood_food';
    }
    return 'nutrition';
  };

  const generateAIResponse = (userMessage: string) => {
    const category = getResponseCategory(userMessage);
    const responses = responseDatabase[category];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some contextual suggestions based on the category
    let suggestions: string[] = [];
    let quickActions: Message['quickActions'] = [];

    if (category === 'meal_planning') {
      suggestions = ['View meal plans', 'Set food reminders', 'Track calories'];
      quickActions = [
        { label: 'Scan Food', action: 'scan_food', icon: '📸' },
        { label: 'Log Meal', action: 'log_meal', icon: '📝' }
      ];
    } else if (category === 'mood_food') {
      suggestions = ['Get mood recipes', 'Track mood', 'Learn more'];
      quickActions = [
        { label: 'Mood Recommendations', action: 'mood_recommendations', icon: '🧡' },
        { label: 'Energy Foods', action: 'energy_foods', icon: '⚡' }
      ];
    } else if (category === 'nutrition') {
      suggestions = ['Learn about macros', 'Get recipe ideas', 'Track nutrients'];
      quickActions = [
        { label: 'Nutrition Guide', action: 'nutrition_guide', icon: '📚' },
        { label: 'Food Database', action: 'food_database', icon: '🔍' }
      ];
    }

    return {
      content: randomResponse,
      suggestions,
      quickActions
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
        quickActions: aiResponse.quickActions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      meal_suggestions: 'Can you suggest some healthy meals for today?',
      nutrition_tips: 'Give me some nutrition tips for better health',
      track_progress: 'How can I track my nutrition progress?',
      recipe_ideas: 'I need some healthy recipe ideas',
      scan_food: 'How does AI food scanning work?',
      log_meal: 'How do I log my meals properly?',
      mood_recommendations: 'I want mood-based food recommendations',
      energy_foods: 'What foods give sustained energy?',
      nutrition_guide: 'Teach me about nutrition basics',
      food_database: 'How do I search for foods?'
    };

    const message = actionMessages[action] || 'Tell me more about this';
    setInputValue(message);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AI Assistant</h1>
              <p className="text-sm text-green-600">Online • Ready to help</p>
            </div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'assistant' && (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
              <div className={`rounded-2xl p-4 ${
                message.type === 'user' 
                  ? 'bg-primary text-white ml-auto' 
                  : 'bg-white border border-gray-200'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              
              {/* Quick Actions */}
              {message.quickActions && message.quickActions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      <span>{action.icon}</span>
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="text-xs text-gray-500 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 order-3">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick suggestions:</h3>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about nutrition, meals, or health..."
              className="pr-12 h-12 rounded-2xl border-gray-200"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full">
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="w-12 h-12 p-0 bg-primary hover:bg-primary/90 rounded-full"
          >
            <Send className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Nutritional Tip */}
      <div className="px-6 pb-4">
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">AI Assistant Tip</h4>
              <p className="text-sm text-gray-600">
                I learn from your preferences and goals to provide increasingly personalized nutrition advice. The more we chat, the better I can help you!
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
