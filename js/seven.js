/* script.js — small site scripts: fade on scroll, scroll to top, small UI behaviors */
/* Fade sections on scroll using IntersectionObserver */
document.addEventListener('DOMContentLoaded', function(){
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        // optionally unobserve to avoid repeated triggers:
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
  });

  /* Scroll-to-top button */
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 400) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  const heroCarouselEl = document.querySelector('#heroCarousel');

  // Initialize carousel
  const carousel = new bootstrap.Carousel(heroCarouselEl, {
    interval: 5000,
    pause: false  // manual pause control
  });

  const pauseBtn = document.getElementById('carouselPause');
  let isPaused = false;

  pauseBtn.addEventListener('click', () => {
    if (!isPaused) {
      carousel.pause();
      pauseBtn.textContent = "Play";
    } else {
      carousel.cycle();
      pauseBtn.textContent = "Pause";
    }
    isPaused = !isPaused;
  });
});


// about UX 
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));


// scroll
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#article-nav',
  offset: 150
})


// keyboard tabbing
const sections = document.querySelectorAll('.scroll-section');

document.addEventListener('keydown', e => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

  const active = document.activeElement;
  const index = [...sections].indexOf(active);

  if (index === -1) return;

  e.preventDefault();

  const next = e.key === 'ArrowDown'
    ? sections[index + 1]
    : sections[index - 1];

  if (next) {
    next.focus({ preventScroll: false });
  }
});



// table UX - add to pages for specific tables
document.getElementById('drainageTable')
  .addEventListener('shown.bs.collapse', function () {
    this.querySelector('.grid-table-wrapper').focus();
  });