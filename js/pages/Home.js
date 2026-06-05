// MindCompass — Home Page

function createHomePage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'page-wrapper bg-hero';

  const testimonials = [
    { quote: "I always thought what I was feeling was normal until I saw it laid out clearly. MindCompass helped me realise I needed actual help, not just to 'push through.'", name: "Priya, 22", role: "Engineering student, Pune", avatar: "🌸" },
    { quote: "My parents didn't understand what burnout even meant. Showing them my Compass Report started a real conversation. We found a therapist together.", name: "Arjun, 19", role: "First-year student, Delhi", avatar: "🌿" },
    { quote: "I'd been calling it stress for two years. It was anxiety. The breathing exercise alone helped me get through my board exams.", name: "Meera, 17", role: "Class 12 student, Mumbai", avatar: "🌻" },
  ];

  page.innerHTML = `
    <!-- HERO SECTION -->
    <section class="hero-section" id="hero">
      <div class="hero-bg-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-tagline">
            <span>🧭</span>
            <span>India's mental health compass for young adults</span>
          </div>
          <h1 class="hero-title">
            Your mind deserves<br/>
            <span class="highlight">the same care</span><br/>
            as your body.
          </h1>
          <p class="hero-description">
            In a world of academic pressure, social media comparison, and constant hustle — 
            feeling overwhelmed isn't weakness. It's human. Let's figure out what you're 
            feeling and what to do next.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg animate-pulseGlow" id="hero-cta" aria-label="Start your mental health symptom check">
              🧭 Start My Compass Check
            </button>
            <button class="btn btn-secondary btn-lg" id="hero-learn" aria-label="Learn more about mental health">
              Learn more ↓
            </button>
          </div>
          <div class="hero-scroll-hint">
            <span class="scroll-arrow">↓</span>
            <span>Scroll to understand why mental health matters</span>
          </div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="compass-illustration">
          <div class="compass-outer">
            <div class="compass-face">🧭</div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY MENTAL HEALTH MATTERS -->
    <section class="section-pad" id="why-section" style="background:white;">
      <div class="container">
        <div class="text-center reveal">
          <span class="section-label">Why it matters</span>
          <h2 class="section-title">Your mind needs maintenance<br/>just like your body.</h2>
          <p class="section-subtitle" style="margin:0 auto var(--space-12);">
            Taking care of your mental health in your teens and twenties sets the 
            foundation for the rest of your life — how you handle stress, build 
            relationships, and make choices.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-6);">
          ${[
            { icon: '🎓', title: 'Academic Pressure', desc: 'India has one of the most competitive academic environments in the world. The pressure to perform can take a serious toll on young minds — often silently.' },
            { icon: '📱', title: 'Social Media Reality Gap', desc: 'Constant comparison to curated highlight reels creates a distorted sense of reality. You are comparing your inside to everyone else\'s outside.' },
            { icon: '🌊', title: 'Feeling Overwhelmed is Valid', desc: 'Your nervous system responding to stress is biology, not weakness. But when it\'s chronic and unaddressed, it becomes a mental health issue that deserves real support.' },
            { icon: '🌱', title: 'Early Action Changes Everything', desc: 'Mental health challenges caught and addressed early have dramatically better outcomes. The decade of your teens and twenties is the most impactful window for intervention.' },
          ].map(c => `
            <div class="card reveal">
              <div style="font-size:2.5rem;margin-bottom:var(--space-4);">${c.icon}</div>
              <h3 style="font-size:var(--text-xl);font-weight:var(--font-bold);margin-bottom:var(--space-3);color:var(--slate-800);">${c.title}</h3>
              <p style="font-size:var(--text-sm);color:var(--color-text-muted);line-height:var(--leading-relaxed);">${c.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="section-pad bg-section-alt" id="stats-section">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-12);">
          <span class="section-label">The reality in India</span>
          <h2 class="section-title">You are not alone in this.</h2>
        </div>
        <div class="stats-grid">
          ${[
            { number: '1 in 7', label: 'Indians experience a mental health condition', suffix: '' },
            { number: '80%', label: 'of cases go undiagnosed or untreated', suffix: '' },
            { number: '7,500+', label: 'students in India took their lives in 2021 (NCRB)', suffix: '' },
            { number: '150M+', label: 'people in India need mental healthcare right now', suffix: '' },
          ].map(s => `
            <div class="stat-card reveal">
              <div class="stat-number">${s.number}</div>
              <div class="stat-label">${s.label}</div>
            </div>
          `).join('')}
        </div>
        <div style="text-align:center;margin-top:var(--space-8);">
          <p style="font-size:var(--text-sm);color:var(--color-text-muted);">Sources: WHO, NIMHANS, NCRB India 2021</p>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="section-pad" id="how-section" style="background:white;">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-4);">
          <span class="section-label">How MindCompass works</span>
          <h2 class="section-title">Three steps to clarity.</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            No clinical jargon. No scary forms. Just a gentle conversation with yourself.
          </p>
        </div>
        <div class="how-it-works-grid">
          ${[
            { num: '01', icon: '✅', title: 'Gentle Symptom Check', desc: 'Select phrases that resonate with you across physical, emotional, and cognitive symptoms. Takes 3–5 minutes. No right or wrong answers.' },
            { num: '02', icon: '🧭', title: 'Your Compass Report', desc: 'Our engine maps your responses to a personalized report — identifying whether you\'re showing signs of anxiety, depression, burnout, or a mix.' },
            { num: '03', icon: '🌱', title: 'Your Action Plan', desc: 'Get science-backed coping skills, healing activities, and clear guidance on when to seek professional help — all tailored to your results.' },
          ].map(s => `
            <div class="step-card reveal">
              <div class="step-number">${s.num}</div>
              <div class="step-icon">${s.icon}</div>
              <div class="step-title">${s.title}</div>
              <div class="step-desc">${s.desc}</div>
            </div>
          `).join('')}
        </div>
        <div class="text-center" style="margin-top:var(--space-12);">
          <button class="btn btn-primary btn-lg" id="how-cta">
            🧭 Begin My Compass Check
          </button>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section-pad bg-section-alt" id="testimonials-section">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-12);">
          <span class="section-label">Real voices</span>
          <h2 class="section-title">From people like you.</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            Anonymous experiences shared to help others feel less alone.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-6);">
          ${testimonials.map(t => `
            <div class="testimonial-card reveal">
              <p class="testimonial-quote">${t.quote}</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar" aria-hidden="true">${t.avatar}</div>
                <div>
                  <div class="testimonial-name">${t.name}</div>
                  <div class="testimonial-role">${t.role}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="section-pad" style="background:linear-gradient(160deg,var(--sage-700),var(--slate-900));text-align:center;">
      <div class="container reveal">
        <h2 style="font-family:var(--font-serif);font-size:var(--text-4xl);font-weight:var(--font-semibold);color:white;margin-bottom:var(--space-4);">
          Ready to understand yourself better?
        </h2>
        <p style="font-size:var(--text-xl);color:rgba(255,255,255,0.7);max-width:500px;margin:0 auto var(--space-8);line-height:var(--leading-relaxed);">
          It takes 3 minutes. It could change everything.
        </p>
        <button class="btn btn-primary btn-lg animate-pulseGlow" id="footer-cta" style="background:white;color:var(--sage-700);font-size:var(--text-lg);">
          🧭 Start Your Compass Check
        </button>
        <p style="margin-top:var(--space-6);font-size:var(--text-sm);color:rgba(255,255,255,0.45);">
          Free · Private · India-focused
        </p>
      </div>
    </section>
  `;

  // Events
  page.querySelector('#hero-cta').addEventListener('click', () => onNavigate('checker'));
  page.querySelector('#hero-learn').addEventListener('click', () => {
    document.getElementById('why-section')?.scrollIntoView({ behavior: 'smooth' });
  });
  page.querySelector('#how-cta').addEventListener('click', () => onNavigate('checker'));
  page.querySelector('#footer-cta').addEventListener('click', () => onNavigate('checker'));

  // Reveal animation on scroll
  const revealEls = page.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  return page;
}
