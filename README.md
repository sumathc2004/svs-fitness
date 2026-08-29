# 🏋️ ApexFit - Full-Stack Gym Member Portal & Fitness Hub

A comprehensive, production-ready **Gym Member Portal** built following the **Full Web Developer Path**:

```
[ Frontend ]
HTML5  ──►  CSS3 (Dark Glassmorphism)  ──►  JavaScript (ES6+)  ──►  React / Next.js

[ Backend ]
Node.js  ──►  Express.js  ──►  RESTful API Endpoints

[ Database ]
MySQL Relational Schema (Users, Memberships, Bookings, Workouts, Diet Logs, Trainers)
```

---

## 🌟 Key Features Included for Gym Members

1. **Member Dashboard & Live Stats**:
   - Workout streaks, monthly calories burned, total completed sessions.
   - Weekly attendance volume visualizer with day-by-day target tracking.
   - Digital NFC / RFID simulation and Turnstile QR Access Pass popup modal.

2. **Interactive Workout Planner & Logger**:
   - Categorized by muscle group (Chest, Back, Legs, Shoulders, Arms, Core).
   - Log sets, reps, and load weight (kg) with automatic **Personal Record (PR)** badges.
   - Live history table.

3. **Fitness Class & Trainer Booking**:
   - Filter classes by category: Strength, HIIT, Yoga, Spinning.
   - Real-time slot availability counter (`X spots left`).
   - One-click reserve and cancel toggle with notifications.

4. **Diet, Nutrition & Calorie Tracker**:
   - Daily macronutrient tracker with animated progress bars (Protein, Carbs, Fats, Calories).
   - Food logging journal by meal type (Breakfast, Lunch, Dinner, Pre/Post-workout).

5. **Membership Plans & Subscriptions**:
   - Interactive tiers: **Starter Bronze**, **Pro Silver**, **Elite Gold VIP**.
   - Feature checklists and upgrade flow.

6. **Scientific Fitness & Health Calculators**:
   - Body Mass Index (BMI) with clinical category indicators (Underweight, Normal, Overweight, Obese).
   - Basal Metabolic Rate (BMR) via Mifflin-St Jeor equation.
   - Total Daily Energy Expenditure (TDEE) with Fat Loss and Muscle Gain caloric targets.

---

## 🚀 How to Run the Project

### 1. View the Frontend Immediately (No build step required!)
Simply double-click or open [frontend/index.html](file:///c:/Users/HP/Desktop/web%20development/gym-portal/frontend/index.html) in any browser (Chrome, Edge, Firefox).

### 2. Run the Node.js / Express REST API Backend
```bash
cd "gym-portal/backend"
npm install
npm start
```
The server will run on `http://localhost:5000` with full endpoints for classes, workouts, diet, and profile.

### 3. Setup MySQL Database
Import [database/schema.sql](file:///c:/Users/HP/Desktop/web%20development/gym-portal/database/schema.sql) into MySQL Workbench or via terminal:
```bash
mysql -u root -p < database/schema.sql
```

