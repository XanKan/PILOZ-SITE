// Presentation-only motion. It never changes links, forms, prices or application state.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');

function initScrollProgress() {
  const progress = document.querySelector('.scroll-progress');
  if (!progress) return;

  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = distance > 0 ? Math.min(1, window.scrollY / distance) : 0;
      progress.style.setProperty('--scroll-progress', ratio.toFixed(4));
    });
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
}

function initSceneObserver() {
  const scenes = [...document.querySelectorAll('[data-scene]')];
  const journeyCards = [...document.querySelectorAll('.journey-card')];

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    scenes.forEach((scene) => scene.classList.add('is-inview'));
    journeyCards[0]?.classList.add('is-active');
    return;
  }

  const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-inview');
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  scenes.forEach((scene) => sceneObserver.observe(scene));

  const stepObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    journeyCards.forEach((card) => card.classList.toggle('is-active', card === visible.target));
  }, { rootMargin: '-28% 0px -42% 0px', threshold: [0.1, 0.35, 0.7] });
  journeyCards.forEach((card) => stepObserver.observe(card));
}

function initPointerSpotlights() {
  if (reducedMotion.matches || !finePointer.matches) return;
  const targets = document.querySelectorAll('.journey-card, .seo-card, .feature-card, .plan-card, .usecase-card');
  targets.forEach((target) => {
    target.classList.add('piloz-spotlight');
    target.addEventListener('pointermove', (event) => {
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      target.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
  });
}

function initMagneticActions() {
  if (reducedMotion.matches || !finePointer.matches) return;
  document.querySelectorAll('.btn-primary, .btn-outline').forEach((button) => {
    button.classList.add('piloz-magnetic');
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.11;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
      button.style.setProperty('--magnetic-x', `${x.toFixed(1)}px`);
      button.style.setProperty('--magnetic-y', `${y.toFixed(1)}px`);
    }, { passive: true });
    button.addEventListener('pointerleave', () => {
      button.style.setProperty('--magnetic-x', '0px');
      button.style.setProperty('--magnetic-y', '0px');
    }, { passive: true });
  });
}

function initProductDepth() {
  if (reducedMotion.matches || !finePointer.matches) return;

  const device = document.querySelector('.device-frame');
  const consoleFrame = document.querySelector('.hero-console');
  let frame = 0;

  if (device) {
    const updateDevice = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = device.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        device.style.setProperty('--tilt-x', `${(-y * 2.6).toFixed(2)}deg`);
        device.style.setProperty('--tilt-y', `${(x * 3.2).toFixed(2)}deg`);
        device.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
        device.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    };
    device.addEventListener('pointermove', updateDevice, { passive: true });
    device.addEventListener('pointerleave', () => {
      device.style.setProperty('--tilt-x', '0deg');
      device.style.setProperty('--tilt-y', '0deg');
      device.style.setProperty('--glow-x', '50%');
      device.style.setProperty('--glow-y', '0%');
    }, { passive: true });
  }

  if (consoleFrame) {
    const hero = consoleFrame.closest('.hero');
    hero?.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      consoleFrame.style.setProperty('--console-x', `${(x * 14).toFixed(1)}px`);
      consoleFrame.style.setProperty('--console-y', `${(y * 9).toFixed(1)}px`);
    }, { passive: true });
    hero?.addEventListener('pointerleave', () => {
      consoleFrame.style.setProperty('--console-x', '0px');
      consoleFrame.style.setProperty('--console-y', '0px');
    }, { passive: true });
  }
}

export function initPremiumMotion() {
  document.documentElement.classList.add('piloz-premium-ready');
  initScrollProgress();
  initSceneObserver();
  initPointerSpotlights();
  initMagneticActions();
  initProductDepth();
}
