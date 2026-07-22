// Bascule entre les 3 styles de modèles de documents (section "Modèles de documents").
export function initTemplateSwitcher() {
  const switcher = document.querySelector('.doc-template-switcher');
  const preview = document.querySelector('.doc-template-preview');
  if (!switcher || !preview) return;

  switcher.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      switcher.querySelectorAll('button').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      preview.classList.remove('tpl-classique', 'tpl-moderne', 'tpl-compact');
      preview.classList.add(`tpl-${btn.dataset.template}`);
    });
  });
}
