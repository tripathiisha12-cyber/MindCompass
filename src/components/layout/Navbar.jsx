import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, AlertCircle, LogOut } from 'lucide-react';
import { useApp } from '@context/AppContext';

const NAV_LINKS = [
  { path: '/',                    label: 'Home' },
  { path: '/symptom-check',       label: 'Symptom Check' },
  { path: '/professional-portal', label: 'Find Help' },
  { path: '/wellness-tracker',    label: 'Daily Tracker' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showCrisisModal, currentUser, logout } = useApp();
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
            {currentUser && (
              <div className="nav-profile-section" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div 
                  title={`Logged in as ${currentUser}`}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--sage-100)',
                    color: 'var(--sage-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    border: '1px solid var(--sage-200)',
                    cursor: 'default'
                  }}
                >
                  {currentUser.substring(0, 2).toUpperCase()}
                </div>
                <button
                  className="nav-logout-btn"
                  onClick={logout}
                  title="Log Out"
                  style={{
                    background: 'none',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gray-500)',
                    transition: 'all 0.2s'
                  }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}

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
          {currentUser && (
            <div 
              style={{ 
                padding: 'var(--space-4) var(--space-6)', 
                borderBottom: '1px solid var(--gray-100)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                backgroundColor: 'var(--gray-50)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--sage-100)',
                    color: 'var(--sage-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    border: '1px solid var(--sage-200)'
                  }}
                >
                  {currentUser.substring(0, 2).toUpperCase()}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--slate-800)' }}>
                  {currentUser}
                </span>
              </div>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                style={{
                  fontSize: '0.8rem',
                  padding: '5px 10px',
                  color: 'var(--crisis-red)',
                  border: '1px solid var(--crisis-red-light)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--crisis-red-light)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <LogOut size={12} /> Log Out
              </button>
            </div>
          )}

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
