// Pilote la démonstration produit : une seule animation globale en boucle
// (Devis → Facturation → Suivi), entièrement portée par CSS. Le JS se contente
// de mettre l'animation en pause quand la démo n'est pas visible à l'écran —
// aucune logique liée à la position de scroll, donc aucun risque de « saut ».
export function initProductDemo() {
  const showcase = document.querySelector('.showcase');
  if (!showcase) return;

  if (!('IntersectionObserver' in window)) {
    showcase.classList.add('is-playing');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        showcase.classList.toggle('is-playing', entry.isIntersecting);
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(showcase);
}
