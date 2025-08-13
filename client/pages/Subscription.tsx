import { Button } from '@/components/ui/button';
import { Check, X, Sparkles, Crown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState('Monthly');
  const [showYearly, setShowYearly] = useState(false);

  const premiumBenefits = [
    {
      icon: '✨',
      title: 'Advanced AI Accuracy',
      description: 'More precise calorie tracking and dietary analysis powered by advanced algorithms.',
      included: true
    },
    {
      icon: '⚖️',
      title: 'Custom Diet Plans',
      description: 'Personalized meal plans generated to perfectly match your health goals and preferences.',
      included: true
    },
    {
      icon: '☕',
      title: 'Priority Support via AI Assistant',
      description: 'Instant, intelligent assistance for all your health and app-related queries.',
      included: true
    },
    {
      icon: '🧡',
      title: 'Mood & Health-Based Food Suggestions',
      description: 'Receive food recommendations tailored to your current mood, energy, or recovery needs.',
      included: true
    },
    {
      icon: '$',
      title: 'Ad-Free Experience',
      description: 'Enjoy uninterrupted tracking and recommendations without any advertisements.',
      included: true
    },
    {
      icon: '📊',
      title: 'Advanced Analytics & Insights',
      description: 'Detailed charts, trends, and health predictions based on your data.',
      included: true
    },
    {
      icon: '🔄',
      title: 'Unlimited AI Scans',
      description: 'Scan as many meals as you want with no daily limits.',
      included: true
    },
    {
      icon: '💾',
      title: 'Data Export & Backup',
      description: 'Export your health data and keep secure backups of your progress.',
      included: true
    }
  ];

  const freeFeatures = [
    { name: 'Basic Food Logging', included: true },
    { name: 'Simple Calorie Tracking', included: true },
    { name: 'Limited AI Scans (5/day)', included: true },
    { name: 'Basic Recommendations', included: true },
    { name: 'Community Support', included: true },
    { name: 'Advanced AI Accuracy', included: false },
    { name: 'Custom Diet Plans', included: false },
    { name: 'Priority AI Assistant', included: false },
    { name: 'Mood-Based Suggestions', included: false },
    { name: 'Ad-Free Experience', included: false },
    { name: 'Advanced Analytics', included: false },
    { name: 'Unlimited Scans', included: false }
  ];

  const pricingPlans = {
    monthly: { price: 9.99, period: '/month', savings: null },
    yearly: { price: 79.99, period: '/year', savings: 'Save $39.89' }
  };

  const testimonials = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'The AI scanning is incredibly accurate! I\'ve lost 15 lbs using the mood-based recommendations.',
      plan: 'Premium'
    },
    {
      name: 'David K.',
      rating: 5,
      text: 'Custom diet plans changed my life. Finally a nutrition app that understands my goals.',
      plan: 'Premium'
    },
    {
      name: 'Emma R.',
      rating: 5,
      text: 'Priority AI assistant is like having a nutritionist in my pocket 24/7.',
      plan: 'Premium'
    }
  ];

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    console.log(`Selected plan: ${plan}`);
  };

  const handleTrialStart = () => {
    console.log('Starting 7-day free trial');
    // Simulate trial start and redirect to dashboard
    setTimeout(() => {
      window.location.href = '/signup-details';
    }, 1000);
  };

  const handlePurchase = () => {
    console.log(`Purchasing ${selectedPlan} plan`);
    // Simulate purchase flow
    alert('Premium plan activated! Welcome to QuickCal AI Pro 🎉');
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-10"></div>
        <div className="relative px-6 py-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Unlock Your Full Health Potential
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Get personalized insights, unlimited AI scans, and advanced features to reach your health goals faster.
          </p>
        </div>
      </div>

      {/* Premium Benefits */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Premium Benefits</h2>
        <div className="space-y-4">
          {premiumBenefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Free vs Premium</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-sm font-medium text-gray-600">Feature</div>
            <div className="text-sm font-medium text-gray-600 text-center">Free</div>
            <div className="text-sm font-medium text-purple-600 text-center">Premium</div>
          </div>
          {freeFeatures.map((feature, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
              <div className="text-sm text-gray-900">{feature.name}</div>
              <div className="flex justify-center">
                {feature.included ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-gray-300" />
                )}
              </div>
              <div className="flex justify-center">
                <Check className="w-4 h-4 text-purple-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Choose Your Plan</h2>
        
        {/* Plan Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setShowYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !showYearly 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setShowYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                showYearly 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Save 33%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Plan</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$0</div>
              <p className="text-gray-600 mb-6">Perfect for getting started with basic nutrition tracking</p>
              <Link to="/signup">
                <Button variant="outline" className="w-full h-14 text-lg font-medium rounded-2xl">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-1 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div className="bg-white rounded-2xl p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Plan</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${showYearly ? pricingPlans.yearly.price : pricingPlans.monthly.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {showYearly ? pricingPlans.yearly.period : pricingPlans.monthly.period}
                  </span>
                  {showYearly && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      {pricingPlans.yearly.savings}
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-6">
                  All premium features including unlimited AI scans and personalized plans
                </p>
                <Button 
                  onClick={handleTrialStart}
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-medium rounded-2xl mb-3"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try 7 Days Free
                </Button>
                <p className="text-xs text-gray-500">Cancel anytime. No commitment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">What Our Users Say</h2>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                    <span className="text-xs text-purple-600 ml-2 bg-purple-100 px-2 py-1 rounded-full">
                      {testimonial.plan}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
            <p className="text-sm text-gray-600">Yes! You can cancel your subscription at any time from your profile settings. No questions asked.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-2">What happens after my free trial?</h4>
            <p className="text-sm text-gray-600">Your free trial includes all premium features. If you don't cancel, you'll be charged for your selected plan.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-2">How accurate is the AI food scanning?</h4>
            <p className="text-sm text-gray-600">Our AI achieves 95%+ accuracy for most common foods and continuously improves with more data.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Ready to Transform Your Health?</h3>
          <p className="text-purple-100 mb-6">Join thousands of users who've achieved their goals with QuickCal AI Premium</p>
          <Button 
            onClick={handleTrialStart}
            className="w-full h-14 bg-white text-purple-600 hover:bg-gray-100 text-lg font-medium rounded-2xl"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Your Free Trial
          </Button>
        </div>
      </div>

      {/* Nutritional Tip */}
      <div className="px-6 pb-8">
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Premium Tip</h4>
              <p className="text-sm text-gray-600">
                Premium users lose weight 3x faster on average thanks to personalized meal plans and mood-based recommendations!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
