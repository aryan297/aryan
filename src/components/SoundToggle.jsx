import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';

/* ── Tron-style muted icon (OFF state) ───────────────────────
   Same disc but crossed out                                  */
const IconOff = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    {/* Disc ring — dim */}
    <circle cx="12" cy="12" r="9" stroke="#64748b" strokeWidth="1.2" opacity="0.5" />
    {/* Inner circle */}
    <circle cx="12" cy="12" r="3" stroke="#64748b" strokeWidth="1.2" fill="none" opacity="0.5" />
    {/* Flat bars (silence) */}
    <rect x="7"    y="12.5" width="1.5" height="1.5" rx="0.75" fill="#64748b" opacity="0.6" />
    <rect x="9.5"  y="12.5" width="1.5" height="1.5" rx="0.75" fill="#64748b" opacity="0.6" />
    <rect x="12"   y="12.5" width="1.5" height="1.5" rx="0.75" fill="#64748b" opacity="0.6" />
    <rect x="14.5" y="12.5" width="1.5" height="1.5" rx="0.75" fill="#64748b" opacity="0.6" />
    {/* Cross slash */}
    <line x1="4" y1="4" x2="20" y2="20" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
  </svg>
);

/* ── Animated equaliser bars (overlaid when ON) ─────────────── */
const BarAnim = ({ x, h, delay, color }) => (
  <motion.rect
    x={x} rx="0.75" width="1.5" fill={color}
    animate={{ height: [h * 0.3, h, h * 0.5, h * 0.8, h * 0.3], y: [12 - h * 0.15, 12 - h * 0.5, 12 - h * 0.25, 12 - h * 0.4, 12 - h * 0.15] }}
    transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const AnimatedIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#7ecba1" strokeWidth="1.2" opacity="0.7" />
    <circle cx="12" cy="12" r="3" stroke="#7ecba1" strokeWidth="1.2" fill="rgba(126,203,161,0.08)" />
    <BarAnim x="7"    h={4}  delay={0}    color="#7ecba1" />
    <BarAnim x="9.5"  h={8}  delay={0.15} color="#c4b4e8" />
    <BarAnim x="12"   h={6}  delay={0.3}  color="#7ecba1" />
    <BarAnim x="14.5" h={10} delay={0.1}  color="#f5c87a" />
  </svg>
);

const SoundToggle = () => {
  const [on, setOn] = useState(false);

  const toggle = () => {
    const next = !on;
    soundEngine.setEnabled(next);
    if (next) {
      setTimeout(() => soundEngine.startMusic(), 80);
    } else {
      soundEngine.stopMusic();
    }
    setOn(next);
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.90 }}
      title={on ? 'Mute — TRON: Encom Part II' : 'Play — TRON: Encom Part II'}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
      style={{
        background: on
          ? 'linear-gradient(135deg, rgba(126,203,161,0.15), rgba(196,180,232,0.10))'
          : 'rgba(255,255,255,0.04)',
        border: on
          ? '1px solid rgba(126,203,161,0.40)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: on ? '0 0 18px rgba(126,203,161,0.18)' : 'none',
      }}
    >
      <AnimatePresence mode="wait">
        {on ? (
          <motion.div
            key="on"
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0,   opacity: 1 }}
            exit={{   scale: 0, rotate: 45,   opacity: 0 }}
            transition={{ duration: 0.20 }}
          >
            <AnimatedIcon />
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ scale: 0, rotate: 45,  opacity: 0 }}
            animate={{ scale: 1, rotate: 0,   opacity: 1 }}
            exit={{   scale: 0, rotate: -45,  opacity: 0 }}
            transition={{ duration: 0.20 }}
          >
            <IconOff />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tron ring pulse when active */}
      {on && (
        <>
          <motion.span
            className="absolute inset-0 rounded-xl"
            style={{ border: '1px solid rgba(126,203,161,0.5)' }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <motion.span
            className="absolute inset-0 rounded-xl"
            style={{ border: '1px solid rgba(196,180,232,0.4)' }}
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </motion.button>
  );
};

export default SoundToggle;
