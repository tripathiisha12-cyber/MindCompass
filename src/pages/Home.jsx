import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowDown, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const TESTIMONIALS = [
  { quote: "I always thought what I was feeling was normal until I saw it laid out clearly. MindCompass helped me realise I needed actual help, not just to 'push through.'", name: 'Priya, 22', role: 'Engineering student, Pune', avatar: '🌸' },
  { quote: "My parents didn't understand what burnout even meant. Showing them my Compass Report started a real conversation. We found a therapist together.", name: 'Arjun, 19', role: 'First-year student, Delhi', avatar: '🌿' },
  { quote: "I'd been calling it stress for two years. It was anxiety. The breathing exercise alone helped me get through my board exams.", name: 'Meera, 17', role: 'Class 12 student, Mumbai', avatar: '🌻' },
];

const WHY_CARDS = [
  { icon: '🎓', title: 'Academic Pressure', desc: "India has one of the most competitive academic environments in the world. The pressure to perform can take a serious toll on young minds — often silently." },
  { icon: '📱', title: 'Social Media Reality Gap', desc: "Constant comparison to curated highlight reels creates a distorted sense of reality. You are comparing your inside to everyone else's outside." },
  { icon: '🌊', title: 'Feeling Overwhelmed is Valid', desc: "Your nervous system responding to stress is biology, not weakness. But when it's chronic and unaddressed, it becomes a mental health issue that deserves real support." },
  { icon: '🌱', title: 'Early Action Changes Everything', desc: "Mental health challenges caught and addressed early have dramatically better outcomes. Your teens and twenties are the most impactful window for intervention." },
];

const STATS = [
  { number: '1 in 7', label: 'Indians experience a mental health condition' },
  { number: '80%', label: 'of cases go undiagnosed or untreated' },
  { number: '7,500+', label: 'students in India took their lives in 2021 (NCRB)' },
  { number: '150M+', label: 'people in India need mental healthcare right now' },
];

const HOW_STEPS = [
  { num: '01', icon: '✅', title: 'Gentle Symptom Check', desc: 'Select phrases that resonate with you across physical, emotional, and cognitive symptoms. Takes 3–5 minutes. No right or wrong answers.' },
  { num: '02', icon: '🧭', title: 'Your Compass Report', desc: "Our engine maps your responses to a personalized report — identifying whether you're showing signs of anxiety, depression, burnout, or a mix." },
  { num: '03', icon: '🌱', title: 'Your Action Plan', desc: 'Get science-backed coping skills, healing activities, and clear guidance on when to seek professional help — all tailored to your results.' },
];

