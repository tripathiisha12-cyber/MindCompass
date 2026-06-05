import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '@context/AppContext';

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(true);
  const { showCrisisModal } = useApp();

  if (!visible) return null;

  return (
    <div
      className="disclaimer-banner"
      role="complementary"
      aria-label="Important disclaimer"
    >
      <span>
        ⚕️ <strong>Educational purposes only.</strong> Not a substitute for professional
        medical advice.{' '}
        <button
          className="disclaimer-link"
          onClick={showCrisisModal}
          aria-label="Open crisis helplines"
        >
          In crisis? Get immediate help →
        </button>
      </span>
      <button
        className="disclaimer-dismiss"
        onClick={() => setVisible(false)}
        aria-label="Dismiss disclaimer"
      >
        <X size={14} />
      </button>
    </div>
  );
}
