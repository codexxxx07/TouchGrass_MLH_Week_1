import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Award, Clock, Target, Flame, BookOpen, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getDashboardStats, getSavedAdventures, getJournalEntries } from '../services/storageService';
import { INITIAL_ADVENTURES } from '../data/initialAdventures';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    adventuresCompletedCount: 0,
    missionsCompletedCount: 0,
    totalOutdoorMinutes: 0,
    currentStreakDays: 1,
    journalEntriesCount: 0,
    recentDiscoveriesCount: 0
  });

  const [savedAdventures, setSavedAdventures] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    setStats(getDashboardStats());
    setSavedAdventures(getSavedAdventures());
    setJournalEntries(getJournalEntries());
  }, []);

  const totalHours = Math.floor(stats.totalOutdoorMinutes / 60);
  const remainingMins = stats.totalOutdoorMinutes % 60;

  const suggestedNext = INITIAL_ADVENTURES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-body text-[#1C2818]">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#E4ECE2] text-[#1D3B19] text-xs font-bold px-3 py-1 rounded-full">
          <LayoutDashboard className="w-4 h-4 text-[#2D5A27]" />
          <span>Feature E: Touch Grass Dashboard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C2818]">
          Your Outdoor Exploration Overview
        </h1>
        <p className="text-stone-600 text-sm max-w-2xl">
          Real statistics calculated directly from your logged adventures, nature missions, and private journal entries.
        </p>
      </div>

      {/* Self-Reported Stats Disclosure Notice */}
      <div className="bg-[#FAF6EE] border border-[#2D5A27]/20 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-[#1D3B19]">
        <ShieldCheck className="w-5 h-5 text-[#2D5A27] shrink-0" />
        <span>
          <strong>Real-World Integrity Notice:</strong> All statistics below are calculated strictly from your self-reported real-world completed missions and local journal logs. No fake metrics or simulated user data.
        </span>
      </div>

      {/* Stats Cards Grid (4 Col) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat 1: Outdoor Time */}
        <div className="nature-card p-6 bg-gradient-to-br from-white to-[#E4ECE2]/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Time Outside</span>
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#1C2818]">
              {totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${remainingMins} mins`}
            </span>
            <span className="text-xs text-stone-500 block mt-1">Logged screen-free outdoors</span>
          </div>
        </div>

        {/* Stat 2: Streak */}
        <div className="nature-card p-6 bg-gradient-to-br from-white to-amber-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Exploration Streak</span>
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#1C2818]">
              {stats.currentStreakDays} {stats.currentStreakDays === 1 ? 'Day' : 'Days'}
            </span>
            <span className="text-xs text-amber-800 font-semibold block mt-1">Active Nature Streak 🔥</span>
          </div>
        </div>

        {/* Stat 3: Missions Completed */}
        <div className="nature-card p-6 bg-gradient-to-br from-white to-sky-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Missions Done</span>
            <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#1C2818]">{stats.missionsCompletedCount}</span>
            <span className="text-xs text-stone-500 block mt-1">Real-world challenges completed</span>
          </div>
        </div>

        {/* Stat 4: Journal Observations */}
        <div className="nature-card p-6 bg-gradient-to-br from-white to-[#E4ECE2]/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Journal Discoveries</span>
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#1C2818]">{stats.journalEntriesCount}</span>
            <span className="text-xs text-stone-500 block mt-1">Saved local observations</span>
          </div>
        </div>

      </div>

      {/* Progress Bars & Goal Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Suggested Next Adventure + Saved Adventures (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Suggested Next Adventure */}
          <div className="nature-card p-6 bg-gradient-to-r from-[#FAF6EE] to-white border border-[#2D5A27]/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-[#E4ECE2] text-[#1D3B19] text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span>Suggested Next Adventure</span>
              </span>
              <span className="text-xs text-stone-500 font-semibold">⏱️ {suggestedNext.duration}</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1C2818]">{suggestedNext.title}</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{suggestedNext.shortDescription}</p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link to="/planner" className="btn-nature-primary text-xs py-2 px-4">
                <span>Start This Adventure &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Saved Adventures History */}
          <div className="nature-card p-6 bg-white border border-stone-200 space-y-4">
            <h3 className="text-lg font-bold text-[#1C2818] flex items-center justify-between">
              <span>Saved & Completed Adventures</span>
              <Link to="/planner" className="text-xs font-bold text-[#2D5A27] hover:underline">
                + Create New
              </Link>
            </h3>

            {savedAdventures.length === 0 ? (
              <p className="text-xs text-stone-500 italic py-4 text-center">
                No saved adventures yet. Use the AI Planner to generate and save your first plan!
              </p>
            ) : (
              <div className="space-y-3">
                {savedAdventures.slice(0, 4).map((adv) => (
                  <div key={adv.id} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#1C2818]">{adv.title}</h4>
                      <span className="text-[11px] text-stone-500">{adv.estimatedDuration || adv.duration} • {adv.difficulty}</span>
                    </div>
                    {adv.completed ? (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Completed
                      </span>
                    ) : (
                      <Link to="/planner" className="text-xs font-bold text-[#2D5A27] hover:underline">
                        View Plan
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right: Recent Journal Entries & Badges (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Level Progress */}
          <div className="nature-card p-6 bg-white border border-stone-200 space-y-4">
            <h3 className="text-base font-bold text-[#1C2818] flex items-center justify-between">
              <span>Outdoor Explorer Tier</span>
              <span className="text-xs font-bold text-[#2D5A27] bg-[#E4ECE2] px-2.5 py-0.5 rounded-full">
                Tier {Math.floor(stats.missionsCompletedCount / 3) + 1}
              </span>
            </h3>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-stone-600 font-semibold">
                <span>Progress to Next Tier</span>
                <span>{(stats.missionsCompletedCount % 3) * 33.3}%</span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2D5A27] to-[#4E7C41] transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(10, ((stats.missionsCompletedCount % 3) / 3) * 100))}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-stone-500 leading-snug">
              Complete 3 nature missions to advance your real-world exploration tier!
            </p>
          </div>

          {/* Recent Journal Snippets */}
          <div className="nature-card p-6 bg-white border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1C2818]">Recent Journal Discoveries</h3>
              <Link to="/journal" className="text-xs font-bold text-[#2D5A27] hover:underline">
                View All
              </Link>
            </div>

            {journalEntries.length === 0 ? (
              <p className="text-xs text-stone-500 italic py-3">No observations recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {journalEntries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="p-3 bg-[#FAF6EE] rounded-xl border border-stone-200 space-y-1 text-xs">
                    <div className="flex justify-between text-[11px] font-bold text-[#1D3B19]">
                      <span>{entry.title}</span>
                      <span className="text-stone-400">{entry.date}</span>
                    </div>
                    <p className="text-[#333] text-[11px] line-clamp-2">{entry.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
