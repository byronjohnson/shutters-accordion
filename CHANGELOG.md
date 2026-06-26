# Changelog

All notable changes to this project will be documented in this file.

## [1.2.1] - 2026-06-26

### Fixed
- Accordion content area spans full width of the header (shared padding vars, `border-box`)
- Removed extra vertical gap below closed panels and below open panel content
- Theme content spacing no longer stacks body padding with last-child margins

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


