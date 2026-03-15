import { useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════════════════════
   Tron Legacy × Studio Ghibli — animated canvas background

   Tron elements  : perspective floor-grid, light-trails, circuit nodes
   Ghibli elements: soft pastel palette, floating kodama spores,
                    organic corner vines, warm ambient glow
═══════════════════════════════════════════════════════════════ */

const MINT  = [126, 203, 161];
const LAV   = [196, 180, 232];
const GOLD  = [245, 200, 122];
const CREAM = [240, 238, 225];

const c = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

/* ── Spore (Ghibli forest spirit particle) ─────────────────── */
const makeSpore = (w, h) => ({
  x:     Math.random() * w,
  y:     Math.random() * h,
  r:     Math.random() * 1.8 + 0.4,
  vy:    -(Math.random() * 0.25 + 0.06),
  vx:    (Math.random() - 0.5) * 0.15,
  phase: Math.random() * Math.PI * 2,
  glow:  Math.random() * 0.35 + 0.08,
});

/* ── Light trail ────────────────────────────────────────────── */
const makeTrail = (w, h) => {
  const goRight = Math.random() < 0.5;
  const colors  = [MINT, LAV, GOLD];
  return {
    x:      goRight ? -120 : w + 120,
    y:      Math.random() * h * 0.82,
    speed:  (Math.random() * 1.8 + 0.6) * (goRight ? 1 : -1),
    len:    Math.random() * 100 + 50,
    color:  colors[Math.floor(Math.random() * colors.length)],
    alpha:  Math.random() * 0.35 + 0.18,
    width:  Math.random() * 1.4 + 0.4,
  };
};

/* ── Data-node pulse ────────────────────────────────────────── */
const makeNode = (w, h) => ({
  x:     Math.random() * w,
  y:     Math.random() * h * 0.7,
  r:     Math.random() * 3 + 1.5,
  phase: Math.random() * Math.PI * 2,
  color: [MINT, LAV, GOLD][Math.floor(Math.random() * 3)],
});

const TronGhibliCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.width;
    const h = () => canvas.height;

    /* Initial state */
    stateRef.current = {
      spores: Array.from({ length: 55 }, () => makeSpore(w(), h())),
      trails: Array.from({ length: 7  }, () => makeTrail(w(), h())),
      nodes:  Array.from({ length: 18 }, () => makeNode(w(), h())),
      lastTrail: 0,
    };

    /* ── draw floor grid ────────────────────────────────────── */
    const drawFloor = (t) => {
      const cw = w(), ch = h();
      const HORIZON = ch * 0.52;
      const VX      = cw * 0.5;
      const SPREAD  = cw * 1.5;
      const N_RAIL  = 22;
      const N_RUNG  = 11;

      /* Vanishing-point glow */
      const vpg = ctx.createRadialGradient(VX, HORIZON, 0, VX, HORIZON, 200);
      vpg.addColorStop(0,   c(MINT, 0.10));
      vpg.addColorStop(0.4, c(LAV,  0.04));
      vpg.addColorStop(1,   c(MINT, 0));
      ctx.fillStyle = vpg;
      ctx.fillRect(VX - 200, HORIZON - 100, 400, 200);

      /* Vertical rails */
      for (let i = 0; i <= N_RAIL; i++) {
        const xBot = (cw - SPREAD) / 2 + i * (SPREAD / N_RAIL);
        const major = i % 4 === 0;
        ctx.beginPath();
        ctx.moveTo(VX,  HORIZON);
        ctx.lineTo(xBot, ch);
        ctx.strokeStyle = c(MINT, major ? 0.14 : 0.045);
        ctx.lineWidth   = major ? 1.2 : 0.5;
        ctx.stroke();
      }

      /* Horizontal rungs (perspective-spaced + pulse animation) */
      for (let j = 1; j <= N_RUNG; j++) {
        const prog  = Math.pow(j / N_RUNG, 1.5);
        const y     = HORIZON + (ch - HORIZON) * prog;
        const xL    = VX - (SPREAD / 2) * prog;
        const xR    = VX + (SPREAD / 2) * prog;
        const major = j % 3 === 0;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + j * 0.7);
        const alpha = (major ? 0.14 : 0.048) * (1 + pulse * 0.25);

        ctx.beginPath();
        ctx.moveTo(xL, y);
        ctx.lineTo(xR, y);
        ctx.strokeStyle = c(j % 5 === 0 ? LAV : MINT, alpha);
        ctx.lineWidth   = major ? 1.0 : 0.45;
        ctx.stroke();

        /* Intersection nodes on major rungs */
        if (major) {
          for (let k = 0; k <= N_RAIL; k += 4) {
            const xBot = (cw - SPREAD) / 2 + k * (SPREAD / N_RAIL);
            /* simple linear interpolation from VP to bottom */
            const nodeX = VX + (xBot - VX) * prog;
            const gAlpha = 0.12 + 0.08 * pulse;
            ctx.beginPath();
            ctx.arc(nodeX, y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = c(MINT, gAlpha);
            ctx.fill();
          }
        }
      }
    };

    /* ── vertical circuit lines (upper half) ─────────────────── */
    const drawCircuits = (t) => {
      const cw = w(), ch = h();
      const xs  = [0.08, 0.22, 0.38, 0.62, 0.78, 0.92].map(f => f * cw);
      xs.forEach((cx, ci) => {
        const len   = ch * (0.25 + 0.15 * Math.sin(ci * 1.7));
        const alpha = 0.03 + 0.018 * Math.sin(t * 0.6 + ci * 1.3);
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, len);
        ctx.strokeStyle = c(ci % 2 === 0 ? MINT : LAV, alpha);
        ctx.lineWidth   = 0.7;
        ctx.stroke();

        /* Node dot */
        const nAlpha = 0.09 + 0.07 * Math.sin(t * 1.1 + ci);
        ctx.beginPath();
        ctx.arc(cx, len, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = c(ci % 2 === 0 ? MINT : LAV, nAlpha);
        ctx.fill();

        /* Small branch */
        if (ci % 2 === 0) {
          const bLen = 28 + 12 * Math.sin(t * 0.9 + ci);
          ctx.beginPath();
          ctx.moveTo(cx, len * 0.6);
          ctx.lineTo(cx + bLen, len * 0.6);
          ctx.strokeStyle = c(GOLD, alpha * 0.7);
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      });
    };

    /* ── corner Tron-bracket decorations ─────────────────────── */
    const drawCorners = (t) => {
      const cw = w(), ch = h();
      const a  = 0.08 + 0.03 * Math.sin(t * 0.5);

      const bracket = (ox, oy, sx, sy) => {
        ctx.save();
        ctx.translate(ox, oy);
        ctx.scale(sx, sy);

        ctx.strokeStyle = c(MINT, a);
        ctx.lineWidth   = 1.1;

        /* Outer L */
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(60, 0); ctx.lineTo(60, 18);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(0, 60);
        ctx.stroke();

        /* Inner accent */
        ctx.strokeStyle = c(LAV, a * 0.6);
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.moveTo(10, 28); ctx.lineTo(40, 28); ctx.lineTo(40, 44);
        ctx.stroke();

        /* Nodes */
        [[60, 18], [40, 28], [40, 44]].forEach(([nx, ny]) => {
          ctx.beginPath();
          ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = c(MINT, a * 2.2);
          ctx.fill();
        });

        /* Gold accent line */
        ctx.strokeStyle = c(GOLD, a * 0.5);
        ctx.lineWidth   = 0.7;
        ctx.beginPath();
        ctx.moveTo(16, 48); ctx.lineTo(36, 48);
        ctx.stroke();

        ctx.restore();
      };

      bracket(18, 18,  1,  1);  /* top-left  */
      bracket(cw - 18, 18, -1,  1);  /* top-right */
      bracket(18, ch - 18,  1, -1);  /* bot-left  */
      bracket(cw - 18, ch - 18, -1, -1);  /* bot-right */
    };

    /* ── light trails ─────────────────────────────────────────── */
    const drawTrails = (t, ts) => {
      const cw = w(), ch = h();
      for (let i = ts.length - 1; i >= 0; i--) {
        const tr = ts[i];
        tr.x += tr.speed;

        if (tr.x > cw + 200 || tr.x < -200) {
          ts.splice(i, 1);
          continue;
        }

        const dir = tr.speed > 0 ? -1 : 1;
        const x2  = tr.x + dir * tr.len;
        const grad = ctx.createLinearGradient(tr.x, 0, x2, 0);
        grad.addColorStop(0,   c(tr.color, tr.alpha));
        grad.addColorStop(0.6, c(tr.color, tr.alpha * 0.5));
        grad.addColorStop(1,   c(tr.color, 0));

        ctx.beginPath();
        ctx.moveTo(tr.x, tr.y);
        ctx.lineTo(x2, tr.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = tr.width;
        ctx.stroke();

        /* Head glow */
        const hg = ctx.createRadialGradient(tr.x, tr.y, 0, tr.x, tr.y, 10);
        hg.addColorStop(0, c(tr.color, tr.alpha * 0.9));
        hg.addColorStop(1, c(tr.color, 0));
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* ── ambient data nodes ───────────────────────────────────── */
    const drawNodes = (t, nodes) => {
      nodes.forEach(nd => {
        const pulse = 0.4 + 0.6 * Math.sin(t * 1.5 + nd.phase);
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r * (0.85 + 0.15 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = c(nd.color, 0.12 * pulse);
        ctx.fill();

        /* Halo ring */
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r * 2.5 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = c(nd.color, 0.06 * pulse);
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      });
    };

    /* ── floating Ghibli spores ─────────────────────────────── */
    const drawSpores = (t, spores) => {
      const cw = w(), ch = h();
      spores.forEach(s => {
        s.y += s.vy;
        s.x += s.vx;
        s.phase += 0.018;

        if (s.y < -10) { s.y = ch + 10; s.x = Math.random() * cw; }
        if (s.x < -10) s.x = cw + 10;
        if (s.x > cw + 10) s.x = -10;

        const wobbleX = Math.sin(s.phase) * 1.5;
        const pulse   = 0.55 + 0.45 * Math.sin(s.phase * 2.3);

        /* Glow halo */
        const hg = ctx.createRadialGradient(
          s.x + wobbleX, s.y, 0,
          s.x + wobbleX, s.y, s.r * 4
        );
        hg.addColorStop(0, c(CREAM, s.glow * pulse));
        hg.addColorStop(1, c(CREAM, 0));
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(s.x + wobbleX, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();

        /* Core dot */
        ctx.beginPath();
        ctx.arc(s.x + wobbleX, s.y, s.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = c(CREAM, (s.glow + 0.1) * pulse);
        ctx.fill();
      });
    };

    /* ── main render loop ────────────────────────────────────── */
    const draw = (ts) => {
      const t   = ts / 1000;
      const st  = stateRef.current;
      const cw  = w(), ch = h();

      ctx.clearRect(0, 0, cw, ch);

      /* Add new trails periodically */
      if (ts - st.lastTrail > 1400) {
        if (st.trails.length < 14) st.trails.push(makeTrail(cw, ch));
        st.lastTrail = ts;
      }

      drawFloor(t);
      drawCircuits(t);
      drawCorners(t);
      drawTrails(t, st.trails);
      drawNodes(t, st.nodes);
      drawSpores(t, st.spores);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
};

export default TronGhibliCanvas;
