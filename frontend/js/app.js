// ============================================================================
// SVS Fitness Gym Portal State Management & Interactions
// Supports: Member View AND Owner / Admin Management View
// ============================================================================

const state = {
  currentRole: 'member', // 'member' or 'owner'
  activeTab: 'dashboard',
  member: {
    name: 'Alex Reynolds',
    tier: 'SVS Elite Gold',
    streak: 14,
    workoutsCount: 48,
    calories: 14250,
    daysLeft: 47,
    qrToken: 'SVS-MEMBER-8829-GOLD'
  },
  owner: {
    name: 'SVS Fitness Admin',
    role: 'Gym Owner & Managing Director'
  },
  workouts: [
    { id: 101, date: '2026-08-28', name: 'Barbell Bench Press', group: 'Chest', sets: 4, reps: 10, weight: 85, pr: true },
    { id: 102, date: '2026-08-28', name: 'Incline Dumbbell Press', group: 'Chest', sets: 3, reps: 12, weight: 30, pr: false },
    { id: 103, date: '2026-08-27', name: 'Barbell Back Squat', group: 'Legs', sets: 5, reps: 8, weight: 120, pr: true },
    { id: 104, date: '2026-08-26', name: 'Deadlift (Conventional)', group: 'Back', sets: 4, reps: 6, weight: 145, pr: true },
    { id: 105, date: '2026-08-25', name: 'Overhead Shoulder Press', group: 'Shoulders', sets: 4, reps: 8, weight: 55, pr: false }
  ],
  classes: [
    {
      id: 1,
      title: "Heavy Iron Barbell Mastery",
      category: "Strength",
      trainer: "Marcus Vance",
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
      trainer: "Elena Rostova",
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
      trainer: "Elena Rostova",
      time: "06:30 AM - 07:30 AM",
      day: "Wednesday",
      room: "Zen Studio",
      intensity: "All Levels",
      capacity: 25,
      bookedCount: 14,
      isBooked: false
    },
    {
      id: 4,
      title: "Hypertrophy Legs & Glutes",
      category: "Strength",
      trainer: "Marcus Vance",
      time: "06:00 PM - 07:00 PM",
      day: "Thursday",
      room: "Main Gym Floor",
      intensity: "Intermediate",
      capacity: 18,
      bookedCount: 11,
      isBooked: false
    },
    {
      id: 5,
      title: "Endurance Spin Cycle Rush",
      category: "Spinning",
      trainer: "Elena Rostova",
      time: "07:30 PM - 08:15 PM",
      day: "Friday",
      room: "Spin Studio",
      intensity: "Advanced",
      capacity: 22,
      bookedCount: 18,
      isBooked: false
    }
  ],
  dietLogs: [
    { id: 201, meal: 'Breakfast', food: 'Oatmeal with Whey & Blueberries', calories: 520, protein: 42, carbs: 65, fats: 10 },
    { id: 202, meal: 'Lunch', food: 'Grilled Chicken Breast, Brown Rice & Broccoli', calories: 680, protein: 58, carbs: 70, fats: 14 },
    { id: 203, meal: 'Post-Workout', food: 'Isolate Protein Shake + Banana', calories: 280, protein: 32, carbs: 34, fats: 2 }
  ],
  plans: [
    {
      id: 1,
      name: "Starter Bronze",
      price: "₹1,199",
      period: "/month",
      badge: "Standard",
      isCurrent: false,
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
      period: "/month",
      badge: "Popular",
      isCurrent: false,
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
      period: "/month",
      badge: "Current Plan",
      featured: true,
      isCurrent: true,
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

// ============================================================================
// Initialization
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initRoleFromUrlOrStorage();
  initClock();
  initNavigation();
  initDashboard();
  initWorkoutTracker();
  initClasses();
  initDietTracker();
  initPlans();
  initCalculator();
  initModal();
});

// Check if user came from login.html with a specific role
function initRoleFromUrlOrStorage() {
  const urlParams = new URLSearchParams(window.location.search);
  const roleFromUrl = urlParams.get('role');
  const roleFromStorage = localStorage.getItem('svs_user_role');

  const selectedRole = roleFromUrl || roleFromStorage || 'member';
  switchRole(selectedRole);
}

// Live Digital Clock
function initClock() {
  const clockEl = document.getElementById('live-clock');
  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString();
  }
  update();
  setInterval(update, 1000);
}

