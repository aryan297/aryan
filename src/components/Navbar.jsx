import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import SoundToggle from './SoundToggle';
import { soundEngine } from '../utils/soundEngine';

const navLinks = [
  { name: 'HOME',       to: 'hero'       },
  { name: 'ABOUT',      to: 'about'      },
  { name: 'EXPERIENCE', to: 'experience' },
  { name: 'SKILLS',     to: 'skills'     },
  { name: 'CONTACT',    to: 'contact'    },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={scrolled ? {
        background: 'rgba(6,12,20,0.92)',
        borderColor: 'rgba(0,212,200,0.10)',
        backdropFilter: 'blur(20px)',
      } : {}}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'border-b shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo — terminal style */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => soundEngine.hover()}
            className="flex items-center gap-3"
          >
            {/* Bracket mark */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#00d4c8]/40 rounded-sm" />
              <div className="absolute top-0 left-0 w-2 h-0.5 bg-[#00d4c8]" />
              <div className="absolute top-0 left-0 w-0.5 h-2 bg-[#00d4c8]" />
              <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-[#00d4c8]" />
              <div className="absolute bottom-0 right-0 w-0.5 h-2 bg-[#00d4c8]" />
              <span className="font-space-mono text-[#00d4c8] text-sm font-bold">A</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-space-mono text-white text-sm font-bold tracking-widest uppercase">ARYAN_AMAN</span>
              <span className="font-space-mono text-[#00d4c8]/60 text-[9px] tracking-[0.3em] uppercase">SDE-3 // ENGINEER</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth
              duration={600}
              offset={-70}
              spy
              activeClass="active"
              onMouseEnter={() => soundEngine.hover()}
              className="nav-link font-space-mono text-[10px] font-bold text-[var(--text-mid)] hover:text-[#00d4c8] cursor-pointer transition-colors tracking-[0.2em]"
            >
              {link.name}
            </Link>
          ))}

          {/* Sound toggle */}
          <SoundToggle />

          <motion.a
            href="mailto:aryanaman97@gmail.com"
            onHoverStart={() => soundEngine.hover()}
            onClick={() => soundEngine.click()}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,212,200,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="font-space-mono text-[10px] font-bold tracking-[0.2em] px-5 py-2.5 border border-[#00d4c8]/60 text-[#00d4c8] hover:bg-[#00d4c8]/10 transition-all uppercase rounded-sm"
          >
            HIRE_ME
          </motion.a>
        </div>

        {/* Mobile row */}
        <div className="md:hidden flex items-center gap-3">
          <SoundToggle />
          <button
            className="text-[#00d4c8] text-2xl"
            onClick={() => { setMenuOpen(!menuOpen); soundEngine.click(); }}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(6,12,20,0.97)', borderColor: 'rgba(0,212,200,0.10)' }}
            className="md:hidden backdrop-blur-md border-t"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-70}
                  onClick={() => { setMenuOpen(false); soundEngine.click(); }}
                  onMouseEnter={() => soundEngine.hover()}
                  className="font-space-mono text-xs text-[var(--text-mid)] hover:text-[#00d4c8] font-bold py-2 cursor-pointer transition-colors border-b border-white/5 tracking-[0.2em]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
