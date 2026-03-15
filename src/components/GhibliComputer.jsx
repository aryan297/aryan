import { useRef } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';

/* ─────────────────────────────────────────
   "Mori-kun" — A Ghibli forest-spirit bot
   Inspired by Totoro + Laputa robots + Kodama
   Pure SVG + Framer Motion
───────────────────────────────────────────── */

/* Orbital soot sprite (Susuwatari-inspired) */
const SootSprite = ({ radius, period, phase, size = 10, delay = 0 }) => {
  const pts = Array.from({ length: 9 }, (_, i) => {
    const angle = phase + (i / 8) * 2 * Math.PI;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  });
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: size, height: size, borderRadius: '50%', background: '#1a1a2e', top: '50%', left: '50%', marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ x: pts.map(p => p[0]), y: pts.map(p => p[1]) }}
      transition={{ duration: period, repeat: Infinity, ease: 'linear', delay }}
    >
      {/* tiny eyes */}
      <div style={{ position: 'absolute', top: '28%', left: '18%', width: size * 0.22, height: size * 0.22, borderRadius: '50%', background: '#f0f4e8' }} />
      <div style={{ position: 'absolute', top: '28%', right: '18%', width: size * 0.22, height: size * 0.22, borderRadius: '50%', background: '#f0f4e8' }} />
    </motion.div>
  );
};

/* Twinkling star particle */
const Star = ({ x, y, size = 6, delay = 0 }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
    transition={{ duration: 2.5 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  >
    <svg viewBox="0 0 10 10" width={size} height={size}>
      <polygon points="5,0 6,4 10,4 7,6 8,10 5,7 2,10 3,6 0,4 4,4" fill="#ffd700" />
    </svg>
  </motion.div>
);

/* Floating leaf */
const Leaf = ({ x, y, delay = 0 }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ y: [0, -10, 3, -7, 0], rotate: [-10, 15, -5, 10, -10], opacity: [0.6, 1, 0.7, 1, 0.6] }}
    transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  >
    <svg viewBox="0 0 14 20" width="14" height="20">
      <path d="M7 2 Q14 8 10 16 Q7 19 4 16 Q0 8 7 2Z" fill="#6ab04c" opacity="0.75" />
      <path d="M7 4 Q7 12 7 18" stroke="#4a8a3a" strokeWidth="1" fill="none" />
    </svg>
  </motion.div>
);

