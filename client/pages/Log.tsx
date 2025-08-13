import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Plus,
  Edit3,
  Camera,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Log() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState("All");

  const mealTypes = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

  // Mock meal history database
  const mealHistory = [
    {
      id: 1,
      date: "2024-01-15",
      mealType: "Breakfast",
      items: [
        {
          name: "Scrambled Eggs",
          calories: 180,
          protein: 12,
          carbs: 2,
          fat: 14,
          image: "🍳",
        },
        {
          name: "Whole Wheat Toast",
          calories: 80,
          protein: 3,
          carbs: 16,
          fat: 1,
          image: "🍞",
        },
        {
          name: "Avocado Spread",
          calories: 120,
          protein: 2,
          carbs: 6,
          fat: 11,
          image: "🥑",
        },
      ],
      totalCalories: 380,
      loggedAt: "8:30 AM",
      method: "AI Scan",
    },
    {
      id: 2,
      date: "2024-01-15",
      mealType: "Lunch",
      items: [
        {
          name: "Grilled Chicken Salad",
          calories: 320,
          protein: 35,
          carbs: 12,
          fat: 15,
          image: "🥗",
        },
        {
          name: "Olive Oil Dressing",
          calories: 90,
          protein: 0,
          carbs: 1,
          fat: 10,
          image: "🫒",
        },
        {
          name: "Sparkling Water",
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          image: "💧",
        },
      ],
      totalCalories: 410,
      loggedAt: "1:15 PM",
      method: "Manual Entry",
    },
    {
      id: 3,
      date: "2024-01-15",
      mealType: "Dinner",
      items: [
        {
          name: "Baked Salmon",
          calories: 280,
          protein: 39,
          carbs: 0,
          fat: 12,
          image: "🐟",
        },
        {
          name: "Steamed Broccoli",
          calories: 55,
          protein: 6,
          carbs: 11,
          fat: 1,
          image: "🥦",
        },
        {
          name: "Brown Rice",
          calories: 180,
          protein: 4,
          carbs: 36,
          fat: 2,
          image: "🍚",
        },
      ],
      totalCalories: 515,
      loggedAt: "7:45 PM",
      method: "AI Scan",
    },
    {
      id: 4,
      date: "2024-01-15",
      mealType: "Snacks",
      items: [
        {
          name: "Greek Yogurt",
          calories: 100,
          protein: 17,
          carbs: 6,
          fat: 0,
          image: "🥛",
        },
        {
          name: "Mixed Berries",
          calories: 60,
          protein: 1,
          carbs: 15,
          fat: 0,
          image: "🫐",
        },
        {
          name: "Almonds",
          calories: 164,
          protein: 6,
          carbs: 6,
          fat: 14,
          image: "🥜",
        },
      ],
      totalCalories: 324,
      loggedAt: "4:20 PM",
      method: "Manual Entry",
    },
    {
      id: 5,
      date: "2024-01-14",
      mealType: "Breakfast",
      items: [
        {
          name: "Oatmeal with Banana",
          calories: 280,
          protein: 8,
          carbs: 54,
          fat: 5,
          image: "🥣",
        },
        {
          name: "Honey",
          calories: 64,
          protein: 0,
          carbs: 17,
          fat: 0,
          image: "🍯",
        },
      ],
      totalCalories: 344,
      loggedAt: "8:00 AM",
      method: "AI Scan",
    },
  ];

  const todaysMeals = mealHistory.filter(
    (meal) =>
      meal.date === "2024-01-15" &&
      (selectedMeal === "All" || meal.mealType === selectedMeal),
  );

  const todaysTotalCalories = todaysMeals.reduce(
    (sum, meal) => sum + meal.totalCalories,
    0,
  );
  const calorieGoal = 2200;
  const progressPercentage = (todaysTotalCalories / calorieGoal) * 100;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Food Log</h1>
        <Link to="/food-search">
          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0 rounded-full"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {formatDate(selectedDate)}
        </h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Daily Summary */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Today's Summary
              </h3>
              <p className="text-sm text-gray-600">
                {todaysMeals.length} meals logged
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {todaysTotalCalories}
              </div>
              <div className="text-sm text-gray-600">/ {calorieGoal} kcal</div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <span>Consumed</span>
            <span>
              {Math.max(0, calorieGoal - todaysTotalCalories)} kcal remaining
            </span>
          </div>
        </div>
      </div>

      {/* Meal Type Filter */}
      <div className="px-6 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mealTypes.map((mealType) => (
            <button
              key={mealType}
              onClick={() => setSelectedMeal(mealType)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedMeal === mealType
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {mealType}
            </button>
          ))}
        </div>
      </div>

      {/* Meal History */}
      <div className="px-6 space-y-4">
        {todaysMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            {/* Meal Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {meal.mealType}
                </h4>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>{meal.loggedAt}</span>
                  <span>•</span>
                  <span
                    className={`inline-flex items-center gap-1 ${
                      meal.method === "AI Scan"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {meal.method === "AI Scan" ? (
                      <Camera className="w-3 h-3" />
                    ) : (
                      <Edit3 className="w-3 h-3" />
                    )}
                    {meal.method}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {meal.totalCalories}
                </div>
                <div className="text-sm text-gray-600">kcal</div>
              </div>
            </div>

            {/* Food Items */}
            <div className="space-y-3 mb-4">
              {meal.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 text-sm">
                      {item.name}
                    </h5>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>P: {item.protein}g</span>
                      <span>C: {item.carbs}g</span>
                      <span>F: {item.fat}g</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {item.calories}
                    </div>
                    <div className="text-xs text-gray-600">kcal</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Meal Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Meal
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                📋 Copy Meal
              </Button>
            </div>
          </div>
        ))}

        {todaysMeals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
              📝
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No meals logged today
            </h3>
            <p className="text-gray-600 mb-6">
              Start tracking your nutrition by adding your first meal.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/scan">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Camera className="w-4 h-4 mr-2" />
                  AI Scan Meal
                </Button>
              </Link>
              <Link to="/food-search">
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search Food
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Nutritional Tip */}
      <div className="px-6 mt-6 mb-8">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Daily Logging Tip
              </h4>
              <p className="text-sm text-gray-600">
                Consistent food logging can improve weight management success by
                up to 60%. Try to log meals immediately after eating for best
                accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
