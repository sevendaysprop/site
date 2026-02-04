// timeline for switch step-through
(function () {
  const OFFSET = 100;

  function scrollWithOffset(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;

    window.scrollTo({
      top: y,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    });

    el.focus({ preventScroll: true });
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('.js-step-link');
    if (!link) return;

    const hash = link.getAttribute('href');
    if (!hash || !hash.startsWith('#')) return;

    const id = hash.slice(1);
    if (!document.getElementById(id)) return;

    e.preventDefault();
    scrollWithOffset(id);
    history.pushState(null, '', hash);
  });
})();