// Role Switcher: Member vs Owner / Admin
window.switchRole = function(role) {
  state.currentRole = role;
  localStorage.setItem('svs_user_role', role);

  const btnMember = document.getElementById('role-btn-member');
  const btnOwner = document.getElementById('role-btn-owner');
  const roleBadge = document.getElementById('current-role-badge');
  const memberNav = document.querySelector('.member-nav-group');
  const ownerNav = document.querySelector('.owner-nav-group');
  const sidebarName = document.getElementById('sidebar-member-name');
  const sidebarTier = document.getElementById('sidebar-tier-badge');
  const avatar = document.getElementById('sidebar-avatar');

  if (role === 'member') {
    btnMember.classList.add('active');
    btnOwner.classList.remove('active');
    roleBadge.textContent = 'Member';
    roleBadge.className = 'role-tag member-tag';
    memberNav.style.display = 'block';
    ownerNav.style.display = 'none';

    sidebarName.textContent = 'Alex Reynolds';
    sidebarTier.innerHTML = '<i class="fa-solid fa-crown"></i> SVS Elite Gold';
    avatar.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

    switchTab('dashboard');
  } else {
    btnOwner.classList.add('active');
    btnMember.classList.remove('active');
    roleBadge.textContent = 'Owner/Admin';
    roleBadge.className = 'role-tag owner-tag';
    memberNav.style.display = 'none';
    ownerNav.style.display = 'block';

    sidebarName.textContent = 'SVS Admin';
    sidebarTier.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Gym Owner & Boss';
    avatar.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';

    switchTab('owner-dashboard');
  }
};

// Navigation Tabs
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabKey = item.dataset.tab;
      switchTab(tabKey);
    });
  });

  const mobileToggle = document.getElementById('mobile-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

window.switchTab = function(tabKey) {
  state.activeTab = tabKey;
  
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabKey);
  });

  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.toggle('active', section.id === `tab-${tabKey}`);
  });

  const titles = {
    dashboard: { title: 'SVS Fitness Member Dashboard', sub: 'Welcome back, athlete! Track your progress and achieve your goals.' },
    workout: { title: 'Workout Planner & Exercise Tracker', sub: 'Log your sets, reps, and progressive overload records.' },
    classes: { title: 'SVS Fitness Classes & Trainer Booking', sub: 'Browse studio classes and secure your spot.' },
    diet: { title: 'Diet & Nutrition Calculator', sub: 'Hit your daily macros and fuel your muscle recovery.' },
    plans: { title: 'SVS Membership Subscription Plans', sub: 'Manage your gym tier and unlock premium amenities.' },
    calculator: { title: 'SVS Health, BMI & BMR Calculator', sub: 'Scientific body composition estimators for optimal nutrition.' },
    'owner-dashboard': { title: 'SVS Gym Owner Overview & Financials', sub: 'Real-time revenue, active attendance, and facility analytics.' },
    'owner-members': { title: 'Member Directory & Subscription Management', sub: 'Manage gym members, renewals, and access statuses.' },
    'owner-classes': { title: 'Class & Schedule Administration', sub: 'Create new class slots, manage instructors, and check bookings.' },
    'backend-docs': { title: 'Backend REST API & Database Access', sub: 'Developer documentation for running Node.js and MySQL.' }
  };

  if (titles[tabKey]) {
    document.getElementById('page-title').textContent = titles[tabKey].title;
    document.getElementById('page-subtitle').textContent = titles[tabKey].sub;
  }

  document.querySelector('.sidebar').classList.remove('open');
};

// ============================================================================
// Member Dashboard View
// ============================================================================
function initDashboard() {
  const recentContainer = document.getElementById('dashboard-recent-workouts');
  const recentWorkouts = state.workouts.slice(0, 3);

  recentContainer.innerHTML = recentWorkouts.map(w => `
    <div class="recent-item">
      <div>
        <strong>${w.name}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted);">${w.group} • ${w.sets} sets × ${w.reps} reps</div>
      </div>
      <div style="text-align:right;">
        <strong>${w.weight} kg</strong>
        ${w.pr ? '<span class="badge-pr" style="display:block; margin-top:2px;">PR RECORD</span>' : ''}
      </div>
    </div>
  `).join('');

  const quickClassesContainer = document.getElementById('dashboard-quick-classes');
  const quickClasses = state.classes.slice(0, 2);

  quickClassesContainer.innerHTML = quickClasses.map(c => `
    <div class="quick-class-item">
      <div>
        <strong>${c.title}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-clock"></i> ${c.time} • ${c.room}</div>
      </div>
      <button class="btn-book ${c.isBooked ? 'booked' : 'available'}" onclick="toggleBookClass(${c.id})">
        ${c.isBooked ? '<i class="fa-solid fa-check"></i> Booked' : 'Join'}
      </button>
    </div>
  `).join('');
}

