# Changelog

All notable changes to this project will be documented in this file.

## [1.3.1] - 2026-06-27

Patch release — npm metadata and documentation URLs only. No JavaScript, CSS, or API changes. Safe upgrade from 1.3.0.

### Changed

- **npm `homepage`** → https://shuttersjs.com/
- **npm description and keywords** — SEO-aligned package metadata
- **README** — live demo and docs links point to shuttersjs.com instead of GitHub Pages

### Docs & repo

- Demo and marketing site live in sibling **shutters-site** repo (https://shuttersjs.com/)
- Legacy GitHub Pages demo URL redirects to shuttersjs.com
- Agent context, release docs, and deploy workflow updated for the site split

## [1.3.0] - 2026-06-26

Minor release — new API method, stronger ARIA wiring, and a redesigned demo site. Safe upgrade from 1.2.x. **Published to npm.**

### Added

- **`isOpen(index)`** — returns whether a panel is open by zero-based index.
- **`aria-controls` / panel `id` pairing** — headers link to `.shutters-content` panels at init; existing panel `id`s are preserved; auto-assigned ids use `sp-{n}`.

### Changed

- ES module gzip budget raised to 2320 B (from 2200 B) to accommodate the new API surface.

### Demo

- **Motion Lab** — side-by-side comparison of CSS Grid (Shutters), `max-height` hack, and native `<details>`.
- **Page layout** — four labeled zones (Overview, Demos, Comparisons, Documentation) with section cards and anchor navigation.
- GitHub and npm icon links in the hero; package link styling and icon sizing.
- Skip link focus styles, `theme-color` meta, and contrast fixes for Lighthouse 100 across all categories.

### Docs

- README bundle size badge via [Bundlephobia](https://bundlephobia.com/package/shutters-accordion).
- README and API quick reference updated for `isOpen()`.

## [1.2.1] - 2026-06-26

Patch release — CSS layout fixes only. No JavaScript or API changes. Safe upgrade from 1.2.0 or 1.1.x.

### Fixed

**Panel width alignment**
- Content panels now span the full width of the header bar. Horizontal padding moved from `.shutters-content` to `.shutters-body` so backgrounds align edge-to-edge while text stays aligned with the title.
- Headers no longer overflow their container: the accordion tree uses `box-sizing: border-box`, fixing `width: 100%` plus padding extending past the panel on default `content-box` sizing.

**Vertical spacing**
- Closed panels no longer show a visible gap below the header. Open-only margins are scoped to `.opened` so the grid collapse to `0fr` reaches true zero height when collapsed.
- Open panels no longer stack redundant bottom space from body `padding-bottom` plus duplicate last-child margin rules. The final paragraph keeps `1rem` bottom margin in the theme for balanced spacing within the content area.

**Theme (`theme.css`)**
- Open-state top spacing (`margin-top` on first child) is scoped to `.opened .shutters-body` so it cannot affect collapsed panels.
- Last list and list item keep zero bottom margin when they are the final element; last paragraph retains `1rem` bottom margin for visual balance.

### Changed

**Padding tokens (core + theme)**
- Introduced shared custom properties on `.shutters-accordion`:
  - `--shutters-padding-x` (core default: `0.25rem`; theme override: `clamp(0.5rem, 2vw, 1rem)`)
  - `--shutters-padding-y` (core default: `0.75rem`; theme override: `clamp(0.5rem, 2vw, 1rem)`)
- Header and body both consume these variables for consistent horizontal alignment.

**Release tooling**
- `npm run version:sync` now updates the README version footer, demo version badge, and CDN pins (previously only JSON-LD and unpkg URLs were synced).

### Upgrade notes

- Replace imports of `core.css` and/or `theme.css` — no HTML or JavaScript changes required.
- If you overrode `.shutters-content` padding in custom CSS, move horizontal padding to `.shutters-body` or override `--shutters-padding-x` / `--shutters-padding-y` on `.shutters-accordion` instead.

---

## [1.2.0] - 2026-06-26

### Added
- Opt-in auto-init entry: `import 'shutters-accordion/auto'` with `[data-shutters]` containers
- `initAll()`, `destroyAuto()`, `destroyAllAuto()` helpers in `src/shutters-auto.js`
- Split CSS exports: `core.css` (default, theme-less + polished) and optional `theme.css`
- `transition-behavior: allow-discrete` for smoother grid row transitions
- Separate open/close easing curves via CSS custom properties
- `prefers-reduced-motion` support — instant toggle when requested
- Vitest unit tests for core API and auto-init
- `npm run sync:demo` — keeps demo library files in sync with `src/`

### Changed
- Default npm CSS (`./css`, `./style.css`) now ships **core only** — theme is opt-in
- Core CSS includes clean default presentation (focus ring, dividers, system typography)
- Theme CSS is purely decorative (colors, hover fills, content typography)
- Opacity fade moved to `.shutters-body` for a more fluid open sequence
- Build outputs: `dist/core.css`, `dist/theme.css`, `dist/shutters.auto.es.js`

### Breaking
- `dist/style.css` renamed to `dist/core.css` ( `./style.css` export alias still resolves to core )
- Combined core+theme bundle removed — import `theme.css` separately if needed

---

## [1.1.0] - 2026-02-11

### Added
- Arrow key navigation (Up/Down/Home/End) per WAI-ARIA accordion pattern
- Custom events `shutters:open` and `shutters:close` dispatched on containers with `{ detail: { header, item } }`
- `openAll()` / `closeAll()` methods for batch programmatic control
- `on(event, callback)` / `off(event, callback)` convenience API for subscribing to accordion events
- Auto ARIA setup — JS now programmatically sets `role="button"`, `tabindex="0"`, and `aria-expanded` on all headers
- Visible `:focus-visible` ring for keyboard users in the default theme

### Changed
- Replaced per-header `click`/`keydown` listeners with one delegated listener per container
- Switched to CSS Grid `grid-template-rows: 0fr → 1fr` for smooth 60fps expand/collapse animations
- Separated core CSS (mechanics only) from theme CSS (all visual styling)
- Improved `destroy()` to remove CSS custom properties and clear internal state
- Simplified `_applyDefaultOpen` — removed redundant variables and loops
- Build output: ES 2.07 KB gzip / UMD 1.53 KB gzip (CSS no longer bundled into JS)

### Fixed
- Removed `outline: none` on focused headers — was a WCAG accessibility violation
- Removed `window.ShuttersAccordion` pollution in ES module builds (UMD handles globals)
- Removed `import './shutters-core.css'` from JS — consumers now import CSS separately
- Removed duplicate script tag in demo HTML that loaded `shutters-core.js` twice



## [1.0.0] - 2025-10-16

### Added
- Initial release of Shutters Accordion
- Core accordion functionality with CSS-based animations
- JavaScript API for programmatic control
- Support for auto-close mode
- Configurable animation duration and easing
- Default open state options ('none', 'first', 'all', or array of indices)
- Full keyboard accessibility (Enter and Space keys)
- ARIA attributes for screen readers
- Multi-container support
- Public API methods: `open()`, `close()`, `toggle()`, `destroy()`
- Version tracking with static VERSION property

### Features
- Lightweight and dependency-free
- ES6 module and UMD bundle support
- CSS custom properties for easy theming
- Automatic event cleanup with `destroy()` method
- Comprehensive JSDoc documentation


