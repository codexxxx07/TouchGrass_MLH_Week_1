import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Trash2, Download, Image as ImageIcon, Calendar, MapPin, Sun, Smile, ShieldCheck, AlertTriangle, Check, X } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-body text-[#1C2818]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#E4ECE2] text-[#1D3B19] text-xs font-bold px-3 py-1 rounded-full">
            <BookOpen className="w-4 h-4 text-[#2D5A27]" />
            <span>Feature D: Personal Nature Journal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C2818]">
            Your Nature Observation Journal
          </h1>
          <p className="text-stone-600 text-sm max-w-2xl">
            Document your outdoor findings, leaf discoveries, bird sightings, and mood notes. 100% stored locally on your device for absolute privacy.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="btn-nature-primary text-xs py-2.5 px-4"
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            <span>New Journal Entry</span>
          </button>

          <button
            onClick={exportJournalAsJson}
            className="btn-nature-secondary text-xs py-2.5 px-4"
            title="Export entries as JSON file"
          >
            <Download className="w-4 h-4" />
            <span>Export Entries</span>
          </button>

          {entries.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="p-2.5 bg-red-100/70 hover:bg-red-200 text-red-800 rounded-xl text-xs font-semibold transition-colors"
              title="Delete all local entries"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* New Journal Entry Form Modal/Drawer */}
      {isFormOpen && (
        <div className="nature-card p-6 bg-white border border-[#2D5A27]/30 shadow-xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-xl font-bold text-[#1C2818] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2D5A27]" /> Write Nature Entry
            </h2>
            <button onClick={resetForm} className="text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveEntry} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Title of Observation *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Morning Oak Tree Canopy Check"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:border-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:border-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Activity Type</label>
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="Bird Watching, Leaf Collection, Gardening"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:border-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Pine Ridge Trail / Balcony"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:border-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Mood / Sensory State</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:border-[#2D5A27]"
                >
                  <option value="🌿 Refreshed">🌿 Refreshed & Grounded</option>
                  <option value="🕊️ Peaceful">🕊️ Peaceful & Calm</option>
                  <option value="🌱 Energized">🌱 Energized & Inspired</option>
                  <option value="☀️ Joyful">☀️ Joyful & Clear-headed</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Weather Conditions</label>
                <input
                  type="text"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  placeholder="Crisp & Sunny, 68°F"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:border-[#2D5A27]"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Field Notes & Observations *</label>
              <textarea
                rows={4}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe leaf veins, bird songs, wind textures, or thoughts experienced away from screens..."
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:border-[#2D5A27] text-xs leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Optional Photo Attachment</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#E4ECE2] file:text-[#1D3B19] hover:file:bg-[#c8dac4]"
                />
                {photoUrl && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-stone-300">
                    <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(null)}
                      className="absolute top-0 right-0 bg-black/60 text-white p-0.5 rounded-bl"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={resetForm} className="px-4 py-2 text-stone-600 hover:text-stone-800">
                Cancel
              </button>
              <button type="submit" className="btn-nature-primary py-2 px-5">
                Save Journal Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search journal entries..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#2D5A27]"
        />
      </div>

      {/* Entry Cards List */}
      {filteredEntries.length === 0 ? (
        <div className="nature-card p-12 text-center bg-white border border-stone-200 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="font-bold text-stone-800 text-lg">No journal entries found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Click <strong>New Journal Entry</strong> above to record your first outdoor observation!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="nature-card p-6 bg-white flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 bg-[#E4ECE2] px-2.5 py-0.5 rounded-full">
                    {entry.mood || '🌿 Refreshed'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{entry.date}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1C2818] mb-1">{entry.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-600 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#2D5A27]" /> {entry.location}</span>
                    <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-600" /> {entry.weather}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {entry.notes}
                </p>

                {entry.photoUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-stone-200 max-h-48">
                    <img src={entry.photoUrl} alt={entry.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {(entry.tags || []).map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setEntryToDelete(entry.id)}
                  className="p-1.5 text-stone-400 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Delete Single Entry Confirmation Modal */}
      {entryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto" />
            <h3 className="font-bold text-stone-900 text-base">Delete Journal Entry?</h3>
            <p className="text-xs text-stone-600">This action will remove this entry from your local browser storage.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setEntryToDelete(null)} className="px-4 py-2 text-xs font-semibold text-stone-600">
                Cancel
              </button>
              <button onClick={() => handleDelete(entryToDelete)} className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl shadow">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Data Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto" />
            <h3 className="font-bold text-stone-900 text-base">Clear All Local Data?</h3>
            <p className="text-xs text-stone-600">This will reset all journal entries, completed missions, and streaks stored in your browser.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowClearConfirm(false)} className="px-4 py-2 text-xs font-semibold text-stone-600">
                Cancel
              </button>
              <button onClick={handleClearAll} className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl shadow">
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
