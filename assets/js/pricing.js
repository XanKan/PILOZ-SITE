// Rendu des offres et bascule Mensuel / Annuel, à partir de la source unique config.js.
import { PLANS, signupForPlan } from './config.js';

function planCardHTML(plan, period) {
  const isFree = plan.free === true;
  const price = isFree ? 0 : period === 'yearly' ? plan.yearly : plan.monthly;
  const unit = isFree ? '€ HT' : period === 'yearly' ? '€ HT / an' : '€ HT / mois';
  const sub = isFree
    ? plan.priceNote
    : period === 'yearly'
      ? `Soit ${plan.yearlySaving} € économisés par an vs. mensuel`
      : `ou ${plan.yearly} € HT / an`;

  const inheritLi = plan.inherit ? `<li class="is-inherit">Tout ${plan.inherit}, plus :</li>` : '';
  const featuresLi = plan.features.map((f) => `<li>${f}</li>`).join('');
  const billing = period === 'yearly' ? 'annual' : 'monthly';
  const signupLink = isFree ? plan.link : signupForPlan(plan.id, billing);
  const actionData = isFree
    ? 'data-plan-contact="discovery"'
    : `data-plan-signup="${plan.id}" data-billing="${billing}"`;

  return `
    <div class="plan-card${plan.featured ? ' is-featured' : ''}" data-plan="${plan.id}">
      ${plan.featured ? '<span class="plan-badge">Le plus choisi</span>' : ''}
      <div class="plan-name">${plan.name}</div>
      <p class="plan-desc">${plan.desc}</p>
      <div class="plan-price"><strong>${price}</strong><span>${unit}</span></div>
      <p class="plan-price-sub">${sub}</p>
      <ul class="plan-features">${inheritLi}${featuresLi}</ul>
      <a class="btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-block" href="${signupLink}" ${actionData}>${plan.cta}</a>
    </div>
  `;
}

function renderPlans(period) {
  const grid = document.getElementById('pricing-grid');
  if (grid) grid.innerHTML = PLANS.map((p) => planCardHTML(p, period)).join('');

  document.querySelectorAll('[data-plan-price]').forEach((el) => {
    const plan = PLANS.find((p) => p.id === el.dataset.planPrice);
    if (!plan) return;
    const price = plan.free ? 0 : period === 'yearly' ? plan.yearly : plan.monthly;
    const unit = plan.free ? '€ HT' : period === 'yearly' ? '€ HT/an' : '€ HT/mois';
    el.textContent = `${price} ${unit}`;
  });

  const saveEl = document.getElementById('pricing-save');
  if (saveEl) {
    saveEl.textContent =
      period === 'yearly'
        ? 'Avec l’engagement annuel, vous économisez jusqu’à 238 € par an selon votre offre.'
        : '';
  }
}

export function initPricing() {
  const toggleButtons = document.querySelectorAll('.pricing-toggle button');
  if (!document.getElementById('pricing-grid')) return;

  let period = 'monthly';
  renderPlans(period);

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      period = btn.dataset.period;
      toggleButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
      renderPlans(period);
    });
  });
}
