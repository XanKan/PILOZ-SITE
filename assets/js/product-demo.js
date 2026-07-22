// Pilote la démonstration produit : synchronise le scroll des étapes texte
// avec l'écran d'application qui reste épinglé (pattern "scrollytelling").
import { animateCount, prefersReducedMotion } from './animations.js';

const PIPELINE_TARGET_COLUMN = '[data-column="accepte"] .board-cards';

function playDashboard(view) {
  view.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    animateCount(el, end, { prefix, suffix, duration: 900 });
  });
  revealSequence(Array.from(view.querySelectorAll('.mini-list .row')));
}

function playPipeline(view) {
  const card = view.querySelector('.board-card.demo-card');
  const target = view.querySelector(PIPELINE_TARGET_COLUMN);
  const totalFrom = view.querySelector('[data-column="devis"] .total');
  const totalTo = view.querySelector('[data-column="accepte"] .total');
  if (!card || !target) return;

  card.classList.remove('moving');
  const run = () => {
    card.classList.add('moving');
    setTimeout(() => {
      target.appendChild(card);
      if (totalFrom) totalFrom.textContent = totalFrom.dataset.after || totalFrom.textContent;
      if (totalTo) totalTo.textContent = totalTo.dataset.after || totalTo.textContent;
      setTimeout(() => card.classList.remove('moving'), 500);
    }, prefersReducedMotion ? 0 : 650);
  };
  prefersReducedMotion ? run() : setTimeout(run, 500);
}

function revealSequence(items, { onDone } = {}) {
  items.forEach((el, i) => {
    el.classList.remove('shown');
  });
  const delay = prefersReducedMotion ? 0 : 160;
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('shown'), i * delay + (prefersReducedMotion ? 0 : 200));
  });
  if (onDone) {
    setTimeout(onDone, items.length * delay + 500);
  }
}

function playDevis(view) {
  const rows = view.querySelectorAll('.doc-row');
  const status = view.querySelector('.doc-status');
  revealSequence(Array.from(rows), {
    onDone: () => {
      if (status) {
        status.textContent = 'Finalisé';
        status.classList.add('status-ok');
      }
    },
  });
  if (status) {
    status.textContent = 'Brouillon';
    status.classList.remove('status-ok');
  }
}

function playFacture(view) {
  const rows = view.querySelectorAll('.doc-row');
  const status = view.querySelector('.doc-status');
  revealSequence(Array.from(rows), {
    onDone: () => {
      if (status) {
        status.textContent = 'Encaissée';
        status.classList.add('status-ok');
        status.classList.remove('status-wait');
      }
    },
  });
  if (status) {
    status.textContent = 'À encaisser';
    status.classList.add('status-wait');
    status.classList.remove('status-ok');
  }
}

function playClient(view) {
  const items = view.querySelectorAll('.timeline-item');
  revealSequence(Array.from(items));
}

function playPaiements(view) {
  const rows = view.querySelectorAll('.payment-row');
  revealSequence(Array.from(rows));
}

function playAchats(view) {
  const rows = view.querySelectorAll('.mini-list .row');
  revealSequence(Array.from(rows));
}

function playStock(view) {
  const rows = view.querySelectorAll('.stock-row');
  revealSequence(Array.from(rows));
}

const PLAYERS = {
  dashboard: playDashboard,
  pipeline: playPipeline,
  devis: playDevis,
  facture: playFacture,
  paiements: playPaiements,
  client: playClient,
  achats: playAchats,
  stock: playStock,
};

export function initProductDemo() {
  const stage = document.querySelector('.story-stage');
  const steps = Array.from(document.querySelectorAll('.story-step'));
  if (!stage || !steps.length) return;

  const views = stage.querySelectorAll('.app-view');
  const navIcons = stage.querySelectorAll('.app-side i');

  let current = null;

  function activate(name) {
    if (name === current) return;
    current = name;
    views.forEach((v) => v.classList.toggle('is-active', v.dataset.view === name));
    navIcons.forEach((i) => i.classList.toggle('active', i.dataset.view === name));
    steps.forEach((s) => s.classList.toggle('is-current', s.dataset.view === name));
    const view = stage.querySelector(`.app-view[data-view="${name}"]`);
    const player = PLAYERS[name];
    if (view && player) player(view);
  }

  // État initial
  activate(steps[0].dataset.view);

  // Détection par position réelle (au lieu d'IntersectionObserver + seuil étroit) :
  // un scroll rapide peut franchir une bande de déclenchement étroite entre deux
  // vérifications et « sauter » une étape. On recalcule donc à chaque frame de
  // scroll quelle étape est la plus proche du centre de l'écran.
  let ticking = false;

  function updateActiveStep() {
    ticking = false;
    const center = window.innerHeight / 2;
    let closest = null;
    let closestDist = Infinity;

    for (const step of steps) {
      const rect = step.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
      const stepCenter = rect.top + rect.height / 2;
      const dist = Math.abs(stepCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = step;
      }
    }

    if (closest) activate(closest.dataset.view);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateActiveStep);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateActiveStep();
}
