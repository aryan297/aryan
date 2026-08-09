import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { easeOut } from '../utils/motion';

/**
 * Scroll-triggered reveal — soft fade + rise for section blocks.
 */
const Reveal = ({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
  as = 'div',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px' });
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.55, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
