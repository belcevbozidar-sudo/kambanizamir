/* ==========================================================================
   КАМБАНИ ЗА МИР — main.js
   Навигация, header scroll state, cookie banner, back-to-top, countdown
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle?.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-header')) {
      mainNav?.classList.remove('open');
      navToggle?.classList.remove('active');
    }
  });

  /* Toggle dropdown on mobile tap */
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* ---------- Active nav link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href && href.split('#')[0] === currentPage)) {
      link.classList.add('active');
    }
  });

  /* ---------- Header scroll effect ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Notification bar close ---------- */
  const notifBar = document.querySelector('.notification-bar');
  const notifClose = document.querySelector('.notif-close');
  notifClose?.addEventListener('click', () => {
    notifBar.style.display = 'none';
  });

  /* ---------- Cookie banner ---------- */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  if (cookieBanner) {
    if (localStorage.getItem('kzm_cookie_consent') === 'accepted') {
      cookieBanner.classList.add('hidden');
    }
    cookieAccept?.addEventListener('click', () => {
      localStorage.setItem('kzm_cookie_consent', 'accepted');
      cookieBanner.classList.add('hidden');
    });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Countdown to 21.09.2026 12:00 ---------- */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const updateCountdown = () => {
      const target = new Date('2026-09-21T12:00:00+03:00');
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p class="countdown-ended">Денят е дошъл! 🔔</p>';
        return;
      }

      const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

});
