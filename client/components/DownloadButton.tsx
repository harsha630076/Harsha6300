import { Button } from '@/components/ui/button';
import { Download, FileText, Database, Share } from 'lucide-react';
import { useState } from 'react';

interface DownloadButtonProps {
  userId?: number;
  variant?: 'data' | 'app' | 'report';
  className?: string;
}

export default function DownloadButton({ userId = 1, variant = 'data', className }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadUserData = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/users/${userId}/export`);
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quickcal-ai-data-${userId}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      // Show success message
      alert('✅ Your data has been downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      alert('❌ Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAPK = () => {
    // This would link to your actual APK file or app store
    const apkUrl = '/downloads/quickcal-ai-latest.apk';
    const a = document.createElement('a');
    a.href = apkUrl;
    a.download = 'quickcal-ai-latest.apk';
    a.click();
    
    // Show install instructions
    alert('📱 APK download started! Enable "Install from unknown sources" in Android settings to install.');
  };

  const downloadReport = async () => {
    setIsDownloading(true);
    try {
      // Generate PDF report (in a real app, this would be server-generated)
      const reportData = {
        user: { id: userId, name: 'User Report' },
        generatedAt: new Date().toISOString(),
        period: 'Last 30 days',
        summary: {
          totalMeals: 45,
          avgCalories: 1950,
          topFoods: ['Chicken Breast', 'Avocado', 'Quinoa'],
          achievements: ['7-day streak', 'Protein goal met']
        }
      };
      
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(reportData, null, 2))}`;
      const a = document.createElement('a');
      a.href = dataStr;
      a.download = `health-report-${userId}-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      alert('📊 Health report downloaded successfully!');
    } catch (error) {
      console.error('Report download failed:', error);
      alert('❌ Report download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuickCal AI - Health Tracker',
          text: 'Check out this amazing AI-powered nutrition tracking app!',
          url: window.location.origin,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = window.location.origin;
      navigator.clipboard.writeText(url);
      alert('🔗 App link copied to clipboard!');
    }
  };

  const handleClick = () => {
    switch (variant) {
      case 'data':
        downloadUserData();
        break;
      case 'app':
        downloadAPK();
        break;
      case 'report':
        downloadReport();
        break;
      default:
        downloadUserData();
    }
  };

  const getButtonConfig = () => {
    switch (variant) {
      case 'data':
        return {
          icon: Database,
          text: 'Export My Data',
          description: 'Download all your health data in JSON format'
        };
      case 'app':
        return {
          icon: Download,
          text: 'Download APK',
          description: 'Get the Android app file'
        };
      case 'report':
        return {
          icon: FileText,
          text: 'Download Report',
          description: 'Generate and download health report'
        };
      default:
        return {
          icon: Download,
          text: 'Download',
          description: 'Download data'
        };
    }
  };

  const config = getButtonConfig();
  const Icon = config.icon;

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        disabled={isDownloading}
        className={`w-full flex items-center gap-2 ${className}`}
        variant="outline"
      >
        <Icon className="w-4 h-4" />
        {isDownloading ? 'Downloading...' : config.text}
      </Button>
      
      {variant === 'app' && (
        <div className="text-center">
          <Button
            onClick={shareApp}
            variant="ghost"
            size="sm"
            className="text-xs text-gray-600 hover:text-gray-900"
          >
            <Share className="w-3 h-3 mr-1" />
            Share App
          </Button>
        </div>
      )}
      
      <p className="text-xs text-gray-500 text-center">{config.description}</p>
      
      {variant === 'data' && (
        <div className="text-xs text-gray-500 space-y-1">
          <p>📊 Includes: Personal info, food logs, notifications, and progress data</p>
          <p>🔒 Your data is exported securely and never shared with third parties</p>
          <p>📅 Data is current as of download time</p>
        </div>
      )}
      
      {variant === 'app' && (
        <div className="text-xs text-gray-500 space-y-1">
          <p>📱 Compatible with Android 5.0+ devices</p>
          <p>📦 File size: ~15MB</p>
          <p>🔄 Offline functionality included</p>
          <p>⚠️ Enable "Install from unknown sources" in Android settings</p>
        </div>
      )}
    </div>
  );
}

// PWA Install Component
export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useState(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <Button
      onClick={handleInstallPWA}
      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
    >
      <Download className="w-4 h-4 mr-2" />
      Install App
    </Button>
  );
}
