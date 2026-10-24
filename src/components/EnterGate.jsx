import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';

const ease = [0.22, 1, 0.36, 1];

const EnterGate = () => {
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      soundEngine.setEnabled(true);
      soundEngine.preload();

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
            background: 'var(--bg-primary)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease }}
            className="w-full max-w-md text-center"
          >
            <motion.div
              className="mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease }}
            >
              <div className="h-px mx-auto w-16" style={{ background: 'var(--border)' }} />
            </motion.div>

            <motion.p
              className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase mb-4"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Aryan Aman
            </motion.p>

            <motion.h2
              className="editorial-heading text-4xl sm:text-5xl mb-4"
              style={{ color: 'var(--text-bright)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease }}
            >
              Welcome
            </motion.h2>

            <motion.p
              className="font-sans text-sm mb-8 leading-relaxed"
              style={{ color: 'var(--text-mid)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Tap enter to start the experience with sound.
            </motion.p>

            <motion.button
              type="button"
              onClick={enter}
              disabled={busy}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-editorial-fill w-full text-[11px] tracking-[0.2em] px-8 py-4 font-semibold uppercase mb-4"
            >
              {busy ? 'Starting...' : 'Enter'}
            </motion.button>

            <motion.button
              type="button"
              onClick={enterMuted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="font-sans text-[10px] tracking-[0.2em] uppercase transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Continue without sound
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnterGate;
