import React, { useState } from 'react';
import { X, Printer, Download, Check, Copy, ShieldAlert, Sprout } from 'lucide-react';

export default function PrintableAdventureModal({ adventure, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !adventure) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const textContent = `
==================================================
TOUCH GRASS OUTDOOR ADVENTURE PLAN
"Plan on the Screen. Experience in the Real World."
==================================================

Title: ${adventure.title}
Estimated Duration: ${adventure.estimatedDuration || adventure.duration}
Difficulty: ${adventure.difficulty}
Goal: ${adventure.completionGoal || 'Complete outdoor exploration screen-free.'}

--------------------------------------------------
DESCRIPTION
--------------------------------------------------
${adventure.shortDescription || adventure.description}

--------------------------------------------------
REQUIRED ITEMS
--------------------------------------------------
${(adventure.requiredItems || []).map(i => `[ ] ${i}`).join('\n')}

--------------------------------------------------
STEP-BY-STEP ACTIVITIES
--------------------------------------------------
${(adventure.activities || []).map((a, idx) => `${idx + 1}. ${a}`).join('\n\n')}

--------------------------------------------------
NATURE OBSERVATION CHALLENGES
--------------------------------------------------
${(adventure.natureChallenges || []).map(c => `• ${c}`).join('\n')}

--------------------------------------------------
SAFETY RECOMMENDATIONS
--------------------------------------------------
${(adventure.safetyTips || []).map(s => `⚠️ ${s}`).join('\n')}

==================================================
Logged via Touch Grass (Open-Source AI Platform)
Date: ${new Date().toLocaleDateString()}
==================================================
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${adventure.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_adventure_plan.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const handleCopyText = () => {
    const summary = `${adventure.title} (${adventure.estimatedDuration || adventure.duration}) - ${adventure.shortDescription || adventure.description}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF6EE] border border-[#2D5A27]/15 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">

        {/* Header Controls (Hidden when printing via CSS @media print) */}
        <div className="no-print flex items-center justify-between gap-3 pb-4 border-b border-[#1E2A1A]/10 px-6 pt-5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 bg-[#2D5A27] text-white rounded-lg shrink-0">
              <Printer className="w-4.5 h-4.5 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#1E2A1A] truncate">Printable adventure card</h2>
              <p className="text-xs text-[#7C8377]">Print or save as TXT to leave your phone behind</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 bg-[#EDE9DE] hover:bg-[#E4E0D4] text-[#4C5249] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy summary'}</span>
            </button>
            <button
              onClick={handleDownloadTxt}
              className="px-3 py-1.5 bg-[#E9F0E4] hover:bg-[#d3e0ce] text-[#23421C] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download TXT</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-nature-primary py-1.5 px-3.5 text-xs"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7C8377] hover:text-[#1E2A1A] rounded-full hover:bg-[#EDE9DE] transition-colors"
              aria-label="Close printable card"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div className="printable-adventure bg-white p-6 my-4 mx-6 rounded-xl border border-[#1E2A1A]/15 shadow-sm overflow-y-auto flex-1 font-body text-stone-900">

          <div className="border-b border-[#2D5A27]/20 pb-4 mb-4 flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sprout className="w-5 h-5 text-[#2D5A27]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">Touch Grass Adventure</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#1E2A1A]">{adventure.title}</h1>
              <p className="text-xs text-[#7C8377] italic mt-1">{adventure.shortDescription || adventure.description}</p>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-block bg-[#E9F0E4] text-[#23421C] font-bold text-xs px-3 py-1 rounded-full border border-[#2D5A27]/30">
                {adventure.estimatedDuration || adventure.duration}
              </span>
              <span className="block text-[11px] text-[#7C8377] mt-1.5 font-semibold">
                Difficulty: {adventure.difficulty}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Required Items */}
            <div className="md:col-span-1 bg-[#FAF6EE] p-4 rounded-xl border border-[#1E2A1A]/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1D3B19] mb-2">Gear needed</h3>
              <ul className="space-y-1.5 text-xs text-[#3A4038]">
                {(adventure.requiredItems || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5 accent-[#2D5A27]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-[#1E2A1A]/15">
                <h4 className="text-[11px] font-bold text-[#1D3B19] mb-1">Real-world goal</h4>
                <p className="text-xs text-[#7C8377] italic">
                  &ldquo;{adventure.completionGoal || 'Complete your outdoor mission screen-free.'}&rdquo;
                </p>
              </div>
            </div>

            {/* Step-by-Step Activities */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1D3B19] mb-2">Outdoor mission steps</h3>
                <ol className="space-y-2.5 text-xs text-[#3A4038]">
                  {(adventure.activities || []).map((step, idx) => (
                    <li key={idx} className="p-2.5 bg-[#FAF6EE] rounded-lg border border-[#1E2A1A]/10 leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {adventure.natureChallenges && adventure.natureChallenges.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D5A27] mb-1.5">
                    Nature observation challenges
                  </h3>
                  <ul className="space-y-1 text-xs text-[#4C5249] list-disc pl-4">
                    {adventure.natureChallenges.map((challenge, idx) => (
                      <li key={idx}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}

              {adventure.safetyTips && adventure.safetyTips.length > 0 && (
                <div className="bg-[#FBF2E7] p-3 rounded-lg border border-[#C89A5A]/40 text-xs text-[#6B5636]">
                  <h4 className="font-bold flex items-center gap-1.5 mb-1 text-[#7A4E12]">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-700" /> Outdoor safety reminders
                  </h4>
                  <ul className="space-y-0.5 text-[11px] list-disc pl-4 text-[#6B5636]">
                    {adventure.safetyTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          <div className="mt-6 pt-3 border-t border-[#1E2A1A]/10 flex items-center justify-between text-[10px] text-[#9AA093]">
            <span>Logged via Touch Grass (Open-Source AI Platform)</span>
            <span>Date: {new Date().toLocaleDateString()}</span>
          </div>

        </div>

        {/* Modal Footer Note */}
        <div className="no-print pt-2 pb-5 px-6 text-center text-xs text-[#7C8377]">
          <em>Tip: fold this printout into your pocket and switch your phone off before leaving the door.</em>
        </div>

      </div>
    </div>
  );
}