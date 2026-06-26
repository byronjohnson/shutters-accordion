# Shutters Accordion — Product Roadmap

> Track implementation progress toward making Shutters the best lightweight accordion on the web.  
> **Last updated:** 2026-06-26  
> **Policy:** This project remains **vanilla JavaScript** forever — see [AGENTS.md](./AGENTS.md#vanilla-javascript--permanent-policy).

---

## Progress Summary

| Phase | Focus | Status |
|---|---|---|
| **Pre-roadmap** | Agent context system, gitignore, vanilla JS policy | ✅ Complete |
| **Phase 1** | Foundation — size, motion, CSS split, docs, types | 🟡 In progress (~60%) |
| **Phase 2** | Integration — auto-init polish, framework docs, demo UX | 🟡 Started (~30%) |
| **Phase 3** | Excellence — motion lab, API polish, a11y audit | ⬜ Not started |
| **Phase 4** | Positioning — benchmarks, community, content | ⬜ Not started |

**Target release for in-flight work:** `1.2.0` (changelog drafted; version bump pending)

---

## Vision

Shutters wins on four pillars:

1. **Extremely lightweight** — smallest practical JS + CSS footprint
2. **Fluid motion** — CSS Grid animation that feels premium, respects `prefers-reduced-motion`
3. **Fast integration** — working accordion in under 60 seconds on any stack
4. **Clear documentation** — concise README, deep docs linked, demo as proof

**Non-negotiable:** Zero runtime dependencies, plain `.js` source, DOM-based API. No TypeScript source, no framework packages in this repo.

---

## Locked-in Decisions

These decisions are final unless explicitly revisited by the project owner.

| Topic | Decision |
|---|---|
| **Auto-init** | Opt-in only — `import 'shutters-accordion/auto'` + `[data-shutters]` |
| **Default CSS** | Theme-less `core.css`, but visually polished (focus, dividers, typography) |
| **Optional theme** | `theme.css` imported separately for decorative styling |
| **Grid transitions** | Use `transition-behavior: allow-discrete` where supported |
| **Testing** | Vitest unit tests (jsdom); no Playwright unless added later |
| **Language** | Vanilla JavaScript only — enforced by `npm run verify:vanilla` |

---

## North Star Metrics

Update these on each release. Current values from last `npm run build` (2026-06-26).

| Metric | Current | Target | Status |
|---|---|---|---|
| JS gzip (ES module) | 2.10 KB | ≤ 1.8 KB (or ≤ 2 KB with new features) | 🟡 |
| JS gzip (UMD) | 1.58 KB | ≤ 1.8 KB | ✅ |
| Core CSS gzip | 0.77 KB | ≤ 0.5 KB | 🟡 |
| Theme CSS gzip | (separate) | Optional import | ✅ |
| Time to first accordion | ~5 min (old README) | < 60 seconds | 🟡 |
| README length | ~400 lines | < 120 lines + linked docs | 🟡 |
| Unit test coverage | 12 tests, core paths | Critical paths + keyboard | 🟡 |
| `prefers-reduced-motion` | Implemented | Supported | ✅ |
| Lighthouse a11y (demo) | Not measured | 100 | ⬜ |
| Version drift | package.json vs VERSION | All sources synced | ⬜ |

---

## Competitive Position

Own this positioning in docs and demo — do not compete on feature count.

| Dimension | Shutters advantage |
|---|---|
| Size | 10–50× smaller than jQuery UI / most UI libraries |
| Motion | CSS Grid `0fr → 1fr`, not max-height hacks |
| Accessibility | Full WAI-ARIA accordion pattern |
| Lock-in | Works everywhere; no framework runtime |
| Theming | CSS custom properties; optional theme layer |

---

## What We Will Not Build

- [ ] TypeScript source or TS compile step for library code
- [ ] React / Vue / Svelte wrapper packages in this repo
- [ ] Web Components / shadow DOM as the primary API
- [ ] Runtime npm dependencies
- [ ] JS-measured height animations
- [ ] Tabs, nested menu systems, or scope creep beyond accordions

---

## Pre-Roadmap — Completed

Infrastructure and policy work before the phased plan.

- [x] Layered agent context system (`AGENTS.md`, `.cursor/rules/`, skills, inventory)
- [x] `docs/PROJECT_BRAIN.md` and operator guide (local `docs/`)
- [x] Gitignore / npmignore hardening for public repo
- [x] `.cursor/rules/vanilla-js-only.mdc` — permanent vanilla JS policy
- [x] `scripts/verify-vanilla.mjs` — runs before `npm test`
- [x] Strategy and open decisions documented in chat / this file

---

## Phase 1 — Foundation

**Goal:** Polish core experience, split CSS properly, establish quality gates.  
**Target release:** `1.2.0`

### Version & hygiene

- [ ] Sync version across `package.json`, `VERSION`, README CDN pins, demo JSON-LD
- [ ] Fix or simplify `scripts/sync-version.js` (remove stale runtime VERSION targets)
- [ ] Publish `1.2.0` to npm

### Size & build

- [x] Split npm CSS exports (`core.css` + optional `theme.css`)
- [x] Default export is theme-less core only (`./css`, `./style.css` → core)
- [ ] Add `npm run size` script (size-limit or bundlesize)
- [ ] CI gate — fail PRs that exceed gzip budget
- [ ] JS size audit — cache header NodeLists, verify full minification
- [ ] Review theme typography rules — keep heavy styles out of default path

### Motion & CSS

- [x] `transition-behavior: allow-discrete` on grid transitions
- [x] Separate open/close easing custom properties
- [x] `prefers-reduced-motion` support
- [x] Opacity fade on `.shutters-body` (staggered open feel)
- [ ] Visual QA on demo — core-only vs core+theme side-by-side
- [ ] Document motion tokens in README or `docs/CUSTOMIZATION.md`

### Integration basics

- [x] `npm run sync:demo` — copy `src/` library files to `demo/`
- [x] `prebuild:demo` hooks sync automatically

### Documentation

- [x] README quick start updated (60-second path, core vs theme, auto-init)
- [ ] Trim README to ~120 lines — move comparison table & long FAQ to linked docs
- [ ] Create `docs/QUICKSTART.md` — HTML / npm / CDN / React copy-paste paths
- [ ] Create `docs/API.md` — full method & event reference
- [ ] Create `docs/CUSTOMIZATION.md` — CSS custom properties, dark mode

### Types & tests

- [x] Vitest + jsdom setup
- [x] Unit tests — constructor, open/close/toggle, auto-close, events, destroy, auto-init
- [ ] Keyboard navigation tests (Arrow, Home, End)
- [ ] Ship hand-written `dist/shutters.d.ts` (optional TS consumers, no TS source)

---

## Phase 2 — Integration

**Goal:** Fastest possible adoption on any stack.  
**Target release:** `1.3.0`

### Auto-init (opt-in)

- [x] `shutters-accordion/auto` entry — scans `[data-shutters]` on DOMContentLoaded
- [x] `initAll()`, `destroyAuto()`, `destroyAllAuto()` helpers
- [x] Data attributes: `data-shutters-duration`, `data-shutters-easing`, `data-shutters-default-open`
- [ ] Document auto-init in demo with live copy button
- [ ] Auto-init tests for duration/easing attribute parsing

### Framework integration (docs only — no packages)

- [ ] React mount/unmount snippet in docs
- [ ] Vue `onMounted` snippet
- [ ] Svelte `onMount` snippet
- [ ] Astro `<script>` snippet
- [ ] Demo tabs: Vanilla | Auto | React | CDN

### CDN & npm DX

- [ ] CDN snippets with correct version pins
- [ ] Subresource Integrity (SRI) hashes for unpkg/jsDelivr
- [ ] `npm pack --dry-run` checklist in release skill

### Demo UX

- [ ] Copy buttons on code blocks in `demo/index.html`
- [ ] Side-by-side: core-only accordion vs themed accordion
- [ ] Update demo JSON-LD / SEO copy for new CSS export names

---

## Phase 3 — Excellence

**Goal:** Best-in-class motion and accessibility proof.  
**Target release:** `1.4.0`

### Motion showcase

- [ ] Demo “Motion lab” — Shutters vs max-height vs native `<details>`
- [ ] Fine-tune open/close duration defaults from visual review
- [ ] Verify `allow-discrete` fallback behavior in Safari

### API enhancements

- [ ] `isOpen(index)` method
- [ ] Optional `aria-controls` + `id` pairing on headers/panels
- [ ] Evaluate `transitionend` event or callback option (only if zero size cost)

### Accessibility audit

- [ ] Run Lighthouse on demo — target 100 accessibility
- [ ] Manual screen reader smoke test (VoiceOver/NVDA)
- [ ] Document a11y guarantees in `docs/ACCESSIBILITY.md`

### Quality & badges

- [ ] Live bundle size badge in README (from CI)
- [ ] Expand test suite for edge cases (empty container, nested accordions)
- [ ] `docs/MIGRATION.md` for 1.x upgrade paths

---

## Phase 4 — Positioning

**Goal:** Become the default recommendation for lightweight accordions.

### Content & community

- [ ] “Building a 2KB accordion” technical blog post
- [ ] Submit to relevant awesome-lists (awesome-vanilla-js, etc.)
- [ ] Benchmark page on demo (load time, gzip, interaction latency)
- [ ] GitHub release notes template with before/after metrics

### Optional future (evaluate need)

- [ ] `shutters-accordion/min` export if feature growth exceeds 2 KB budget
- [ ] Playwright e2e for demo smoke tests (only if unit tests insufficient)
- [ ] GitHub Action to run `verify:vanilla`, test, size gate on every PR

---

## Release Checklist (every phase)

Use for each milestone release.

- [ ] All phase checkboxes for target version complete or explicitly deferred
- [ ] `npm run verify:vanilla` passes
- [ ] `npm test` passes
- [ ] `npm run build` && `npm run build:demo` pass
- [ ] `npm run sync:demo` — demo copies match `src/`
- [ ] `CHANGELOG.md` updated
- [ ] Version synced everywhere (`npm run agent:sync` — no drift)
- [ ] README CDN pins updated
- [ ] Live demo verified on GitHub Pages

---

## Related Files

| File | Purpose |
|---|---|
| [AGENTS.md](./AGENTS.md) | Agent entry point + vanilla JS policy |
| [CHANGELOG.md](./CHANGELOG.md) | Shipped release history |
| [README.md](./README.md) | Public documentation |
| [docs/PROJECT_BRAIN.md](./docs/PROJECT_BRAIN.md) | Architecture deep reference (local) |
| [.cursor/skills/release-package/SKILL.md](./.cursor/skills/release-package/SKILL.md) | Release workflow |

---

## How to Update This File

1. Check off items as they ship (use `[x]`).
2. Update **Progress Summary** and **North Star Metrics** tables.
3. Bump **Last updated** date.
4. Move deferred items to a new phase or “Optional future” with a note.
5. Run `npm run agent:sync` after structural changes.

---

*This roadmap supersedes informal strategy notes. Implementation order may shift within a phase, but vanilla JS and zero runtime deps are fixed constraints.*
