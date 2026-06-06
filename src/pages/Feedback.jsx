import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, CheckCircle, Trash2, Globe, HardDrive } from 'lucide-react';

const EMOJI_RATINGS = [
  { emoji: '😢', label: 'Needs work', value: 1 },
  { emoji: '😐', label: 'Okay', value: 2 },
  { emoji: '🙂', label: 'Good', value: 3 },
  { emoji: '😊', label: 'Very Good', value: 4 },
  { emoji: '😍', label: 'Love it!', value: 5 }
];

const CATEGORIES = ['🎨 UI/UX Design', '💬 AI Assistant (Aura)', '🧭 Symptom Check', '🏥 Find Help', '📈 Daily Tracker', '🚀 Other'];

const LOCAL_KEY = 'mindcompass_feedback_logs';

function saveFeedbackLocally(feedback) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const updated = [feedback, ...existing];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}

function loadFeedbackLocally() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function Feedback() {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [comments, setComments] = useState('');
  const [userName, setUserName] = useState('');
  const [submittedLogs, setSubmittedLogs] = useState([]);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [formError, setFormError] = useState(null);

  const DEV_PASSCODE = 'ishaadmin';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('dev') === 'true' || params.get('admin') === 'true') {
      setIsDevMode(true);
    }
    // Load from localStorage immediately — always works
    const local = loadFeedbackLocally();
    setSubmittedLogs(local);
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleClearHistory = () => {
    const passcode = window.prompt("Enter the developer passcode to clear all feedback:");
    if (passcode === null) return;
    if (passcode.trim() !== DEV_PASSCODE) {
      alert("Invalid passcode. Access denied.");
      return;
    }
    if (!window.confirm("Clear ALL saved feedback entries?")) return;
    localStorage.removeItem(LOCAL_KEY);
    setSubmittedLogs([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);

    if (!rating) {
      setFormError('Please select a rating emoji before submitting.');
      return;
    }
    if (!comments.trim()) {
      setFormError('Please write some feedback before submitting.');
      return;
    }

    const newFeedback = {
      id: `fb-${Date.now()}`,
      userName: userName.trim() || 'Anonymous',
      rating,
      categories: selectedCategories,
      comments: comments.trim(),
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setSubmitting(true);

    // Always save locally first — this always works
    saveFeedbackLocally(newFeedback);
    setSubmittedLogs(loadFeedbackLocally());

    // Show success immediately
    setRating(null);
    setSelectedCategories([]);
    setComments('');
    setUserName('');
    setSuccess(true);
    setSubmitting(false);
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <div className="page-wrapper" style={{ background: 'var(--color-bg)', minHeight: '100vh', padding: 'var(--space-12) 0' }}>
      <div className="container-sm" style={{ maxWidth: '680px', margin: '0 auto', padding: '0 var(--space-4)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span className="section-label" style={{ background: 'var(--sage-100)', color: 'var(--sage-700)', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>
            Feedback Portal
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-4xl)', color: 'var(--slate-800)', marginTop: 'var(--space-3)', fontWeight: 700 }}>
            Share your thoughts with Isha 🌸
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-base)', marginTop: 'var(--space-2)' }}>
            We'd love to hear your feedback on the mascot, AI wellness assistant, and features.
          </p>
        </div>

        {/* Feedback Card Form */}
        <div className="card animate-fadeSlideUp" style={{ padding: 'var(--space-8)', boxShadow: 'var(--shadow-xl)', background: 'white', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--gray-100)' }}>

          <AnimatePresence>
            {success && (
              <motion.div
                className="alert alert-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '16px',
                  backgroundColor: '#f0fdf4',
                  border: '1.5px solid #bbf7d0',
                  color: '#166534',
                  borderRadius: '12px',
                  marginBottom: 'var(--space-6)'
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <CheckCircle size={20} style={{ color: '#15803d', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.98rem' }}>Isha says thank you! 🌸</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.5', color: '#14532d' }}>
                  "Thank you so much! I've received your thoughts and am sending you a warm virtual hug! Your feedback means the world to me and helps make MindCompass better for everyone." — Isha 💚
                </p>
              </motion.div>
            )}
            {formError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  padding: '12px 14px',
                  backgroundColor: '#fef2f2',
                  border: '1.5px solid #fecaca',
                  color: '#dc2626',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  marginBottom: 'var(--space-6)'
                }}
              >
                ⚠️ {formError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

            {/* User Name */}
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--slate-700)', marginBottom: 'var(--space-2)' }}>
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name (optional)"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1.5px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Emoji Rating */}
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--slate-700)', marginBottom: 'var(--space-2)' }}>
                How would you rate your experience? <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', padding: 'var(--space-3) 0' }}>
                {EMOJI_RATINGS.map((r) => {
                  const isSelected = rating === r.value;
                  const isHovered = hoverRating === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRating(r.value)}
                      onMouseEnter={() => setHoverRating(r.value)}
                      onMouseLeave={() => setHoverRating(null)}
                      style={{
                        flex: 1,
                        padding: '12px 6px',
                        border: '2px solid',
                        borderColor: isSelected ? 'var(--sage-500)' : (isHovered ? 'var(--sage-200)' : 'var(--gray-100)'),
                        borderRadius: 'var(--radius-xl)',
                        background: isSelected ? 'var(--sage-50)' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ fontSize: '2rem', transform: isSelected || isHovered ? 'scale(1.15)' : 'none', transition: 'transform 0.2s' }}>
                        {r.emoji}
                      </span>
                      <span style={{ fontSize: '0.7rem', fontWeight: isSelected ? 600 : 500, color: isSelected ? 'var(--sage-700)' : 'var(--gray-500)' }}>
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--slate-700)', marginBottom: 'var(--space-2)' }}>
                What are you giving feedback on? (Select all that apply)
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'var(--space-2)' }}>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-full)',
                        border: '1.5px solid',
                        borderColor: isSelected ? 'var(--sage-500)' : 'var(--gray-200)',
                        backgroundColor: isSelected ? 'var(--sage-100)' : 'white',
                        color: isSelected ? 'var(--sage-800)' : 'var(--gray-700)',
                        fontSize: '0.82rem',
                        fontWeight: isSelected ? 600 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--slate-700)', marginBottom: 'var(--space-2)' }}>
                Detailed Feedback / Suggestions <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="What did you like? What can we do better? Feel free to type anything..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1.5px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 650,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: 'var(--space-2)'
              }}
            >
              <MessageSquare size={18} />
              {submitting ? 'Saving...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        {/* Previous Feedback Logs */}
        <div style={{ marginTop: 'var(--space-12)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <HardDrive size={16} style={{ color: 'var(--sage-500)' }} />
              Past Submissions ({submittedLogs.length})
            </h3>
            {isDevMode && submittedLogs.length > 0 && (
              <button
                onClick={handleClearHistory}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gray-400)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-400)'}
              >
                <Trash2 size={12} /> Clear History (Dev Only)
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {submittedLogs.length === 0 ? (
              <motion.div
                key="empty-fb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-8) var(--space-4)',
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-xl)',
                  border: '1.5px dashed var(--gray-200)',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-sm)'
                }}
              >
                No feedback has been logged yet. Use the form above to submit your first thoughts!
              </motion.div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {submittedLogs.map((log) => {
                  const ratingEmoji = EMOJI_RATINGS.find(r => r.value === log.rating)?.emoji || '🌟';
                  return (
                    <motion.div
                      key={log.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="card"
                      style={{ padding: 'var(--space-5)', background: 'white' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.75rem' }}>{ratingEmoji}</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-800)' }}>
                              {log.userName || log.name || 'Anonymous'}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)' }}>
                              {log.timestamp}
                            </div>
                          </div>
                        </div>

                        {log.categories && log.categories.length > 0 && (
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {log.categories.map((cat, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '0.68rem',
                                  background: 'var(--sage-50)',
                                  border: '1px solid var(--sage-100)',
                                  color: 'var(--sage-700)',
                                  padding: '2px 8px',
                                  borderRadius: 'var(--radius-full)',
                                  fontWeight: 600
                                }}
                              >
                                {cat.split(' ').slice(1).join(' ')}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <p style={{
                        marginTop: 'var(--space-3)',
                        fontSize: '0.88rem',
                        color: 'var(--gray-700)',
                        lineHeight: '1.45',
                        whiteSpace: 'pre-wrap',
                        margin: 'var(--space-3) 0 0 0'
                      }}>
                        {log.comments}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
