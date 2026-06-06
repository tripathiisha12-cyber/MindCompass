import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('mc_active_user') || null;
  });

  const [lastResult, setLastResult] = useState(() => {
    try {
      const activeUser = localStorage.getItem('mc_active_user');
      const key = activeUser ? `mc_last_result_${activeUser}` : 'mc_last_result_guest';
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(decodeURIComponent(escape(atob(raw))));
    } catch { return null; }
  });

  const showCrisisModal = useCallback(() => setIsCrisisModalOpen(true), []);
  const hideCrisisModal = useCallback(() => setIsCrisisModalOpen(false), []);

  const saveResult = useCallback((result) => {
    setLastResult(result);
    try {
      const activeUser = localStorage.getItem('mc_active_user') || 'guest';
      const key = `mc_last_result_${activeUser}`;
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(result))));
      localStorage.setItem(key, encoded);
    } catch(e) { console.error('Failed to save result', e); }
  }, []);

  const login = useCallback((username, password) => {
    try {
      const rawUsers = localStorage.getItem('mc_users');
      const users = rawUsers ? JSON.parse(rawUsers) : [];
      const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Invalid username or password' };
      }

      localStorage.setItem('mc_active_user', user.username);
      setCurrentUser(user.username);
      
      // Load user's specific result
      try {
        const key = `mc_last_result_${user.username}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          setLastResult(JSON.parse(decodeURIComponent(escape(atob(raw)))));
        } else {
          setLastResult(null);
        }
      } catch {
        setLastResult(null);
      }

      return { success: true };
    } catch (e) {
      return { success: false, error: 'An unexpected error occurred during login' };
    }
  }, []);

  const signup = useCallback((username, email, password) => {
    try {
      if (!username || !email || !password) {
        return { success: false, error: 'Please fill in all fields' };
      }

      const rawUsers = localStorage.getItem('mc_users');
      const users = rawUsers ? JSON.parse(rawUsers) : [];
      
      const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { success: false, error: 'Username or email already exists' };
      }

      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem('mc_users', JSON.stringify(users));
      
      // Auto login after signup
      localStorage.setItem('mc_active_user', username);
      setCurrentUser(username);
      setLastResult(null); // New user starts with no assessment result

      return { success: true };
    } catch (e) {
      return { success: false, error: 'An unexpected error occurred during signup' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('mc_active_user');
    setCurrentUser(null);
    setLastResult(null);
  }, []);

  return (
    <AppContext.Provider value={{
      isCrisisModalOpen,
      showCrisisModal,
      hideCrisisModal,
      currentUser,
      lastResult,
      saveResult,
      login,
      signup,
      logout,
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

