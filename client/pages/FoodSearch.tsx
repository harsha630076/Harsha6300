import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import { Search, Filter, Plus, Clock } from 'lucide-react';
import { useState } from 'react';

export default function FoodSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fruits', 'Grains', 'Proteins', 'Dairy', 'Vegetables'];

  const foodDatabase = [
    {
      id: 1,
      name: 'Red Apple',
      calories: 52,
      unit: '100g',
      category: 'Fruits',
      image: '🍎',
      macros: { protein: 0.3, carbs: 14, fat: 0.2 },
      rating: 4.8,
      reviews: 2847,
      verified: true,
      nutrition: { fiber: 2.4, sugar: 10.4, sodium: 1, potassium: 107 },
      benefits: ['Heart Health', 'Weight Management', 'Digestive Health'],
      barcode: '123456789012'
    },
    {
      id: 2,
      name: 'Instant Oatmeal',
      calories: 68,
      unit: '100g',
      category: 'Grains',
      image: '🥣',
      macros: { protein: 2.4, carbs: 12, fat: 1.4 },
      rating: 4.5,
      reviews: 1923,
      verified: true,
      nutrition: { fiber: 1.7, sugar: 0.9, sodium: 49, potassium: 61 },
      benefits: ['Energy Boost', 'Heart Health', 'Blood Sugar Control'],
      barcode: '123456789013'
    },
    {
      id: 3,
      name: 'Grilled Chicken Breast',
      calories: 165,
      unit: '100g',
      category: 'Proteins',
      image: '🍗',
      macros: { protein: 31, carbs: 0, fat: 3.6 },
      rating: 4.9,
      reviews: 5672,
      verified: true,
      nutrition: { fiber: 0, sugar: 0, sodium: 74, potassium: 256 },
      benefits: ['Muscle Building', 'Weight Loss', 'High Protein'],
      barcode: '123456789014'
    },
    {
      id: 4,
      name: 'Greek Yogurt (Plain)',
      calories: 59,
      unit: '100g',
      category: 'Dairy',
      image: '🥛',
      macros: { protein: 10, carbs: 3.6, fat: 0.4 },
      rating: 4.7,
      reviews: 3458,
      verified: true,
      nutrition: { fiber: 0, sugar: 3.6, sodium: 36, potassium: 141 },
      benefits: ['Probiotics', 'Bone Health', 'Protein Rich'],
      barcode: '123456789015'
    },
    {
      id: 5,
      name: 'Steamed Broccoli',
      calories: 34,
      unit: '100g',
      category: 'Vegetables',
      image: '🥦',
      macros: { protein: 2.8, carbs: 7, fat: 0.4 },
      rating: 4.3,
      reviews: 1876,
      verified: true,
      nutrition: { fiber: 2.6, sugar: 1.5, sodium: 33, potassium: 316 },
      benefits: ['Vitamin C', 'Antioxidants', 'Cancer Fighting'],
      barcode: '123456789016'
    },
    {
      id: 6,
      name: 'Almonds (Raw)',
      calories: 579,
      unit: '100g',
      category: 'Nuts',
      image: '🥜',
      macros: { protein: 21.2, carbs: 21.6, fat: 49.9 },
      rating: 4.8,
      reviews: 4293,
      verified: true,
      nutrition: { fiber: 12.5, sugar: 4.4, sodium: 1, potassium: 733 },
      benefits: ['Heart Health', 'Brain Function', 'Healthy Fats'],
      barcode: '123456789017'
    },
    {
      id: 7,
      name: 'Quinoa (Cooked)',
      calories: 120,
      unit: '100g',
      category: 'Grains',
      image: '🌾',
      macros: { protein: 4.4, carbs: 22, fat: 1.9 },
      rating: 4.6,
      reviews: 2956,
      verified: true,
      nutrition: { fiber: 2.8, sugar: 0.9, sodium: 7, potassium: 172 },
      benefits: ['Complete Protein', 'Gluten Free', 'Mineral Rich'],
      barcode: '123456789018'
    },
    {
      id: 8,
      name: 'Baked Salmon Fillet',
      calories: 208,
      unit: '100g',
      category: 'Proteins',
      image: '🐟',
      macros: { protein: 25, carbs: 0, fat: 12 },
      rating: 4.9,
      reviews: 3874,
      verified: true,
      nutrition: { fiber: 0, sugar: 0, sodium: 59, potassium: 363 },
      benefits: ['Omega-3', 'Heart Health', 'Brain Function'],
      barcode: '123456789019'
    },
    {
      id: 9,
      name: 'Avocado',
      calories: 160,
      unit: '100g',
      category: 'Fruits',
      image: '🥑',
      macros: { protein: 2, carbs: 9, fat: 15 },
      rating: 4.7,
      reviews: 5629,
      verified: true,
      nutrition: { fiber: 7, sugar: 0.7, sodium: 7, potassium: 485 },
      benefits: ['Healthy Fats', 'Fiber Rich', 'Potassium'],
      barcode: '123456789020'
    },
    {
      id: 10,
      name: 'Sweet Potato (Baked)',
      calories: 90,
      unit: '100g',
      category: 'Vegetables',
      image: '🍠',
      macros: { protein: 2, carbs: 21, fat: 0.1 },
      rating: 4.5,
      reviews: 2847,
      verified: true,
      nutrition: { fiber: 3.3, sugar: 6.8, sodium: 6, potassium: 475 },
      benefits: ['Vitamin A', 'Complex Carbs', 'Antioxidants'],
      barcode: '123456789021'
    },
    {
      id: 11,
      name: 'Spinach (Fresh)',
      calories: 23,
      unit: '100g',
      category: 'Vegetables',
      image: '🥬',
      macros: { protein: 2.9, carbs: 3.6, fat: 0.4 },
      rating: 4.4,
      reviews: 1934,
      verified: true,
      nutrition: { fiber: 2.2, sugar: 0.4, sodium: 79, potassium: 558 },
      benefits: ['Iron Rich', 'Folate', 'Vitamin K'],
      barcode: '123456789022'
    },
    {
      id: 12,
      name: 'Blueberries',
      calories: 57,
      unit: '100g',
      category: 'Fruits',
      image: '🫐',
      macros: { protein: 0.7, carbs: 14, fat: 0.3 },
      rating: 4.9,
      reviews: 4586,
      verified: true,
      nutrition: { fiber: 2.4, sugar: 10, sodium: 1, potassium: 77 },
      benefits: ['Antioxidants', 'Brain Health', 'Anti-Aging'],
      barcode: '123456789023'
    }
  ];

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recentSearches = ['Avocado', 'Quinoa', 'Chicken breast', 'Greek yogurt'];

  const handleAddFood = (food: typeof foodDatabase[0]) => {
    console.log('Adding food to log:', food);
    // Simulate adding to food log
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
        <h1 className="text-2xl font-bold text-gray-900">Find Food</h1>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-14 rounded-2xl border-gray-200 text-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0"
          >
            <Filter className="w-5 h-5 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches (shown when search is empty) */}
      {searchQuery === '' && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => setSearchQuery(search)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Food Results */}
      <div className="px-6">
        <div className="space-y-3">
          {filteredFoods.map((food) => (
            <div key={food.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {food.image}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{food.name}</h4>
                <p className="text-sm text-gray-600">{food.calories} kcal / {food.unit}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-gray-500">P: {food.macros.protein}g</span>
                  <span className="text-xs text-gray-500">C: {food.macros.carbs}g</span>
                  <span className="text-xs text-gray-500">F: {food.macros.fat}g</span>
                </div>
              </div>

              <Button
                onClick={() => handleAddFood(food)}
                size="sm"
                className="w-10 h-10 p-0 bg-primary hover:bg-primary/90 rounded-full"
              >
                <Plus className="w-5 h-5 text-white" />
              </Button>
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && searchQuery !== '' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
              🔍
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No food found</h3>
            <p className="text-gray-600 mb-4">
              Try searching with different keywords or browse categories above.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Suggest this food
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
