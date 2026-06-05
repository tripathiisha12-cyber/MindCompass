// MindCompass — Disclaimer Banner

function createDisclaimerBanner() {
  const banner = document.createElement('div');
  banner.className = 'disclaimer-banner';
  banner.setAttribute('role', 'complementary');
  banner.setAttribute('aria-label', 'Important disclaimer');
  banner.id = 'disclaimer-banner';

  banner.innerHTML = `
    <span>
      ⚕️ <strong>Educational purposes only.</strong> Not a substitute for professional medical advice. 
      If you are in crisis — <button class="disclaimer-link" id="disclaimer-crisis-btn" aria-label="Open crisis helplines">click here for immediate help →</button>
    </span>
    <button class="disclaimer-dismiss" id="disclaimer-dismiss" aria-label="Dismiss disclaimer">✕</button>
  `;

  banner.querySelector('#disclaimer-crisis-btn').addEventListener('click', showCrisisModal);
  banner.querySelector('#disclaimer-dismiss').addEventListener('click', () => {
    banner.style.display = 'none';
    document.body.style.paddingBottom = '0';
  });

  return banner;
}
