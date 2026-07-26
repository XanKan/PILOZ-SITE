// Presentation-only motion. It never changes links, forms, pricing or application state.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');

export function initPremiumMotion() {
  document.documentElement.classList.add('piloz-premium-ready');
  if (reducedMotion.matches || !finePointer.matches) return;

  const frame = document.querySelector('.device-frame');
  if (!frame) return;

  let raf = 0;
  const update = (event) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = frame.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      frame.style.setProperty('--tilt-x', `${(-y * 2.6).toFixed(2)}deg`);
      frame.style.setProperty('--tilt-y', `${(x * 3.2).toFixed(2)}deg`);
      frame.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      frame.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
    });
  };

  const reset = () => {
    cancelAnimationFrame(raf);
    frame.style.setProperty('--tilt-x', '0deg');
    frame.style.setProperty('--tilt-y', '0deg');
    frame.style.setProperty('--glow-x', '50%');
    frame.style.setProperty('--glow-y', '0%');
  };

  frame.addEventListener('pointermove', update, { passive: true });
  frame.addEventListener('pointerleave', reset, { passive: true });
}
