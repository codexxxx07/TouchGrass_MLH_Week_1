import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Cpu, WifiOff, Lock, ShieldAlert, Compass, Sprout } from 'lucide-react';

export default function AboutPage() {
  const principles = [
    {
      icon: Lock,
      title: 'Absolute privacy',
      copy: 'Your journal observations, outdoor stats, and saved plans remain stored exclusively on your device via local browser storage. We do not track, log, or commercialize your personal activity.'
    },
    {
      icon: Cpu,
      title: 'Transparent inference',
      copy: 'Every generated response displays a visible source disclosure badge — so you always know whether it came from your local Ollama server, an open API, or the offline fallback engine.'
    },
    {
      icon: Compass,
      title: 'Provider flexibility',
      copy: 'Swap AI models seamlessly. Configure a local Ollama instance or connect any OpenAI-compatible open-weight endpoint without rewriting application components.'
    },
    {
      icon: Sprout,
      title: 'Universal accessibility',
      copy: 'No mandatory paid API keys or subscription fees. Anyone can explore nature missions and create printable adventure plans using the built-in offline engine.'
    },
    {
      icon: WifiOff,
      title: 'Offline resilience',
      copy: 'Previously generated plans, nature challenges, and personal journal logs remain fully accessible offline after the initial asset load.'
    }
  ];

  const safetyPoints = [
    {
      title: 'Foraging & plant consumption warning',
      copy: 'Never eat wild mushrooms, berries, or plants identified solely by AI models or photos. Many edible plants have toxic lookalikes — always consult certified botanists before consuming anything found in nature.'
    },
    {
      title: 'Respect wildlife distance',
      copy: 'Never approach, feed, touch, or corner wild animals or birds. Keep at least 15 feet of distance, and use binoculars or camera zoom for close observation.'
    },
    {
      title: 'Leave no trace & stay on trail',
      copy: 'Stay on marked trails to protect delicate soil biomes and prevent erosion. Carry out all trash and leave natural items — flowers, nests, specimens — where you find them.'
    },
    {
      title: 'Weather & location awareness',
      copy: 'Check local weather forecasts before heading out. Stay out of restricted areas and let someone know your route when exploring secluded trails.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16 font-body text-[#1E2A1A]">

      {/* Header */}
      <div className="max-w-3xl">
        <span className="eyebrow">
          <Info /> Project mission &amp; open innovation
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">
          Using AI to help people <span className="text-[#2D5A27]">touch grass</span>
        </h1>
        <p className="lede mt-5">
          Touch Grass is an open-source AI platform built on a radical premise: technology should be a
          launchpad that sends you into the real world — not a trap that keeps you behind a screen.
        </p>
      </div>

      {/* Core Principle */}
      <div className="bg-[#1D3B19] rounded-[1.5rem] px-6 sm:px-10 py-10 sm:py-14 text-center">
        <span className="eyebrow eyebrow-dark">Core principle</span>
        <blockquote className="mt-5 font-display text-2xl sm:text-4xl font-bold leading-snug text-emerald-200">
          &ldquo;Plan on the screen. Experience it in the real world.&rdquo;
        </blockquote>
        <p className="mt-5 text-sm leading-relaxed text-emerald-100/85 max-w-2xl mx-auto">
          Every feature — from the AI Nature Guide to printable adventure cards — is engineered to
          minimize digital interaction and maximize real-world sensory observation.
        </p>
      </div>

      {/* Open Innovation Principles */}
      <div>
        <div className="max-w-2xl mb-4">
          <span className="eyebrow">
            <Cpu /> Open innovation principles
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold">Why open-source AI matters</h2>
        </div>

        <div>
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 border-t border-[#1E2A1A]/10"
            >
              <div className="md:col-span-3 flex items-center gap-3">
                <span className="font-display text-xl font-bold text-[#C3CDB8] tabular-nums w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="w-10 h-10 rounded-lg bg-[#E9F0E4] text-[#2D5A27] flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-lg text-[#1E2A1A]">{p.title}</h3>
              </div>
              <p className="md:col-span-9 text-sm leading-relaxed text-[#4C5249]">{p.copy}</p>
            </div>
          ))}
          <div className="border-t border-[#1E2A1A]/10" />
        </div>
      </div>

      {/* Safety & Responsible AI */}
      <div className="bg-[#FBF2E7] border border-[#C89A5A]/30 rounded-[1.5rem] p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-[#F5E3C8] text-[#9C6B1F]">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#7A4E12]">
            Outdoor safety &amp; ethics guidelines
          </h2>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {safetyPoints.map((s) => (
            <div key={s.title} className="border-t-2 border-[#D9B071] pt-4">
              <h4 className="font-bold text-[15px] text-[#7A4E12]">{s.title}</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6B5636]">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Licensing & Attributes */}
      <div className="nature-panel p-6 sm:p-8 space-y-3">
        <h3 className="font-bold text-base text-[#1E2A1A]">Open source licenses &amp; attributions</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#4C5249]">
          <li><strong>Touch Grass Platform:</strong> Licensed under the open MIT License.</li>
          <li><strong>Open Weight Models:</strong> Supports Llama 3.2 (Meta Open Model License) via an Ollama local server.</li>
          <li><strong>Iconography:</strong> Lucide Icons (ISC License).</li>
          <li><strong>UI Framework:</strong> React 19 &amp; Tailwind CSS v4.</li>
        </ul>
        <p className="text-sm text-[#7C8377] pt-2 border-t border-[#1E2A1A]/10">
          Interested in contributing? Visit the project on GitHub and read more about our approach on
          the <Link to="/" className="text-[#2D5A27] font-semibold hover:underline">landing page</Link>.
        </p>
      </div>

    </div>
  );
}