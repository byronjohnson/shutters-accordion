# Shutters Accordion — Agent Entry Point

**Read this file first.** It routes you to the right context layer for the task at hand.

## What This Project Is

Shutters Accordion is a **zero-dependency, framework-agnostic JavaScript accordion library** published as `shutters-accordion` on npm. It uses CSS Grid `grid-template-rows` transitions for smooth expand/collapse, WAI-ARIA accordion patterns, and event delegation. Bundle target: **< 2 KB gzip**. There is no app server, no database, and no framework runtime — only `src/` library code, a static `demo/` marketing site, and Vite build tooling.

| Fact | Value |
|---|---|
| **Owner** | Byron Johnson |
| **License** | MIT |
| **npm** | `shutters-accordion` |
| **Version** | See `package.json` (run `npm run agent:sync` for drift report) |
| **Live demo** | https://byronjohnson.github.io/shutters-accordion/demo |
| **Active branch** | `develop` |
| **Deploy branch** | `main` / `master` → GitHub Pages |
| **Runtime deps** | None (Vite 6 dev-only) |

---

## Context Layers

| Layer | Location | When It Loads | Purpose |
|---|---|---|---|
| **Entry point** | `AGENTS.md` (this file) | Every session | Router + file map + commands |
| **Always-on rules** | `.cursor/rules/project-core.mdc` | Every session | Hard constraints that must never regress |
| **Scoped rules** | `.cursor/rules/*.mdc` | When matching files are open | JS, CSS, demo conventions |
| **Live inventory** | `.cursor/generated/inventory.md` | On demand (`@inventory`) | Auto-generated file/deps/API map |
| **Workflow skills** | `.cursor/skills/*/SKILL.md` | When task matches skill description | Checklist playbooks |
| **Deep reference** | `docs/PROJECT_BRAIN.md` | Architecture/history questions | Encyclopedia — not primary injection |
| **Operator manual** | `docs/AGENT_CONTEXT_GUIDE.md` | Human maintainer only | What to update when |

**Do not** load `PROJECT_BRAIN.md` for small edits. Use scoped rules + inventory instead.

---

## Key File Map

```
shutters/
├── AGENTS.md                     ← you are here
├── index.js                      ← Vite library entry (imports CSS, exports class)
├── src/
│   ├── shutters-core.js          ← ShuttersAccordion class (source of truth)
│   ├── shutters-core.css         ← mechanics only (grid animation, no visuals)
│   └── shutters-theme.css        ← default theme (colors, padding, focus ring)
├── demo/
│   ├── index.html                ← marketing demo + SEO/JSON-LD
│   ├── shutters-core.js          ← must match src/ (manual sync)
│   ├── shutters-core.css         ← must match src/
│   ├── shutters-theme.css        ← must match src/
│   └── shutters-demo.css         ← demo layout only
├── scripts/
│   ├── generate-agent-context.mjs
│   └── sync-version.js           ← partially stale; see PROJECT_BRAIN
├── .cursor/
│   ├── rules/                    ← always-on + scoped agent rules
│   ├── skills/                   ← workflow checklists
│   └── generated/inventory.md    ← auto-generated; do not edit
├── vite.config.js                ← library build → dist/
├── vite.config.demo.js           ← demo build → dist-demo/
├── .github/workflows/
│   ├── deploy-demo.yml           ← Pages on push to main/master
│   └── publish.yml               ← GitHub Packages on release
├── docs/PROJECT_BRAIN.md         ← deep reference
├── CHANGELOG.md                  ← public release notes
└── README.md                     ← user-facing docs
```

**No routing model.** This is a library + static demo — there are no app routes, API endpoints, or database models.

---

## Non-Negotiables

