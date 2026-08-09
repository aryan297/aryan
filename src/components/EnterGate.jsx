import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';

/**
 * Browsers block unmuted audio until a user gesture.
 * If autoplay fails, this gate captures the first click and starts music reliably.
 */
const EnterGate = () => {
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      soundEngine.setEnabled(true);
      soundEngine.preload();

      // Retry /encom.mp3 on load (main.jsx also kicks this off)
      const playing = await soundEngine.startMusicAsync();
      if (cancelled) return;

      if (playing || soundEngine.isPlaying()) {
        setVisible(false);
        return;
      }

      soundEngine.armAutoplayUnlock();
      setVisible(true);
    };

    boot();

    // If the tab was backgrounded, try again when visible
    const onVisible = () => {
      if (document.hidden || cancelled) return;
      if (soundEngine.isEnabled() && !soundEngine.isPlaying()) {
        soundEngine.startMusicAsync();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const enter = async () => {
    if (busy) return;
    setBusy(true);
    try {
      soundEngine.setEnabled(true);
      // Click gesture — start /encom.mp3
      await soundEngine.ensureMusic();
    } finally {
      setVisible(false);
      setBusy(false);
    }
  };

  const enterMuted = () => {
    soundEngine.setEnabled(false);
    soundEngine.stopMusic();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          style={{
            background: 'color-mix(in srgb, var(--bg-primary) 88%, transparent)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md text-center rounded-2xl p-6 sm:p-8 glass-premium"
          >
            <p className="font-space-mono text-[10px] tracking-[0.35em] uppercase text-[var(--text-muted)] mb-3">
              Aryan Aman · Portfolio
            </p>
            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-[var(--text-bright)] mb-3">
              Welcome
            </h2>
            <p className="font-grotesk text-[var(--text-mid)] text-sm mb-6 sm:mb-8 leading-relaxed">
              Tap enter to start the experience with sound.
            </p>

            <button
              type="button"
              onClick={enter}
              disabled={busy}
              className="btn-primary w-full font-space-mono text-[11px] tracking-[0.28em] px-8 py-4 font-semibold uppercase rounded-md mb-3"
            >
              {busy ? 'Starting…' : 'Enter'}
            </button>

            <button
              type="button"
              onClick={enterMuted}
              className="font-space-mono text-[9px] tracking-[0.22em] uppercase text-[var(--text-muted)] hover:text-[var(--text-mid)] transition-colors"
            >
              Continue without sound
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnterGate;
