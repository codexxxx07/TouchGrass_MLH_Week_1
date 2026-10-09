import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, Target, BookOpen, LayoutDashboard, Info, Menu, X, Sprout } from 'lucide-react';
import AiStatusBadge from './AiStatusBadge';

export default function Navbar({ onOpenAiConfig, onOpenNatureGuide }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Sprout },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/planner', label: 'AI Planner', icon: Sparkles },
    { path: '/missions', label: 'Missions', icon: Target },
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/about', label: 'About & Open AI', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF6EE]/90 backdrop-blur-md border-b border-[#2D5A27]/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#1D3B19] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-[#1C2818] tracking-tight group-hover:text-[#2D5A27] transition-colors flex items-center gap-1">
                Touch Grass <span className="text-emerald-700 text-lg">🌿</span>
              </span>
              <span className="hidden sm:block text-[10px] text-stone-600 tracking-wider font-semibold uppercase -mt-1">
                AI Outdoor Exploration
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    active
                      ? 'bg-[#2D5A27] text-white shadow-sm'
                      : 'text-[#1C2818]/80 hover:bg-[#E4ECE2] hover:text-[#1D3B19]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-200' : 'text-[#2D5A27]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section: AI Badge + Nature Guide Trigger */}
          <div className="hidden sm:flex items-center gap-3">
            <AiStatusBadge onOpenConfig={onOpenAiConfig} />

            <button
              onClick={onOpenNatureGuide}
              className="btn-nature-primary text-xs py-2 px-3.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Nature Guide</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <AiStatusBadge onOpenConfig={onOpenAiConfig} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1C2818] hover:bg-[#E4ECE2] rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6EE] border-b border-[#2D5A27]/15 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#2D5A27] text-white'
                    : 'text-[#1C2818] hover:bg-[#E4ECE2]'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-emerald-200' : 'text-[#2D5A27]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenNatureGuide();
              }}
              className="btn-nature-primary text-xs py-2.5 w-full"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Ask AI Nature Guide</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
