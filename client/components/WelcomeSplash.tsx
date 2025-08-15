import { useEffect, useState } from "react";
import { Sparkles, Heart, Zap, Target } from "lucide-react";

interface WelcomeSplashProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function WelcomeSplash({
  isVisible,
  onComplete,
}: WelcomeSplashProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const welcomeSteps = [
    {
      icon: Sparkles,
      title: "Welcome to QuickCal AI!",
      subtitle: "Your personalized nutrition companion",
    },
    {
      icon: Heart,
      title: "Smart Health Tracking",
      subtitle: "AI-powered food recognition",
    },
    {
      icon: Zap,
      title: "Real-time Insights",
      subtitle: "Instant nutrition analysis",
    },
    {
      icon: Target,
      title: "Achieve Your Goals",
      subtitle: "Personalized recommendations",
    },
  ];

  useEffect(() => {
    if (isVisible) {
      setShowContent(true);

      const stepTimer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < welcomeSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(stepTimer);
            setTimeout(() => {
              setShowContent(false);
              setTimeout(() => onComplete(), 500);
            }, 1500);
            return prev;
          }
        });
      }, 800);

      return () => clearInterval(stepTimer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const CurrentIcon = welcomeSteps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/90 to-primary text-white z-50 flex items-center justify-center">
      <div
        className={`text-center transition-all duration-500 transform ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <CurrentIcon className="w-12 h-12 text-white" />
          </div>

          {/* Animated circles */}
          <div className="absolute inset-0 -m-4">
            <div className="w-32 h-32 border-2 border-white/30 rounded-full animate-ping"></div>
          </div>
          <div className="absolute inset-0 -m-8">
            <div
              className="w-40 h-40 border border-white/20 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold mb-3 animate-in slide-in-from-bottom-4">
          {welcomeSteps[currentStep].title}
        </h1>
        <p
          className="text-lg text-white/90 animate-in slide-in-from-bottom-4"
          style={{ animationDelay: "0.2s" }}
        >
          {welcomeSteps[currentStep].subtitle}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {welcomeSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
