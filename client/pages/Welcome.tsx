import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Camera, Mic, Sparkles, TrendingUp, Heart, Zap } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">QuickCal AI</span>
        </div>

        {/* Hero Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            AI-Powered Calorie & Health Tracking
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-sm">
            Transform your health journey with intelligent food recognition and personalized recommendations
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-sm">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
            <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">AI Food Scan</p>
            <p className="text-xs text-gray-600">Instant recognition</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Mood Tracking</p>
            <p className="text-xs text-gray-600">Smart suggestions</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
            <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Progress Insights</p>
            <p className="text-xs text-gray-600">Track your journey</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
            <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">AI Assistant</p>
            <p className="text-xs text-gray-600">24/7 guidance</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-8">
        <Link to="/signup" className="block">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 text-lg font-semibold">
            Get Started
          </Button>
        </Link>
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
            Already have an account? <span className="text-primary font-medium">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
