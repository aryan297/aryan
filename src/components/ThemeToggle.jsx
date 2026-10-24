import { motion } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="w-9 h-9 flex items-center justify-center border transition-colors duration-300"
      style={{ borderColor: 'var(--border)', color: 'var(--text-mid)' }}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -40, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? <HiSun size={16} /> : <HiMoon size={16} />}
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;