function RevealSection({ children, className = '' }) {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      {/* ── HERO ── */}
      <section className="hero-section bg-hero">
        <div className="hero-bg-blobs" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        <div className="container">
          <div className="hero-content">
            <motion.div className="hero-tagline" variants={fadeUp} custom={0} initial="hidden" animate="visible">
              <span>🧭</span>
              <span>India's mental health compass for young adults</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={fadeUp} custom={1} initial="hidden" animate="visible">
              Your mind deserves<br />
              <span className="highlight">the same care</span><br />
              as your body.
            </motion.h1>

            <motion.p className="hero-description" variants={fadeUp} custom={2} initial="hidden" animate="visible">
              In a world of academic pressure, social media comparison, and constant hustle —
              feeling overwhelmed isn't weakness. It's human. Let's figure out what you're
              feeling and what to do next.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp} custom={3} initial="hidden" animate="visible">
              <motion.button
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/symptom-check')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Start your mental health symptom check"
              >
                <Compass size={20} />
                Start My Compass Check
              </motion.button>
              <motion.button
                className="btn btn-secondary btn-lg"
                onClick={() => document.getElementById('why-section')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn more <ArrowDown size={16} />
              </motion.button>
            </motion.div>

            <motion.div className="hero-scroll-hint" variants={fadeUp} custom={5} initial="hidden" animate="visible">
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ArrowDown size={16} />
              </motion.span>
              <span>Scroll to understand why mental health matters</span>
            </motion.div>
          </div>
        </div>

        {/* Compass illustration */}
        <div className="hero-visual" aria-hidden="true">
          <div className="compass-illustration">
            <motion.div
              className="compass-outer"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <div className="compass-face" style={{ fontSize: '5rem' }}>🧭</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY MENTAL HEALTH ── */}
      <section className="section-pad" id="why-section" style={{ background: 'white' }}>
        <div className="container">
          <RevealSection className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <motion.div variants={fadeUp}>
              <span className="section-label">Why it matters</span>
              <h2 className="section-title" style={{ marginTop: 'var(--space-3)' }}>
                Your mind needs maintenance<br />just like your body.
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto var(--space-12)' }}>
                Taking care of your mental health in your teens and twenties sets the
                foundation for the rest of your life.
              </p>
            </motion.div>
          </RevealSection>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'var(--space-6)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {WHY_CARDS.map((c) => (
              <motion.div key={c.title} className="card" variants={fadeUp} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>{c.icon}</div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--slate-800)' }}>{c.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section-pad bg-section-alt">
        <div className="container">
          <motion.div className="text-center" style={{ marginBottom: 'var(--space-12)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <span className="section-label">The reality in India</span>
              <h2 className="section-title" style={{ marginTop: 'var(--space-3)' }}>You are not alone in this.</h2>
            </motion.div>
          </motion.div>
          <motion.div className="stats-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            {STATS.map((s) => (
              <motion.div key={s.number} className="stat-card" variants={fadeUp} whileHover={{ y: -4 }}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-8)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            Sources: WHO, NIMHANS, NCRB India 2021
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <motion.div className="text-center" style={{ marginBottom: 'var(--space-4)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <span className="section-label">How MindCompass works</span>
              <h2 className="section-title" style={{ marginTop: 'var(--space-3)' }}>Three steps to clarity.</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                No clinical jargon. No scary forms. Just a gentle conversation with yourself.
              </p>
            </motion.div>
          </motion.div>
          <motion.div className="how-it-works-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            {HOW_STEPS.map((s) => (
              <motion.div key={s.num} className="step-card" variants={fadeUp} whileHover={{ y: -6 }}>
                <div className="step-number">{s.num}</div>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center" style={{ marginTop: 'var(--space-12)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <motion.button className="btn btn-primary btn-lg" onClick={() => navigate('/symptom-check')}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Compass size={20} /> Begin My Compass Check
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad bg-section-alt">
        <div className="container">
          <motion.div className="text-center" style={{ marginBottom: 'var(--space-12)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <span className="section-label">Real voices</span>
              <h2 className="section-title" style={{ marginTop: 'var(--space-3)' }}>From people like you.</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Anonymous experiences shared to help others feel less alone.
              </p>
            </motion.div>
          </motion.div>
          <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'var(--space-6)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} className="testimonial-card" variants={fadeUp} whileHover={{ y: -4 }}>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="section-pad" style={{ background: 'linear-gradient(160deg,var(--sage-700),var(--slate-900))', textAlign: 'center' }}>
        <motion.div className="container"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-4xl)', fontWeight: 600, color: 'white', marginBottom: 'var(--space-4)' }}>
            Ready to understand yourself better?
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto var(--space-8)', lineHeight: 'var(--leading-relaxed)' }}>
            It takes 3 minutes. It could change everything.
          </motion.p>
          <motion.button
            variants={fadeUp}
            className="btn btn-lg"
            onClick={() => navigate('/symptom-check')}
            style={{ background: 'white', color: 'var(--sage-700)', fontSize: 'var(--text-lg)', fontWeight: 700 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Compass size={22} /> Start Your Compass Check
          </motion.button>
          <motion.p variants={fadeUp} style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.4)' }}>
            Free · Private · India-focused
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
