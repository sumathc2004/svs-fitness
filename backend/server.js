const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// High-speed Performance Compression Middleware (Gzip/Deflate)
app.use(compression());
app.use(cors());
app.use(express.json());

// Serve Static Frontend with Caching Headers for maximum speed
app.use(express.static(path.join(__dirname, '../frontend'), {
  maxAge: '1d',
  etag: true
}));

// In-Memory Database for Ultra-Fast Sub-millisecond Responses
const mockDB = {
  portalName: "SVS Fitness",
  users: [
    {
      id: 1,
      fullName: "SVS Admin / Owner",
      email: "owner@svsfitness.com",
      role: "owner",
      phone: "+91 99999 88888"
    },
    {
      id: 2,
      fullName: "Marcus Vance",
      email: "marcus.trainer@svsfitness.com",
      role: "trainer",
      specialization: "Heavy Iron & Hypertrophy"
    },
    {
      id: 3,
      fullName: "Alex Reynolds",
      email: "alex.member@svsfitness.com",
      role: "member",
      membership: {
        planName: "SVS Elite Gold VIP",
        tier: "Gold",
        status: "Active",
        validUntil: "2026-10-15",
        qrToken: "SVS-MEMBER-8829-GOLD",
        daysLeft: 47
      },
      stats: {
        streakDays: 14,
        totalWorkouts: 48,
        caloriesBurnedThisMonth: 14250,
        activeHours: 36.5
      }
    }
  ],
  ownerStats: {
    totalActiveMembers: 184,
    monthlyRevenueINR: 342800,
    todayCheckins: 72,
    activeTrainers: 8
  },
  classes: [
    {
      id: 1,
      title: "Heavy Iron Barbell Mastery",
      category: "Strength",
      trainer: "Coach Marcus Vance",
      time: "07:00 AM - 08:00 AM",
      day: "Monday",
      room: "Power Zone",
      intensity: "Advanced",
      capacity: 15,
      bookedCount: 12,
      isBooked: false
    },
    {
      id: 2,
      title: "Metabolic Burn HIIT Inferno",
      category: "HIIT",
      trainer: "Coach Elena Rostova",
      time: "08:30 AM - 09:15 AM",
      day: "Monday",
      room: "Studio A",
      intensity: "Intermediate",
      capacity: 20,
      bookedCount: 19,
      isBooked: true
    },
    {
      id: 3,
      title: "Sunrise Vinyasa Yoga Flow",
      category: "Yoga",
      trainer: "Coach Elena Rostova",
      time: "06:30 AM - 07:30 AM",
      day: "Wednesday",
      room: "Zen Studio",
      intensity: "All Levels",
      capacity: 25,
      bookedCount: 14,
      isBooked: false
    }
  ],
  workouts: [
    { id: 101, date: "2026-08-28", exercise: "Barbell Bench Press", group: "Chest", sets: 4, reps: 10, weightKg: 85, pr: true },
    { id: 102, date: "2026-08-28", exercise: "Incline Dumbbell Press", group: "Chest", sets: 3, reps: 12, weightKg: 30, pr: false },
    { id: 103, date: "2026-08-27", exercise: "Barbell Back Squat", group: "Legs", sets: 5, reps: 8, weightKg: 120, pr: true }
  ],
  diet: [
    { id: 201, meal: "Breakfast", food: "Oatmeal with Whey & Blueberries", calories: 520, protein: 42, carbs: 65, fats: 10 },
    { id: 202, meal: "Lunch", food: "Grilled Chicken Breast, Brown Rice & Broccoli", calories: 680, protein: 58, carbs: 70, fats: 14 }
  ],
  plans: [
    {
      id: 1,
      name: "Starter Bronze",
      price: "₹1,199",
      period: "monthly",
      badge: "Basic",
      features: [
        "Full gym floor & standard equipment access",
        "Locker room & shower amenities",
        "1 Free body composition scan",
        "Mobile App QR access pass"
      ]
    },
    {
      id: 2,
      name: "Pro Silver",
      price: "₹1,999",
      period: "monthly",
      badge: "Popular",
      features: [
        "All Starter Bronze benefits",
        "Unlimited Group Classes (Yoga, HIIT, Spin)",
        "Sauna & Steam Bath recovery zone",
        "1 Free Monthly Guest Pass",
        "Personalized digital workout builder"
      ]
    },
    {
      id: 3,
      name: "SVS Elite Gold VIP",
      price: "₹2,999",
      period: "monthly",
      badge: "Best Value",
      features: [
        "All Pro Silver benefits",
        "2x 1-on-1 Personal Trainer sessions/mo",
        "Hydro-Massage & cryo lounge access",
        "Free protein smoothie per session",
        "Dedicated nutrition & diet coaching"
      ]
    }
  ]
};

// Fast Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    portal: 'SVS Fitness API Server (High Performance Mode)',
    version: '2.1.0'
  });
});

// Member Profile
app.get('/api/member/profile', (req, res) => {
  const member = mockDB.users.find(u => u.role === 'member');
  res.json({ success: true, data: member });
});

// Owner Analytics
app.get('/api/owner/overview', (req, res) => {
  res.json({
    success: true,
    data: {
      stats: mockDB.ownerStats,
      membersList: mockDB.users.filter(u => u.role === 'member'),
      allUsersCount: mockDB.users.length
    }
  });
});

// Membership Plans
app.get('/api/plans', (req, res) => {
  res.json({ success: true, data: mockDB.plans });
});

// Fitness Classes
app.get('/api/classes', (req, res) => {
  res.json({ success: true, data: mockDB.classes });
});

app.post('/api/classes/book', (req, res) => {
  const { classId } = req.body;
  const targetClass = mockDB.classes.find(c => c.id === parseInt(classId));
  if (!targetClass) {
    return res.status(404).json({ success: false, message: 'Class not found' });
  }
  targetClass.isBooked = !targetClass.isBooked;
  targetClass.bookedCount += targetClass.isBooked ? 1 : -1;

  res.json({
    success: true,
    message: targetClass.isBooked ? 'Class booked at SVS Fitness!' : 'Booking cancelled.',
    data: targetClass
  });
});

// Workouts
app.get('/api/workouts', (req, res) => {
  res.json({ success: true, data: mockDB.workouts });
});

app.post('/api/workouts', (req, res) => {
  const { exercise, group, sets, reps, weightKg } = req.body;
  const newWorkout = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    exercise,
    group,
    sets: Number(sets),
    reps: Number(reps),
    weightKg: Number(weightKg),
    pr: Number(weightKg) >= 100
  };
  mockDB.workouts.unshift(newWorkout);
  res.status(201).json({ success: true, message: 'Workout logged!', data: newWorkout });
});

// Diet Logs
app.get('/api/diet', (req, res) => {
  res.json({ success: true, data: mockDB.diet });
});

app.post('/api/diet', (req, res) => {
  const { meal, food, calories, protein, carbs, fats } = req.body;
  const newMeal = {
    id: Date.now(),
    meal,
    food,
    calories: Number(calories),
    protein: Number(protein || 0),
    carbs: Number(carbs || 0),
    fats: Number(fats || 0)
  };
  mockDB.diet.push(newMeal);
  res.status(201).json({ success: true, message: 'Meal logged!', data: newMeal });
});

// Fallback to frontend single-page index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ SVS Fitness Ultra-Fast Server running on port ${PORT}`);
});
