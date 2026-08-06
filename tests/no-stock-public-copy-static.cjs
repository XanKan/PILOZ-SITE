const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');

const publicFiles = [
  'index.html',
  'logiciel-devis-facturation.html',
  'logiciel-facturation-artisan.html',
  'logiciel-gestion-commerciale-tpe.html',
  'contact.html',
  'legal/confidentialite.html',
  'assets/js/config.js',
];

const forbidden = /\bstocks?\b|\binventaires?\b|\bentrep[oô]ts?\b/i;

for (const file of publicFiles) {
  assert.doesNotMatch(readFileSync(file, 'utf8'), forbidden, `${file} contient encore une promesse de gestion de marchandises.`);
}

console.log(`Positionnement public : aucune mention de gestion de marchandises dans ${publicFiles.length} fichiers.`);
