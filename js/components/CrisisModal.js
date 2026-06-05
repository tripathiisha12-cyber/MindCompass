// MindCompass — Crisis Modal Component

function createCrisisModal(onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'crisis-overlay';
  overlay.id = 'crisis-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'crisis-title');

  const hotlines = [
    {
      emoji: '📞',
      name: 'iCall — TISS Mumbai',
      number: '9152987821',
      desc: 'Mon–Sat, 8am–10pm | Free counselling'
    },
    {
      emoji: '🆘',
      name: 'Vandrevala Foundation',
      number: '1860-2662-345',
      desc: '24/7 | Free | All India'
    },
    {
      emoji: '💚',
      name: 'iCall WhatsApp',
      number: '9152987821',
      desc: 'WhatsApp available | Confidential'
    },
    {
      emoji: '🌺',
      name: 'AASRA',
      number: '9820466627',
      desc: '24/7 Crisis Helpline | Mumbai'
    },
    {
      emoji: '🩺',
      name: 'Snehi',
      number: '044-24640050',
      desc: 'Emotional support | Chennai'
    },
  ];

  overlay.innerHTML = `
    <div class="crisis-modal">
      <button class="crisis-close-top" aria-label="Close crisis modal" id="crisis-close-top">✕</button>
      <div class="crisis-modal-header">
        <span class="crisis-modal-icon">🤝</span>
        <h2 class="crisis-modal-title" id="crisis-title">You Are Not Alone</h2>
        <p class="crisis-modal-subtitle">
          Reaching out takes courage. These trained counsellors in India are here to listen — right now, for free, and without judgment.
        </p>
      </div>
      <div class="crisis-hotlines">
        ${hotlines.map(h => `
          <a href="tel:${h.number.replace(/-/g,'')}" class="crisis-hotline-card" aria-label="Call ${h.name}">
            <span class="hotline-emoji">${h.emoji}</span>
            <div class="hotline-info">
              <div class="hotline-name">${h.name}</div>
              <div class="hotline-number">${h.number}</div>
              <div class="hotline-desc">${h.desc}</div>
            </div>
            <span style="color:rgba(255,255,255,0.3);font-size:1.25rem">›</span>
          </a>
        `).join('')}
      </div>
      <div class="crisis-modal-footer">
        <button class="crisis-safe-btn" id="crisis-safe-btn">
          💚 I am safe — return to MindCompass
        </button>
        <p style="font-size:0.75rem;color:rgba(255,255,255,0.4);text-align:center;">
          Your information is never stored or shared. This is a safe, private space.
        </p>
      </div>
    </div>
  `;

  const close = () => {
    overlay.style.animation = 'fadeIn 0.2s ease reverse both';
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (onClose) onClose();
    }, 200);
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  overlay.querySelector('#crisis-close-top').addEventListener('click', close);
  overlay.querySelector('#crisis-safe-btn').addEventListener('click', close);

  // Trap focus
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  return overlay;
}

function showCrisisModal() {
  if (document.getElementById('crisis-overlay')) return;
  const modal = createCrisisModal();
  document.body.appendChild(modal);
  // Focus first focusable element
  setTimeout(() => {
    const firstFocusable = modal.querySelector('a, button');
    if (firstFocusable) firstFocusable.focus();
  }, 100);
}
