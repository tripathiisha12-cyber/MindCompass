// MindCompass — Main App Orchestrator
// Single-page application with vanilla JS routing

(function () {
  'use strict';

  // ===========================
  // APP STATE
  // ===========================
  let currentPage = 'home';
  let navbarEl = null;
  let mainContent = null;

  // ===========================
  // ROUTER
  // ===========================
  function navigateTo(page) {
    if (page === currentPage && currentPage !== 'report') {
      // Still scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    currentPage = page;

    // Update URL hash (for bookmarking/sharing)
    const hashMap = {
      home: '',
      checker: 'symptom-check',
      report: 'compass-report',
      portal: 'professional-portal',
      tracker: 'wellness-tracker',
    };
    window.location.hash = hashMap[page] || '';

    // Rebuild navbar with updated active state
    renderNavbar();

    // Render page content
    renderPage();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function getPageFromHash(hash) {
    const hashPageMap = {
      '#symptom-check': 'checker',
      '#compass-report': 'report',
      '#professional-portal': 'portal',
      '#wellness-tracker': 'tracker',
      '': 'home',
      '#': 'home',
    };
    return hashPageMap[hash] || 'home';
  }

  // ===========================
  // NAVBAR
  // ===========================
  function renderNavbar() {
    const existingNav = document.querySelector('.navbar');
    const existingMobileMenu = document.querySelector('.mobile-menu');
    if (existingNav) existingNav.remove();
    if (existingMobileMenu) existingMobileMenu.remove();

    navbarEl = createNavbar(currentPage, navigateTo);
    document.body.insertBefore(navbarEl, document.body.firstChild);
  }

  // ===========================
  // PAGE RENDERER
  // ===========================
  function renderPage() {
    if (!mainContent) return;

    // Fade out
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(8px)';
    mainContent.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    setTimeout(() => {
      // Clear previous page
      mainContent.innerHTML = '';

      let newPage;
      switch (currentPage) {
        case 'home':
          newPage = createHomePage(navigateTo);
          break;
        case 'checker':
          newPage = createSymptomCheckerPage(navigateTo);
          break;
        case 'report':
          newPage = createCompassReportPage(navigateTo);
          break;
        case 'portal':
          newPage = createProfessionalPortalPage(navigateTo);
          break;
        case 'tracker':
          newPage = createWellnessTrackerPage(navigateTo);
          break;
        default:
          newPage = createHomePage(navigateTo);
      }

      mainContent.appendChild(newPage);

      // Fade in
      requestAnimationFrame(() => {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
      });
    }, 200);
  }

  // ===========================
  // DISCLAIMER BANNER
  // ===========================
  function renderDisclaimer() {
    const existing = document.getElementById('disclaimer-banner');
    if (existing) return;

    const banner = createDisclaimerBanner();
    document.body.appendChild(banner);
  }

  // ===========================
  // INIT
  // ===========================
  function init() {
    // Set initial page from URL hash
    currentPage = getPageFromHash(window.location.hash);

    // Create main content wrapper
    mainContent = document.createElement('main');
    mainContent.id = 'main-content';
    mainContent.setAttribute('role', 'main');
    mainContent.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    document.getElementById('root').appendChild(mainContent);

    // Render components
    renderNavbar();
    renderDisclaimer();
    renderPage();

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
      const page = getPageFromHash(window.location.hash);
      if (page !== currentPage) {
        currentPage = page;
        renderNavbar();
        renderPage();
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });

    // Keyboard navigation: Skip to main content
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const firstFocusable = mainContent.querySelector('button, a, input, [tabindex="0"]');
        if (firstFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
