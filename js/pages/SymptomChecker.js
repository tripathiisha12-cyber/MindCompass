// MindCompass — Symptom Checker Page

function createSymptomCheckerPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'page-wrapper';
  page.style.background = 'linear-gradient(160deg, var(--sage-50) 0%, var(--earth-50) 100%)';

  const state = {
    step: 0, // 0=intro, 1=physical, 2=emotional, 3=cognitive, 4=duration, 5=review
    physical: [],
    emotional: [],
    cognitive: [],
    duration: null,
  };

  const totalSteps = 5;

  function getProgress() {
    return Math.round((state.step / totalSteps) * 100);
  }

  function render() {
    page.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'checker-wrapper';

    const card = document.createElement('div');
    card.className = 'checker-card';
    card.style.animation = 'fadeSlideUp 0.4s ease both';

    // Progress header (except step 0)
    if (state.step > 0) {
      const progressHTML = `
        <div class="checker-progress-header">
          <div class="checker-step-label">
            <span>Your Compass Check</span>
            <span class="checker-step-count">Step ${state.step} of ${totalSteps}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${getProgress()}%"></div>
          </div>
        </div>
      `;
      card.insertAdjacentHTML('beforeend', progressHTML);
    }

    // Step content
    if (state.step === 0) {
      card.insertAdjacentHTML('beforeend', `
        <div style="text-align:center;padding:var(--space-6) 0;">
          <div style="font-size:4rem;margin-bottom:var(--space-6);">🧭</div>
          <span class="section-label">Symptom Check</span>
          <h1 style="font-family:var(--font-serif);font-size:var(--text-4xl);font-weight:600;color:var(--slate-800);margin-bottom:var(--space-5);margin-top:var(--space-4);">
            Let's figure out what you're feeling.
          </h1>
          <p style="font-size:var(--text-lg);color:var(--color-text-muted);max-width:500px;margin:0 auto var(--space-8);line-height:var(--leading-relaxed);">
            There are no right or wrong answers here. This is a gentle, private 
            check-in — not a diagnosis. Select only what genuinely resonates with 
            how you've been feeling <strong>recently</strong>.
          </p>
          <div class="alert alert-info" style="text-align:left;max-width:500px;margin:0 auto var(--space-8);">
            <span>🔒</span>
            <span>Your responses stay on your device. Nothing is sent to any server.</span>
          </div>
          <button class="btn btn-primary btn-lg animate-pulseGlow" id="begin-btn">
            I'm Ready — Begin ✨
          </button>
          <p style="margin-top:var(--space-4);font-size:var(--text-sm);color:var(--color-text-subtle);">
            Takes 3–5 minutes
          </p>
        </div>
      `);
      card.querySelector('#begin-btn').addEventListener('click', () => {
        state.step = 1;
        render();
      });
    }

    else if (state.step >= 1 && state.step <= 3) {
      const categories = [
        { key: 'physical',   label: 'Physical Symptoms',   emoji: '🫁', subtitle: 'How has your body been feeling?', symptoms: SYMPTOMS.physical },
        { key: 'emotional',  label: 'Emotional Symptoms',  emoji: '💙', subtitle: 'How have you been feeling emotionally?', symptoms: SYMPTOMS.emotional },
        { key: 'cognitive',  label: 'Thought Patterns',    emoji: '🧠', subtitle: 'What kinds of thoughts have you been having?', symptoms: SYMPTOMS.cognitive },
      ];
      const cat = categories[state.step - 1];
      const selected = state[cat.key];

      card.insertAdjacentHTML('beforeend', `
        <div class="checker-question">
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4);">
            <span style="font-size:2rem;">${cat.emoji}</span>
            <div>
              <h2 class="checker-question-title">${cat.label}</h2>
              <p class="checker-question-subtitle">${cat.subtitle} Select all that apply.</p>
            </div>
          </div>
          <div class="pills-grid" id="pills-grid"></div>
        </div>
        <div class="checker-nav">
          <span class="selected-count" id="sel-count">${selected.length} selected</span>
          <div style="display:flex;gap:var(--space-3);">
            <button class="btn btn-secondary" id="back-btn">← Back</button>
            <button class="btn btn-primary" id="next-btn">
              ${state.step < 3 ? 'Next →' : 'Almost done →'}
            </button>
          </div>
        </div>
      `);

      const pillsGrid = card.querySelector('#pills-grid');
      const selCount  = card.querySelector('#sel-count');

      cat.symptoms.forEach(symptom => {
        const pill = document.createElement('div');
        pill.className = `pill-checkbox ${selected.includes(symptom.id) ? 'selected' : ''}`;
        pill.setAttribute('role', 'checkbox');
        pill.setAttribute('aria-checked', selected.includes(symptom.id) ? 'true' : 'false');
        pill.setAttribute('tabindex', '0');
        pill.innerHTML = `<div class="check-dot" aria-hidden="true"></div><span>${symptom.text}</span>`;

        const toggle = () => {
          if (symptom.crisis) {
            // Show crisis modal and also record selection
            showCrisisModal();
          }
          const idx = selected.indexOf(symptom.id);
          if (idx > -1) {
            selected.splice(idx, 1);
            pill.classList.remove('selected');
            pill.setAttribute('aria-checked', 'false');
          } else {
            selected.push(symptom.id);
            pill.classList.add('selected');
            pill.setAttribute('aria-checked', 'true');
          }
          selCount.textContent = `${selected.length} selected`;
        };

        pill.addEventListener('click', toggle);
        pill.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
        pillsGrid.appendChild(pill);
      });

      card.querySelector('#next-btn').addEventListener('click', () => {
        state.step++;
        render();
      });
      card.querySelector('#back-btn').addEventListener('click', () => {
        state.step--;
        render();
      });
    }

    else if (state.step === 4) {
      // Duration step
      card.insertAdjacentHTML('beforeend', `
        <div class="checker-question">
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4);">
            <span style="font-size:2rem;">⏱️</span>
            <div>
              <h2 class="checker-question-title">How long have you been feeling this way?</h2>
              <p class="checker-question-subtitle">Duration helps us understand the severity.</p>
            </div>
          </div>
          <div class="duration-options" id="duration-options"></div>
        </div>
        <div class="checker-nav">
          <button class="btn btn-secondary" id="back-btn">← Back</button>
          <button class="btn btn-primary" id="next-btn" ${!state.duration ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
            Generate My Compass Report 🧭
          </button>
        </div>
      `);

      const durationContainer = card.querySelector('#duration-options');
      const nextBtn = card.querySelector('#next-btn');

      DURATION_OPTIONS.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = `duration-btn ${state.duration === opt.id ? 'selected' : ''}`;
        btn.setAttribute('aria-pressed', state.duration === opt.id ? 'true' : 'false');
        btn.innerHTML = `<span class="d-icon">${opt.icon}</span> ${opt.text}`;
        btn.addEventListener('click', () => {
          state.duration = opt.id;
          durationContainer.querySelectorAll('.duration-btn').forEach(b => {
            b.classList.remove('selected');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('selected');
          btn.setAttribute('aria-pressed', 'true');
          nextBtn.removeAttribute('disabled');
          nextBtn.style.opacity = '1';
          nextBtn.style.cursor = 'pointer';
        });
        durationContainer.appendChild(btn);
      });

      card.querySelector('#back-btn').addEventListener('click', () => { state.step--; render(); });
      nextBtn.addEventListener('click', () => {
        if (state.duration) {
          // Calculate result
          const allSelected = [...state.physical, ...state.emotional, ...state.cognitive];
          const result = calculateCompassResult(allSelected, state.duration);
          saveLastResult(result);

          // Navigate to report
          onNavigate('report');
        }
      });
    }

    else if (state.step === 5) {
      // Review step
      const allSelected = [...state.physical, ...state.emotional, ...state.cognitive];
      const allSymptoms = [...SYMPTOMS.physical, ...SYMPTOMS.emotional, ...SYMPTOMS.cognitive];
      const selectedTexts = allSelected.map(id => allSymptoms.find(s => s.id === id)?.text).filter(Boolean);

      card.insertAdjacentHTML('beforeend', `
        <div class="checker-question">
          <h2 class="checker-question-title">Your selections (${allSelected.length})</h2>
          <p class="checker-question-subtitle">Review and then generate your report.</p>
          <div style="margin-top:var(--space-6);display:flex;flex-wrap:wrap;gap:var(--space-2);">
            ${selectedTexts.length > 0
              ? selectedTexts.map(t => `<span class="badge badge-sage" style="font-size:0.75rem;padding:0.35rem 0.75rem;">${t}</span>`).join('')
              : '<p style="color:var(--color-text-muted);font-style:italic;">No symptoms selected.</p>'
            }
          </div>
        </div>
        <div class="checker-nav">
          <button class="btn btn-secondary" id="back-btn">← Edit Answers</button>
          <button class="btn btn-primary btn-lg" id="generate-btn">
            Generate My Compass Report 🧭
          </button>
        </div>
      `);

      card.querySelector('#back-btn').addEventListener('click', () => { state.step = 4; render(); });
      card.querySelector('#generate-btn').addEventListener('click', () => {
        const result = calculateCompassResult(allSelected, state.duration);
        saveLastResult(result);
        onNavigate('report');
      });
    }

    wrapper.appendChild(card);
    page.appendChild(wrapper);
  }

  render();
  return page;
}
