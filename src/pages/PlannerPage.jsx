import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Printer, Bookmark, RefreshCw, Cpu, CheckCircle2, Check } from 'lucide-react';
import { generateAdventurePlan } from '../services/aiService';
import { saveAdventure } from '../services/storageService';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10 font-body text-[#1E2A1A]">

      {/* Page Header */}
      <div className="max-w-2xl">
        <span className="eyebrow">
          <Sparkles /> AI outdoor adventure planner
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Plan Your Real-World Outdoor Mission
        </h1>
        <p className="lede mt-4">
          Customize time, starting place, and interests. The open-source engine returns a structured,
          printable adventure card — no account required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Form Controls Sidebar */}
        <div className="lg:col-span-5 nature-panel p-6 sm:p-7 space-y-5 lg:sticky lg:top-24">
          <form onSubmit={handleGenerate} className="space-y-5">
            <h2 className="text-base font-bold text-[#1E2A1A] flex items-center gap-2 pb-3 border-b border-[#1E2A1A]/10">
              Adventure parameters
            </h2>

            <div>
              <label className="field-label" htmlFor="pl-time">Available time</label>
              <select
                id="pl-time"
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                className="nature-input"
              >
                <option value="15 minutes">15 Minutes Quick Reset</option>
                <option value="30 minutes">30 Minutes Micro Expedition</option>
                <option value="45 minutes">45 Minutes Deep Nature Walk</option>
                <option value="60 minutes">60 Minutes Park Exploration</option>
                <option value="90 minutes">90 Minutes Trail Adventure</option>
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="pl-activity">Preferred activity</label>
              <select
                id="pl-activity"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="nature-input"
              >
                <option value="Nature Walk">Nature Observation Walk</option>
                <option value="Bird Watching">Bird &amp; Wildlife Watching</option>
                <option value="Micro Gardening">Balcony / Micro Gardening</option>
                <option value="Photography">Nature Texture Photography</option>
                <option value="Mindfulness">Screen-Free Mindfulness Walk</option>
              </select>
            </div>

            <div>
              <span className="field-label">Difficulty level</span>
              <div className="grid grid-cols-3 gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`py-2 rounded-lg text-[13px] font-semibold transition-colors ${
                      difficulty === d
                        ? 'bg-[#2D5A27] text-white'
                        : 'bg-[#EDE9DE] text-[#4C5249] hover:bg-[#E4E0D4]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="pl-location">Location / starting setting</label>
              <select
                id="pl-location"
                value={locationSetting}
                onChange={(e) => setLocationSetting(e.target.value)}
                className="nature-input"
              >
                <option value="Outdoor Park">Local Park / Lawn</option>
                <option value="Balcony / Patio">Balcony / Patio / Yard</option>
                <option value="Urban Streetscape">Urban Tree Line / Sidewalk</option>
                <option value="Woodland Trail">Woodland / Forest Trail</option>
              </select>
            </div>

            <div>
              <span className="field-label">Focus interests</span>
              <div className="flex flex-wrap gap-1.5">
                {interestOptions.map((item) => {
                  const active = interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleInterestToggle(item)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                        active
                          ? 'bg-[#E9F0E4] text-[#23421C] border border-[#2D5A27]/35'
                          : 'bg-[#EDE9DE] text-[#4C5249] hover:bg-[#E4E0D4] border border-transparent'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}{item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="pl-accessibility">Accessibility requirements</label>
              <select
                id="pl-accessibility"
                value={accessibilityNeeds}
                onChange={(e) => setAccessibilityNeeds(e.target.value)}
                className="nature-input"
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
              className="btn-nature-primary w-full text-sm py-3"
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

        {/* Generated Output Area */}
        <div className="lg:col-span-7 space-y-4">

          {!generatedResult && !loading && (
            <div className="nature-panel p-10 sm:p-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#E9F0E4] text-[#2D5A27] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="mt-5 font-bold text-lg text-[#1E2A1A]">Your plan appears here</h3>
              <p className="mt-2 text-sm text-[#7C8377] max-w-md mx-auto leading-relaxed">
                Choose your time and preferences, then press <strong>Generate</strong>. You&rsquo;ll get
                step-by-step activities and a printable card ready to take outside.
              </p>
            </div>
          )}

          {loading && (
            <div className="nature-panel p-10 sm:p-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#E9F0E4] text-[#2D5A27] flex items-center justify-center mx-auto">
                <RefreshCw className="w-6 h-6 animate-spin" />
              </div>
              <h3 className="mt-5 font-bold text-lg text-[#1E2A1A]">
                Crafting your screen-free nature expedition...
              </h3>
              <p className="mt-2 text-sm text-[#7C8377]">
                Combining observation steps, safety tips, and a gear checklist.
              </p>
            </div>
          )}

          {generatedResult && !loading && (
            <div className="nature-card p-6 sm:p-8 border-[#2D5A27]/25 space-y-6 animate-fadeIn">

              {/* Header & Source Disclosure */}
              <div className="border-b border-[#1E2A1A]/10 pb-5 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="nature-badge">{generatedResult.adventure.estimatedDuration}</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#7C8377] bg-[#EDE9DE] px-2.5 py-1 rounded-full">
                    <Cpu className="w-3.5 h-3.5 text-[#2D5A27]" />
                    <span>{generatedResult.meta.disclosureNotice}</span>
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-[#1E2A1A]">
                  {generatedResult.adventure.title}
                </h2>
                <p className="prose-nature">{generatedResult.adventure.shortDescription}</p>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#1E2A1A]/10">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1D3B19] mb-2.5">
                    Gear needed
                  </h4>
                  <ul className="space-y-1.5 text-[13px] text-[#3A4038]">
                    {generatedResult.adventure.requiredItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A27] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1D3B19]">
                    Step-by-step activities
                  </h4>
                  <ol className="space-y-2">
                    {generatedResult.adventure.activities.map((act, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-3 bg-[#FAF6EE] rounded-xl border border-[#1E2A1A]/10 text-[13px] leading-relaxed text-[#3A4038]"
                      >
                        <span className="font-display text-xs font-bold text-[#2D5A27] bg-[#E9F0E4] rounded-md w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Challenges & Goal */}
              <div className="bg-[#FAF6EE] border-l-[3px] border-[#2D5A27] rounded-r-xl p-5">
                <h4 className="font-bold text-sm text-[#1E2A1A] mb-2">Observation challenges &amp; goal</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-[13px] leading-relaxed text-[#4C5249]">
                  {generatedResult.adventure.natureChallenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-[#1E2A1A]/10 font-semibold text-[13px] text-[#2D5A27]">
                  Real-world goal: &ldquo;{generatedResult.adventure.completionGoal}&rdquo;
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-[#1E2A1A]/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="btn-nature-primary text-sm py-2.5 px-4"
                  >
                    <Printer className="w-4 h-4 text-emerald-300" />
                    <span>Print Card</span>
                  </button>

                  <button
                    onClick={handleSave}
                    className="btn-nature-secondary text-sm py-2.5 px-4"
                  >
                    {savedSuccess
                      ? <Check className="w-4 h-4 text-emerald-700" />
                      : <Bookmark className="w-4 h-4" />}
                    <span>{savedSuccess ? 'Saved!' : 'Save Adventure'}</span>
                  </button>
                </div>

                <span className="text-[11px] text-[#7C8377] font-semibold">
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