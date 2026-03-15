import { motion } from 'framer-motion';

/* ---------------------------------------------------------------
   MetaMask-style low-poly geometric fox — fully SVG + Framer Motion
--------------------------------------------------------------- */
const MetaMaskFox = () => {
  const blink = {
    animate: {
      scaleY: [1, 1, 0.05, 1, 1],
      transition: { duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] },
    },
  };

  const earWiggleL = {
    animate: {
      rotate: [0, -8, 4, -4, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 },
    },
  };

  const earWiggleR = {
    animate: {
      rotate: [0, 8, -4, 4, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5, delay: 0.2 },
    },
  };

  const noseWiggle = {
    animate: {
      scale: [1, 1.12, 1, 1.06, 1],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 },
    },
  };

  const float = {
    animate: {
      y: [0, -12, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const glow = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.06, 1],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const shimmer = {
    animate: {
      x: [-120, 120],
      transition: { duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 },
    },
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        variants={glow}
        animate="animate"
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #e2761b44, #cd6116aa, #e4761b44, #f6851b88, #e2761b44)',
          filter: 'blur(24px)',
        }}
      />

      {/* Rotating gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #e4761b, #f6851b, #ffd33d, #cd6116, #763d16, #e4761b)',
          padding: '3px',
        }}
      >
        <div className="w-full h-full rounded-full bg-[#0a0f1e]" />
      </motion.div>

      {/* Fox SVG */}
      <motion.div
        variants={float}
        animate="animate"
        className="relative z-10"
        style={{ filter: 'drop-shadow(0 8px 32px rgba(228,118,27,0.45))' }}
      >
        <svg
          viewBox="0 0 200 220"
          width="260"
          height="286"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e4761b" />
              <stop offset="50%" stopColor="#f6851b" />
              <stop offset="100%" stopColor="#cd6116" />
            </linearGradient>
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f6851b" />
              <stop offset="100%" stopColor="#e4761b" />
            </linearGradient>
            <linearGradient id="muzzleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd33d" />
              <stop offset="100%" stopColor="#f6851b" />
            </linearGradient>
            <linearGradient id="innerEarL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd33d" />
              <stop offset="100%" stopColor="#f6851b" />
            </linearGradient>
            <linearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.25" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <clipPath id="faceClip">
              <ellipse cx="100" cy="130" rx="62" ry="70" />
            </clipPath>
          </defs>

          {/* ── Left ear (outer) ── */}
          <motion.g
            variants={earWiggleL}
            animate="animate"
            style={{ originX: '70px', originY: '75px' }}
          >
            {/* outer dark */}
            <polygon points="50,80 30,20 78,68" fill="#763d16" />
            {/* mid orange */}
            <polygon points="54,76 42,30 74,66" fill="#e4761b" />
            {/* inner yellow */}
            <polygon points="57,74 48,38 70,64" fill="url(#innerEarL)" />
          </motion.g>

          {/* ── Right ear (outer) ── */}
          <motion.g
            variants={earWiggleR}
            animate="animate"
            style={{ originX: '130px', originY: '75px' }}
          >
            <polygon points="150,80 170,20 122,68" fill="#763d16" />
            <polygon points="146,76 158,30 126,66" fill="#e4761b" />
            <polygon points="143,74 152,38 130,64" fill="url(#innerEarL)" />
          </motion.g>

          {/* ── Head / face base ── */}
          {/* Back-of-head dark polygon */}
          <polygon points="38,90 100,60 162,90 155,155 100,175 45,155" fill="#763d16" />

          {/* Main face polygons — low-poly style */}
          {/* Top face */}
          <polygon points="50,95 100,65 150,95 100,100" fill="#f6851b" />
          {/* Left cheek */}
          <polygon points="42,120 50,95 100,100 90,130" fill="#e4761b" />
          {/* Right cheek */}
          <polygon points="158,120 150,95 100,100 110,130" fill="#cd6116" />
          {/* Centre face */}
          <polygon points="100,100 90,130 100,145 110,130" fill="#ffd33d" />
          {/* Lower left */}
          <polygon points="42,120 90,130 70,158 48,145" fill="#e4761b" />
          {/* Lower right */}
          <polygon points="158,120 110,130 130,158 152,145" fill="#cd6116" />
          {/* Bottom chin */}
          <polygon points="70,158 100,168 130,158 100,145" fill="#f6851b" />

          {/* ── Muzzle / snout ── */}
          <ellipse cx="100" cy="148" rx="22" ry="16" fill="url(#muzzleGrad)" />
          <polygon points="78,145 100,138 122,145 100,152" fill="#ffd33d" opacity="0.6" />

          {/* ── Nose ── */}
          <motion.g variants={noseWiggle} animate="animate" style={{ originX: '100px', originY: '138px' }}>
            <ellipse cx="100" cy="138" rx="7" ry="5" fill="#1a1a2e" />
            <ellipse cx="97.5" cy="136.5" rx="2" ry="1.5" fill="white" opacity="0.5" />
          </motion.g>

          {/* ── Left eye ── */}
          <motion.g
            variants={blink}
            animate="animate"
            style={{ originX: '76px', originY: '112px' }}
          >
            {/* white of eye */}
            <ellipse cx="76" cy="112" rx="13" ry="13" fill="#1a1a2e" />
            {/* iris */}
            <ellipse cx="76" cy="112" rx="10" ry="10" fill="#2d2d5e" />
            {/* pupil */}
            <ellipse cx="76" cy="112" rx="6" ry="6" fill="#0d0d1a" />
            {/* shine */}
            <ellipse cx="72" cy="108" rx="2.5" ry="2" fill="white" opacity="0.8" />
            <ellipse cx="79" cy="115" rx="1.2" ry="1" fill="white" opacity="0.4" />
            {/* amber ring */}
            <ellipse cx="76" cy="112" rx="10" ry="10" fill="none" stroke="#f6851b" strokeWidth="1.5" opacity="0.6" />
          </motion.g>

          {/* ── Right eye ── */}
          <motion.g
            variants={blink}
            animate="animate"
            style={{ originX: '124px', originY: '112px' }}
          >
            <ellipse cx="124" cy="112" rx="13" ry="13" fill="#1a1a2e" />
            <ellipse cx="124" cy="112" rx="10" ry="10" fill="#2d2d5e" />
            <ellipse cx="124" cy="112" rx="6" ry="6" fill="#0d0d1a" />
            <ellipse cx="120" cy="108" rx="2.5" ry="2" fill="white" opacity="0.8" />
            <ellipse cx="127" cy="115" rx="1.2" ry="1" fill="white" opacity="0.4" />
            <ellipse cx="124" cy="112" rx="10" ry="10" fill="none" stroke="#f6851b" strokeWidth="1.5" opacity="0.6" />
          </motion.g>

          {/* ── Eyebrows (low-poly triangle brows) ── */}
          <polygon points="64,100 76,97 88,100 76,104" fill="#763d16" opacity="0.7" />
          <polygon points="112,100 124,97 136,100 124,104" fill="#763d16" opacity="0.7" />

          {/* ── Shimmer sheen sweep ── */}
          <clipPath id="headClip">
            <polygon points="38,90 100,60 162,90 155,155 100,175 45,155" />
          </clipPath>
          <motion.rect
            variants={shimmer}
            animate="animate"
            x="-30"
            y="60"
            width="50"
            height="130"
            fill="url(#glassSheen)"
            clipPath="url(#headClip)"
            style={{ rotate: -15 }}
          />
        </svg>
      </motion.div>

      {/* Floating tech badges */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-2 -right-4 bg-[#111827] border border-orange-500/40 rounded-xl px-3 py-2 shadow-xl shadow-orange-500/10"
      >
        <div className="text-xs text-slate-400">Experience</div>
        <div className="text-orange-400 font-bold text-lg">6+ yrs</div>
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute -bottom-2 -left-4 bg-[#111827] border border-yellow-500/30 rounded-xl px-3 py-2 shadow-xl shadow-yellow-500/10"
      >
        <div className="text-xs text-slate-400">Current</div>
        <div className="text-yellow-400 font-bold text-sm">SDE-3 @ Vola</div>
      </motion.div>

      <motion.div
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 -right-16 bg-[#111827] border border-amber-500/30 rounded-xl px-3 py-2 shadow-xl"
      >
        <div className="text-xs text-slate-400">Stack</div>
        <div className="text-amber-400 font-bold text-sm">Go · Node</div>
      </motion.div>
    </div>
  );
};

export default MetaMaskFox;
