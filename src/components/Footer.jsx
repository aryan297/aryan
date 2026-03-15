import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaNpm, FaMedium, FaHeart } from 'react-icons/fa';
import { Link } from 'react-scroll';

const socialLinks = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/', label: 'LinkedIn' },
  { icon: FaGithub,   href: 'https://github.com/aryan297',                       label: 'GitHub'   },
  { icon: FaMedium,   href: 'https://medium.com/@aryanaman97',                   label: 'Medium'   },
  { icon: FaNpm,      href: 'https://www.npmjs.com/~aryan297',                   label: 'NPM'      },
];

const Footer = () => (
  <footer className="relative py-10 border-t border-white/5 bg-[var(--bg-surface)]/60 overflow-hidden">
    {/* Tron top scan line */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    <motion.div
      className="absolute top-0 left-0 h-px w-24"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(126,203,161,.9), transparent)' }}
      animate={{ x: ['0%', '1800%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
    />

    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white"
              animate={{ boxShadow: ['0 0 0px rgba(99,102,241,0)', '0 0 14px rgba(99,102,241,0.6)', '0 0 0px rgba(99,102,241,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              A
            </motion.div>
            <span className="font-bold text-white tron-glow">Aryan Aman</span>
          </motion.div>
        </Link>

        {/* Copyright */}
        <p className="text-slate-500 text-sm flex items-center gap-1 font-mono">
          Built with{' '}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaHeart className="text-rose-500 mx-1" size={12} />
          </motion.span>
          {' '}using React &amp; Framer Motion
        </p>

        {/* Socials */}
        <div className="flex gap-3">
          {socialLinks.map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{
                scale: 1.25, y: -4,
                boxShadow: '0 0 16px rgba(126,203,161,0.55)',
              }}
              whileTap={{ scale: 0.9 }}
              className="tron-icon w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all"
              title={label}
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-slate-600 font-mono tracking-widest">
        © {new Date().getFullYear()} ARYAN AMAN · ALL RIGHTS RESERVED
      </div>
    </div>
  </footer>
);

export default Footer;
