import { motion } from 'framer-motion';

/**
 * Stagger-reveals each character with a Tron blur-in effect.
 * Use inView prop so letters animate when the section enters viewport.
 */
const TronLetters = ({ text, className = '', delay = 0, inView = true, tag = 'span' }) => {
  const Tag = tag;
  // If className contains gradient-text, apply it per-character so that
  // -webkit-background-clip:text works on every inline-block span (Safari/mobile fix)
  const hasGradient = className.includes('gradient-text');
  return (
    <Tag className={hasGradient ? '' : className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className={hasGradient ? className : ''}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: delay + i * 0.045, duration: 0.28, ease: 'easeOut' }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
};

export default TronLetters;
