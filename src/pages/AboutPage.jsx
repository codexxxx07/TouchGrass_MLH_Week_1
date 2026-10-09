import React from 'react';
import { Link } from 'react-router-dom';
import { Info, ShieldCheck, Cpu, WifiOff, Lock, Heart, ShieldAlert, Compass, Sprout, Github, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-body text-[#1C2818]">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 bg-[#E4ECE2] text-[#1D3B19] text-xs font-bold px-3 py-1 rounded-full">
          <Info className="w-4 h-4 text-[#2D5A27]" />
          <span>Project Mission & Open Innovation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C2818]">
          Using AI to Help People Touch Grass 🌿
        </h1>
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          Touch Grass is an open-source AI platform designed around a radical premise: Technology should serve as a launchpad to send you into the real world, not keep you trapped behind a screen.
        </p>
      </div>

      {/* Core Principle Callout */}
      <div className="bg-gradient-to-r from-[#2D5A27] to-[#1D3B19] text-white p-8 rounded-3xl shadow-xl text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
          "Plan on the screen. Experience it in the real world."
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto">
          Every feature—from our AI Nature Guide to printable adventure cards—is engineered to minimize digital interaction and maximize real-world sensory observation.
        </p>
      </div>

      {/* 5 Open Innovation Benefits */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-[#1C2818]">Why Open-Source AI Matters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="nature-card p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2D5A27] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">1. Absolute Privacy</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your journal observations, date history, and outdoor stats remain stored exclusively on your device via local browser storage. We do not track, log, or commercialize your personal activity.
            </p>
          </div>

          <div className="nature-card p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">2. Transparent Inference</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every single response generated displays a visible source disclosure badge. You always know whether a response comes from your local Ollama server, an open API, or the offline fallback engine.
            </p>
          </div>

          <div className="nature-card p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">3. Provider Flexibility</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Swap out AI models seamlessly. Configure a local Ollama instance (Llama 3.2, Phi-3, Mistral) or connect custom OpenAI-compatible open-weight endpoints without rewriting application components.
            </p>
          </div>

          <div className="nature-card p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2D5A27] flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">4. Universal Accessibility</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              No mandatory paid API keys or subscription fees required. Anyone can explore nature missions and create printable adventure plans using our built-in offline engine.
            </p>
          </div>

          <div className="nature-card p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">5. Offline Resilience</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Previously generated adventure plans, nature challenges, and personal journal logs remain completely accessible offline after initial application asset caching.
            </p>
          </div>

        </div>
      </div>

      {/* Safety & Responsible AI Section */}
      <div className="bg-[#FAF0E6] p-8 rounded-3xl border border-amber-900/15 space-y-6">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-amber-800" />
          <h2 className="text-2xl font-extrabold text-amber-950">Outdoor Safety & Ethics Guidelines</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-800 leading-relaxed">
          
          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 space-y-2">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              ⚠️ Foraging & Plant Consumption Warning
            </h4>
            <p>
              <strong>NEVER eat wild mushrooms, berries, or plants identified solely by AI models or photos.</strong> Many edible plants have toxic lookalikes. Always consult certified botanists before consuming anything found in nature.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 space-y-2">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              🦉 Respect Wildlife Distance
            </h4>
            <p>
              Never approach, feed, touch, or corner wild animals or birds. Keep at least 15 feet distance. Use binoculars or camera zoom for close observation.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 space-y-2">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              🏞️ Leave No Trace & Stay on Trail
            </h4>
            <p>
              Stay on marked trails to protect delicate soil biomes and prevent plant erosion. Carry out all trash and leave natural items (flowers, nests) where you find them.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 space-y-2">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              🌤️ Weather & Location Awareness
            </h4>
            <p>
              Always inspect local weather forecasts before embarking on hikes. Stay out of restricted areas and inform someone of your route if exploring secluded trails.
            </p>
          </div>

        </div>
      </div>

      {/* Licensing & Third Party Attribution */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 text-xs text-stone-600">
        <h3 className="font-bold text-stone-900 text-sm">Open Source Licenses & Attributions</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Touch Grass Platform:</strong> Licensed under the open MIT License.</li>
          <li><strong>Open Weight Models:</strong> Supports Llama 3.2 (Meta Open Model License) via Ollama local server.</li>
          <li><strong>Iconography:</strong> Lucide Icons (ISC License).</li>
          <li><strong>UI Framework:</strong> React 19 & Tailwind CSS v4.</li>
        </ul>
      </div>

    </div>
  );
}
