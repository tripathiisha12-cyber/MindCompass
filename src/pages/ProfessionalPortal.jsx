import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ChevronDown, Phone, ExternalLink, Calendar, Users, HelpCircle, Check, ArrowRight, Compass } from 'lucide-react';
import { useApp } from '@context/AppContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const PLATFORMS = [
  {
    emoji: '📞',
    name: 'iCall — TISS Mumbai',
    desc: 'Free psychological counselling offered by trained professionals from the Tata Institute of Social Sciences. Mon–Sat, 8am–10pm.',
    tag: 'Free · Confidential',
    url: 'https://icallhelpline.org',
    color: 'var(--sage-600)'
  },
  {
    emoji: '🆘',
    name: 'Vandrevala Foundation',
    desc: '24/7 free mental health helpline available across India in multiple languages. Trained counsellors for crisis and ongoing support.',
    tag: 'Free · 24/7 · All India',
    url: 'https://www.vandrevalafoundation.com',
    color: '#7c3aed'
  },
  {
    emoji: '🌺',
    name: 'AASRA',
    desc: 'Non-profit crisis intervention centre for those in distress. Offers helpline support and in-person counselling in Mumbai.',
    tag: 'Free · Crisis Support',
    url: 'http://www.aasra.info',
    color: 'var(--crisis-red)'
  },
  {
    emoji: '💻',
    name: 'YourDOST',
    desc: "India's largest online mental wellness platform. Connect with counsellors via chat, audio, or video. Specialised student packages.",
    tag: 'Affordable · Online',
    url: 'https://yourdost.com',
    color: 'var(--earth-600)'
  },
  {
    emoji: '🏥',
    name: 'NIMHANS Bangalore',
    desc: "National Institute of Mental Health and Neuro Sciences — India's premier government mental health institution. Subsidised OPD consultations.",
    tag: 'Government · Subsidised',
    url: 'https://nimhans.ac.in',
    color: 'var(--slate-600)'
  },
  {
    emoji: '🌿',
    name: 'Snehi Foundation',
    desc: 'Emotional support helpline offering a listening ear for loneliness, stress, grief, and academic anxiety.',
    tag: 'Free · Emotional Support',
    url: 'https://www.snehi.org',
    color: 'var(--sage-500)'
  },
  {
    emoji: '🩺',
    name: 'Practo — Psychiatry',
    desc: 'Book virtual consultations or in-person visits with verified psychiatrists and clinical psychologists across major Indian cities.',
    tag: 'Book Appointments',
    url: 'https://www.practo.com/consult/mental-health',
    color: 'var(--slate-500)'
  },
  {
    emoji: '🤖',
    name: 'Wysa',
    desc: 'An AI-powered mental health chatbot made in India with access to licensed therapists. Free daily mood tracking and CBT modules.',
    tag: 'AI + Therapist Access',
    url: 'https://www.wysa.io',
    color: 'var(--lavender-600)'
  }
];

const FAQS = [
  {
    q: 'How much does therapy cost in India?',
    a: 'Therapy costs vary widely. Government hospitals (like NIMHANS) offer highly subsidised sessions for as low as ₹20–₹50. Private therapists usually charge between ₹1,000 and ₹3,000 per session. Online platforms like YourDOST start around ₹400–₹600 per session, and community helplines (iCall, Vandrevala) are completely free.'
  },
  {
    q: 'How do I tell my parents I need to see a therapist?',
    a: 'If you expect resistance, frame it in terms of physical symptoms first: "I have been having chronic sleep issues, exhaustion, and difficulty concentrating, and I would like to consult a professional to get better." Start with a family general physician, who can then write a referral, making the conversation feel clinical rather than stigmatized.'
  },
  {
    q: 'Will my consulting a therapist go on my academic or professional record?',
    a: 'No. Doctor-patient confidentiality applies. Your consults are completely confidential and cannot be accessed by colleges, employers, or family members without your explicit written consent.'
  },
  {
    q: 'What is the difference between a psychiatrist and a psychologist?',
    a: 'A Psychiatrist is a medical doctor (MBBS + MD Psychiatry) who can prescribe medication and diagnoses clinical conditions. A Psychologist (MA/MSc/PhD) specializes in talk therapies, counseling, and mental tests, but does not prescribe drugs.'
  },
  {
    q: 'What if I am in a crisis right now?',
    a: 'Do not wait. Call iCall at 9152987821, Vandrevala Foundation at 1860-2662-345, or the national emergency number 112. These are free, confidential, and available 24/7.'
  },
  {
    q: 'What should I say in my first therapy session?',
    a: 'You do not need to prepare anything. It is completely okay to say: "I have been feeling really overwhelmed recently and I do not know where to start." A good therapist will guide the conversation and help you map out your struggles.'
  }
];

