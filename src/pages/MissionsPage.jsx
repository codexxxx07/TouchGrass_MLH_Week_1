import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Target, Search, Filter, CheckCircle2, Sparkles, Clock, Leaf, ShieldAlert, Footprints, Award, RefreshCw } from 'lucide-react';
import { INITIAL_MISSIONS } from '../data/initialMissions';
import { getCompletedMissions, toggleMissionCompletion } from '../services/storageService';

export default function MissionsPage() {
  const [completedList, setCompletedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    setCompletedList(getCompletedMissions());
  }, []);

  const categories = ['All', 'Mindfulness & Screen-Free', 'Flora & Plants', 'Birds & Wildlife', 'Micro-Gardening', 'Outdoor Walking'];
  const difficulties = ['All', 'Beginner', 'Intermediate'];

  const handleToggle = (mission) => {
    const isNowCompleted = !completedList.some(m => m.id === mission.id);
    const updated = toggleMissionCompletion(mission.id, mission.durationMinutes || 20);
    setCompletedList(updated);

    if (isNowCompleted) {
      // Fire celebration confetti!
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const isCompleted = (id) => completedList.some(m => m.id === id);

  const filteredMissions = INITIAL_MISSIONS.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || m.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  const dailyChallenge = INITIAL_MISSIONS[0]; // Highlighted Daily Mission

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-body text-[#1C2818]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#E4ECE2] text-[#1D3B19] text-xs font-bold px-3 py-1 rounded-full">
            <Target className="w-4 h-4 text-[#2D5A27]" />
            <span>Feature C: Nature Missions & Challenges</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C2818]">
            Real-World Outdoor Missions
          </h1>
          <p className="text-stone-600 text-sm max-w-2xl">
            Choose a challenge, leave your phone inside, and complete it in nature. Mark completion manually to build your exploration streak!
          </p>
        </div>

        {/* Progress Box */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2D5A27] flex items-center justify-center font-extrabold text-lg">
            {completedList.length}
          </div>
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Missions Completed</span>
            <span className="text-lg font-bold text-[#1C2818]">{completedList.length} of {INITIAL_MISSIONS.length} Done</span>
          </div>
        </div>
      </div>

      {/* Daily Challenge Banner */}
      <div className="bg-gradient-to-r from-[#2D5A27] to-[#1D3B19] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
            <Award className="w-4 h-4 text-emerald-300" />
            <span>Daily Featured Challenge</span>
          </div>
          <span className="text-xs text-emerald-200 font-semibold">⏱️ {dailyChallenge.estimatedTime}</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">{dailyChallenge.title}</h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl leading-relaxed">
            {dailyChallenge.description}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => handleToggle(dailyChallenge)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isCompleted(dailyChallenge.id)
                ? 'bg-emerald-100 text-emerald-950 shadow-inner'
                : 'bg-white text-[#2D5A27] hover:bg-emerald-50 shadow-md'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted(dailyChallenge.id) ? 'text-emerald-700' : 'text-[#2D5A27]'}`} />
            <span>{isCompleted(dailyChallenge.id) ? 'Daily Mission Completed! 🎉' : 'Mark Daily Mission Completed'}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search missions, leaves, birds..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#2D5A27]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2D5A27] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Grid of Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMissions.map((mission) => {
          const completed = isCompleted(mission.id);
          return (
            <div
              key={mission.id}
              className={`nature-card p-6 flex flex-col justify-between space-y-4 border transition-all ${
                completed ? 'bg-emerald-50/40 border-emerald-300/80 shadow-xs' : 'bg-white border-stone-200'
              }`}
            >
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="nature-badge text-[11px]">{mission.category}</span>
                  <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md">
                    ⏱️ {mission.estimatedTime}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-[#1C2818] leading-snug">{mission.title}</h3>
                  <span className="text-xs font-bold text-[#2D5A27] bg-[#E4ECE2] px-2 py-0.5 rounded-md shrink-0">
                    {mission.difficulty}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">{mission.description}</p>

                {/* Instructions */}
                <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-stone-200 text-xs space-y-1.5">
                  <span className="font-bold text-[#1D3B19] block text-[11px]">📋 Step-by-Step Instructions:</span>
                  <ol className="list-decimal pl-4 text-stone-700 space-y-1 text-[11px]">
                    {mission.instructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ol>
                </div>

                {/* Environmental Tip */}
                {mission.environmentalTip && (
                  <div className="p-2.5 bg-emerald-100/60 rounded-lg text-[11px] text-emerald-900 flex items-start gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#2D5A27] shrink-0 mt-0.5" />
                    <span><strong>Eco Tip:</strong> {mission.environmentalTip}</span>
                  </div>
                )}
              </div>

              {/* Completion Toggle */}
              <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-semibold">
                  {completed ? '✓ Mission Recorded' : 'Self-Reported Manual Action'}
                </span>

                <button
                  onClick={() => handleToggle(mission)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    completed
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'btn-nature-primary'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{completed ? 'Completed ✓' : 'Mark Completed'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
