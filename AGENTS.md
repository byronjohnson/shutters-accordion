# Shutters Accordion — Agent Entry Point

**Read this file first.** It routes you to the right context layer for the task at hand.

## What This Project Is

Shutters Accordion is a **zero-dependency, framework-agnostic JavaScript accordion library** published as `shutters-accordion` on npm (**latest: 1.3.0**). It uses CSS Grid `grid-template-rows` transitions for smooth expand/collapse, WAI-ARIA accordion patterns, and event delegation. Bundle target: **~2.3 KB gzip (ES)** / **~1.6 KB (UMD)**. This repo is **library source only** — demo, docs, and SEO live at [shuttersjs.com](https://shuttersjs.com/) in the sibling **shutters-site** repo.

| Fact | Value |
|---|---|
| **Owner** | Byron Johnson |
| **License** | MIT |
| **npm** | `shutters-accordion` |
| **Version** | See `package.json` (run `npm run agent:sync` for drift report) |
| **Demo & docs** | https://shuttersjs.com/ |
| **About / FAQ** | https://shuttersjs.com/about/ |
| **Active branch** | `develop` |
| **Legacy Pages URL** | https://byronjohnson.github.io/shutters-accordion/demo/ → redirects to shuttersjs.com |
| **Runtime deps** | **None** — vanilla JS + CSS only (Vite/Vitest dev-only) |
| **Language** | **Vanilla JavaScript** — no TypeScript source, no framework runtime |

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
shutters/                         ← this repo (library only)
├── AGENTS.md                     ← you are here
├── index.js                      ← Vite library entry (imports CSS, exports class)
├── src/
│   ├── shutters-core.js          ← ShuttersAccordion class (source of truth)
│   ├── shutters-auto.js          ← opt-in auto-init (initAll, data-shutters)
│   ├── shutters-core.css         ← mechanics only (grid animation, no visuals)
│   ├── shutters-theme.css        ← default theme (colors, padding, focus ring)
│   └── shutters.d.ts             ← TypeScript declarations (copied to dist/)
├── scripts/
│   ├── generate-agent-context.mjs
│   ├── check-size.mjs            ← gzip budget gate (`npm run size`)
│   └── sync-version.js           ← VERSION → package.json, README, shutters-site, docs/
├── .cursor/
│   ├── rules/                    ← always-on + scoped agent rules
│   ├── skills/                   ← workflow checklists
│   └── generated/inventory.md    ← auto-generated; do not edit
├── vite.config.js                ← library build → dist/
├── .github/workflows/
│   ├── deploy-demo.yml           ← legacy GitHub Pages → shuttersjs.com redirect
│   └── publish.yml               ← GitHub Packages on release
├── docs/PROJECT_BRAIN.md         ← deep reference
├── CHANGELOG.md                  ← public release notes
├── ROADMAP.md                    ← product roadmap & progress tracking
└── README.md                     ← user-facing docs

shutters-site/                    ← sibling repo (not in this workspace path)
├── index.html                    ← https://shuttersjs.com/
├── about/index.html              ← https://shuttersjs.com/about/
└── …                             ← Vercel deploy, SEO, marketing demos
```

**No routing model in the library.** Demo/docs routing lives on shuttersjs.com.

---

## Vanilla JavaScript — Permanent Policy

Shutters **is and will remain** a vanilla JavaScript library. The phased roadmap must not change this.

| In scope | Out of scope |
|---|---|
| Plain `.js` in `src/`, ES module + UMD builds | TypeScript source or TS compile step for library code |
| Zero `dependencies` in `package.json` | Any runtime npm package |
| DOM APIs (`classList`, `CustomEvent`, etc.) | React/Vue/Svelte components or wrappers in this repo |
| CSS for animation and styling | Web Components / shadow DOM as primary API |
| Optional hand-written `.d.ts` for consumers | Framework-specific export paths (`/react`, `/vue`) |
| Dev-only: Vite, Vitest, jsdom | Shipping dev tools in `dist/` |

Enforced by `npm run verify:vanilla` (runs before tests).

---

## Non-Negotiables

- **Vanilla JS only** — see policy above; run `npm run verify:vanilla` after structural changes
- **Zero runtime dependencies** — vanilla JS + CSS only
- **Never bundle CSS into JS** — consumers import CSS separately (`index.js` imports for Vite build only)
- **Separate core from theme** — `core.css` = default polished presentation; `theme.css` = optional decorative layer
- **Event delegation** — one `click` + one `keydown` per container, not per header
- **CSS Grid animation** — `grid-template-rows: 0fr → 1fr`; never `max-height` or JS height measurement
- **Auto ARIA** — JS sets `role`, `tabindex`, `aria-expanded`, `aria-controls` (+ panel `id` if missing); don't require them in HTML
- **No `window.ShuttersAccordion` in ES builds** — UMD only
- **Accessibility** — visible `:focus-visible`; keyboard: Enter, Space, Arrows, Home, End
- **Minimal diff** — resist feature creep; keep bundle tiny
- **Marketing site** — demo/docs/SEO changes go in **shutters-site** → https://shuttersjs.com/

---

## Common Commands

| Command | Purpose |
|---|---|
| `npm run build` | Build library → `dist/` (ES + UMD + core.css + theme.css) |
| `npm run preview` | Preview library build |
| `npm run agent:sync` | Regenerate `.cursor/generated/inventory.md` |
| `npm run size` | Gzip budget check (`scripts/check-size.mjs`) |
| `npm run version:sync` | Sync `VERSION` → package.json, README, shutters-site, local docs |
| `npm test` | `verify:vanilla` + Vitest |

**shutters-site** (sibling repo): `npm run dev`, `npm run build`, `npm run sri` — see that repo's `AGENTS.md`.

---

## Maintaining This System

| Change type | Update |
|---|---|
| New source file or export | `npm run agent:sync` |
| New public API method | `add-api-method` skill + README + CHANGELOG |
| CSS layer change | `change-css-layers` skill + update shutters-site if visuals changed |
| Demo/marketing change | **shutters-site** repo — `add-site-section` skill |
| Release | `release-package` skill |
| Convention change | Relevant `.cursor/rules/*.mdc` |
| Architecture/strategy shift | `docs/PROJECT_BRAIN.md` or `ROADMAP.md` |
| System itself changes | `docs/AGENT_CONTEXT_GUIDE.md` |

---

## Prompting Tips

| Task size | What to `@`-mention |
|---|---|
| **Small fix** (bug, typo, one method) | `@src/shutters-core.js` + relevant scoped rule |
| **CSS change** | `@src/shutters-core.css` or `@src/shutters-theme.css` + `@styling` rule |
| **New API feature** | `@.cursor/skills/add-api-method/SKILL.md` + `@src/shutters-core.js` |
| **Demo/docs update** | shutters-site `@index.html` + `@.cursor/skills/add-site-section/SKILL.md` |
| **Release** | `@.cursor/skills/release-package/SKILL.md` + `@CHANGELOG.md` |
| **Returning after time away** | `@AGENTS.md` + `@.cursor/generated/inventory.md` + run `npm run agent:sync` |
| **Architecture deep dive** | `@docs/PROJECT_BRAIN.md` |

---

## Skills Index

| Skill | Triggers |
|---|---|
| `add-api-method` | New public method, event, or constructor option |
| `change-css-layers` | Core vs theme CSS, animation, custom properties |
| `release-package` | Version bump, npm publish, GitHub release |

---

## External Services

| Service | Usage |
|---|---|
| **npm** | Primary registry (`registry.npmjs.org`) — `homepage` → https://shuttersjs.com/ |
| **GitHub Packages** | Optional (`@byronjohnson/shutters-accordion`) — see `docs/GITHUB_PACKAGES.md` |
| **shuttersjs.com** | Demo & documentation (shutters-site on Vercel) |
| **GitHub Pages** | Legacy URL redirect only (`deploy-demo.yml` → shuttersjs.com) |
| **unpkg CDN** | Documented in README and shuttersjs.com |

No auth, analytics, forms, or database in this repo.

---

## What NOT To Build

- **TypeScript source or framework migrations** — vanilla JS is permanent
- **Framework wrappers** (React/Vue/Svelte packages) — document integration snippets only
- **Web Component primary API** — plain class + DOM remains the interface
- Runtime version constants — removed in Feb 2026 overhaul; version lives in `package.json`
- New build tools beyond Vite (for dev/bundling only)
- Bundling CSS into JS output
- Per-header event listeners
- Decorative styling-only concerns in core CSS (use theme.css)

For full architecture, history, and API reference → [docs/PROJECT_BRAIN.md](docs/PROJECT_BRAIN.md)
