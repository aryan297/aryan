import { memo } from 'react';
import { soundEngine } from '../utils/soundEngine';

const SIZE = 300;
const CX = SIZE / 2;
const CY = SIZE / 2;
const PI2 = Math.PI * 2;

const arcPath = (cx, cy, r, startDeg, endDeg) => {
  const s = (startDeg * Math.PI) / 180;
  const e = (endDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${endDeg - startDeg > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

const ticks = (cx, cy, r, count, len, color, opacity) =>
  Array.from({ length: count }, (_, i) => {
    const a = (i / count) * PI2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(a);
    const y1 = cy + r * Math.sin(a);
    const x2 = cx + (r + len) * Math.cos(a);
    const y2 = cy + (r + len) * Math.sin(a);
    const major = i % (count / 4) === 0;
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={major ? 2 : 0.8}
        opacity={major ? opacity * 1.6 : opacity}
      />
    );
  });

const segRing = (cx, cy, r, segments, gap, color, width, opacity) =>
  Array.from({ length: segments }, (_, i) => {
    const seg = 360 / segments;
    const start = i * seg + gap / 2;
    const end = (i + 1) * seg - gap / 2;
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

const spinCW = (dur) => ({ animation: `arc-cw ${dur}s linear infinite` });
const spinCCW = (dur) => ({ animation: `arc-ccw ${dur}s linear infinite` });

const badgeStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--chip-border)',
  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
};

const badges = [
  { key: 'exp', label: 'Experience', value: '6+ yrs', valueColor: 'var(--red)', pos: 'arc-badge-tr' },
  { key: 'cur', label: 'Current', value: 'SDE-3 @ Vola', valueColor: 'var(--orchid)', pos: 'arc-badge-bl' },
  { key: 'stack', label: 'Stack', value: 'Go · Node', valueColor: 'var(--red-soft)', pos: 'arc-badge-mr' },
];

const ArcIdentity = memo(() => (
  <div className="arc-wrap">
  <div
    className="arc-reactor relative flex items-center justify-center select-none cursor-pointer"
    onClick={() => soundEngine.boop()}
  >
    {/* Ambient glow */}
    <div className="arc-glow" aria-hidden />

    {/* Outer conic ring */}
    <div className="arc-conic" style={spinCW(22)} aria-hidden>
      <div className="arc-conic-inner" />
    </div>

    <svg
      className="arc-svg"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      aria-label="Arc reactor identity"
    >
      <defs>
        <linearGradient id="aaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--red)" />
          <stop offset="50%" stopColor="var(--magenta)" />
          <stop offset="100%" stopColor="var(--orchid)" />
        </linearGradient>
        <radialGradient id="reactorFill" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="var(--arc-core-0)" />
          <stop offset="60%" stopColor="var(--arc-core-1)" />
          <stop offset="100%" stopColor="var(--arc-core-2)" />
        </radialGradient>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--red)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="var(--red)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {ticks(CX, CY, 128, 32, 8, 'var(--red)', 0.22)}

      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', ...spinCCW(30) }}>
        {segRing(CX, CY, 116, 16, 6, 'var(--orchid)', 1.5, 0.4)}
      </g>

      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', ...spinCW(9) }}>
        {segRing(CX, CY, 104, 6, 22, 'var(--red)', 2, 0.45)}
      </g>

      <circle cx={CX} cy={CY} r={90} stroke="var(--red-soft)" strokeWidth={0.8} fill="none" opacity={0.35} />
      <circle cx={CX} cy={CY} r={78} fill="none" stroke="var(--red)" strokeWidth={5} opacity={0.10} />
      <circle cx={CX} cy={CY} r={78} fill="none" stroke="var(--red)" strokeWidth={1.5} opacity={0.5} />

      {segRing(CX, CY, 78, 12, 4, 'var(--red)', 2.5, 0.35)}

      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        const main = i % 2 === 0;
        return (
          <g key={i}>
            <line
              x1={CX + 55 * Math.cos(a)}
              y1={CY + 55 * Math.sin(a)}
              x2={CX + 72 * Math.cos(a)}
              y2={CY + 72 * Math.sin(a)}
              stroke={main ? 'var(--red)' : 'var(--orchid)'}
              strokeWidth={main ? 2.5 : 1.2}
              opacity={main ? 0.55 : 0.35}
              strokeLinecap="round"
            />
            {main && (
              <circle
                cx={CX + 72 * Math.cos(a)}
                cy={CY + 72 * Math.sin(a)}
                r={2}
                fill="var(--red)"
                opacity={0.6}
              />
            )}
          </g>
        );
      })}

      <circle cx={CX} cy={CY} r={52} fill="url(#reactorFill)" />
      <circle cx={CX} cy={CY} r={48} fill="url(#innerGlow)" opacity={0.55} />
      <circle cx={CX} cy={CY} r={52} fill="none" stroke="var(--red)" strokeWidth={4} opacity={0.08} />
      <circle cx={CX} cy={CY} r={52} fill="none" stroke="var(--red)" strokeWidth={1.2} opacity={0.55} />
      <circle cx={CX} cy={CY} r={40} fill="none" stroke="var(--orchid)" strokeWidth={2} opacity={0.08} />
      <circle cx={CX} cy={CY} r={40} fill="none" stroke="var(--orchid)" strokeWidth={1} opacity={0.4} />
      <circle cx={CX} cy={CY} r={34} fill="none" stroke="var(--red)" strokeWidth={1} opacity={0.22} />
      <circle cx={CX} cy={CY} r={28} fill="var(--arc-core-0)" opacity={0.72} />

      <text
        x={CX}
        y={CY - 4}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="34"
        fontWeight="700"
        fontFamily="Space Grotesk, sans-serif"
        fill="url(#aaGrad)"
        letterSpacing="-1.5"
      >
        AA
      </text>

      <text
        x={CX}
        y={CY + 18}
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize="6"
        fontFamily="Space Mono, monospace"
        fill="var(--red)"
        opacity="0.65"
        letterSpacing="1.8"
      >
        ARYAN AMAN
      </text>

      {[0, 90, 180, 270].map((deg, i) => {
        const a = ((deg - 90) * Math.PI) / 180;
        return (
          <g key={i}>
            <line
              x1={CX + 128 * Math.cos(a)}
              y1={CY + 128 * Math.sin(a)}
              x2={CX + 140 * Math.cos(a)}
              y2={CY + 140 * Math.sin(a)}
              stroke="var(--red-soft)"
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.5}
            />
            <circle
              cx={CX + 145 * Math.cos(a)}
              cy={CY + 145 * Math.sin(a)}
              r={2}
              fill="var(--red-soft)"
              opacity={0.45}
            />
          </g>
        );
      })}

      {ticks(CX, CY, 138, 48, 4, 'var(--orchid)', 0.14)}
    </svg>

    {/* Floating badges (desktop / tablet) */}
    {badges.map(({ key, label, value, valueColor, pos }) => (
      <div key={key} className={`arc-badge arc-badge-float ${pos}`} style={badgeStyle}>
        <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{label}</div>
        <div className="font-bold text-xs sm:text-sm" style={{ color: valueColor }}>{value}</div>
      </div>
    ))}
  </div>

  {/* Mobile row — always visible under the reactor */}
  <div className="arc-badges-mobile">
    {badges.map(({ key, label, value, valueColor }) => (
      <div key={key} className="arc-badge-chip" style={badgeStyle}>
        <div className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</div>
        <div className="font-bold text-xs" style={{ color: valueColor }}>{value}</div>
      </div>
    ))}
  </div>
  </div>
));

ArcIdentity.displayName = 'ArcIdentity';

export default ArcIdentity;
