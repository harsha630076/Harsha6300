import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';

export default function Recommendations() {
  const [selectedMood, setSelectedMood] = useState('');

  const moodOptions = [
    { id: 'fever', label: 'Fever / Cold', emoji: '🤒', color: 'bg-red-100 text-red-700' },
    { id: 'low-energy', label: 'Low Energy', emoji: '⚡', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'positive', label: 'Positive', emoji: '😊', color: 'bg-green-100 text-green-700' },
  ];

  const recommendations = [
    {
      id: 1,
      name: 'Revitalizing Green Smoothie',
      description: 'Boosts energy & aids recovery.',
      calories: 250,
      protein: '10P',
      carbs: '35C',
      fat: '8F',
      image: '🥬',
      benefits: 'Rich in antioxidants and vitamins'
    },
    {
      id: 2,
      name: 'Hearty Quinoa Salad',
      description: 'Rich in protein and fiber.',
      calories: 380,
      protein: '18P',
      carbs: '50C',
      fat: '12F',
      image: '🥗',
      benefits: 'Complete protein source'
    },
    {
      id: 3,
      name: 'Lean Chicken Stir-fry',
      description: 'High protein, easy to digest.',
      calories: 420,
      protein: '40P',
      carbs: '25C',
      fat: '15F',
      image: '🍗',
      benefits: 'Muscle building and repair'
    },
    {
      id: 4,
      name: 'Avocado Toast with Egg',
      description: 'Healthy fats and sustained energy.',
      calories: 300,
      protein: '12P',
      carbs: '28C',
      fat: '18F',
      image: '🥑',
      benefits: 'Heart-healthy fats'
    }
  ];

  const handleAddAllToLog = () => {
    console.log('Adding all recommendations to log');
    window.location.href = '/dashboard';
  };

  const handleSaveAsMealPlan = () => {
    console.log('Saving as meal plan');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-4 text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <svg className="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 16h20v2H2zm1.5-5L12 7l8.5 4v2H12v2h8.5v2H3.5z"/>
          </svg>
          <div className="w-6 h-3 bg-gray-900 rounded-sm ml-1"></div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Recommendations</h1>
      </div>

      {/* Mood Selection */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling?</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border-2 transition-all ${
                selectedMood === mood.id
                  ? 'border-primary bg-primary text-white'
                  : `border-gray-200 ${mood.color} hover:border-gray-300`
              }`}
            >
              <span className="mr-2">{mood.emoji}</span>
              {mood.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for you</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {recommendations.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {/* Image */}
              <div className="h-32 bg-gradient-to-br from-green-100 to-orange-100 flex items-center justify-center text-4xl relative">
                {item.image}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-gray-700">Replace with alternative</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">{item.name}</h4>
                <p className="text-xs text-gray-600 mb-3">{item.description}</p>
                
                {/* Macros */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{item.calories}</div>
                    <div className="text-xs text-gray-600">Kcal</div>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-1"></span>
                      <span>{item.protein}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1"></span>
                      <span>{item.carbs}/{item.fat}</span>
                    </div>
                  </div>
                </div>

                {/* Replace Button */}
                <button className="w-full py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border border-gray-400 rounded"></span>
                  Replace with alternative
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={handleAddAllToLog}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-medium"
          >
            Add All to Log
          </Button>
          
          <Button
            onClick={handleSaveAsMealPlan}
            variant="outline"
            className="w-full h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-2xl text-lg font-medium"
          >
            Save as Meal Plan
          </Button>
        </div>

        {/* Nutritional Tip */}
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Nutritional Tip</h4>
              <p className="text-sm text-gray-600 mb-2">
                Stay hydrated! Add lemon water for extra vitamin C and a refreshing twist to your daily intake.
              </p>
              <button className="text-sm text-primary font-medium hover:underline">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
