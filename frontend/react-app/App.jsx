import React, { useState } from 'react';

/**
 * SVS Fitness Member Portal - Next.js / React Modern Component Blueprint
 * Matches the complete Full-Stack Web Developer Path
 */
export default function SVSFitnessPortal() {
  const [role, setRole] = useState('member'); // 'member' | 'owner'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [member, setMember] = useState({
    name: 'Alex Reynolds',
    tier: 'SVS Elite Gold',
    streak: 14,
    workouts: 48,
    calories: 14250,
  });

  const [classes, setClasses] = useState([
    { id: 1, title: 'Heavy Iron Barbell Mastery', trainer: 'Coach Marcus Vance', time: '07:00 AM', booked: false },
    { id: 2, title: 'Metabolic Burn HIIT Inferno', trainer: 'Coach Elena Rostova', time: '08:30 AM', booked: true },
    { id: 3, title: 'Sunrise Vinyasa Yoga Flow', trainer: 'Coach Elena Rostova', time: '06:30 AM', booked: false }
  ]);

  const toggleBooking = (id) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, booked: !c.booked } : c));
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30">
              🏋️
            </div>
            <div>
              <h2 className="font-extrabold text-lg tracking-wider">SVS<span className="text-orange-500">FITNESS</span></h2>
              <span className="text-xs text-amber-400 font-bold">PORTAL</span>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl mb-6">
            <button
              onClick={() => setRole('member')}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition ${role === 'member' ? 'bg-orange-500 text-white' : 'text-slate-400'}`}
            >
              Member
            </button>
            <button
              onClick={() => setRole('owner')}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition ${role === 'owner' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
            >
              Owner
            </button>
          </div>

          <nav className="space-y-2">
            {(role === 'member' 
              ? ['dashboard', 'workout', 'classes', 'diet', 'plans'] 
              : ['revenue-overview', 'manage-members', 'manage-classes', 'backend-docs']
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl capitalize font-semibold transition ${
                  activeTab === tab 
                    ? 'bg-orange-500/20 text-orange-400 border-l-4 border-orange-500' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400">
          <p className="text-cyan-400 font-bold mb-1">SVS Fitness Full-Stack</p>
          <p>React/Next.js • Node/Express • MySQL</p>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black capitalize">
              {role === 'member' ? `${activeTab} Overview` : `SVS Owner Management - ${activeTab.replace('-', ' ')}`}
            </h1>
            <p className="text-sm text-slate-400">
              {role === 'member' ? `Welcome back, ${member.name}!` : 'SVS Fitness Admin Control Center'}
            </p>
          </div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md">
            SVS QR Pass
          </div>
        </header>

        {activeTab === 'dashboard' && role === 'member' && (
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

        {role === 'owner' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-slate-400">Total Active Members</span>
              <h3 className="text-3xl font-black text-white mt-1">184 Athletes</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-slate-400">Monthly Revenue</span>
              <h3 className="text-3xl font-black text-amber-400 mt-1">₹3,42,800</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-slate-400">Today Check-ins</span>
              <h3 className="text-3xl font-black text-emerald-400 mt-1">72 Visits</h3>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
