// Révélations génériques au scroll, basées sur IntersectionObserver.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-stagger, .device-wrap');
  if (!targets.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

// Petit compteur numérique utilisé par les tuiles KPI du tableau de bord.
export function animateCount(el, endValue, { duration = 900, prefix = '', suffix = '' } = {}) {
  if (reduceMotion) {
    el.textContent = `${prefix}${endValue}${suffix}`;
    return;
  }
  const start = performance.now();
  const from = 0;
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(from + (endValue - from) * eased);
    el.textContent = `${prefix}${value.toLocaleString('fr-FR')}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export const prefersReducedMotion = reduceMotion;
