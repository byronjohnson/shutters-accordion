#!/usr/bin/env node
/**
 * Ensures the library stays vanilla JS — no runtime deps, no TS source, no framework code.
 * Run: npm run verify:vanilla (also runs before vitest)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === 'dist' || name === 'dist-demo') continue;
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

const pkg = readJson('package.json');

if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
  errors.push('package.json must not have runtime "dependencies" — vanilla JS, zero deps');
}

const libraryDirs = ['src', 'demo'].map((d) => path.join(ROOT, d));
const rootEntries = ['index.js', 'auto.js'].map((f) => path.join(ROOT, f));

function isForbiddenLibraryFile(file) {
  const base = path.basename(file);
  if (base.endsWith('.d.ts')) return false;
  return ['.ts', '.tsx', '.jsx', '.vue', '.svelte'].includes(path.extname(file));
}

for (const file of [...libraryDirs.flatMap((d) => walk(d)), ...rootEntries.filter(fs.existsSync)]) {
  if (isForbiddenLibraryFile(file)) {
    errors.push(`Non-vanilla source file: ${path.relative(ROOT, file)}`);
  }
}

const srcJs = walk(path.join(ROOT, 'src')).filter((f) => f.endsWith('.js'));
for (const file of srcJs) {
  const content = fs.readFileSync(file, 'utf8');
  if (/from\s+['"](react|vue|svelte|@angular|lit|preact)['"]/i.test(content)) {
    errors.push(`Framework import in ${path.relative(ROOT, file)}`);
  }
}

if (errors.length) {
  console.error('❌ Vanilla JS verification failed:\n');
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

console.log('✓ Vanilla JS policy OK (no runtime deps, .js source only, no framework imports in src)');
