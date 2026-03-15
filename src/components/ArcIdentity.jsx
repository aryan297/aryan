import { motion } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';

/* ═══════════════════════════════════════════════════════════
   Arc Identity — Iron Man arc reactor × Tron identity disc
   Pure CSS + SVG + Framer Motion
   Palette: Ghibli-Tron (mint #7ecba1 / lavender #c4b4e8 / gold #f5c87a)
═══════════════════════════════════════════════════════════ */

const SIZE   = 300;          // outer container px
const CX     = SIZE / 2;
const CY     = SIZE / 2;
const TWO_PI = Math.PI * 2;

/* Build SVG arc path */
const arcPath = (cx, cy, r, startDeg, endDeg) => {
  const s = (startDeg * Math.PI) / 180;
  const e = (endDeg   * Math.PI) / 180;
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
};

/* Tick marks at N/S/E/W + 45° diagonals */
const ticks = (cx, cy, r, count, len, color, opacity) =>
  Array.from({ length: count }, (_, i) => {
    const a = (i / count) * TWO_PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(a);
    const y1 = cy + r * Math.sin(a);
    const x2 = cx + (r + len) * Math.cos(a);
    const y2 = cy + (r + len) * Math.sin(a);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={i % (count / 4) === 0 ? 2 : 0.8} opacity={i % (count / 4) === 0 ? opacity * 1.6 : opacity} />;
  });

/* Segmented ring — Tron-style gaps */
const segRing = (cx, cy, r, segments, gap, color, width, opacity) =>
  Array.from({ length: segments }, (_, i) => {
    const segSize = 360 / segments;
    const start   = i * segSize + gap / 2;
    const end     = (i + 1) * segSize - gap / 2;
    return (
      <path
        key={i}
        d={arcPath(cx, cy, r, start, end)}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
        opacity={opacity}
      />
    );
  });

