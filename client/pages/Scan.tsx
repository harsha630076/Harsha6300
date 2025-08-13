import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Settings, Camera, Mic, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Scan() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const mockScanResults = [
    {
      id: 1,
      name: "Grilled Chicken Breast",
      calories: 250,
      weight: "180g",
      accuracy: 95,
      portionSize: 75,
      image: "🍗",
    },
    {
      id: 2,
      name: "Steamed Broccoli Florets",
      calories: 55,
      weight: "150g",
      accuracy: 98,
      portionSize: 80,
      image: "🥦",
    },
    {
      id: 3,
      name: "Brown Rice",
      calories: 180,
      weight: "120g",
      accuracy: 92,
      portionSize: 60,
      image: "🍚",
    },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setShowResults(false);

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanResults(mockScanResults);
      setShowResults(true);
    }, 3000);
  };

  const handleAddToLog = () => {
    console.log("Adding meal to log:", scanResults);
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background pb-20">
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
            <svg
              className="w-6 h-6 ml-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2 16h20v2H2zm1.5-5L12 7l8.5 4v2H12v2h8.5v2H3.5z" />
            </svg>
            <div className="w-6 h-3 bg-gray-900 rounded-sm ml-1"></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setShowResults(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Scan Meal</h1>
          <Settings className="w-6 h-6 text-gray-600" />
        </div>

        {/* Results */}
        <div className="px-6">
          {/* Success Message */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Scan Complete!
            </h2>
          </div>

          {/* Food Items */}
          <div className="space-y-4 mb-8">
            {scanResults.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {item.calories} Cal{" "}
                      <span className="text-base text-gray-600">
                        ({item.weight})
                      </span>
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium text-orange-700">
                        {item.accuracy}% Accurate
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Portion Size:</span>
                  </div>
                  <Progress value={item.portionSize} className="h-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Add to Log Button */}
          <Button
            onClick={handleAddToLog}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-medium mb-6"
          >
            Add to Food Log
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
      {/* Camera Viewfinder Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-4 text-sm font-medium relative z-10">
        <span className="text-white">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
          <svg
            className="w-6 h-6 ml-2 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2 16h20v2H2zm1.5-5L12 7l8.5 4v2H12v2h8.5v2H3.5z" />
          </svg>
          <div className="w-6 h-3 bg-white rounded-sm ml-1"></div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 relative z-10">
        <Link to="/dashboard" className="p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-xl font-semibold text-white">Scan Meal</h1>
        <Settings className="w-6 h-6 text-white" />
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Mock Food Image */}
        <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-orange-200 to-yellow-100 flex items-center justify-center mb-8 relative">
          <div className="text-8xl">🍽️</div>

          {/* Scanning Overlay */}
          {isScanning && (
            <div className="absolute inset-0 rounded-3xl border-4 border-primary bg-primary/10 flex items-center justify-center">
              <div className="bg-white/90 rounded-2xl p-4">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Scanning Status */}
        {isScanning && (
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              Analyzing your meal...
            </h2>
            <p className="text-gray-300">
              AI is identifying ingredients and calculating nutrition
            </p>
          </div>
        )}

        {/* Instructions */}
        {!isScanning && (
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              Point camera at your meal
            </h2>
            <p className="text-gray-300">
              Make sure all food items are clearly visible
            </p>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center px-6 z-10">
        <div className="flex items-center gap-8">
          {/* Gallery */}
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <div className="w-8 h-6 bg-white/40 rounded"></div>
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg disabled:opacity-50"
          >
            <Camera className="w-8 h-8 text-white" />
          </button>

          {/* Voice */}
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Visily Branding */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/60 text-sm z-10">
        <span>Made with</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="font-medium">Visily</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
