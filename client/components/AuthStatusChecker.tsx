import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

export default function AuthStatusChecker() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Show status for a few seconds when auth state changes
    setShowStatus(true);
    const timer = setTimeout(() => setShowStatus(false), 3000);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (!showStatus || isLoading) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg max-w-xs z-50">
      <div className="text-xs">
        <div className={`font-medium ${isAuthenticated ? 'text-green-600' : 'text-gray-600'}`}>
          {isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}
        </div>
        {user && (
          <div className="text-gray-500 mt-1 truncate">
            {user.email}
          </div>
        )}
      </div>
    </div>
  );
}
