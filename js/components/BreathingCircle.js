// MindCompass — Breathing Circle (4-7-8 Technique)

function createBreathingCircle() {
  const wrapper = document.createElement('div');
  wrapper.className = 'breathing-wrapper';

  let phase = 'idle'; // idle | inhale | hold | exhale
  let timerInterval = null;
  let count = 0;
  let isRunning = false;
  let cycleCount = 0;

  const phases = [
    { name: 'inhale', label: 'Breathe In', duration: 4, color: 'linear-gradient(135deg, #458a62, #34704e)' },
    { name: 'hold',   label: 'Hold',       duration: 7, color: 'linear-gradient(135deg, #7c3aed, #6d28d9)' },
    { name: 'exhale', label: 'Breathe Out', duration: 8, color: 'linear-gradient(135deg, #0ea5e9, #0284c7)' },
  ];

  let phaseIndex = 0;

  wrapper.innerHTML = `
    <h3 style="font-size:1.25rem;font-weight:700;color:#1e3c2b;margin-bottom:0.5rem;text-align:center;">4-7-8 Breathing Exercise</h3>
    <p style="font-size:0.875rem;color:#6b7280;text-align:center;margin-bottom:1.5rem;max-width:300px;">
      This breathing pattern calms your nervous system. Try 3 complete cycles.
    </p>
    <div class="breathing-outer-ring">
      <div class="breathing-pulse-ring" id="b-ring"></div>
      <div class="breathing-circle" id="b-circle">
        <div style="text-align:center;">
          <div class="phase-text" id="b-phase-text">Tap to Start</div>
          <div class="phase-count" id="b-count">🫁</div>
        </div>
      </div>
    </div>
    <p class="breathing-instruction" id="b-instruction">Inhale 4 · Hold 7 · Exhale 8</p>
    <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
      <button class="btn btn-primary btn-sm" id="b-start" style="min-width:100px;">▶ Start</button>
      <button class="btn btn-secondary btn-sm" id="b-reset">↺ Reset</button>
    </div>
    <p style="font-size:0.75rem;color:#9ca3af;margin-top:0.75rem;text-align:center;" id="b-cycles"></p>
  `;

  const circle = wrapper.querySelector('#b-circle');
  const phaseText = wrapper.querySelector('#b-phase-text');
  const countEl = wrapper.querySelector('#b-count');
  const instructionEl = wrapper.querySelector('#b-instruction');
  const startBtn = wrapper.querySelector('#b-start');
  const resetBtn = wrapper.querySelector('#b-reset');
  const cyclesEl = wrapper.querySelector('#b-cycles');

  function runPhase() {
    const p = phases[phaseIndex];
    count = p.duration;
    phaseText.textContent = p.label;
    countEl.textContent = count;
    circle.style.background = p.color;

    if (p.name === 'inhale') {
      circle.style.transform = 'scale(1)';
      circle.style.transition = `transform ${p.duration}s ease-in, background 0.5s ease`;
      requestAnimationFrame(() => { circle.style.transform = 'scale(1.35)'; });
    } else if (p.name === 'hold') {
      circle.style.transition = 'background 0.5s ease';
      circle.style.transform = 'scale(1.35)';
    } else {
      circle.style.transition = `transform ${p.duration}s ease-out, background 0.5s ease`;
      requestAnimationFrame(() => { circle.style.transform = 'scale(1)'; });
    }

    instructionEl.textContent = p.label === 'Breathe In' ? 'Expand your belly as you inhale deeply...'
      : p.label === 'Hold' ? 'Hold gently... feel the stillness...'
      : 'Exhale slowly and completely through your mouth...';

    timerInterval = setInterval(() => {
      count--;
      countEl.textContent = count;
      if (count <= 0) {
        clearInterval(timerInterval);
        phaseIndex = (phaseIndex + 1) % phases.length;
        if (phaseIndex === 0) {
          cycleCount++;
          cyclesEl.textContent = `Cycle ${cycleCount} of 3 complete${
            cycleCount >= 3 ? ' 🎉 Well done!' : ''
          }`;
          if (cycleCount >= 3) {
            stopBreathing(true);
            return;
          }
        }
        runPhase();
      }
    }, 1000);
  }

  function startBreathing() {
    if (isRunning) return;
    isRunning = true;
    phaseIndex = 0;
    startBtn.textContent = '⏸ Pause';
    runPhase();
  }

  function stopBreathing(completed = false) {
    clearInterval(timerInterval);
    isRunning = false;
    if (completed) {
      phaseText.textContent = 'Complete!';
      countEl.textContent = '🌟';
      circle.style.background = 'linear-gradient(135deg, #458a62, #34704e)';
      circle.style.transform = 'scale(1)';
      instructionEl.textContent = 'Wonderful. Notice how you feel right now.';
      startBtn.textContent = '▶ Again';
    } else {
      startBtn.textContent = '▶ Resume';
    }
  }

  function resetBreathing() {
    clearInterval(timerInterval);
    isRunning = false;
    phaseIndex = 0;
    cycleCount = 0;
    phaseText.textContent = 'Tap to Start';
    countEl.textContent = '🫁';
    circle.style.background = 'linear-gradient(135deg, #458a62, #34704e)';
    circle.style.transform = 'scale(1)';
    circle.style.transition = 'background 0.5s ease';
    instructionEl.textContent = 'Inhale 4 · Hold 7 · Exhale 8';
    startBtn.textContent = '▶ Start';
    cyclesEl.textContent = '';
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) {
      stopBreathing(false);
    } else {
      startBreathing();
    }
  });

  resetBtn.addEventListener('click', resetBreathing);

  return wrapper;
}
