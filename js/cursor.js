/**
 * Custom Cursor & Trailing Heart / Sparkle Effect
 * Creates a smooth follower ring, precision dot, and magical heart sparkle trail.
 */

(function () {
  // Check if touch device
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  const trailContainer = document.createElement('div');
  trailContainer.className = 'cursor-trail-container';

  document.body.appendChild(trailContainer);

  if (!isTouch) {
    document.body.appendChild(dot);
    document.body.appendChild(ring);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovered = false;
  let isClicking = false;
  let lastSpawn = 0;

  const SPARKLE_SYMBOLS = ['✦', '✧', '♥', '♡', '⋆', '•'];
  const COLORS = [
    '#E7A8A6', // Warm rose
    '#F2C49B', // Golden peach
    '#E28E95', // Deep blush
    '#F7E1D7', // Champagne
    '#B3828B'  // Rosewood
  ];

  function spawnSparkle(x, y, isBurst = false) {
    const el = document.createElement('span');
    el.className = 'cursor-sparkle';
    el.innerText = SPARKLE_SYMBOLS[Math.floor(Math.random() * SPARKLE_SYMBOLS.length)];
    el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];

    const size = isBurst ? Math.random() * 10 + 12 : Math.random() * 8 + 10;
    el.style.fontSize = `${size}px`;

    // Random velocity
    const angle = isBurst ? Math.random() * Math.PI * 2 : (Math.random() - 0.5) * Math.PI;
    const speed = isBurst ? Math.random() * 60 + 20 : Math.random() * 20 + 5;
    const destX = Math.cos(angle) * speed;
    const destY = isBurst ? Math.sin(angle) * speed : -(Math.random() * 35 + 15);
    const rotation = (Math.random() - 0.5) * 90;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--dest-x', `${destX}px`);
    el.style.setProperty('--dest-y', `${destY}px`);
    el.style.setProperty('--rot', `${rotation}deg`);

    trailContainer.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 950);
  }

  // Track mouse
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isTouch) {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    const now = performance.now();
    // Spawn trail if moving and throttled
    if (now - lastSpawn > 45) {
      // 70% chance to spawn on move for a delicate, non-overwhelming feel
      if (Math.random() < 0.75) {
        spawnSparkle(mouseX + (Math.random() - 0.5) * 10, mouseY + (Math.random() - 0.5) * 10);
      }
      lastSpawn = now;
    }
  });

  // Tap or click bursts
  window.addEventListener('pointerdown', (e) => {
    isClicking = true;
    ring.classList.add('active');

    // Create burst of 6 sparkles
    for (let i = 0; i < 7; i++) {
      spawnSparkle(e.clientX, e.clientY, true);
    }
  });

  window.addEventListener('pointerup', () => {
    isClicking = false;
    ring.classList.remove('active');
  });

  // Interactive element hover detection
  function attachHoverListeners() {
    const interactables = document.querySelectorAll(
      'a, button, input, .timeline-card, .wax-seal, .photo-frame, .interactive-hover'
    );
    interactables.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        isHovered = true;
        ring.classList.add('hovering');
      });
      item.addEventListener('mouseleave', () => {
        isHovered = false;
        ring.classList.remove('hovering');
      });
    });
  }

  // Smooth lerp loop for the outer ring
  function renderRing() {
    if (!isTouch) {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }
    requestAnimationFrame(renderRing);
  }

  renderRing();

  // Expose hover re-attachment for dynamically rendered timeline cards
  window.attachCursorHoverListeners = attachHoverListeners;
  setTimeout(attachHoverListeners, 400);
})();