// ============================================================================
// Workout Planner
// ============================================================================
function initWorkoutTracker() {
  renderWorkoutHistory();

  const form = document.getElementById('workout-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const group = document.getElementById('workout-group').value;
    const name = document.getElementById('workout-name').value;
    const sets = parseInt(document.getElementById('workout-sets').value);
    const reps = parseInt(document.getElementById('workout-reps').value);
    const weight = parseFloat(document.getElementById('workout-weight').value);

    const newWorkout = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      name,
      group,
      sets,
      reps,
      weight,
      pr: weight >= 100
    };

    state.workouts.unshift(newWorkout);
    state.member.workoutsCount += 1;
    document.getElementById('dash-workouts').innerHTML = `${state.member.workoutsCount} <span>Sessions</span>`;
    
    renderWorkoutHistory();
    initDashboard();
    form.reset();

    showToast(`Logged ${name} (${weight}kg) in SVS workout record!`);
  });
}

function renderWorkoutHistory() {
  const tbody = document.getElementById('workout-history-body');
  document.getElementById('total-exercises-count').textContent = `${state.workouts.length} Logged`;

  tbody.innerHTML = state.workouts.map(w => `
    <tr>
      <td>${w.date}</td>
      <td><strong>${w.name}</strong></td>
      <td><span class="tier-pill tier-gold">${w.group}</span></td>
      <td>${w.sets} × ${w.reps}</td>
      <td><strong>${w.weight} kg</strong></td>
      <td>${w.pr ? '<span class="badge-pr">🔥 NEW PR</span>' : '<span style="color:var(--text-muted);">Completed</span>'}</td>
    </tr>
  `).join('');
}

// ============================================================================
// Classes & Booking
// ============================================================================
function initClasses() {
  renderClasses('all');

  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderClasses(chip.dataset.category);
    });
  });
}

function renderClasses(category) {
  const container = document.getElementById('classes-container');
  const filtered = category === 'all' ? state.classes : state.classes.filter(c => c.category === category);

  container.innerHTML = filtered.map(c => `
    <div class="class-card">
      <div class="class-category-badge">${c.category}</div>
      <h3 class="class-title">${c.title}</h3>
      <div class="class-meta">
        <div class="class-meta-item"><i class="fa-solid fa-user-ninja"></i> SVS Coach: <strong>${c.trainer}</strong></div>
        <div class="class-meta-item"><i class="fa-solid fa-calendar-day"></i> Every ${c.day} • ${c.time}</div>
        <div class="class-meta-item"><i class="fa-solid fa-location-dot"></i> ${c.room} (${c.intensity} level)</div>
      </div>
      <div class="class-card-footer">
        <span class="seats-left"><i class="fa-solid fa-users"></i> ${c.capacity - c.bookedCount} spots left</span>
        <button class="btn-book ${c.isBooked ? 'booked' : 'available'}" onclick="toggleBookClass(${c.id})">
          ${c.isBooked ? '<i class="fa-solid fa-check"></i> Booked (Tap to cancel)' : 'Book Session'}
        </button>
      </div>
    </div>
  `).join('');
}

window.toggleBookClass = function(classId) {
  const target = state.classes.find(c => c.id === classId);
  if (!target) return;

  target.isBooked = !target.isBooked;
  target.bookedCount += target.isBooked ? 1 : -1;

  renderClasses(document.querySelector('.filter-chip.active')?.dataset.category || 'all');
  initDashboard();

  showToast(target.isBooked ? `Reserved spot in "${target.title}" at SVS Fitness!` : `Cancelled booking for "${target.title}".`);
};

// ============================================================================
// Diet & Nutrition
// ============================================================================
function initDietTracker() {
  renderDietLogs();

  const form = document.getElementById('diet-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const meal = document.getElementById('meal-type').value;
    const food = document.getElementById('food-name').value;
    const calories = parseInt(document.getElementById('meal-calories').value);
    const protein = parseFloat(document.getElementById('meal-protein').value) || 0;
    const carbs = parseFloat(document.getElementById('meal-carbs').value) || 0;
    const fats = parseFloat(document.getElementById('meal-fats').value) || 0;

    const newMeal = {
      id: Date.now(),
      meal,
      food,
      calories,
      protein,
      carbs,
      fats
    };

    state.dietLogs.push(newMeal);
    renderDietLogs();
    form.reset();

    showToast(`Added ${food} to today's diet log!`);
  });
}

