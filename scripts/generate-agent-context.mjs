#!/usr/bin/env node
/**
 * Generates .cursor/generated/inventory.md from the codebase.
 * Run: npm run agent:sync
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, '.cursor', 'generated', 'inventory.md');

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function listFiles(dir, ext = null) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full)
    .filter(f => !ext || f.endsWith(ext))
    .map(f => `${dir}/${f}`)
    .sort();
}

function extractPublicMethods(source) {
  const methods = [];
  const re = /^\s{2}\/\*\*[\s\S]*?\*\/\s*\n\s{2}(\w+)\(/gm;
  let m;
  while ((m = re.exec(source)) !== null) {
    if (!m[1].startsWith('_') && m[1] !== 'constructor') methods.push(m[1]);
  }
  return [...new Set(methods)];
}

function extractCustomProperties(css) {
  const props = new Set();
  const re = /--shutters-[a-z-]+/g;
  let m;
  while ((m = re.exec(css)) !== null) props.add(m[0]);
  return [...props].sort();
}

function extractHtmlClasses(html) {
  const classes = new Set();
  const classAttrRe = /class="([^"]*)"/g;
  let m;
  while ((m = classAttrRe.exec(html)) !== null) {
    for (const cls of m[1].split(/\s+/)) {
      if (cls.startsWith('shutters-')) classes.add(cls);
    }
  }
  return [...classes].sort();
}

function readVersionFrom(file) {
  if (!exists(file)) return null;
  const content = read(file);
  if (file === 'VERSION') return content.trim();
  if (file === 'package.json') return JSON.parse(content).version;
  const match = content.match(/"version":\s*"([^"]+)"/);
  return match ? match[1] : null;
}

function main() {
  const pkg = JSON.parse(read('package.json'));
  const coreJs = exists('src/shutters-core.js') ? read('src/shutters-core.js') : '';
  const coreCss = exists('src/shutters-core.css') ? read('src/shutters-core.css') : '';
  const themeCss = exists('src/shutters-theme.css') ? read('src/shutters-theme.css') : '';
  const siteHtmlPath = path.join(ROOT, '../shutters-site/index.html');
  const siteHtml = fs.existsSync(siteHtmlPath) ? fs.readFileSync(siteHtmlPath, 'utf8') : '';

  const versions = {
    'package.json': readVersionFrom('package.json'),
    VERSION: readVersionFrom('VERSION'),
    'shutters-site/index.html (JSON-LD)': (siteHtml.match(/"version":\s*"([^"]+)"/) || [])[1] ?? null,
  };

  const versionBadge = (siteHtml.match(/class="version-badge"[^>]*>v([\d.]+)/) || [])[1] ?? null;
  versions['shutters-site/index.html (badge)'] = versionBadge;

  const drift = Object.values(versions).filter(Boolean);
  const versionDrift = new Set(drift).size > 1;

  const pageZones = [...siteHtml.matchAll(/id="(overview|demos|comparisons|documentation)"/g)].map(m => m[1]);

  const bundleBudgets = exists('scripts/check-size.mjs')
    ? [...read('scripts/check-size.mjs').matchAll(/'([^']+\.(?:js|css))':\s*(\d+)/g)].map(([, f, b]) => `${f}: ${b} B`)
    : [];

  const publicMethods = extractPublicMethods(coreJs);
  const customProps = extractCustomProperties(coreCss + themeCss);
  const htmlClasses = extractHtmlClasses(siteHtml);

  const workflows = listFiles('.github/workflows', '.yml');
  const srcFiles = listFiles('src');
  const scripts = listFiles('scripts');

  const npmScripts = Object.keys(pkg.scripts || {}).sort();

  const lines = [
    '# Agent Inventory',
    '',
    '> **Do not edit manually.** Run `npm run agent:sync` after structural changes.',
    '',
    `**Generated:** ${new Date().toISOString().split('T')[0]}`,
    '',
    '## Stack Versions',
    '',
    '| Package | Version |',
    '|---|---|',
    `| Node (engines) | ${pkg.engines?.node ?? '—'} |`,
    `| ${pkg.name} | ${pkg.version} |`,
    ...Object.entries(pkg.devDependencies || {}).map(([k, v]) => `| ${k} (dev) | ${v} |`),
    '',
    '## Version Drift Report',
    '',
    versionDrift ? '⚠️ **Versions are inconsistent** — sync before release.' : '✅ All tracked version sources match.',
    '',
    '| Source | Version |',
    '|---|---|',
    ...Object.entries(versions).map(([k, v]) => `| ${k} | ${v ?? '—'} |`),
    '',
    '## Project Type',
    '',
    '**Vanilla JavaScript** component library — plain `.js` source, zero runtime npm deps, ES module + UMD.',
    'No application routes, API server, or database. Dev-only: Vite, Vitest, jsdom.',
    '',
    'Policy enforced by: `npm run verify:vanilla`',
    '',
    '## Demo Page Zones',
    '',
    ...(pageZones.length ? pageZones.map(z => `- \`#${z}\``) : ['- (none detected)']),
    '',
    '## Gzip Budgets (`npm run size`)',
    '',
    ...(bundleBudgets.length ? bundleBudgets.map(b => `- ${b}`) : ['- Run `npm run build && npm run size`']),
    '',
    '## Auto ARIA (applied at init)',
    '',
    '- `role="button"`, `tabindex="0"`, `aria-expanded` on `.shutters-header`',
    '- `aria-controls` → `.shutters-content` id (auto `sp-{n}` if missing)',
    '',
    '## Library Source Files',
    '',
    ...srcFiles.map(f => `- \`${f}\``),
    '',
    '## Marketing Site',
    '',
    'Demo and docs: **https://shuttersjs.com/** — sibling **shutters-site** repo (`../shutters-site`).',
    'npm `homepage`: https://shuttersjs.com/',
    '',
    '## Build Outputs (expected after `npm run build`)',
    '',
    '- `dist/shutters.es.js` — ES module',
    '- `dist/shutters.umd.js` — UMD global `ShuttersAccordion`',
    '- `dist/core.css` — default polished CSS',
    '- `dist/theme.css` — optional decorative theme',
    '- `dist/shutters.auto.es.js` — opt-in auto-init',
    '',
    '## npm Exports',
    '',
    ...Object.entries(pkg.exports || {}).flatMap(([k, v]) => {
      if (typeof v === 'string') return [`- \`${k}\` → \`${v}\``];
      return [`- \`${k}\` → import: \`${v.import}\`, require: \`${v.require}\``];
    }),
    '',
    '## Public API (`ShuttersAccordion`)',
    '',
    '### Constructor options',
    '',
    '| Option | Default |',
    '|---|---|',
    '| `container` | `.shutters-accordion` |',
    '| `animationDuration` | `300` |',
    '| `animationEasing` | `ease-in-out` |',
    '| `defaultOpen` | `none` |',
    '',
    '### Methods',
    '',
    ...publicMethods.map(m => `- \`${m}()\``),
    '',
    '### Custom events',
    '',
    '- `shutters:open` — `detail: { header, item }`',
    '- `shutters:close` — `detail: { header, item }`',
    '',
    '## HTML Class Contract',
    '',
    ...htmlClasses.map(c => `- \`.${c}\``),
    '',
    '## CSS Custom Properties',
    '',
    ...customProps.map(p => `- \`${p}\``),
    '',
    '## npm Scripts',
    '',
    ...npmScripts.map(s => `- \`${s}\``),
    '',
    '## Scripts',
    '',
    ...scripts.map(s => `- \`${s}\``),
    '',
    '## Vanilla JS Policy',
    '',
    '- Plain `.js` library source — no TypeScript, no framework runtime deps',
    '- `npm run verify:vanilla` fails if runtime dependencies or forbidden source files appear',
    '',
    '## CI Workflows',
    '',
    ...workflows.map(w => `- \`${w}\``),
    '',
    '## Totals',
    '',
    `| Category | Count |`,
    `|---|---|`,
    `| Source files | ${srcFiles.length} |`,
    `| Public methods | ${publicMethods.length} |`,
    `| CSS custom properties | ${customProps.length} |`,
    `| HTML classes | ${htmlClasses.length} |`,
    `| npm scripts | ${npmScripts.length} |`,
    `| CI workflows | ${workflows.length} |`,
    '',
  ];

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, lines.join('\n'));
  console.log(`✓ Generated ${path.relative(ROOT, OUT)}`);
}

main();