const INDIAN_HOSPITALS = {
  delhi: [
    { name: 'IHBAS (Institute of Human Behaviour & Allied Sciences)', phone: '011-29562411', address: 'Dilshad Garden, New Delhi' },
    { name: 'AIIMS Psychiatry Emergency', phone: '011-26588500', address: 'Ansari Nagar, New Delhi' },
    { name: 'Safdarjung Hospital Psychiatry Dept', phone: '011-26165606', address: 'Ansari Nagar, New Delhi' }
  ],
  mumbai: [
    { name: 'Thane Mental Hospital', phone: '022-25822622', address: 'Thane West, Mumbai' },
    { name: 'KEM Hospital Psychiatry Department', phone: '022-24107000', address: 'Parel, Mumbai' },
    { name: 'Sion Hospital Psychiatry OPD', phone: '022-24076381', address: 'Sion, Mumbai' }
  ],
  bengaluru: [
    { name: 'NIMHANS Emergency Services', phone: '080-26995000', address: 'Hosur Road, Bengaluru' },
    { name: 'Victoria Hospital Psychiatry Block', phone: '080-26701150', address: 'Kalasipalya, Bengaluru' },
    { name: 'Bowring Hospital Psychiatry Department', phone: '080-26703294', address: 'Shivajinagar, Bengaluru' }
  ],
  chennai: [
    { name: 'Institute of Mental Health (IMH)', phone: '044-26426465', address: 'Medavakkam Tank Road, Kilpauk, Chennai' },
    { name: 'Rajiv Gandhi Govt General Hospital', phone: '044-25305000', address: 'Park Town, Chennai' },
    { name: 'Stanley Medical College Psychiatry', phone: '044-25281351', address: 'Royapuram, Chennai' }
  ],
  kolkata: [
    { name: 'Calcutta Pavlov Hospital', phone: '033-22861214', address: 'Gobra, Kolkata' },
    { name: 'Institute of Psychiatry (COE)', phone: '033-22238435', address: 'Bhowanipore, Kolkata' },
    { name: 'SSKM Hospital Psychiatry Dept', phone: '033-22041100', address: 'Acharya Jagadish Chandra Bose Road, Kolkata' }
  ]
};

