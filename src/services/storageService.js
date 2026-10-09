/**
 * Touch Grass — Local Storage & Persistence Service
 * Manages journal entries, completed missions, saved adventures, and dashboard stats.
 * Uses localStorage with fallback defaults.
 */

const KEYS = {
  JOURNAL: 'touch_grass_journal',
  COMPLETED_MISSIONS: 'touch_grass_completed_missions',
  SAVED_ADVENTURES: 'touch_grass_saved_adventures',
  STREAK_DATA: 'touch_grass_streak',
  AI_CONFIG: 'touch_grass_ai_config',
};

// --- JOURNAL ENTRIES ---
export const getJournalEntries = () => {
  try {
    const data = localStorage.getItem(KEYS.JOURNAL);
    if (!data) return getInitialSampleJournal();
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load journal entries from localStorage', e);
    return getInitialSampleJournal();
  }
};

export const saveJournalEntry = (entry) => {
  const entries = getJournalEntries();
  const newEntry = {
    id: entry.id || `journal_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    date: entry.date || new Date().toISOString().split('T')[0],
    title: entry.title,
    activity: entry.activity || 'Outdoor Exploration',
    location: entry.location || 'Local Park / Outdoors',
    notes: entry.notes,
    mood: entry.mood || '🌿 Refreshed',
    weather: entry.weather || 'Sunny',
    photoUrl: entry.photoUrl || null,
    tags: entry.tags || ['NatureWalk'],
    createdAt: entry.createdAt || new Date().toISOString()
  };

  const updated = [newEntry, ...entries];
  localStorage.setItem(KEYS.JOURNAL, JSON.stringify(updated));
  updateStreak();
  return newEntry;
};

export const deleteJournalEntry = (id) => {
  const entries = getJournalEntries();
  const updated = entries.filter(e => e.id !== id);
  localStorage.setItem(KEYS.JOURNAL, JSON.stringify(updated));
  return updated;
};

export const updateJournalEntry = (id, updatedFields) => {
  const entries = getJournalEntries();
  const updated = entries.map(e => e.id === id ? { ...e, ...updatedFields } : e);
  localStorage.setItem(KEYS.JOURNAL, JSON.stringify(updated));
  return updated;
};

export const exportJournalAsJson = () => {
  const entries = getJournalEntries();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `touch_grass_journal_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

// --- COMPLETED MISSIONS ---
export const getCompletedMissions = () => {
  try {
    const data = localStorage.getItem(KEYS.COMPLETED_MISSIONS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const toggleMissionCompletion = (missionId, durationMinutes = 20) => {
  const completed = getCompletedMissions();
  const exists = completed.find(m => m.id === missionId);
  let updated;
  
  if (exists) {
    updated = completed.filter(m => m.id !== missionId);
  } else {
    updated = [...completed, { id: missionId, completedAt: new Date().toISOString(), durationMinutes }];
    updateStreak();
  }
  
  localStorage.setItem(KEYS.COMPLETED_MISSIONS, JSON.stringify(updated));
  return updated;
};

// --- SAVED ADVENTURES ---
export const getSavedAdventures = () => {
  try {
    const data = localStorage.getItem(KEYS.SAVED_ADVENTURES);
    return data ? JSON.parse(data) : getInitialSampleAdventures();
  } catch (e) {
    return getInitialSampleAdventures();
  }
};

export const saveAdventure = (adventure) => {
  const saved = getSavedAdventures();
  const newAdventure = {
    ...adventure,
    id: adventure.id || `adv_${Date.now()}`,
    savedAt: new Date().toISOString(),
    completed: false
  };
  const updated = [newAdventure, ...saved.filter(a => a.id !== newAdventure.id)];
  localStorage.setItem(KEYS.SAVED_ADVENTURES, JSON.stringify(updated));
  return updated;
};

export const toggleAdventureCompleted = (adventureId) => {
  const saved = getSavedAdventures();
  const updated = saved.map(a => {
    if (a.id === adventureId) {
      return { ...a, completed: !a.completed, completedAt: !a.completed ? new Date().toISOString() : null };
    }
    return a;
  });
  localStorage.setItem(KEYS.SAVED_ADVENTURES, JSON.stringify(updated));
  updateStreak();
  return updated;
};

// --- STREAK & STATS ---
export const getStreakData = () => {
  try {
    const data = localStorage.getItem(KEYS.STREAK_DATA);
    if (!data) return { currentStreak: 1, lastActiveDate: new Date().toISOString().split('T')[0] };
    return JSON.parse(data);
  } catch (e) {
    return { currentStreak: 1, lastActiveDate: new Date().toISOString().split('T')[0] };
  }
};

const updateStreak = () => {
  const today = new Date().toISOString().split('T')[0];
  const streak = getStreakData();
  
  if (streak.lastActiveDate === today) return;
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newStreak = streak.currentStreak;
  
  if (streak.lastActiveDate === yesterday) {
    newStreak += 1;
  } else {
    newStreak = 1;
  }
  
  const updated = { currentStreak: newStreak, lastActiveDate: today };
  localStorage.setItem(KEYS.STREAK_DATA, JSON.stringify(updated));
};

export const getDashboardStats = () => {
  const completedMissions = getCompletedMissions();
  const savedAdventures = getSavedAdventures();
  const journalEntries = getJournalEntries();
  const streak = getStreakData();

  const completedAdventures = savedAdventures.filter(a => a.completed);
  
  // Calculate total outdoor time in minutes
  const missionTime = completedMissions.reduce((acc, m) => acc + (m.durationMinutes || 20), 0);
  const adventureTime = completedAdventures.reduce((acc, a) => acc + (parseInt(a.durationMinutes) || 30), 0);
  const totalMinutes = missionTime + adventureTime + (journalEntries.length * 15);

  return {
    adventuresCompletedCount: completedAdventures.length,
    missionsCompletedCount: completedMissions.length,
    totalOutdoorMinutes: totalMinutes,
    currentStreakDays: streak.currentStreak,
    journalEntriesCount: journalEntries.length,
    recentDiscoveriesCount: journalEntries.filter(j => j.notes && j.notes.length > 10).length
  };
};

export const clearAllData = () => {
  localStorage.removeItem(KEYS.JOURNAL);
  localStorage.removeItem(KEYS.COMPLETED_MISSIONS);
  localStorage.removeItem(KEYS.SAVED_ADVENTURES);
  localStorage.removeItem(KEYS.STREAK_DATA);
};

// --- INITIAL SAMPLE DATA ---
function getInitialSampleJournal() {
  return [
    {
      id: 'sample_1',
      date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
      title: 'Morning Oak Grove Walk',
      activity: 'Bird Watching & Leaf Collecting',
      location: 'Pine Hill Reserve',
      notes: 'Observed a pair of Northern Cardinals nesting in an oak canopy. Collected 4 distinct fallen oak and maple leaf specimens. Spending 30 minutes away from screens made my head feel instantly clearer.',
      mood: '🌿 Peaceful',
      weather: 'Crisp & Sunny, 68°F',
      tags: ['Birds', 'Leaves', 'Mindfulness'],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 'sample_2',
      date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
      title: 'Backyard Herb Garden Check',
      activity: 'Micro-Gardening',
      location: 'Patio Garden',
      notes: 'The basil and rosemary cuttings planted last week are sprouting vibrant new shoots. Noticed tiny honeybees pollinating the thyme flowers.',
      mood: '🌱 Energized',
      weather: 'Mild & Cloud Covered',
      tags: ['Gardening', 'Pollinators'],
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ];
}

function getInitialSampleAdventures() {
  return [
    {
      id: 'adv_sample_1',
      title: 'The 30-Minute Nature Detective',
      description: 'A focused micro-expedition to observe micro-ecosystems and natural patterns hiding right under your feet.',
      duration: '30 Minutes',
      durationMinutes: 30,
      difficulty: 'Beginner',
      requiredItems: ['Notebook or paper', 'Magnifying glass (optional)', 'Comfortable walking shoes'],
      activities: [
        'Step 1: Walk to the nearest park, lawn, or tree line without checking your phone.',
        'Step 2: Find three distinct leaf shapes (e.g. serrated, lobed, needle-like) and inspect their vein structures.',
        'Step 3: Listen quietly for 3 minutes with your eyes closed to distinguish at least 2 separate bird calls.',
        'Step 4: Find one naturally occurring geometric pattern (fractal in fern, spiral in flower center, honeycomb pattern).'
      ],
      natureChallenges: [
        'Identify 5 natural sounds before returning indoors.',
        'Record 1 surprising texture observation in your nature journal.'
      ],
      safetyTips: [
        'Watch your step on damp roots or uneven soil.',
        'Respect wildlife: view birds and insects from a 5-foot distance.'
      ],
      completionGoal: 'Document 1 new discovery and spend 30 full minutes outdoors without digital distractions.',
      completed: true,
      completedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];
}
