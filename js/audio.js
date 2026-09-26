/**
 * Ambient Romantic Audio Synthesizer & Music Player
 * Generates a soft, dreamy ambient piano/music-box progression using Web Audio API
 * or plays a custom audio URL if provided in config.
 */

window.BirthdayAudio = (function () {
  let audioCtx = null;
  let isPlaying = false;
  let customAudioEl = null;
  let intervalId = null;

  // Romantic Pentatonic / Soft Piano Chord Frequencies (Hz)
  // Peaceful ambient chords: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4/add9
  const CHORDS = [
    [261.63, 329.63, 392.00, 493.88, 587.33], // C, E, G, B, D
    [220.00, 261.63, 329.63, 392.00, 493.88], // A, C, E, G, B
    [174.61, 261.63, 329.63, 349.23, 440.00], // F, C, E, F, A
    [196.00, 293.66, 392.00, 440.00, 587.33]  // G, D, G, A, D
  ];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play a warm, mellow piano/kalimba note
  function playNote(freq, timeOffset = 0, duration = 3.2, volume = 0.09) {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft triangle + sine wave combination feel
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

      // Low pass filter for warm, cozy analog tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime + timeOffset);

      gain.gain.setValueAtTime(0, ctx.currentTime + timeOffset);
      // Gentle attack
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + timeOffset + 0.08);
      // Natural exponential decay
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + timeOffset + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + timeOffset);
      osc.stop(ctx.currentTime + timeOffset + duration + 0.1);
    } catch (e) {
      // Audio context silently handled
    }
  }

  // Play a soft bell chime (used when opening the wax seal!)
  function playChime() {
    try {
      const ctx = getAudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        playNote(freq, idx * 0.09, 2.5, 0.12);
      });
    } catch (e) {}
  }

  let currentChordIdx = 0;

  function scheduleNextArpeggio() {
    if (!isPlaying) return;
    const chord = CHORDS[currentChordIdx];
    currentChordIdx = (currentChordIdx + 1) % CHORDS.length;

    // Play chord tones with subtle arpeggiation delay
    chord.forEach((note, i) => {
      // Arpeggiate with delicate rhythm
      const delay = i * 0.35 + (Math.random() * 0.06);
      playNote(note, delay, 4.0, 0.05 + Math.random() * 0.03);
    });

    // An occasional high sparkle note
    if (Math.random() < 0.65) {
      const highNote = chord[Math.floor(Math.random() * chord.length)] * 2;
      playNote(highNote, 1.8 + Math.random() * 0.4, 2.8, 0.035);
    }
  }

  function start() {
    if (isPlaying) return;
    const config = window.BIRTHDAY_CONFIG?.music;

    if (config?.customAudioUrl) {
      if (!customAudioEl) {
        customAudioEl = new Audio(config.customAudioUrl);
        customAudioEl.loop = true;
      }
      customAudioEl.play().then(() => {
        isPlaying = true;
        updateUI();
      }).catch(() => {
        fallbackToSynth();
      });
    } else {
      fallbackToSynth();
    }
  }

  function fallbackToSynth() {
    getAudioContext();
    isPlaying = true;
    updateUI();
    scheduleNextArpeggio();
    intervalId = setInterval(scheduleNextArpeggio, 4200);
  }

  function stop() {
    isPlaying = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (customAudioEl) {
      customAudioEl.pause();
    }
    updateUI();
  }

  function toggle() {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }

  function updateUI() {
    const btn = document.getElementById('music-toggle');
    const label = document.getElementById('music-label');
    if (!btn) return;

    if (isPlaying) {
      btn.classList.add('playing');
      btn.setAttribute('aria-label', 'Pause ambient music');
      if (label) label.innerText = 'Music Playing';
    } else {
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Play ambient music');
      if (label) label.innerText = 'Sound: Off';
    }
  }

  // Auto-init listener on user interaction
  function initUserInteractionHook() {
    let hasStarted = false;

    const startOnce = () => {
      if (hasStarted) return;
      hasStarted = true;
      window.removeEventListener('click', startOnce);
      window.removeEventListener('touchstart', startOnce);
      start();
    };

    // Try to autoplay after 5 seconds
    setTimeout(() => {
      if (hasStarted) return;

      const config = window.BIRTHDAY_CONFIG?.music;
      if (config?.customAudioUrl) {
        const testAudio = new Audio(config.customAudioUrl);
        testAudio.volume = 0.5;
        testAudio.play().then(() => {
          // Autoplay worked - use this audio element
          hasStarted = true;
          customAudioEl = testAudio;
          customAudioEl.loop = true;
          isPlaying = true;
          updateUI();
          window.removeEventListener('click', startOnce);
          window.removeEventListener('touchstart', startOnce);
        }).catch(() => {
          // Autoplay blocked - wait for user interaction
          testAudio.remove();
        });
      }
    }, 5000);

    window.addEventListener('click', startOnce, { once: true });
    window.addEventListener('touchstart', startOnce, { once: true });
  }

  initUserInteractionHook();

  return {
    start,
    stop,
    toggle,
    playChime,
    get isPlaying() {
      return isPlaying;
    }
  };
})();
