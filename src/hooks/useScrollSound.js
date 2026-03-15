import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';

/**
 * Plays a Tron sound once when the element scrolls into view.
 * @param {string} sound - key on soundEngine to call ('section' | 'boop' | 'success' | 'glitch')
 * @param {number} amount - fraction of element that must be visible (0–1)
 */
export const useScrollSound = (sound = 'section', amount = 0.25) => {
  const ref     = useRef(null);
  const inView  = useInView(ref, { amount, once: true });
  const played  = useRef(false);

  useEffect(() => {
    if (inView && !played.current && soundEngine.isEnabled()) {
      played.current = true;
      soundEngine[sound]?.();
    }
  }, [inView, sound]);

  return ref;
};
