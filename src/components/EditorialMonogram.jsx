import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const PI2 = Math.PI * 2;

const ease = [0.22, 1, 0.36, 1];

const arcPath = (cx, cy, r, startDeg, endDeg) => {
  const s = (startDeg * Math.PI) / 180;
  const e = (endDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
};

const OrbitDot = ({ cx, cy, r, angle, size, color, delay }) => {
  const rad = (angle * Math.PI) / 180;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.3, 0.8] }}
      transition={{ repeat: Infinity, duration: 3, delay, ease: 'easeInOut' }}
    />
  );
};

const FloatingParticle = ({ x, y, size, color, delay, dur }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={size}
    fill={color}
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 0.8, 0],
      cy: [y, y - 15, y - 30],
    }}
    transition={{ repeat: Infinity, duration: dur, delay, ease: 'easeInOut' }}
  />
);

const EditorialMonogram = memo(() => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    const handleLeave = () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <motion.div
      className="relative select-none"
      style={{ width: 'min(100%, 320px)', aspectRatio: '1' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 1.2, ease }}
    >
      {/* Ambient glow — bold red */}
      <motion.div
        className="absolute inset-[-20%] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--tomato) 30%, transparent) 0%, color-mix(in srgb, var(--tomato) 15%, transparent) 35%, transparent 65%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />

      <div
        ref={containerRef}
        style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      >
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="AA monogram"
        >
          <defs>
            <linearGradient id="monoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--tomato)" />
              <stop offset="50%" stopColor="var(--royal)" />
              <stop offset="100%" stopColor="var(--tomato)" />
            </linearGradient>
            <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--tomato)" stopOpacity="1" />
              <stop offset="50%" stopColor="var(--tomato)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--tomato)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--tomato)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--tomato)" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="ringGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--tomato)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--tomato)" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="coreFill" cx="50%" cy="42%" r="55%">
              <stop offset="0%" stopColor="var(--bg-primary)" />
              <stop offset="100%" stopColor="var(--bg-surface)" />
            </radialGradient>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--tomato)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--tomato)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer tick marks — every major tick is red */}
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i / 60) * PI2 - Math.PI / 2;
            const major = i % 5 === 0;
            const r1 = major ? 147 : 150;
            const r2 = 156;
            return (
              <line
                key={`tick-${i}`}
                x1={CX + r1 * Math.cos(a)}
                y1={CY + r1 * Math.sin(a)}
                x2={CX + r2 * Math.cos(a)}
                y2={CY + r2 * Math.sin(a)}
                stroke={major ? 'var(--tomato)' : 'var(--tomato)'}
                strokeWidth={major ? 2.5 : 0.7}
                opacity={major ? 0.85 : 0.2}
              />
            );
          })}

          {/* Outer rotating ring — bold red segmented arcs */}
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mono-spin-cw 25s linear infinite' }}>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <path
                key={`outer-${i}`}
                d={arcPath(CX, CY, 140, deg, deg + 48)}
                stroke="url(#ringGrad1)"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </g>

          {/* Solid red accent ring */}
          <circle
            cx={CX}
            cy={CY}
            r={130}
            stroke="var(--tomato)"
            strokeWidth={2}
            fill="none"
            opacity={0.5}
          />

          {/* Inner rotating ring — bold red arcs, counter-clockwise */}
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mono-spin-ccw 18s linear infinite' }}>
            {[0, 90, 180, 270].map((deg, i) => (
              <path
                key={`inner-${i}`}
                d={arcPath(CX, CY, 120, deg, deg + 65)}
                stroke="url(#ringGrad2)"
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </g>

          {/* Middle dashed ring — bold red */}
          <circle
            cx={CX}
            cy={CY}
            r={108}
            stroke="var(--tomato)"
            strokeWidth={1.5}
            fill="none"
            opacity={0.5}
            strokeDasharray="6 6"
            style={{ animation: 'mono-spin-cw 40s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }}
          />

          {/* Bold red accent ring — slow spin */}
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mono-spin-ccw 30s linear infinite' }}>
            {[0, 120, 240].map((deg, i) => (
              <path
                key={`accent-${i}`}
                d={arcPath(CX, CY, 98, deg, deg + 80)}
                stroke="url(#ringGrad3)"
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </g>

          {/* Thick red glow ring */}
          <circle cx={CX} cy={CY} r={78} fill="none" stroke="var(--tomato)" strokeWidth={5} opacity={0.1} />
          <circle cx={CX} cy={CY} r={78} fill="none" stroke="var(--tomato)" strokeWidth={1.5} opacity={0.5} />

          {/* Static guide circle */}
          <circle cx={CX} cy={CY} r={88} stroke="var(--tomato)" strokeWidth={1} fill="none" opacity={0.3} />

          {/* Orbit dots — bold red */}
          <OrbitDot cx={CX} cy={CY} r={130} angle={30} size={3.5} color="var(--tomato)" delay={0} />
          <OrbitDot cx={CX} cy={CY} r={130} angle={110} size={3} color="var(--tomato)" delay={0.5} />
          <OrbitDot cx={CX} cy={CY} r={130} angle={200} size={2.5} color="var(--tomato)" delay={1.0} />
          <OrbitDot cx={CX} cy={CY} r={130} angle={290} size={3} color="var(--tomato)" delay={1.5} />
          <OrbitDot cx={CX} cy={CY} r={110} angle={60} size={2.5} color="var(--tomato)" delay={0.3} />
          <OrbitDot cx={CX} cy={CY} r={110} angle={180} size={3} color="var(--tomato)" delay={0.9} />
          <OrbitDot cx={CX} cy={CY} r={110} angle={300} size={2.5} color="var(--tomato)" delay={1.8} />

          {/* Floating particles — red */}
          <FloatingParticle x={CX - 50} y={CY + 60} size={1.5} color="var(--tomato)" delay={0} dur={4} />
          <FloatingParticle x={CX + 55} y={CY + 45} size={1.2} color="var(--tomato)" delay={1.5} dur={3.5} />
          <FloatingParticle x={CX - 30} y={CY + 70} size={1} color="var(--tomato)" delay={2.5} dur={4.5} />
          <FloatingParticle x={CX + 40} y={CY + 65} size={1.3} color="var(--tomato)" delay={0.8} dur={3.8} />

          {/* Core circle with bold red border */}
          <circle cx={CX} cy={CY} r={72} fill="url(#coreFill)" />
          <circle cx={CX} cy={CY} r={72} fill="url(#coreGlow)" />
          <circle cx={CX} cy={CY} r={72} stroke="var(--tomato)" strokeWidth={3} fill="none" opacity={0.55} />

          {/* Inner decorative ring — red */}
          <circle cx={CX} cy={CY} r={58} stroke="var(--tomato)" strokeWidth={1} fill="none" opacity={0.35} />

          {/* Crosshair lines inside core — red */}
          <line x1={CX - 32} y1={CY} x2={CX - 18} y2={CY} stroke="var(--tomato)" strokeWidth={1.2} opacity={0.45} />
          <line x1={CX + 18} y1={CY} x2={CX + 32} y2={CY} stroke="var(--tomato)" strokeWidth={1.2} opacity={0.45} />
          <line x1={CX} y1={CY - 32} x2={CX} y2={CY - 18} stroke="var(--tomato)" strokeWidth={1.2} opacity={0.45} />
          <line x1={CX} y1={CY + 18} x2={CX} y2={CY + 32} stroke="var(--tomato)" strokeWidth={1.2} opacity={0.45} />

          {/* AA monogram — royal blue */}
          <text
            x={CX}
            y={CY - 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="42"
            fontWeight="700"
            fontFamily="Playfair Display, Georgia, serif"
            fill="var(--royal)"
            letterSpacing="-2"
          >
            AA
          </text>

          {/* Subtitle — royal blue */}
          <text
            x={CX}
            y={CY + 24}
            textAnchor="middle"
            dominantBaseline="hanging"
            fontSize="6"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="3"
            fill="var(--royal)"
            opacity="0.7"
          >
            ARYAN AMAN
          </text>

          {/* Cardinal markers — bold red */}
          {[0, 90, 180, 270].map((deg, i) => {
            const a = ((deg - 90) * Math.PI) / 180;
            return (
              <g key={`card-${i}`}>
                <line
                  x1={CX + 142 * Math.cos(a)}
                  y1={CY + 142 * Math.sin(a)}
                  x2={CX + 156 * Math.cos(a)}
                  y2={CY + 156 * Math.sin(a)}
                  stroke="var(--tomato)"
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.85}
                />
                <circle
                  cx={CX + 158 * Math.cos(a)}
                  cy={CY + 158 * Math.sin(a)}
                  r={3}
                  fill="var(--tomato)"
                  opacity={0.75}
                />
              </g>
            );
          })}
        </svg>
      </div>
      {/* Floating info badges like old ArcIdentity */}
      <motion.div
        className="absolute top-0 right-0 px-2.5 py-1.5 border hidden sm:block"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease }}
      >
        <div className="font-sans text-[7px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>Experience</div>
        <div className="font-serif text-xs font-bold" style={{ color: 'var(--tomato)' }}>6+ yrs</div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 px-2.5 py-1.5 border hidden sm:block"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease }}
      >
        <div className="font-sans text-[7px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>Current</div>
        <div className="font-serif text-xs font-bold" style={{ color: 'var(--tomato)' }}>SDE-3</div>
      </motion.div>

      <motion.div
        className="absolute top-[42%] right-0 px-2.5 py-1.5 border hidden lg:block"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease }}
      >
        <div className="font-sans text-[7px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>Stack</div>
        <div className="font-serif text-xs font-bold" style={{ color: 'var(--royal)' }}>Go · Node</div>
      </motion.div>
    </motion.div>
  );
});

EditorialMonogram.displayName = 'EditorialMonogram';

export default EditorialMonogram;
