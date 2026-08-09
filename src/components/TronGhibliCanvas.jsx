import { useEffect, useRef } from 'react';

const RED     = [241, 81, 83];
const ORCHID  = [168, 85, 247];
const MAGENTA = [209, 84, 140];

const c = ([r, g, b], a) => `rgba(${r},${g},${b},${a.toFixed(2)})`;

/* Lighter particle field — canvas sits under every section */
const N_SPORES = 8;
const N_TRAILS = 2;
const N_NODES  = 3;
const FRAME_MS = 1000 / 24;

const rnd = () => Math.random();

const makeSpore = (w, h) => ({
  x:     rnd() * w,
  y:     rnd() * h,
  r:     rnd() * 1.2 + 0.5,
  vy:    -(rnd() * 0.18 + 0.05),
  vx:    (rnd() - 0.5) * 0.10,
  phase: rnd() * Math.PI * 2,
  a:     rnd() * 0.08 + 0.03,
});

const makeTrail = (w, h) => {
  const right = rnd() < 0.5;
  const col   = [RED, ORCHID, MAGENTA][Math.floor(rnd() * 3)];
  return {
    x:     right ? -60 : w + 60,
    y:     rnd() * h * 0.75,
    speed: (rnd() * 1.4 + 0.6) * (right ? 1 : -1),
    len:   rnd() * 70 + 35,
    color: col,
    alpha: rnd() * 0.10 + 0.04,
    width: rnd() * 1.0 + 0.4,
  };
};

const makeNode = (w, h) => ({
  x:     rnd() * w,
  y:     rnd() * h * 0.60,
  r:     rnd() * 2.0 + 1.0,
  phase: rnd() * Math.PI * 2,
  color: [RED, ORCHID, MAGENTA][Math.floor(rnd() * 3)],
});

const TronGhibliCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d', { alpha: true, desynchronized: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    stateRef.current = {
      spores:    Array.from({ length: N_SPORES }, () => makeSpore(w(), h())),
      trails:    Array.from({ length: N_TRAILS }, () => makeTrail(w(), h())),
      nodes:     Array.from({ length: N_NODES  }, () => makeNode(w(), h())),
      lastTrail: 0,
    };

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
      if (ts - st.lastTrail > 2800 && st.trails.length < N_TRAILS + 1) {
        st.trails.push(makeTrail(cw, ch));
        st.lastTrail = ts;
      }
    };

    const drawNodes = (t) => {
      stateRef.current.nodes.forEach((nd) => {
        const pulse = 0.4 + 0.6 * Math.sin(t * 1.3 + nd.phase);
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = c(nd.color, 0.04 * pulse);
        ctx.fill();
      });
    };

    const drawSpores = (t) => {
      const cw = w(), ch = h();
      stateRef.current.spores.forEach((s) => {
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
        ctx.fillStyle = c(ORCHID, s.a * pulse);
        ctx.fill();
      });
    };

    let lastTs = 0;
    let paused = document.hidden;

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
      drawNodes(t);
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
      }}
    />
  );
};

export default TronGhibliCanvas;
