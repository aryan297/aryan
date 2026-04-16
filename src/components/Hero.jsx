import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaNpm, FaMedium } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import ArcIdentity from './ArcIdentity';
import { soundEngine } from '../utils/soundEngine';

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

const Hero = () => {
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Boot scan line */}
      <motion.div
        initial={{ top: 0, opacity: 0 }}
        animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.3, duration: 1.6, ease: 'linear' }}
        className="absolute left-0 right-0 h-px z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg,transparent,rgba(0,212,200,.9) 20%,rgba(167,139,250,1) 50%,rgba(0,180,216,.9) 80%,transparent)',
          boxShadow: '0 0 16px rgba(0,212,200,.7)',
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,200,0.06) 0%, transparent 65%)' }} />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)' }} />

      {/* Tron corner brackets */}
      <div className="tron-corner corner-tl tron-corner-animated" />
      <div className="tron-corner corner-tr tron-corner-animated" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

        {/* ── Left: text ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#00d4c8]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1], boxShadow: ['0 0 0px #00d4c8', '0 0 10px #00d4c8', '0 0 0px #00d4c8'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-space-mono text-[10px] tracking-[0.3em] text-[#00d4c8] uppercase">Available for opportunities</span>
            <span className="w-8 h-px bg-[#00d4c8]/40" />
          </motion.div>

          {/* Display heading — editorial large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-space-mono text-[10px] text-[var(--text-muted)] tracking-[0.3em] uppercase mb-3">Hi, I'm</p>
            <h1 className="display-heading text-[clamp(4.5rem,10vw,8rem)] leading-none mb-3">
              <span className="text-white">ARYAN </span>
              <span className="gradient-text">AMAN</span>
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00d4c8]/50" />
              <p className="font-grotesk text-[var(--text-mid)] text-base font-medium tracking-wide">Senior Software Engineer · SDE-3</p>
            </div>
          </motion.div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="font-space-mono text-sm text-[#00d4c8]/80 mb-6 h-6 flex items-center gap-2"
          >
            <span className="text-[#00d4c8]/40">~/</span>
            {displayed}
            <motion.span
              className="inline-block w-0.5 h-4"
              style={{ background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="font-grotesk text-[var(--text-mid)] text-lg leading-relaxed mb-10 max-w-lg"
          >
            A results-driven Senior Software Engineer with{' '}
            <span className="text-white font-semibold">6+ years</span> of experience
            building high-performance, distributed systems in{' '}
            <span className="text-[#00d4c8] font-semibold">GoLang</span>,{' '}
            <span className="text-[#a78bfa] font-semibold">Node.js</span>, and{' '}
            <span className="text-[#00b4d8] font-semibold">Angular</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="contact" smooth duration={600} offset={-70}>
              <motion.button
                onHoverStart={() => soundEngine.hover()}
                onClick={() => soundEngine.click()}
                whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(0,212,200,0.40)' }}
                whileTap={{ scale: 0.97 }}
                className="font-space-mono text-[11px] tracking-[0.2em] px-8 py-4 bg-[#00d4c8] text-[#060c14] font-bold uppercase cursor-pointer transition-all rounded-sm hover:bg-[#00e5d4]"
              >
                GET IN TOUCH
              </motion.button>
            </Link>
            <Link to="experience" smooth duration={600} offset={-70}>
              <motion.button
                onHoverStart={() => soundEngine.hover()}
                onClick={() => soundEngine.click()}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="font-space-mono text-[11px] tracking-[0.2em] px-8 py-4 border border-white/20 text-white/80 font-bold uppercase cursor-pointer transition-all rounded-sm hover:border-[#00d4c8]/50 hover:text-[#00d4c8]"
              >
                VIEW WORK
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Links + Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onHoverStart={() => soundEngine.hover()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  whileHover={{ scale: 1.2, y: -3,
                    boxShadow: '0 0 16px rgba(0,212,200,0.5)',
                    borderColor: 'rgba(0,212,200,0.6)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="tron-icon w-10 h-10 rounded-sm border border-white/10 bg-white/3 flex items-center justify-center text-[var(--text-muted)] transition-all"
                  title={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <div className="w-px h-8 bg-white/10" />
            <span className="font-space-mono text-[9px] tracking-[0.25em] text-[var(--text-muted)] uppercase">
              Bengaluru · India
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right: Arc Identity ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="flex justify-center items-center py-10"
        >
          <ArcIdentity />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <Link to="about" smooth duration={600} offset={-70} className="cursor-pointer">
          <motion.div
            onHoverStart={() => soundEngine.hover()}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 rounded-sm border border-[#00d4c8]/30 flex items-center justify-center text-[#00d4c8]/60 hover:border-[#00d4c8]/70 hover:text-[#00d4c8] transition-colors"
          >
            <HiArrowDown size={16} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
