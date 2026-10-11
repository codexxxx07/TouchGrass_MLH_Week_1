import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Target, BookOpen, ShieldCheck, Cpu, ArrowRight, Printer, CheckCircle2, Leaf, WifiOff } from 'lucide-react';
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

  const steps = [
    {
      title: 'Plan your adventure',
      copy: 'Pick how much time you have and what you feel like doing. The open-source engine shapes it into a micro-mission tailored to your place and pace.'
    },
    {
      title: 'Print & unplug',
      copy: 'Print or download the mission card — then leave your phone inside. Step out the door and give the real world your full attention.'
    },
    {
      title: 'Log it afterwards',
      copy: 'Return refreshed, mark the mission complete, and save your notes privately in your nature journal. No account, no uploads.'
    }
  ];

  const principles = [
    {
      icon: ShieldCheck,
      title: 'Your data stays on device',
      copy: 'Journal entries, outdoor stats, and saved plans are stored locally in your browser. We never collect or sell your personal activity.'
    },
    {
      icon: Cpu,
      title: 'You always know the engine',
      copy: 'Every response carries a disclosure badge showing whether it came from local Ollama, an open API, or the offline rule fallback.'
    },
    {
      icon: WifiOff,
      title: 'Works without connectivity',
      copy: 'Basic missions, saved plans, and journal entries all remain accessible offline — no active server connection required.'
    }
  ];

  return (
    <div className="pb-20 font-body">
      {/* 1. Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <span className="eyebrow-pill">
            <Leaf className="text-[#2D5A27]" />
            Open-source AI outdoor platform
          </span>

          <h1 className="mt-7 text-[2.6rem] leading-[1.04] sm:text-6xl font-extrabold tracking-tight text-[#1E2A1A]">
            Less scrolling.
            <br />
            <span className="text-[#2D5A27]">More exploring.</span>
          </h1>

          <p className="lede mt-6 max-w-xl">
            Turn free minutes into real-world adventures. Touch Grass turns your available time into
            a personalized outdoor mission you can print and take outside — phone-free.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/planner" className="btn-nature-primary text-base py-3.5 px-7">
              <Sparkles className="w-4.5 h-4.5 text-emerald-300" />
              <span>Start an Adventure</span>
            </Link>
            <Link to="/missions" className="btn-nature-secondary text-base py-3.5 px-7">
              <Target className="w-4.5 h-4.5 text-[#2D5A27]" />
              <span>Browse Nature Missions</span>
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-2.5 text-[13px] font-medium text-[#4C5249]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" /> Screen-free, real-world focus
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2D5A27]" /> Privacy-first local storage
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#2D5A27]" /> Transparent open-source AI
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Preview of Adventure Planner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="nature-panel overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#1E2A1A]/10 flex flex-col gap-6">
            <span className="eyebrow">
              <Sparkles /> Adventure planner
            </span>
            <h2 className="text-2xl sm:text-[1.75rem] font-bold leading-snug text-[#1E2A1A]">
              Generate a personalized outdoor plan in seconds.
            </h2>
            <p className="prose-nature">
              Tell the open-source engine how much time you have and what you feel like doing.
              You get a structured, printable mission card, ready in one tap.
            </p>

            <ul className="space-y-2.5 text-sm text-[#4C5249]">
              {[
                'Step-by-step outdoor missions',
                'Nature observation tasks',
                'Required gear checklist',
                'Clear real-world completion goal'
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-2 flex items-center gap-2.5 text-[13px] text-[#4C5249]">
              <span className="p-1.5 rounded-lg bg-[#E9F0E4] text-[#2D5A27]">
                <Printer className="w-4 h-4" />
              </span>
              Printable or TXT download — so you can leave your phone inside.
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#FAF6EE]/70">
            <form onSubmit={handleQuickPlannerLaunch} className="space-y-5">
              <div>
                <label className="field-label" htmlFor="lp-time">Available time</label>
                <select
                  id="lp-time"
                  value={previewTime}
                  onChange={(e) => setPreviewTime(e.target.value)}
                  className="nature-input"
                >
                  <option value="15 minutes">15 Minutes Quick Reset</option>
                  <option value="30 minutes">30 Minutes Micro Exploration</option>
                  <option value="45 minutes">45 Minutes Deep Nature Walk</option>
                  <option value="60 minutes">60 Minutes Full Expedition</option>
                </select>
              </div>

              <div>
                <label className="field-label" htmlFor="lp-activity">Preferred activity</label>
                <select
                  id="lp-activity"
                  value={previewActivity}
                  onChange={(e) => setPreviewActivity(e.target.value)}
                  className="nature-input"
                >
                  <option value="Nature Walk">Nature Observation Walk</option>
                  <option value="Bird Watching">Bird &amp; Wildlife Spotting</option>
                  <option value="Micro Gardening">Balcony / Micro Gardening</option>
                  <option value="Photography">Nature Texture Photography</option>
                </select>
              </div>

              <p className="pt-1 text-xs text-[#7C8377]">
                Your choices are sent straight to the full planner — nothing is generated until you confirm there.
              </p>

              <button type="submit" className="btn-nature-primary w-full text-sm py-3">
                <span>Open the AI Adventure Planner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Featured Outdoor Challenges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="eyebrow">
              <Target /> Real-world missions
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#1E2A1A]">
              Featured Nature Challenges
            </h2>
          </div>
          <Link to="/missions" className="btn-nature-quiet text-sm shrink-0">
            <span>View all missions ({INITIAL_MISSIONS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-2">
          {INITIAL_MISSIONS.slice(0, 4).map((mission, i) => (
            <Link
              key={mission.id}
              to="/missions"
              className="group block border-t border-[#1E2A1A]/10 pt-6 pb-7 pr-2"
            >
              <div className="flex gap-5">
                <span className="font-display text-3xl font-bold leading-none text-[#C3CDB8] tabular-nums w-10 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-[#7C8377]">
                    <span className="uppercase tracking-wider text-[#2D5A27]">{mission.category}</span>
                    <span>·</span>
                    <span>{mission.estimatedTime}</span>
                    <span>·</span>
                    <span>{mission.difficulty}</span>
                  </div>
                  <h3 className="font-bold text-[17px] text-[#1E2A1A] group-hover:text-[#2D5A27] transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-sm text-[#4C5249] leading-relaxed line-clamp-2">
                    {mission.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#2D5A27] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    Start this challenge <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. How the Platform Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#1D3B19] rounded-[1.75rem] px-6 sm:px-10 lg:px-14 py-12 sm:py-16 text-white overflow-hidden">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dark">Field manual</span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Plan on the screen.
              <br />
              <span className="text-[#A3C391]">Experience it in the real world.</span>
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-x-10 gap-y-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`${i > 0 ? 'border-t md:border-t-0 md:border-l border-emerald-900/70 md:pl-10 pt-8 md:pt-0' : ''}`}
              >
                <span className="font-display text-xs font-bold tracking-[0.22em] text-[#E8A87C]">
                  STEP 0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/85">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Open-Source AI & Privacy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow">
            <Cpu /> Open innovation
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#1E2A1A]">
            Why open-source AI matters outdoors
          </h2>
          <p className="prose-nature mt-4">
            AI should help you spend <em>less</em> time on screens, not trap you in an engagement loop.
            The architecture here respects your privacy and autonomy by design.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-x-10 gap-y-9">
          {principles.map((p) => (
            <div key={p.title} className="border-t-2 border-[#2D5A27] pt-5">
              <div className="w-9 h-9 rounded-lg bg-white border border-[#1E2A1A]/10 flex items-center justify-center text-[#2D5A27]">
                <p.icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="mt-4 font-bold text-[17px] text-[#1E2A1A]">{p.title}</h3>
              <p className="mt-2 text-sm text-[#4C5249] leading-relaxed">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Nature Journal Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="nature-panel overflow-hidden grid md:grid-cols-2">
          <div className="p-8 sm:p-12 flex flex-col gap-5 border-b md:border-b-0 md:border-r border-[#1E2A1A]/10">
            <span className="eyebrow">
              <BookOpen /> Personal nature journal
            </span>
            <h2 className="text-2xl sm:text-[1.75rem] font-bold leading-snug text-[#1E2A1A]">
              Record observations &amp; discoveries — on your device only.
            </h2>
            <p className="prose-nature">
              Log leaf shapes, bird calls, weather, and mood. Your list, your streaks, your photos —
              everything stays in your browser and can be exported as JSON at any time.
            </p>
            <div className="mt-auto pt-2">
              <Link to="/journal" className="btn-nature-primary py-2.5 px-5 text-sm">
                <span>Open My Nature Journal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="p-8 sm:p-12 bg-[#FAF6EE]/50 flex items-center">
            <div className="relative bg-white border border-[#1E2A1A]/10 rounded-xl p-6 shadow-[var(--shadow-card)] w-full">
              <span className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-sm bg-[#C05B33]/50" aria-hidden="true" />
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#7C8377]">
                <span>Sample field note</span>
                <span>2 days ago</span>
              </div>
              <h4 className="mt-3 font-bold text-[17px] text-[#1E2A1A]">Morning Oak Grove Walk</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#4C5249] line-clamp-3">
                Observed a pair of Northern Cardinals nesting in an oak canopy. Collected 4 distinct
                fallen leaf specimens. Head feels clear and grounded!
              </p>
              <div className="mt-4 pt-3 border-t border-[#1E2A1A]/10 flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#2D5A27]">Mood &#183; Peaceful</span>
                <span className="text-[#7C8377]">Pine Hill Reserve</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 text-center">
        <div className="border-t-2 border-[#2D5A27] pt-10 sm:pt-12">
          <span className="eyebrow-pill mx-auto">
            <Leaf className="text-[#2D5A27]" /> Start outdoors
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-[#1E2A1A]">
            Ready to disconnect and touch grass?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4C5249]">
            Start your first 15-minute nature mission right now — no account, no cost, no lock-in.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/planner" className="btn-nature-primary text-sm py-3 px-6">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Generate First Adventure</span>
            </Link>
          </div>
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