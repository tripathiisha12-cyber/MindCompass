import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useApp } from '@context/AppContext';
import { useNavigate } from 'react-router-dom';

const PRESETS = [
  { text: '🌊 Calm my anxiety', type: 'anxiety' },
  { text: '🩺 Psychologist vs Psychiatrist', type: 'difference' },
  { text: '🕯️ Recover from burnout', type: 'burnout' },
  { text: '🚨 I need emergency help', type: 'crisis' }
];

export default function AIAssistant() {
  const { showCrisisModal } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm Aura, your MindCompass guide. 🧭 I'm here to listen, share science-backed coping tools, or help you find professional resources. What's on your mind today?",
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Hide the badge after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const getAIResponse = (text) => {
    const query = text.toLowerCase();
    
    // Crisis query
    if (query.includes('suicide') || query.includes('kill') || query.includes('die') || query.includes('harm') || query.includes('crisis') || query.includes('emergency') || query.includes('helpline') || query.includes('cut') || query.includes('hurt')) {
      setTimeout(() => showCrisisModal(), 1000);
      return {
        text: "🚨 Reaching out takes courage. I have triggered our emergency crisis directory modal for you. Please connect with one of these free, confidential, 24/7 helplines in India immediately. You are not alone.",
        action: null
      };
    }

    // Anxiety query
    if (query.includes('anxiety') || query.includes('panic') || query.includes('worry') || query.includes('stress') || query.includes('scared') || query.includes('fear') || query.includes('heart racing') || query.includes('nervous')) {
      return {
        text: "I hear you, and it's completely valid to feel this way. Stress and anxiety trigger our natural 'fight-or-flight' response, which can feel overwhelming in today's intense academic or work culture.\n\nLet's slow things down together. Try our 4-7-8 Breathing guided circle to calm your nervous system, or check out our Grounding exercise.",
        action: {
          label: '💨 Try Breathing Exercise',
          onClick: () => {
            navigate('/symptom-check');
            setIsOpen(false);
          }
        }
      };
    }

    // Burnout query
    if (query.includes('burnout') || query.includes('tired') || query.includes('exhausted') || query.includes('drained') || query.includes('no energy') || query.includes('overworked') || query.includes('fatigue')) {
      return {
        text: "Burnout is not laziness—it's what happens when you run on empty for too long. In competitive environments, we often neglect rest.\n\nTo recover, you need actual active rest (like quiet walks or offline hobbies) and boundary settings. Try writing a daily wellness tracker checklist to log your energy.",
        action: {
          label: '📅 Open Wellness Tracker',
          onClick: () => {
            navigate('/wellness-tracker');
            setIsOpen(false);
          }
        }
      };
    }

    // Difference query
    if (query.includes('difference') || query.includes('psychologist') || query.includes('psychiatrist') || query.includes('therapist') || query.includes('doctor') || query.includes('who to see')) {
      return {
        text: "Great question! Here's the key difference:\n\n• 🧠 **Psychologist/Therapist**: Focuses on talk therapy, CBT, and teaching coping mechanisms. They do not prescribe medications.\n• 🩺 **Psychiatrist**: A medical doctor who evaluates neurobiology and can prescribe medication if needed.\n\nIf you're unsure, booking a talk session with a psychologist is a gentle, safe place to start.",
        action: {
          label: '🏥 Find Hospital Directory',
          onClick: () => {
            navigate('/professional-portal');
            setIsOpen(false);
          }
        }
      };
    }

    // Depression query
    if (query.includes('sad') || query.includes('depressed') || query.includes('depression') || query.includes('empty') || query.includes('hopeless') || query.includes('crying') || query.includes('unhappy') || query.includes('grief')) {
      return {
        text: "I'm so sorry you're feeling this weight right now. Low mood and depression can make even simple tasks feel impossible. Please be incredibly gentle with yourself.\n\nTry starting with an impossibly small win—like drinking a glass of water or opening the window for fresh air. If it persists, checking in on our symptom check guide is a great way to map your feelings.",
        action: {
          label: '🧭 Take Symptom Check',
          onClick: () => {
            navigate('/symptom-check');
            setIsOpen(false);
          }
        }
      };
    }

    // Greetings
    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('hola') || query.includes('namaste') || query.includes('greetings')) {
      return {
        text: "Hi there! I'm ready to assist you. Whether you want to talk about stress, learn coping techniques, understand therapy, or look up support centers in India—I'm here for you.",
        action: null
      };
    }

    // Fallback response
    return {
      text: "Thank you for sharing that. While I'm a wellness guide and can't diagnose conditions, I highly recommend tracking your moods on our Daily Tracker or taking the 3-minute Symptom Check to see what coping strategies match your stress levels.",
      action: {
        label: '🧭 Go to Symptom Checker',
        onClick: () => {
          navigate('/symptom-check');
          setIsOpen(false);
        }
      }
    };
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getAIResponse(textToSend);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        action: response.action,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="ai-assistant-container">
      {/* Floating Action Button badge */}
      {showBadge && !isOpen && (
        <div className="ai-assistant-badge">
          <span>💬 Chat with Aura</span>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        className="ai-assistant-toggle"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowBadge(false);
        }}
        aria-label="Toggle wellness assistant chat"
      >
        {isOpen ? (
          <X size={26} color="white" />
        ) : (
          <img src="/cute_compass_mascot.png" alt="Mascot" />
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="ai-chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.85 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-info">
                <div className="ai-chat-avatar">
                  <img src="/cute_compass_mascot.png" alt="Mascot Avatar" />
                </div>
                <div>
                  <h4 className="ai-chat-title">Aura</h4>
                  <div className="ai-chat-status">
                    <span className="ai-chat-status-dot"></span>
                    Online Wellness Guide
                  </div>
                </div>
              </div>
              <button 
                className="ai-chat-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message Body */}
            <div className="ai-chat-body">
              {messages.map((msg) => (
                <div key={msg.id} className={`ai-message ${msg.sender}`}>
                  <div className="ai-message-bubble">
                    <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                    
                    {/* Render action button inside AI message bubble if present */}
                    {msg.sender === 'bot' && msg.action && (
                      <button
                        onClick={msg.action.onClick}
                        style={{
                          marginTop: 'var(--space-3)',
                          display: 'block',
                          width: '100%',
                          padding: '8px 12px',
                          background: 'var(--sage-50)',
                          border: '1.5px solid var(--sage-200)',
                          borderRadius: '10px',
                          color: 'var(--sage-700)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        {msg.action.label}
                      </button>
                    )}
                  </div>
                  <span className="ai-message-time">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="ai-message bot">
                  <div className="ai-message-bubble" style={{ padding: '8px 12px' }}>
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies */}
            <div className="ai-quick-replies">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  className="ai-quick-chip"
                  onClick={() => handleSendMessage(p.text.substring(3))} // strip emoji
                >
                  {p.text}
                </button>
              ))}
            </div>

            {/* Footer Form */}
            <form 
              className="ai-chat-footer"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
            >
              <input
                type="text"
                className="ai-chat-input"
                placeholder="Ask about stress, therapy, panic..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="ai-chat-send-btn"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
