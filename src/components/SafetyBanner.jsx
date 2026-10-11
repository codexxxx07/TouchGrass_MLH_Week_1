import React, { useState } from 'react';
import { ShieldAlert, Compass, ChevronDown, ChevronUp, AlertCircle, Leaf } from 'lucide-react';

export default function SafetyBanner() {
  const [isExpanded, setIsExpanded] = useState(false);

  const items = [
    {
      icon: Compass,
      title: 'Wildlife & trail respect',
      copy: 'Never approach, feed, or corner wild animals or birds. Keep at least 15 feet of distance and leave no trash behind.'
    },
    {
      icon: AlertCircle,
      title: 'Foraging warning',
      copy: 'Do not consume wild mushrooms, berries, or plants identified solely by AI. Edible plants have toxic lookalikes.'
    },
    {
      icon: Leaf,
      title: 'Digital balance',
      copy: 'Plan your route on screen, print it, then put your phone away to experience nature with full senses.'
    }
  ];

  return (
    <div className="bg-[#FBF2E7] border-b border-[#C89A5A]/30 text-[#5A4830] text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-1">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-[#F5E3C8] text-[#9C6B1F] shrink-0">
            <ShieldAlert className="w-3.5 h-3.5" />
          </span>
          <span className="font-semibold text-[#6B5330]">Outdoor exploration safety:</span>
          <span className="hidden md:inline text-[#7A6A4A]">
            Respect wildlife, check the weather, stay on designated paths.
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 font-semibold text-[#2D5A27] hover:underline shrink-0"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Hide safety details' : 'View safety rules'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-[#C89A5A]/25 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 animate-fadeIn pb-1">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-md bg-white/70 border border-[#C89A5A]/30 text-[#9C6B1F] shrink-0">
                <item.icon className="w-3.5 h-3.5" />
              </span>
              <div>
                <h5 className="font-bold text-[#6B5330] mb-0.5">{item.title}</h5>
                <p className="text-[11px] leading-snug text-[#7A6A4A]">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}