- **Zero runtime dependencies** — vanilla JS + CSS only
- **Never bundle CSS into JS** — consumers import CSS separately (`index.js` imports for Vite build only)
- **Core vs theme CSS split** — mechanics in `shutters-core.css`, visuals in `shutters-theme.css`
- **Event delegation** — one `click` + one `keydown` per container, not per header
- **CSS Grid animation** — `grid-template-rows: 0fr → 1fr`; never `max-height` or JS height measurement
- **Auto ARIA** — JS sets `role`, `tabindex`, `aria-expanded`; don't require them in HTML
- **No `window.ShuttersAccordion` in ES builds** — UMD only
- **Accessibility** — visible `:focus-visible`; keyboard: Enter, Space, Arrows, Home, End
- **Minimal diff** — resist feature creep; keep bundle tiny
- **Sync demo copies** — after changing `src/shutters-core.*`, copy to `demo/`

---

## Common Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server → opens `/demo/index.html` (port 3000) |
| `npm run dev:demo` | Demo-only dev server |
| `npm run build` | Build library → `dist/` (ES + UMD + style.css) |
| `npm run build:demo` | Build demo → `dist-demo/` for GitHub Pages |
| `npm run build:all` | Both builds |
| `npm run preview` | Preview library build |
| `npm run preview:demo` | Preview built demo |
| `npm run agent:sync` | Regenerate `.cursor/generated/inventory.md` |
| `npm run version:sync` | Sync VERSION file → package.json (script partially stale) |
| `npm test` | **Not implemented** — exits with error |

---

## Maintaining This System

| Change type | Update |
|---|---|
| New source file or export | `npm run agent:sync` |
| New public API method | `add-api-method` skill + README + CHANGELOG |
| CSS layer change | `change-css-layers` skill + sync demo copies |
| Demo/marketing change | `add-demo-section` skill |
| Release | `release-package` skill |
| Convention change | Relevant `.cursor/rules/*.mdc` |
| Architecture/strategy shift | `docs/PROJECT_BRAIN.md` |
| System itself changes | `docs/AGENT_CONTEXT_GUIDE.md` |

---

## Prompting Tips

| Task size | What to `@`-mention |
|---|---|
| **Small fix** (bug, typo, one method) | `@src/shutters-core.js` + relevant scoped rule |
| **CSS change** | `@src/shutters-core.css` or `@src/shutters-theme.css` + `@styling` rule |
| **New API feature** | `@.cursor/skills/add-api-method/SKILL.md` + `@src/shutters-core.js` |
| **Demo update** | `@demo/index.html` + `@.cursor/skills/add-demo-section/SKILL.md` |
| **Release** | `@.cursor/skills/release-package/SKILL.md` + `@CHANGELOG.md` |
| **Returning after time away** | `@AGENTS.md` + `@.cursor/generated/inventory.md` + run `npm run agent:sync` |
| **Architecture deep dive** | `@docs/PROJECT_BRAIN.md` |

---

## Skills Index

| Skill | Triggers |
|---|---|
| `add-api-method` | New public method, event, or constructor option |
| `change-css-layers` | Core vs theme CSS, animation, custom properties |
| `sync-demo-from-src` | After any `src/` library file change |
| `add-demo-section` | New demo section, usage example, SEO block |
| `release-package` | Version bump, npm publish, GitHub release |

---

## External Services

| Service | Usage |
|---|---|
| **npm** | Primary registry (`registry.npmjs.org`) |
| **GitHub Packages** | Optional (`@byronjohnson/shutters-accordion`) — see `docs/GITHUB_PACKAGES.md` |
| **GitHub Pages** | Demo hosting via `deploy-demo.yml` |
| **unpkg CDN** | Documented in README for consumers |

No auth, analytics, forms, or database in this repo.

---

## What NOT To Build

- Framework wrappers (React/Vue components) — out of scope unless explicitly requested
- Runtime version constants — removed in Feb 2026 overhaul; version lives in `package.json`
- Tests without explicit request — none exist yet
- New build tools beyond Vite
- Bundling CSS into JS output
- Per-header event listeners
- Visual styling in core CSS

For full architecture, history, and API reference → [docs/PROJECT_BRAIN.md](docs/PROJECT_BRAIN.md)
