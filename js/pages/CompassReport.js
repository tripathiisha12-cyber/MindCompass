// MindCompass — Compass Report Page

function createCompassReportPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'page-wrapper';
  page.style.background = 'var(--color-bg)';

  const result = getLastResult();

  if (!result) {
    // No result found
    page.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;padding:var(--space-8);">
        <div style="font-size:4rem;margin-bottom:var(--space-6);">🧭</div>
        <h2 style="font-family:var(--font-serif);font-size:var(--text-3xl);color:var(--slate-800);margin-bottom:var(--space-4);">
          No compass reading yet.
        </h2>
        <p style="color:var(--color-text-muted);margin-bottom:var(--space-8);max-width:400px;">
          Take the symptom check to generate your personalized Compass Report.
        </p>
        <button class="btn btn-primary btn-lg" id="goto-checker">
          🧭 Start Symptom Check
        </button>
      </div>
    `;
    page.querySelector('#goto-checker').addEventListener('click', () => onNavigate('checker'));
    return page;
  }

  const content = REPORT_CONTENT[result.condition] || REPORT_CONTENT.wellness;
  let activeTab = 'understand';

  const tabs = [
    { id: 'understand', label: '📖 Understand' },
    { id: 'cope',       label: '🛠️ Coping Skills' },
    { id: 'heal',       label: '🌿 Healing Activities' },
    { id: 'doctor',     label: '🩺 When to Seek Help' },
  ];

  function renderTabContent() {
    const container = page.querySelector('#report-tab-content');
    if (!container) return;
    container.innerHTML = '';
    container.style.animation = 'fadeSlideUp 0.4s ease both';
    // Reset animation
    container.style.animation = 'none';
    requestAnimationFrame(() => { container.style.animation = 'fadeSlideUp 0.4s ease both'; });

    if (activeTab === 'understand') {
      // Score bars
      const maxScore = 30;
      const scoreItems = [
        { label: 'Anxiety', score: result.scores.anxiety, color: '#0ea5e9', bg: '#dbeafe' },
        { label: 'Low Mood', score: result.scores.depression, color: '#7c3aed', bg: '#ede9f6' },
        { label: 'Burnout', score: result.scores.burnout, color: '#d97706', bg: '#fef3c7' },
      ];

      container.innerHTML = `
        <div class="card" style="margin-bottom:var(--space-6);">
          <h3 style="font-size:var(--text-xl);font-weight:700;color:var(--slate-800);margin-bottom:var(--space-2);">${content.what.title}</h3>
          <p style="color:var(--color-text-muted);line-height:var(--leading-relaxed);white-space:pre-line;">${content.what.content}</p>
        </div>
        <div class="card" style="margin-bottom:var(--space-6);">
          <h3 style="font-size:var(--text-xl);font-weight:700;color:var(--slate-800);margin-bottom:var(--space-6);">Your Score Breakdown</h3>
          <div style="display:flex;flex-direction:column;gap:var(--space-5);">
            ${scoreItems.map(item => {
              const pct = Math.min(100, Math.round((item.score / 20) * 100));
              return `
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-2);">
                    <span style="font-weight:600;font-size:var(--text-sm);color:var(--gray-700);">${item.label}</span>
                    <span style="font-size:var(--text-sm);color:var(--color-text-muted);font-weight:500;">${pct}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill" style="width:${pct}%;background:linear-gradient(90deg,${item.bg},${item.color});transition-delay:0.2s;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          <div style="margin-top:var(--space-6);padding:var(--space-4);background:var(--sage-50);border-radius:var(--radius-lg);border:1px solid var(--sage-200);">
            <p style="font-size:var(--text-sm);color:var(--sage-700);font-weight:500;">
              📌 You selected <strong>${result.selectedCount} symptoms</strong>. 
              Remember: this is a self-awareness tool, not a diagnosis. 
              A mental health professional can give you a proper evaluation.
            </p>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-4);flex-wrap:wrap;">
          <button class="btn btn-primary" id="tab-cope-btn">🛠️ See Coping Skills →</button>
          <button class="btn btn-secondary" id="retake-btn">↩ Retake Check</button>
        </div>
      `;

      container.querySelector('#tab-cope-btn').addEventListener('click', () => {
        activeTab = 'cope';
        updateTabButtons();
        renderTabContent();
        page.querySelector('#report-tabs-bar').scrollIntoView({ behavior: 'smooth' });
      });
      container.querySelector('#retake-btn').addEventListener('click', () => onNavigate('checker'));
    }

    else if (activeTab === 'cope') {
      container.innerHTML = `
        <h3 style="font-size:var(--text-2xl);font-weight:700;font-family:var(--font-serif);color:var(--slate-800);margin-bottom:var(--space-6);">
          🛠️ Coping Skills & Immediate Relief
        </h3>
        <div id="cope-cards"></div>
      `;

      const copeContainer = container.querySelector('#cope-cards');
      content.coping.forEach(item => {
        const card = document.createElement('div');
        card.className = 'action-card';
        card.innerHTML = `
          <div class="action-icon" style="background:${item.iconBg};">${item.icon}</div>
          <div class="action-body">
            <div class="action-title">${item.title}</div>
            <div class="action-desc">${item.desc}</div>
          </div>
        `;
        copeContainer.appendChild(card);

        if (item.hasBreathing) {
          const breathWrapper = document.createElement('div');
          breathWrapper.style.cssText = 'margin:var(--space-4) 0 var(--space-2);padding:var(--space-6);background:var(--sage-50);border-radius:var(--radius-xl);border:1px solid var(--sage-200);';
          breathWrapper.appendChild(createBreathingCircle());
          copeContainer.appendChild(breathWrapper);
        }
      });
    }

    else if (activeTab === 'heal') {
      container.innerHTML = `
        <h3 style="font-size:var(--text-2xl);font-weight:700;font-family:var(--font-serif);color:var(--slate-800);margin-bottom:var(--space-6);">
          🌿 Healing Activities
        </h3>
        <div id="heal-cards"></div>
      `;

      const healContainer = container.querySelector('#heal-cards');
      content.healing.forEach(item => {
        const card = document.createElement('div');
        card.className = 'action-card';
        card.innerHTML = `
          <div class="action-icon" style="background:${item.iconBg};">${item.icon}</div>
          <div class="action-body">
            <div class="action-title">${item.title}</div>
            <div class="action-desc">${item.desc}</div>
          </div>
        `;
        healContainer.appendChild(card);

        if (item.hasGrounding) {
          const groundWrapper = document.createElement('div');
          groundWrapper.style.cssText = 'margin:var(--space-4) 0 var(--space-2);';
          groundWrapper.appendChild(createGroundingExercise());
          healContainer.appendChild(groundWrapper);
        }
      });
    }

    else if (activeTab === 'doctor') {
      container.innerHTML = `
        <h3 style="font-size:var(--text-2xl);font-weight:700;font-family:var(--font-serif);color:var(--slate-800);margin-bottom:var(--space-3);">
          🩺 When to Consult a Professional
        </h3>
        <p style="color:var(--color-text-muted);margin-bottom:var(--space-6);line-height:var(--leading-relaxed);">
          Self-care helps, but professional support is sometimes necessary and always brave. 
          Consider reaching out to a therapist or psychiatrist if any of these apply to you:
        </p>
        <ul class="doctor-list" id="doctor-list"></ul>
        <div style="margin-top:var(--space-8);">
          <div class="alert alert-info" style="margin-bottom:var(--space-4);">
            <span>💡</span>
            <span>In India, you can access mental health support through iCall (TISS), 
            Vandrevala Foundation, or by visiting any government hospital's psychiatry department — 
            often at no cost.</span>
          </div>
          <button class="btn btn-primary" id="find-help-btn">
            🏥 Find Professional Help in India →
          </button>
        </div>
      `;

      const list = container.querySelector('#doctor-list');
      content.doctor.forEach(item => {
        const li = document.createElement('li');
        li.className = `doctor-list-item ${item.crisis ? 'crisis-item' : ''}`;
        li.innerHTML = `
          <div class="item-dot"></div>
          <span>${item.text}</span>
          ${item.crisis ? '<button class="btn btn-crisis btn-sm" style="white-space:nowrap;margin-left:auto;" aria-label="Open crisis helplines">🆘 Get Help Now</button>' : ''}
        `;
        if (item.crisis) {
          li.querySelector('button')?.addEventListener('click', showCrisisModal);
        }
        list.appendChild(li);
      });

      container.querySelector('#find-help-btn')?.addEventListener('click', () => onNavigate('portal'));
    }
  }

  function updateTabButtons() {
    page.querySelectorAll('.report-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === activeTab);
    });
  }

  // Build page structure
  const conditionColors = {
    anxiety: '#0ea5e9',
    depression: '#7c3aed',
    burnout: '#d97706',
    mixed: '#16a34a',
    wellness: '#16a34a',
  };

  page.innerHTML = `
    <!-- Report Hero -->
    <div class="report-hero">
      <div class="report-hero-bg"></div>
      <div class="container" style="position:relative;z-index:1;">
        <span class="report-compass-icon">${content.emoji}</span>
        <div class="report-condition-tag" style="background:${content.tagColor};color:${content.tagTextColor};">
          ${content.tagLabel}
        </div>
        <h1 class="report-title">${content.condition}</h1>
        <p class="report-subtitle">
          Your Compass has found a pattern. Below you'll find a personalized understanding of what's happening, 
          practical coping strategies, and guidance on next steps.
        </p>
        <div style="margin-top:var(--space-8);display:flex;gap:var(--space-4);justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-secondary" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.3);color:white;" id="header-tracker-btn">
            📅 Track My Wellness
          </button>
          <button class="btn btn-secondary" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.3);color:white;" id="header-portal-btn">
            🏥 Find Professional Help
          </button>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="report-tabs-bar" id="report-tabs-bar">
      <div class="report-tabs-inner">
        ${tabs.map(t => `
          <button class="report-tab-btn ${activeTab === t.id ? 'active' : ''}" 
            data-tab="${t.id}" 
            aria-label="${t.label} tab"
            ${activeTab === t.id ? 'aria-current="true"' : ''}>
            ${t.label}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Tab Content -->
    <div class="report-content" id="report-tab-content"></div>

    <!-- Bottom CTA -->
    <div style="background:var(--sage-50);border-top:1px solid var(--sage-200);padding:var(--space-8) 0;text-align:center;">
      <div class="container">
        <p style="color:var(--color-text-muted);margin-bottom:var(--space-4);">
          Track your daily wellness journey to see your progress over time.
        </p>
        <button class="btn btn-primary" id="footer-tracker-btn">📅 Open Daily Wellness Tracker</button>
      </div>
    </div>
  `;

  // Tab button events
  page.querySelectorAll('.report-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      updateTabButtons();
      renderTabContent();
      page.querySelector('#report-tabs-bar').scrollIntoView({ behavior: 'smooth' });
    });
  });

  page.querySelector('#header-tracker-btn').addEventListener('click', () => onNavigate('tracker'));
  page.querySelector('#header-portal-btn').addEventListener('click', () => onNavigate('portal'));
  page.querySelector('#footer-tracker-btn').addEventListener('click', () => onNavigate('tracker'));

  // Initial tab render
  renderTabContent();

  return page;
}
