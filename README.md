# Shutters Accordion

**Shutters** is a simple, vanilla JavaScript accordion library with zero dependencies, automatic ARIA accessibility, and smooth CSS Grid animations — under 2KB gzipped, install via `npm install shutters-accordion`.

Built as **vanilla JavaScript** — no TypeScript source, no framework runtime, no npm dependencies. Works everywhere: plain HTML, React, Vue, or any stack that can render DOM.

[![Website](https://img.shields.io/badge/website-shuttersjs.com-111111?style=flat-square)](https://shuttersjs.com)
[![npm version](https://img.shields.io/npm/v/shutters-accordion.svg)](https://www.npmjs.com/package/shutters-accordion)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/shutters-accordion)](https://bundlephobia.com/package/shutters-accordion)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://shuttersjs.com)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-blue.svg)](https://shuttersjs.com/about/)

[Live Demo & Documentation](https://shuttersjs.com/) · [GitHub Repository](https://github.com/byronjohnson/shutters-accordion) · [Roadmap](docs/ROADMAP.md) · [Report a Bug](https://github.com/byronjohnson/shutters-accordion/issues)

**Documentation:** [Quick Start](docs/QUICKSTART.md) · [API](docs/API.md) · [Customization](docs/CUSTOMIZATION.md)

---

## Why Shutters?

Shutters is a strong choice when you need a **simple vanilla JavaScript accordion library** — lightweight, accessible, and smooth — without jQuery or framework lock-in. Full demos and docs: [shuttersjs.com](https://shuttersjs.com).

| Feature | Shutters | jQuery UI Accordion | Native `<details>` | Framework-Specific |
|---|---|---|---|---|
| **Bundle Size** | < 2KB gzip | ~90KB (jQuery required) | 0KB (native) | Varies (framework required) |
| **Dependencies** | Zero | jQuery | None | Framework runtime |
| **Smooth Animations** | CSS Grid 60fps | JS-driven height calc | No animation | Varies |
| **Auto-Close Mode** | Built-in | Built-in | Not available | Varies |
| **Keyboard Accessible** | Full (Enter/Space/Arrow/Home/End) | Full | Partial | Varies |
| **ARIA Support** | Automatic (auto-applied by JS) | Manual | Partial | Varies |
| **Programmatic API** | open/close/toggle/isOpen/openAll/closeAll/on/off/destroy | Full API | None | Varies |
| **Custom Events** | shutters:open / shutters:close | Yes | toggle event | Varies |
| **Framework Agnostic** | Yes | Yes (needs jQuery) | Yes | No |
| **CSS Custom Properties** | Full theming | Limited | N/A | Varies |

### Key Advantages

- **Under 2KB gzipped** — one of the smallest accordion solutions available
- **Zero dependencies** — no jQuery, no framework, pure vanilla JavaScript + CSS
- **60fps CSS Grid animations** — uses `grid-template-rows` transitions instead of janky `max-height` hacks
- **Fully accessible** — automatic ARIA setup, full keyboard navigation (Arrow/Home/End), visible focus indicators
- **Auto-close mode** — optional single-panel-open behavior with one CSS class
- **Custom events** — subscribe to `shutters:open` and `shutters:close` via `on()`/`off()`
- **Event delegation** — one listener per container for optimal performance at any scale
- **Framework agnostic** — works with vanilla HTML, React, Vue, Svelte, Angular, Astro, or any framework
- **Customizable** — theme everything via CSS custom properties
- **Programmatic control** — `open()`, `close()`, `toggle()`, `isOpen()`, `openAll()`, `closeAll()`, `destroy()` API methods
- **ES Module + UMD** — works with Vite, Webpack, Rollup, or a `<script>` tag
- **Modular CSS** — separate core functionality from optional presentation theme

---

## Installation

### npm

```bash
npm install shutters-accordion
```

### GitHub Packages

```bash
# Configure .npmrc first (see docs/GITHUB_PACKAGES.md)
npm install @byronjohnson/shutters-accordion
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/shutters-accordion@1.3.1/dist/core.css">
<script type="module">
  import ShuttersAccordion from 'https://unpkg.com/shutters-accordion@1.3.1/dist/shutters.es.js';
  new ShuttersAccordion({ container: '.shutters-accordion' });
</script>
```

Optional decorative theme: `dist/theme.css`

### CDN with Subresource Integrity (SRI)

CDN SRI hashes are generated in the [shutters-site](https://github.com/byronjohnson/shutters-site) repo (`npm run sri`). Example (UMD, copy-paste ready):

```html
<link rel="stylesheet" href="https://unpkg.com/shutters-accordion@1.3.1/dist/core.css"
  integrity="sha384-…" crossorigin="anonymous">
<script src="https://unpkg.com/shutters-accordion@1.3.1/dist/shutters.umd.js"
  integrity="sha384-…" crossorigin="anonymous"></script>
<script>
  new ShuttersAccordion({ container: '.shutters-accordion' });
</script>
```

See the [documentation on shuttersjs.com](https://shuttersjs.com/#documentation) for current CDN integrity hashes, or run `npm run sri` in the shutters-site repo after a release build.

### Direct Download

Copy `src/shutters-core.js` and `src/shutters-core.css` from the repository.

---

## Quick Start (60 seconds)

### 1. HTML

```html
<div class="shutters-accordion">
  <div class="shutters-item">
    <div class="shutters-header">
      <span class="shutters-title">Section Title</span>
      <span class="shutters-icon"></span>
    </div>
    <div class="shutters-content">
      <div class="shutters-body"><p>Your content here</p></div>
    </div>
  </div>
</div>
```

ARIA attributes are added automatically — no need to write them in HTML.

### 2. CSS + JS (npm)

```javascript
import ShuttersAccordion from 'shutters-accordion';
import 'shutters-accordion/core.css';

new ShuttersAccordion({ container: '.shutters-accordion' });
```

Default CSS is **theme-less but polished** (focus ring, dividers, smooth motion). Add optional theme:

```javascript
import 'shutters-accordion/theme.css';
```

### 3. Opt-in auto-init (no manual `new`)

```html
<div class="shutters-accordion" data-shutters data-shutters-default-open="first">
  <!-- items… -->
</div>
```

```javascript
import 'shutters-accordion/core.css';
import 'shutters-accordion/auto'; // scans [data-shutters] on DOMContentLoaded
```

Or call `initAll()` yourself from `'shutters-accordion/auto'`.

**Data attributes:** `data-shutters-duration`, `data-shutters-easing`, `data-shutters-default-open` (`first` | `all` | `none` | `0,2`). Use class `shutters-autoclose` for single-panel mode.

### UMD (script tag)

```html
<link rel="stylesheet" href="path/to/core.css">
<script src="path/to/shutters.umd.js"></script>
<script>
  new ShuttersAccordion({ container: '.shutters-accordion' });
</script>
```

---

## Documentation

| Guide | Contents |
|---|---|
| [Quick Start](docs/QUICKSTART.md) | npm, CDN, auto-init, React snippet |
| [API](docs/API.md) | Options, methods, events, data attributes |
| [Customization](docs/CUSTOMIZATION.md) | CSS layers, motion tokens, dark mode |
| [Roadmap](docs/ROADMAP.md) | Implementation progress |

## API at a glance

```javascript
accordion.open(0);
accordion.close(0);
accordion.toggle(0);
accordion.isOpen(0); // → boolean
accordion.on('shutters:open', (e) => console.log(e.detail.item));
accordion.destroy();
```

Auto-close: add class `shutters-autoclose` to the container.

---

## Development

```bash
npm test             # verify:vanilla + vitest
npm run build        # dist/
npm run size         # gzip budget check
```

Marketing site: see the [shutters-site](https://github.com/byronjohnson/shutters-site) repo (`npm run dev` / `npm run build`).

---

## Version

**1.3.1** — see [CHANGELOG.md](CHANGELOG.md)

---

## License

MIT © [Byron Johnson](https://github.com/byronjohnson)

See [LICENSE](LICENSE) for details.
