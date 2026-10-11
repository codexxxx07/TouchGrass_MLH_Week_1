import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldAlert, Heart, Lock, Cpu, WifiOff } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1D3B19] text-[#B9C7B2] pt-14 pb-8 border-t border-[#2D5A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

          {/* Brand & Philosophy */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Touch Grass <span className="text-emerald-300">🌿</span>
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[#9FB298] max-w-xs">
              Open-source AI platform empowering people to step away from screens and explore
              real-world nature through personalized missions.
            </p>
            <p className="text-[12px] font-semibold text-emerald-300 italic">
              &ldquo;Plan on the screen. Experience it in the real world.&rdquo;
            </p>
          </div>

          {/* Platform Routes */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><Link to="/explore" className="hover:text-emerald-300 transition-colors">Discover Adventures</Link></li>
              <li><Link to="/planner" className="hover:text-emerald-300 transition-colors">AI Adventure Planner</Link></li>
              <li><Link to="/missions" className="hover:text-emerald-300 transition-colors">Nature Missions</Link></li>
              <li><Link to="/journal" className="hover:text-emerald-300 transition-colors">Nature Journal</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-300 transition-colors">Activity Dashboard</Link></li>
            </ul>
          </div>

          {/* Open Source AI & Privacy */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Open-source AI &amp; privacy</h4>
            <ul className="space-y-2.5 text-[13px] text-[#A9B9A5]">
              <li className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#C7D4C3]">Local privacy</strong> — journal stored only in your browser.</span>
              </li>
              <li className="flex items-start gap-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#C7D4C3]">Transparent inference</strong> — local Ollama or deterministic fallback.</span>
              </li>
              <li className="flex items-start gap-2">
                <WifiOff className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#C7D4C3]">Offline first</strong> — basic missions &amp; plans work offline.</span>
              </li>
              <li className="pt-1">
                <Link to="/about" className="text-emerald-300 underline underline-offset-3 font-medium">
                  Read the open AI manifesto &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Leave No Trace */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Safety &amp; ethics</span>
            </h4>
            <p className="text-[12px] leading-relaxed text-[#9FB298] mb-3">
              Follow Leave No Trace principles. Respect wildlife from a distance, and check weather
              before hiking.
            </p>
            <div className="p-2.5 bg-black/20 rounded-lg text-[11px] text-amber-200 border border-amber-500/20 leading-snug">
              Never eat wild plants or mushrooms identified solely by AI. Consult certified botanists.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8CA385]">
          <span>© {new Date().getFullYear()} Touch Grass Open Source Project. Released under MIT License.</span>
          <span className="flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-red-400 fill-current" /> for outdoor exploration
          </span>
        </div>
      </div>
    </footer>
  );
}