import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Question {
  id: string;
  question: string;
  type: "single" | "multiple";
  options: Array<{
    id: string;
    label: string;
    emoji?: string;
    description?: string;
  }>;
}

export default function OnboardingQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const questions: Question[] = [
    {
      id: "health_conditions",
      question: "Do you have any health conditions we should know about?",
      type: "multiple",
      options: [
        { id: "diabetes", label: "Diabetes", emoji: "🩺" },
        { id: "hypertension", label: "High Blood Pressure", emoji: "❤️" },
        { id: "allergies", label: "Food Allergies", emoji: "⚠️" },
        { id: "thyroid", label: "Thyroid Issues", emoji: "🦋" },
        { id: "digestive", label: "Digestive Issues", emoji: "🫄" },
        { id: "none", label: "None of the above", emoji: "✅" },
      ],
    },
    {
      id: "eating_habits",
      question: "How would you describe your current eating habits?",
      type: "single",
      options: [
        {
          id: "excellent",
          label: "Excellent",
          emoji: "🌟",
          description: "I eat balanced meals regularly",
        },
        {
          id: "good",
          label: "Good",
          emoji: "😊",
          description: "I mostly eat well but could improve",
        },
        {
          id: "fair",
          label: "Fair",
          emoji: "😐",
          description: "I try to eat healthy but struggle sometimes",
        },
        {
          id: "poor",
          label: "Needs Work",
          emoji: "😔",
          description: "I often skip meals or eat unhealthy foods",
        },
      ],
    },
    {
      id: "motivation",
      question: "What motivates you most to track your nutrition?",
      type: "single",
      options: [
        {
          id: "weight_loss",
          label: "Weight Management",
          emoji: "⚖️",
          description: "Losing or maintaining healthy weight",
        },
        {
          id: "energy",
          label: "More Energy",
          emoji: "⚡",
          description: "Feeling more energetic throughout the day",
        },
        {
          id: "health",
          label: "Better Health",
          emoji: "❤️",
          description: "Improving overall health and wellness",
        },
        {
          id: "fitness",
          label: "Fitness Goals",
          emoji: "💪",
          description: "Supporting my workout and fitness routine",
        },
        {
          id: "habits",
          label: "Better Habits",
          emoji: "🎯",
          description: "Building consistent healthy eating habits",
        },
      ],
    },
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (optionId: string) => {
    const questionId = currentQ.id;

    if (currentQ.type === "single") {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: [optionId],
      }));
    } else {
      setAnswers((prev) => {
        const currentAnswers = prev[questionId] || [];
        if (currentAnswers.includes(optionId)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((id) => id !== optionId),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionId],
          };
        }
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Finished all questions
      console.log("Onboarding answers:", answers);
      window.location.href = "/permissions";
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const isAnswered = () => {
    const questionId = currentQ.id;
    const currentAnswers = answers[questionId] || [];
    return currentAnswers.length > 0;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        {currentQuestion > 0 ? (
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        ) : (
          <Link
            to="/signup-details"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        )}
        <h1 className="text-xl font-semibold">Quick Questions</h1>
        <div className="w-10"></div>
      </div>

      {/* Progress */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index <= currentQuestion ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="flex-1 px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {currentQ.options.map((option) => {
            const isSelected =
              answers[currentQ.id]?.includes(option.id) || false;

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  {option.emoji && (
                    <div className="text-3xl">{option.emoji}</div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {option.label}
                    </h3>
                    {option.description && (
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected &&
                      (currentQ.type === "single" ? (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      ) : (
                        <span className="text-white text-sm font-bold">✓</span>
                      ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Multiple selection note */}
        {currentQ.type === "multiple" && (
          <p className="text-sm text-gray-600 mt-4 text-center">
            You can select multiple options
          </p>
        )}
      </div>

      {/* Continue Button */}
      <div className="px-6 py-8">
        <Button
          onClick={handleNext}
          disabled={!isAnswered()}
          className="w-full h-14 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white rounded-2xl text-lg font-medium flex items-center justify-center gap-2"
        >
          {currentQuestion < questions.length - 1 ? (
            <>
              Continue
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>

      {/* Nutritional Tip */}
      <div className="px-6 pb-8">
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 text-sm">🎯</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Personalized Experience
              </h4>
              <p className="text-sm text-gray-600">
                These questions help us create a completely personalized
                nutrition experience tailored to your specific needs and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
