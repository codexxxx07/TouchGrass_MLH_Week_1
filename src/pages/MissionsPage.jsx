import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Target, Search, CheckCircle2, Award, Clock, Leaf } from 'lucide-react';
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

  const dailyChallenge = INITIAL_MISSIONS[0];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10 font-body text-[#1E2A1A]">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <Target /> Nature missions &amp; challenges
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Real-World Outdoor Missions
          </h1>
          <p className="lede mt-4">
            Pick a challenge, leave your phone inside, and complete it in nature. Mark completion
            manually to build your exploration streak.
          </p>
        </div>

        <div className="nature-panel px-5 py-4 flex items-center gap-4 shrink-0">
          <div className="w-11 h-11 rounded-lg bg-[#E9F0E4] text-[#2D5A27] flex items-center justify-center font-display font-bold text-lg">
            {completedList.length}
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#7C8377]">
              Missions completed
            </span>
            <span className="text-base font-bold text-[#1E2A1A]">
              {completedList.length} of {INITIAL_MISSIONS.length} done
            </span>
          </div>
        </div>
      </div>

      {/* Daily Challenge Banner */}
      <div className="bg-[#1D3B19] rounded-[1.5rem] px-6 sm:px-10 py-9 sm:py-11 text-white">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="eyebrow eyebrow-dark">
              <Award /> Daily featured challenge
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-200/90">
              <Clock className="w-3.5 h-3.5" />
              {dailyChallenge.estimatedTime}
            </span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white">{dailyChallenge.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-emerald-100/85">
            {dailyChallenge.description}
          </p>

          <div className="mt-7">
            <button
              onClick={() => handleToggle(dailyChallenge)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors ${
                isCompleted(dailyChallenge.id)
                  ? 'bg-emerald-100 text-emerald-950'
                  : 'bg-white text-[#2D5A27] hover:bg-emerald-50'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted(dailyChallenge.id) ? 'text-emerald-700' : 'text-[#2D5A27]'}`} />
              <span>{isCompleted(dailyChallenge.id) ? 'Daily Mission Completed!' : 'Mark Daily Mission Completed'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="nature-panel px-4 sm:px-5 py-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA093]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search missions, leaves, birds..."
              className="nature-input pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#7C8377]">
            <span>
              {filteredMissions.length === 0
                ? 'Nothing matches your filters'
                : `${filteredMissions.length} ${filteredMissions.length === 1 ? 'mission' : 'missions'}`}
            </span>
            {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchTerm) && (
              <button onClick={resetFilters} className="text-[#2D5A27] underline underline-offset-3 hover:text-[#1D3B19]">
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-full lg:w-auto lg:mr-1 text-[11px] font-bold uppercase tracking-wider text-[#7C8377]">Category</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#2D5A27] text-white'
                    : 'bg-[#EDE9DE] text-[#4C5249] hover:bg-[#E4E0D4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-full lg:w-auto lg:mr-1 text-[11px] font-bold uppercase tracking-wider text-[#7C8377]">Difficulty</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[#2D5A27] text-white'
                    : 'bg-[#EDE9DE] text-[#4C5249] hover:bg-[#E4E0D4]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Missions */}
      {filteredMissions.length === 0 ? (
        <div className="nature-panel text-center py-14 px-8 space-y-3">
          <Target className="w-9 h-9 text-[#B5BCAA] mx-auto" />
          <h3 className="font-bold text-lg text-[#1E2A1A]">No missions match your filters</h3>
          <p className="text-sm text-[#7C8377]">Try broadening the category or clearing the search.</p>
          <button onClick={resetFilters} className="btn-nature-secondary text-sm py-2 px-5 mt-2">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMissions.map((mission) => {
            const completed = isCompleted(mission.id);
            return (
              <div
                key={mission.id}
                className={`nature-card p-6 flex flex-col ${
                  completed ? 'bg-[#F4F8F1] border-[#2D5A27]/30' : ''
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="nature-badge">{mission.category}</span>
                    <span className="text-xs font-bold text-[#7C8377] flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#2D5A27]" />
                      {mission.estimatedTime}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold leading-snug text-[#1E2A1A]">{mission.title}</h3>
                    <span className="text-[11px] font-bold text-[#2D5A27] bg-[#E9F0E4] px-2 py-0.5 rounded-md shrink-0">
                      {mission.difficulty}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-[#4C5249]">{mission.description}</p>

                  <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#1E2A1A]/10">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[#1D3B19] block mb-2">
                      Step-by-step
                    </span>
                    <ol className="space-y-1.5 text-[13px] leading-relaxed text-[#3A4038] list-decimal pl-4">
                      {mission.instructions.map((inst, idx) => (
                        <li key={idx}>{inst}</li>
                      ))}
                    </ol>
                  </div>

                  {mission.environmentalTip && (
                    <div className="p-3 bg-[#E9F0E4]/70 rounded-lg text-[13px] leading-relaxed text-[#2C4D24] flex items-start gap-2">
                      <Leaf className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                      <span><strong>Eco tip:</strong> {mission.environmentalTip}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-4">
                  <div className="pt-4 border-t border-[#1E2A1A]/10 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-[#7C8377] font-semibold">
                      {completed ? 'Mission recorded' : 'Self-reported manual action'}
                    </span>
                    <button
                      onClick={() => handleToggle(mission)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors ${
                        completed
                          ? 'bg-emerald-700 text-white'
                          : 'btn-nature-primary py-2 px-4'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>{completed ? 'Completed' : 'Mark Completed'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}