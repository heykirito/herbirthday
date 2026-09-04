/**
 * Elegant Ambient Background Canvas
 * Creates soft, floating warm bokeh orbs and delicate twinkling stardust.
 */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let orbs = [];
  let mouse = { x: null, y: null, targetX: null, targetY: null };

  const COLORS = [
    'rgba(244, 219, 216, 0.45)', // Rose blush
    'rgba(247, 235, 224, 0.5)',  // Warm champagne
    'rgba(235, 206, 178, 0.35)', // Golden apricot
    'rgba(223, 187, 180, 0.35)', // Muted pink
    'rgba(255, 255, 255, 0.6)'   // Soft light
  ];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    initElements();
  }

  class Orb {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.radius = Math.random() * 120 + 80;
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + this.radius;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -(Math.random() * 0.25 + 0.15);
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.baseAlpha = Math.random() * 0.25 + 0.1;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.015 + 0.005;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulse) * 0.06;

      // Soft mouse interaction
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.3;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      if (this.y < -this.radius || this.x < -this.radius || this.x > width + this.radius) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      grad.addColorStop(0, this.color.replace(/[\d\.]+\)$/, `${this.alpha})`));
      grad.addColorStop(0.6, this.color.replace(/[\d\.]+\)$/, `${this.alpha * 0.4})`));
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class Sparkle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2 + 0.6;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.vx = (Math.random() - 0.5) * 0.2;
      this.alpha = Math.random() * 0.7 + 0.3;
      this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.phase += this.twinkleSpeed;
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }
    draw() {
      const currentAlpha = Math.max(0, (Math.sin(this.phase) * 0.4 + 0.6) * this.alpha);
      ctx.save();
      ctx.fillStyle = `rgba(235, 195, 160, ${currentAlpha})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(255, 220, 180, 0.6)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initElements() {
    orbs = [];
    particles = [];
    const orbCount = Math.max(6, Math.floor(width / 220));
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb());
    }
    const sparkleCount = Math.max(30, Math.floor(width / 35));
    for (let i = 0; i < sparkleCount; i++) {
      particles.push(new Sparkle());
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
  });

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    if (mouse.targetX !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }
    } else {
      mouse.x = null;
      mouse.y = null;
    }

    for (let i = 0; i < orbs.length; i++) {
      orbs[i].update();
      orbs[i].draw();
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
