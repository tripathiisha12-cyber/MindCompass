import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, User, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '@context/AppContext';

export default function Auth() {
  const { login, signup } = useApp();
  const [activeTab, setActiveTab] = useState('login'); // login | register
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setError(null);
    setSuccess(null);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { username, email, password, confirmPassword } = formData;

    if (!username.trim() || !password) {
      setError('Username and password are required.');
      return;
    }

    if (activeTab === 'login') {
      const res = login(username, password);
      if (!res.success) {
        setError(res.error);
      }
    } else {
      if (!email.trim()) {
        setError('Email address is required.');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const res = signup(username, email, password);
      if (res.success) {
        setSuccess('Account created successfully! Welcome to MindCompass.');
      } else {
        setError(res.error);
      }
    }
  }

  return (
    <div
      className="page-wrapper"
      style={{
        background: 'linear-gradient(160deg, var(--sage-50) 0%, var(--earth-50) 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)'
      }}
    >
      <motion.div
        className="checker-card"
        style={{ maxWidth: '440px', width: '100%', margin: '0 auto', boxShadow: 'var(--shadow-xl)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Brand Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--sage-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'var(--sage-600)',
              margin: '0 auto var(--space-4)'
            }}
          >
            🧭
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--slate-800)', margin: '0 0 var(--space-1) 0' }}>
            MindCompass
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', margin: 0 }}>
            Your private guide to mental health & wellness
          </p>
        </div>

        {/* Auth Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--gray-200)',
            marginBottom: 'var(--space-6)'
          }}
        >
          <button
            onClick={() => handleTabChange('login')}
            style={{
              flex: 1,
              padding: 'var(--space-3)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'login' ? '3px solid var(--sage-500)' : '3px solid transparent',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: activeTab === 'login' ? 'var(--sage-600)' : 'var(--gray-500)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Log In
          </button>
          <button
            onClick={() => handleTabChange('register')}
            style={{
              flex: 1,
              padding: 'var(--space-3)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'register' ? '3px solid var(--sage-500)' : '3px solid transparent',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: activeTab === 'register' ? 'var(--sage-600)' : 'var(--gray-500)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Feedback Messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              className="alert alert-danger"
              style={{ display: 'flex', gap: 'var(--space-2)', fontSize: '0.85rem', marginBottom: 'var(--space-4)' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div
              className="alert alert-success"
              style={{ display: 'flex', gap: 'var(--space-2)', fontSize: '0.85rem', marginBottom: 'var(--space-4)' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CheckCircle size={16} style={{ flexShrink: 0 }} />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--gray-700)', marginBottom: 'var(--space-1)' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {activeTab === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--gray-700)', marginBottom: 'var(--space-1)' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--gray-700)', marginBottom: 'var(--space-1)' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {activeTab === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--gray-700)', marginBottom: 'var(--space-1)' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '12px',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: 'var(--space-2)'
            }}
          >
            {activeTab === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        {/* Security Warning banner */}
        <div
          style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-3)',
            backgroundColor: 'var(--sage-50)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--sage-200)',
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start',
            fontSize: '0.78rem',
            color: 'var(--sage-700)',
            lineHeight: '1.4'
          }}
        >
          <Compass size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong>🔒 Device-Bound Account.</strong> MindCompass values privacy. All accounts are stored locally in this browser. Clearing browser data will delete account history unless backed up.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
