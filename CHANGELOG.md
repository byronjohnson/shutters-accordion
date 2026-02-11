# Changelog

All notable changes to this project will be documented in this file.


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


