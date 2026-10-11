import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Search, Printer, Sparkles, Clock, Check, Bookmark } from 'lucide-react';
import { INITIAL_ADVENTURES } from '../data/initialAdventures';
import { saveAdventure, getSavedAdventures } from '../services/storageService';
import PrintableAdventureModal from '../components/PrintableAdventureModal';

export default function ExplorePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedAdventure, setSelectedAdventure] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [savedIds, setSavedIds] = useState(() => getSavedAdventures().map(a => a.id));

  const categories = ['All', 'Mindful Exploration', 'Wildlife & Birds', 'Micro-Gardening', 'Outdoor Walking'];
  const difficulties = ['All', 'Beginner', 'Intermediate'];

  const filteredAdventures = INITIAL_ADVENTURES.filter((adv) => {
    const matchesSearch = adv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          adv.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || adv.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || adv.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  const handleSaveToggle = (adv) => {
    saveAdventure(adv);
    setSavedIds(getSavedAdventures().map(a => a.id));
  };

  const handlePrintClick = (adv) => {
    setSelectedAdventure(adv);
    setIsPrintModalOpen(true);
  };

  const handleCustomizeInPlanner = (adv) => {
    navigate('/planner', { state: { prefill: adv } });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10 font-body text-[#1E2A1A]">

      {/* Header */}
      <div className="max-w-2xl">
        <span className="eyebrow">
          <Compass /> Outdoor activity discovery
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Discover Real-World Nature Adventures
        </h1>
        <p className="lede mt-4">
          Browse curated outdoor micro-expeditions designed for screen-free exploration. Filter by
          duration, category, or difficulty.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="nature-panel px-4 sm:px-5 py-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA093]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search adventures, birds, leaves..."
              className="nature-input pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#7C8377]">
            {filteredAdventures.length === 0
              ? <span>Nothing matches your filters</span>
              : <span>{filteredAdventures.length} {filteredAdventures.length === 1 ? 'adventure' : 'adventures'}</span>}
          </div>
        </div>

        <div className="grid gap-4 lg:gap-8 lg:grid-cols-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-full lg:w-auto lg:mr-1 text-[11px] font-bold uppercase tracking-wider text-[#7C8377]">Category</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#2D5A27] text-white'
                    : 'bg-[#EDE9DE] text-[#4C5249] hover:bg-[#E4E0D4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-full lg:w-auto lg:mr-1 text-[11px] font-bold uppercase tracking-wider text-[#7C8377]">Difficulty</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[#2D5A27] text-white'
                    : 'bg-[#EDE9DE] text-[#4C5249] hover:bg-[#E4E0D4]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Adventures */}
      {filteredAdventures.length === 0 ? (
        <div className="nature-panel text-center py-14 px-8 space-y-3">
          <Compass className="w-9 h-9 text-[#B5BCAA] mx-auto" />
          <h3 className="font-bold text-lg text-[#1E2A1A]">No adventures found matching your filters</h3>
          <p className="text-sm text-[#7C8377]">Try adjusting your search terms or clearing a category filter.</p>
          <button onClick={resetFilters} className="btn-nature-secondary text-sm py-2 px-5 mt-2">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdventures.map((adv) => {
            const isSaved = savedIds.includes(adv.id);
            return (
              <div key={adv.id} className="nature-card p-6 flex flex-col">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="nature-badge">{adv.category}</span>
                    <span className="text-[11px] font-bold text-[#7C8377] flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#2D5A27]" />
                      {adv.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-[#1E2A1A]">{adv.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4C5249]">{adv.shortDescription}</p>

                  <div className="bg-[#FAF6EE] rounded-lg border border-[#1E2A1A]/10 px-3.5 py-3">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[#1D3B19] block mb-1">
                      Starting place
                    </span>
                    <span className="text-[13px] text-[#4C5249]">{adv.locationSetting}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[#7C8377] block mb-1.5">
                      Gear needed
                    </span>
                    <ul className="space-y-1 text-[13px] text-[#4C5249]">
                      {adv.requiredItems.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2D5A27] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <div className="pt-4 border-t border-[#1E2A1A]/10 flex items-center gap-2">
                    <button
                      onClick={() => handlePrintClick(adv)}
                      className="btn-nature-primary text-[13px] py-2.5 px-3 flex-1"
                    >
                      <Printer className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Print / View Card</span>
                    </button>

                    <button
                      onClick={() => handleSaveToggle(adv)}
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                        isSaved
                          ? 'bg-[#E9F0E4] border-[#2D5A27]/40 text-[#2D5A27]'
                          : 'bg-[#EDE9DE] border-transparent text-[#4C5249] hover:bg-[#E4E0D4]'
                      }`}
                      title={isSaved ? 'Saved in My Adventures' : 'Save Adventure'}
                      aria-label={isSaved ? 'Remove adventure from saved' : 'Save adventure'}
                    >
                      {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={() => handleCustomizeInPlanner(adv)}
                    className="mt-3 w-full text-center text-[13px] text-[#2D5A27] font-semibold hover:underline flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Customize in the AI Planner &rarr;</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Modal */}
      {selectedAdventure && (
        <PrintableAdventureModal
          adventure={selectedAdventure}
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}
    </div>
  );
}