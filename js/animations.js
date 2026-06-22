/* ==========================================================================
   КАМБАНИ ЗА МИР — animations.js
   Intersection Observer за reveal-on-scroll анимации
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!('IntersectionObserver' in window) || revealElements.length === 0) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

});
