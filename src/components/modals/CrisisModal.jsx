import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import { useApp } from '@context/AppContext';

const HOTLINES = [
  { emoji: '📞', name: 'iCall — TISS Mumbai',      number: '9152987821',   desc: 'Mon–Sat, 8am–10pm | Free counselling' },
  { emoji: '🆘', name: 'Vandrevala Foundation',    number: '18602662345',  desc: '24/7 | Free | All India' },
  { emoji: '💚', name: 'iCall WhatsApp',           number: '9152987821',   desc: 'WhatsApp available | Confidential' },
  { emoji: '🌺', name: 'AASRA',                   number: '9820466627',   desc: '24/7 Crisis Helpline | Mumbai' },
  { emoji: '🫶', name: 'Snehi',                   number: '04424640050',  desc: 'Emotional support | Chennai' },
];

export default function CrisisModal() {
  const { isCrisisModalOpen, hideCrisisModal } = useApp();
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (isCrisisModalOpen) {
      setTimeout(() => closeRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCrisisModalOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') hideCrisisModal(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [hideCrisisModal]);

  return (
    <AnimatePresence>
      {isCrisisModalOpen && (
        <motion.div
          className="crisis-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) hideCrisisModal(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="crisis-title"
        >
          <motion.div
            className="crisis-modal"
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          >
            <button
              className="crisis-close-top"
              onClick={hideCrisisModal}
              ref={closeRef}
              aria-label="Close crisis modal"
            >
              <X size={18} />
            </button>

            <div className="crisis-modal-header">
              <span className="crisis-modal-icon">🤝</span>
              <h2 className="crisis-modal-title" id="crisis-title">You Are Not Alone</h2>
              <p className="crisis-modal-subtitle">
                Reaching out takes courage. These trained counsellors in India are here
                to listen — right now, for free, and without judgment.
              </p>
            </div>

            <div className="crisis-hotlines">
              {HOTLINES.map((h) => (
                <a
                  key={h.number + h.name}
                  href={`tel:${h.number}`}
                  className="crisis-hotline-card"
                  aria-label={`Call ${h.name}`}
                >
                  <span className="hotline-emoji">{h.emoji}</span>
                  <div className="hotline-info">
                    <div className="hotline-name">{h.name}</div>
                    <div className="hotline-number">{h.number.replace(/^(\d{4})(\d{3})(\d{4})$/, '$1-$2-$3')}</div>
                    <div className="hotline-desc">{h.desc}</div>
                  </div>
                  <Phone size={16} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                </a>
              ))}
            </div>

            <div className="crisis-modal-footer">
              <button className="crisis-safe-btn" onClick={hideCrisisModal}>
                💚 I am safe — return to MindCompass
              </button>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                Your information is never stored or shared. This is a safe, private space.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
