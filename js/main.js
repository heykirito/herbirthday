/**
 * Main Application Coordinator
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.BIRTHDAY_CONFIG || {};

  // Hydrate Hero & Header from Config
  const headerBrandText = document.getElementById('header-brand-text');
  const heroBadge = document.getElementById('hero-badge-text');
  const recipientName = document.getElementById('recipient-name');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroCtaText = document.getElementById('hero-cta-text');
  const timelineDesc = document.getElementById('timeline-section-desc');
  const footerYear = document.getElementById('current-year');

  if (headerBrandText && config.headerBrand) {
    headerBrandText.textContent = config.headerBrand;
  }
  if (heroBadge && config.recipient?.badge) {
    heroBadge.textContent = config.recipient.badge;
  }
  if (recipientName && config.recipient?.name) {
    recipientName.textContent = config.recipient.name;
  }
  if (heroSubtitle && config.recipient?.heroSubtitle) {
    heroSubtitle.textContent = config.recipient.heroSubtitle;
  }
  if (heroCtaText && config.recipient?.heroCta) {
    heroCtaText.textContent = config.recipient.heroCta;
  }
  if (timelineDesc && config.timelineDesc) {
    timelineDesc.textContent = config.timelineDesc;
  }
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Smooth Scroll Trigger
  const scrollBtn = document.getElementById('scroll-to-timeline');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const timelineSection = document.getElementById('timeline-section');
      if (timelineSection) {
        timelineSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Audio Toggle Button
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle && window.BirthdayAudio) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      window.BirthdayAudio.toggle();
    });
  }

  // Gentle Ambient Music First-Click Prompt
  let hasInteracted = false;
  const onFirstInteraction = () => {
    if (hasInteracted) return;
    hasInteracted = true;
    window.removeEventListener('click', onFirstInteraction);
    window.removeEventListener('scroll', onFirstInteraction);
  };

  window.addEventListener('click', onFirstInteraction, { passive: true });
  window.addEventListener('scroll', onFirstInteraction, { passive: true });
});
