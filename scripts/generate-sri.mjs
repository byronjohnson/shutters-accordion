#!/usr/bin/env node
/**
 * Generate Subresource Integrity hashes for CDN assets in dist/
 * Writes demo/cdn-integrity.json (shipped with GitHub Pages demo)
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const VERSION = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim();
const BASE = `https://unpkg.com/shutters-accordion@${VERSION}/dist`;

const ASSETS = [
  'core.css',
  'theme.css',
  'shutters.es.js',
  'shutters.umd.js',
  'shutters.auto.es.js',
];

function integrity(filePath) {
  const buf = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha384').update(buf).digest('base64');
  return `sha384-${hash}`;
}

const missing = ASSETS.filter((name) => !fs.existsSync(path.join(ROOT, 'dist', name)));
if (missing.length) {
  console.error('Missing dist files — run npm run build first:\n  ' + missing.join('\n  '));
  process.exit(1);
}

const files = {};
for (const name of ASSETS) {
  files[name] = {
    url: `${BASE}/${name}`,
    integrity: integrity(path.join(ROOT, 'dist', name)),
  };
}

const snippet = `<link rel="stylesheet" href="${files['core.css'].url}"
  integrity="${files['core.css'].integrity}" crossorigin="anonymous">
<!-- optional theme -->
<link rel="stylesheet" href="${files['theme.css'].url}"
  integrity="${files['theme.css'].integrity}" crossorigin="anonymous">
<script src="${files['shutters.umd.js'].url}"
  integrity="${files['shutters.umd.js'].integrity}" crossorigin="anonymous"></script>
<script>
  new ShuttersAccordion({ container: '.shutters-accordion' });
</script>`;

const payload = { version: VERSION, baseUrl: BASE, files, snippet };
const out = path.join(ROOT, 'demo', 'cdn-integrity.json');
fs.writeFileSync(out, JSON.stringify(payload, null, 2) + '\n');
console.log(`✓ Wrote ${path.relative(ROOT, out)} (${VERSION})`);
for (const name of ASSETS) {
  console.log(`  ${name}: ${files[name].integrity.slice(0, 20)}…`);
}
