/* ══════════════════════════════════════════════════════════════
   Tron Legacy Sound Engine — Web Audio API
   Boot music: Encom Part II (Daft Punk / TRON Legacy) — MP3
   UI sounds: procedural synthesis (zero extra files)
══════════════════════════════════════════════════════════════ */

let audioCtx = null;
let enabled  = false;

const ac = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
};

/* ── Master compressor ─────────────────────────────────────── */
let compressor = null;
const master = () => {
  if (!compressor) {
    const c = ac().createDynamicsCompressor();
    c.threshold.value = -18;
    c.knee.value      = 6;
    c.ratio.value     = 6;
    c.attack.value    = 0.003;
    c.release.value   = 0.12;
    c.connect(ac().destination);
    compressor = c;
  }
  return compressor;
};

/* ── Low-pass filter helper ────────────────────────────────── */
const makeFilter = (freq, q = 6) => {
  const f = ac().createBiquadFilter();
  f.type            = 'lowpass';
  f.frequency.value = freq;
  f.Q.value         = q;
  return f;
};

/* ── Echo / delay ──────────────────────────────────────────── */
const makeEcho = (delayTime = 0.08, feedback = 0.28) => {
  const d   = ac().createDelay(1.0);
  const fb  = ac().createGain();
  const wet = ac().createGain();
  d.delayTime.value = delayTime;
  fb.gain.value     = feedback;
  wet.gain.value    = 0.22;
  d.connect(fb); fb.connect(d);
  d.connect(wet); wet.connect(master());
  return d;
};

/* ── Oscillator builder ────────────────────────────────────── */
const osc = (freq, type, detune = 0) => {
  const o = ac().createOscillator();
  o.type            = type;
  o.frequency.value = freq;
  o.detune.value    = detune;
  return o;
};

/* ══════════════════════════════════════════════════════════════
   ENCOM PART II — MP3 PLAYER
   Loops /encom.mp3 through a GainNode for volume control.
══════════════════════════════════════════════════════════════ */
let _bgAudio    = null;   // HTMLAudioElement
let _bgGain     = null;   // Web Audio GainNode
let _bgSource   = null;   // MediaElementSourceNode (created once)

const _initBg = () => {
  if (_bgAudio) return;
  _bgAudio        = new Audio('/encom.mp3');
  _bgAudio.loop   = true;
  _bgAudio.volume = 1;

  // Route through Web Audio for gain control + compressor
  _bgGain         = ac().createGain();
  _bgGain.gain.value = 0;
  _bgGain.connect(master());

  _bgSource = ac().createMediaElementSource(_bgAudio);
  _bgSource.connect(_bgGain);
};

const startEncom = () => {
  try {
    _initBg();
    ac(); // ensure context is running
    _bgAudio.currentTime = 0;
    _bgAudio.play().catch(() => {});
    // Fade in over 2 s
    const now = ac().currentTime;
    _bgGain.gain.cancelScheduledValues(now);
    _bgGain.gain.setValueAtTime(0, now);
    _bgGain.gain.linearRampToValueAtTime(0.85, now + 2.0);
  } catch (_) {}
};

const stopEncom = () => {
  if (!_bgAudio) return;
  try {
    const now = ac().currentTime;
    _bgGain.gain.cancelScheduledValues(now);
    _bgGain.gain.setValueAtTime(_bgGain.gain.value, now);
    _bgGain.gain.linearRampToValueAtTime(0, now + 1.5);
    setTimeout(() => { try { _bgAudio.pause(); } catch (_) {} }, 1600);
  } catch (_) {}
};

/* ══════════════════════════════════════════════════════════════
   UI SOUND HELPERS  (procedural — no audio files)
══════════════════════════════════════════════════════════════ */

