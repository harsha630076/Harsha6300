import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";
import { Camera, Plus, TrendingUp, Heart, Brain, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "@/api/client";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [todayMeals, setTodayMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, mealsData] = await Promise.all([
          apiClient.getMe(),
          apiClient.getMealsForDay(new Date().toISOString().split('T')[0])
        ]);
        setUser(userData);
        setTodayMeals(mealsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalCalories = todayMeals.reduce((sum, meal) => sum + (meal.totalKcal || 0), 0);
  const targetCalories = 2000; // This could come from user profile

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const caloriesConsumed = 1850;
  const caloriesGoal = 2200;
  const caloriesRemaining = caloriesGoal - caloriesConsumed;
  const progressPercentage = (caloriesConsumed / caloriesGoal) * 100;

  const macros = [
    { name: "Protein", percentage: 30, color: "bg-primary" },
    { name: "Carbs", percentage: 45, color: "bg-orange-500" },
    { name: "Fat", percentage: 25, color: "bg-gray-700" },
  ];

  const dailyMeals = [
    {
      id: 1,
      name: "Scrambled Eggs & Avocado Toast",
      calories: 380,
      image: "🍳",
    },
    {
      id: 2,
      name: "Grilled Chicken Salad",
      calories: 450,
      image: "🥗",
    },
    {
      id: 3,
      name: "Lentil Soup",
      calories: 320,
      image: "🍲",
    },
    {
      id: 4,
      name: "Mixed Berries & Greek Yogurt",
      calories: 180,
      image: "🫐",
    },
  ];

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
            <path d="M2 16h20v2H2zm1.5-5L12 7l8.5 4v2H12v2h8.5v2H3.5z" />
          </svg>
          <div className="w-6 h-3 bg-gray-900 rounded-sm ml-1"></div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">QuickCal AI</h1>
        <div className="flex items-center gap-3">
          <Link to="/ai-assistant">
            <Button
              size="sm"
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-3 py-1 text-xs font-medium"
            >
              🤖 AI Assistant
            </Button>
          </Link>
          <Link to="/notifications" className="relative">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </Link>
          <div className="w-8 h-8 bg-green-200 rounded-full"></div>
        </div>
      </div>

      {/* Greeting */}
      <div className="px-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Hi, {user?.name || 'User'}</h2>
      </div>

      {/* Calorie Progress */}
      <div className="px-6 mb-8">
        <Card className="rounded-2xl p-6 shadow-sm border border-gray-100">
          <CardHeader className="p-0 mb-2">
            <CardDescription className="text-sm text-gray-600">Calories Remaining</CardDescription>
            <CardTitle className="text-sm font-medium text-gray-900">
              {(targetCalories - totalCalories).toLocaleString()} kcal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalCalories.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of {targetCalories.toLocaleString()} calories
            </p>
            <Progress value={(totalCalories / targetCalories) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Macro Breakdown */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Macro Breakdown
        </h3>
        <div className="flex items-center justify-center gap-8">
          {macros.map((macro) => (
            <div key={macro.name} className="text-center">
              <div
                className={`w-16 h-16 ${macro.color} rounded-full flex items-center justify-center mb-2`}
              >
                <span className="text-white font-bold text-sm">
                  {macro.percentage}%
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {macro.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Meals */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Daily Meals
        </h3>
        <div className="space-y-3">
          {todayMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {meal.icon || "🍲"}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">
                  {meal.name}
                </h4>
                <p className="text-sm text-gray-600">{meal.totalKcal} kcal</p>
              </div>
              <Edit3 className="w-5 h-5 text-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* AI Scan Feature - HIGHLIGHTED */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-4 translate-x-4"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-200/20 rounded-full translate-y-4 -translate-x-4"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  🔥 AI Food Scanner
                </h3>
                <p className="text-sm text-green-600 font-medium">
                  Main Feature - Instant Recognition
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Point your camera at any meal for instant AI-powered nutrition
              analysis with 95% accuracy!
            </p>
            <Link to="/scan">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 flex items-center gap-2 shadow-lg">
                <Camera className="w-5 h-5" />
                Start AI Scan
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-1"></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mood Recommendations */}
      <div className="px-6 mb-8">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Feeling unwell?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Check mood-based food suggestions that can help you feel better.
          </p>
          <Link to="/recommendations">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 flex items-center gap-2">
              View Suggestions
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
