import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaNpm, FaMedium } from 'react-icons/fa';
import { Link } from 'react-scroll';

const socialLinks = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/', label: 'LinkedIn' },
  { icon: FaGithub,   href: 'https://github.com/aryan297',                       label: 'GitHub'   },
  { icon: FaMedium,   href: 'https://medium.com/@aryanaman97',                   label: 'Medium'   },
  { icon: FaNpm,      href: 'https://www.npmjs.com/~aryan297',                   label: 'NPM'      },
];

const Footer = () => (
  <footer className="relative py-10 border-t overflow-hidden" style={{ borderColor: 'rgba(0,212,200,0.08)', background: 'rgba(6,12,20,0.80)' }}>
    {/* Tron scan line */}
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,212,200,0.4) 50%,transparent)' }} />
    <motion.div
      className="absolute top-0 left-0 h-px w-24"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,200,.9), transparent)' }}
      animate={{ x: ['0%', '1800%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
    />

    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
            <div className="relative w-8 h-8 flex items-center justify-center border border-[#00d4c8]/30 rounded-sm">
              <div className="absolute top-0 left-0 w-1.5 h-0.5 bg-[#00d4c8]" />
              <div className="absolute top-0 left-0 w-0.5 h-1.5 bg-[#00d4c8]" />
              <div className="absolute bottom-0 right-0 w-1.5 h-0.5 bg-[#00d4c8]" />
              <div className="absolute bottom-0 right-0 w-0.5 h-1.5 bg-[#00d4c8]" />
              <span className="font-space-mono text-[#00d4c8] text-xs font-bold">A</span>
            </div>
            <span className="font-space-mono text-xs font-bold text-white tracking-[0.2em] uppercase tron-glow">ARYAN_AMAN</span>
          </motion.div>
        </Link>

        {/* Copyright */}
        <p className="font-space-mono text-[9px] text-[var(--text-muted)] flex items-center gap-2 tracking-[0.2em] uppercase">
          <span className="text-[#00d4c8]/40">▋</span>
          Built with React &amp; Framer Motion
          <span className="text-[#00d4c8]/40">▋</span>
        </p>

        {/* Socials */}
        <div className="flex gap-2">
          {socialLinks.map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.2, y: -3, boxShadow: '0 0 14px rgba(0,212,200,0.5)', borderColor: 'rgba(0,212,200,0.5)' }}
              whileTap={{ scale: 0.9 }}
              className="tron-icon w-8 h-8 rounded-sm border border-white/10 bg-white/3 flex items-center justify-center text-[var(--text-muted)] transition-all"
              title={label}
            >
              <Icon size={13} />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="text-center mt-6 font-space-mono text-[9px] text-[var(--text-muted)] tracking-[0.3em] uppercase">
        © {new Date().getFullYear()} ARYAN AMAN · ALL RIGHTS RESERVED · SDE-3
      </div>
    </div>
  </footer>
);

export default Footer;
