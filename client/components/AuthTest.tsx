import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { authAPI } from '@/api/auth';
import { useAuth } from './AuthProvider';

export default function AuthTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const { user, isAuthenticated, refreshUser } = useAuth();

  const runTests = async () => {
    const results: string[] = [];
    
    try {
      // Test 1: Check token existence
      const token = authAPI.getToken();
      results.push(`✅ Token exists: ${!!token}`);
      
      // Test 2: Check authentication status
      results.push(`✅ Is authenticated: ${isAuthenticated}`);
      
      // Test 3: Check user data
      results.push(`✅ User data: ${user ? user.email : 'No user'}`);
      
      // Test 4: Test login with demo credentials
      if (!isAuthenticated) {
        try {
          await authAPI.login({ email: 'test@example.com', password: 'password123' });
          results.push(`✅ Demo login: Success`);
        } catch (error) {
          results.push(`❌ Demo login: ${error instanceof Error ? error.message : 'Failed'}`);
        }
      }
      
      // Test 5: Test /me endpoint
      if (token && !token.startsWith('mock-jwt-token-')) {
        try {
          const userData = await authAPI.getMe();
          results.push(`✅ /me endpoint: ${userData.email}`);
        } catch (error) {
          results.push(`❌ /me endpoint: ${error instanceof Error ? error.message : 'Failed'}`);
        }
      } else {
        results.push(`ℹ️ /me endpoint: Skipped (mock token)`);
      }
      
    } catch (error) {
      results.push(`❌ Test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    setTestResults(results);
  };

  return (
    <div className="fixed top-4 left-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-md z-50">
      <h3 className="font-semibold text-sm mb-3">Auth System Test</h3>
      
      <Button 
        onClick={runTests}
        size="sm"
        className="mb-3"
      >
        Run Auth Tests
      </Button>
      
      {testResults.length > 0 && (
        <div className="space-y-1">
          {testResults.map((result, index) => (
            <div key={index} className="text-xs font-mono bg-gray-50 p-2 rounded">
              {result}
            </div>
          ))}
        </div>
      )}
      
      <Button 
        variant="ghost"
        size="sm"
        onClick={() => setTestResults([])}
        className="mt-2 text-xs"
      >
        Clear Results
      </Button>
    </div>
  );
}
