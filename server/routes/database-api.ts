import { RequestHandler } from "express";
import {
  UserService,
  FoodService,
  FoodLogService,
  NotificationService,
  User,
  FoodItem,
  FoodLog,
  Notification,
} from "../database/connection";

// User endpoints
export const handleCreateUser: RequestHandler = (req, res) => {
  try {
    const userData: User = req.body;

    // Check if user already exists
    const existingUser = UserService.findByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = UserService.create(userData);

    // Create default preferences and sample notifications
    NotificationService.create({
      user_id: user.id!,
      type: "system",
      title: "Welcome to QuickCal AI! 🎉",
      message:
        "Start your health journey by scanning your first meal with our AI camera feature.",
      action_url: "/scan",
    });

    NotificationService.create({
      user_id: user.id!,
      type: "tip",
      title: "Daily Nutrition Tip",
      message:
        "Staying hydrated is key to maintaining energy levels. Aim for 8-10 glasses of water daily!",
      action_url: "/ai-assistant",
    });

    res
      .status(201)
      .json({
        message: "User created successfully",
        user: { id: user.id, email: user.email },
      });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const handleGetUser: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const user = UserService.findById(Number(id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const handleUpdateUser: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    UserService.update(Number(id), updates);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Food endpoints
export const handleGetFoods: RequestHandler = (req, res) => {
  try {
    const { category, search } = req.query;

    let foods: FoodItem[];
    if (search) {
      foods = FoodService.search(search as string);
    } else {
      foods = FoodService.getAll(category as string);
    }

    // Parse benefits JSON for each food
    const foodsWithParsedBenefits = foods.map((food) => ({
      ...food,
      benefits: food.benefits ? JSON.parse(food.benefits) : [],
    }));

    res.json(foodsWithParsedBenefits);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ error: "Failed to fetch foods" });
  }
};

export const handleGetFood: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const food = FoodService.findById(Number(id));

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    const foodWithParsedBenefits = {
      ...food,
      benefits: food.benefits ? JSON.parse(food.benefits) : [],
    };

    res.json(foodWithParsedBenefits);
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ error: "Failed to fetch food" });
  }
};

// Food log endpoints
export const handleCreateFoodLog: RequestHandler = (req, res) => {
  try {
    const logData: FoodLog = req.body;
    const log = FoodLogService.create(logData);

    // Create achievement notification for logging
    const userLogs = FoodLogService.getByUser(logData.user_id);
    if (userLogs.length === 1) {
      NotificationService.create({
        user_id: logData.user_id,
        type: "achievement",
        title: "🎯 First Meal Logged!",
        message:
          "Great start! You've logged your first meal. Keep it up to build healthy habits.",
        action_url: "/insights",
      });
    } else if (userLogs.length === 7) {
      NotificationService.create({
        user_id: logData.user_id,
        type: "achievement",
        title: "🔥 Week Streak!",
        message:
          "Amazing! You've logged meals for a week. You're building great habits!",
        action_url: "/insights",
      });
    }

    res.status(201).json({ message: "Food log created successfully", log });
  } catch (error) {
    console.error("Error creating food log:", error);
    res.status(500).json({ error: "Failed to create food log" });
  }
};

export const handleGetFoodLogs: RequestHandler = (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const logs = FoodLogService.getByUser(Number(userId), date as string);
    res.json(logs);
  } catch (error) {
    console.error("Error fetching food logs:", error);
    res.status(500).json({ error: "Failed to fetch food logs" });
  }
};

export const handleGetWeeklyStats: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;
    const stats = FoodLogService.getWeeklyStats(Number(userId));
    res.json(stats);
  } catch (error) {
    console.error("Error fetching weekly stats:", error);
    res.status(500).json({ error: "Failed to fetch weekly stats" });
  }
};

// Notification endpoints
export const handleGetNotifications: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;
    const { unread } = req.query;

    const notifications = NotificationService.getByUser(
      Number(userId),
      unread === "true",
    );

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const handleMarkNotificationRead: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    NotificationService.markAsRead(Number(id));
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

export const handleMarkAllNotificationsRead: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;
    NotificationService.markAllAsRead(Number(userId));
    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ error: "Failed to mark all notifications as read" });
  }
};

// Health data export
export const handleExportUserData: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;

    // Get all user data
    const user = UserService.findById(Number(userId));
    const foodLogs = FoodLogService.getByUser(Number(userId));
    const notifications = NotificationService.getByUser(Number(userId));
    const weeklyStats = FoodLogService.getWeeklyStats(Number(userId));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const exportData = {
      user: { ...user, password_hash: undefined }, // Remove password
      foodLogs,
      notifications,
      weeklyStats,
      exportedAt: new Date().toISOString(),
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=quickcal-ai-data-${userId}.json`,
    );
    res.json(exportData);
  } catch (error) {
    console.error("Error exporting user data:", error);
    res.status(500).json({ error: "Failed to export user data" });
  }
};

// Database health check
export const handleDatabaseHealth: RequestHandler = (req, res) => {
  try {
    // Simple query to check database connectivity
    const foods = FoodService.getAll();
    res.json({
      status: "healthy",
      foodCount: foods.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    res.status(500).json({
      status: "unhealthy",
      error: "Database connection failed",
      timestamp: new Date().toISOString(),
    });
  }
};
