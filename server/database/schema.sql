-- QuickCal AI Database Schema
-- SQLite Database for Mobile Health Tracking App

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    phone_number TEXT,
    first_name TEXT,
    last_name TEXT,
    age INTEGER,
    height REAL,
    weight REAL,
    activity_level TEXT,
    goal TEXT,
    diet_type TEXT,
    calorie_goal INTEGER DEFAULT 2200,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Food items master database
CREATE TABLE IF NOT EXISTS food_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    calories_per_100g REAL NOT NULL,
    protein_per_100g REAL DEFAULT 0,
    carbs_per_100g REAL DEFAULT 0,
    fat_per_100g REAL DEFAULT 0,
    fiber_per_100g REAL DEFAULT 0,
    sugar_per_100g REAL DEFAULT 0,
    sodium_per_100g REAL DEFAULT 0,
    potassium_per_100g REAL DEFAULT 0,
    category TEXT,
    barcode TEXT,
    verified BOOLEAN DEFAULT FALSE,
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    benefits TEXT, -- JSON array of benefits
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User food log entries
CREATE TABLE IF NOT EXISTS food_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    food_item_id INTEGER NOT NULL,
    meal_type TEXT NOT NULL, -- breakfast, lunch, dinner, snack
    portion_grams REAL DEFAULT 100,
    logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    scan_method TEXT DEFAULT 'manual', -- ai_scan, manual, barcode
    accuracy_percentage REAL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (food_item_id) REFERENCES food_items(id)
);

-- User notifications
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- achievement, reminder, tip, system
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User achievements
CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    achievement_type TEXT NOT NULL,
    achievement_name TEXT NOT NULL,
    description TEXT,
    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AI scan history
CREATE TABLE IF NOT EXISTS ai_scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    image_data TEXT, -- base64 or file path
    scan_results TEXT NOT NULL, -- JSON of detected foods
    confidence_score REAL,
    processing_time INTEGER, -- milliseconds
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User preferences and settings
CREATE TABLE IF NOT EXISTS user_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    notification_achievements BOOLEAN DEFAULT TRUE,
    notification_reminders BOOLEAN DEFAULT TRUE,
    notification_tips BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT FALSE,
    units_metric BOOLEAN DEFAULT TRUE,
    privacy_data_sharing BOOLEAN DEFAULT FALSE,
    privacy_location_services BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Mood tracking
CREATE TABLE IF NOT EXISTS mood_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    mood_type TEXT NOT NULL, -- positive, low-energy, fever, stressed, etc.
    energy_level INTEGER, -- 1-10 scale
    stress_level INTEGER, -- 1-10 scale
    notes TEXT,
    logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Subscription information
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    plan_type TEXT NOT NULL, -- free, premium
    status TEXT DEFAULT 'active', -- active, canceled, expired
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    payment_method TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample food data
INSERT OR IGNORE INTO food_items (name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g, sugar_per_100g, sodium_per_100g, potassium_per_100g, category, verified, rating, review_count, benefits, barcode) VALUES
('Red Apple', 52, 0.3, 14, 0.2, 2.4, 10.4, 1, 107, 'Fruits', TRUE, 4.8, 2847, '["Heart Health", "Weight Management", "Digestive Health"]', '123456789012'),
('Grilled Chicken Breast', 165, 31, 0, 3.6, 0, 0, 74, 256, 'Proteins', TRUE, 4.9, 5672, '["Muscle Building", "Weight Loss", "High Protein"]', '123456789014'),
('Greek Yogurt (Plain)', 59, 10, 3.6, 0.4, 0, 3.6, 36, 141, 'Dairy', TRUE, 4.7, 3458, '["Probiotics", "Bone Health", "Protein Rich"]', '123456789015'),
('Steamed Broccoli', 34, 2.8, 7, 0.4, 2.6, 1.5, 33, 316, 'Vegetables', TRUE, 4.3, 1876, '["Vitamin C", "Antioxidants", "Cancer Fighting"]', '123456789016'),
('Baked Salmon Fillet', 208, 25, 0, 12, 0, 0, 59, 363, 'Proteins', TRUE, 4.9, 3874, '["Omega-3", "Heart Health", "Brain Function"]', '123456789019'),
('Avocado', 160, 2, 9, 15, 7, 0.7, 7, 485, 'Fruits', TRUE, 4.7, 5629, '["Healthy Fats", "Fiber Rich", "Potassium"]', '123456789020'),
('Sweet Potato (Baked)', 90, 2, 21, 0.1, 3.3, 6.8, 6, 475, 'Vegetables', TRUE, 4.5, 2847, '["Vitamin A", "Complex Carbs", "Antioxidants"]', '123456789021'),
('Spinach (Fresh)', 23, 2.9, 3.6, 0.4, 2.2, 0.4, 79, 558, 'Vegetables', TRUE, 4.4, 1934, '["Iron Rich", "Folate", "Vitamin K"]', '123456789022'),
('Blueberries', 57, 0.7, 14, 0.3, 2.4, 10, 1, 77, 'Fruits', TRUE, 4.9, 4586, '["Antioxidants", "Brain Health", "Anti-Aging"]', '123456789023'),
('Almonds (Raw)', 579, 21.2, 21.6, 49.9, 12.5, 4.4, 1, 733, 'Nuts', TRUE, 4.8, 4293, '["Heart Health", "Brain Function", "Healthy Fats"]', '123456789017');
