// MindCompass — Daily Wellness Tracker Page

function createWellnessTrackerPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'page-wrapper';
  page.style.background = 'linear-gradient(160deg, var(--sage-50) 0%, var(--earth-50) 60%, var(--lavender-100) 100%)';

  const moods = [
    { score: 5, emoji: '😄', label: 'Great' },
    { score: 4, emoji: '🙂', label: 'Good' },
    { score: 3, emoji: '😐', label: 'Okay' },
    { score: 2, emoji: '😔', label: 'Low' },
    { score: 1, emoji: '😢', label: 'Rough' },
  ];

  const activities = [
    { id: 'water',     emoji: '💧', label: 'Drank enough water (8+ glasses)' },
    { id: 'sunlight',  emoji: '☀️', label: 'Got morning sunlight (15+ min)' },
    { id: 'breathing', emoji: '🫁', label: 'Did breathing exercise' },
    { id: 'journal',   emoji: '📓', label: 'Journaled or brain-dumped' },
    { id: 'movement',  emoji: '🚶', label: 'Moved my body (walk, stretch)' },
    { id: 'connect',   emoji: '👥', label: 'Meaningfully connected with someone' },
    { id: 'screen',    emoji: '📵', label: 'Limited social media (< 1 hr)' },
    { id: 'sleep',     emoji: '😴', label: 'Slept 7+ hours last night' },
  ];

  let todayLog = getTodayLog();
  let last60 = getLast60Days();
  let last7 = getLast7DaysMoods();
  let streak = getStreak();
  let milestones = getMilestones(streak);

  function showToast(msg = '✅ Saved!') {
    let toast = document.getElementById('save-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  function saveMood(score) {
    todayLog.moodScore = score;
    saveDailyLog(todayLog);
    streak = getStreak();
    milestones = getMilestones(streak);
    last7 = getLast7DaysMoods();
    showToast(`Mood logged: ${moods.find(m => m.score === score)?.emoji} ${moods.find(m => m.score === score)?.label}`);
    rerenderStreak();
    rerenderMoodChart();
    rerenderMilestones();
  }

  function toggleActivity(id) {
    if (!todayLog.activities) todayLog.activities = {};
    todayLog.activities[id] = !todayLog.activities[id];
    saveDailyLog(todayLog);
    showToast(todayLog.activities[id] ? '✅ Activity logged!' : 'Activity unmarked');
    rerenderActivities();
  }

  function rerenderStreak() {
    last60 = getLast60Days();
    const grid = document.getElementById('streak-grid');
    if (!grid) return;
    const today = getTodayKey();
    grid.innerHTML = last60.map(day => {
      const hasLog = day.moodScore;
      const hasAll = day.moodScore && day.activities && Object.values(day.activities).filter(Boolean).length >= 5;
      const isToday = day.key === today;
      return `<div class="streak-cell ${hasAll ? 'filled-full' : hasLog ? 'filled' : ''} ${isToday ? 'today' : ''}" 
                title="${day.date}${hasLog ? ' — Mood logged' : ''}" 
                role="presentation"
                aria-label="${day.date}${hasLog ? ' checked in' : ''}"></div>`;
    }).join('');

    const streakNum = document.getElementById('streak-number');
    if (streakNum) streakNum.textContent = streak;
  }

  function rerenderActivities() {
    const list = document.getElementById('activities-list');
    if (!list) return;
    list.innerHTML = activities.map(act => `
      <div class="activity-item ${todayLog.activities?.[act.id] ? 'done' : ''}" 
           data-activity="${act.id}"
           role="checkbox"
           aria-checked="${todayLog.activities?.[act.id] ? 'true' : 'false'}"
           tabindex="0">
        <div class="activity-check" aria-hidden="true">
          ${todayLog.activities?.[act.id] ? '✓' : ''}
        </div>
        <span class="activity-emoji">${act.emoji}</span>
        <span class="activity-label">${act.label}</span>
      </div>
    `).join('');

    list.querySelectorAll('.activity-item').forEach(el => {
      const toggle = () => toggleActivity(el.dataset.activity);
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
  }

  function rerenderMoodChart() {
    const chartContainer = document.getElementById('mood-chart-container');
    if (!chartContainer || typeof Recharts === 'undefined') return;
    chartContainer.innerHTML = '';

    const chartData = last7.map(d => ({
      name: d.name,
      mood: d.mood,
    }));

    // Build SVG-based simple line chart using Recharts UMD
    try {
      const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;
      const reactEl = React.createElement(
        ResponsiveContainer,
        { width: '100%', height: 180 },
        React.createElement(
          LineChart,
          { data: chartData, margin: { top: 10, right: 10, left: -20, bottom: 0 } },
          React.createElement(CartesianGrid, { strokeDasharray: '3 3', stroke: '#e5e7eb' }),
          React.createElement(XAxis, { dataKey: 'name', tick: { fontSize: 12, fill: '#9ca3af' } }),
          React.createElement(YAxis, { domain: [1, 5], ticks: [1, 2, 3, 4, 5], tick: { fontSize: 11, fill: '#9ca3af' } }),
          React.createElement(Tooltip, {
            formatter: (value) => {
              const mood = moods.find(m => m.score === value);
              return mood ? [`${mood.emoji} ${mood.label}`, 'Mood'] : [value, 'Mood'];
            },
            contentStyle: { borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }
          }),
          React.createElement(Line, {
            type: 'monotone',
            dataKey: 'mood',
            stroke: '#458a62',
            strokeWidth: 2.5,
            dot: { fill: '#458a62', r: 4, strokeWidth: 0 },
            activeDot: { r: 6, fill: '#34704e' },
            connectNulls: false,
          })
        )
      );
      ReactDOM.render(reactEl, chartContainer);
    } catch (e) {
      chartContainer.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.875rem;text-align:center;padding:2rem 0;">Chart requires an internet connection to load.</p>';
    }
  }

  function rerenderMilestones() {
    const grid = document.getElementById('milestones-grid');
    if (!grid) return;
    milestones = getMilestones(streak);
    grid.innerHTML = milestones.map(m => `
      <div class="milestone-card ${m.earned ? 'earned' : 'locked'}">
        <span class="milestone-icon">${m.earned ? m.icon : '🔒'}</span>
        <div class="milestone-name">${m.name}</div>
        <div class="milestone-desc">${m.desc}</div>
        ${m.earned ? '<div style="font-size:0.7rem;color:var(--sage-600);font-weight:600;margin-top:0.25rem;">EARNED ✓</div>' : ''}
      </div>
    `).join('');
  }

  // Get today date display
  const todayDisplay = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  // Build the tracker UI
  page.innerHTML = `
    <!-- Header -->
    <div style="background:linear-gradient(160deg,var(--sage-700),var(--slate-900));padding:var(--space-12) 0 var(--space-16);text-align:center;position:relative;overflow:hidden;">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 60% 40%, rgba(69,138,98,0.25), transparent 60%);pointer-events:none;"></div>
      <div class="container" style="position:relative;z-index:1;">
        <span class="section-label" style="background:rgba(69,138,98,0.2);color:var(--sage-300);border:1px solid rgba(69,138,98,0.3);">Daily Wellness</span>
        <h1 class="animate-fadeSlideUp" style="font-family:var(--font-serif);font-size:var(--text-5xl);font-weight:600;color:white;margin:var(--space-4) 0;">
          How are you today?
        </h1>
        <p class="animate-fadeSlideUp delay-100" style="color:rgba(255,255,255,0.65);font-size:var(--text-lg);">${todayDisplay}</p>
      </div>
    </div>

    <!-- Tracker Cards Grid -->
    <div class="tracker-grid" style="margin-top:-3rem;">

      <!-- Mood Logger -->
      <div class="tracker-card animate-fadeSlideUp delay-200">
        <div class="tracker-card-title">
          <div class="tracker-card-icon">😊</div>
          Today's Mood
        </div>
        <div class="mood-selector" id="mood-selector">
          ${moods.map(m => `
            <button class="mood-emoji-btn ${todayLog.moodScore === m.score ? 'selected' : ''}"
              data-score="${m.score}"
              aria-label="Log mood as ${m.label}"
              aria-pressed="${todayLog.moodScore === m.score ? 'true' : 'false'}">
              <span class="emoji">${m.emoji}</span>
              <span class="mood-label">${m.label}</span>
            </button>
          `).join('')}
        </div>
        ${todayLog.moodScore
          ? `<div style="margin-top:var(--space-4);text-align:center;font-size:var(--text-sm);color:var(--sage-600);font-weight:500;">
              ✓ Mood logged for today
            </div>`
          : `<div style="margin-top:var(--space-4);text-align:center;font-size:var(--text-sm);color:var(--color-text-muted);">
              Tap to log your mood
            </div>`
        }
      </div>

      <!-- Activity Checklist -->
      <div class="tracker-card animate-fadeSlideUp delay-300">
        <div class="tracker-card-title">
          <div class="tracker-card-icon">✅</div>
          Daily Activities
        </div>
        <div class="activity-list" id="activities-list"></div>
      </div>

      <!-- Streak Calendar (full width) -->
      <div class="tracker-card full-width animate-fadeSlideUp delay-400">
        <div class="tracker-card-title" style="justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:var(--space-3);">
            <div class="tracker-card-icon">📅</div>
            60-Day Check-in Calendar
          </div>
          <div class="streak-count">
            <span class="streak-fire">🔥</span>
            <span class="number" id="streak-number">${streak}</span>
            <span class="unit">day streak</span>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-4);margin-bottom:var(--space-4);font-size:0.75rem;color:var(--color-text-muted);flex-wrap:wrap;">
          <span style="display:flex;align-items:center;gap:var(--space-2);"><span style="width:12px;height:12px;border-radius:3px;background:var(--sage-100);display:inline-block;"></span>No log</span>
          <span style="display:flex;align-items:center;gap:var(--space-2);"><span style="width:12px;height:12px;border-radius:3px;background:var(--sage-400);display:inline-block;"></span>Mood logged</span>
          <span style="display:flex;align-items:center;gap:var(--space-2);"><span style="width:12px;height:12px;border-radius:3px;background:var(--sage-600);display:inline-block;"></span>5+ activities</span>
        </div>
        <div class="streak-grid" id="streak-grid"></div>
      </div>

      <!-- Mood Trend Chart -->
      <div class="tracker-card animate-fadeSlideUp delay-400">
        <div class="tracker-card-title">
          <div class="tracker-card-icon">📈</div>
          7-Day Mood Trend
        </div>
        <div id="mood-chart-container" style="height:180px;"></div>
        <div style="margin-top:var(--space-4);display:flex;justify-content:space-between;font-size:0.75rem;color:var(--color-text-muted);">
          <span>😢 Rough</span>
          <span>😄 Great</span>
        </div>
      </div>

      <!-- Progress Summary -->
      <div class="tracker-card animate-fadeSlideUp delay-500">
        <div class="tracker-card-title">
          <div class="tracker-card-icon">📊</div>
          Today's Progress
        </div>
        <div id="progress-summary">
          ${(() => {
            const doneCount = Object.values(todayLog.activities || {}).filter(Boolean).length;
            const pct = Math.round((doneCount / activities.length) * 100);
            return `
              <div style="margin-bottom:var(--space-4);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-2);">
                  <span style="font-size:var(--text-sm);color:var(--color-text-muted);">Activities complete</span>
                  <span style="font-size:var(--text-sm);font-weight:700;color:var(--sage-600);">${doneCount}/${activities.length}</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width:${pct}%;"></div>
                </div>
              </div>
              <div style="text-align:center;padding:var(--space-4);border-radius:var(--radius-lg);background:${pct === 100 ? 'var(--sage-50)' : 'var(--gray-50)'};border:1px solid ${pct === 100 ? 'var(--sage-200)' : 'var(--gray-200)'};">
                <div style="font-size:2.5rem;margin-bottom:var(--space-2);">
                  ${pct === 100 ? '🌟' : pct >= 50 ? '💪' : pct > 0 ? '🌱' : '☁️'}
                </div>
                <div style="font-size:var(--text-sm);font-weight:600;color:${pct === 100 ? 'var(--sage-700)' : 'var(--gray-700)'};">
                  ${pct === 100 ? 'Perfect Day! Outstanding! 🎉' : pct >= 50 ? 'Great progress today!' : pct > 0 ? 'You\'ve started — keep going.' : 'Ready to start your day?'}
                </div>
              </div>
            `;
          })()}
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:var(--space-4);" id="go-checker-btn">
          🧭 Run a New Symptom Check
        </button>
      </div>

      <!-- Milestones (full width) -->
      <div class="tracker-card full-width animate-fadeSlideUp delay-500">
        <div class="tracker-card-title">
          <div class="tracker-card-icon">🏆</div>
          Milestones & Achievements
        </div>
        <div class="milestones-grid" id="milestones-grid"></div>
      </div>

    </div>

    <!-- Motivational Footer -->
    <div style="text-align:center;padding:var(--space-12) var(--space-6) calc(var(--space-12) + 56px);">
      <p style="font-family:var(--font-serif);font-style:italic;font-size:var(--text-xl);color:var(--sage-700);max-width:500px;margin:0 auto var(--space-6);">
        "You don't have to be great to start, but you have to start to be great."
      </p>
      <p style="font-size:var(--text-sm);color:var(--color-text-muted);">— Zig Ziglar</p>
    </div>

    <!-- Toast notification -->
    <div class="save-toast" id="save-toast" aria-live="polite"></div>
  `;

  // Mood selector events
  page.querySelectorAll('.mood-emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const score = parseInt(btn.dataset.score);
      saveMood(score);
      page.querySelectorAll('.mood-emoji-btn').forEach(b => {
        b.classList.toggle('selected', b.dataset.score == score);
        b.setAttribute('aria-pressed', b.dataset.score == score ? 'true' : 'false');
      });
      // Update logged text
      const noticeEl = btn.closest('.tracker-card').querySelector('[style*="margin-top"]');
      if (noticeEl) {
        noticeEl.innerHTML = '✓ Mood logged for today';
        noticeEl.style.color = 'var(--sage-600)';
        noticeEl.style.fontWeight = '500';
      }
    });
  });

  // Go to checker
  page.querySelector('#go-checker-btn').addEventListener('click', () => onNavigate('checker'));

  // Initial renders
  rerenderActivities();
  rerenderStreak();
  rerenderMilestones();

  // Chart renders after a tick (Recharts needs DOM)
  setTimeout(rerenderMoodChart, 100);

  return page;
}
