import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, Target, BookOpen, LayoutDashboard, Info, Menu, X, Sprout } from 'lucide-react';
import AiStatusBadge from './AiStatusBadge';

export default function Navbar({ onOpenAiConfig, onOpenNatureGuide }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Sprout },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/planner', label: 'Planner', icon: Sparkles },
    { path: '/missions', label: 'Missions', icon: Target },
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/about', label: 'About', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close the mobile menu on Escape for keyboard users
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF6EE]/90 backdrop-blur-md border-b border-[#2D5A27]/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A27]/40"
            aria-label="Touch Grass home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#1D3B19] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-base sm:text-xl text-[#1C2818] tracking-tight group-hover:text-[#2D5A27] transition-colors flex items-center gap-1 whitespace-nowrap">
                Touch Grass <span className="text-emerald-700 text-sm sm:text-lg">🌿</span>
              </span>
              <span className="hidden sm:block text-[10px] text-stone-600 tracking-wider font-semibold uppercase -mt-1 whitespace-nowrap">
                AI Outdoor Exploration
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 min-w-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={`px-2 xl:px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A27]/40 ${
                    active
                      ? 'bg-[#2D5A27] text-white shadow-sm'
                      : 'text-[#1C2818]/80 hover:bg-[#E4ECE2] hover:text-[#1D3B19]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-200' : 'text-[#2D5A27]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section: AI Badge + Nature Guide Trigger (desktop / laptop) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <AiStatusBadge onOpenConfig={onOpenAiConfig} />

            <button
              type="button"
              onClick={onOpenNatureGuide}
              className="btn-nature-primary text-xs py-2 px-2.5 xl:px-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A27]/50"
              aria-label="Open AI Nature Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span className="hidden xl:inline">AI Nature Guide</span>
            </button>
          </div>

          {/* Mobile / Tablet Menu Controls */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            <AiStatusBadge onOpenConfig={onOpenAiConfig} />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="p-2 text-[#1C2818] hover:bg-[#E4ECE2] rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A27]/40"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-[#FAF6EE] border-b border-[#2D5A27]/15 px-3 sm:px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#2D5A27] text-white'
                    : 'text-[#1C2818] hover:bg-[#E4ECE2]'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-emerald-200' : 'text-[#2D5A27]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-stone-200">
            <button
              type="button"
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
