import React, { useState } from 'react';
import { ShieldAlert, Compass, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';

export default function SafetyBanner() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#FAF0E6] border-b border-amber-900/15 text-stone-800 text-xs py-2 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="font-semibold text-stone-900">
            Outdoor Exploration Safety Reminder:
          </span>
          <span className="hidden md:inline text-stone-700">
            Respect wildlife from a distance, check local weather, and stay on designated paths.
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 font-semibold text-[#2D5A27] hover:underline shrink-0"
        >
          <span>{isExpanded ? 'Hide Safety Details' : 'View Safety Rules'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-amber-900/10 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
          <div className="bg-white/70 p-2.5 rounded-lg border border-amber-200">
            <h5 className="font-bold text-amber-900 flex items-center gap-1 mb-1">
              <Compass className="w-3.5 h-3.5" /> Wildlife & Trail Respect
            </h5>
            <p className="text-[11px] text-stone-600 leading-snug">
              Never approach, feed, or corner wild animals or birds. Keep at least 15 feet distance. Leave no trash behind.
            </p>
          </div>

          <div className="bg-white/70 p-2.5 rounded-lg border border-amber-200">
            <h5 className="font-bold text-amber-900 flex items-center gap-1 mb-1">
              <AlertCircle className="w-3.5 h-3.5" /> Foraging Warning
            </h5>
            <p className="text-[11px] text-stone-600 leading-snug">
              Do not consume wild mushrooms, berries, or plants identified solely by AI. Edible plants have toxic lookalikes!
            </p>
          </div>

          <div className="bg-white/70 p-2.5 rounded-lg border border-amber-200">
            <h5 className="font-bold text-amber-900 flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Digital Balance
            </h5>
            <p className="text-[11px] text-stone-600 leading-snug">
              Plan your route on screen, print or download your plan, then put your phone away to experience nature with full senses.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
