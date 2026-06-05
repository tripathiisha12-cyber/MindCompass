const STORAGE_KEY = 'mc_wellness_data';

function encode(data) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(data)))); }
  catch { return null; }
}

function decode(str) {
  try { return JSON.parse(decodeURIComponent(escape(atob(str)))); }
  catch { return null; }
}

export function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getAllLogs() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  return decode(raw) || {};
}

export function saveDailyLog(log) {
  const all = getAllLogs();
  const key = getTodayKey();
  all[key] = { ...all[key], ...log, date: key };
  localStorage.setItem(STORAGE_KEY, encode(all));
}

export function getTodayLog() {
  return getAllLogs()[getTodayKey()] || {};
}

export function getLast60Days() {
  const all = getAllLogs();
  const days = [];
  for (let i = 59; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    days.push({ key, date: key, ...(all[key] || {}) });
  }
  return days;
}

export function getLast7DaysMoods() {
  const all = getAllLogs();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    days.push({
      name: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      mood: all[key]?.moodScore ?? null,
      date: key,
    });
  }
  return days;
}

export function getStreak() {
  const all = getAllLogs();
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (all[key]?.moodScore) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

export function getMilestones(streak) {
  return [
    { id: 'm1', icon: '🌱', name: 'First Step',    desc: '1 day checked in',  earned: streak >= 1,  days: 1  },
    { id: 'm2', icon: '🔥', name: '3-Day Streak',  desc: '3 days in a row',   earned: streak >= 3,  days: 3  },
    { id: 'm3', icon: '⭐', name: 'One Week',      desc: '7-day streak',      earned: streak >= 7,  days: 7  },
    { id: 'm4', icon: '💎', name: 'Two Weeks',     desc: '14-day streak',     earned: streak >= 14, days: 14 },
    { id: 'm5', icon: '🏆', name: 'Monthly Hero',  desc: '30-day streak',     earned: streak >= 30, days: 30 },
    { id: 'm6', icon: '🌟', name: 'Committed',     desc: '60-day streak',     earned: streak >= 60, days: 60 },
  ];
}
