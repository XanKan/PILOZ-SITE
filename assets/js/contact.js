// Formulaire de contact : envoi via FormSubmit (pas de backend sur ce site
// statique), avec retour visuel inline sans rechargement de page.
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('contact-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';
    status.textContent = '';
    status.classList.remove('is-success', 'is-error');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error('request failed');

      form.reset();
      form.classList.add('is-sent');
      status.textContent = 'Message envoyé. Nous vous répondrons rapidement à l’adresse indiquée.';
      status.classList.add('is-success');
    } catch (err) {
      status.textContent = 'Une erreur est survenue. Vous pouvez aussi nous écrire directement à erp-piloz@outlook.com.';
      status.classList.add('is-error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    }
  });
}