const GhibliComputer = () => {
  const blink = {
    animate: {
      scaleY: [1, 1, 1, 0.04, 1, 1],
      transition: { duration: 5, repeat: Infinity, times: [0, 0.38, 0.42, 0.46, 0.50, 1], ease: 'easeInOut' },
    },
  };

  const codeLine = (delayOffset) => ({
    animate: {
      opacity: [0.3, 0.9, 0.5, 1, 0.3],
      transition: { duration: 2, repeat: Infinity, delay: delayOffset, ease: 'easeInOut' },
    },
  });

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 320, height: 380 }}
      onClick={() => soundEngine.boop()}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,180,120,0.22) 0%, rgba(0,201,167,0.12) 45%, transparent 70%)',
          filter: 'blur(18px)',
        }}
      />

      {/* Floating soot sprites */}
      <SootSprite radius={118} period={9}  phase={0}           size={13} delay={0} />
      <SootSprite radius={100} period={12} phase={Math.PI * 0.7} size={10} delay={0.5} />
      <SootSprite radius={130} period={15} phase={Math.PI * 1.4} size={8}  delay={1.2} />

      {/* Sparkle stars */}
      <Star x={22}  y={30}  size={8}  delay={0.2} />
      <Star x={268} y={50}  size={6}  delay={0.9} />
      <Star x={280} y={200} size={7}  delay={1.5} />
      <Star x={10}  y={220} size={5}  delay={0.4} />
      <Star x={145} y={10}  size={9}  delay={1.1} />

      {/* Floating leaves */}
      <Leaf x={15}  y={100} delay={0} />
      <Leaf x={275} y={130} delay={1.8} />
      <Leaf x={60}  y={310} delay={0.7} />

      {/* The character — gently floating */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <svg viewBox="0 0 180 230" width="300" height="383" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bodyGradG" cx="35%" cy="30%">
              <stop offset="0%" stopColor="#9ec4a8" />
              <stop offset="60%" stopColor="#7aab78" />
              <stop offset="100%" stopColor="#527a55" />
            </radialGradient>
            <radialGradient id="eyeGradG" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffe57a" />
              <stop offset="45%" stopColor="#f5c030" />
              <stop offset="100%" stopColor="#b88000" />
            </radialGradient>
            <radialGradient id="pupilGrad" cx="35%" cy="30%">
              <stop offset="0%" stopColor="#1a3a2a" />
              <stop offset="100%" stopColor="#0a1a12" />
            </radialGradient>
            <radialGradient id="screenGradG">
              <stop offset="0%" stopColor="#00f5cc" />
              <stop offset="100%" stopColor="#00897b" />
            </radialGradient>
            <radialGradient id="blushGrad">
              <stop offset="0%" stopColor="#f4a0a0" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#f4a0a0" stopOpacity="0" />
            </radialGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="eyeFilter">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── Antennae ── */}
          <line x1="70" y1="38" x2="55" y2="8"  stroke="#6a9a6a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="110" y1="38" x2="125" y2="8" stroke="#6a9a6a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Star tips */}
          <motion.g
            animate={{ rotate: [0, 20, -10, 15, 0], scale: [1, 1.15, 0.95, 1.1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '55px', originY: '8px' }}
          >
            <polygon points="55,3 56.5,7 61,7 57.5,9.5 58.5,14 55,11 51.5,14 52.5,9.5 49,7 53.5,7" fill="#ffd700" />
          </motion.g>
          <motion.g
            animate={{ rotate: [0, -15, 10, -12, 0], scale: [1, 1.1, 1.0, 1.12, 1] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{ originX: '125px', originY: '8px' }}
          >
            <polygon points="125,3 126.5,7 131,7 127.5,9.5 128.5,14 125,11 121.5,14 122.5,9.5 119,7 123.5,7" fill="#ffd700" />
          </motion.g>

          {/* ── Ears (leaf-like organic) ── */}
          <motion.g
            animate={{ rotate: [-4, 6, -2, 5, -4] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '55px', originY: '52px' }}
          >
            <ellipse cx="52" cy="40" rx="13" ry="20" fill="#5e8f60" transform="rotate(-25 52 52)" />
            <ellipse cx="52" cy="42" rx="7"  ry="13" fill="#88c090" transform="rotate(-25 52 52)" />
          </motion.g>
          <motion.g
            animate={{ rotate: [4, -6, 2, -5, 4] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            style={{ originX: '128px', originY: '52px' }}
          >
            <ellipse cx="128" cy="40" rx="13" ry="20" fill="#5e8f60" transform="rotate(25 128 52)" />
            <ellipse cx="128" cy="42" rx="7"  ry="13" fill="#88c090" transform="rotate(25 128 52)" />
          </motion.g>

          {/* ── Head ── */}
          <motion.ellipse
            cx="90" cy="82" rx="52" ry="50" fill="url(#bodyGradG)"
            animate={{ scaleX: [1, 1.012, 1], scaleY: [1, 0.992, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '90px', originY: '82px' }}
          />
          {/* Face lighter panel */}
          <ellipse cx="90" cy="88" rx="40" ry="35" fill="#b5d4b2" opacity="0.42" />

          {/* Cheek blushes */}
          <ellipse cx="50"  cy="94" rx="16" ry="10" fill="url(#blushGrad)" />
          <ellipse cx="130" cy="94" rx="16" ry="10" fill="url(#blushGrad)" />

          {/* ── Left eye ── */}
          {/* Socket */}
          <ellipse cx="71" cy="80" rx="18" ry="20" fill="#1a2d1a" />
          {/* Iris — blinking */}
          <motion.ellipse
            cx="71" cy="80" rx="15" ry="17"
            fill="url(#eyeGradG)"
            filter="url(#eyeFilter)"
            variants={blink}
            animate="animate"
            style={{ originX: '71px', originY: '80px' }}
          />
          {/* Pupil */}
          <motion.ellipse
            cx="71" cy="80" rx="8" ry="9"
            fill="url(#pupilGrad)"
            variants={blink}
            animate="animate"
            style={{ originX: '71px', originY: '80px' }}
          />
          {/* Shines */}
          <circle cx="65" cy="73" r="4"   fill="white" opacity="0.92" />
          <circle cx="74" cy="85" r="2"   fill="white" opacity="0.5" />
          {/* Glow ring */}
          <motion.ellipse
            cx="71" cy="80" rx="16" ry="18" fill="none" stroke="#f5c030" strokeWidth="1.8"
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── Right eye ── */}
          <ellipse cx="109" cy="80" rx="18" ry="20" fill="#1a2d1a" />
          <motion.ellipse
            cx="109" cy="80" rx="15" ry="17"
            fill="url(#eyeGradG)"
            filter="url(#eyeFilter)"
            variants={blink}
            animate="animate"
            style={{ originX: '109px', originY: '80px' }}
          />
          <motion.ellipse
            cx="109" cy="80" rx="8" ry="9"
            fill="url(#pupilGrad)"
            variants={blink}
            animate="animate"
            style={{ originX: '109px', originY: '80px' }}
          />
          <circle cx="103" cy="73" r="4"  fill="white" opacity="0.92" />
          <circle cx="112" cy="85" r="2"  fill="white" opacity="0.5" />
          <motion.ellipse
            cx="109" cy="80" rx="16" ry="18" fill="none" stroke="#f5c030" strokeWidth="1.8"
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
          />

          {/* ── Nose ── */}
          <motion.ellipse
            cx="90" cy="99" rx="3.5" ry="2.5" fill="#3a5a3a"
            animate={{ scaleX: [1, 1.15, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          />

          {/* ── Smile ── */}
          <path d="M 74 110 Q 90 122 106 110" stroke="#3a6040" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Smile shine */}
          <path d="M 78 109 Q 90 120 102 109" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35" />

          {/* ── Neck ── */}
          <rect x="78" y="130" width="24" height="16" rx="6" fill="#6a9070" />

          {/* ── Body ── */}
          <motion.ellipse
            cx="90" cy="178" rx="44" ry="48" fill="url(#bodyGradG)"
            animate={{ scaleX: [1, 1.015, 1], scaleY: [1, 0.988, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{ originX: '90px', originY: '178px' }}
          />

          {/* Chest panel */}
          <rect x="60" y="148" width="60" height="58" rx="12" fill="#0d1f1a" />
          {/* Screen teal glow */}
          <motion.rect
            x="60" y="148" width="60" height="58" rx="12" fill="#5bb88a"
            animate={{ opacity: [0.06, 0.15, 0.06] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Code lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.rect
              key={i}
              x="68"
              y={157 + i * 7}
              width={[28, 40, 22, 36, 30, 18][i]}
              height="3"
              rx="1.5"
              fill={i % 2 === 0 ? '#7ecba1' : '#00b89a'}
              {...codeLine(i * 0.3)}
            />
          ))}
          {/* Indicator dots */}
          <motion.circle cx="70"  cy="200" r="4" fill="#ff6b6b" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <motion.circle cx="82"  cy="200" r="4" fill="#ffd700" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
          <motion.circle cx="94"  cy="200" r="4" fill="#7ecba1" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.3, repeat: Infinity, delay: 0.6 }} />
          <motion.circle cx="106" cy="200" r="4" fill="#6ab04c" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.9 }} />

          {/* ── Arms ── */}
          <motion.g
            animate={{ rotate: [-8, 4, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '44px', originY: '155px' }}
          >
            <ellipse cx="44" cy="168" rx="14" ry="28" fill="#7aab78" transform="rotate(-12 44 155)" />
            <circle  cx="38" cy="195"  r="12" fill="#9dbf9a" />
          </motion.g>
          <motion.g
            animate={{ rotate: [8, -4, 8] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            style={{ originX: '136px', originY: '155px' }}
          >
            <ellipse cx="136" cy="168" rx="14" ry="28" fill="#6a9a70" transform="rotate(12 136 155)" />
            <circle  cx="142" cy="195" r="12" fill="#9dbf9a" />
          </motion.g>

          {/* Glowing orb between hands */}
          <motion.circle
            cx="90" cy="208" r="15" fill="#7ecba1"
            animate={{ r: [15, 19, 15], opacity: [0.18, 0.40, 0.18] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="90" cy="208" r="11" fill="#5bb88a" opacity="0.75" />
          <circle cx="85" cy="203" r="3.5" fill="white" opacity="0.65" />
          {/* tiny circuit lines on orb */}
          <line x1="88" y1="210" x2="96" y2="210" stroke="#7ecba1" strokeWidth="1" opacity="0.6" />
          <line x1="92" y1="206" x2="92" y2="214" stroke="#7ecba1" strokeWidth="1" opacity="0.6" />

          {/* ── Legs ── */}
          <ellipse cx="73"  cy="221" rx="18" ry="14" fill="#6a9070" />
          <ellipse cx="107" cy="221" rx="18" ry="14" fill="#5e8060" />
          {/* Feet */}
          <ellipse cx="73"  cy="229" rx="22" ry="9"  fill="#527a55" />
          <ellipse cx="107" cy="229" rx="22" ry="9"  fill="#4a7050" />

          {/* ── Body detail: shoulder rivets ── */}
          <circle cx="52"  cy="152" r="4" fill="#88c090" />
          <circle cx="128" cy="152" r="4" fill="#88c090" />
          <circle cx="52"  cy="152" r="2" fill="#c8e8c0" />
          <circle cx="128" cy="152" r="2" fill="#c8e8c0" />

          {/* ── Eye glow halos (behind eyes, blurred) ── */}
          <motion.ellipse
            cx="71" cy="80" rx="22" ry="24" fill="#f5c030"
            animate={{ opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: 'blur(4px)' }}
          />
          <motion.ellipse
            cx="109" cy="80" rx="22" ry="24" fill="#f5c030"
            animate={{ opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            style={{ filter: 'blur(4px)' }}
          />
        </svg>
      </motion.div>

      {/* Floating info badges — Ghibli-Tron palette */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 right-0 rounded-xl px-3 py-2"
        style={{ background: 'var(--bg-card)', border: '1px solid rgba(126,203,161,0.28)', boxShadow: '0 0 18px rgba(126,203,161,0.14)' }}
      >
        <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Experience</div>
        <div className="font-bold text-lg" style={{ color: 'var(--mint)' }}>6+ yrs</div>
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-0 rounded-xl px-3 py-2"
        style={{ background: 'var(--bg-card)', border: '1px solid rgba(196,180,232,0.28)', boxShadow: '0 0 18px rgba(196,180,232,0.12)' }}
      >
        <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Current</div>
        <div className="font-bold text-sm" style={{ color: 'var(--lav)' }}>SDE-3 @ Vola</div>
      </motion.div>

      <motion.div
        animate={{ x: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 -right-2 rounded-xl px-3 py-2"
        style={{ background: 'var(--bg-card)', border: '1px solid rgba(245,200,122,0.28)', boxShadow: '0 0 18px rgba(245,200,122,0.10)' }}
      >
        <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Stack</div>
        <div className="font-bold text-sm" style={{ color: 'var(--gold)' }}>Go · Node</div>
      </motion.div>

      {/* Click hint */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-slate-600 font-mono whitespace-nowrap"
      >
        click me ✨
      </motion.div>
    </div>
  );
};

export default GhibliComputer;
