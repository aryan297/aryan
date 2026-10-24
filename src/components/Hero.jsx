import { useState, useEffect, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaNpm, FaMedium } from 'react-icons/fa';
import { HiArrowRight, HiArrowDown } from 'react-icons/hi';
import EditorialMonogram from './EditorialMonogram';

const ease = [0.22, 1, 0.36, 1];

const roles = [
  'Senior Software Engineer',
  'GoLang Developer',
  'Node.js Expert',
  'Angular Architect',
  'Microservices Builder',
];

const socialLinks = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/', label: 'LinkedIn' },
  { icon: FaGithub,   href: 'https://github.com/aryan297',                       label: 'GitHub' },
  { icon: FaMedium,   href: 'https://medium.com/@aryanaman97',                   label: 'Medium' },
  { icon: FaNpm,      href: 'https://www.npmjs.com/~aryan297',                   label: 'NPM' },
];

const TypewriterRole = memo(() => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 36);
    } else {
      setIsDeleting(false);
      setRoleIndex((p) => (p + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <span className="font-mono text-xs sm:text-sm" style={{ color: 'var(--tomato)' }}>
      {displayed}
      <span className="inline-block w-[2px] h-4 ml-0.5 align-middle" style={{ background: 'var(--tomato)', animation: 'soft-blink 0.9s step-end infinite' }} />
    </span>
  );
});
TypewriterRole.displayName = 'TypewriterRole';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const starRotate = useTransform(scrollYProgress, [0, 0.3], [0, 180]);

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Parallax decorative star elements */}
      <motion.div
        className="absolute top-[12%] right-[8%] hidden lg:block"
        style={{ rotate: starRotate }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease, type: 'spring' }}
      >
        <span className="text-5xl" style={{ color: 'var(--tomato)' }}>&#10022;</span>
      </motion.div>

      <motion.div
        className="absolute bottom-[22%] left-[4%] hidden lg:block"
        initial={{ opacity: 0, scale: 0, rotate: -60 }}
        animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
        transition={{ delay: 1.7, duration: 1, ease }}
      >
        <span className="text-3xl" style={{ color: 'var(--royal)' }}>&#10022;</span>
      </motion.div>

      <motion.div
        className="absolute top-[35%] right-[18%] hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        <span className="text-lg" style={{ color: 'var(--text-muted)' }}>&#10038;</span>
      </motion.div>

      {/* Side text — left vertical */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease }}
      >
        <motion.div
          className="w-px h-16"
          style={{ background: 'var(--border)' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.3, duration: 0.8, ease }}
        />
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)', writingMode: 'vertical-rl' }}>
          Portfolio 2026
        </span>
        <motion.div
          className="w-px h-16"
          style={{ background: 'var(--border)' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease }}
        />
      </motion.div>

      {/* Side text — right vertical */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease }}
      >
        <motion.div
          className="w-px h-16"
          style={{ background: 'var(--border)' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease }}
        />
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)', writingMode: 'vertical-rl' }}>
          Scroll Down
        </span>
        <motion.div
          className="w-px h-16"
          style={{ background: 'var(--border)' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.6, duration: 0.8, ease }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 page-container pt-28 sm:pt-32 pb-20 sm:pb-24"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Availability badge with pulse */}
        <motion.div
          className="mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: 'var(--tomato)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
            <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase" style={{ color: 'var(--tomato)' }}>
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Mobile monogram — small, centered */}
        <div className="flex justify-center mb-6 lg:hidden">
          <div className="w-[140px] sm:w-[180px]">
            <EditorialMonogram />
          </div>
        </div>

        {/* Giant editorial heading — ARYAN */}
        <div className="overflow-hidden mb-1 sm:mb-2">
          <h1 className="editorial-display text-[clamp(3rem,14vw,13rem)]" style={{ color: 'var(--royal)' }}>
            {'ARYAN'.split('').map((c, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '120%', opacity: 0, rotateX: -40 }}
                animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.9, ease }}
              >
                {c}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* AMAN + description + monogram row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 lg:gap-8 mb-6 sm:mb-8 items-end">
          <div>
            <div className="overflow-hidden mb-3 md:mb-4">
              <h1 className="editorial-display text-[clamp(3rem,14vw,13rem)]" style={{ color: 'var(--text-bright)' }}>
                {'AMAN'.split('').map((c, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: '120%', opacity: 0, rotateX: -40 }}
                    animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.6 + i * 0.07, duration: 0.9, ease }}
                  >
                    {c}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.div
              className="max-w-sm sm:max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease }}
            >
              <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                A results-driven <strong style={{ color: 'var(--text-bright)' }}>Senior Software Engineer</strong> with{' '}
                <strong style={{ color: 'var(--royal)' }}>6+ years</strong> of experience building
                high-performance, distributed systems.
              </p>
            </motion.div>
          </div>

          {/* Monogram — desktop only, in-flow */}
          <div className="hidden lg:flex items-center justify-center">
            <EditorialMonogram />
          </div>
        </div>

        {/* Animated divider line */}
        <motion.div
          className="editorial-line mb-6 sm:mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 1.2, ease }}
        />

        {/* Bottom row */}
        <motion.div
          className="flex flex-col gap-5 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7, ease }}
        >
          {/* Info line */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs font-medium tracking-wide" style={{ color: 'var(--text-mid)' }}>
                SDE-3 · Bengaluru, India
              </span>
              <TypewriterRole />
            </div>

            {/* CTA button */}
            <Link to="experience" smooth duration={600} offset={-80}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-editorial flex items-center gap-3 text-[10px] px-5 sm:px-6 py-3 group"
              >
                <span>Explore Work</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <HiArrowRight size={14} />
                </motion.span>
              </motion.button>
            </Link>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.08, duration: 0.5, ease }}
                whileHover={{ y: -4, borderColor: 'var(--royal)' }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border transition-all duration-300"
                style={{ borderColor: 'var(--border)', color: 'var(--text-mid)' }}
                title={label}
              >
                <Icon size={13} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with bounce */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }}
      >
        <Link to="about" smooth duration={600} offset={-80} className="cursor-pointer">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border rounded-full transition-colors duration-300"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            <HiArrowDown size={14} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
