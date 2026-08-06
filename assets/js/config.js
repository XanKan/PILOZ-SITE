// Source unique de vérité pour les liens et les offres Piloz.
// Toute modification de tarif ou de lien doit se faire uniquement ici.

export const LINKS = {
  login: 'https://app.piloz.fr/?mode=login',
  signup: 'https://piloz.fr/checkout.html',
  discovery: 'https://piloz.fr/contact.html?offer=discovery',
  signupEssential: 'https://piloz.fr/checkout.html?plan=essential',
  signupPro: 'https://piloz.fr/checkout.html?plan=pro',
  signupBusiness: 'https://piloz.fr/checkout.html?plan=business',
  calendly: 'https://calendly.com/erp-piloz/30min',
  contactEndpoint: 'https://hpxcbemezvynofxiffzs.supabase.co/functions/v1/public-contact',
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
    id: 'discovery',
    name: 'Découverte',
    desc: 'Pour découvrir Piloz et structurer une petite activité sans abonnement.',
    monthly: 0,
    yearly: 0,
    yearlySaving: 0,
    free: true,
    priceNote: 'Gratuit, sans carte bancaire',
    cta: 'Demander un accès gratuit',
    link: LINKS.discovery,
    features: [
      '1 utilisateur',
      '20 clients et prospects actifs',
      '5 devis numérotés par mois',
      '5 factures finalisées par mois',
      'Pipeline commercial et activités',
      'Relances manuelles',
      'Paiements et échéances clients',
      'Modèles standards avec la marque Piloz',
      'Tableau de bord essentiel',
      'Exports PDF et CSV',
      'Documentation en libre-service',
    ],
  },
  {
    id: 'essential',
    name: 'Essentiel',
    desc: 'Pour gérer et facturer une activité régulière sans limites mensuelles.',
    monthly: 29,
    yearly: 290,
    yearlySaving: 58,
    cta: 'Choisir Essentiel',
    link: signupForPlan('essential'),
    features: [
      '1 utilisateur',
      'Clients et prospects illimités',
      'Pipeline commercial',
      'Activités',
      'Devis',
      'Factures',
      'Avoirs',
      'Factures d’acompte et de solde',
      'Paiements',
      'Échéances clients',
      'Relances manuelles',
      'Catalogue d’articles et services',
      'Modèles standards',
      'Export PDF et CSV',
      'Tableau de bord essentiel',
      'Documentation et support e-mail',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'Pour automatiser le suivi commercial, collaborer et piloter les achats.',
    monthly: 59,
    yearly: 590,
    yearlySaving: 118,
    featured: true,
    cta: 'Choisir Pro',
    link: signupForPlan('pro'),
    inherit: 'Essentiel',
    features: [
      'Jusqu’à 5 utilisateurs',
      'Relances automatiques',
      'Factures récurrentes',
      'Automatisations du pipeline',
      'Notifications collaboratives',
      'Achats',
      'Fournisseurs',
      'Commandes fournisseurs',
      'Modèles personnalisables',
      'Rapports de marge',
      'Tableau de bord avancé',
      'Rôles prédéfinis',
      'Support prioritaire',
      '1 heure d’accompagnement au démarrage',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    desc: 'Pour les équipes qui ont besoin de droits avancés et d’un cadre de déploiement.',
    monthly: 119,
    yearly: 1190,
    yearlySaving: 238,
    cta: 'Choisir Business',
    link: signupForPlan('business'),
    inherit: 'Pro',
    features: [
      'Jusqu’à 15 utilisateurs',
      'Rôles et permissions personnalisés',
      'Historique d’activité',
      'Administration avancée',
      'Accompagnement au déploiement',
      'Support prioritaire renforcé',
      'API et webhooks lorsqu’ils seront disponibles',
    ],
  },
];
