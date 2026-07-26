# Audit de refonte visuelle — PILOZ-SITE

Date : 26 juillet 2026  
Périmètre : site vitrine, présentation, responsive, animation et accessibilité.

## Résumé exécutif

Le site Piloz possède déjà une base éditoriale complète : navigation, proposition de valeur, démonstration produit, bénéfices, offres, sécurité, FAQ et appels à l'action. Son thème sombre et ses accents turquoise sont cohérents avec la marque, mais l'ensemble reste proche d'un modèle SaaS générique : hero centré, succession de cartes similaires et profondeur limitée.

La refonte conserve le contenu, les formulaires, les liens, les paramètres commerciaux et le calcul des offres. Elle transforme la mise en scène et les interactions sans toucher à la logique de souscription ni aux données.

## Architecture existante

- Site statique HTML/CSS/JavaScript sans étape de compilation.
- Feuilles séparées par responsabilité : variables, base, layout, composants, animations et responsive.
- Composants tarifaires générés par `pricing.js`.
- Animations d'apparition au scroll via `IntersectionObserver`.
- Démonstration produit animée et navigation mobile existantes.
- Polices : Albert Sans et Spline Sans Mono.
- Indexation active et correcte pour `piloz.fr`.

## Forces

- Contenu dense et organisé.
- Palette immédiatement identifiable.
- Démonstration produit déjà interactive.
- Gestion de `prefers-reduced-motion` déjà amorcée.
- HTML globalement sémantique et parcours d'appel à l'action cohérent.

## Points à améliorer

- Hero trop isolé de la démonstration produit.
- Composition très centrée, avec peu de tension éditoriale.
- Sections successives utilisant des cartes visuellement proches.
- Accent corail parfois concurrent du turquoise de marque.
- Navigation, tarifs et CTA manquent d'une finition « produit premium ».
- Les bordures et ombres n'expriment pas assez les niveaux de profondeur.
- Les animations sont utiles mais peu différenciées entre les sections.
- Le rendu mobile doit préserver le caractère du bureau sans devenir une simple colonne neutre.

## Direction retenue : « Piloz Signal / Midnight Atlas »

- toile bleu nuit presque noire, enrichie d'une lumière turquoise localisée ;
- hero éditorial avec produit immédiatement présent dans la composition ;
- profondeur obtenue par verre sombre, bordures lumineuses et halos contenus ;
- données et preuves traitées comme un flux opérationnel ;
- cartes asymétriques, grandes respirations et sections clairement différenciées ;
- prix affichés avec une hiérarchie forte et une offre recommandée magnétique ;
- mouvement discret : révélation progressive, parallaxe légère et feedback immédiat ;
- aucun effet au détriment de la lisibilité ou des performances.

## Règles de non-régression

- Aucune modification de `pricing.js`, du calcul des offres ou du parcours Stripe.
- Aucune modification des formulaires, destinations, API ou données.
- Les liens vers l'application restent identiques.
- Le site vitrine reste indexable ; aucun `noindex` ou `Disallow: /` n'est ajouté.
- Les animations respectent `prefers-reduced-motion`.
- La couche de refonte reste additive et supprimable.

## Priorités

1. Harmoniser tokens, navigation, boutons et typographie.
2. Recomposer le hero et intégrer la démonstration à la première impression.
3. Différencier les sections bénéfices, produit, sécurité et offres.
4. Renforcer prix, FAQ, CTA final et pied de page.
5. Ajouter les micro-interactions et la profondeur de défilement.
6. Vérifier clavier, contrastes, mobile et performance.
