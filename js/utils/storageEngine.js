// MindCompass — Storage Engine (localStorage with simple encoding)
// Note: For a production app, use server-side encryption and proper HIPAA compliance.
// This implementation stores data locally in the browser only.

const STORAGE_KEY = 'mc_wellness_data';
const RESULT_KEY  = 'mc_last_result';

function _encode(data) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(data)))); }
  catch(e) { return null; }
}

function _decode(str) {
  try { return JSON.parse(decodeURIComponent(escape(atob(str)))); }
  catch(e) { return null; }
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getAllLogs() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  return _decode(raw) || {};
}

function saveDailyLog(log) {
  const all = getAllLogs();
  const key = getTodayKey();
  all[key] = { ...all[key], ...log, date: key };
  localStorage.setItem(STORAGE_KEY, _encode(all));
}

function getTodayLog() {
  const all = getAllLogs();
  return all[getTodayKey()] || {};
}

function getLast60Days() {
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

function getLast7DaysMoods() {
  const all = getAllLogs();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const log = all[key] || {};
    const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' });
    days.push({ name: dayName, mood: log.moodScore || null, date: key });
  }
  return days;
}

function getStreak() {
  const all = getAllLogs();
  let streak = 0;
  const today = getTodayKey();
  let d = new Date();

  // Start from today and go backwards
  for (let i = 0; i < 365; i++) {
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (all[key] && all[key].moodScore) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function getMilestones(streak) {
  return [
    { id: 'm1', icon: '🌱', name: 'First Step', desc: '1 day checked in', earned: streak >= 1, days: 1 },
    { id: 'm2', icon: '🔥', name: '3-Day Streak', desc: '3 days in a row', earned: streak >= 3, days: 3 },
    { id: 'm3', icon: '⭐', name: 'One Week', desc: '7-day streak', earned: streak >= 7, days: 7 },
    { id: 'm4', icon: '💎', name: 'Two Weeks', desc: '14-day streak', earned: streak >= 14, days: 14 },
    { id: 'm5', icon: '🏆', name: 'Monthly Hero', desc: '30-day streak', earned: streak >= 30, days: 30 },
    { id: 'm6', icon: '🌟', name: 'Committed', desc: '60-day streak', earned: streak >= 60, days: 60 },
  ];
}

function saveLastResult(result) {
  localStorage.setItem(RESULT_KEY, _encode(result));
}

function getLastResult() {
  const raw = localStorage.getItem(RESULT_KEY);
  if (!raw) return null;
  return _decode(raw);
}
