/* ══════════════════════════════════════════════════════════════
   Sound Engine
   Background: /encom.mp3 from public/ (primary)
   Fallback: procedural ambient if the file can't play
   UI sounds: Web Audio synthesis
══════════════════════════════════════════════════════════════ */

let audioCtx = null;
let enabled = true;
let musicPlaying = false;
let unlockBound = false;
let usingMp3 = false;

const STORAGE_KEY = 'portfolio-music-enabled';
const MUSIC_SRC = '/encom.mp3';

const ac = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
};

const resumeCtx = async () => {
  const ctx = ac();
  if (ctx.state === 'suspended') {
    try { await ctx.resume(); } catch (_) {}
  }
  return ctx;
};

/* ── Master for UI SFX only ─────────────────────────────────── */
let compressor = null;
const master = () => {
  if (!compressor) {
    const c = ac().createDynamicsCompressor();
    c.threshold.value = -18;
    c.knee.value = 6;
    c.ratio.value = 6;
    c.attack.value = 0.003;
    c.release.value = 0.12;
    c.connect(ac().destination);
    compressor = c;
  }
  return compressor;
};

const makeFilter = (freq, q = 6) => {
  const f = ac().createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
};

const makeEcho = (delayTime = 0.08, feedback = 0.28) => {
  const d = ac().createDelay(1.0);
  const fb = ac().createGain();
  const wet = ac().createGain();
  d.delayTime.value = delayTime;
  fb.gain.value = feedback;
  wet.gain.value = 0.22;
  d.connect(fb); fb.connect(d);
  d.connect(wet); wet.connect(master());
  return d;
};

const osc = (freq, type, detune = 0) => {
  const o = ac().createOscillator();
  o.type = type;
  o.frequency.value = freq;
  o.detune.value = detune;
  return o;
};

/* ══════════════════════════════════════════════════════════════
   MP3 — direct HTMLAudioElement (most reliable for a real track)
══════════════════════════════════════════════════════════════ */
let _bgAudio = null;

const getBgAudio = () => {
  if (_bgAudio) return _bgAudio;
  // Prefer the DOM <audio id="encom-audio"> from index.html (faster load)
  const el = typeof document !== 'undefined'
    ? document.getElementById('encom-audio')
    : null;
  const a = el instanceof HTMLAudioElement ? el : new Audio(MUSIC_SRC);
  a.loop = true;
  a.preload = 'auto';
  a.playsInline = true;
  a.setAttribute('playsinline', '');
  a.volume = 0.7;
  if (!a.src || !String(a.src).includes('encom')) {
    a.src = MUSIC_SRC;
  }
  _bgAudio = a;
  return a;
};

const startMp3 = async () => {
  const audio = getBgAudio();
  await resumeCtx();
  audio.muted = false;
  audio.volume = 0.7;
  // Always (re)play encom.mp3 on start
  if (audio.paused || audio.ended || audio.currentTime === 0) {
    try { if (audio.readyState === 0) audio.load(); } catch (_) {}
    await audio.play();
  } else if (audio.paused) {
    await audio.play();
  }
  usingMp3 = true;
  musicPlaying = true;
};

const stopMp3 = () => {
  if (!_bgAudio) return;
  try {
    _bgAudio.pause();
    _bgAudio.currentTime = 0;
  } catch (_) {}
};

/* ══════════════════════════════════════════════════════════════
   PROCEDURAL FALLBACK (only if MP3 missing / fails)
══════════════════════════════════════════════════════════════ */
let _ambGain = null;
let _ambNodes = [];
let _ambTimer = null;
let _ambStep = 0;
const AMB_NOTES = [110, 130.81, 164.81, 196, 220, 261.63, 329.63];

const stopAmbient = () => {
  if (_ambTimer) {
    clearInterval(_ambTimer);
    _ambTimer = null;
  }
  _ambNodes.forEach((n) => {
    try { n.stop?.(); } catch (_) {}
    try { n.disconnect?.(); } catch (_) {}
  });
  _ambNodes = [];
  if (_ambGain) {
    try {
      const now = ac().currentTime;
      _ambGain.gain.cancelScheduledValues(now);
      _ambGain.gain.setValueAtTime(0, now);
    } catch (_) {}
  }
};

