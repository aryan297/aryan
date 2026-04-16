import { motion } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';

const SIZE = 300;
const CX   = SIZE / 2;
const CY   = SIZE / 2;
const PI2  = Math.PI * 2;

const arcPath = (cx, cy, r, startDeg, endDeg) => {
  const s  = (startDeg * Math.PI) / 180;
  const e  = (endDeg   * Math.PI) / 180;
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${endDeg - startDeg > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

const ticks = (cx, cy, r, count, len, color, opacity) =>
  Array.from({ length: count }, (_, i) => {
    const a  = (i / count) * PI2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(a);
    const y1 = cy + r * Math.sin(a);
    const x2 = cx + (r + len) * Math.cos(a);
    const y2 = cy + (r + len) * Math.sin(a);
    const major = i % (count / 4) === 0;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={major ? 2 : 0.8} opacity={major ? opacity * 1.6 : opacity} />;
  });

const segRing = (cx, cy, r, segments, gap, color, width, opacity) =>
  Array.from({ length: segments }, (_, i) => {
    const seg   = 360 / segments;
    const start = i * seg + gap / 2;
    const end   = (i + 1) * seg - gap / 2;
    return <path key={i} d={arcPath(cx, cy, r, start, end)}
      stroke={color} strokeWidth={width} strokeLinecap="round" fill="none" opacity={opacity} />;
  });

/* Shared spin style — uses CSS keyframes, runs on compositor thread */
const spinCW  = (dur) => ({ animation: `arc-cw ${dur}s linear infinite`,  willChange: 'transform' });
const spinCCW = (dur) => ({ animation: `arc-ccw ${dur}s linear infinite`, willChange: 'transform' });

const ArcIdentity = () => (
  <div
    className="relative flex items-center justify-center select-none cursor-pointer"
    style={{ width: SIZE, height: SIZE }}
    onClick={() => soundEngine.boop()}
  >
    {/* Ambient glow — CSS animation via motion (lightweight opacity only) */}
    <div style={{
      position: 'absolute', inset: -24, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,212,200,0.14) 0%, rgba(167,139,250,0.07) 40%, transparent 70%)',
      filter: 'blur(16px)',
      animation: 'arc-pulse-opacity 4s ease-in-out infinite',
      willChange: 'opacity',
    }} />

    {/* Ring 1 — outer conic spinner (CSS, compositor thread) */}
    <div style={{
      position: 'absolute',
      width: SIZE - 4, height: SIZE - 4,
      borderRadius: '50%',
      background: 'conic-gradient(from 0deg, rgba(0,212,200,0.7), rgba(167,139,250,0.5), rgba(245,200,122,0.4), rgba(0,212,200,0.7))',
      padding: 2,
      ...spinCW(22),
    }}>
      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-primary)' }} />
    </div>

    {/* SVG layer */}
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}
      style={{ position: 'absolute', top: 0, left: 0 }}>
      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0d1828" />
          <stop offset="100%" stopColor="#060c14" />
        </radialGradient>
        <filter id="arcGlow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter id="coreGlow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter id="rimGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <linearGradient id="aaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00d4c8" />
          <stop offset="50%"  stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f5c87a" />
        </linearGradient>
        <radialGradient id="reactorFill" cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#0a2535" />
          <stop offset="60%"  stopColor="#061220" />
          <stop offset="100%" stopColor="#030a12" />
        </radialGradient>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00d4c8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00d4c8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Static tick marks */}
      {ticks(CX, CY, 128, 32, 8, '#00d4c8', 0.30)}

      {/* Ring 3 — counter-spin (CSS on <g> via foreignObject workaround: use transform-box) */}
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', ...spinCCW(30) }}>
        {segRing(CX, CY, 116, 16, 6, '#a78bfa', 1.8, 0.5)}
      </g>

      {/* Ring 4 — fast spin */}
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', ...spinCW(9) }}>
        {segRing(CX, CY, 104, 6, 22, '#00d4c8', 2.5, 0.65)}
      </g>

      {/* Ring 5 — static gold ring with CSS pulse */}
      <circle cx={CX} cy={CY} r={90}
        stroke="#f5c87a" strokeWidth={0.8} fill="none"
        style={{ animation: 'arc-pulse-opacity 3s ease-in-out infinite', willChange: 'opacity' }} />

      {/* ── IRON MAN REACTOR CORE ── */}

      {/* Outer reactor rim — thick glowing ring */}
      <circle cx={CX} cy={CY} r={78} fill="none"
        stroke="#00d4c8" strokeWidth={6} opacity={0.15} />
      <circle cx={CX} cy={CY} r={78} fill="none"
        stroke="#00d4c8" strokeWidth={2} opacity={0.7}
        filter="url(#rimGlow)"
        style={{ animation: 'arc-pulse-opacity 2.5s ease-in-out infinite', willChange: 'opacity' }} />

      {/* Segmented reactor band */}
      {segRing(CX, CY, 78, 12, 4, '#00d4c8', 3.5, 0.5)}

      {/* Spokes — thick Iron Man style */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        const main = i % 2 === 0;
        return <g key={i}>
          <line
            x1={CX + 55 * Math.cos(a)} y1={CY + 55 * Math.sin(a)}
            x2={CX + 72 * Math.cos(a)} y2={CY + 72 * Math.sin(a)}
            stroke={main ? '#00d4c8' : '#a78bfa'}
            strokeWidth={main ? 3 : 1.5} opacity={main ? 0.8 : 0.5}
            strokeLinecap="round" />
          {main && <circle
            cx={CX + 72 * Math.cos(a)} cy={CY + 72 * Math.sin(a)}
            r={2.5} fill="#00d4c8" opacity={0.9} />}
        </g>;
      })}

      {/* Core base — deep reactor fill */}
      <circle cx={CX} cy={CY} r={52} fill="url(#reactorFill)" />

      {/* Inner radial glow bloom */}
      <circle cx={CX} cy={CY} r={48} fill="url(#innerGlow)"
        style={{ animation: 'arc-pulse-opacity 2s ease-in-out infinite', willChange: 'opacity' }} />

      {/* Thick outer reactor wall */}
      <circle cx={CX} cy={CY} r={52} fill="none"
        stroke="#00d4c8" strokeWidth={5} opacity={0.12} />
      <circle cx={CX} cy={CY} r={52} fill="none"
        stroke="#00d4c8" strokeWidth={1.5} opacity={0.9}
        filter="url(#rimGlow)"
        style={{ animation: 'arc-pulse-opacity 1.8s ease-in-out infinite', willChange: 'opacity' }} />

      {/* Inner accent ring */}
      <circle cx={CX} cy={CY} r={40} fill="none"
        stroke="#a78bfa" strokeWidth={3} opacity={0.08} />
      <circle cx={CX} cy={CY} r={40} fill="none"
        stroke="#a78bfa" strokeWidth={1} opacity={0.55}
        style={{ animation: 'arc-pulse-opacity 3s ease-in-out infinite 0.5s', willChange: 'opacity' }} />

      {/* Innermost ring */}
      <circle cx={CX} cy={CY} r={30} fill="none"
        stroke="#00d4c8" strokeWidth={4} opacity={0.10} />
      <circle cx={CX} cy={CY} r={30} fill="none"
        stroke="#00d4c8" strokeWidth={1.2} opacity={0.6}
        filter="url(#arcGlow)"
        style={{ animation: 'arc-pulse-opacity 2.2s ease-in-out infinite 0.3s', willChange: 'opacity' }} />

      {/* AA monogram — larger, bolder */}
      <text x={CX} y={CY + 10} textAnchor="middle" fontSize="46" fontWeight="900"
        fontFamily="Inter, sans-serif" fill="url(#aaGrad)" letterSpacing="-2"
        filter="url(#coreGlow)">AA</text>
      <text x={CX} y={CY + 10} textAnchor="middle" fontSize="46" fontWeight="900"
        fontFamily="Inter, sans-serif" fill="url(#aaGrad)" letterSpacing="-2">AA</text>

      <text x={CX} y={CY + 28} textAnchor="middle" fontSize="7"
        fontFamily="Space Mono, monospace" fill="#00d4c8" opacity="0.55" letterSpacing="4">
        ARYAN AMAN
      </text>

      {/* Cardinal marks */}
      {[0,90,180,270].map((deg, i) => {
        const a  = ((deg - 90) * Math.PI) / 180;
        return <g key={i}>
          <line x1={CX + 128 * Math.cos(a)} y1={CY + 128 * Math.sin(a)}
            x2={CX + 140 * Math.cos(a)} y2={CY + 140 * Math.sin(a)}
            stroke="#f5c87a" strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
          <circle cx={CX + 145 * Math.cos(a)} cy={CY + 145 * Math.sin(a)}
            r={2.5} fill="#f5c87a" opacity={0.6} />
        </g>;
      })}

      {/* Outer fine ticks */}
      {ticks(CX, CY, 138, 48, 4, '#a78bfa', 0.18)}
    </svg>

    {/* Floating badges — Framer Motion for easeInOut float (lightweight) */}
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute rounded-xl px-3 py-2 font-mono"
      style={{
        top: 10, right: -10,
        background: 'var(--bg-card)',
        border: '1px solid rgba(0,212,200,0.22)',
        boxShadow: '0 0 12px rgba(0,212,200,0.10)',
        willChange: 'transform',
      }}
    >
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Experience</div>
      <div className="font-bold text-base" style={{ color: 'var(--teal)' }}>6+ yrs</div>
    </motion.div>

    <motion.div
      animate={{ y: [5, -5, 5] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute rounded-xl px-3 py-2 font-mono"
      style={{
        bottom: 10, left: -10,
        background: 'var(--bg-card)',
        border: '1px solid rgba(167,139,250,0.22)',
        boxShadow: '0 0 12px rgba(167,139,250,0.08)',
        willChange: 'transform',
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
        border: '1px solid rgba(245,200,122,0.22)',
        boxShadow: '0 0 12px rgba(245,200,122,0.07)',
        willChange: 'transform',
      }}
    >
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Stack</div>
      <div className="font-bold text-sm" style={{ color: 'var(--gold)' }}>Go · Node</div>
    </motion.div>
  </div>
);

export default ArcIdentity;
