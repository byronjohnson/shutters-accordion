# Agent Inventory

> **Do not edit manually.** Run `npm run agent:sync` after structural changes.

**Generated:** 2026-06-27

## Stack Versions

| Package | Version |
|---|---|
| Node (engines) | >=14.0.0 |
| shutters-accordion | 1.3.0 |
| jsdom (dev) | ^26.1.0 |
| vite (dev) | ^6.3.5 |
| vitest (dev) | ^3.2.4 |

## Version Drift Report

✅ All tracked version sources match.

| Source | Version |
|---|---|
| package.json | 1.3.0 |
| VERSION | 1.3.0 |
| demo/index.html (JSON-LD) | 1.3.0 |
| demo/index.html (badge) | 1.3.0 |

## Project Type

**Vanilla JavaScript** component library — plain `.js` source, zero runtime npm deps, ES module + UMD.
No application routes, API server, or database. Dev-only: Vite, Vitest, jsdom.

Policy enforced by: `npm run verify:vanilla`

## Demo Page Zones

- `#overview`
- `#demos`
- `#comparisons`
- `#documentation`

## Gzip Budgets (`npm run size`)

- shutters.es.js: 2320 B
- shutters.umd.js: 2200 B
- core.css: 900 B
- theme.css: 1200 B

## Auto ARIA (applied at init)

- `role="button"`, `tabindex="0"`, `aria-expanded` on `.shutters-header`
- `aria-controls` → `.shutters-content` id (auto `sp-{n}` if missing)

## Library Source Files

- `src/shutters-auto.js`
- `src/shutters-core.css`
- `src/shutters-core.js`
- `src/shutters-demo.css`
- `src/shutters-theme.css`
- `src/shutters.d.ts`

## Demo Files

- `demo/cdn-integrity.json`
- `demo/index.html`
- `demo/shutters-auto.js`
- `demo/shutters-core.css`
- `demo/shutters-core.js`
- `demo/shutters-demo-ui.js`
- `demo/shutters-demo.css`
- `demo/shutters-theme.css`

## Build Outputs (expected after `npm run build`)

- `dist/shutters.es.js` — ES module
- `dist/shutters.umd.js` — UMD global `ShuttersAccordion`
- `dist/core.css` — default polished CSS
- `dist/theme.css` — optional decorative theme
- `dist/shutters.auto.es.js` — opt-in auto-init

## Demo Build Output (after `npm run build:demo`)

- `dist-demo/` — static site for GitHub Pages

## npm Exports

- `.` → import: `./dist/shutters.es.js`, require: `./dist/shutters.umd.js`
- `./auto` → import: `./dist/shutters.auto.es.js`, require: `./dist/shutters.auto.umd.js`
- `./core.css` → `./dist/core.css`
- `./theme.css` → `./dist/theme.css`
- `./css` → `./dist/core.css`
- `./style.css` → `./dist/core.css`

## Public API (`ShuttersAccordion`)

### Constructor options

| Option | Default |
|---|---|
| `container` | `.shutters-accordion` |
| `animationDuration` | `300` |
| `animationEasing` | `ease-in-out` |
| `defaultOpen` | `none` |

### Methods

- `open()`
- `close()`
- `toggle()`
- `isOpen()`
- `openAll()`
- `closeAll()`
- `on()`
- `off()`
- `destroy()`

### Custom events

- `shutters:open` — `detail: { header, item }`
- `shutters:close` — `detail: { header, item }`

## HTML Class Contract

- `.shutters-accordion`
- `.shutters-autoclose`
- `.shutters-body`
- `.shutters-content`
- `.shutters-header`
- `.shutters-icon`
- `.shutters-item`
- `.shutters-title`

## CSS Custom Properties

- `--shutters-animation-duration`
- `--shutters-animation-easing`
- `--shutters-animation-easing-close`
- `--shutters-bg-color`
- `--shutters-border-color`
- `--shutters-divider-color`
- `--shutters-focus-color`
- `--shutters-hover-bg`
- `--shutters-padding-x`
- `--shutters-padding-y`
- `--shutters-text-color`

## npm Scripts

- `agent:sync`
- `build`
- `build:all`
- `build:analyze`
- `build:demo`
- `clean`
- `dev`
- `dev:demo`
- `prebuild:demo`
- `prepublishOnly`
- `preversion`
- `preview`
- `preview:demo`
- `size`
- `sri`
- `sync:demo`
- `test`
- `test:watch`
- `verify:vanilla`
- `version:sync`

## Scripts

- `scripts/build-theme-css.mjs`
- `scripts/check-size.mjs`
- `scripts/generate-agent-context.mjs`
- `scripts/generate-sri.mjs`
- `scripts/sync-version.js`
- `scripts/verify-vanilla.mjs`

## Vanilla JS Policy

- Plain `.js` library source — no TypeScript, no framework runtime deps
- `npm run verify:vanilla` fails if runtime dependencies or forbidden source files appear

## CI Workflows

- `.github/workflows/deploy-demo.yml`
- `.github/workflows/publish.yml`

## Totals

| Category | Count |
|---|---|
| Source files | 6 |
| Demo files | 8 |
| Public methods | 9 |
| CSS custom properties | 11 |
| HTML classes | 8 |
| npm scripts | 20 |
| CI workflows | 2 |
