#!/usr/bin/env node
/**
 * Sync VERSION file → package.json, demo JSON-LD, README CDN pins
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const VERSION = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim();

function updatePackageJson() {
  const file = path.join(ROOT, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
  pkg.version = VERSION;
  fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✓ package.json → ${VERSION}`);
}

function updateDemoJsonLd() {
  const file = path.join(ROOT, 'demo/index.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/("version":\s*")[^"]+(")/, `$1${VERSION}$2`);
  fs.writeFileSync(file, html);
  console.log(`✓ demo/index.html JSON-LD → ${VERSION}`);
}

function updateReadmeCdn() {
  const file = path.join(ROOT, 'README.md');
  let md = fs.readFileSync(file, 'utf8');
  md = md.replace(
    /unpkg\.com\/shutters-accordion@[\d.]+/g,
    `unpkg.com/shutters-accordion@${VERSION}`
  );
  fs.writeFileSync(file, md);
  console.log(`✓ README.md CDN pins → ${VERSION}`);
}

console.log(`\nSyncing version: ${VERSION}\n`);
updatePackageJson();
updateDemoJsonLd();
updateReadmeCdn();
console.log('\n✅ Version sync complete\n');
