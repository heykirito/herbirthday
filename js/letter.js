/**
 * 3D Envelope Opening Animation, Heartfelt Letter & Confetti Cannon
 */

(function () {
  const config = window.BIRTHDAY_CONFIG || {};

  // Built-in Pure Canvas Confetti Cannon
  function launchConfetti(originX, originY) {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#E7A8A6', '#DDA77B', '#F7E1D7', '#C46D77', '#EED28B', '#FFFFFF'];
    const count = 110;

    const startX = originX !== undefined ? originX : window.innerWidth / 2;
    const startY = originY !== undefined ? originY : window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * Math.random());
      const speed = Math.random() * 11 + 5;
      pieces.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 7 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.26,
        opacity: 1,
        shape: Math.random() > 0.35 ? 'rect' : 'circle'
      });
    }

    let animationFrame;
    function updateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activePieces = 0;

      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.0075;

        if (p.opacity > 0) {
          activePieces++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      if (activePieces > 0) {
        animationFrame = requestAnimationFrame(updateConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    updateConfetti();
  }

  function initLetter() {
    const sealBtn = document.getElementById('wax-seal');
    const envelope = document.getElementById('envelope');
    const letterSheet = document.getElementById('letter-sheet');
    const wishBtn = document.getElementById('make-wish-btn');
    const resealBtn = document.getElementById('reseal-letter-btn');

    if (!sealBtn || !envelope || !letterSheet) return;

    // Fill letter contents from config
    const letterData = config.letter || {};
    const salutationEl = document.getElementById('letter-salutation');
    const bodyEl = document.getElementById('letter-body');
    const closingEl = document.getElementById('letter-closing');
    const authorEl = document.getElementById('letter-author');
    const dateEl = document.getElementById('letter-date');
    const psEl = document.getElementById('letter-ps');

    if (salutationEl) salutationEl.textContent = letterData.salutation || 'My Love,';
    if (closingEl) closingEl.textContent = letterData.closing || 'Forever & always yours,';
    if (authorEl) authorEl.textContent = letterData.author || '';
    if (dateEl) dateEl.textContent = letterData.date || 'Today & Always';
    if (psEl && letterData.postscript) psEl.textContent = letterData.postscript;

    if (bodyEl && letterData.paragraphs) {
      bodyEl.innerHTML = letterData.paragraphs
        .map(p => `<p class="letter-paragraph">${p}</p>`)
        .join('');
    }

    let isOpen = false;

    function openEnvelope() {
      if (isOpen) return;
      isOpen = true;

      // Play chime
      if (window.BirthdayAudio) {
        window.BirthdayAudio.playChime();
      }

      // Step 1: Wax seal crack & burst
      sealBtn.classList.add('cracking');

      setTimeout(() => {
        // Step 2: Envelope flap opens 180deg
        envelope.classList.add('flap-open');

        setTimeout(() => {
          // Step 3: Envelope fades, letter unfolds
          envelope.classList.add('letter-revealed');
          letterSheet.classList.add('unfolded');

          // Smooth scroll to ensure letter is comfortably centered
          setTimeout(() => {
            letterSheet.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 200);

          // Step 4: Fire confetti from seal point
          const sealRect = sealBtn.getBoundingClientRect();
          launchConfetti(sealRect.left + sealRect.width / 2, sealRect.top + sealRect.height / 2);

          // Step 5: Staggered paragraph reveal
          setTimeout(() => {
            const paragraphs = document.querySelectorAll('.letter-paragraph');
            paragraphs.forEach((p, idx) => {
              setTimeout(() => {
                p.classList.add('fade-in');
              }, idx * 220);
            });
          }, 450);

        }, 500);
      }, 350);
    }

    function closeEnvelope() {
      if (!isOpen) return;
      isOpen = false;

      // Reset paragraphs
      const paragraphs = document.querySelectorAll('.letter-paragraph');
      paragraphs.forEach(p => p.classList.remove('fade-in'));

      letterSheet.classList.remove('unfolded');
      envelope.classList.remove('letter-revealed');

      setTimeout(() => {
        envelope.classList.remove('flap-open');
        setTimeout(() => {
          sealBtn.classList.remove('cracking');
        }, 400);
      }, 500);

      // Scroll envelope back into view
      envelope.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    sealBtn.addEventListener('click', openEnvelope);

    if (resealBtn) {
      resealBtn.addEventListener('click', closeEnvelope);
    }

    if (wishBtn) {
      wishBtn.addEventListener('click', () => {
        const rect = wishBtn.getBoundingClientRect();
        launchConfetti(rect.left + rect.width / 2, rect.top);
        if (window.BirthdayAudio) {
          window.BirthdayAudio.playChime();
        }

        wishBtn.innerHTML = '✨ Wish sent to the stars! ✨';
        wishBtn.disabled = true;
        setTimeout(() => {
          wishBtn.innerHTML = 'Make Another Wish ✦';
          wishBtn.disabled = false;
        }, 3500);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initLetter);
})();
