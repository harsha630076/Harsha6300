import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Camera, RotateCcw, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface CameraScannerProps {
  onClose: () => void;
  onFoodDetected: (food: FoodDetection) => void;
}

interface FoodDetection {
  name: string;
  confidence: number;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export default function CameraScanner({ onClose, onFoodDetected }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<FoodDetection[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      
      // Stop existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    setIsScanning(true);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob for analysis
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.8);
      });

      // Simulate AI food detection (in real app, send to AI service)
      await simulateFoodDetection(blob);

    } catch (error) {
      console.error('Error during capture and analysis:', error);
    } finally {
      setIsCapturing(false);
      setIsScanning(false);
    }
  };

  const simulateFoodDetection = async (imageBlob: Blob): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock detection results
    const mockDetections: FoodDetection[] = [
      {
        name: 'Apple',
        confidence: 0.92,
        calories: 52,
        macros: { protein: 0.3, carbs: 14, fat: 0.2 },
        boundingBox: { x: 100, y: 150, width: 120, height: 130 }
      },
      {
        name: 'Banana',
        confidence: 0.87,
        calories: 89,
        macros: { protein: 1.1, carbs: 23, fat: 0.3 },
        boundingBox: { x: 250, y: 180, width: 80, height: 200 }
      }
    ];

    setDetectedFoods(mockDetections);
  };

  const handleFoodSelect = (food: FoodDetection) => {
    onFoodDetected(food);
    onClose();
  };

  const renderDetectionOverlay = () => {
    if (!videoRef.current || detectedFoods.length === 0) return null;

    const video = videoRef.current;
    const scaleX = video.offsetWidth / video.videoWidth;
    const scaleY = video.offsetHeight / video.videoHeight;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {detectedFoods.map((food, index) => (
          <div
            key={index}
            className="absolute border-2 border-green-400 rounded"
            style={{
              left: food.boundingBox.x * scaleX,
              top: food.boundingBox.y * scaleY,
              width: food.boundingBox.width * scaleX,
              height: food.boundingBox.height * scaleY,
            }}
          >
            <div className="absolute -top-8 left-0 bg-green-400 text-white px-2 py-1 rounded text-xs font-medium">
              {food.name} ({Math.round(food.confidence * 100)}%)
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm relative z-10">
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2"
        >
          <X className="w-6 h-6" />
        </Button>
        <h1 className="text-white font-semibold">AI Food Scanner</h1>
        <Button
          onClick={switchCamera}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        {cameraError ? (
          <div className="flex-1 flex items-center justify-center bg-gray-900">
            <div className="text-center text-white">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <h3 className="text-lg font-semibold mb-2">Camera Error</h3>
              <p className="text-gray-300 mb-4">{cameraError}</p>
              <Button onClick={startCamera} className="bg-primary hover:bg-primary/90">
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Detection Overlay */}
            {renderDetectionOverlay()}

            {/* Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-900 font-medium">Analyzing food...</p>
                  <p className="text-gray-600 text-sm">Please hold steady</p>
                </div>
              </div>
            )}

            {/* Scan Guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-white/50 rounded-2xl relative">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-black/50 backdrop-blur-sm">
        {detectedFoods.length > 0 ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-white font-medium mb-2">Food detected!</p>
              <p className="text-white/70 text-sm">Tap on a food item to add it to your log</p>
            </div>
            <div className="space-y-2">
              {detectedFoods.map((food, index) => (
                <Button
                  key={index}
                  onClick={() => handleFoodSelect(food)}
                  className="w-full bg-white/90 hover:bg-white text-gray-900 p-4 h-auto text-left rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium">{food.name}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {Math.round(food.confidence * 100)}% confident
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {food.calories} kcal • P: {food.macros.protein}g C: {food.macros.carbs}g F: {food.macros.fat}g
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Button
              onClick={captureAndAnalyze}
              disabled={isCapturing || cameraError !== null}
              className="w-20 h-20 bg-white hover:bg-white/90 text-gray-900 rounded-full mb-4 disabled:opacity-50"
            >
              {isCapturing ? (
                <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Camera className="w-8 h-8" />
              )}
            </Button>
            <p className="text-white font-medium mb-1">Point camera at food</p>
            <p className="text-white/70 text-sm">Tap the camera button to scan</p>
          </div>
        )}

        {/* Tips */}
        <div className="mt-4 bg-white/10 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-white text-xs">
              <span className="font-medium">Tips:</span> Ensure good lighting, hold steady, and center the food in the frame for best results.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