function renderDietLogs() {
  const tbody = document.getElementById('diet-log-body');
  
  const totals = state.dietLogs.reduce((acc, item) => ({
    calories: acc.calories + item.calories,
    protein: acc.protein + item.protein,
    carbs: acc.carbs + item.carbs,
    fats: acc.fats + item.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  document.getElementById('macro-calories').textContent = totals.calories.toLocaleString();
  document.getElementById('macro-protein').textContent = Math.round(totals.protein);
  document.getElementById('macro-carbs').textContent = Math.round(totals.carbs);
  document.getElementById('macro-fats').textContent = Math.round(totals.fats);

  document.getElementById('prog-cal').style.width = `${Math.min(100, (totals.calories / 2400) * 100)}%`;
  document.getElementById('prog-pro').style.width = `${Math.min(100, (totals.protein / 180) * 100)}%`;
  document.getElementById('prog-carb').style.width = `${Math.min(100, (totals.carbs / 250) * 100)}%`;
  document.getElementById('prog-fat').style.width = `${Math.min(100, (totals.fats / 65) * 100)}%`;

  tbody.innerHTML = state.dietLogs.map(m => `
    <tr>
      <td><span class="badge-accent">${m.meal}</span></td>
      <td><strong>${m.food}</strong></td>
      <td>${m.calories} kcal</td>
      <td>${m.protein}g / ${m.carbs}g / ${m.fats}g</td>
    </tr>
  `).join('');
}

// ============================================================================
// Membership Plans
// ============================================================================
function initPlans() {
  const container = document.getElementById('plans-container');
  container.innerHTML = state.plans.map(p => `
    <div class="plan-card ${p.featured ? 'featured' : ''}">
      <span class="plan-badge ${p.isCurrent ? 'popular' : ''}">${p.badge}</span>
      <h3>${p.name}</h3>
      <div class="plan-price">${p.price}<span>${p.period}</span></div>
      <ul class="plan-features">
        ${p.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
      </ul>
      <button class="primary-btn btn-block" ${p.isCurrent ? 'style="background:#22c55e;"' : ''} onclick="handlePlanClick('${p.name}', ${p.isCurrent})">
        ${p.isCurrent ? '<i class="fa-solid fa-check"></i> Active SVS Plan' : 'Select & Upgrade'}
      </button>
    </div>
  `).join('');
}

window.handlePlanClick = function(planName, isCurrent) {
  if (isCurrent) {
    showToast(`You are currently on the ${planName}!`);
  } else {
    showToast(`Upgraded subscription request sent for ${planName}!`);
  }
};

// ============================================================================
// Calculator
// ============================================================================
function initCalculator() {
  const btn = document.getElementById('calc-compute-btn');
  btn.addEventListener('click', computeMetrics);
  computeMetrics();
}

function computeMetrics() {
  const weight = parseFloat(document.getElementById('calc-weight').value);
  const height = parseFloat(document.getElementById('calc-height').value);
  const age = parseInt(document.getElementById('calc-age').value);
  const gender = document.getElementById('calc-gender').value;
  const activity = parseFloat(document.getElementById('calc-activity').value);

  if (!weight || !height || !age) return;

  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);

  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;

  const tdee = Math.round(bmr * activity);

  document.getElementById('res-bmi').textContent = bmi;
  const catEl = document.getElementById('res-bmi-category');
  if (bmi < 18.5) {
    catEl.textContent = 'Underweight';
    catEl.className = 'bmi-category';
  } else if (bmi < 24.9) {
    catEl.textContent = 'Normal Weight (Optimal)';
    catEl.className = 'bmi-category normal';
  } else if (bmi < 29.9) {
    catEl.textContent = 'Overweight';
    catEl.className = 'bmi-category';
  } else {
    catEl.textContent = 'Obese';
    catEl.className = 'bmi-category';
  }

  document.getElementById('res-bmr').textContent = `${Math.round(bmr).toLocaleString()} kcal/day`;
  document.getElementById('res-tdee').textContent = `${tdee.toLocaleString()} kcal/day`;
  document.getElementById('targ-loss').textContent = `${(tdee - 500).toLocaleString()} kcal`;
  document.getElementById('targ-gain').textContent = `${(tdee + 300).toLocaleString()} kcal`;
  document.getElementById('targ-protein').textContent = `${Math.round(weight * 2.0)}g - ${Math.round(weight * 2.2)}g`;
}

// ============================================================================
// Modal & Toast
// ============================================================================
function initModal() {
  const modal = document.getElementById('pass-modal');
  const openBtn = document.getElementById('show-pass-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  openBtn.addEventListener('click', () => modal.classList.add('open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}
