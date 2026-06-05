import React, { useState } from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  { num: 5, sense: 'See',   emoji: '👁️', instruction: 'Look around and name 5 things you can see right now.' },
  { num: 4, sense: 'Touch', emoji: '🖐️', instruction: 'Notice 4 things you can physically feel — clothes, chair, floor.' },
  { num: 3, sense: 'Hear',  emoji: '👂', instruction: 'Listen carefully for 3 sounds around you — near or far.' },
  { num: 2, sense: 'Smell', emoji: '👃', instruction: 'Identify 2 things you can smell, or think of favourite scents.' },
  { num: 1, sense: 'Taste', emoji: '👅', instruction: 'Notice 1 thing you can taste right now.' },
];

export default function GroundingExercise() {
  const [done, setDone] = useState([]);

  const active = done.length < STEPS.length ? done.length : STEPS.length;
  const completed = done.length === STEPS.length;

  const markDone = (i) => {
    if (!done.includes(i)) setDone(prev => [...prev, i]);
  };

  const reset = () => setDone([]);

  return (
    <div className="grounding-wrapper">
      <h3 style={{ fontSize:'1.05rem', fontWeight:700, color:'var(--sage-800)', marginBottom:'0.25rem' }}>5-4-3-2-1 Grounding Exercise</h3>
      <p style={{ fontSize:'0.8rem', color:'var(--color-text-muted)', marginBottom:'1rem' }}>
        Click each step as you complete it. Brings you fully into the present moment.
      </p>

      <div className="grounding-steps">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.sense}
            className={`grounding-step ${
              i === active && !done.includes(i) ? 'active' : ''
            } ${done.includes(i) ? 'done' : ''}`}
            onClick={() => markDone(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); markDone(i); } }}
            role="button"
            tabIndex={0}
            aria-label={`Grounding step: ${step.num} things you can ${step.sense}`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="grounding-step-num">
              {done.includes(i) ? '✓' : step.num}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight:600, fontSize:'0.875rem', color:'var(--gray-800)', marginBottom:'2px' }}>
                {step.emoji} {step.num} Things You Can {step.sense}
              </div>
              <div style={{ fontSize:'0.78rem', color:'var(--color-text-muted)' }}>{step.instruction}</div>
            </div>
            {i === active && !done.includes(i) && (
              <span style={{ color:'var(--earth-500)', fontSize:'1.1rem' }}>●</span>
            )}
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop:'1rem', display:'flex', gap:'0.5rem' }}>
        {!completed && active < STEPS.length && (
          <button className="btn btn-sm btn-primary" onClick={() => markDone(active)}>Next Step →</button>
        )}
        <button className="btn btn-sm btn-secondary" onClick={reset}>↺ Reset</button>
      </div>

      {completed && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop:'1rem', color:'var(--sage-600)', fontWeight:600, fontSize:'0.9rem' }}
        >
          🌱 Complete! Notice how present you feel right now.
        </motion.p>
      )}
    </div>
  );
}