export default function ProfessionalPortal() {
  const navigate = useNavigate();
  const { showCrisisModal } = useApp();
  const [openFaq, setOpenFaq] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFindNearbyHospitals = () => {
    setGeoLoading(true);
    setGeoError(null);

    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeoLoading(false);
        // Direct search query coordinates link
        window.open(`https://www.google.com/maps/search/?api=1&query=psychiatric+hospital+near+me&location=${latitude},${longitude}`, '_blank', 'noopener,noreferrer');
      },
      (error) => {
        setGeoLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError('Location permission denied. Please select a city manually from the fallback menu below.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError('Location details are currently unavailable.');
            break;
          case error.TIMEOUT:
            setGeoError('Location check timed out.');
            break;
          default:
            setGeoError('An unknown error occurred.');
        }
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="page-wrapper" style={{ background: 'var(--color-bg)' }}>
      {/* ── PORTAL HERO ── */}
      <div className="portal-hero">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(69,138,98,0.18), transparent 60%)', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
            <span className="section-label" style={{ background: 'rgba(69,138,98,0.2)', color: 'var(--sage-200)', border: '1px solid rgba(69,138,98,0.3)', padding: '0.4rem 1rem' }}>
              Professional Support
            </span>
          </motion.div>
          <motion.h1
            className="hero-title"
            style={{ color: 'white', margin: 'var(--space-4) 0', fontSize: 'var(--text-5xl)' }}
            variants={fadeUp} custom={1} initial="hidden" animate="visible"
          >
            Getting help is the<br />
            <span style={{ background: 'linear-gradient(135deg,#67a580,#97c4a8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              bravest choice
            </span> you can make.
          </motion.h1>
          <motion.p
            style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto', lineHeight: 'var(--leading-relaxed)' }}
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
          >
            Therapy and psychiatry are not signs of failure; they are evidence-based tools to heal, grow, and navigate life's challenges with support.
          </motion.p>
          <motion.button
            className="btn btn-crisis animate-pulseGlow"
            style={{ marginTop: 'var(--space-8)' }}
            onClick={showCrisisModal}
            variants={fadeUp} custom={3} initial="hidden" animate="visible"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <AlertCircle size={18} /> In Crisis Right Now? Call Immediately
          </motion.button>
        </div>
      </div>

      {/* ── EMERGENCY & NEARBY HOSPITAL FINDER ── */}
      <section className="section-pad" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div className="card" style={{ maxWidth: '640px', margin: '0 auto', borderLeft: '5px solid var(--crisis-red)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--slate-800)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>🚨</span> Find Nearby Psychiatric & Emergency Hospitals
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: '1.5', marginBottom: 'var(--space-5)' }}>
              If you or someone you know is experiencing a psychiatric crisis, immediate help is critical. 
              Click below to locate nearby emergency medical centers and government hospitals on Google Maps.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
              <button 
                className="btn btn-primary" 
                onClick={handleFindNearbyHospitals}
                disabled={geoLoading}
                style={{ background: 'var(--crisis-red)', borderColor: 'var(--crisis-red)', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {geoLoading ? 'Acquiring Coordinates...' : '🔍 Find Nearby Hospitals'}
              </button>
            </div>

            {geoError && (
              <div className="alert alert-danger" style={{ fontSize: 'var(--text-xs)', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
                <AlertCircle size={14} style={{ flexShrink: 0 }} />
                <span>{geoError}</span>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--gray-700)', marginBottom: 'var(--space-2)' }}>
                Fallback: Major Indian Metro Directories
              </label>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  backgroundColor: 'white',
                  marginBottom: 'var(--space-3)',
                  cursor: 'pointer'
                }}
              >
                <option value="">-- Choose City --</option>
                <option value="delhi">Delhi / NCR</option>
                <option value="mumbai">Mumbai</option>
                <option value="bengaluru">Bengaluru</option>
                <option value="chennai">Chennai</option>
                <option value="kolkata">Kolkata</option>
              </select>

              <AnimatePresence>
                {selectedCity && INDIAN_HOSPITALS[selectedCity] && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                      {INDIAN_HOSPITALS[selectedCity].map((h, i) => (
                        <div 
                          key={i} 
                          style={{ 
                            padding: 'var(--space-4)', 
                            background: 'white', 
                            border: '1px solid var(--gray-200)', 
                            borderRadius: 'var(--radius-md)', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            gap: 'var(--space-3)' 
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 750, fontSize: 'var(--text-sm)', color: 'var(--slate-800)' }}>{h.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '3px' }}>📍 {h.address}</div>
                          </div>
                          <a 
                            href={`tel:${h.phone.replace(/-/g, '')}`}
                            className="btn btn-secondary btn-sm"
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '4px', 
                              whiteSpace: 'nowrap', 
                              border: '1px solid var(--sage-200)', 
                              color: 'var(--sage-700)', 
                              background: 'var(--sage-50)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 600
                            }}
                          >
                            <Phone size={12} /> Call: {h.phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── PSYCHIATRIST VS PSYCHOLOGIST ── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <span className="section-label">Demystifying the process</span>
            <h2 className="section-title">Who should I see?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Both professionals treat mental health, but their methods and training differ.
            </p>
          </div>

          <div className="portal-card-grid">
            <motion.div
              className="pro-type-card psychiatrist"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              whileHover={{ y: -6 }}
            >
              <span className="pro-type-icon">🩺</span>
              <div className="pro-type-title">Psychiatrist</div>
              <div className="pro-type-subtitle">Medical Doctor (MBBS + MD Psychiatry)</div>
              <ul className="pro-type-list" style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Can diagnose medical and psychiatric conditions',
                  'Prescribes and manages medication treatments',
                  'Focuses on neurobiology and chemistry',
                  'Best for: Clinical conditions (Severe depression, Bipolar, OCD, Psychosis)',
                  'In India: Available in large public hospitals, private clinics, NIMHANS'
                ].map((item, index) => (
                  <li key={index} className="pro-type-list-item" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <Check size={16} style={{ color: 'var(--sage-500)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.875rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="pro-type-card psychologist"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              whileHover={{ y: -6 }}
            >
              <span className="pro-type-icon">🧠</span>
              <div className="pro-type-title">Psychologist / Therapist</div>
              <div className="pro-type-subtitle">MA / MSc / PhD in Counseling or Clinical Psychology</div>
              <ul className="pro-type-list" style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Provides evidence-based talk therapies (CBT, DBT, psychoanalysis)',
                  'Teaches behavioral modifications and coping tools',
                  'Cannot prescribe medications',
                  'Best for: Anxiety, stress, relationship struggles, grief, mild low mood',
                  'In India: Accessed privately, via iCall, YourDOST, Snehi'
                ].map((item, index) => (
                  <li key={index} className="pro-type-list-item" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <Check size={16} style={{ color: 'var(--sage-500)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.875rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FIRST APPOINTMENT TIMELINE ── */}
      <section className="section-pad bg-section-alt">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <span className="section-label">What to expect</span>
            <h2 className="section-title">Your first session.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Knowing the steps in advance can take away some of the initial anxiety.
            </p>
          </div>

          <div className="container-sm">
            <div className="timeline">
              {[
                { icon: <Calendar size={18} />, title: 'Book the Appointment', desc: 'Book online (e.g. Practo, YourDOST) or register at a hospital. You do not need a GP referral to see a psychologist.' },
                { icon: <Check size={18} />, title: 'Intake and Background', desc: 'You will answer basic questions about your sleep, appetite, medical history, family background, and current struggles.' },
                { icon: <Users size={18} />, title: 'The Assessment Conversation', desc: 'They will ask open questions like "What has been going on recently?" and "How is this affecting your daily functioning?". Be as open as you feel comfortable.' },
                { icon: <ArrowRight size={18} />, title: 'Goal Setting & Treatment Plan', desc: 'At the end of the first or second session, they will outline a collaborative plan (frequency of therapy, techniques, or medical consults).' },
                { icon: '🌱', title: 'Commitment to Growth', desc: 'Therapy is an active process that happens between sessions. Expect 4–8 sessions before noticing significant emotional improvements.' }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
                  style={{ marginBottom: 'var(--space-8)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: 'var(--sage-600)', flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--slate-800)', marginBottom: 'var(--space-2)' }}>{step.title}</h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESOURCES GRID ── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <span className="section-label">Find help in India</span>
            <h2 className="section-title">Verified mental health resources.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Legitimate, confidential, and accessible online or offline support options.
            </p>
          </div>

          <motion.div
            className="portal-card-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          >
            {PLATFORMS.map((p) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-card"
                variants={fadeUp}
                whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>{p.emoji}</div>
                <div className="platform-name" style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--slate-800)', marginBottom: 'var(--space-2)' }}>{p.name}</div>
                <div className="platform-desc" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-4)' }}>{p.desc}</div>
                <div className="platform-tag" style={{ color: p.color, fontWeight: 600, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {p.tag} <ExternalLink size={12} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ADVOCACY CARDS ── */}
      <section className="section-pad bg-section-alt">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
            <span className="section-label">Self-advocacy</span>
            <h2 className="section-title">What to say to your counselor.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Talking about your feelings is tough. These template templates can serve as a simple guide.
            </p>
          </div>

          <div className="container-sm">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { prompt: '"I have been feeling…"', tip: 'Be specific about length. "I have been feeling deeply fatigued/restless/anxious for the past three weeks and it is not fading."' },
                { prompt: '"It is impacting my functioning because…"', tip: 'Point to concrete situations: "I am unable to submit college assignments on time," or "I am withdrawing from my friends."' },
                { prompt: '"I would like to explore…"', tip: 'Indicate your preferences: "I would prefer therapy and lifestyle edits first," or "I want to explore if diagnosis/meds might help."' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="card"
                  style={{ padding: 'var(--space-5)' }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  whileHover={{ scale: 1.01 }}
                >
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--sage-700)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{item.prompt}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>{item.tip}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
            <span className="section-label">Common questions</span>
            <h2 className="section-title">Your questions answered.</h2>
          </div>

          <div className="container-sm">
            <div id="faq-container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="accordion-item" style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <button
                      className={`accordion-header ${isOpen ? 'open' : ''}`}
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 'var(--space-4) var(--space-5)', border: 'none', background: 'none', textAlign: 'left', fontWeight: 600, color: 'var(--slate-800)', cursor: 'pointer' }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <HelpCircle size={16} style={{ color: 'var(--sage-500)' }} />
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="accordion-content" style={{ padding: '0 var(--space-5) var(--space-5) var(--space-5)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background: 'linear-gradient(135deg,var(--sage-700),var(--slate-900))', padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', color: 'white', marginBottom: 'var(--space-4)', fontWeight: 600 }}>
            Not sure what support is right?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-8)', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 'var(--leading-normal)' }}>
            Take our 3-minute symptom check to get a personalized baseline and action guide.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/symptom-check')} style={{ background: 'white', color: 'var(--sage-700)', fontWeight: 700 }}>
            <Compass size={18} /> Take the Symptom Check
          </button>
        </div>
      </div>
    </div>
  );
}