const ArcIdentity = () => (
  <div
    className="relative flex items-center justify-center select-none cursor-pointer"
    style={{ width: SIZE, height: SIZE }}
    onClick={() => soundEngine.boop()}
  >
    {/* ── Deep space ambient glow ── */}
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.06, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', inset: -24, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(126,203,161,0.18) 0%, rgba(196,180,232,0.10) 40%, transparent 70%)',
        filter: 'blur(16px)',
      }}
    />

    {/* ── Ring 1: outer slow-spin conic (Tron disc) ── */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        width: SIZE - 4, height: SIZE - 4,
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, rgba(126,203,161,0.7), rgba(196,180,232,0.5), rgba(245,200,122,0.5), rgba(126,203,161,0.7))',
        padding: 2,
      }}
    >
      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-primary)' }} />
    </motion.div>

    {/* ── SVG layer ── */}
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE}
      height={SIZE}
      style={{ position: 'absolute', top: 0, left: 0 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1a2e28" />
          <stop offset="100%" stopColor="#07101c" />
        </radialGradient>
        <filter id="arcGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="textGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ring 2: major tick marks at 16 positions */}
      {ticks(CX, CY, 128, 32, 8, '#7ecba1', 0.35)}

      {/* Ring 3: counter-rotating segmented ring (16 segs) */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ originX: `${CX}px`, originY: `${CY}px` }}
      >
        {segRing(CX, CY, 116, 16, 6, '#c4b4e8', 1.8, 0.5)}
      </motion.g>

      {/* Ring 4: fast spin arc segments (Iron Man) */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ originX: `${CX}px`, originY: `${CY}px` }}
      >
        {segRing(CX, CY, 104, 6, 22, '#7ecba1', 2.5, 0.65)}
      </motion.g>

      {/* Ring 5: pulsing static ring */}
      <motion.circle
        cx={CX} cy={CY} r={90}
        stroke="#f5c87a" strokeWidth={0.8} fill="none"
        animate={{ opacity: [0.2, 0.5, 0.2], r: [90, 91, 90] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ring 6: circuit arc segments */}
      {segRing(CX, CY, 80, 8, 12, '#7ecba1', 1.2, 0.4)}

      {/* Radial circuit lines (Iron Man spokes) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const a  = (deg * Math.PI) / 180;
        const r1 = 60, r2 = 76;
        return (
          <line
            key={i}
            x1={CX + r1 * Math.cos(a)} y1={CY + r1 * Math.sin(a)}
            x2={CX + r2 * Math.cos(a)} y2={CY + r2 * Math.sin(a)}
            stroke={i % 2 === 0 ? '#7ecba1' : '#c4b4e8'}
            strokeWidth={i % 2 === 0 ? 1.5 : 0.8}
            opacity={0.6}
          />
        );
      })}

      {/* Inner core circle */}
      <circle cx={CX} cy={CY} r={58} fill="url(#coreGrad)" />
      <motion.circle
        cx={CX} cy={CY} r={57}
        stroke="#7ecba1" strokeWidth={1.2} fill="none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Inner glow pulse behind "AA" */}
      <motion.circle
        cx={CX} cy={CY} r={48}
        fill="#7ecba1"
        filter="url(#arcGlow)"
        animate={{ opacity: [0.03, 0.12, 0.03], r: [48, 52, 48] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* "AA" monogram — gradient stroke text */}
      <defs>
        <linearGradient id="aaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#7ecba1" />
          <stop offset="50%"  stopColor="#c4b4e8" />
          <stop offset="100%" stopColor="#f5c87a" />
        </linearGradient>
      </defs>

      {/* Soft glow layer */}
      <motion.text
        x={CX} y={CY + 14}
        textAnchor="middle"
        fontSize="52"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
        fill="#7ecba1"
        opacity="0.12"
        filter="url(#textGlow)"
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        AA
      </motion.text>

      {/* Crisp foreground text */}
      <text
        x={CX} y={CY + 14}
        textAnchor="middle"
        fontSize="52"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
        fill="url(#aaGrad)"
        letterSpacing="-2"
      >
        AA
      </text>

      {/* Sub-label */}
      <text
        x={CX} y={CY + 34}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="Fira Code, monospace"
        fill="#7ecba1"
        opacity="0.55"
        letterSpacing="4"
      >
        ARYAN AMAN
      </text>

      {/* Cardinal tick accents (N/S/E/W longer marks) */}
      {[0, 90, 180, 270].map((deg, i) => {
        const a  = ((deg - 90) * Math.PI) / 180;
        const r1 = 128, r2 = 140;
        return (
          <g key={i}>
            <line
              x1={CX + r1 * Math.cos(a)} y1={CY + r1 * Math.sin(a)}
              x2={CX + r2 * Math.cos(a)} y2={CY + r2 * Math.sin(a)}
              stroke="#f5c87a" strokeWidth={2.5} strokeLinecap="round" opacity={0.7}
            />
            {/* Small diamond at tip */}
            <circle
              cx={CX + (r2 + 5) * Math.cos(a)}
              cy={CY + (r2 + 5) * Math.sin(a)}
              r={2.5} fill="#f5c87a" opacity={0.6}
            />
          </g>
        );
      })}

      {/* Outer ring fine ticks (48 ticks) */}
      {ticks(CX, CY, 138, 48, 4, '#c4b4e8', 0.2)}
    </svg>

    {/* ── Floating info badges ── */}
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute rounded-xl px-3 py-2 font-mono"
      style={{
        top: 10, right: -10,
        background: 'var(--bg-card)',
        border: '1px solid rgba(126,203,161,0.28)',
        boxShadow: '0 0 16px rgba(126,203,161,0.14)',
      }}
    >
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Experience</div>
      <div className="font-bold text-base" style={{ color: 'var(--mint)' }}>6+ yrs</div>
    </motion.div>

    <motion.div
      animate={{ y: [5, -5, 5] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute rounded-xl px-3 py-2 font-mono"
      style={{
        bottom: 10, left: -10,
        background: 'var(--bg-card)',
        border: '1px solid rgba(196,180,232,0.28)',
        boxShadow: '0 0 16px rgba(196,180,232,0.12)',
      }}
    >
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Current</div>
      <div className="font-bold text-sm" style={{ color: 'var(--lav)' }}>SDE-3 @ Vola</div>
    </motion.div>

    <motion.div
      animate={{ x: [-4, 4, -4] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute rounded-xl px-3 py-2 font-mono"
      style={{
        top: '42%', right: -16,
        background: 'var(--bg-card)',
        border: '1px solid rgba(245,200,122,0.28)',
        boxShadow: '0 0 16px rgba(245,200,122,0.10)',
      }}
    >
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Stack</div>
      <div className="font-bold text-sm" style={{ color: 'var(--gold)' }}>Go · Node</div>
    </motion.div>
  </div>
);

export default ArcIdentity;
