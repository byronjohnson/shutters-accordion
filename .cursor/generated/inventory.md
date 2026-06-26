# Agent Inventory

> **Do not edit manually.** Run `npm run agent:sync` after structural changes.

**Generated:** 2026-06-26

## Stack Versions

| Package | Version |
|---|---|
| Node (engines) | >=14.0.0 |
| shutters-accordion | 1.1.1 |
| vite (dev) | ^6.3.5 |

## Version Drift Report

⚠️ **Versions are inconsistent** — sync before release.

| Source | Version |
|---|---|
| package.json | 1.1.1 |
| VERSION | 1.1.0 |
| demo/index.html (JSON-LD) | 1.1.0 |

## Project Type

Vanilla JS/CSS component library — **no application routes**, no API server, no database.

## Library Source Files

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
- `dist/style.css` — combined core + theme CSS

## Demo Build Output (after `npm run build:demo`)

- `dist-demo/` — static site for GitHub Pages

## npm Exports

- `.` → import: `./dist/shutters.es.js`, require: `./dist/shutters.umd.js`
- `./css` → `./dist/style.css`
- `./style.css` → `./dist/style.css`

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
- `--shutters-bg-color`
- `--shutters-border-color`
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
- `prepublishOnly`
- `preversion`
- `preview`
- `preview:demo`
- `test`
- `version:sync`

## CI Workflows

- `.github/workflows/deploy-demo.yml`
- `.github/workflows/publish.yml`

## Scripts

- `scripts/generate-agent-context.mjs`
- `scripts/sync-version.js`

## Totals

| Category | Count |
|---|---|
| Source files | 4 |
| Demo files | 5 |
| Public methods | 8 |
| CSS custom properties | 7 |
| HTML classes | 8 |
| npm scripts | 14 |
| CI workflows | 2 |
