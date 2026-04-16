import { useEffect, useRef } from 'react';

const TEAL = [0, 212, 200];
const LAV  = [167, 139, 250];
const GOLD = [245, 200, 122];

const c = ([r, g, b], a) => `rgba(${r},${g},${b},${a.toFixed(2)})`;

/* ── Detect weak / in-app browsers ── */
const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const isInApp   = /FBAN|FBAV|Instagram|Line|Twitter|MicroMessenger/i.test(ua);
const isSafari  = /^((?!chrome|android).)*safari/i.test(ua);
const isLowEnd  = isInApp || isSafari;

/* ── Particle counts ── */
const N_SPORES = isLowEnd ? 10 : 20;
const N_TRAILS = isLowEnd ? 2  : 4;
const N_NODES  = isLowEnd ? 4  : 8;
const FPS_CAP  = isLowEnd ? 24 : 40;
const FRAME_MS = 1000 / FPS_CAP;

const rnd = () => Math.random();

const makeSpore = (w, h) => ({
  x:     rnd() * w,
  y:     rnd() * h,
  r:     rnd() * 1.2 + 0.5,
  vy:    -(rnd() * 0.18 + 0.05),
  vx:    (rnd() - 0.5) * 0.10,
  phase: rnd() * Math.PI * 2,
  a:     rnd() * 0.20 + 0.06,
});

const makeTrail = (w, h) => {
  const right = rnd() < 0.5;
  const col   = [TEAL, LAV, GOLD][Math.floor(rnd() * 3)];
  return {
    x:     right ? -60 : w + 60,
    y:     rnd() * h * 0.75,
    speed: (rnd() * 1.4 + 0.6) * (right ? 1 : -1),
    len:   rnd() * 70 + 35,
    color: col,
    alpha: rnd() * 0.22 + 0.12,
    width: rnd() * 1.0 + 0.4,
  };
};

const makeNode = (w, h) => ({
  x:     rnd() * w,
  y:     rnd() * h * 0.60,
  r:     rnd() * 2.0 + 1.0,
  phase: rnd() * Math.PI * 2,
  color: [TEAL, LAV, GOLD][Math.floor(rnd() * 3)],
});

const TronGhibliCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d', { alpha: true, desynchronized: true });

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.width;
    const h = () => canvas.height;

    stateRef.current = {
      spores:    Array.from({ length: N_SPORES }, () => makeSpore(w(), h())),
      trails:    Array.from({ length: N_TRAILS }, () => makeTrail(w(), h())),
      nodes:     Array.from({ length: N_NODES  }, () => makeNode(w(), h())),
      lastTrail: 0,
    };

    /* ── Trails ── */
    const drawTrails = (ts) => {
      const cw = w(), ch = h();
      const st = stateRef.current;
      for (let i = st.trails.length - 1; i >= 0; i--) {
        const tr = st.trails[i];
        tr.x += tr.speed;
        if (tr.x > cw + 120 || tr.x < -120) { st.trails.splice(i, 1); continue; }
        const dir = tr.speed > 0 ? -1 : 1;
        const x2  = tr.x + dir * tr.len;
        const grad = ctx.createLinearGradient(tr.x, 0, x2, 0);
        grad.addColorStop(0, c(tr.color, tr.alpha));
        grad.addColorStop(1, c(tr.color, 0));
        ctx.beginPath();
        ctx.moveTo(tr.x, tr.y);
        ctx.lineTo(x2, tr.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = tr.width;
        ctx.stroke();
      }
      if (ts - st.lastTrail > 2200 && st.trails.length < N_TRAILS + 2) {
        st.trails.push(makeTrail(cw, ch));
        st.lastTrail = ts;
      }
    };

    /* ── Nodes ── */
    const drawNodes = (t) => {
      stateRef.current.nodes.forEach(nd => {
        const pulse = 0.4 + 0.6 * Math.sin(t * 1.3 + nd.phase);
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = c(nd.color, 0.09 * pulse);
        ctx.fill();
      });
    };

    /* ── Spores — plain circles, no gradients ── */
    const drawSpores = (t) => {
      const cw = w(), ch = h();
      stateRef.current.spores.forEach(s => {
        s.y += s.vy;
        s.x += s.vx;
        s.phase += 0.014;
        if (s.y < -6) { s.y = ch + 6; s.x = rnd() * cw; }
        if (s.x < -6) s.x = cw + 6;
        if (s.x > cw + 6) s.x = -6;
        const wobble = Math.sin(s.phase) * 1.0;
        const pulse  = 0.5 + 0.5 * Math.sin(s.phase * 2.1);
        ctx.beginPath();
        ctx.arc(s.x + wobble, s.y, s.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = c(TEAL, s.a * pulse);
        ctx.fill();
      });
    };

    /* ── Main loop with fps cap + visibility pause ── */
    let lastTs = 0;
    let paused = false;

    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    const draw = (ts) => {
      animRef.current = requestAnimationFrame(draw);
      if (paused || ts - lastTs < FRAME_MS) return;
      lastTs = ts;

      const t  = ts / 1000;
      const cw = w(), ch = h();
      ctx.clearRect(0, 0, cw, ch);

      drawTrails(ts);
      if (!isLowEnd) drawNodes(t);
      drawSpores(t);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
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
