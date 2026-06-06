import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, AlertCircle } from 'lucide-react';
import { useApp } from '@context/AppContext';

const NAV_LINKS = [
  { path: '/',                    label: 'Home' },
  { path: '/symptom-check',       label: 'Symptom Check' },
  { path: '/professional-portal', label: 'Find Help' },
  { path: '/wellness-tracker',    label: 'Daily Tracker' },
  { path: '/feedback',            label: 'Feedback' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showCrisisModal } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="navbar" style={{ boxShadow: scrolled ? 'var(--shadow-md)' : 'none' }}>
        <div className="navbar-inner">
          {/* Logo */}
          <button
            className="navbar-logo"
            onClick={() => navigate('/')}
            aria-label="MindCompass home"
          >
            <div className="logo-icon" aria-hidden="true">🧭</div>
            <div>
              <span style={{ display: 'block', lineHeight: '1.2' }}>MindCompass</span>
              <span className="logo-sub">Your mental health guide</span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="navbar-links" role="menubar">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => navigate(link.path)}
                role="menuitem"
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button
              className="crisis-nav-btn"
              onClick={showCrisisModal}
              aria-label="Emergency crisis resources"
            >
              <AlertCircle size={15} />
              Crisis Help
            </button>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu open" role="menu">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              className="mobile-nav-link"
              onClick={() => navigate(link.path)}
              role="menuitem"
            >
              {link.label}
            </button>
          ))}
          <button
            className="mobile-nav-link"
            onClick={showCrisisModal}
            style={{ color: 'var(--crisis-red)', fontWeight: 600 }}
          >
            🆘 Crisis Helplines
          </button>
        </div>
      )}
    </>
  );
}
