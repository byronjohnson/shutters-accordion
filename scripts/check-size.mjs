#!/usr/bin/env node
/** Fail if built assets exceed gzip budgets (Phase 1 quality gate) */
import fs from 'fs';
import path from 'path';
import { gzipSync } from 'zlib';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const BUDGETS = {
  'shutters.es.js': 2320,
  'shutters.umd.js': 2200,
  'core.css': 900,
  'theme.css': 1200,
};

function gzipBytes(file) {
  return gzipSync(fs.readFileSync(file)).length;
}

const missing = Object.keys(BUDGETS).filter((f) => !fs.existsSync(path.join(DIST, f)));
if (missing.length) {
  console.error('❌ Run `npm run build` first. Missing:', missing.join(', '));
  process.exit(1);
}

let failed = false;
console.log('\nBundle size (gzip):\n');
for (const [file, max] of Object.entries(BUDGETS)) {
  const bytes = gzipBytes(path.join(DIST, file));
  const ok = bytes <= max;
  if (!ok) failed = true;
  console.log(`  ${ok ? '✓' : '✗'} ${file}: ${bytes} B (max ${max} B)`);
}
console.log('');
if (failed) process.exit(1);
console.log('✓ All bundles within budget\n');
