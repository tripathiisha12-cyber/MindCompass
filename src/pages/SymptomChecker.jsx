import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { SYMPTOMS, DURATION_OPTIONS } from '@data/symptoms';
import { calculateCompassResult } from '@utils/compassEngine';
import { useApp } from '@context/AppContext';

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (dir) => ({ x: dir < 0 ? 60 : -60, opacity: 0, transition: { duration: 0.25 } }),
};

const CATEGORIES = [
  { key: 'physical',  label: 'Physical Symptoms',  emoji: '🫁', subtitle: 'How has your body been feeling lately?' },
  { key: 'emotional', label: 'Emotional Symptoms',  emoji: '💙', subtitle: 'How have you been feeling emotionally?' },
  { key: 'cognitive', label: 'Thought Patterns',    emoji: '🧠', subtitle: 'What kinds of thoughts have you been having?' },
];

export default function SymptomChecker() {
  const navigate = useNavigate();
  const { showCrisisModal, saveResult } = useApp();
  const [step, setStep] = useState(0); // 0=intro, 1-3=categories, 4=duration, 5=review
  const [dir, setDir] = useState(1);
  const [selected, setSelected] = useState({ physical: [], emotional: [], cognitive: [] });
  const [duration, setDuration] = useState(null);

  const TOTAL_STEPS = 5;
  const progress = step > 0 ? Math.round((step / TOTAL_STEPS) * 100) : 0;

  function goNext() {
    setDir(1);
    setStep(s => s + 1);
  }

  function goBack() {
    setDir(-1);
    setStep(s => s - 1);
  }

  function toggleSymptom(catKey, symptomId, isCrisis) {
    if (isCrisis) {
      showCrisisModal();
    }
    setSelected(prev => {
      const cat = prev[catKey];
      const newCat = cat.includes(symptomId)
        ? cat.filter(id => id !== symptomId)
        : [...cat, symptomId];
      return { ...prev, [catKey]: newCat };
    });
  }

  const allSelectedIds = [...selected.physical, ...selected.emotional, ...selected.cognitive];
  const allSymptoms = [...SYMPTOMS.physical, ...SYMPTOMS.emotional, ...SYMPTOMS.cognitive];
  const selectedSymptomsList = allSelectedIds.map(id => allSymptoms.find(s => s.id === id)).filter(Boolean);

  function handleGenerateReport() {
    const result = calculateCompassResult(allSelectedIds, duration || 'd2');
    saveResult(result);
    navigate('/compass-report');
  }

  return (
    <div className="page-wrapper" style={{ background: 'linear-gradient(160deg, var(--sage-50) 0%, var(--earth-50) 100%)', minHeight: 'calc(100vh - var(--navbar-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6) 0' }}>
      <div className="checker-wrapper">
        <motion.div
          className="checker-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Progress Header */}
          {step > 0 && (
            <div className="checker-progress-header">
              <div className="checker-step-label">
                <span>Your Compass Check</span>
                <span className="checker-step-count">Step {step} of {TOTAL_STEPS}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait" custom={dir}>
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}
              >
                <div style={{ fontSize: '4.5rem', marginBottom: 'var(--space-6)' }}>🧭</div>
                <span className="section-label">Symptom Check</span>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-4xl)', fontWeight: 600, color: 'var(--slate-800)', marginBottom: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
                  Let's figure out what you're feeling.
                </h1>
                <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto var(--space-8)', lineHeight: 'var(--leading-relaxed)' }}>
                  There are no right or wrong answers here. This is a gentle, private
                  check-in — not a medical diagnosis. Select only what genuinely resonates with
                  how you've been feeling <strong>recently</strong>.
                </p>
                <div className="alert alert-info" style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto var(--space-8)', display: 'flex', gap: 'var(--space-3)' }}>
                  <span>🔒</span>
                  <span>Your responses stay entirely private on your device. Nothing is sent to any server.</span>
                </div>
                <motion.button
                  className="btn btn-primary btn-lg animate-pulseGlow"
                  onClick={goNext}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  I'm Ready — Begin ✨
                </motion.button>
                <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-subtle)' }}>
                  Takes 3–5 minutes
                </p>
              </motion.div>
            )}

            {step >= 1 && step <= 3 && (() => {
              const cat = CATEGORIES[step - 1];
              const categorySymptoms = SYMPTOMS[cat.key];
              const categorySelected = selected[cat.key];

              return (
                <motion.div
                  key={`step-${step}`}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="checker-question">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                      <span style={{ fontSize: '2.5rem' }}>{cat.emoji}</span>
                      <div>
                        <h2 className="checker-question-title">{cat.label}</h2>
                        <p className="checker-question-subtitle">{cat.subtitle} Select all that apply.</p>
                      </div>
                    </div>

                    <div className="pills-grid">
                      {categorySymptoms.map((symptom) => {
                        const isSel = categorySelected.includes(symptom.id);
                        return (
                          <button
                            key={symptom.id}
                            className={`pill-checkbox ${isSel ? 'selected' : ''}`}
                            onClick={() => toggleSymptom(cat.key, symptom.id, symptom.crisis)}
                            role="checkbox"
                            aria-checked={isSel}
                          >
                            <div className="check-dot" aria-hidden="true"></div>
                            <span>{symptom.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="checker-nav">
                    <span className="selected-count">{categorySelected.length} selected</span>
                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                      <button className="btn btn-secondary" onClick={goBack}>
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button className="btn btn-primary" onClick={goNext}>
                        {step < 3 ? 'Next' : 'Almost done'} <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {step === 4 && (
              <motion.div
                key="step-4"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="checker-question">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                    <span style={{ fontSize: '2.5rem' }}>⏱️</span>
                    <div>
                      <h2 className="checker-question-title">How long have you been feeling this way?</h2>
                      <p className="checker-question-subtitle">Symptom duration helps our compass gauge severity and pattern type.</p>
                    </div>
                  </div>

                  <div className="duration-options">
                    {DURATION_OPTIONS.map((opt) => {
                      const isSel = duration === opt.id;
                      return (
                        <button
                          key={opt.id}
                          className={`duration-btn ${isSel ? 'selected' : ''}`}
                          onClick={() => setDuration(opt.id)}
                          aria-pressed={isSel}
                        >
                          <span className="d-icon">{opt.icon}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="checker-nav">
                  <button className="btn btn-secondary" onClick={goBack}>
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={goNext}
                    disabled={!duration}
                    style={!duration ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  >
                    Review & Continue <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step-5"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="checker-question">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                    <span style={{ fontSize: '2.5rem' }}>📝</span>
                    <div>
                      <h2 className="checker-question-title">Review your selections</h2>
                      <p className="checker-question-subtitle">Take a quick look to make sure this represents your experience.</p>
                    </div>
                  </div>

                  <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: 'var(--space-2)' }}>
                    {selectedSymptomsList.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                        {selectedSymptomsList.map((s) => (
                          <span key={s.id} className="badge badge-sage" style={{ fontSize: '0.825rem', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
                            {s.text}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        No specific symptoms selected. It is okay if you are just doing a general check-in!
                      </p>
                    )}

                    <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'rgba(0,0,0,0.02)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--sage-400)' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--slate-700)', display: 'block', marginBottom: '2px' }}>Selected duration:</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>
                        {DURATION_OPTIONS.find(d => d.id === duration)?.text || 'None'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="checker-nav">
                  <button className="btn btn-secondary" onClick={goBack}>
                    <ArrowLeft size={16} /> Edit Answers
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleGenerateReport}
                    style={{ background: 'var(--sage-600)' }}
                  >
                    <Compass size={18} /> Generate My Compass Report
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
