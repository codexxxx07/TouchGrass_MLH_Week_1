import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SafetyBanner from './components/SafetyBanner';
import AiConfigModal from './components/AiConfigModal';
import AiNatureGuideDrawer from './components/AiNatureGuideDrawer';

import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import PlannerPage from './pages/PlannerPage';
import MissionsPage from './pages/MissionsPage';
import JournalPage from './pages/JournalPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [isAiConfigOpen, setIsAiConfigOpen] = useState(false);
  const [isNatureGuideOpen, setIsNatureGuideOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F7F4EB] text-[#1E2A1A] selection:bg-[#4E7C41] selection:text-white">
        
        {/* Top Safety Banner */}
        <SafetyBanner />

        {/* Navigation Bar */}
        <Navbar
          onOpenAiConfig={() => setIsAiConfigOpen(true)}
          onOpenNatureGuide={() => setIsNatureGuideOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<LandingPage onOpenNatureGuide={() => setIsNatureGuideOpen(true)} />}
            />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Modals & Drawers */}
        <AiConfigModal
          isOpen={isAiConfigOpen}
          onClose={() => setIsAiConfigOpen(false)}
        />

        <AiNatureGuideDrawer
          isOpen={isNatureGuideOpen}
          onClose={() => setIsNatureGuideOpen(false)}
        />

      </div>
    </Router>
  );
}
