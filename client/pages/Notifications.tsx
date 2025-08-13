import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  X,
  Settings,
  Bell,
  Camera,
  TrendingUp,
  Heart,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Notification {
  id: string;
  type: "achievement" | "reminder" | "tip" | "system" | "social";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
  icon: string;
  iconColor: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "🎉 Goal Achieved!",
      message:
        "Congratulations! You've hit your protein target for 7 days straight. Keep up the excellent work!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      action: { label: "View Progress", url: "/insights" },
      icon: "🏆",
      iconColor: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "2",
      type: "reminder",
      title: "AI Scan Reminder",
      message:
        "Don't forget to scan your lunch! You have 3 AI scans remaining today.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      action: { label: "Start Scan", url: "/scan" },
      icon: "📸",
      iconColor: "bg-green-100 text-green-600",
    },
    {
      id: "3",
      type: "tip",
      title: "Daily Nutrition Tip",
      message:
        "Adding a handful of berries to your breakfast can boost antioxidants and help with brain function!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
      action: { label: "Learn More", url: "/ai-assistant" },
      icon: "💡",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "4",
      type: "system",
      title: "Weekly Report Ready",
      message:
        "Your weekly health insights report is ready! See how you performed this week.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      read: true,
      action: { label: "View Report", url: "/insights" },
      icon: "📊",
      iconColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "5",
      type: "achievement",
      title: "Streak Milestone!",
      message:
        "Amazing! You've logged meals for 14 consecutive days. You're building great habits!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      action: { label: "See Streak", url: "/log" },
      icon: "🔥",
      iconColor: "bg-orange-100 text-orange-600",
    },
    {
      id: "6",
      type: "reminder",
      title: "Mood Check-in",
      message:
        "How are you feeling today? Get personalized food recommendations based on your current mood.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      action: { label: "Check Mood", url: "/recommendations" },
      icon: "🧡",
      iconColor: "bg-pink-100 text-pink-600",
    },
    {
      id: "7",
      type: "tip",
      title: "Hydration Reminder",
      message:
        "You're halfway through your day! Remember to drink water regularly for optimal energy levels.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
      icon: "💧",
      iconColor: "bg-cyan-100 text-cyan-600",
    },
    {
      id: "8",
      type: "system",
      title: "New AI Features Available",
      message:
        "We've improved our AI scanning accuracy! Try scanning your next meal to experience 95%+ accuracy.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      read: true,
      action: { label: "Try Now", url: "/scan" },
      icon: "✨",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(
    (notif) => filter === "all" || !notif.read,
  );

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600">{unreadCount} unread</p>
            )}
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Filter and Actions */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "unread"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <Check className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 py-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
              🔔
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === "unread" ? "All caught up!" : "No notifications"}
            </h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "You've read all your notifications."
                : "You'll see your health updates and reminders here."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 transition-all ${
                  !notification.read
                    ? "ring-2 ring-primary/20 bg-primary/5"
                    : ""
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${notification.iconColor} rounded-full flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {notification.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`font-medium ${!notification.read ? "text-primary" : "text-gray-900"}`}
                      >
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 hover:bg-gray-100 rounded-full opacity-60 hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-1 mb-3 leading-relaxed">
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.timestamp)}
                      </span>

                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-7 px-2 text-xs"
                          >
                            Mark read
                          </Button>
                        )}
                        {notification.action && (
                          <Link to={notification.action.url}>
                            <Button
                              size="sm"
                              className="h-7 px-3 text-xs bg-primary hover:bg-primary/90 text-white"
                            >
                              {notification.action.label}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="px-6 mt-6">
        <div className="bg-gray-50 rounded-2xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3">
            Notification Settings
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Achievement notifications
              </span>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Meal reminders</span>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Weekly reports</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutritional Tip */}
      <div className="px-6 mt-6 mb-8">
        <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Smart Notifications
              </h4>
              <p className="text-sm text-gray-600">
                Our AI learns your patterns and sends personalized reminders at
                the optimal times to help you stay on track with your health
                goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
