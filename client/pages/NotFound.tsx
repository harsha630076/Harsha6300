import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Camera, TrendingUp } from 'lucide-react';

export default function NotFound() {
  const quickActions = [
    { label: 'Dashboard', path: '/dashboard', icon: Home, color: 'bg-blue-500' },
    { label: 'AI Scan', path: '/scan', icon: Camera, color: 'bg-green-500' },
    { label: 'Food Search', path: '/food-search', icon: Search, color: 'bg-orange-500' },
    { label: 'Insights', path: '/insights', icon: TrendingUp, color: 'bg-purple-500' }
  ];

  const popularPages = [
    { name: 'Food Log', path: '/log', description: 'View your meal history' },
    { name: 'Recommendations', path: '/recommendations', description: 'Mood-based food suggestions' },
    { name: 'Profile Settings', path: '/profile', description: 'Manage your account' },
    { name: 'Premium Plans', path: '/subscription', description: 'Unlock advanced features' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Page Not Found</h1>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* 404 Illustration */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-6xl mb-6 mx-auto">
            🔍
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-sm">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="w-full max-w-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link key={action.path} to={action.path}>
                <Button 
                  variant="outline" 
                  className="w-full h-16 flex flex-col items-center gap-2 border-2 hover:border-primary/20 hover:bg-primary/5"
                >
                  <div className={`w-8 h-8 ${action.color} rounded-full flex items-center justify-center`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Pages */}
        <div className="w-full max-w-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Popular Pages</h3>
          <div className="space-y-3">
            {popularPages.map((page) => (
              <Link key={page.path} to={page.path}>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all">
                  <h4 className="font-medium text-gray-900 mb-1">{page.name}</h4>
                  <p className="text-sm text-gray-600">{page.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Action Button */}
        <div className="w-full max-w-sm">
          <Link to="/dashboard">
            <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-medium">
              <Home className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="px-6 pb-8">
        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Still need help?</h4>
          <p className="text-sm text-gray-600 mb-4">
            Contact our support team or check our help center for more assistance.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm">
              📧 Contact Support
            </Button>
            <Button variant="outline" size="sm">
              📚 Help Center
            </Button>
          </div>
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
              <h4 className="font-semibold text-gray-900 mb-1">Quick Tip</h4>
              <p className="text-sm text-gray-600">
                While you're here, remember that tracking your meals consistently can improve your health goals achievement by up to 70%!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
