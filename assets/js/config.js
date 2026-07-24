// Source unique de vérité pour les liens et les offres Piloz.
// Toute modification de tarif ou de lien doit se faire uniquement ici.

export const LINKS = {
  login: 'https://app.piloz.fr/?mode=login',
  signup: 'https://piloz.fr/checkout.html',
  signupEssential: 'https://piloz.fr/checkout.html?plan=essential',
  signupPro: 'https://piloz.fr/checkout.html?plan=pro',
  signupBusiness: 'https://piloz.fr/checkout.html?plan=business',
  calendly: 'https://calendly.com/erp-piloz/30min',
};

const PLAN_IDS = new Set(['essential', 'pro', 'business']);
export function signupForPlan(planId, billing = 'monthly') {
  const plan = PLAN_IDS.has(planId) ? planId : 'essential';
  const interval = billing === 'annual' ? 'annual' : 'monthly';
  const url = new URL(LINKS.signup);
  url.searchParams.set('plan', plan);
  url.searchParams.set('billing', interval);
  return url.toString();
}

export const PLANS = [
  {
    id: 'essential',
    name: 'Essentiel',
    desc: 'Pour démarrer un suivi commercial propre et facturer sans friction.',
    monthly: 29,
    yearly: 290,
    yearlySaving: 58,
    cta: 'Essayer Essentiel',
    link: signupForPlan('essential'),
    features: [
      '1 utilisateur',
      'Clients et prospects',
      'Pipeline commercial',
      'Activités',
      'Devis',
      'Factures',
      'Avoirs',
      'Paiements',
      'Échéances clients',
      'Catalogue d’articles et services',
      'Modèles standards',
      'Export PDF et CSV',
      'Tableau de bord essentiel',
      'Support e-mail',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'Pour automatiser le suivi commercial et piloter vos achats et votre stock.',
    monthly: 59,
    yearly: 590,
    yearlySaving: 118,
    featured: true,
    cta: 'Essayer Pro',
    link: signupForPlan('pro'),
    inherit: 'Essentiel',
    features: [
      'Jusqu’à 5 utilisateurs',
      'Automatisations du pipeline',
      'Notifications collaboratives',
      'Factures d’acompte',
      'Factures de situation',
      'Factures de solde',
      'Achats',
      'Fournisseurs',
      'Commandes fournisseurs',
      'Gestion de stock',
      'Inventaires',
      'Modèles personnalisables',
      'Rapports de marge',
      'Tableau de bord avancé',
      'Support prioritaire',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    desc: 'Pour les structures avec plusieurs équipes, entrepôts et exigences de contrôle.',
    monthly: 99,
    yearly: 990,
    yearlySaving: 198,
    cta: 'Essayer Business',
    link: signupForPlan('business'),
    inherit: 'Pro',
    features: [
      'Jusqu’à 15 utilisateurs',
      'Rôles et permissions avancés',
      'Plusieurs entrepôts',
      'Plusieurs grilles tarifaires',
      'Rapports personnalisés',
      'Historique d’activité avancé',
      'Processus de validation interne',
      'Accompagnement au déploiement',
      'Support prioritaire renforcé',
      'Accès API lorsqu’il sera disponible',
    ],
  },
];
