import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bell, Download } from "lucide-react";

export default function Profile() {
  const user = {
    name: "Alice Johnson",
    email: "alice.j@example.com",
    dailyCalorieGoal: 1850,
    totalCalorieGoal: 2200,
    progressPercentage: 84,
  };

  const personalInfo = [
    { label: "Name", value: "Alice Johnson" },
    { label: "Age", value: "30" },
    { label: "Height", value: "165 cm" },
    { label: "Weight", value: "60 kg" },
  ];

  const goals = [
    { label: "Weight Target", value: "58 kg" },
    { label: "Weekly Goal", value: "Lose 0.5 kg" },
    { label: "Activity Level", value: "Moderate" },
  ];

  const dietaryPreferences = [
    { label: "Diet Type", value: "Vegetarian" },
    { label: "Allergies", value: "Nuts, Shellfish" },
    { label: "Dislikes", value: "Mushrooms" },
  ];

  const linkedDevices = [
    { label: "Fitness Tracker", value: "Connected", status: "connected" },
    { label: "Smart Scale", value: "Not Linked", status: "disconnected" },
  ];

  const privacySettings = [
    { label: "Data Sharing", value: "Enabled", status: "enabled" },
    { label: "Location Services", value: "Disabled", status: "disabled" },
  ];

  const appSettings = [
    { label: "Offline Mode", status: false },
    { label: "Notifications", status: true },
  ];

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
          <svg className="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 16h20v2H2zm1.5-5L12 7l8.5 4v2H12v2h8.5v2H3.5z" />
          </svg>
          <div className="w-6 h-3 bg-gray-900 rounded-sm ml-1"></div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-200 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Daily Calorie Goal</span>
              <span className="text-sm font-medium">
                {user.dailyCalorieGoal} / {user.totalCalorieGoal} kcal
              </span>
            </div>
            <Progress value={user.progressPercentage} className="h-2" />
            <p className="text-xs text-gray-500">
              You are {user.progressPercentage}% towards your goal today.
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Info
          </h3>
          <div className="space-y-3">
            {personalInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600">{item.label}</span>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals</h3>
          <div className="space-y-3">
            {goals.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600">{item.label}</span>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Dietary Preferences
          </h3>
          <div className="space-y-3">
            {dietaryPreferences.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600">{item.label}</span>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Linked Devices */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Linked Devices
          </h3>
          <div className="space-y-3">
            {linkedDevices.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600">{item.label}</span>
                <span
                  className={`font-medium ${item.status === "connected" ? "text-green-600" : "text-gray-500"}`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Privacy Settings
          </h3>
          <div className="space-y-3">
            {privacySettings.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600">{item.label}</span>
                <span
                  className={`font-medium ${item.status === "enabled" ? "text-green-600" : "text-gray-500"}`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            App Settings
          </h3>
          <div className="space-y-3">
            {appSettings.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600">{item.label}</span>
                <div
                  className={`w-12 h-6 rounded-full relative transition-colors ${item.status ? "bg-primary" : "bg-gray-300"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${item.status ? "translate-x-7" : "translate-x-1"}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Data */}
        <Button
          variant="outline"
          className="w-full h-14 border-2 border-primary text-primary hover:bg-primary/5 rounded-2xl text-lg font-medium flex items-center justify-center gap-3"
        >
          <Download className="w-5 h-5" />
          Export My Data
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
