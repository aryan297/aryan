import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaNpm, FaMedium } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import ArcIdentity from './ArcIdentity';
import { soundEngine } from '../utils/soundEngine';
import { easeOut, fadeLeft, fadeRight, staggerContainer, staggerItem } from '../utils/motion';

const roles = [
  'Senior Software Engineer',
  'GoLang Developer',
  'Node.js Expert',
  'Angular Architect',
  'Microservices Builder',
];

const socialLinks = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/', label: 'LinkedIn' },
  { icon: FaGithub,   href: 'https://github.com/aryan297',                       label: 'GitHub'   },
  { icon: FaMedium,   href: 'https://medium.com/@aryanaman97',                   label: 'Medium'   },
  { icon: FaNpm,      href: 'https://www.npmjs.com/~aryan297',                   label: 'NPM'      },
];

const nameLetters = 'ARYAN'.split('');

/** Isolated so typewriter ticks don't re-render ArcIdentity / the rest of Hero */
const TypewriterRole = memo(() => {
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState('');
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
    <div className="font-space-mono text-xs sm:text-sm text-[var(--red)] mb-5 sm:mb-6 min-h-[1.5rem] flex items-center gap-2 flex-wrap">
      <span style={{ opacity: 0.5 }}>~/</span>
      {displayed}
      <span
        className="inline-block w-0.5 h-4 anim-blink"
        style={{ background: 'var(--orchid)' }}
      />
    </div>
  );
});
TypewriterRole.displayName = 'TypewriterRole';

const Hero = () => (
  <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 grid-bg pointer-events-none" />

    <div
      className="absolute top-1/4 left-1/6 w-[280px] sm:w-[420px] md:w-[560px] h-[280px] sm:h-[420px] md:h-[560px] rounded-full blur-3xl pointer-events-none anim-orb-a"
      style={{ background: 'radial-gradient(circle, var(--orb-1) 0%, transparent 65%)' }}
    />
    <div
      className="absolute bottom-1/4 right-1/6 w-[240px] sm:w-[360px] md:w-[460px] h-[240px] sm:h-[360px] md:h-[460px] rounded-full blur-3xl pointer-events-none anim-orb-b"
      style={{ background: 'radial-gradient(circle, var(--orb-2) 0%, transparent 65%)' }}
    />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[820px] h-[280px] sm:h-[420px] rounded-full blur-3xl pointer-events-none anim-orb-pulse"
      style={{ background: 'radial-gradient(ellipse, var(--orb-3) 0%, transparent 70%)' }}
    />

    <div className="tron-corner corner-tl tron-corner-animated" />
    <div className="tron-corner corner-tr tron-corner-animated" />

    <div className="relative z-10 page-container pt-28 pb-24 sm:py-24 md:py-20 grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

      <motion.div
        variants={fadeLeft}
        initial="hidden"
        animate="visible"
        custom={0.08}
        className="order-1 text-center md:text-left"
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easeOut }}
          className="glass-chip inline-flex items-center gap-2.5 mb-6 sm:mb-8 pl-3 pr-4 py-2 rounded-full"
        >
          <span
            className="w-2 h-2 rounded-full anim-orb-pulse shrink-0"
            style={{ background: 'var(--red)' }}
          />
          <span className="font-space-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-[var(--red)] uppercase">
            Available for opportunities
          </span>
        </motion.div>

        <div className="mb-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="font-space-mono text-[10px] text-[var(--text-muted)] tracking-[0.3em] uppercase mb-3"
          >
            Hi, I&apos;m
          </motion.p>
          <h1 className="display-heading text-[clamp(3.25rem,12vw,8rem)] leading-none mb-3">
            <span className="inline-flex text-[var(--text-bright)] justify-center md:justify-start">
              {nameLetters.map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 + i * 0.055, duration: 0.45, ease: easeOut }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-block"
              >
                &nbsp;
              </motion.span>
            </span>
            <motion.span
              className="gradient-text inline-block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.55, ease: easeOut }}
            >
              AMAN
            </motion.span>
          </h1>
          <motion.div
            className="flex items-center justify-center md:justify-start gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.45 }}
          >
            <motion.span
              className="h-px hidden sm:block"
              style={{ background: 'var(--red)', opacity: 0.45 }}
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.85, duration: 0.45, ease: easeOut }}
            />
            <p className="font-grotesk text-[var(--text-mid)] text-sm sm:text-base font-normal tracking-wide">
              Senior Software Engineer · SDE-3
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center md:justify-start"
        >
          <TypewriterRole />
        </motion.div>

        <motion.p
          className="font-grotesk text-[var(--text-mid)] text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto md:mx-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5, ease: easeOut }}
        >
          A results-driven Senior Software Engineer with{' '}
          <span className="text-[var(--text-bright)] font-medium">6+ years</span> of experience
          building high-performance, distributed systems in{' '}
          <span className="text-[var(--red)] font-medium">GoLang</span>,{' '}
          <span className="text-[var(--orchid)] font-medium">Node.js</span>, and{' '}
          <span className="text-[var(--magenta)] font-medium">Angular</span>.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 items-stretch sm:items-center justify-center md:justify-start"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: easeOut }}
        >
          <Link to="contact" smooth duration={600} offset={-70} className="w-full sm:w-auto">
            <motion.button
              onHoverStart={() => soundEngine.hover()}
              onClick={() => soundEngine.click()}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full sm:w-auto font-space-mono text-[11px] tracking-[0.2em] px-8 py-3.5 sm:py-4 font-semibold uppercase cursor-pointer rounded-md"
            >
              GET IN TOUCH
            </motion.button>
          </Link>
          <Link to="experience" smooth duration={600} offset={-70} className="w-full sm:w-auto">
            <motion.button
              onHoverStart={() => soundEngine.hover()}
              onClick={() => soundEngine.click()}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost w-full sm:w-auto font-space-mono text-[11px] tracking-[0.2em] px-8 py-3.5 sm:py-4 font-semibold uppercase cursor-pointer rounded-md"
            >
              VIEW WORK
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                onHoverStart={() => soundEngine.hover()}
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="tron-icon glass-chip w-10 h-10 rounded-md flex items-center justify-center text-[var(--text-mid)]"
                title={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
          <motion.div
            className="w-px h-8 hidden sm:block"
            style={{ background: 'var(--border-soft)' }}
            variants={staggerItem}
          />
          <motion.span
            variants={staggerItem}
            className="font-space-mono text-[9px] tracking-[0.25em] text-[var(--text-muted)] uppercase"
          >
            Bengaluru · India
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex justify-center items-center order-2 py-6 md:py-10 w-full min-w-0"
        variants={fadeRight}
        initial="hidden"
        animate="visible"
        custom={0.35}
      >
        <div className="arc-stage">
          <div className="anim-float-y w-full">
            <ArcIdentity />
          </div>
        </div>
      </motion.div>
    </div>

    <motion.div
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
    >
      <Link to="about" smooth duration={600} offset={-70} className="cursor-pointer">
        <motion.div
          onHoverStart={() => soundEngine.hover()}
          whileHover={{ scale: 1.1 }}
          className="glass-chip anim-float-y w-10 h-10 rounded-md flex items-center justify-center transition-colors"
          style={{ color: 'var(--red)', animationDuration: '1.6s' }}
        >
          <HiArrowDown size={16} />
        </motion.div>
      </Link>
    </motion.div>
  </section>
);

export default Hero;
