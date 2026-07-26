import { LINKS } from './config.js?v=20260726.1';

// Le formulaire public est transmis à la fonction Supabase Piloz. La clé du
// fournisseur e-mail et l'adresse destinataire restent uniquement côté serveur.
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('contact-status');
  const success = document.getElementById('contact-success');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';
    status.textContent = '';
    status.classList.remove('is-error');

    try {
      const data = new FormData(form);
      const response = await fetch(LINKS.contactEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: data.get('first_name'),
          last_name: data.get('last_name'),
          company: data.get('company'),
          email: data.get('email'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const result = contentType.includes('application/json') ? await response.json() : {};
      if (!response.ok || result.sent !== true) {
        throw new Error(result.error || 'Le message n’a pas pu être envoyé.');
      }

      form.reset();
      form.hidden = true;
      if (success) success.hidden = false;
    } catch (error) {
      status.textContent = error?.message || 'Une erreur est survenue. Vous pouvez aussi nous écrire directement à erp-piloz@outlook.com.';
      status.classList.add('is-error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    }
  });
}
