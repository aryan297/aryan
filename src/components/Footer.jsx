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
  <footer
    className="relative py-10 overflow-hidden glass-premium"
    style={{ borderRadius: 0, borderTop: '1px solid var(--chip-border)' }}
  >
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,color-mix(in srgb, var(--red) 30%, transparent) 50%,transparent)' }} />

    <div className="page-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 text-center md:text-left">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
            <div
              className="relative w-8 h-8 flex items-center justify-center rounded-md overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--red) 0%, var(--magenta) 55%, var(--orchid) 100%)',
              }}
            >
              <span className="font-space-mono text-white text-xs font-semibold">A</span>
              <span className="absolute inset-0 rounded-md border border-white/25" />
            </div>
            <span className="font-space-mono text-xs font-semibold text-[var(--text-bright)] tracking-[0.2em] uppercase">ARYAN_AMAN</span>
          </motion.div>
        </Link>

        {/* Copyright */}
        <p className="font-space-mono text-[9px] text-[var(--text-muted)] flex items-center gap-2 tracking-[0.2em] uppercase">
          <span style={{ color: 'var(--red)', opacity: 0.4 }}>▋</span>
          Built with React &amp; Framer Motion
          <span style={{ color: 'var(--red)', opacity: 0.4 }}>▋</span>
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
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="tron-icon glass-chip w-8 h-8 rounded-md flex items-center justify-center text-[var(--text-mid)] transition-all"
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
