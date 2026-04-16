import { useEffect, useRef } from 'react';

const TEAL  = [0,  212, 200];
const LAV   = [167, 139, 250];
const GOLD  = [245, 200, 122];

const c = ([r, g, b], a) => `rgba(${r},${g},${b},${a.toFixed(3)})`;

const makeSpore = (w, h) => ({
  x:     Math.random() * w,
  y:     Math.random() * h,
  r:     Math.random() * 1.4 + 0.5,
  vy:    -(Math.random() * 0.22 + 0.05),
  vx:    (Math.random() - 0.5) * 0.12,
  phase: Math.random() * Math.PI * 2,
  a:     Math.random() * 0.25 + 0.08,
});

const makeTrail = (w, h) => {
  const goRight = Math.random() < 0.5;
  const colors  = [TEAL, LAV, GOLD];
  return {
    x:     goRight ? -80 : w + 80,
    y:     Math.random() * h * 0.80,
    speed: (Math.random() * 1.6 + 0.7) * (goRight ? 1 : -1),
    len:   Math.random() * 80 + 40,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random() * 0.28 + 0.14,
    width: Math.random() * 1.2 + 0.4,
  };
};

const makeNode = (w, h) => ({
  x:     Math.random() * w,
  y:     Math.random() * h * 0.65,
  r:     Math.random() * 2.5 + 1.2,
  phase: Math.random() * Math.PI * 2,
  color: [TEAL, LAV, GOLD][Math.floor(Math.random() * 3)],
});

const TronGhibliCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d', { alpha: true });

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.width;
    const h = () => canvas.height;

    stateRef.current = {
      spores:    Array.from({ length: 28 }, () => makeSpore(w(), h())),
      trails:    Array.from({ length: 5  }, () => makeTrail(w(), h())),
      nodes:     Array.from({ length: 10 }, () => makeNode(w(), h())),
      lastTrail: 0,
    };

    /* ── floor grid — drawn once into offscreen canvas, reused ── */
    let gridCanvas = null;
    let gridW = 0, gridH = 0;

    const buildGridCache = () => {
      gridW = w(); gridH = h();
      gridCanvas = document.createElement('canvas');
      gridCanvas.width  = gridW;
      gridCanvas.height = gridH;
      const gc = gridCanvas.getContext('2d');

      const HORIZON = gridH * 0.52;
      const VX      = gridW * 0.5;
      const SPREAD  = gridW * 1.5;
      const N_RAIL  = 18;
      const N_RUNG  = 10;

      for (let i = 0; i <= N_RAIL; i++) {
        const xBot  = (gridW - SPREAD) / 2 + i * (SPREAD / N_RAIL);
        const major = i % 4 === 0;
        gc.beginPath();
        gc.moveTo(VX, HORIZON);
        gc.lineTo(xBot, gridH);
        gc.strokeStyle = c(TEAL, major ? 0.10 : 0.032);
        gc.lineWidth   = major ? 1.0 : 0.45;
        gc.stroke();
      }

      for (let j = 1; j <= N_RUNG; j++) {
        const prog  = Math.pow(j / N_RUNG, 1.5);
        const y     = HORIZON + (gridH - HORIZON) * prog;
        const xL    = VX - (SPREAD / 2) * prog;
        const xR    = VX + (SPREAD / 2) * prog;
        const major = j % 3 === 0;
        gc.beginPath();
        gc.moveTo(xL, y);
        gc.lineTo(xR, y);
        gc.strokeStyle = c(j % 5 === 0 ? LAV : TEAL, major ? 0.10 : 0.035);
        gc.lineWidth   = major ? 0.9 : 0.4;
        gc.stroke();
      }
    };

    buildGridCache();
    window.addEventListener('resize', buildGridCache);

    /* ── circuit lines ── */
    const drawCircuits = (t) => {
      const cw = w(), ch = h();
      [0.08, 0.22, 0.62, 0.78, 0.92].forEach((f, ci) => {
        const cx    = f * cw;
        const len   = ch * (0.22 + 0.12 * Math.sin(ci * 1.7));
        const alpha = 0.025 + 0.012 * Math.sin(t * 0.55 + ci * 1.3);
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, len);
        ctx.strokeStyle = c(ci % 2 === 0 ? TEAL : LAV, alpha);
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      });
    };

    /* ── trails ── */
    const drawTrails = (ts) => {
      const cw = w(), ch = h();
      for (let i = ts.length - 1; i >= 0; i--) {
        const tr = ts[i];
        tr.x += tr.speed;
        if (tr.x > cw + 150 || tr.x < -150) { ts.splice(i, 1); continue; }

        const dir = tr.speed > 0 ? -1 : 1;
        const x2  = tr.x + dir * tr.len;
        const grad = ctx.createLinearGradient(tr.x, 0, x2, 0);
        grad.addColorStop(0,   c(tr.color, tr.alpha));
        grad.addColorStop(1,   c(tr.color, 0));
        ctx.beginPath();
        ctx.moveTo(tr.x, tr.y);
        ctx.lineTo(x2, tr.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = tr.width;
        ctx.stroke();
      }
    };

    /* ── nodes — no radial gradient, just alpha circle ── */
    const drawNodes = (t, nodes) => {
      nodes.forEach(nd => {
        const pulse = 0.4 + 0.6 * Math.sin(t * 1.4 + nd.phase);
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r * (0.85 + 0.15 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = c(nd.color, 0.10 * pulse);
        ctx.fill();
      });
    };

    /* ── spores — simple solid circle, no radial gradient ── */
    const drawSpores = (t, spores) => {
      const cw = w(), ch = h();
      spores.forEach(s => {
        s.y += s.vy;
        s.x += s.vx;
        s.phase += 0.016;
        if (s.y < -8) { s.y = ch + 8; s.x = Math.random() * cw; }
        if (s.x < -8) s.x = cw + 8;
        if (s.x > cw + 8) s.x = -8;

        const wobbleX = Math.sin(s.phase) * 1.2;
        const pulse   = 0.5 + 0.5 * Math.sin(s.phase * 2.2);
        ctx.beginPath();
        ctx.arc(s.x + wobbleX, s.y, s.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = c(TEAL, s.a * pulse);
        ctx.fill();
      });
    };

    /* ── main loop ── */
    let lastTs = 0;
    const draw = (ts) => {
      animRef.current = requestAnimationFrame(draw);

      // Cap at ~50fps to reduce CPU load
      if (ts - lastTs < 20) return;
      lastTs = ts;

      const t  = ts / 1000;
      const st = stateRef.current;
      const cw = w(), ch = h();

      ctx.clearRect(0, 0, cw, ch);

      // Draw cached grid
      if (gridCanvas) ctx.drawImage(gridCanvas, 0, 0);

      // Spawn new trail every 1.8s
      if (ts - st.lastTrail > 1800 && st.trails.length < 8) {
        st.trails.push(makeTrail(cw, ch));
        st.lastTrail = ts;
      }

      drawCircuits(t);
      drawTrails(st.trails);
      drawNodes(t, st.nodes);
      drawSpores(t, st.spores);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', buildGridCache);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
};

export default TronGhibliCanvas;
