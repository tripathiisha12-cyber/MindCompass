// MindCompass — 5-4-3-2-1 Grounding Exercise

function createGroundingExercise() {
  const wrapper = document.createElement('div');
  wrapper.className = 'grounding-wrapper';

  const steps = [
    { num: 5, sense: 'See',   emoji: '👁️', instruction: 'Look around and name 5 things you can see right now.' },
    { num: 4, sense: 'Touch', emoji: '🖐️', instruction: 'Notice 4 things you can physically feel — your clothes, the chair, the floor.' },
    { num: 3, sense: 'Hear',  emoji: '👂', instruction: 'Listen carefully for 3 sounds around you — near or far.' },
    { num: 2, sense: 'Smell', emoji: '👃', instruction: 'Identify 2 things you can smell, or think of your favourite scents.' },
    { num: 1, sense: 'Taste', emoji: '👅', instruction: 'Notice 1 thing you can taste right now, or the taste in your mouth.' },
  ];

  let activeStep = 0;
  let done = [];

  function render() {
    const stepsHTML = steps.map((s, i) => `
      <div class="grounding-step ${i === activeStep ? 'active' : ''} ${done.includes(i) ? 'done' : ''}" 
           data-step="${i}" 
           role="button" 
           tabindex="0"
           aria-label="Grounding step ${i+1}: ${s.num} things you can ${s.sense}">
        <div class="grounding-step-num">${done.includes(i) ? '✓' : s.num}</div>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:0.9rem;color:#374151;margin-bottom:2px;">
            ${s.emoji} ${s.num} Things You Can ${s.sense}
          </div>
          <div style="font-size:0.8rem;color:#6b7280;">${s.instruction}</div>
        </div>
        ${i === activeStep ? `<span style="color:#a97448;font-size:1.25rem;">●</span>` : ''}
      </div>
    `).join('');

    wrapper.innerHTML = `
      <h3 style="font-size:1.1rem;font-weight:700;color:#1e3c2b;margin-bottom:0.25rem;">5-4-3-2-1 Grounding Exercise</h3>
      <p style="font-size:0.8rem;color:#6b7280;margin-bottom:1rem;">Click each step as you complete it. This brings you fully into the present moment.</p>
      <div class="grounding-steps">${stepsHTML}</div>
      <div style="margin-top:1rem;display:flex;gap:0.5rem;">
        <button class="btn btn-sm btn-primary" id="g-next" ${activeStep >= steps.length ? 'disabled' : ''}>Next Step →</button>
        <button class="btn btn-sm btn-secondary" id="g-reset">↺ Reset</button>
      </div>
      ${done.length === steps.length 
        ? '<p style="margin-top:1rem;color:#458a62;font-weight:600;font-size:0.9rem;">🌱 Complete! Notice how present you feel right now.</p>' 
        : ''}
    `;

    wrapper.querySelectorAll('.grounding-step').forEach(el => {
      const idx = parseInt(el.dataset.step);
      el.addEventListener('click', () => markDone(idx));
      el.addEventListener('keydown', e => { if(e.key==='Enter') markDone(idx); });
    });

    const nextBtn = wrapper.querySelector('#g-next');
    if (nextBtn) nextBtn.addEventListener('click', () => markDone(activeStep));

    const resetBtn = wrapper.querySelector('#g-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      activeStep = 0; done = []; render();
    });
  }

  function markDone(idx) {
    if (!done.includes(idx)) done.push(idx);
    activeStep = done.length < steps.length ? done.length : steps.length;
    render();
  }

  render();
  return wrapper;
}
