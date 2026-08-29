-- ============================================================================
-- SVS FITNESS GYM MANAGEMENT & MEMBER PORTAL DATABASE SCHEMA (MySQL)
-- ============================================================================

CREATE DATABASE IF NOT EXISTS gym_db;
USE gym_db;

-- 1. Users Table (Members, Trainers, Admins/Owners)
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    gender ENUM('Male', 'Female', 'Other') DEFAULT 'Male',
    date_of_birth DATE,
    profile_image_url VARCHAR(255),
    role ENUM('member', 'trainer', 'owner', 'admin') DEFAULT 'member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Membership Plans Table
CREATE TABLE IF NOT EXISTS membership_plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10, 2) NOT NULL,
    duration_months INT DEFAULT 1,
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Member Subscriptions Table
CREATE TABLE IF NOT EXISTS member_subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'expired', 'paused', 'cancelled') DEFAULT 'active',
    auto_renew BOOLEAN DEFAULT TRUE,
    qr_code_token VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES membership_plans(plan_id)
);

-- 4. Trainers Table
CREATE TABLE IF NOT EXISTS trainers (
    trainer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    specialization VARCHAR(100),
    bio TEXT,
    experience_years INT DEFAULT 3,
    rating DECIMAL(2,1) DEFAULT 5.0,
    hourly_rate DECIMAL(10,2) DEFAULT 500.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 5. Fitness Classes Table
CREATE TABLE IF NOT EXISTS fitness_classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    trainer_id INT,
    title VARCHAR(100) NOT NULL,
    category ENUM('Strength', 'Cardio', 'HIIT', 'Yoga', 'Zumba', 'Spinning', 'CrossFit') NOT NULL,
    description TEXT,
    room_number VARCHAR(20) DEFAULT 'Studio 1',
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    max_capacity INT DEFAULT 25,
    intensity_level ENUM('Beginner', 'Intermediate', 'Advanced', 'All Levels') DEFAULT 'All Levels',
    FOREIGN KEY (trainer_id) REFERENCES trainers(trainer_id) ON DELETE SET NULL
);

-- 6. Class Bookings Table
CREATE TABLE IF NOT EXISTS class_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    booking_date DATE NOT NULL,
    status ENUM('booked', 'attended', 'cancelled') DEFAULT 'booked',
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES fitness_classes(class_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_class_date (user_id, class_id, booking_date)
);

-- 7. Gym Attendance / Check-ins
CREATE TABLE IF NOT EXISTS gym_checkins (
    checkin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    checkout_time TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 8. Workout Logs & Exercise Tracking
CREATE TABLE IF NOT EXISTS workout_sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_date DATE NOT NULL,
    routine_name VARCHAR(100),
    duration_minutes INT DEFAULT 60,
    calories_burned INT DEFAULT 350,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workout_exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    exercise_name VARCHAR(100) NOT NULL,
    muscle_group VARCHAR(50) NOT NULL,
    sets_completed INT NOT NULL,
    reps_per_set INT NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (session_id) REFERENCES workout_sessions(session_id) ON DELETE CASCADE
);

-- 9. Diet & Nutrition / Daily Macro Logs
CREATE TABLE IF NOT EXISTS diet_logs (
    diet_log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    log_date DATE NOT NULL,
    meal_type ENUM('Breakfast', 'Lunch', 'Snack', 'Dinner', 'Pre-Workout', 'Post-Workout') NOT NULL,
    food_name VARCHAR(150) NOT NULL,
    calories INT NOT NULL,
    protein_g DECIMAL(5,2) DEFAULT 0,
    carbs_g DECIMAL(5,2) DEFAULT 0,
    fats_g DECIMAL(5,2) DEFAULT 0,
    water_ml INT DEFAULT 250,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Seed Data Fixtures (SVS Fitness)
INSERT INTO membership_plans (name, description, price_monthly, duration_months, features) VALUES
('Starter Bronze', 'Standard gym equipment and locker access.', 1199.00, 1, '["Access to gym floor", "Locker room access", "1 Free fitness assessment", "SVS Mobile App Tracking"]'),
('Pro Silver', 'Most popular tier for consistent fitness enthusiasts.', 1999.00, 1, '["All Bronze features", "Unlimited Group Classes (Yoga, HIIT, Zumba)", "Sauna & Steam Bath", "Guest pass 1x/month", "Nutritional Guide"]'),
('SVS Elite Gold VIP', 'All-inclusive premium fitness and recovery experience.', 2999.00, 1, '["All Silver features", "2x 1-on-1 Personal Trainer Sessions/mo", "Hydro-Massage & Recovery Lounge", "Free Whey Protein Shake on each visit", "Custom Diet & Workout Blueprint"]');

INSERT INTO users (full_name, email, password_hash, phone, gender, role) VALUES
('SVS Admin / Owner', 'owner@svsfitness.com', '$2a$10$e8wZ3o9Yj8q9b9F.samplehash', '+91 99999 88888', 'Male', 'owner'),
('Marcus Vance', 'marcus.trainer@svsfitness.com', '$2a$10$e8wZ3o9Yj8q9b9F.samplehash', '+91 98765 01010', 'Male', 'trainer'),
('Elena Rostova', 'elena.trainer@svsfitness.com', '$2a$10$e8wZ3o9Yj8q9b9F.samplehash', '+91 98765 01020', 'Female', 'trainer'),
('Alex Reynolds', 'alex.member@svsfitness.com', '$2a$10$e8wZ3o9Yj8q9b9F.samplehash', '+91 98765 43210', 'Male', 'member');

INSERT INTO trainers (user_id, specialization, experience_years, rating, hourly_rate, bio) VALUES
(2, 'Heavy Strength & Powerlifting', 8, 4.9, 800.00, 'Certified CSCS coach at SVS Fitness specialized in barbell mechanics and athletic conditioning.'),
(3, 'HIIT, Mobility & Core Conditioning', 6, 5.0, 750.00, 'Passionate endurance trainer bringing high energy and fat-burning metabolic conditioning classes.');

INSERT INTO fitness_classes (trainer_id, title, category, start_time, end_time, day_of_week, max_capacity, intensity_level, room_number) VALUES
(1, 'Heavy Iron Barbell Mastery', 'Strength', '07:00:00', '08:00:00', 'Monday', 15, 'Advanced', 'Power Zone'),
(2, 'Metabolic Burn HIIT Inferno', 'HIIT', '08:30:00', '09:15:00', 'Monday', 20, 'Intermediate', 'Studio A'),
(2, 'Sunrise Vinyasa Yoga Flow', 'Yoga', '06:30:00', '07:30:00', 'Wednesday', 25, 'All Levels', 'Zen Studio');

INSERT INTO member_subscriptions (user_id, plan_id, start_date, end_date, status, qr_code_token) VALUES
(4, 3, '2026-08-01', '2026-09-01', 'active', 'SVS-MEMBER-8829-GOLD');
