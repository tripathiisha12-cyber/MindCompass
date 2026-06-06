import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [lastResult, setLastResult] = useState(() => {
    try {
      const raw = localStorage.getItem('mc_last_result');
      if (!raw) return null;
      return JSON.parse(decodeURIComponent(escape(atob(raw))));
    } catch { return null; }
  });

  const showCrisisModal = useCallback(() => setIsCrisisModalOpen(true), []);
  const hideCrisisModal = useCallback(() => setIsCrisisModalOpen(false), []);

  const saveResult = useCallback((result) => {
    setLastResult(result);
    try {
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(result))));
      localStorage.setItem('mc_last_result', encoded);
    } catch(e) { console.error('Failed to save result', e); }
  }, []);

  return (
    <AppContext.Provider value={{
      isCrisisModalOpen,
      showCrisisModal,
      hideCrisisModal,
      lastResult,
      saveResult,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}


