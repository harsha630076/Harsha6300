import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join } from "path";

// Database connection
let db: Database.Database;

export function initializeDatabase() {
  try {
    // Create or connect to SQLite database
    db = new Database("data/health_tracker.db");

    // Enable foreign keys
    db.exec("PRAGMA foreign_keys = ON");

    // Read and execute schema
    const schemaPath = join(__dirname, "schema.sql");
    const schema = readFileSync(schemaPath, "utf8");
    db.exec(schema);

    console.log("✅ Database initialized successfully");
    return db;
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
}

export function getDatabase(): Database.Database {
  if (!db) {
    throw new Error(
      "Database not initialized. Call initializeDatabase() first.",
    );
  }
  return db;
}

// Database models and interfaces
export interface User {
  id?: number;
  email: string;
  password_hash?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  age?: number;
  height?: number;
  weight?: number;
  activity_level?: string;
  goal?: string;
  diet_type?: string;
  calorie_goal?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FoodItem {
  id?: number;
  name: string;
  calories_per_100g: number;
  protein_per_100g?: number;
  carbs_per_100g?: number;
  fat_per_100g?: number;
  fiber_per_100g?: number;
  sugar_per_100g?: number;
  sodium_per_100g?: number;
  potassium_per_100g?: number;
  category?: string;
  barcode?: string;
  verified?: boolean;
  rating?: number;
  review_count?: number;
  benefits?: string; // JSON string
  image_url?: string;
  created_at?: string;
}

export interface FoodLog {
  id?: number;
  user_id: number;
  food_item_id: number;
  meal_type: string;
  portion_grams?: number;
  logged_at?: string;
  scan_method?: string;
  accuracy_percentage?: number;
  notes?: string;
}

export interface Notification {
  id?: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  read_status?: boolean;
  action_url?: string;
  created_at?: string;
}

export interface MoodLog {
  id?: number;
  user_id: number;
  mood_type: string;
  energy_level?: number;
  stress_level?: number;
  notes?: string;
  logged_at?: string;
}

// Database service functions
export const UserService = {
  create: (user: User): User => {
    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, phone_number, first_name, last_name, age, height, weight, activity_level, goal, diet_type, calorie_goal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      user.email,
      user.password_hash,
      user.phone_number,
      user.first_name,
      user.last_name,
      user.age,
      user.height,
      user.weight,
      user.activity_level,
      user.goal,
      user.diet_type,
      user.calorie_goal || 2200,
    );
    return { ...user, id: Number(result.lastInsertRowid) };
  },

  findByEmail: (email: string): User | undefined => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email) as User | undefined;
  },

  findById: (id: number): User | undefined => {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id) as User | undefined;
  },

  update: (id: number, updates: Partial<User>): void => {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);
    const stmt = db.prepare(
      `UPDATE users SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    );
    stmt.run(...values, id);
  },
};

export const FoodService = {
  getAll: (category?: string): FoodItem[] => {
    let query = "SELECT * FROM food_items";
    let params: any[] = [];

    if (category && category !== "All") {
      query += " WHERE category = ?";
      params.push(category);
    }

    query += " ORDER BY name ASC";
    const stmt = db.prepare(query);
    return stmt.all(...params) as FoodItem[];
  },

  search: (searchTerm: string): FoodItem[] => {
    const stmt = db.prepare(
      "SELECT * FROM food_items WHERE name LIKE ? ORDER BY rating DESC LIMIT 20",
    );
    return stmt.all(`%${searchTerm}%`) as FoodItem[];
  },

  findById: (id: number): FoodItem | undefined => {
    const stmt = db.prepare("SELECT * FROM food_items WHERE id = ?");
    return stmt.get(id) as FoodItem | undefined;
  },

  create: (food: FoodItem): FoodItem => {
    const stmt = db.prepare(`
      INSERT INTO food_items (name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, category, verified, rating, review_count, benefits, barcode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      food.name,
      food.calories_per_100g,
      food.protein_per_100g || 0,
      food.carbs_per_100g || 0,
      food.fat_per_100g || 0,
      food.category,
      food.verified || false,
      food.rating || 0,
      food.review_count || 0,
      food.benefits || "[]",
      food.barcode,
    );
    return { ...food, id: Number(result.lastInsertRowid) };
  },
};

export const FoodLogService = {
  create: (log: FoodLog): FoodLog => {
    const stmt = db.prepare(`
      INSERT INTO food_logs (user_id, food_item_id, meal_type, portion_grams, scan_method, accuracy_percentage, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      log.user_id,
      log.food_item_id,
      log.meal_type,
      log.portion_grams || 100,
      log.scan_method || "manual",
      log.accuracy_percentage,
      log.notes,
    );
    return { ...log, id: Number(result.lastInsertRowid) };
  },

  getByUser: (userId: number, date?: string): FoodLog[] => {
    let query = `
      SELECT fl.*, fi.name as food_name, fi.calories_per_100g, fi.protein_per_100g, fi.carbs_per_100g, fi.fat_per_100g
      FROM food_logs fl
      JOIN food_items fi ON fl.food_item_id = fi.id
      WHERE fl.user_id = ?
    `;
    const params: any[] = [userId];

    if (date) {
      query += " AND DATE(fl.logged_at) = ?";
      params.push(date);
    }

    query += " ORDER BY fl.logged_at DESC";
    const stmt = db.prepare(query);
    return stmt.all(...params) as any[];
  },

  getWeeklyStats: (userId: number): any => {
    const stmt = db.prepare(`
      SELECT 
        DATE(logged_at) as date,
        SUM((fl.portion_grams / 100.0) * fi.calories_per_100g) as total_calories,
        SUM((fl.portion_grams / 100.0) * fi.protein_per_100g) as total_protein,
        SUM((fl.portion_grams / 100.0) * fi.carbs_per_100g) as total_carbs,
        SUM((fl.portion_grams / 100.0) * fi.fat_per_100g) as total_fat
      FROM food_logs fl
      JOIN food_items fi ON fl.food_item_id = fi.id
      WHERE fl.user_id = ? AND fl.logged_at >= DATE('now', '-7 days')
      GROUP BY DATE(logged_at)
      ORDER BY date DESC
    `);
    return stmt.all(userId);
  },
};

export const NotificationService = {
  create: (notification: Notification): Notification => {
    const stmt = db.prepare(`
      INSERT INTO notifications (user_id, type, title, message, action_url)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      notification.user_id,
      notification.type,
      notification.title,
      notification.message,
      notification.action_url,
    );
    return { ...notification, id: Number(result.lastInsertRowid) };
  },

  getByUser: (userId: number, unreadOnly = false): Notification[] => {
    let query = "SELECT * FROM notifications WHERE user_id = ?";
    if (unreadOnly) {
      query += " AND read_status = FALSE";
    }
    query += " ORDER BY created_at DESC";

    const stmt = db.prepare(query);
    return stmt.all(userId) as Notification[];
  },

  markAsRead: (id: number): void => {
    const stmt = db.prepare(
      "UPDATE notifications SET read_status = TRUE WHERE id = ?",
    );
    stmt.run(id);
  },

  markAllAsRead: (userId: number): void => {
    const stmt = db.prepare(
      "UPDATE notifications SET read_status = TRUE WHERE user_id = ?",
    );
    stmt.run(userId);
  },
};

export default { initializeDatabase, getDatabase };
