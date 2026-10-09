import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Printer, Download, Bookmark, RefreshCw, Cpu, ShieldAlert, CheckCircle2, Footprints, Clock, Check } from 'lucide-react';
import { generateAdventurePlan, getAiConfig } from '../services/aiService';
import { saveAdventure, getSavedAdventures } from '../services/storageService';
import PrintableAdventureModal from '../components/PrintableAdventureModal';

export default function PlannerPage() {
  const location = useLocation();

  // Form State
  const [availableTime, setAvailableTime] = useState('30 minutes');
  const [activityType, setActivityType] = useState('Nature Walk');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [locationSetting, setLocationSetting] = useState('Outdoor Park');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('None specified');
  const [interests, setInterests] = useState(['Birds', 'Leaves', 'Mindfulness']);

  // Generation State
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Prefill state if navigated from Explore or Hero
  useEffect(() => {
    if (location.state) {
      if (location.state.time) setAvailableTime(location.state.time);
      if (location.state.activity) setActivityType(location.state.activity);
      if (location.state.prefill) {
        const p = location.state.prefill;
        setAvailableTime(p.duration || '30 minutes');
        setActivityType(p.category || 'Nature Walk');
        setDifficulty(p.difficulty || 'Beginner');
      }
    }
  }, [location]);

  const interestOptions = [
    'Birds & Wildlife', 'Flora & Plants', 'Micro-Gardening', 'Photography',
    'Natural Sounds', 'Mindfulness', 'Soil & Insects', 'Weather & Clouds'
  ];

  const handleInterestToggle = (item) => {
    if (interests.includes(item)) {
      setInterests(interests.filter(i => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    try {
      const result = await generateAdventurePlan({
        availableTime,
        activityType,
        difficulty,
        locationSetting,
        accessibilityNeeds,
        interests
      });
      setGeneratedResult(result);
    } catch (err) {
      console.error('Adventure generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!generatedResult) return;
    saveAdventure(generatedResult.adventure);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-body text-[#1C2818]">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-[#E4ECE2] text-[#1D3B19] text-xs font-bold px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4 text-[#2D5A27]" />
          <span>Feature B: AI Outdoor Adventure Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C2818]">
          Plan Your Real-World Outdoor Mission
        </h1>
        <p className="text-stone-600 text-sm max-w-2xl">
          Customize your available time, starting location, and interests. Our open-source AI engine generates a structured, printable adventure card.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Controls Sidebar (Col 5) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-md space-y-5">
          <form onSubmit={handleGenerate} className="space-y-4">
            <h2 className="text-lg font-bold text-[#1C2818] border-b border-stone-100 pb-2">
              Adventure Parameters
            </h2>

            {/* 1. Time */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                ⏱️ Available Time
              </label>
              <select
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-semibold focus:border-[#2D5A27]"
              >
                <option value="15 minutes">15 Minutes Quick Reset</option>
                <option value="30 minutes">30 Minutes Micro Expedition</option>
                <option value="45 minutes">45 Minutes Deep Nature Walk</option>
                <option value="60 minutes">60 Minutes Park Exploration</option>
                <option value="90 minutes">90 Minutes Trail Adventure</option>
              </select>
            </div>

            {/* 2. Activity Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                🌿 Preferred Activity
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-semibold focus:border-[#2D5A27]"
              >
                <option value="Nature Walk">Nature Observation Walk</option>
                <option value="Bird Watching">Bird & Wildlife Watching</option>
                <option value="Micro Gardening">Balcony / Micro Gardening</option>
                <option value="Photography">Nature Texture Photography</option>
                <option value="Mindfulness">Screen-Free Mindfulness Walk</option>
              </select>
            </div>

            {/* 3. Difficulty */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                ⛰️ Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      difficulty === d
                        ? 'bg-[#2D5A27] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Location Setting */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                📍 Location / Starting Setting
              </label>
              <select
                value={locationSetting}
                onChange={(e) => setLocationSetting(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-semibold focus:border-[#2D5A27]"
              >
                <option value="Outdoor Park">Local Park / Lawn</option>
                <option value="Balcony / Patio">Balcony / Patio / Yard</option>
                <option value="Urban Streetscape">Urban Tree Line / Sidewalk</option>
                <option value="Woodland Trail">Woodland / Forest Trail</option>
              </select>
            </div>

            {/* 5. Interests Chips */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                🔍 Focus Interests
              </label>
              <div className="flex flex-wrap gap-1.5">
                {interestOptions.map((item) => {
                  const active = interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleInterestToggle(item)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                        active
                          ? 'bg-[#E4ECE2] text-[#1D3B19] border border-[#2D5A27]/40'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}{item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Accessibility */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                ♿ Accessibility Requirements
              </label>
              <select
                value={accessibilityNeeds}
                onChange={(e) => setAccessibilityNeeds(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-semibold focus:border-[#2D5A27]"
              >
                <option value="None specified">None specified</option>
                <option value="Wheelchair accessible / Paved path">Wheelchair accessible / Paved path</option>
                <option value="Low physical exertion">Low physical exertion</option>
                <option value="Seated observation spot">Seated observation spot</option>
                <option value="Quiet / Low sensory stimulation">Quiet / Low sensory stimulation</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-nature-primary w-full text-xs py-3 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>Generating Custom Adventure...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Generate Outdoor Adventure Plan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Output Area (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {!generatedResult && !loading && (
            <div className="nature-card p-8 text-center bg-white border border-stone-200 space-y-4 my-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#E4ECE2] text-[#2D5A27] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900">Your Custom Adventure Plan Will Appear Here</h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Select your available time and preferences on the left and click <strong>Generate</strong>. We will format step-by-step outdoor activities ready for printing!
              </p>
            </div>
          )}

          {loading && (
            <div className="nature-card p-8 bg-white border border-stone-200 text-center space-y-4 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#2D5A27] flex items-center justify-center mx-auto animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900">Crafting Your Screen-Free Nature Expedition...</h3>
              <p className="text-xs text-stone-500">Combining real-world observation steps, safety tips, and items checklist.</p>
            </div>
          )}

          {generatedResult && !loading && (
            <div className="nature-card p-6 bg-white border border-[#2D5A27]/20 shadow-xl space-y-6 animate-fadeIn">
              
              {/* Header & Source Disclosure */}
              <div className="border-b border-stone-200 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="nature-badge text-xs">
                    ⏱️ {generatedResult.adventure.estimatedDuration}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                    <Cpu className="w-3.5 h-3.5 text-[#2D5A27]" />
                    <span>{generatedResult.meta.disclosureNotice}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-[#1C2818]">{generatedResult.adventure.title}</h2>
                <p className="text-xs text-stone-600 leading-relaxed">{generatedResult.adventure.shortDescription}</p>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-bold text-[#1D3B19] uppercase tracking-wider mb-2">🎒 Required Items</h4>
                  <ul className="space-y-1 text-xs text-stone-800">
                    {generatedResult.adventure.requiredItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[#2D5A27]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-xs font-bold text-[#1D3B19] uppercase tracking-wider">🌿 Step-by-Step Activities</h4>
                  <div className="space-y-2">
                    {generatedResult.adventure.activities.map((act, i) => (
                      <div key={i} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800 leading-relaxed">
                        {act}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenges & Goal */}
              <div className="bg-[#E4ECE2]/60 p-4 rounded-xl space-y-2 text-xs text-[#1D3B19]">
                <h4 className="font-bold text-sm">🔍 Observation Challenges & Goal</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {generatedResult.adventure.natureChallenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <div className="pt-2 font-semibold text-[#2D5A27] border-t border-[#2D5A27]/20 mt-2">
                  🏁 Real-World Goal: "{generatedResult.adventure.completionGoal}"
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="btn-nature-primary text-xs py-2 px-4"
                  >
                    <Printer className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Print Card (Leave Phone)</span>
                  </button>

                  <button
                    onClick={handleSave}
                    className="btn-nature-secondary text-xs py-2 px-4"
                  >
                    {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{savedSuccess ? 'Saved!' : 'Save Adventure'}</span>
                  </button>
                </div>

                <span className="text-[11px] text-stone-500 font-semibold">
                  Latency: {generatedResult.meta.latencyMs}ms
                </span>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Printable Modal */}
      {generatedResult && (
        <PrintableAdventureModal
          adventure={generatedResult.adventure}
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

    </div>
  );
}
