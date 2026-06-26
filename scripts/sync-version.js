#!/usr/bin/env node
/**
 * Sync VERSION file → package.json, README, demo, public docs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const VERSION = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim();

const PUBLIC_DOCS = ['QUICKSTART.md', 'API.md'];

function updatePackageJson() {
  const file = path.join(ROOT, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
  pkg.version = VERSION;
  fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✓ package.json → ${VERSION}`);
}

function updateReadme() {
  const file = path.join(ROOT, 'README.md');
  let md = fs.readFileSync(file, 'utf8');
  md = md.replace(
    /unpkg\.com\/shutters-accordion@[\d.]+/g,
    `unpkg.com/shutters-accordion@${VERSION}`
  );
  md = md.replace(
    /(\*\*)[\d.]+(\*\* — see \[CHANGELOG\.md\])/,
    `$1${VERSION}$2`
  );
  fs.writeFileSync(file, md);
  console.log(`✓ README.md → ${VERSION}`);
}

function updateDemo() {
  const file = path.join(ROOT, 'demo/index.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/("version":\s*")[^"]+(")/, `$1${VERSION}$2`);
  html = html.replace(
    /(<p class="version-badge"[^>]*>v)[\d.]+(<\/p>)/,
    `$1${VERSION}$2`
  );
  fs.writeFileSync(file, html);
  console.log(`✓ demo/index.html → ${VERSION}`);
}

function updatePublicDocs() {
  for (const name of PUBLIC_DOCS) {
    const file = path.join(ROOT, 'docs', name);
    if (!fs.existsSync(file)) {
      console.log(`⚠ docs/${name} not found — skipped`);
      continue;
    }
    let md = fs.readFileSync(file, 'utf8');
    md = md.replace(/Shutters Accordion v[\d.]+/, `Shutters Accordion v${VERSION}`);
    md = md.replace(/`ShuttersAccordion` v[\d.]+/, `\`ShuttersAccordion\` v${VERSION}`);
    md = md.replace(
      /unpkg\.com\/shutters-accordion@[\d.]+/g,
      `unpkg.com/shutters-accordion@${VERSION}`
    );
    fs.writeFileSync(file, md);
    console.log(`✓ docs/${name} → ${VERSION}`);
  }
}

console.log(`\nSyncing version: ${VERSION}\n`);
updatePackageJson();
updateReadme();
updateDemo();
updatePublicDocs();
console.log('\n✅ Version sync complete\n');
