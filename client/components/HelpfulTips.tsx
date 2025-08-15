import { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HelpfulTipsProps {
  tips: string[];
  autoRotate?: boolean;
  showClose?: boolean;
  className?: string;
}

export default function HelpfulTips({ 
  tips, 
  autoRotate = true, 
  showClose = true,
  className = '' 
}: HelpfulTipsProps) {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoRotate && tips.length > 1) {
      const interval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % tips.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [autoRotate, tips.length]);

  if (!isVisible || tips.length === 0) return null;

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-xl p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Lightbulb className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">
            💡 Helpful Tip
          </h4>
          <p className="text-sm text-gray-600 animate-in slide-in-from-left-2">
            {tips[currentTip]}
          </p>
          {tips.length > 1 && (
            <div className="flex gap-1 mt-2">
              {tips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTip(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTip ? 'bg-blue-500' : 'bg-blue-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        {showClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="w-6 h-6 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
