import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, TrendingDown, Target, Calendar, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Insights() {
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');
  const [selectedMetric, setSelectedMetric] = useState('Calories');

  const periods = ['Weekly', 'Monthly', 'Yearly'];
  const metrics = ['Calories', 'Weight', 'Macros', 'Exercise'];

  // Mock analytics database
  const weeklyData = {
    calories: [1850, 2100, 1950, 2200, 1800, 2050, 1900],
    weight: [60.2, 60.1, 60.0, 59.9, 59.8, 59.9, 59.7],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const nutritionTrends = {
    calories: { current: 1900, previous: 2100, trend: 'down', change: -9.5 },
    protein: { current: 120, previous: 110, trend: 'up', change: 9.1 },
    carbs: { current: 180, previous: 220, trend: 'down', change: -18.2 },
    fat: { current: 65, previous: 70, trend: 'down', change: -7.1 }
  };

  const achievements = [
    { id: 1, title: 'Calorie Goal Met', description: '5 days this week', icon: '🎯', color: 'bg-green-100 text-green-700' },
    { id: 2, title: 'Protein Target Hit', description: '7 days streak', icon: '💪', color: 'bg-blue-100 text-blue-700' },
    { id: 3, title: 'Hydration Hero', description: '8+ glasses daily', icon: '💧', color: 'bg-cyan-100 text-cyan-700' },
    { id: 4, title: 'AI Scan Master', description: '15 scans this week', icon: '📸', color: 'bg-purple-100 text-purple-700' }
  ];

  const frequentFoods = [
    { name: 'Avocado Toast', count: 8, calories: 320, image: '🥑', trend: 'stable' },
    { name: 'Grilled Salmon', count: 6, calories: 450, image: '🐟', trend: 'up' },
    { name: 'Greek Yogurt', count: 12, calories: 150, image: '🥛', trend: 'up' },
    { name: 'Mixed Salad', count: 10, calories: 120, image: '🥗', trend: 'down' }
  ];

  const healthMetrics = [
    { label: 'BMI', value: '22.1', status: 'Normal', color: 'text-green-600' },
    { label: 'Body Fat', value: '18%', status: 'Healthy', color: 'text-green-600' },
    { label: 'Water Intake', value: '2.1L', status: 'Good', color: 'text-blue-600' },
    { label: 'Sleep', value: '7.2h', status: 'Optimal', color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Health Insights</h1>
        <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Period Selection */}
      <div className="px-6 mb-6">
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(nutritionTrends).map(([key, data]) => (
            <div key={key} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 capitalize">{key}</span>
                <div className={`flex items-center gap-1 ${
                  data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.trend === 'up' ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  <span className="text-xs font-medium">{Math.abs(data.change)}%</span>
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {data.current}{key === 'calories' ? '' : 'g'}
              </div>
              <div className="text-xs text-gray-500">
                vs {data.previous}{key === 'calories' ? '' : 'g'} last week
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Calorie Chart */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Calorie Trend</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-gray-600">Calories</span>
              </div>
            </div>
          </div>
          
          {/* Simple Chart Representation */}
          <div className="h-40 flex items-end justify-between gap-2">
            {weeklyData.calories.map((calories, index) => {
              const height = (calories / 2400) * 100; // Normalize to chart height
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full">
                    <div 
                      className="bg-primary rounded-t-lg w-full transition-all duration-300"
                      style={{ height: `${height}%`, minHeight: '20px' }}
                    ></div>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                      {calories}
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{weeklyData.days[index]}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Average Daily Calories</span>
              <span className="font-semibold text-gray-900">1,971 kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics</h3>
        <div className="grid grid-cols-2 gap-3">
          {healthMetrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
              <div className="text-xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className={`text-xs font-medium ${metric.color}`}>{metric.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${achievement.color} rounded-full flex items-center justify-center text-lg mb-3`}>
                {achievement.icon}
              </div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Eaten Foods */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Eaten Foods</h3>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {frequentFoods.map((food, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                  {food.image}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{food.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>{food.count}x this month</span>
                    <span>•</span>
                    <span>{food.calories} kcal avg</span>
                  </div>
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  food.trend === 'up' ? 'bg-green-100 text-green-700' :
                  food.trend === 'down' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {food.trend === 'up' ? '↗️' : food.trend === 'down' ? '↘️' : '→'} {food.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals Progress</h3>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Weight Loss Goal</span>
                <span className="text-sm font-medium text-gray-900">-1.5kg / -2kg</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="text-xs text-gray-500 mt-1">75% to target weight</div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Daily Calorie Consistency</span>
                <span className="text-sm font-medium text-gray-900">5/7 days</span>
              </div>
              <Progress value={71} className="h-2" />
              <div className="text-xs text-gray-500 mt-1">Great consistency this week!</div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Protein Target</span>
                <span className="text-sm font-medium text-gray-900">120g / 100g</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-xs text-green-600 mt-1">Target exceeded! 🎉</div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutritional Tip */}
      <div className="px-6 mb-8">
        <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 text-sm">📊</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Weekly Insight</h4>
              <p className="text-sm text-gray-600">
                Your protein intake has improved by 9% this week! This supports muscle recovery and helps maintain satiety throughout the day.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
