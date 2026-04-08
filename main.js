// ============================================================
// AEON SUZAKA LP — Main JS
// ============================================================

// --- Dark mode toggle ---
(function () {
  const r = document.documentElement;
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = prefersDark ? 'dark' : 'light';
  r.setAttribute('data-theme', theme);
})();


// --- Scroll-based header shadow ---
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 16px rgba(44,37,32,0.10)';
    } else {
      header.style.boxShadow = '';
    }
  }, { passive: true });
})();


// --- Fade-in on scroll (Intersection Observer) ---
(function () {
  const targets = document.querySelectorAll(
    '.benefit-card, .checklist-item, .style-card, .flow-step, .accordion-item, .message-card'
  );

  targets.forEach((el, i) => {
    el.classList.add('fade-in');
    // Stagger delay for grouped elements
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    const idx = siblings.indexOf(el);
    if (idx === 1) el.classList.add('fade-in-delay-1');
    if (idx === 2) el.classList.add('fade-in-delay-2');
    if (idx === 3) el.classList.add('fade-in-delay-3');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();


// --- Smooth anchor scrolling with offset for sticky header ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 72; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
