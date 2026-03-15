import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaNpm, FaMedium, FaHeart } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Footer = () => (
  <footer className="relative py-10 border-t border-white/5 bg-[var(--bg-surface)]/60">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white">
              A
            </div>
            <span className="font-bold text-white">Aryan Aman</span>
          </div>
        </Link>

        {/* Copyright */}
        <p className="text-slate-500 text-sm flex items-center gap-1">
          Built with <FaHeart className="text-rose-500 mx-1" size={12} /> using React & Framer Motion
        </p>

        {/* Socials */}
        <div className="flex gap-3">
          {[
            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aryanaman-a4a5bb144/' },
            { icon: FaGithub, href: 'https://github.com/aryan297' },
            { icon: FaMedium, href: 'https://medium.com/@aryanaman97' },
            { icon: FaNpm, href: 'https://www.npmjs.com/~aryan297' },
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-slate-600">
        © {new Date().getFullYear()} Aryan Aman. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
