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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg tron-scan">
      {/* Boot scan line — sweeps down once on load */}
      <motion.div
        initial={{ top: 0, opacity: 0 }}
        animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.3, duration: 1.6, ease: 'linear' }}
        className="absolute left-0 right-0 h-px z-30 pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(126,203,161,.9) 20%,rgba(196,180,232,1) 50%,rgba(245,200,122,.9) 80%,transparent)', boxShadow: '0 0 16px rgba(126,203,161,.7)' }}
      />
      {/* Ghibli-warm orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow" style={{ background: 'radial-gradient(circle, rgba(126,203,161,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse-slow" style={{ background: 'radial-gradient(circle, rgba(196,180,232,0.07) 0%, transparent 70%)', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse-slow" style={{ background: 'radial-gradient(circle, rgba(245,200,122,0.05) 0%, transparent 70%)', animationDelay: '4s' }} />
      {/* Tron corner brackets */}
      <div className="tron-corner corner-tl tron-corner-animated" /><div className="tron-corner corner-tr tron-corner-animated" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left: text ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Status badge with scan shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="tron-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1], boxShadow: ['0 0 0px #7ecba1', '0 0 8px #7ecba1', '0 0 0px #7ecba1'] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Available for opportunities
          </motion.div>

          {/* Name with flicker + letter-by-letter */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight tron-flicker"
          >
            {'Hi, I\'m '}
            <motion.span
              className="gradient-text tron-glow"
              animate={{ filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Aryan
            </motion.span>
            <br />
            <motion.span
              className="gradient-text tron-glow"
              animate={{ filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              Aman
            </motion.span>
          </motion.h1>

          {/* Typewriter with glowing cursor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-mono text-cyan-400 mb-6 h-8"
          >
            {displayed}
            <motion.span
              className="inline-block w-0.5 h-6 ml-1"
              style={{ background: '#c4b4e8', boxShadow: '0 0 8px #c4b4e8' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
          >
            Versatile Senior Software Engineer with <span className="text-indigo-400 font-semibold">6+ years</span> of experience
            crafting high-performance, scalable systems using{' '}
            <span className="text-cyan-400 font-semibold">GoLang</span>,{' '}
            <span className="text-emerald-400 font-semibold">Node.js</span>, and{' '}
            <span className="text-purple-400 font-semibold">Angular</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link to="contact" smooth duration={600} offset={-70}>
              <motion.button
                onHoverStart={() => soundEngine.hover()}
                onClick={() => soundEngine.click()}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-indigo-500/25 cursor-pointer transition-all"
              >
                Get In Touch
              </motion.button>
            </Link>
            <Link to="experience" smooth duration={600} offset={-70}>
              <motion.button
                onHoverStart={() => soundEngine.hover()}
                onClick={() => soundEngine.click()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-xl border border-indigo-500/40 text-indigo-300 font-semibold text-lg hover:bg-indigo-500/10 cursor-pointer transition-all"
              >
                View Work
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-5"
          >
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
                whileHover={{ scale: 1.25, y: -4,
                  boxShadow: '0 0 16px rgba(126,203,161,0.55), 0 0 30px rgba(126,203,161,0.2)',
                  borderColor: 'rgba(126,203,161,0.6)',
                }}
                whileTap={{ scale: 0.9 }}
                className="tron-icon w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all"
                title={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-slate-600 text-sm ml-2 font-mono"
            >
              Bengaluru, India 🇮🇳
            </motion.span>
          </motion.div>
        </motion.div>

        {/* ── Right: Arc Identity ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex justify-center items-center py-10"
        >
          <ArcIdentity />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <Link to="about" smooth duration={600} offset={-70} className="cursor-pointer">
          <motion.div
            onHoverStart={() => soundEngine.hover()}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 rounded-full border border-indigo-500/40 flex items-center justify-center text-indigo-400 hover:border-indigo-500 transition-colors"
          >
            <HiArrowDown size={18} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
