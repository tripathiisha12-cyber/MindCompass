import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  { name: 'inhale', label: 'Breathe In',  duration: 4, color: 'linear-gradient(135deg,#458a62,#34704e)', instruction: 'Expand your belly as you inhale deeply...' },
  { name: 'hold',   label: 'Hold',        duration: 7, color: 'linear-gradient(135deg,#7c3aed,#6d28d9)', instruction: 'Hold gently... feel the stillness...' },
  { name: 'exhale', label: 'Breathe Out', duration: 8, color: 'linear-gradient(135deg,#0ea5e9,#0284c7)', instruction: 'Exhale slowly and completely...' },
];

export default function BreathingCircle() {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);
  const cycleRef = useRef(0);

  const phase = PHASES[phaseIdx];

  function clearTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function startPhase(idx, initialCount) {
    const p = PHASES[idx];
    setPhaseIdx(idx);
    setCount(initialCount ?? p.duration);
    clearTimer();
    timerRef.current = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          const nextIdx = (idx + 1) % PHASES.length;
          if (nextIdx === 0) {
            cycleRef.current += 1;
            setCycles(cycleRef.current);
            if (cycleRef.current >= 3) {
              setRunning(false);
              setDone(true);
              return 0;
            }
          }
          startPhase(nextIdx);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function handleStart() {
    if (done) {
      setDone(false); setCycles(0); cycleRef.current = 0;
    }
    if (running) {
      clearTimer(); setRunning(false);
    } else {
      setRunning(true);
      startPhase(phaseIdx, count || PHASES[phaseIdx].duration);
    }
  }

  function handleReset() {
    clearTimer();
    setRunning(false); setPhaseIdx(0); setCount(0); setCycles(0); cycleRef.current = 0; setDone(false);
  }

  useEffect(() => () => clearTimer(), []);

  const scaleVal = phase.name === 'inhale' ? 1.35 : phase.name === 'hold' ? 1.35 : 1;
  const transitionDuration = running ? (phase.name === 'inhale' ? 4 : phase.name === 'exhale' ? 8 : 0.3) : 0.3;

  return (
    <div className="breathing-wrapper">
      <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'var(--sage-800)', marginBottom:'0.25rem', textAlign:'center' }}>4-7-8 Breathing Exercise</h3>
      <p style={{ fontSize:'0.825rem', color:'var(--color-text-muted)', textAlign:'center', marginBottom:'1.5rem', maxWidth:'300px' }}>
        Calms your nervous system. Try 3 complete cycles.
      </p>

      <div className="breathing-outer-ring">
        <motion.div
          className="breathing-circle"
          animate={{ scale: running ? scaleVal : 1, background: phase.color }}
          transition={{ duration: transitionDuration, ease: running && phase.name === 'hold' ? 'linear' : 'easeInOut' }}
          style={{ background: phase.color }}
        >
          <div style={{ textAlign: 'center' }}>
            <div className="phase-text">
              {done ? 'Complete!' : running ? phase.label : 'Tap to Start'}
            </div>
            <div className="phase-count">
              {done ? '🌟' : running && count > 0 ? count : '🫁'}
            </div>
          </div>
        </motion.div>
      </div>

      <p className="breathing-instruction">
        {done ? 'Wonderful. Notice how you feel right now.'
          : running ? phase.instruction
          : 'Inhale 4 · Hold 7 · Exhale 8'}
      </p>

      <div style={{ display:'flex', gap:'0.75rem', marginTop:'1.5rem' }}>
        <button className="btn btn-primary btn-sm" onClick={handleStart} style={{ minWidth:'100px' }}>
          {done ? '▶ Again' : running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleReset}>↺ Reset</button>
      </div>

      {cycles > 0 && !done && (
        <p style={{ fontSize:'0.75rem', color:'var(--sage-600)', marginTop:'0.75rem', textAlign:'center', fontWeight:500 }}>
          Cycle {cycles} of 3
        </p>
      )}
      {done && (
        <p style={{ fontSize:'0.875rem', color:'var(--sage-600)', marginTop:'0.75rem', textAlign:'center', fontWeight:600 }}>
          🎉 3 cycles complete! Well done.
        </p>
      )}
    </div>
  );
}
