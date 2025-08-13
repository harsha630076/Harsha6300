import { Button } from '@/components/ui/button';
import { Camera, Mic } from 'lucide-react';

export default function Permissions() {
  const handleAllow = async () => {
    try {
      // Request camera permission
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Request microphone permission  
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      console.log('Permissions granted');
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.log('Permission denied or error:', error);
      // Still redirect to dashboard for demo purposes
      window.location.href = '/dashboard';
    }
  };

  const handleDeny = () => {
    console.log('Permissions denied');
    // Redirect to dashboard anyway for demo
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Icons */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Mic className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4">Enable Essential Permissions</h1>
        
        {/* Description */}
        <p className="text-center text-gray-600 mb-12 max-w-sm leading-relaxed">
          QuickCal AI uses your camera for instant meal scanning and your microphone for voice commands to enhance your tracking experience.
        </p>

        {/* Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <Button
            onClick={handleAllow}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-medium"
          >
            Allow
          </Button>
          
          <Button
            onClick={handleDeny}
            variant="outline"
            className="w-full h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-2xl text-lg font-medium"
          >
            Deny
          </Button>
        </div>
      </div>
    </div>
  );
}
