import { readFileSync } from 'node:fs';

const origin = 'https://piloz.fr';
const indexable = [
  ['index.html', `${origin}/`],
  ['logiciel-devis-facturation.html', `${origin}/logiciel-devis-facturation.html`],
  ['logiciel-gestion-commerciale-tpe.html', `${origin}/logiciel-gestion-commerciale-tpe.html`],
  ['logiciel-facturation-artisan.html', `${origin}/logiciel-facturation-artisan.html`],
  ['contact.html', `${origin}/contact.html`],
];

const sitemap = readFileSync('sitemap.xml', 'utf8');
const failures = [];
const seenTitles = new Set();
const seenDescriptions = new Set();

function contentOf(html, expression) {
  return html.match(expression)?.[1]?.trim() ?? '';
}

for (const [file, canonical] of indexable) {
  const html = readFileSync(file, 'utf8');
  const title = contentOf(html, /<title>([^<]+)<\/title>/i);
  const description = contentOf(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonicalValue = contentOf(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const robots = contentOf(html, /<meta\s+name="robots"\s+content="([^"]+)"/i).toLowerCase();
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const jsonScripts = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];

  if (!title || title.length < 25 || title.length > 65) failures.push(`${file}: titre absent ou longueur ${title.length}`);
  if (!description || description.length < 110 || description.length > 170) failures.push(`${file}: description absente ou longueur ${description.length}`);
  if (canonicalValue !== canonical) failures.push(`${file}: canonical ${canonicalValue || 'absente'}`);
  if (!robots.includes('index') || robots.includes('noindex')) failures.push(`${file}: robots non indexable`);
  if (h1Count !== 1) failures.push(`${file}: ${h1Count} balise(s) h1`);
  if (!html.includes('property="og:title"') || !html.includes('name="twitter:card"')) failures.push(`${file}: métadonnées sociales incomplètes`);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`${file}: URL absente du sitemap`);
  if (seenTitles.has(title)) failures.push(`${file}: titre dupliqué`);
  if (seenDescriptions.has(description)) failures.push(`${file}: description dupliquée`);
  seenTitles.add(title);
  seenDescriptions.add(description);

  for (const [, json] of jsonScripts) {
    try { JSON.parse(json); } catch (error) { failures.push(`${file}: JSON-LD invalide (${error.message})`); }
  }
}

const checkout = readFileSync('checkout.html', 'utf8').toLowerCase();
if (!checkout.includes('noindex')) failures.push('checkout.html: noindex absent');
if (sitemap.includes('checkout.html')) failures.push('sitemap.xml: checkout ne doit pas être indexé');

const robots = readFileSync('robots.txt', 'utf8');
if (!robots.includes('Allow: /') || !robots.includes('https://piloz.fr/sitemap.xml')) failures.push('robots.txt: règles publiques incorrectes');

if (failures.length) {
  console.error(`SEO: ${failures.length} erreur(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO: ${indexable.length} pages indexables vérifiées, canonicales uniques et JSON-LD valide.`);
