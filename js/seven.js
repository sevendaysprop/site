/* script.js — small site scripts: fade on scroll, scroll to top, small UI behaviors */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // Fade sections on scroll (.fade-in-section)
  // ---------------------------
  const fadeSections = document.querySelectorAll('.fade-in-section');
  if (fadeSections.length) {
    const fadeObserverOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12
    };

    const fadeObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, fadeObserverOptions);

    fadeSections.forEach(section => fadeObserver.observe(section));
  }

  // ---------------------------
  // Reveal on scroll (.reveal)
  // ---------------------------
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // ---------------------------
  // Scroll-to-top button
  // ---------------------------
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      scrollBtn.style.display = (window.scrollY > 400) ? 'flex' : 'none';
    };

    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    toggleScrollBtn(); // set initial state

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------------------
  // Hero carousel + Play/Pause button
  // ---------------------------
  const heroCarouselEl = document.querySelector('#heroCarousel');
  if (heroCarouselEl && window.bootstrap?.Carousel) {
    // Avoid double init if data attributes already created an instance
    const carousel = bootstrap.Carousel.getOrCreateInstance(heroCarouselEl, {
      interval: 5000,
      pause: false,     // manual pause control
      ride: false,
      keyboard: true
    });

    const pauseBtn = document.getElementById('carouselPause');
    if (pauseBtn) {
      let isPaused = false;

      pauseBtn.addEventListener('click', () => {
        if (!isPaused) {
          carousel.pause();
          pauseBtn.textContent = 'Play';
        } else {
          carousel.cycle();
          pauseBtn.textContent = 'Pause';
        }
        isPaused = !isPaused;
      });
    }
  }

  // ---------------------------
  // ScrollSpy (only if nav exists)
  // ---------------------------
  const spyTarget = document.querySelector('#article-nav');
  if (spyTarget && window.bootstrap?.ScrollSpy) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#article-nav',
      offset: 150
    });
  }

  // ---------------------------
  // Keyboard tabbing (ArrowUp / ArrowDown) between focusable sections
  // ---------------------------
  const sections = document.querySelectorAll('.scroll-section');
  if (sections.length) {
    // Ensure they can receive focus (only if your HTML doesn't already set tabindex)
    sections.forEach(sec => {
      if (!sec.hasAttribute('tabindex')) sec.setAttribute('tabindex', '-1');
    });

    document.addEventListener('keydown', e => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

      const active = document.activeElement;
      const arr = Array.from(sections);
      const index = arr.indexOf(active);

      if (index === -1) return;

      e.preventDefault();

      const next = e.key === 'ArrowDown'
        ? arr[index + 1]
        : arr[index - 1];

      if (next) next.focus({ preventScroll: false });
    });
  }
});
