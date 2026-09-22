/**
 * Timeline Rendering & Interactive Polaroid Lightbox
 */

(function () {
  const config = window.BIRTHDAY_CONFIG || {};

  function initCounter() {
    const counterContainer = document.getElementById('days-counter-section');
    const numberEl = document.getElementById('days-count-number');
    const labelEl = document.getElementById('days-count-label');

    if (!config.counter || !config.counter.show || !counterContainer || !numberEl) return;

    const startDate = new Date(config.counter.startDate);
    const endDate = config.counter.endDate ? new Date(config.counter.endDate) : new Date();
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (labelEl && config.counter.label) {
      labelEl.textContent = config.counter.label;
    }

    // Animate number count up
    let startVal = 0;
    const duration = 2000;
    const stepTime = 25;
    const increment = Math.ceil(diffDays / (duration / stepTime));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            startVal += increment;
            if (startVal >= diffDays) {
              numberEl.textContent = diffDays.toLocaleString();
              clearInterval(timer);
            } else {
              numberEl.textContent = startVal.toLocaleString();
            }
          }, stepTime);
          observer.unobserve(counterContainer);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterContainer);
  }

  function renderTimeline() {
    const timelineContainer = document.getElementById('timeline-items');
    if (!timelineContainer || !config.timeline) return;

    timelineContainer.innerHTML = '';

    config.timeline.forEach((item, index) => {
      const isEven = index % 2 === 0;
      const el = document.createElement('div');
      el.className = `timeline-node ${isEven ? 'left' : 'right'}`;

      // Random gentle polaroid rotation (-2deg to +2deg) for authentic feel
      const tilt = ((index % 3) - 1) * 1.5;

      el.innerHTML = `
        <div class="timeline-marker">
          <span class="marker-dot"></span>
          <span class="marker-pulse"></span>
        </div>
        <div class="timeline-card-wrapper" style="--card-tilt: ${tilt}deg;">
          <div class="timeline-card interactive-hover" data-index="${index}">
            <div class="card-polaroid">
              <div class="photo-wrapper">
                <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'">
                <div class="photo-overlay">
                  <span class="view-pill"><i class="icon-expand">⤢</i> Tap to view</span>
                </div>
              </div>
              <div class="card-content">
                <div class="card-meta">
                  <span class="card-date">${item.date}</span>
                  ${item.tag ? `<span class="card-tag">${item.tag}</span>` : ''}
                </div>
                ${item.title ? `<h3 class="card-title">${item.title}</h3>` : ''}
                <p class="card-desc">${item.description}</p>
                ${item.location ? `
                  <div class="card-location">
                    <span class="loc-icon">✦</span> ${item.location}
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      timelineContainer.appendChild(el);
    });

    // Attach click events for lightbox
    attachLightboxListeners();
    initScrollAnimations();

    if (window.attachCursorHoverListeners) {
      window.attachCursorHoverListeners();
    }
  }

  function initScrollAnimations() {
    const cards = document.querySelectorAll('.timeline-node');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    cards.forEach((card) => observer.observe(card));
  }

  function attachLightboxListeners() {
    const cards = document.querySelectorAll('.timeline-card');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDate = document.getElementById('lightbox-date');
    const modalDesc = document.getElementById('lightbox-desc');
    const closeBtn = document.getElementById('lightbox-close');

    if (!modal) return;

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        const item = config.timeline[idx];
        if (!item) return;

        modalImg.src = item.image;
        modalTitle.textContent = item.title;
        modalDate.textContent = item.date;
        modalDesc.textContent = item.description;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
        closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCounter();
    renderTimeline();
  });
})();
