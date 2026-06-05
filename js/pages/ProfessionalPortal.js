// MindCompass — Professional Portal Page (India-focused)

function createProfessionalPortalPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'page-wrapper';

  const platforms = [
    {
      emoji: '📞',
      name: 'iCall — TISS Mumbai',
      desc: 'Free psychological counselling offered by trained counsellors from the Tata Institute of Social Sciences. Available Mon–Sat, 8am–10pm.',
      tag: 'Free · Confidential',
      tagColor: 'var(--sage-700)',
      url: 'https://icallhelpline.org',
      badge: 'badge-sage',
    },
    {
      emoji: '🆘',
      name: 'Vandrevala Foundation',
      desc: '24/7 free mental health helpline available across India in multiple languages. Trained counsellors for crisis and ongoing support.',
      tag: 'Free · 24/7 · All India',
      tagColor: '#7c3aed',
      url: 'https://www.vandrevalafoundation.com',
      badge: 'badge-lavender',
    },
    {
      emoji: '🌺',
      name: 'AASRA',
      desc: 'Non-profit crisis intervention centre for those in distress. Offers helpline support and in-person counselling in Mumbai.',
      tag: 'Free · Crisis Support',
      tagColor: 'var(--crisis-red)',
      url: 'http://www.aasra.info',
      badge: 'badge-rose',
    },
    {
      emoji: '💻',
      name: 'YourDOST',
      desc: "India's largest online mental wellness platform. Connect with counsellors via chat, audio, or video. Affordable and accessible.",
      tag: 'Affordable · Online',
      tagColor: 'var(--earth-600)',
      url: 'https://yourdost.com',
      badge: 'badge-earth',
    },
    {
      emoji: '🏥',
      name: 'NIMHANS Bangalore',
      desc: 'National Institute of Mental Health and Neuro Sciences — India\'s premier government mental health institution. Highly subsidised care.',
      tag: 'Government · Subsidised',
      tagColor: 'var(--slate-600)',
      url: 'https://nimhans.ac.in',
      badge: 'badge-sage',
    },
    {
      emoji: '🌿',
      name: 'Snehi Foundation',
      desc: 'Emotional support helpline offering a listening ear for loneliness, grief, and depression. Chennai-based with national reach.',
      tag: 'Free · Emotional Support',
      tagColor: 'var(--sage-700)',
      url: 'https://www.snehi.org',
      badge: 'badge-sage',
    },
    {
      emoji: '🔬',
      name: 'Practo — Mental Health',
      desc: 'Book appointments with verified psychiatrists and psychologists across India. Online and in-clinic options available.',
      tag: 'Book Appointments',
      tagColor: 'var(--slate-600)',
      url: 'https://www.practo.com/consult/mental-health',
      badge: 'badge-sage',
    },
    {
      emoji: '📱',
      name: 'Wysa',
      desc: 'An AI-powered mental health chatbot with access to licensed therapists. Available 24/7. Trusted by millions in India.',
      tag: 'AI + Therapist Access',
      tagColor: 'var(--lavender-600)',
      url: 'https://www.wysa.io',
      badge: 'badge-lavender',
    },
  ];

  const faqs = [
    {
      q: 'How much does therapy cost in India?',
      a: 'Costs vary widely. Government hospitals (like NIMHANS) often provide free or heavily subsidised care. Online platforms like YourDOST start from ₹300–₹500 per session. Private therapists typically charge ₹1,000–₹3,000 per session. iCall (TISS) and Vandrevala are completely free.'
    },
    {
      q: 'How do I ask my parents to take me to therapy in India?',
      a: 'Frame it as a health issue, not a "mental" one. Say: "I\'ve been having persistent stress that is affecting my sleep and focus. I\'d like to talk to a doctor about it." Start with a family physician — they can refer you. You can also start online with iCall, which is completely private.'
    },
    {
      q: 'Will it go on my "record" or affect my future?',
      a: 'No. Mental health consultations are covered by doctor-patient confidentiality. They cannot be accessed by employers, universities, or anyone else without your explicit written consent. Your privacy is legally protected in India.'
    },
    {
      q: 'What is the difference between a psychiatrist and a psychologist?',
      a: 'A Psychiatrist is a medical doctor (MBBS + MD Psychiatry) who can diagnose mental health conditions AND prescribe medication. A Psychologist (MA/MSc/PhD in Psychology) provides talk therapy and psychological assessment but cannot prescribe drugs. Many people benefit from working with both.'
    },
    {
      q: 'What if I am in a crisis right now?',
      a: 'Please call iCall at 9152987821 or Vandrevala Foundation at 1860-2662-345. Both are free and available now. If you are in immediate danger, go to the nearest government hospital emergency room and ask for the psychiatry team.'
    },
    {
      q: 'What should I say in my first therapy session?',
      a: 'You don\'t need to have it figured out. Simply say: "I\'ve been struggling with [anxiety/low mood/stress] and I\'m not sure how to handle it." A good therapist will guide you from there. You are allowed to not know what to say — that\'s what the session is for.'
    },
  ];

  page.innerHTML = `
    <!-- Portal Hero -->
    <div class="portal-hero">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 50%, rgba(69,138,98,0.2), transparent 60%);pointer-events:none;"></div>
      <div class="container" style="position:relative;z-index:1;text-align:center;">
        <div class="animate-fadeSlideUp" style="animation-delay:0s;">
          <span class="section-label" style="background:rgba(69,138,98,0.2);color:var(--sage-300);border:1px solid rgba(69,138,98,0.3);">Professional Support</span>
        </div>
        <h1 class="animate-fadeSlideUp delay-100" style="font-family:var(--font-serif);font-size:var(--text-5xl);font-weight:600;color:white;margin:var(--space-4) 0;">
          Getting help is the<br/>
          <span style="background:linear-gradient(135deg,#67a580,#97c4a8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">bravest thing</span> you can do.
        </h1>
        <p class="animate-fadeSlideUp delay-200" style="font-size:var(--text-xl);color:rgba(255,255,255,0.65);max-width:560px;margin:0 auto;line-height:var(--leading-relaxed);">
          Therapy and psychiatry are not for "crazy people." They are for people who take 
          their mental health as seriously as their physical health.
        </p>
        <button class="btn btn-crisis animate-pulseGlow animate-fadeSlideUp delay-300" 
          id="portal-crisis-btn" 
          style="margin-top:var(--space-8);"
          aria-label="Open Indian crisis helplines">
          🆘 In Crisis Right Now? Get Immediate Help
        </button>
      </div>
    </div>

    <!-- Psychiatrist vs Psychologist -->
    <section class="section-pad" style="background:white;">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-12);">
          <span class="section-label">Demystifying the process</span>
          <h2 class="section-title">Who should I see?</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            Understanding the difference helps you find the right support faster.
          </p>
        </div>
        <div class="portal-card-grid reveal">
          <div class="pro-type-card psychiatrist">
            <span class="pro-type-icon">🔬</span>
            <div class="pro-type-title">Psychiatrist</div>
            <div class="pro-type-subtitle">Medical Doctor (MBBS + MD Psychiatry)</div>
            <ul class="pro-type-list">
              ${[
                'Can diagnose mental health conditions',
                'Prescribes and manages medication',
                'Assesses brain chemistry and neurology',
                'Best for: Severe depression, bipolar, schizophrenia, OCD',
                'In India: Consult via NIMHANS, government hospitals, or Practo',
              ].map(i => `<li class="pro-type-list-item"><span>✓</span><span>${i}</span></li>`).join('')}
            </ul>
          </div>
          <div class="pro-type-card psychologist">
            <span class="pro-type-icon">🧠</span>
            <div class="pro-type-title">Psychologist / Therapist</div>
            <div class="pro-type-subtitle">MA/MSc/PhD in Psychology or Counselling</div>
            <ul class="pro-type-list">
              ${[
                'Provides talk therapy (CBT, DBT, etc.)',
                'Teaches coping skills and emotional regulation',
                'Cannot prescribe medication',
                'Best for: Anxiety, mild-moderate depression, stress, grief, relationships',
                'In India: iCall, YourDOST, Wysa, or private practice',
              ].map(i => `<li class="pro-type-list-item"><span>✓</span><span>${i}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- First Appointment -->
    <section class="section-pad bg-section-alt">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-12);">
          <span class="section-label">What to expect</span>
          <h2 class="section-title">Your first appointment.</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            Most people who hesitate to seek help have never been told what actually happens. Here's exactly what to expect.
          </p>
        </div>
        <div class="container-sm">
          <div class="timeline reveal">
            ${[
              { icon: '📞', title: 'Book the Appointment', desc: 'Call, book online (Practo, YourDOST), or walk into a government hospital\'s psychiatry OPD. You do not need a referral to see a psychologist.' },
              { icon: '📝', title: 'Brief Intake Form', desc: 'You\'ll fill out a short form about your current symptoms, medical history, and what brings you in. This is private and confidential.' },
              { icon: '🗣️', title: 'The Conversation', desc: 'Your therapist or doctor will ask open questions: "What\'s been happening?", "How long have you felt this way?". You don\'t need to have the perfect answers — just be honest.' },
              { icon: '🎯', title: 'Assessment & Plan', desc: 'Based on your conversation, they will give you their initial impression and suggest a plan — which might be more sessions, a referral, or a lifestyle change to start.' },
              { icon: '🌱', title: 'Follow-Up', desc: 'You\'ll schedule follow-up appointments. Progress takes time — most people start noticing change within 4–8 sessions. It\'s a marathon, not a sprint.' },
            ].map(step => `
              <div class="timeline-item reveal">
                <div style="display:flex;align-items:flex-start;gap:var(--space-4);">
                  <div style="width:44px;height:44px;border-radius:var(--radius-full);background:var(--sage-100);display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0;">${step.icon}</div>
                  <div>
                    <div style="font-weight:700;font-size:var(--text-base);color:var(--slate-800);margin-bottom:var(--space-2);">${step.title}</div>
                    <div style="font-size:var(--text-sm);color:var(--color-text-muted);line-height:var(--leading-relaxed);">${step.desc}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Resources Grid -->
    <section class="section-pad" style="background:white;">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-12);">
          <span class="section-label">Find help in India</span>
          <h2 class="section-title">Verified mental health resources.</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            All resources below are legitimate, privacy-respecting, and India-accessible.
          </p>
        </div>
        <div class="portal-card-grid reveal" id="platforms-grid">
          ${platforms.map(p => `
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" 
               class="platform-card" 
               aria-label="Open ${p.name} website">
              <div class="platform-emoji">${p.emoji}</div>
              <div class="platform-name">${p.name}</div>
              <div class="platform-desc">${p.desc}</div>
              <div class="platform-tag" style="color:${p.tagColor};">
                ${p.tag} ↗
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Self-Advocacy Tips -->
    <section class="section-pad bg-section-alt">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-10);">
          <span class="section-label">Self-advocacy</span>
          <h2 class="section-title">What to say to your doctor.</h2>
        </div>
        <div class="container-sm">
          <div style="display:flex;flex-direction:column;gap:var(--space-4);" class="reveal">
            ${[
              { prompt: '"I have been feeling…"', tip: 'Describe your primary symptom in plain language. "I\'ve been feeling persistently sad/anxious/exhausted for [X weeks]."' },
              { prompt: '"It affects my daily life by…"', tip: 'Give concrete examples: "I can\'t concentrate in class," "I\'ve been avoiding social situations," "I can\'t sleep."' },
              { prompt: '"I feel this most when…"', tip: 'Identify triggers if you know them. "Mornings are the hardest," or "It gets worse around exams."' },
              { prompt: '"I have tried…"', tip: 'Mention anything you\'ve already tried: journaling, exercise, talking to friends. This helps them understand your baseline.' },
              { prompt: '"I am hoping for…"', tip: 'It\'s okay to say: "I just want to understand what\'s happening" or "I\'d like to explore therapy before medication."' },
            ].map(item => `
              <div class="card" style="padding:var(--space-5);">
                <div style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--sage-700);font-weight:600;margin-bottom:var(--space-2);">${item.prompt}</div>
                <div style="font-size:var(--text-sm);color:var(--color-text-muted);line-height:var(--leading-relaxed);">${item.tip}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-pad" style="background:white;">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-10);">
          <span class="section-label">Common questions</span>
          <h2 class="section-title">Your questions answered.</h2>
        </div>
        <div class="container-sm">
          <div id="faq-container" class="reveal">
            ${faqs.map((faq, i) => `
              <div class="accordion-item">
                <button class="accordion-header" id="faq-header-${i}" 
                  aria-expanded="false" 
                  aria-controls="faq-content-${i}">
                  ${faq.q}
                  <span class="accordion-chevron" aria-hidden="true">▾</span>
                </button>
                <div class="accordion-content" id="faq-content-${i}" role="region" aria-labelledby="faq-header-${i}">
                  ${faq.a}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <div style="background:linear-gradient(135deg,var(--sage-700),var(--slate-900));padding:var(--space-12) 0;text-align:center;">
      <div class="container">
        <h3 style="font-family:var(--font-serif);font-size:var(--text-3xl);color:white;margin-bottom:var(--space-4);">
          Not sure where to start?
        </h3>
        <p style="color:rgba(255,255,255,0.65);margin-bottom:var(--space-8);max-width:400px;margin-left:auto;margin-right:auto;">
          Take our 3-minute symptom check to get a personalized starting point.
        </p>
        <button class="btn btn-primary btn-lg" id="portal-checker-btn" style="background:white;color:var(--sage-700);">
          🧭 Take the Symptom Check
        </button>
      </div>
    </div>
  `;

  // Events
  page.querySelector('#portal-crisis-btn').addEventListener('click', showCrisisModal);
  page.querySelector('#portal-checker-btn').addEventListener('click', () => onNavigate('checker'));

  // FAQ Accordion
  page.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const isOpen = header.classList.contains('open');
      // Close all
      page.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('open');
        h.setAttribute('aria-expanded', 'false');
        h.nextElementSibling?.classList.remove('open');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        header.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        header.nextElementSibling?.classList.add('open');
      }
    });
  });

  // Reveal animations
  const revealEls = page.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  return page;
}
