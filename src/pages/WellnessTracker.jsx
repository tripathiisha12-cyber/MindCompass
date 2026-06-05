import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Flame, Award, LineChart, CheckCircle2, ChevronRight, Share2, Info } from 'lucide-react';
import { ResponsiveContainer, LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {
  getTodayLog,
  saveDailyLog,
  getLast60Days,
  getLast7DaysMoods,
  getStreak,
  getMilestones,
  getTodayKey
} from '@utils/storageEngine';

const MOODS = [
  { score: 5, emoji: '😄', label: 'Great' },
  { score: 4, emoji: '🙂', label: 'Good' },
  { score: 3, emoji: '😐', label: 'Okay' },
  { score: 2, emoji: '😔', label: 'Low' },
  { score: 1, emoji: '😢', label: 'Rough' },
];

const ACTIVITIES = [
  { id: 'water',     emoji: '💧', label: 'Drank enough water (8+ glasses)' },
  { id: 'sunlight',  emoji: '☀️', label: 'Got morning sunlight (15+ min)' },
  { id: 'breathing', emoji: '🫁', label: 'Did breathing exercise' },
  { id: 'journal',   emoji: '📓', label: 'Journaled or brain-dumped' },
  { id: 'movement',  emoji: '🚶', label: 'Moved my body (walk, stretch)' },
  { id: 'connect',   emoji: '👥', label: 'Connected with someone' },
  { id: 'screen',    emoji: '📵', label: 'Limited screen time (< 1 hr)' },
  { id: 'sleep',     emoji: '😴', label: 'Slept 7+ hours last night' },
];

export default function WellnessTracker() {
  const navigate = useNavigate();
  const [todayLog, setTodayLog] = useState(() => getTodayLog());
  const [streak, setStreak] = useState(() => getStreak());
  const [toastMessage, setToastMessage] = useState(null);

  // States derived/fetched on load and on save
  const [last60, setLast60] = useState([]);
  const [last7, setLast7] = useState([]);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    // Load tracking statistics
    setLast60(getLast60Days());
    setLast7(getLast7DaysMoods());
    setMilestones(getMilestones(streak));
  }, [todayLog, streak]);

  function triggerToast(message) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  }

  function handleSaveMood(score) {
    const updated = { ...todayLog, moodScore: score };
    saveDailyLog(updated);
    setTodayLog(updated);
    const newStreak = getStreak();
    setStreak(newStreak);
    const selectedMood = MOODS.find(m => m.score === score);
    triggerToast(`Mood logged: ${selectedMood ? selectedMood.emoji + ' ' + selectedMood.label : score}`);
  }

  function handleToggleActivity(id) {
    const activitiesObj = todayLog.activities || {};
    const updatedActivities = { ...activitiesObj, [id]: !activitiesObj[id] };
    const updated = { ...todayLog, activities: updatedActivities };
    saveDailyLog(updated);
    setTodayLog(updated);
    triggerToast(updatedActivities[id] ? '✅ Activity checked!' : 'Activity removed');
  }

  const doneCount = Object.values(todayLog.activities || {}).filter(Boolean).length;
  const progressPercent = Math.round((doneCount / ACTIVITIES.length) * 100);

  const todayDisplay = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const chartData = last7.map(d => ({
    name: d.name,
    mood: d.mood || null
  }));

  const chartTooltipFormatter = (value) => {
    const mood = MOODS.find(m => m.score === value);
    return mood ? [`${mood.emoji} ${mood.label}`, 'Mood'] : [value, 'Mood'];
  };

  return (
    <div className="page-wrapper" style={{ background: 'linear-gradient(160deg, var(--sage-50) 0%, var(--earth-50) 60%, var(--lavender-100) 100%)', minHeight: 'calc(100vh - var(--navbar-height))' }}>
      {/* ── HEADER ── */}
      <div style={{ background: 'linear-gradient(160deg, var(--sage-700), var(--slate-900))', padding: 'var(--space-12) 0 var(--space-16)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 40%, rgba(69,138,98,0.25), transparent 60%)', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ background: 'rgba(69,138,98,0.2)', color: 'var(--sage-300)', border: '1px solid rgba(69,138,98,0.3)', padding: '0.4rem 1rem' }}>
            Daily Wellness
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-5xl)', fontWeight: 600, color: 'white', margin: 'var(--space-4) 0' }}>
            How is your energy today?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', margin: 0 }}>{todayDisplay}</p>
        </div>
      </div>

      {/* ── TRACKER GRIDS ── */}
      <div className="container" style={{ marginTop: '-3.5rem', position: 'relative', zIndex: 10 }}>
        <div className="tracker-grid">
          
          {/* Mood Selector Card */}
          <div className="tracker-card">
            <h3 className="tracker-card-title">
              <span style={{ fontSize: '1.25rem' }}>😊</span>
              <span>Today's Mood</span>
            </h3>
            <div className="mood-selector" style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              {MOODS.map((m) => {
                const isSel = todayLog.moodScore === m.score;
                return (
                  <button
                    key={m.score}
                    className={`mood-emoji-btn ${isSel ? 'selected' : ''}`}
                    onClick={() => handleSaveMood(m.score)}
                    aria-label={`Log mood as ${m.label}`}
                    aria-pressed={isSel}
                  >
                    <span className="emoji">{m.emoji}</span>
                    <span className="mood-label" style={{ fontSize: 'var(--text-xs)', marginTop: '4px' }}>{m.label}</span>
                  </button>
                );
              })}
            </div>
            <p style={{ marginTop: 'var(--space-5)', textAlign: 'center', fontSize: 'var(--text-sm)', color: todayLog.moodScore ? 'var(--sage-600)' : 'var(--color-text-muted)', fontWeight: todayLog.moodScore ? 600 : 400 }}>
              {todayLog.moodScore ? '✓ Mood logged for today' : 'Tap an emoji to check in your mood'}
            </p>
          </div>

          {/* Activity Checklist Card */}
          <div className="tracker-card">
            <h3 className="tracker-card-title">
              <span style={{ fontSize: '1.25rem' }}>✅</span>
              <span>Daily Checklist</span>
            </h3>
            <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              {ACTIVITIES.map((act) => {
                const isDone = !!todayLog.activities?.[act.id];
                return (
                  <button
                    key={act.id}
                    className={`activity-item ${isDone ? 'done' : ''}`}
                    onClick={() => handleToggleActivity(act.id)}
                    role="checkbox"
                    aria-checked={isDone}
                  >
                    <div className="activity-check" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isDone && '✓'}
                    </div>
                    <span className="activity-emoji" style={{ fontSize: '1.15rem' }}>{act.emoji}</span>
                    <span className="activity-label" style={{ fontSize: '0.875rem' }}>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Streak Grid Card */}
          <div className="tracker-card full-width">
            <div className="tracker-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ fontSize: '1.25rem' }}>📅</span>
                <span>60-Day Progress Grid</span>
              </div>
              <div className="streak-count" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🔥</span>
                <span className="number" style={{ fontWeight: 800, fontSize: 'var(--text-xl)', color: 'var(--slate-800)' }}>{streak}</span>
                <span className="unit" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>day streak</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--space-4)', margin: 'var(--space-4) 0', fontSize: '0.75rem', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--sage-100)', display: 'inline-block' }}></span>
                No logs
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--sage-400)', display: 'inline-block' }}></span>
                Mood logged
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--sage-600)', display: 'inline-block' }}></span>
                5+ activities done
              </span>
            </div>

            <div className="streak-grid">
              {last60.map((day) => {
                const hasLog = !!day.moodScore;
                const completedActivities = Object.values(day.activities || {}).filter(Boolean).length;
                const hasAll = hasLog && completedActivities >= 5;
                const isToday = day.key === getTodayKey();
                
                let cellClass = '';
                if (hasAll) cellClass = 'filled-full';
                else if (hasLog) cellClass = 'filled';

                return (
                  <div
                    key={day.key}
                    className={`streak-cell ${cellClass} ${isToday ? 'today' : ''}`}
                    title={`${day.date}${hasLog ? ' — Mood Logged' : ''} (${completedActivities} activities)`}
                  />
                );
              })}
            </div>
          </div>

          {/* Recharts Mood Graph Card */}
          <div className="tracker-card">
            <h3 className="tracker-card-title">
              <span style={{ fontSize: '1.25rem' }}>📈</span>
              <span>7-Day Mood Trend</span>
            </h3>
            
            <div style={{ height: '180px', marginTop: 'var(--space-4)' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip
                    formatter={chartTooltipFormatter}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="var(--sage-500)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--sage-500)', r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: 'var(--sage-700)' }}
                    connectNulls
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
              <span>😢 Rough</span>
              <span>😐 Okay</span>
              <span>😄 Great</span>
            </div>
          </div>

          {/* Today's Checklist Progress Card */}
          <div className="tracker-card">
            <h3 className="tracker-card-title">
              <span style={{ fontSize: '1.25rem' }}>📊</span>
              <span>Today's Progress</span>
            </h3>
            
            <div style={{ marginTop: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Checklist completed</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--sage-600)' }}>
                  {doneCount}/{ACTIVITIES.length}
                </span>
              </div>
              <div className="progress-track" style={{ height: '10px', borderRadius: 'var(--radius-full)' }}>
                <div className="progress-fill" style={{ width: `${progressPercent}%`, height: '100%', borderRadius: 'var(--radius-full)', background: 'var(--sage-500)' }}></div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-5)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', backgroundColor: progressPercent === 100 ? 'var(--sage-50)' : 'var(--gray-50)', border: '1px solid', borderColor: progressPercent === 100 ? 'var(--sage-200)' : 'var(--gray-200)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>
                {progressPercent === 100 ? '🌟' : progressPercent >= 60 ? '💪' : progressPercent > 0 ? '🌱' : '💭'}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: progressPercent === 100 ? 'var(--sage-700)' : 'var(--gray-700)' }}>
                {progressPercent === 100
                  ? 'Perfect day checked off! Incredible! 🎉'
                  : progressPercent >= 60
                  ? 'Great progress! Doing awesome!'
                  : progressPercent > 0
                  ? 'You have started your steps. Keep it up!'
                  : 'Ready to build your habits today?'}
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={() => navigate('/symptom-check')}
            >
              <Compass size={16} /> Take Symptom Check
            </button>
          </div>

          {/* Streak Achievements / Milestones */}
          <div className="tracker-card full-width">
            <h3 className="tracker-card-title">
              <span style={{ fontSize: '1.25rem' }}>🏆</span>
              <span>Streak Achievements</span>
            </h3>
            
            <div className="milestones-grid" style={{ marginTop: 'var(--space-4)' }}>
              {milestones.map((m) => (
                <div key={m.id} className={`milestone-card ${m.earned ? 'earned' : 'locked'}`}>
                  <span className="milestone-icon" style={{ fontSize: '2.25rem' }}>{m.earned ? m.icon : '🔒'}</span>
                  <div className="milestone-name" style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--slate-800)', marginTop: 'var(--space-2)' }}>{m.name}</div>
                  <div className="milestone-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>{m.desc}</div>
                  {m.earned && (
                    <div style={{ fontSize: '0.7rem', color: 'var(--sage-600)', fontWeight: 600, marginTop: 'var(--space-2)' }}>
                      UNLOCKED ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── MOTIVATIONAL FOOTER ── */}
      <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-6) calc(var(--space-12) + 56px)' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'var(--text-xl)', color: 'var(--sage-700)', maxWidth: '500px', margin: '0 auto var(--space-4)' }}>
          "Mental health is not a destination, but a process. It is about how you drive, not where you are going."
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', margin: 0 }}>— Noam Shpancer</p>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="save-toast show"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', bottom: 'var(--space-16)', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, pointerEvents: 'none' }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