const startAmbient = async () => {
  stopAmbient();
  await resumeCtx();
  if (ac().state !== 'running') {
    throw new Error('AudioContext suspended — needs user gesture');
  }
  master();

  if (!_ambGain) {
    _ambGain = ac().createGain();
    _ambGain.connect(master());
  }

  const now = ac().currentTime;
  _ambGain.gain.cancelScheduledValues(now);
  _ambGain.gain.setValueAtTime(0, now);
  _ambGain.gain.linearRampToValueAtTime(0.28, now + 0.8);

  const drone = osc(55, 'sine');
  const drone2 = osc(82.5, 'triangle', -8);
  const droneG = ac().createGain();
  droneG.gain.value = 0.4;
  const flt = makeFilter(700, 2);
  drone.connect(flt);
  drone2.connect(flt);
  flt.connect(droneG);
  droneG.connect(_ambGain);
  drone.start();
  drone2.start();
  _ambNodes.push(drone, drone2);

  usingMp3 = false;
  musicPlaying = true;

  const tick = () => {
    if (!musicPlaying || !enabled || usingMp3) return;
    try {
      const t = ac().currentTime;
      const freq = AMB_NOTES[_ambStep % AMB_NOTES.length];
      _ambStep += 1;
      const o = osc(freq, 'sine');
      const o2 = osc(freq * 2, 'triangle', 4);
      const g = ac().createGain();
      const f = makeFilter(1800, 3);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.1, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      o.connect(f); o2.connect(f); f.connect(g); g.connect(_ambGain);
      o.start(t); o2.start(t);
      o.stop(t + 0.6); o2.stop(t + 0.6);
    } catch (_) {}
  };

  tick();
  _ambTimer = setInterval(tick, 480);
};

const startMusicInternal = async () => {
  if (!enabled) return false;

  // Always use /encom.mp3 — no ambient substitute on load
  stopAmbient();
  await startMp3();
  return true;
};

const stopMusicInternal = () => {
  stopMp3();
  stopAmbient();
  musicPlaying = false;
  usingMp3 = false;
};

/* ══════════════════════════════════════════════════════════════
   UI SOUND HELPERS
══════════════════════════════════════════════════════════════ */
const play = ({
  freq, type = 'sawtooth', detune = 0,
  attack = 0.01, sustain = 0.05, release = 0.12,
  peak = 0.08, filterStart = 800, filterEnd = null,
  echo = false, delay = 0,
}) => {
  if (!enabled) return;
  try {
    if (ac().state !== 'running') return;
    const now = ac().currentTime + delay;
    const o = osc(freq, type, detune);
    const g = ac().createGain();
    const flt = makeFilter(filterStart, 7);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(peak, now + attack);
    g.gain.setValueAtTime(peak, now + attack + sustain);
    g.gain.exponentialRampToValueAtTime(0.0001, now + attack + sustain + release);

    if (filterEnd) {
      flt.frequency.setValueAtTime(filterStart, now);
      flt.frequency.exponentialRampToValueAtTime(filterEnd, now + attack + sustain + release);
    }

    o.connect(flt); flt.connect(g);
    g.connect(echo ? makeEcho() : master());
    o.start(now);
    o.stop(now + attack + sustain + release + 0.05);
  } catch (_) {}
};

const detunedPair = (freq, opts = {}) => {
  play({ freq, detune: 0, ...opts });
  play({ freq, detune: +7, ...opts, peak: (opts.peak || 0.08) * 0.6 });
};

const subBass = (freq, dur, delay = 0, vol = 0.14) => {
  if (!enabled) return;
  try {
    if (ac().state !== 'running') return;
    const now = ac().currentTime + delay;
    const o = osc(freq, 'sine');
    const g = ac().createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.connect(g); g.connect(master());
    o.start(now); o.stop(now + dur + 0.05);
  } catch (_) {}
};

const noiseBurst = (dur = 0.06, delay = 0, vol = 0.05) => {
  if (!enabled) return;
  try {
    if (ac().state !== 'running') return;
    const now = ac().currentTime + delay;
    const samples = ac().sampleRate * dur;
    const buf = ac().createBuffer(1, samples, ac().sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < samples; i++) data[i] = (Math.random() * 2 - 1);
    const src = ac().createBufferSource();
    const g = ac().createGain();
    const flt = makeFilter(3200, 2);
    src.buffer = buf;
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(flt); flt.connect(g); g.connect(master());
    src.start(now);
  } catch (_) {}
};

/* ══════════════════════════════════════════════════════════════
   PUBLIC API
══════════════════════════════════════════════════════════════ */
const readStoredEnabled = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === null) return true;
    return v === '1' || v === 'true';
  } catch {
    return true;
  }
};

enabled = readStoredEnabled();

let _unlockHandler = null;
const UNLOCK_EVENTS = ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'click'];

const unbindUnlock = () => {
  if (!_unlockHandler) return;
  UNLOCK_EVENTS.forEach((e) => document.removeEventListener(e, _unlockHandler, true));
  _unlockHandler = null;
  unlockBound = false;
};

