import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Skip } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FlashNotification from "@/components/FlashNotification";
import AnimatedProgress from "@/components/AnimatedProgress";

export default function SignupDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    dietType: "",
  });
  const [flashNotification, setFlashNotification] = useState<{
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
    isVisible: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  const activityLevels = [
    {
      id: "sedentary",
      label: "Sedentary",
      description: "Little to no exercise",
    },
    {
      id: "light",
      label: "Light",
      description: "Light exercise 1-3 days/week",
    },
    {
      id: "moderate",
      label: "Moderate",
      description: "Moderate exercise 3-5 days/week",
    },
    {
      id: "active",
      label: "Active",
      description: "Heavy exercise 6-7 days/week",
    },
    {
      id: "very-active",
      label: "Very Active",
      description: "Very heavy exercise, physical job",
    },
  ];

  const goals = [
    { id: "lose-weight", label: "Lose Weight", emoji: "⬇️" },
    { id: "gain-weight", label: "Gain Weight", emoji: "⬆️" },
    { id: "maintain-weight", label: "Maintain Weight", emoji: "➡️" },
    { id: "build-muscle", label: "Build Muscle", emoji: "💪" },
    { id: "improve-health", label: "Improve Health", emoji: "❤️" },
  ];

  const dietTypes = [
    {
      id: "omnivore",
      label: "Omnivore",
      description: "No dietary restrictions",
    },
    { id: "vegetarian", label: "Vegetarian", description: "No meat" },
    { id: "vegan", label: "Vegan", description: "No animal products" },
    { id: "keto", label: "Ketogenic", description: "Low carb, high fat" },
    { id: "paleo", label: "Paleo", description: "Whole foods only" },
    {
      id: "mediterranean",
      label: "Mediterranean",
      description: "Fish, olive oil, vegetables",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Provide instant feedback for certain fields
    if (field === 'age' && value) {
      const age = parseInt(value);
      if (age < 13) {
        showFlash('warning', 'Age should be 13 or older');
      } else if (age > 100) {
        showFlash('warning', 'Please enter a valid age');
      }
    }

    if (field === 'weight' && value) {
      const weight = parseFloat(value);
      if (weight < 30 || weight > 300) {
        showFlash('warning', 'Please enter a realistic weight');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("User details:", formData);

    setFlashNotification({
      type: 'success',
      message: 'Profile saved successfully! 🎉',
      isVisible: true
    });

    setTimeout(() => {
      navigate("/onboarding-questions");
    }, 1000);
  };

  const handleSkip = () => {
    setFlashNotification({
      type: 'info',
      message: 'Details skipped - you can add them later! ⏭️',
      isVisible: true
    });

    setTimeout(() => {
      navigate("/onboarding-questions");
    }, 1000);
  };

  const showFlash = (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
    setFlashNotification({ type, message, isVisible: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/signup" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Tell us about yourself
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700 p-2"
        >
          <span className="text-sm">Skip</span>
        </Button>
      </div>

      {/* Progress */}
      <div className="px-6 mb-6">
        <AnimatedProgress currentStep={2} totalSteps={4} showPercentage />
      </div>

      <form onSubmit={handleSubmit} className="px-6 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        {/* Personal Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="h-12 rounded-xl border-gray-200"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="h-12 rounded-xl border-gray-200"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label
                htmlFor="age"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="h-12 rounded-xl border-gray-200"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="height"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="h-12 rounded-xl border-gray-200"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="weight"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="h-12 rounded-xl border-gray-200"
                required
              />
            </div>
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Activity Level
          </h2>
          <div className="space-y-3">
            {activityLevels.map((level) => (
              <label
                key={level.id}
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  formData.activityLevel === level.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <input
                  type="radio"
                  name="activityLevel"
                  value={level.id}
                  checked={formData.activityLevel === level.id}
                  onChange={(e) =>
                    handleInputChange("activityLevel", e.target.value)
                  }
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{level.label}</h4>
                    <p className="text-sm text-gray-600">{level.description}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      formData.activityLevel === level.id
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.activityLevel === level.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What's your main goal?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {goals.map((goal) => (
              <label
                key={goal.id}
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center transform hover:scale-105 ${
                  formData.goal === goal.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <input
                  type="radio"
                  name="goal"
                  value={goal.id}
                  checked={formData.goal === goal.id}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                  className="sr-only"
                />
                <div className="text-2xl mb-2">{goal.emoji}</div>
                <h4 className="font-medium text-gray-900 text-sm">
                  {goal.label}
                </h4>
              </label>
            ))}
          </div>
        </div>

        {/* Diet Type */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Diet Preference
          </h2>
          <div className="space-y-3">
            {dietTypes.map((diet) => (
              <label
                key={diet.id}
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.dietType === diet.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="dietType"
                  value={diet.id}
                  checked={formData.dietType === diet.id}
                  onChange={(e) =>
                    handleInputChange("dietType", e.target.value)
                  }
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{diet.label}</h4>
                    <p className="text-sm text-gray-600">{diet.description}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      formData.dietType === diet.id
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.dietType === diet.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pb-8 space-y-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-2xl text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              'Continue to Questions'
            )}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Skip this step for now →
            </Button>
          </div>
        </div>
      </form>

      {/* Flash Notification */}
      {flashNotification && (
        <FlashNotification
          type={flashNotification.type}
          message={flashNotification.message}
          isVisible={flashNotification.isVisible}
          onClose={() => setFlashNotification(null)}
        />
      )}
    </div>
  );
}
