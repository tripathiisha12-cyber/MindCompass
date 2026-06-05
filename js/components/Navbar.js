// MindCompass — Navbar Component

function createNavbar(currentPage, onNavigate) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  const links = [
    { id: 'home',      label: 'Home' },
    { id: 'checker',   label: 'Symptom Check' },
    { id: 'portal',    label: 'Find Help' },
    { id: 'tracker',   label: 'Daily Tracker' },
  ];

  nav.innerHTML = `
    <div class="navbar-inner">
      <div class="navbar-logo" id="nav-logo" role="button" tabindex="0" aria-label="MindCompass home">
        <div class="logo-icon" aria-hidden="true">🧭</div>
        <div>
          <span style="display:block;line-height:1.2">MindCompass</span>
          <span class="logo-sub">Your mental health guide</span>
        </div>
      </div>
      <div class="navbar-links" role="menubar">
        ${links.map(l => `
          <button class="nav-link ${currentPage === l.id ? 'active' : ''}" 
            data-page="${l.id}" 
            role="menuitem"
            aria-current="${currentPage === l.id ? 'page' : 'false'}">
            ${l.label}
          </button>
        `).join('')}
      </div>
      <div class="navbar-right">
        <button class="crisis-nav-btn" id="nav-crisis-btn" aria-label="Emergency crisis resources">
          <span aria-hidden="true">🆘</span> Crisis Help
        </button>
        <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" role="menu">
      ${links.map(l => `
        <button class="mobile-nav-link" data-page="${l.id}" role="menuitem">${l.label}</button>
      `).join('')}
      <button class="mobile-nav-link" id="mobile-crisis-btn" style="color:#c0392b;font-weight:600;">🆘 Crisis Helplines</button>
    </div>
  `;

  // Events
  nav.querySelector('#nav-logo').addEventListener('click', () => onNavigate('home'));
  nav.querySelector('#nav-logo').addEventListener('keydown', e => { if(e.key==='Enter') onNavigate('home'); });
  nav.querySelector('#nav-crisis-btn').addEventListener('click', showCrisisModal);

  nav.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      onNavigate(btn.dataset.page);
      // Close mobile menu
      const menu = nav.querySelector('#mobile-menu');
      const burger = nav.querySelector('#hamburger');
      menu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  const hamburger = nav.querySelector('#hamburger');
  const mobileMenu = nav.querySelector('#mobile-menu');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  const mobileCrisis = nav.querySelector('#mobile-crisis-btn');
  if (mobileCrisis) mobileCrisis.addEventListener('click', showCrisisModal);

  return nav;
}
