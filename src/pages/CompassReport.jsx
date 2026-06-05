import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BookOpen, Wrench, Heart, Activity, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import { useApp } from '@context/AppContext';
import REPORT_CONTENT from '@data/reportContent';
import BreathingCircle from '@components/report/BreathingCircle';
import GroundingExercise from '@components/report/GroundingExercise';

export default function CompassReport() {
  const navigate = useNavigate();
  const { lastResult, showCrisisModal } = useApp();
  const [activeTab, setActiveTab] = useState('understand');

  useEffect(() => {
    // Scroll to tab bar or top on tab change
    const tabEl = document.getElementById('report-tabs-bar');
    if (tabEl) {
      tabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeTab]);

  if (!lastResult) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: 'var(--space-8)', background: 'var(--color-bg)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: '4.5rem', marginBottom: 'var(--space-6)' }}>🧭</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', color: 'var(--slate-800)', marginBottom: 'var(--space-4)', fontWeight: 600 }}>
            No compass reading yet
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)', maxWidth: '400px', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)' }}>
            Take the quick, private symptom check-in to generate your personalized mental health report and action plan.
          </p>
          <motion.button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/symptom-check')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Compass size={18} /> Start Symptom Check
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const { condition, scores, selectedCount, hasCrisis } = lastResult;
  const content = REPORT_CONTENT[condition] || REPORT_CONTENT.wellness;

  const tabs = [
    { id: 'understand', label: 'Understand', icon: <BookOpen size={16} /> },
    { id: 'cope',       label: 'Coping Skills', icon: <Wrench size={16} /> },
    { id: 'heal',       label: 'Healing Activities', icon: <Heart size={16} /> },
    { id: 'doctor',     label: 'When to Seek Help', icon: <Activity size={16} /> },
  ];

  // Score percentages calculation (scaled max of 20)
  const scoreBreakdown = [
    { label: 'Anxiety', score: scores.anxiety, max: 20, color: '#0ea5e9', bg: '#e0f2fe' },
    { label: 'Low Mood', score: scores.depression, max: 20, color: '#7c3aed', bg: '#ede9f6' },
    { label: 'Burnout', score: scores.burnout, max: 20, color: '#d97706', bg: '#fef3c7' },
  ];

  return (
    <div className="page-wrapper" style={{ background: 'var(--color-bg)', minHeight: 'calc(100vh - var(--navbar-height))' }}>
      {/* ── REPORT HERO ── */}
      <div className="report-hero">
        <div className="report-hero-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span
            className="report-compass-icon"
            initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          >
            {content.emoji}
          </motion.span>
          <motion.div
            className="report-condition-tag"
            style={{ backgroundColor: content.tagColor, color: content.tagTextColor }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {content.tagLabel}
          </motion.div>
          <motion.h1
            className="report-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {content.condition}
          </motion.h1>
          <motion.p
            className="report-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your Compass has charted a pattern. Below is your personalized guide to understanding
            your feelings, instant coping techniques, daily exercises, and localized help options.
          </motion.p>
          <motion.div
            style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              className="btn btn-secondary"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
              onClick={() => navigate('/wellness-tracker')}
            >
              📅 Track My Wellness
            </button>
            <button
              className="btn btn-secondary"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
              onClick={() => navigate('/professional-portal')}
            >
              🏥 Find Professional Help
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div className="report-tabs-bar" id="report-tabs-bar">
        <div className="report-tabs-inner">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`report-tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
              aria-current={activeTab === t.id ? 'true' : undefined}
            >
              {t.icon}
              <span style={{ marginLeft: '6px' }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="report-content">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeTab === 'understand' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                  <div className="card">
                    <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--slate-800)', marginBottom: 'var(--space-3)' }}>
                      {content.what.title}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)', whiteSpace: 'pre-line', fontSize: 'var(--text-base)' }}>
                      {content.what.content}
                    </p>
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--slate-800)', marginBottom: 'var(--space-6)' }}>
                      Your Stress Profile Breakdown
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                      {scoreBreakdown.map((item) => {
                        const pct = Math.min(100, Math.round((item.score / item.max) * 100));
                        return (
                          <div key={item.label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                              <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--gray-700)' }}>
                                {item.label}
                              </span>
                              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                                {pct}%
                              </span>
                            </div>
                            <div className="progress-track" style={{ height: '10px', borderRadius: 'var(--radius-full)' }}>
                              <motion.div
                                className="progress-fill"
                                style={{ height: '100%', borderRadius: 'var(--radius-full)', background: `linear-gradient(90deg, ${item.bg}, ${item.color})` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--sage-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--sage-200)' }}>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--sage-700)', fontWeight: 500, margin: 0 }}>
                        📌 You selected <strong>{selectedCount} symptoms</strong> during check-in.
                        This is an educational baseline. If your scores are high or you are struggling to cope,
                        it is always a great decision to speak with a healthcare provider.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
                    <button className="btn btn-primary" onClick={() => setActiveTab('cope')}>
                      🛠️ Try Coping Skills <ArrowRight size={16} />
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/symptom-check')}>
                      <RefreshCw size={14} /> Retake Assessment
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'cope' && (
                <div>
                  <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--slate-800)', marginBottom: 'var(--space-6)' }}>
                    🛠️ Coping Skills & Immediate Relief
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {content.coping.map((item, index) => (
                      <div key={index}>
                        <div className="action-card">
                          <div className="action-icon" style={{ backgroundColor: item.iconBg }}>{item.icon}</div>
                          <div className="action-body">
                            <div className="action-title">{item.title}</div>
                            <div className="action-desc">{item.desc}</div>
                          </div>
                        </div>

                        {item.hasBreathing && (
                          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-6)', backgroundColor: 'var(--sage-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--sage-200)', display: 'flex', justifyContent: 'center' }}>
                            <BreathingCircle />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'heal' && (
                <div>
                  <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--slate-800)', marginBottom: 'var(--space-6)' }}>
                    🌿 Healing Activities
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {content.healing.map((item, index) => (
                      <div key={index}>
                        <div className="action-card">
                          <div className="action-icon" style={{ backgroundColor: item.iconBg }}>{item.icon}</div>
                          <div className="action-body">
                            <div className="action-title">{item.title}</div>
                            <div className="action-desc">{item.desc}</div>
                          </div>
                        </div>

                        {item.hasGrounding && (
                          <div style={{ marginTop: 'var(--space-4)' }}>
                            <GroundingExercise />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'doctor' && (
                <div>
                  <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--slate-800)', marginBottom: 'var(--space-3)' }}>
                    🩺 When to Consult a Professional
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
                    Self-care tools are extremely beneficial, but they do not replace formal diagnosis.
                    You should reach out to a professional therapist, doctor, or counselor if you experience any of the following:
                  </p>

                  <ul className="doctor-list" style={{ listStyle: 'none', padding: 0 }}>
                    {content.doctor.map((item, index) => (
                      <li key={index} className={`doctor-list-item ${item.crisis ? 'crisis-item' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--gray-100)' }}>
                        <div className="item-dot" style={{ backgroundColor: item.crisis ? 'var(--crisis-red)' : 'var(--sage-500)', width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 }}></div>
                        <span style={{ color: item.crisis ? 'var(--crisis-red)' : 'var(--color-text)', fontWeight: item.crisis ? 600 : 400, flexGrow: 1 }}>
                          {item.text}
                        </span>
                        {item.crisis && (
                          <button
                            className="btn btn-crisis btn-sm"
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={showCrisisModal}
                          >
                            <AlertTriangle size={14} /> Get Help Now
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 'var(--space-8)' }}>
                    <div className="alert alert-info" style={{ marginBottom: 'var(--space-5)', display: 'flex', gap: 'var(--space-3)' }}>
                      <span>💡</span>
                      <span>
                        In India, free psychiatric consults are widely available at Government Medical Colleges,
                        District Hospitals, and NIMHANS (Bengaluru). There are also free 24/7 helplines
                        listed under our <strong>Crisis Help</strong> section.
                      </span>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/professional-portal')}>
                      🏥 Find Professional Help & Platforms →
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── BOTTOM TRACKER BAND ── */}
      <div style={{ backgroundColor: 'var(--sage-100)', borderTop: '1px solid var(--sage-200)', padding: 'var(--space-8) 0', textAlign: 'center', marginTop: 'var(--space-12)' }}>
        <div className="container">
          <p style={{ color: 'var(--sage-800)', fontWeight: 500, marginBottom: 'var(--space-4)', fontSize: 'var(--text-base)' }}>
            Mental health is a daily practice. Track your mood and healthy checklist habits over time.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/wellness-tracker')}>
            📅 Open Daily Wellness Tracker
          </button>
        </div>
      </div>
    </div>
  );
}
