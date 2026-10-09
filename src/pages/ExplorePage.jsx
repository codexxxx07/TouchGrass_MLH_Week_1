import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Search, Filter, Printer, Sparkles, Clock, Footprints, ShieldAlert, ArrowRight, Bookmark, Check } from 'lucide-react';
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-body text-[#1C2818]">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-[#E4ECE2] text-[#1D3B19] text-xs font-bold px-3 py-1 rounded-full">
          <Compass className="w-4 h-4 text-[#2D5A27]" />
          <span>Outdoor Activity Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C2818]">
          Discover Real-World Nature Adventures
        </h1>
        <p className="text-stone-600 text-sm max-w-2xl">
          Browse curated outdoor micro-expeditions designed for screen-free exploration. Filter by duration, category, or difficulty level.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search adventures, birds, leaves..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#2D5A27]"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2D5A27] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Grid of Adventures */}
      {filteredAdventures.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <Compass className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="font-bold text-stone-800 text-lg">No adventures found matching your filter</h3>
          <p className="text-xs text-stone-500">Try adjusting your search terms or clearing category filters.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
            className="btn-nature-secondary text-xs py-2 px-4 mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdventures.map((adv) => {
            const isSaved = savedIds.includes(adv.id);
            return (
              <div key={adv.id} className="nature-card p-6 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="nature-badge text-[11px]">{adv.category}</span>
                    <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md">
                      ⏱️ {adv.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1C2818] leading-snug">{adv.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{adv.shortDescription}</p>

                  <div className="bg-[#FAF6EE] p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                    <span className="font-semibold text-[#1D3B19] block text-[11px]">📍 Setting & Location:</span>
                    <span className="text-stone-700 text-[11px] block">{adv.locationSetting}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Required Items:
                    </span>
                    <ul className="text-[11px] text-stone-600 space-y-0.5 list-disc pl-4">
                      {adv.requiredItems.slice(0, 3).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePrintClick(adv)}
                      className="btn-nature-primary text-xs py-2 px-3 flex-1"
                    >
                      <Printer className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Print / View Card</span>
                    </button>

                    <button
                      onClick={() => handleSaveToggle(adv)}
                      className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                        isSaved ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
                      }`}
                      title={isSaved ? 'Saved in My Adventures' : 'Save Adventure'}
                    >
                      {isSaved ? <Check className="w-4 h-4 text-emerald-700" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={() => handleCustomizeInPlanner(adv)}
                    className="w-full text-center text-xs text-[#2D5A27] font-semibold hover:underline flex items-center justify-center gap-1 py-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Customize in AI Planner &rarr;</span>
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