const play = ({
  freq, type = 'sawtooth', detune = 0,
  attack = 0.01, sustain = 0.05, release = 0.12,
  peak = 0.08, filterStart = 800, filterEnd = null,
  echo = false, delay = 0,
}) => {
  if (!enabled) return;
  try {
    const now = ac().currentTime + delay;
    const o   = osc(freq, type, detune);
    const g   = ac().createGain();
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
  play({ freq, detune: 0,  ...opts });
  play({ freq, detune: +7, ...opts, peak: (opts.peak || 0.08) * 0.6 });
};

const subBass = (freq, dur, delay = 0, vol = 0.14) => {
  if (!enabled) return;
  try {
    const now = ac().currentTime + delay;
    const o   = osc(freq, 'sine');
    const g   = ac().createGain();
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
    const now     = ac().currentTime + delay;
    const samples = ac().sampleRate * dur;
    const buf     = ac().createBuffer(1, samples, ac().sampleRate);
    const data    = buf.getChannelData(0);
    for (let i = 0; i < samples; i++) data[i] = (Math.random() * 2 - 1);
    const src = ac().createBufferSource();
    const g   = ac().createGain();
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
export const soundEngine = {
  setEnabled(val) {
    enabled = val;
    if (val) {
      try { ac(); master(); } catch (_) {}
    } else {
      stopEncom();
    }
  },
  isEnabled: () => enabled,

  startMusic() { if (enabled) startEncom(); },
  startMusicAsync() {
    if (!enabled) return Promise.resolve();
    try {
      _initBg();
      const ctx = ac();
      _bgAudio.currentTime = 0;
      const now = ctx.currentTime;
      _bgGain.gain.cancelScheduledValues(now);
      _bgGain.gain.setValueAtTime(0, now);
      _bgGain.gain.linearRampToValueAtTime(0.85, now + 2.0);
      return _bgAudio.play();
    } catch (_) {
      return Promise.reject(_);
    }
  },
  stopMusic()  { stopEncom(); },

  /* ── Tron UI hover ── */
  hover() {
    play({ freq: 1800, type: 'sine', detune: 5, attack: 0.005, sustain: 0, release: 0.09, peak: 0.03, filterStart: 3500 });
  },

  /* ── Tron UI click ── */
  click() {
    noiseBurst(0.025, 0, 0.06);
    subBass(110, 0.12, 0, 0.10);
    play({ freq: 880,  type: 'square', attack: 0.004, sustain: 0, release: 0.07, peak: 0.05, filterStart: 1200, filterEnd: 400 });
    play({ freq: 1320, type: 'sine',   attack: 0.004, sustain: 0, release: 0.05, peak: 0.03, delay: 0.03 });
  },

  /* ── Section whoosh ── */
  section() {
    subBass(80, 0.18, 0, 0.07);
    play({ freq: 440,  type: 'sawtooth', attack: 0.01, sustain: 0.04, release: 0.14, peak: 0.06, filterStart: 300, filterEnd: 2400 });
    play({ freq: 880,  type: 'sine',     attack: 0.01, sustain: 0.02, release: 0.12, peak: 0.04, echo: true, delay: 0.06 });
    play({ freq: 1760, type: 'sine',     attack: 0.01, sustain: 0,    release: 0.10, peak: 0.03, delay: 0.12 });
  },

  /* ── Identity disc boop ── */
  boop() {
    subBass(55, 0.22, 0, 0.10);
    play({ freq: 220,  type: 'sawtooth', attack: 0.02, sustain: 0.06, release: 0.18, peak: 0.09, filterStart: 200, filterEnd: 3000, echo: true });
    play({ freq: 1760, type: 'sine',     attack: 0.01, sustain: 0,    release: 0.20, peak: 0.05, delay: 0.06 });
  },

  /* ── Victory fanfare ── */
  success() {
    const notes = [
      [220, 0.00, 0.14], [330, 0.09, 0.12], [440, 0.17, 0.12],
      [550, 0.24, 0.14], [660, 0.30, 0.20], [880, 0.36, 0.30],
    ];
    notes.forEach(([f, dl, sus]) => {
      subBass(f / 2, sus + 0.1, dl, 0.06);
      detunedPair(f, { type: 'sawtooth', attack: 0.015, sustain: sus, release: 0.22, peak: 0.07, filterStart: 400, filterEnd: 3200, echo: true, delay: dl });
    });
  },

  /* ── Derezzed glitch ── */
  glitch() {
    noiseBurst(0.08, 0.00, 0.10);
    noiseBurst(0.06, 0.10, 0.07);
    play({ freq: 440, type: 'sawtooth', attack: 0.005, sustain: 0.03, release: 0.06, peak: 0.06, filterStart: 2000, filterEnd: 100, delay: 0.00 });
    play({ freq: 220, type: 'sawtooth', attack: 0.005, sustain: 0.03, release: 0.06, peak: 0.05, filterStart: 1000, filterEnd: 80,  delay: 0.06 });
    subBass(55, 0.12, 0.10, 0.08);
  },
};
