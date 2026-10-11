import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Trash2, Download, Image as ImageIcon, Calendar, MapPin, Sun, AlertTriangle, X } from 'lucide-react';
import { getJournalEntries, saveJournalEntry, deleteJournalEntry, exportJournalAsJson, clearAllData } from '../services/storageService';

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // New Entry Form State
  const [title, setTitle] = useState('');
  const [activity, setActivity] = useState('Nature Walk');
  const [location, setLocation] = useState('Local Park');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState('🌿 Refreshed');
  const [weather, setWeather] = useState('Sunny & Clear');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [tagsInput, setTagsInput] = useState('Mindfulness, Flora');

  useEffect(() => {
    setEntries(getJournalEntries());
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please select an image smaller than 2MB for browser localStorage compatibility.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!title.trim() || !notes.trim()) return;

    const tagsArr = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const saved = saveJournalEntry({
      title,
      activity,
      location,
      date,
      notes,
      mood,
      weather,
      photoUrl,
      tags: tagsArr.length > 0 ? tagsArr : ['NatureWalk']
    });

    setEntries(getJournalEntries());
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setNotes('');
    setPhotoUrl(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    const updated = deleteJournalEntry(id);
    setEntries(updated);
    setEntryToDelete(null);
  };

  const handleClearAll = () => {
    clearAllData();
    setEntries([]);
    setShowClearConfirm(false);
  };

  const filteredEntries = entries.filter((e) => {
    const query = searchTerm.toLowerCase();
    return e.title.toLowerCase().includes(query) ||
           e.notes.toLowerCase().includes(query) ||
           (e.location && e.location.toLowerCase().includes(query));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10 font-body text-[#1E2A1A]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <BookOpen /> Personal nature journal
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Your Nature Observation Journal
          </h1>
          <p className="lede mt-4">
            Document leaf discoveries, bird sightings, weather, and mood — 100% stored locally on
            your device for absolute privacy.
          </p>
        </div>

        {!isFormOpen && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-nature-primary text-sm py-2.5 px-4"
            >
              <Plus className="w-4 h-4 text-emerald-300" />
              <span>New Journal Entry</span>
            </button>

            <button
              onClick={exportJournalAsJson}
              className="btn-nature-secondary text-sm py-2.5 px-4"
              title="Export entries as JSON file"
            >
              <Download className="w-4 h-4" />
              <span>Export Entries</span>
            </button>

            {entries.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-2.5 bg-[#F7E4DE] hover:bg-[#F0D6CD] text-[#A33B2C] rounded-lg text-xs font-semibold transition-colors"
                title="Delete all local entries"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* New Journal Entry Form */}
      {isFormOpen && (
        <div className="nature-panel p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#1E2A1A]/10 pb-4">
            <h2 className="text-lg font-bold text-[#1E2A1A] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2D5A27]" /> Write nature entry
            </h2>
            <button
              onClick={resetForm}
              className="p-1.5 text-[#7C8377] hover:text-[#1E2A1A] rounded-lg hover:bg-[#EDE9DE] transition-colors"
              aria-label="Close entry form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveEntry} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="field-label" htmlFor="j-title">Title of observation</label>
                <input
                  id="j-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Morning Oak Tree Canopy Check"
                  className="nature-input"
                />
              </div>

              <div>
                <label className="field-label" htmlFor="j-date">Date</label>
                <input
                  id="j-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="nature-input"
                />
              </div>

              <div>
                <label className="field-label" htmlFor="j-activity">Activity type</label>
                <input
                  id="j-activity"
                  type="text"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="Bird Watching, Leaf Collection, Gardening"
                  className="nature-input"
                />
              </div>

              <div>
                <label className="field-label" htmlFor="j-location">Location</label>
                <input
                  id="j-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Pine Ridge Trail / Balcony"
                  className="nature-input"
                />
              </div>

              <div>
                <label className="field-label" htmlFor="j-mood">Mood / sensory state</label>
                <select
                  id="j-mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="nature-input"
                >
                  <option value="🌿 Refreshed">🌿 Refreshed &amp; Grounded</option>
                  <option value="🕊️ Peaceful">🕊️ Peaceful &amp; Calm</option>
                  <option value="🌱 Energized">🌱 Energized &amp; Inspired</option>
                  <option value="☀️ Joyful">☀️ Joyful &amp; Clear-headed</option>
                </select>
              </div>

              <div>
                <label className="field-label" htmlFor="j-weather">Weather conditions</label>
                <input
                  id="j-weather"
                  type="text"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  placeholder="Crisp & Sunny, 68°F"
                  className="nature-input"
                />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="j-notes">Field notes &amp; observations</label>
              <textarea
                id="j-notes"
                rows={4}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe leaf veins, bird songs, wind textures, or thoughts experienced away from screens..."
                className="nature-input resize-y"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="j-tags">Tags (comma-separated)</label>
              <input
                id="j-tags"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Mindfulness, Flora, Birds"
                className="nature-input"
              />
            </div>

            <div>
              <span className="field-label">Optional photo attachment</span>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg border border-[#1E2A1A]/20 bg-[#FAF6EE] text-sm font-semibold text-[#4C5249] hover:border-[#2D5A27] hover:text-[#2D5A27] cursor-pointer transition-colors">
                  <ImageIcon className="w-4 h-4" />
                  <span>{photoUrl ? 'Replace photo' : 'Choose photo'}</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                <span className="text-xs text-[#7C8377]">Max 2MB, stored locally</span>
                {photoUrl && (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#1E2A1A]/15 shrink-0">
                    <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(null)}
                      className="absolute top-0 right-0 bg-black/60 text-white p-0.5 rounded-bl"
                      aria-label="Remove photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-[#1E2A1A]/10">
              <button type="button" onClick={resetForm} className="px-4 py-2 text-sm font-semibold text-[#7C8377] hover:text-[#1E2A1A] transition-colors">
                Cancel
              </button>
              <button type="submit" className="btn-nature-primary py-2.5 px-5 text-sm">
                Save Journal Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA093]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search journal entries..."
          className="nature-input pl-10"
        />
      </div>

      {/* Entry Cards List */}
      {filteredEntries.length === 0 ? (
        <div className="nature-panel py-16 px-8 text-center space-y-3">
          <BookOpen className="w-9 h-9 text-[#B5BCAA] mx-auto" />
          <h3 className="font-bold text-lg text-[#1E2A1A]">
            {entries.length === 0 ? 'No journal entries yet' : 'No entries match your search'}
          </h3>
          <p className="text-sm text-[#7C8377] max-w-sm mx-auto">
            {entries.length === 0
              ? 'Click New Journal Entry above to record your first outdoor observation.'
              : 'Try a different keyword.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="nature-card p-6 flex flex-col">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="nature-badge">{entry.mood || '🌿 Refreshed'}</span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#7C8377] shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{entry.date}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1E2A1A] mb-1.5">{entry.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-medium text-[#7C8377]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#2D5A27]" /> {entry.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-600" /> {entry.weather}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[#3A4038] whitespace-pre-wrap">
                  {entry.notes}
                </p>

                {entry.photoUrl && (
                  <div className="rounded-xl overflow-hidden border border-[#1E2A1A]/10 max-h-52">
                    <img src={entry.photoUrl} alt={entry.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4">
                <div className="pt-4 border-t border-[#1E2A1A]/10 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {(entry.tags || []).map((tag, idx) => (
                      <span key={idx} className="text-[11px] font-semibold bg-[#EDE9DE] text-[#6C7466] px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setEntryToDelete(entry.id)}
                    className="p-1.5 text-[#9AA093] hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Single Entry Confirmation Modal */}
      {entryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/50 backdrop-blur-sm animate-fadeIn">
          <div className="nature-panel p-6 max-w-sm w-full space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto" />
            <h3 className="font-bold text-lg text-[#1E2A1A]">Delete journal entry?</h3>
            <p className="text-sm text-[#7C8377]">This removes the entry from your local browser storage.</p>
            <div className="flex justify-center gap-3 pt-1">
              <button
                onClick={() => setEntryToDelete(null)}
                className="px-4 py-2 text-sm font-semibold text-[#7C8377] hover:text-[#1E2A1A] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(entryToDelete)}
                className="px-4 py-2 bg-red-700 text-white font-bold text-sm rounded-lg hover:bg-red-800 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Data Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/50 backdrop-blur-sm animate-fadeIn">
          <div className="nature-panel p-6 max-w-sm w-full space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto" />
            <h3 className="font-bold text-lg text-[#1E2A1A]">Clear all local data?</h3>
            <p className="text-sm text-[#7C8377]">
              This resets your journal entries, completed missions, and streak counters.
            </p>
            <div className="flex justify-center gap-3 pt-1">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-sm font-semibold text-[#7C8377] hover:text-[#1E2A1A] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-700 text-white font-bold text-sm rounded-lg hover:bg-red-800 transition-colors"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}