import { motion } from 'framer-motion';

/**
 * Stagger-reveals each character.
 * Clip-text classes (gradient-text / glass-text) are applied per-character
 * so Safari/mobile background-clip works on inline-block spans.
 */
const TronLetters = ({ text, className = '', delay = 0, inView = true, tag = 'span' }) => {
  const Tag = tag;
  const perChar =
    className.includes('gradient-text') || className.includes('glass-text');

  return (
    <Tag className={perChar ? '' : className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className={perChar ? className : ''}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + i * 0.035, duration: 0.2, ease: 'easeOut' }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
};

export default TronLetters;
