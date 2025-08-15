import { useEffect, useState } from "react";

interface AnimatedProgressProps {
  currentStep: number;
  totalSteps: number;
  showPercentage?: boolean;
  animated?: boolean;
}

export default function AnimatedProgress({
  currentStep,
  totalSteps,
  showPercentage = false,
  animated = true,
}: AnimatedProgressProps) {
  const [animatedStep, setAnimatedStep] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedStep(currentStep);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedStep(currentStep);
    }
  }, [currentStep, animated]);

  const progress = (animatedStep / totalSteps) * 100;

  return (
    <div className="space-y-3">
      {/* Dots Progress */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`
              h-2 flex-1 rounded-full transition-all duration-500 ease-out
              ${
                index < animatedStep
                  ? "bg-primary scale-105"
                  : index === animatedStep
                    ? "bg-primary/60 animate-pulse"
                    : "bg-gray-200"
              }
            `}
          />
        ))}
      </div>

      {/* Step Text */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
        {showPercentage && (
          <span className="text-primary font-medium">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      {/* Linear Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
