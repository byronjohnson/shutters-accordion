# Agent Inventory

> **Do not edit manually.** Run `npm run agent:sync` after structural changes.

**Generated:** 2026-06-26

## Stack Versions

| Package | Version |
|---|---|
| Node (engines) | >=14.0.0 |
| shutters-accordion | 1.1.1 |
| jsdom (dev) | ^26.1.0 |
| vite (dev) | ^6.3.5 |
| vitest (dev) | ^3.2.4 |

## Version Drift Report

⚠️ **Versions are inconsistent** — sync before release.

| Source | Version |
|---|---|
| package.json | 1.1.1 |
| VERSION | 1.1.0 |
| demo/index.html (JSON-LD) | 1.1.0 |

## Project Type

**Vanilla JavaScript** component library — plain `.js` source, zero runtime npm deps, ES module + UMD.
No application routes, API server, or database. Dev-only: Vite, Vitest, jsdom.

Policy enforced by: `npm run verify:vanilla`

## Library Source Files

- `src/shutters-auto.js`
- `src/shutters-core.css`
- `src/shutters-core.js`
- `src/shutters-demo.css`
- `src/shutters-theme.css`

## Demo Files

- `demo/index.html`
- `demo/shutters-core.css`
- `demo/shutters-core.js`
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
- `sync:demo`
- `test`
- `test:watch`
- `verify:vanilla`
- `version:sync`

## Scripts

- `scripts/build-theme-css.mjs`
- `scripts/generate-agent-context.mjs`
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
| Source files | 5 |
| Demo files | 5 |
| Public methods | 8 |
| CSS custom properties | 9 |
| HTML classes | 8 |
| npm scripts | 18 |
| CI workflows | 2 |
