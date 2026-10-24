import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';

const navLinks = [
  { name: 'Home',       to: 'hero' },
  { name: 'About',      to: 'about' },
  { name: 'Experience', to: 'experience' },
  { name: 'Skills',     to: 'skills' },
  { name: 'Blogs',      to: 'blogs' },
  { name: 'Contact',    to: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'border-b' : ''
      }`}
      style={{
        ...(scrolled ? {
          background: 'var(--nav-scrolled-bg)',
          borderColor: 'var(--nav-scrolled-border)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: 'var(--nav-scrolled-shadow)',
        } : {
          background: 'transparent',
        }),
      }}
    >
      <div className="page-container py-5 flex items-center justify-between">
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-serif text-2xl font-bold" style={{ color: 'var(--royal)' }}>
              A.
            </span>
            <span className="hidden sm:inline font-sans text-[10px] font-medium tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
              Aryan Aman
            </span>
          </motion.div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth
              duration={600}
              offset={-80}
              spy
              activeClass="active"
              className="nav-link font-sans text-[11px] font-medium tracking-[0.12em] uppercase cursor-pointer"
              style={{ color: 'var(--text-mid)' }}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <SoundToggle />
          <motion.a
            href="mailto:aryanaman97@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-editorial-fill font-sans text-[10px] px-5 py-2.5"
          >
            Hire Me
          </motion.a>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <SoundToggle />
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="text-2xl p-1"
            style={{ color: 'var(--text-bright)' }}
            onClick={() => setMenuOpen(!menuOpen)}
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
            className="lg:hidden overflow-hidden border-t"
            style={{
              background: 'var(--menu-bg)',
              borderColor: 'var(--border)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-80}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm font-medium py-3 cursor-pointer transition-colors border-b"
                  style={{ color: 'var(--text-mid)', borderColor: 'var(--border-soft)' }}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="mailto:aryanaman97@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="btn-editorial-fill mt-4 text-center text-[11px] px-5 py-3"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
