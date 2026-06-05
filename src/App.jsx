import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from '@context/AppContext';
import Navbar from '@components/layout/Navbar';
import DisclaimerBanner from '@components/layout/DisclaimerBanner';
import CrisisModal from '@components/modals/CrisisModal';
import Home from '@pages/Home';
import SymptomChecker from '@pages/SymptomChecker';
import CompassReport from '@pages/CompassReport';
import ProfessionalPortal from '@pages/ProfessionalPortal';
import WellnessTracker from '@pages/WellnessTracker';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <AppProvider>
      <ScrollToTop />
      <Navbar />
      <CrisisModal />
      <main id="main-content" role="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/symptom-check" element={<SymptomChecker />} />
            <Route path="/compass-report" element={<CompassReport />} />
            <Route path="/professional-portal" element={<ProfessionalPortal />} />
            <Route path="/wellness-tracker" element={<WellnessTracker />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      <DisclaimerBanner />
    </AppProvider>
  );
}
