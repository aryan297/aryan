import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaNpm, FaMedium } from 'react-icons/fa';
import { Link } from 'react-scroll';

const socialLinks = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/', label: 'LinkedIn' },
  { icon: FaGithub,   href: 'https://github.com/aryan297',                       label: 'GitHub' },
  { icon: FaMedium,   href: 'https://medium.com/@aryanaman97',                   label: 'Medium' },
  { icon: FaNpm,      href: 'https://www.npmjs.com/~aryan297',                   label: 'NPM' },
];

const Footer = () => (
  <footer className="py-12 border-t" style={{ borderColor: 'var(--border)' }}>
    <div className="page-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div className="flex items-center gap-3" whileHover={{ opacity: 0.7 }}>
            <span className="font-serif text-xl font-bold" style={{ color: 'var(--royal)' }}>A.</span>
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
              Aryan Aman
            </span>
          </motion.div>
        </Link>

        {/* Socials */}
        <div className="flex gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center border transition-colors duration-300"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              title={label}
            >
              <Icon size={12} />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-soft)' }}>
        <p className="font-sans text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Aryan Aman. All Rights Reserved.
        </p>
        <p className="font-sans text-[10px] tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>
          Built with React & Framer Motion
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
