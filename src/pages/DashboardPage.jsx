import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Clock, Flame, Target, BookOpen, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
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

  const tier = Math.floor(stats.missionsCompletedCount / 3) + 1;
  const tierProgressPct = Math.round(((stats.missionsCompletedCount % 3) / 3) * 100);
  const tierBarPct = Math.min(100, Math.max(10, tierProgressPct));

  const statItems = [
    {
      label: 'Total time outside',
      value: totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${remainingMins} mins`,
      sub: 'Logged screen-free outdoors',
      icon: Clock,
      iconClass: 'bg-[#E9F0E4] text-[#2D5A27]'
    },
    {
      label: 'Exploration streak',
      value: `${stats.currentStreakDays} ${stats.currentStreakDays === 1 ? 'day' : 'days'}`,
      sub: 'Active, self-reported streak',
      icon: Flame,
      iconClass: 'bg-[#F7E8CE] text-[#9C6B1F]'
    },
    {
      label: 'Missions done',
      value: stats.missionsCompletedCount,
      sub: 'Real-world challenges completed',
      icon: Target,
      iconClass: 'bg-[#E3EFF5] text-[#2E6C8C]'
    },
    {
      label: 'Journal discoveries',
      value: stats.journalEntriesCount,
      sub: 'Saved local observations',
      icon: BookOpen,
      iconClass: 'bg-[#E9F0E4] text-[#2D5A27]'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10 font-body text-[#1E2A1A]">

      {/* Header */}
      <div className="max-w-2xl">
        <span className="eyebrow">
          <LayoutDashboard /> Touch grass dashboard
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Your Outdoor Exploration Overview
        </h1>
        <p className="lede mt-4">
          Real statistics calculated directly from your logged adventures, nature missions, and
          private journal entries.
        </p>
      </div>

      {/* Self-Reported Stats Disclosure Notice */}
      <div className="bg-[#FAF6EE] border border-[#2D5A27]/20 rounded-xl px-4 py-3.5 flex items-start gap-3 text-[13px] leading-relaxed text-[#4C5249]">
        <span className="p-1.5 rounded-lg bg-[#E9F0E4] text-[#2D5A27] shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </span>
        <p>
          <strong className="text-[#1D3B19]">Real-world integrity.</strong> All statistics below come
          strictly from your self-reported completed missions and local journal logs — no fake metrics
          or simulated data.
        </p>
      </div>

      {/* Stats Panel */}
      <div className="nature-panel overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statItems.map((item, i) => (
            <div
              key={item.label}
              className={`p-6 sm:p-7 space-y-3 ${
                i === 1
                  ? 'border-l border-[#1E2A1A]/10'
                  : i === 2
                    ? 'border-t lg:border-t-0 lg:border-l border-[#1E2A1A]/10'
                    : i === 3
                      ? 'border-l border-t lg:border-t-0 border-[#1E2A1A]/10'
                      : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C8377]">
                  {item.label}
                </span>
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.iconClass}`}>
                  <item.icon className="w-4.5 h-4.5" />
                </span>
              </div>
              <div className="font-display text-[1.75rem] leading-none font-bold tracking-tight text-[#1E2A1A]">
                {item.value}
              </div>
              <div className="text-xs leading-snug text-[#7C8377]">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: Suggested Next Adventure + Saved (Col 7) */}
        <div className="lg:col-span-7 space-y-6">

          <div className="nature-panel p-6 sm:p-7">
            <span className="eyebrow">
              <Sparkles /> Suggested next adventure
            </span>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="nature-badge">{suggestedNext.duration}</span>
              <span className="nature-badge">{suggestedNext.difficulty}</span>
            </div>
            <h3 className="mt-3 text-xl font-bold text-[#1E2A1A]">{suggestedNext.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4C5249]">
              {suggestedNext.shortDescription}
            </p>
            <div className="mt-5">
              <Link to="/planner" className="btn-nature-primary text-sm py-2.5 px-5">
                <span>Start This Adventure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="nature-panel p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2A1A]/10">
              <h3 className="text-base font-bold text-[#1E2A1A]">Saved &amp; completed adventures</h3>
              <Link to="/planner" className="btn-nature-quiet text-[13px]">
                + Create New
              </Link>
            </div>

            {savedAdventures.length === 0 ? (
              <p className="text-sm text-[#7C8377] italic py-6 text-center">
                No saved adventures yet. Use the AI Planner to generate and save your first plan.
              </p>
            ) : (
              <ul className="divide-y divide-[#1E2A1A]/8">
                {savedAdventures.slice(0, 4).map((adv) => (
                  <li key={adv.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-[#1E2A1A] truncate">{adv.title}</h4>
                      <span className="text-xs text-[#7C8377]">
                        {adv.estimatedDuration || adv.duration} &#183; {adv.difficulty}
                      </span>
                    </div>
                    {adv.completed ? (
                      <span className="text-xs font-bold text-emerald-900 bg-[#E9F0E4] px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Completed
                      </span>
                    ) : (
                      <Link to="/planner" className="btn-nature-quiet text-[13px] shrink-0">
                        View Plan
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Right: Tier + Recent Journal (Col 5) */}
        <div className="lg:col-span-5 space-y-6">

          <div className="nature-panel p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-[#1E2A1A]">Outdoor explorer tier</h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D5A27] bg-[#E9F0E4] px-2.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" /> Tier {tier}
              </span>
            </div>

            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#7C8377]">
                <span>Progress to next tier</span>
                <span>{tierProgressPct}%</span>
              </div>
              <div className="w-full h-2 bg-[#E7E3D8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2D5A27] transition-all duration-500"
                  style={{ width: `${tierBarPct}%` }}
                />
              </div>
            </div>

            <p className="mt-3 text-xs leading-snug text-[#7C8377]">
              Complete 3 nature missions to advance your real-world exploration tier.
            </p>
          </div>

          <div className="nature-panel p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2A1A]/10">
              <h3 className="text-base font-bold text-[#1E2A1A]">Recent journal discoveries</h3>
              <Link to="/journal" className="btn-nature-quiet text-[13px]">
                View All
              </Link>
            </div>

            {journalEntries.length === 0 ? (
              <p className="text-sm text-[#7C8377] italic py-6 text-center">
                No observations recorded yet.
              </p>
            ) : (
              <ul className="divide-y divide-[#1E2A1A]/8">
                {journalEntries.slice(0, 3).map((entry) => (
                  <li key={entry.id} className="py-3.5 space-y-1">
                    <div className="flex justify-between gap-3 text-[13px] font-bold text-[#1D3B19]">
                      <span className="truncate">{entry.title}</span>
                      <span className="text-xs font-semibold text-[#9AA093] shrink-0">{entry.date}</span>
                    </div>
                    <p className="text-[13px] text-[#4C5249] line-clamp-2 leading-relaxed">{entry.notes}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}