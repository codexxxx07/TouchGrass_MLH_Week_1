import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldAlert, Heart, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1D3B19] text-[#E4ECE2] pt-12 pb-8 border-t border-[#2D5A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Touch Grass 🌿</span>
            </div>
            <p className="text-xs text-[#C4D3BF] leading-relaxed">
              Open-source AI platform empowering people to step away from screens and explore real-world nature through personalized missions.
            </p>
            <p className="text-[11px] font-semibold text-emerald-400 italic">
              "Plan on the screen. Experience it in the real world."
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Platform Routes</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/explore" className="hover:text-emerald-300 transition-colors">Discover Outdoor Adventures</Link></li>
              <li><Link to="/planner" className="hover:text-emerald-300 transition-colors">AI Adventure Planner</Link></li>
              <li><Link to="/missions" className="hover:text-emerald-300 transition-colors">Nature Missions & Challenges</Link></li>
              <li><Link to="/journal" className="hover:text-emerald-300 transition-colors">Personal Nature Journal</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-300 transition-colors">Activity Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3: Open Source AI Principles */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Open-Source AI & Privacy</h4>
            <ul className="space-y-2 text-xs text-[#C4D3BF]">
              <li>🔒 <strong>Local Privacy:</strong> Journal stored strictly in your browser.</li>
              <li>🔍 <strong>Transparent Inference:</strong> Local Ollama or deterministic fallback.</li>
              <li>🌱 <strong>Offline First:</strong> Basic missions & saved plans work offline.</li>
              <li><Link to="/about" className="text-emerald-300 underline font-medium">Read Open AI Manifesto &rarr;</Link></li>
            </ul>
          </div>

          {/* Col 4: Outdoor Safety & Leave No Trace */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Safety & Ethics Notice</span>
            </h4>
            <p className="text-[11px] text-[#C4D3BF] leading-relaxed mb-2">
              Always follow Leave No Trace principles. Respect wildlife from a distance. Check weather reports before embarking on hikes.
            </p>
            <div className="p-2.5 bg-black/20 rounded-lg text-[10px] text-amber-200 border border-amber-500/20">
              ⚠️ <strong>Foraging Disclaimer:</strong> Never eat wild plants or mushrooms identified solely by AI. Consult certified botanists.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9BB295]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Touch Grass Open Source Project. Released under MIT License.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px]">
              Built with <Heart className="w-3 h-3 text-red-400 fill-current inline" /> for outdoor exploration
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
