import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import SoundToggle from './SoundToggle';
import { soundEngine } from '../utils/soundEngine';

const navLinks = [
  { name: 'Home',       to: 'hero'       },
  { name: 'About',      to: 'about'      },
  { name: 'Experience', to: 'experience' },
  { name: 'Skills',     to: 'skills'     },
  { name: 'Contact',    to: 'contact'    },
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
      style={scrolled ? { background: 'rgba(7,16,28,0.88)', borderColor: 'rgba(126,203,161,0.12)' } : {}}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl border-b shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => soundEngine.hover()}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-lg shadow-lg">
              A
            </div>
            <span className="font-bold text-lg text-white">
              Aryan<span className="text-indigo-400">.</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
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
              className="nav-link text-sm font-medium text-slate-300 hover:text-indigo-400 cursor-pointer transition-colors"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile row: sound toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <SoundToggle />
          <button
            className="text-white text-2xl"
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
            style={{ background: 'rgba(7,16,28,0.96)', borderColor: 'rgba(126,203,161,0.10)' }}
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
                  className="text-slate-300 hover:text-indigo-400 font-medium py-2 cursor-pointer transition-colors border-b border-white/5"
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