const bindUnlockOnce = () => {
  if (unlockBound || musicPlaying || !enabled) return;
  unlockBound = true;

  const unlock = () => {
    if (!enabled) {
      unbindUnlock();
      return;
    }
    const ctx = ac();
    const start = () => {
      startMusicInternal()
        .then((ok) => { if (ok) unbindUnlock(); })
        .catch(() => {});
    };
    if (ctx.state === 'suspended') {
      ctx.resume().then(start).catch(() => {});
    } else {
      start();
    }
  };

  _unlockHandler = unlock;
  UNLOCK_EVENTS.forEach((e) =>
    document.addEventListener(e, unlock, { capture: true, passive: true }),
  );
};

export const soundEngine = {
  setEnabled(val) {
    enabled = !!val;
    try { localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0'); } catch (_) {}
    if (!enabled) {
      unbindUnlock();
      stopMusicInternal();
    }
  },

  isEnabled: () => enabled,
  isPlaying: () => {
    if (!musicPlaying) return false;
    if (usingMp3 && _bgAudio) return !_bgAudio.paused;
    return audioCtx?.state === 'running';
  },
  isUsingMp3: () => usingMp3,

  async startMusic() {
    if (!enabled) return false;
    try {
      return await startMusicInternal();
    } catch (_) {
      bindUnlockOnce();
      return false;
    }
  },

  async startMusicAsync() {
    if (!enabled) return false;
    try {
      const ok = await startMusicInternal();
      if (ok) return true;
      bindUnlockOnce();
      return false;
    } catch (_) {
      bindUnlockOnce();
      return false;
    }
  },

  armAutoplayUnlock() {
    if (enabled && !musicPlaying) bindUnlockOnce();
  },

  async ensureMusic() {
    if (!enabled) return false;
    try {
      const ctx = ac();
      if (ctx.state === 'suspended') await ctx.resume();
      const ok = await startMusicInternal();
      if (ok) {
        unbindUnlock();
        return true;
      }
      bindUnlockOnce();
      return false;
    } catch (_) {
      bindUnlockOnce();
      return false;
    }
  },

  stopMusic() {
    stopMusicInternal();
  },

  /** Preload asset so Enter starts instantly */
  preload() {
    try { getBgAudio().load(); } catch (_) {}
  },

  hover() {
    play({
      freq: 1800, type: 'sine', detune: 5,
      attack: 0.005, sustain: 0, release: 0.09,
      peak: 0.03, filterStart: 3500,
    });
  },

  click() {
    noiseBurst(0.025, 0, 0.06);
    subBass(110, 0.12, 0, 0.10);
    play({ freq: 880, type: 'square', attack: 0.004, sustain: 0, release: 0.07, peak: 0.05, filterStart: 1200, filterEnd: 400 });
    play({ freq: 1320, type: 'sine', attack: 0.004, sustain: 0, release: 0.05, peak: 0.03, delay: 0.03 });
  },

  section() {
    subBass(80, 0.18, 0, 0.07);
    play({ freq: 440, type: 'sawtooth', attack: 0.01, sustain: 0.04, release: 0.14, peak: 0.06, filterStart: 300, filterEnd: 2400 });
    play({ freq: 880, type: 'sine', attack: 0.01, sustain: 0.02, release: 0.12, peak: 0.04, echo: true, delay: 0.06 });
    play({ freq: 1760, type: 'sine', attack: 0.01, sustain: 0, release: 0.10, peak: 0.03, delay: 0.12 });
  },

  boop() {
    subBass(55, 0.22, 0, 0.10);
    play({ freq: 220, type: 'sawtooth', attack: 0.02, sustain: 0.06, release: 0.18, peak: 0.09, filterStart: 200, filterEnd: 3000, echo: true });
    play({ freq: 1760, type: 'sine', attack: 0.01, sustain: 0, release: 0.20, peak: 0.05, delay: 0.06 });
  },

  success() {
    const notes = [
      [220, 0.00, 0.14], [330, 0.09, 0.12], [440, 0.17, 0.12],
      [550, 0.24, 0.14], [660, 0.30, 0.20], [880, 0.36, 0.30],
    ];
    notes.forEach(([f, dl, sus]) => {
      subBass(f / 2, sus + 0.1, dl, 0.06);
      detunedPair(f, {
        type: 'sawtooth', attack: 0.015, sustain: sus, release: 0.22,
        peak: 0.07, filterStart: 400, filterEnd: 3200, echo: true, delay: dl,
      });
    });
  },

  glitch() {
    noiseBurst(0.08, 0.00, 0.10);
    noiseBurst(0.06, 0.10, 0.07);
    play({ freq: 440, type: 'sawtooth', attack: 0.005, sustain: 0.03, release: 0.06, peak: 0.06, filterStart: 2000, filterEnd: 100, delay: 0.00 });
    play({ freq: 220, type: 'sawtooth', attack: 0.005, sustain: 0.03, release: 0.06, peak: 0.05, filterStart: 1000, filterEnd: 80, delay: 0.06 });
    subBass(55, 0.12, 0.10, 0.08);
  },
};
