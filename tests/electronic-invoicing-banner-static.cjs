const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('assets/css/piloz-premium.css', 'utf8');

assert.match(html, /class="einvoice-banner"[^>]+href="#facturation-electronique"/);
assert.match(html, /id="facturation-electronique"/);
assert.match(html, /Factur-X/);
assert.match(html, /\bCII\b/);
assert.match(html, /plateforme agréée/);
assert.match(html, /Émission, réception et suivi des statuts/);
assert.doesNotMatch(html, /bac à sable|environnement de test|testée en bac/i);
assert.match(html, /1<sup>er<\/sup> septembre 2026/);
assert.match(html, /1<sup>er<\/sup> septembre 2027/);
assert.match(html, /economie\.gouv\.fr\/tout-savoir-sur-la-facturation-electronique/);
assert.doesNotMatch(html, /Piloz (?:est|devient) (?:une )?plateforme agréée/i);
assert.doesNotMatch(html, /Piloz (?:est )?certifi[ée]/i);
assert.match(css, /\.einvoice-banner\s*\{/);
assert.match(css, /@media \(max-width:640px\)/);
assert.match(css, /prefers-reduced-motion:reduce/);

console.log('Facturation électronique : bandeau, section, contenus et responsive vérifiés.');
