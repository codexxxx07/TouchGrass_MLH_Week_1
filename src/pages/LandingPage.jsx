import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Compass, Target, BookOpen, ShieldCheck, Cpu, ArrowRight, Printer, CheckCircle2, Footprints, Leaf, Clock, Sun, Feather, Heart, WifiOff } from 'lucide-react';
import { INITIAL_ADVENTURES } from '../data/initialAdventures';
import { INITIAL_MISSIONS } from '../data/initialMissions';
import PrintableAdventureModal from '../components/PrintableAdventureModal';

export default function LandingPage({ onOpenNatureGuide }) {
  const navigate = useNavigate();
  const [selectedAdventure, setSelectedAdventure] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Planner Preview Form State
  const [previewTime, setPreviewTime] = useState('30 minutes');
  const [previewActivity, setPreviewActivity] = useState('Nature Walk');

  const handleQuickPlannerLaunch = (e) => {
    e.preventDefault();
    navigate('/planner', { state: { time: previewTime, activity: previewActivity } });
  };

  const handlePrintClick = (adv) => {
    setSelectedAdventure(adv);
    setIsPrintModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-12 font-body text-[#1C2818]">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#E4ECE2]/50 to-transparent -z-10 rounded-3xl" />
        
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#E4ECE2] text-[#1D3B19] px-4 py-1.5 rounded-full text-xs font-bold border border-[#2D5A27]/20 shadow-sm animate-bounce">
            <Leaf className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>Open-Source AI Outdoor Exploration Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1C2818] tracking-tight leading-tight">
            Less Scrolling. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5A27] via-[#4E7C41] to-[#8C6239]">
              More Exploring.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal max-w-2xl mx-auto">
            Turn your free time into real-world adventures with personalized AI-powered nature missions. Discover more outside, one small adventure at a time.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/planner" className="btn-nature-primary text-base py-3.5 px-7 w-full sm:w-auto">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <span>Start an Adventure</span>
            </Link>
            <Link to="/missions" className="btn-nature-secondary text-base py-3.5 px-7 w-full sm:w-auto">
              <Target className="w-5 h-5 text-[#2D5A27]" />
              <span>Explore Nature Missions</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-stone-600 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" /> 100% Screen-Free Real World Focus
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2D5A27]" /> Privacy-First Browser Storage
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Preview of Adventure Planner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nature-card p-6 sm:p-8 bg-gradient-to-br from-white to-[#FAF6EE] border border-[#2D5A27]/20 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Instant Adventure Planner</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2818]">
                Generate your personalized outdoor plan in seconds.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Tell our open-source AI engine how much time you have and what you feel like doing. Get step-by-step challenges and safety tips ready to print.
              </p>

              <div className="p-3 bg-[#E4ECE2]/60 rounded-xl text-xs text-[#1D3B19] flex items-center gap-2">
                <Printer className="w-4 h-4 shrink-0 text-[#2D5A27]" />
                <span>Printable or TXT downloadable so you can leave your phone inside!</span>
              </div>
            </div>

            {/* Interactive Form Widget */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
              <form onSubmit={handleQuickPlannerLaunch} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      ⏱️ Available Time
                    </label>
                    <select
                      value={previewTime}
                      onChange={(e) => setPreviewTime(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-semibold focus:border-[#2D5A27]"
                    >
                      <option value="15 minutes">15 Minutes Quick Reset</option>
                      <option value="30 minutes">30 Minutes Micro Exploration</option>
                      <option value="45 minutes">45 Minutes Deep Nature Walk</option>
                      <option value="60 minutes">60 Minutes Full Expedition</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      🌿 Preferred Activity
                    </label>
                    <select
                      value={previewActivity}
                      onChange={(e) => setPreviewActivity(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-semibold focus:border-[#2D5A27]"
                    >
                      <option value="Nature Walk">Nature Observation Walk</option>
                      <option value="Bird Watching">Bird & Wildlife Spotting</option>
                      <option value="Micro Gardening">Balcony / Micro Gardening</option>
                      <option value="Photography">Nature Texture Photography</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF6EE] rounded-xl border border-stone-200 text-xs text-stone-700">
                  <p className="font-semibold text-[#1D3B19] mb-1">Generated Output Includes:</p>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-stone-600">
                    <span>✓ Step-by-step outdoor missions</span>
                    <span>✓ Nature observation tasks</span>
                    <span>✓ Required gear checklist</span>
                    <span>✓ Clear real-world goal</span>
                  </div>
                </div>

                <button type="submit" className="btn-nature-primary w-full text-sm py-3">
                  <span>Launch AI Adventure Planner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Outdoor Challenges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5A27] uppercase tracking-wider mb-1">
              <Target className="w-4 h-4" /> Real-World Missions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2818]">Featured Nature Challenges</h2>
          </div>
          <Link to="/missions" className="text-xs font-bold text-[#2D5A27] hover:underline flex items-center gap-1">
            <span>View All Missions ({INITIAL_MISSIONS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_MISSIONS.slice(0, 4).map((mission) => (
            <div key={mission.id} className="nature-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="nature-badge text-[11px]">{mission.category}</span>
                  <span className="text-[11px] font-semibold text-stone-500">{mission.estimatedTime}</span>
                </div>
                <h3 className="font-bold text-base text-[#1C2818] mb-2">{mission.title}</h3>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {mission.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#2D5A27]">{mission.difficulty}</span>
                <Link to="/missions" className="text-xs font-bold text-[#2D5A27] hover:underline">
                  Start Challenge &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How the Platform Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D3B19] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">How Touch Grass Works</h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              Our core principle: Plan on the screen. Experience it in the real world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-700/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center font-extrabold text-lg text-emerald-200">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Plan Your Adventure</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Use open-source AI or curated presets to generate a personalized micro-mission tailored to your time, location, and accessibility requirements.
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-700/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center font-extrabold text-lg text-emerald-200">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Print & Unplug</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Print or download your mission card. Leave your phone inside or in airplane mode, step out the door, and immerse yourself in real nature.
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-700/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center font-extrabold text-lg text-emerald-200">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Log in Your Journal</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Return feeling refreshed, mark your mission complete, and save your notes and discoveries locally in your private nature journal.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Open-Source AI and Privacy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#2D5A27]/20 shadow-lg space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-[#E4ECE2] text-[#1D3B19] text-xs font-bold px-3 py-1 rounded-full">
              <Cpu className="w-4 h-4 text-[#2D5A27]" />
              <span>Open Innovation Manifesto</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2818]">
              Why Open-Source AI Matters for Outdoor Exploration
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We believe AI should help you spend less time on screens, not trap you in a engagement loop. Here is how our architecture respects your privacy and autonomy:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 bg-[#FAF6EE] rounded-2xl border border-stone-200 space-y-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl w-fit font-bold text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Local Privacy
              </div>
              <h3 className="font-bold text-base text-stone-900">Your Data Stays on Device</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Journal entries, outdoor stats, and saved plans are stored locally in your browser storage. We never collect or sell your personal activity.
              </p>
            </div>

            <div className="p-5 bg-[#FAF6EE] rounded-2xl border border-stone-200 space-y-2">
              <div className="p-2 bg-sky-100 text-sky-800 rounded-xl w-fit font-bold text-xs flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Transparent Inference
              </div>
              <h3 className="font-bold text-base text-stone-900">Always Know the Engine</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every response displays a disclosure badge showing whether it came from local Ollama, an open API, or the offline rule fallback.
              </p>
            </div>

            <div className="p-5 bg-[#FAF6EE] rounded-2xl border border-stone-200 space-y-2">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-xl w-fit font-bold text-xs flex items-center gap-1.5">
                <WifiOff className="w-4 h-4" /> Offline Resilience
              </div>
              <h3 className="font-bold text-base text-stone-900">Works Without Internet</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Basic nature missions, saved adventures, and nature journal entries remain accessible offline without requiring an active server connection.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Nature Journal Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nature-card p-8 bg-gradient-to-r from-[#FAF6EE] to-white border border-[#2D5A27]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Personal Nature Journal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2818]">
              Record your observations & discoveries locally.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Log leaf shapes, bird calls, mood improvements, and weather notes. Export your observations as JSON anytime or review your streak history.
            </p>
            <div className="pt-2">
              <Link to="/journal" className="btn-nature-primary py-2.5 px-5 text-xs">
                <span>Open My Nature Journal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-80 bg-white p-4 rounded-2xl border border-stone-200 shadow-md font-body text-xs space-y-2">
            <div className="flex items-center justify-between text-stone-500 font-semibold text-[11px]">
              <span>Sample Journal Entry</span>
              <span>2 days ago</span>
            </div>
            <h4 className="font-bold text-sm text-[#1C2818]">Morning Oak Grove Walk</h4>
            <p className="text-stone-600 text-[11px] leading-relaxed line-clamp-3">
              Observed a pair of Northern Cardinals nesting in an oak canopy. Collected 4 distinct fallen leaf specimens. Head feels clear and grounded!
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] border-t border-stone-100">
              <span className="text-emerald-800 font-bold">🌿 Peaceful</span>
              <span className="text-stone-500">Pine Hill Reserve</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2818]">
          Ready to disconnect and touch grass?
        </h2>
        <p className="text-stone-600 text-sm max-w-xl mx-auto">
          Start your first 15-minute nature mission right now. No account required, 100% free and open-source.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/planner" className="btn-nature-primary text-sm py-3 px-6">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Generate First Adventure</span>
          </Link>
        </div>
      </section>

      {/* Printable Modal */}
      {selectedAdventure && (
        <PrintableAdventureModal
          adventure={selectedAdventure}
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

    </div>
  );
}
