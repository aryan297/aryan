import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import SoundToggle from './SoundToggle';
import ThemeToggle from './ThemeToggle';
import { soundEngine } from '../utils/soundEngine';

const navLinks = [
  { name: 'HOME',       to: 'hero'       },
  { name: 'ABOUT',      to: 'about'      },
  { name: 'EXPERIENCE', to: 'experience' },
  { name: 'SKILLS',     to: 'skills'     },
  { name: 'BLOGS',      to: 'blogs'      },
  { name: 'CONTACT',    to: 'contact'    },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        animation: 'entry-fade-down 0.6s ease forwards',
        ...(scrolled ? {
          background: 'var(--nav-scrolled-bg)',
          borderColor: 'var(--nav-scrolled-border)',
          backdropFilter: 'blur(10px) saturate(140%)',
          WebkitBackdropFilter: 'blur(10px) saturate(140%)',
          boxShadow: 'var(--nav-scrolled-shadow), inset 0 1px 0 var(--glass-highlight)',
        } : {
          background: 'transparent',
        }),
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'border-b' : ''
      }`}
    >
      {/* Scroll progress — soft accent bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] origin-left transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--red), var(--magenta), var(--orchid))',
        }}
      />

      <div className="page-container py-3 sm:py-4 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer min-w-0">
          <div
            className="flex items-center gap-2 sm:gap-3"
            onMouseEnter={() => soundEngine.hover()}
            style={{ transition: 'transform 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <div
              className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md overflow-hidden shrink-0"
              style={{
                background: 'linear-gradient(135deg, var(--red) 0%, var(--magenta) 55%, var(--orchid) 100%)',
                boxShadow: '0 3px 10px -4px color-mix(in srgb, var(--red) 40%, transparent)',
              }}
            >
              <span className="font-space-mono text-white text-sm font-semibold">A</span>
              <span className="absolute inset-0 rounded-md border border-white/25" />
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <span className="font-space-mono text-[var(--text-bright)] text-xs sm:text-sm font-semibold tracking-widest uppercase truncate">ARYAN_AMAN</span>
              <span className="hidden sm:block font-space-mono text-[var(--red)] text-[9px] tracking-[0.3em] uppercase">SDE-3 // ENGINEER</span>
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth duration={600} offset={-70}
              spy activeClass="active"
              onMouseEnter={() => soundEngine.hover()}
              className="nav-link font-space-mono text-[10px] font-medium text-[var(--text-mid)] hover:text-[var(--red)] cursor-pointer transition-colors tracking-[0.2em]"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <SoundToggle />
          <a
            href="mailto:aryanaman97@gmail.com"
            onMouseEnter={() => soundEngine.hover()}
            onClick={() => soundEngine.click()}
            className="btn-primary font-space-mono text-[10px] font-semibold tracking-[0.2em] px-5 py-2.5 uppercase rounded-md"
          >
            HIRE_ME
          </a>
        </div>

        {/* Tablet / Mobile */}
        <div className="lg:hidden flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />
          <SoundToggle />
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="text-[var(--red)] text-2xl p-1"
            onClick={() => { setMenuOpen(!menuOpen); soundEngine.click(); }}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--menu-bg)',
              borderColor: 'var(--chip-border)',
              backdropFilter: 'blur(22px) saturate(165%)',
              WebkitBackdropFilter: 'blur(22px) saturate(165%)',
              boxShadow: 'inset 0 1px 0 var(--glass-highlight)',
            }}
            className="lg:hidden border-t overflow-hidden"
          >
            <div className="flex flex-col px-5 sm:px-6 py-4 gap-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth duration={600} offset={-70}
                  onClick={() => { setMenuOpen(false); soundEngine.click(); }}
                  onMouseEnter={() => soundEngine.hover()}
                  className="font-space-mono text-xs text-[var(--text-mid)] hover:text-[var(--red)] font-medium py-3 cursor-pointer transition-colors border-b border-[var(--border-soft)] tracking-[0.2em]"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="mailto:aryanaman97@gmail.com"
                onClick={() => { setMenuOpen(false); soundEngine.click(); }}
                className="btn-primary mt-3 text-center font-space-mono text-[10px] font-semibold tracking-[0.2em] px-5 py-3 uppercase rounded-md"
              >
                HIRE_ME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
