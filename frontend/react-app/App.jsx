import React, { useState, useEffect } from 'react';

/**
 * ApexFit Member Portal - Next.js / React Modern Component Blueprint
 * Matches the complete Full-Stack Web Developer Path
 */
export default function ApexFitPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [member, setMember] = useState({
    name: 'Alex Reynolds',
    tier: 'Elite Gold',
    streak: 14,
    workouts: 48,
    calories: 14250,
  });

  const [classes, setClasses] = useState([
    { id: 1, title: 'Heavy Iron Barbell Mastery', trainer: 'Marcus Vance', time: '07:00 AM', booked: false },
    { id: 2, title: 'Metabolic Burn HIIT Inferno', trainer: 'Elena Rostova', time: '08:30 AM', booked: true },
    { id: 3, title: 'Sunrise Vinyasa Yoga Flow', trainer: 'Elena Rostova', time: '06:30 AM', booked: false }
  ]);

  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Barbell Bench Press', group: 'Chest', sets: 4, reps: 10, weight: 85 },
    { id: 2, name: 'Barbell Back Squat', group: 'Legs', sets: 5, reps: 8, weight: 120 }
  ]);

  const toggleBooking = (id) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, booked: !c.booked } : c));
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30">
              🏋️
            </div>
            <div>
              <h2 className="font-extrabold text-lg tracking-wider">APEX<span className="text-orange-500">FIT</span></h2>
              <span className="text-xs text-slate-400 font-medium">MEMBER HUB</span>
            </div>
          </div>

          <nav className="space-y-2">
            {['dashboard', 'workout', 'classes', 'diet', 'plans'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl capitalize font-semibold transition ${
                  activeTab === tab 
                    ? 'bg-orange-500/20 text-orange-400 border-l-4 border-orange-500' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400">
          <p className="text-cyan-400 font-bold mb-1">Full-Stack React / Next.js</p>
          <p>Express REST API • MySQL</p>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black capitalize">{activeTab} Overview</h1>
            <p className="text-sm text-slate-400">Welcome back, {member.name}!</p>
          </div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md">
            Digital QR Pass
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-slate-400">Active Streak</span>
              <h3 className="text-3xl font-black text-white mt-1">{member.streak} Days</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-slate-400">Workouts</span>
              <h3 className="text-3xl font-black text-cyan-400 mt-1">{member.workouts} Sessions</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-slate-400">Monthly Burn</span>
              <h3 className="text-3xl font-black text-amber-400 mt-1">{member.calories} kcal</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-slate-400">Tier Status</span>
              <h3 className="text-3xl font-black text-purple-400 mt-1">{member.tier}</h3>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classes.map(c => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">Coach: {c.trainer}</p>
                  <p className="text-xs text-orange-400 font-semibold mt-2">{c.time}</p>
                </div>
                <button
                  onClick={() => toggleBooking(c.id)}
                  className={`mt-4 w-full py-2.5 rounded-xl font-bold text-sm transition ${
                    c.booked ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  {c.booked ? 'Booked ✓' : 'Reserve Spot'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

