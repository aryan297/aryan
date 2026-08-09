import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';

const IconOff = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.45" />
    <rect x="7" y="12.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" opacity="0.55" />
    <rect x="9.5" y="12.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" opacity="0.55" />
    <rect x="12" y="12.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" opacity="0.55" />
    <rect x="14.5" y="12.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" opacity="0.55" />
    <line x1="4" y1="4" x2="20" y2="20" stroke="var(--red)" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const BarAnim = ({ x, h, delay, color }) => (
  <motion.rect
    x={x}
    rx="0.75"
    width="1.5"
    fill={color}
    animate={{
      height: [h * 0.3, h, h * 0.5, h * 0.8, h * 0.3],
      y: [12 - h * 0.15, 12 - h * 0.5, 12 - h * 0.25, 12 - h * 0.4, 12 - h * 0.15],
    }}
    transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const AnimatedIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <circle cx="12" cy="12" r="9" stroke="var(--red)" strokeWidth="1.2" opacity="0.7" />
    <circle cx="12" cy="12" r="3" stroke="var(--red)" strokeWidth="1.2" fill="color-mix(in srgb, var(--red) 12%, transparent)" />
    <BarAnim x="7" h={4} delay={0} color="var(--red)" />
    <BarAnim x="9.5" h={8} delay={0.15} color="var(--orchid)" />
    <BarAnim x="12" h={6} delay={0.3} color="var(--red)" />
    <BarAnim x="14.5" h={10} delay={0.1} color="var(--magenta)" />
  </svg>
);

const SoundToggle = () => {
  const [on, setOn] = useState(() => soundEngine.isEnabled());
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setOn(soundEngine.isEnabled());
  }, []);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);

    const next = !on;
    setOn(next);

    try {
      if (next) {
        // Must start inside the click gesture (no setTimeout)
        soundEngine.setEnabled(true);
        const ok = await soundEngine.ensureMusic();
        if (!ok) soundEngine.armAutoplayUnlock();
      } else {
        soundEngine.setEnabled(false);
        soundEngine.stopMusic();
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      disabled={busy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      title={on ? 'Mute music' : 'Play music'}
      aria-label={on ? 'Mute music' : 'Play music'}
      aria-pressed={on}
      className="glass-chip relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
      style={{
        borderColor: on ? 'var(--border)' : 'var(--chip-border)',
        color: 'var(--text-mid)',
        opacity: busy ? 0.7 : 1,
      }}
    >
      <AnimatePresence mode="wait">
        {on ? (
          <motion.div
            key="on"
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 45, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <AnimatedIcon />
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ scale: 0, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -45, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <IconOff />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SoundToggle;
