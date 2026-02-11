# Shutters Accordion

**A lightweight, accessible, dependency-free JavaScript accordion component with smooth CSS Grid animations.**

[![npm version](https://img.shields.io/npm/v/shutters-accordion.svg)](https://www.npmjs.com/package/shutters-accordion)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/badge/gzip-<2KB-brightgreen.svg)](https://github.com/byronjohnson/shutters-accordion)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://github.com/byronjohnson/shutters-accordion)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-blue.svg)](https://github.com/byronjohnson/shutters-accordion)

[Live Demo](https://byronjohnson.github.io/shutters-accordion/demo) · [GitHub Repository](https://github.com/byronjohnson/shutters-accordion) · [Report a Bug](https://github.com/byronjohnson/shutters-accordion/issues)

---

## Why Shutters?

Shutters is the accordion component you reach for when you want something that **just works** — lightweight, accessible, and smooth — without pulling in a framework or a heavy UI library.

| Feature | Shutters | jQuery UI Accordion | Native `<details>` | Framework-Specific |
|---|---|---|---|---|
| **Bundle Size** | < 2KB gzip | ~90KB (jQuery required) | 0KB (native) | Varies (framework required) |
| **Dependencies** | Zero | jQuery | None | Framework runtime |
| **Smooth Animations** | CSS Grid 60fps | JS-driven height calc | No animation | Varies |
| **Auto-Close Mode** | Built-in | Built-in | Not available | Varies |
| **Keyboard Accessible** | Full (Enter/Space/Arrow/Home/End) | Full | Partial | Varies |
| **ARIA Support** | Automatic (auto-applied by JS) | Manual | Partial | Varies |
| **Programmatic API** | open/close/toggle/openAll/closeAll/on/off/destroy | Full API | None | Varies |
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
- **Programmatic control** — `open()`, `close()`, `toggle()`, `openAll()`, `closeAll()`, `destroy()` API methods
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
<!-- ES Module -->
<script type="module">
  import { ShuttersAccordion } from 'https://unpkg.com/shutters-accordion@1.1.0/dist/shutters.es.js';
</script>

<!-- UMD (for browsers) -->
<script src="https://unpkg.com/shutters-accordion@1.1.0/dist/shutters.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/shutters-accordion@1.1.0/dist/style.css">
```

### Direct Download

Download `shutters-core.js` and `shutters-core.css` from the `src/` directory and include them in your project.

---

## Quick Start

### 1. Add the HTML Structure

```html
<div class="shutters-accordion">
  <div class="shutters-item">
    <div class="shutters-header">
      <span class="shutters-title">Section Title</span>
      <span class="shutters-icon"></span>
    </div>
    <div class="shutters-content">
      <div class="shutters-body">
        <p>Your content goes here</p>
      </div>
    </div>
  </div>
</div>
```

> **Note:** ARIA attributes (`role="button"`, `tabindex="0"`, `aria-expanded`) are added automatically by JavaScript at initialization — you don't need to write them in your HTML.

### 2. Include the CSS

```html
<!-- Core CSS (required) -->
<link rel="stylesheet" href="shutters-core.css">

<!-- Theme CSS (optional — provides default black-and-white styling) -->
<link rel="stylesheet" href="shutters-theme.css">
```

### 3. Initialize with JavaScript

#### ES Module

```javascript
import { ShuttersAccordion } from 'shutters-accordion';

const accordion = new ShuttersAccordion({
  container: '.shutters-accordion',
  animationDuration: 300,
  animationEasing: 'ease-in-out',
  defaultOpen: 'first'
});
```

#### UMD (Browser Global)

```html
<script src="path/to/shutters.umd.js"></script>
<link rel="stylesheet" href="path/to/style.css">

<script>
  const accordion = new window.ShuttersAccordion({
    container: '.shutters-accordion'
  });
</script>
```

---

## Configuration Options

| Option | Type | Default | Description |
|---|---|---|---|
| `container` | `string \| Element \| NodeList \| Array` | `'.shutters-accordion'` | CSS selector, DOM element, or array of container elements |
| `animationDuration` | `number` | `300` | Animation speed in milliseconds |
| `animationEasing` | `string` | `'ease-in-out'` | CSS easing function for transitions |
| `defaultOpen` | `string \| Array` | `'none'` | Which items to open initially: `'first'`, `'all'`, `'none'`, or an index array like `[0, 2]` |

---

## API Methods

```javascript
const accordion = new ShuttersAccordion({
  container: '.shutters-accordion'
});

// Open an accordion item by its zero-based index
accordion.open(0);

// Close an accordion item by index
accordion.close(0);

// Toggle an accordion item by index
accordion.toggle(0);

// Open or close all items at once
accordion.openAll();
accordion.closeAll();

// Listen for state changes
accordion.on('shutters:open', (e) => {
  console.log('Opened:', e.detail.item);
});

accordion.on('shutters:close', (e) => {
  console.log('Closed:', e.detail.item);
});

// Remove a specific listener
accordion.off('shutters:close', myCallback);

// Destroy the instance and remove all event listeners
accordion.destroy();
```

---

## Auto-Close Mode

Add the `shutters-autoclose` class to your accordion container to ensure only one panel is open at a time:

```html
<div class="shutters-accordion shutters-autoclose">
  <div class="shutters-item">
    <!-- Only one item can be open at a time -->
  </div>
</div>
```

This is perfect for FAQ sections, settings panels, and mobile navigation menus.

---

## Customization

Shutters separates **core functionality CSS** from **presentation theme CSS**. The core CSS handles the expand/collapse mechanics, while the theme CSS provides visual styling.

### CSS Custom Properties

Override these custom properties to match your design system:

```css
.shutters-accordion {
  --shutters-bg-color: #fff;
  --shutters-border-color: #000;
  --shutters-focus-color: #0066cc;
  --shutters-hover-bg: #f5f5f5;
  --shutters-text-color: #000;
  --shutters-animation-duration: 0.3s;
  --shutters-animation-easing: ease-in-out;
}
```

### Dark Mode Example

```css
.shutters-accordion.dark-theme {
  --shutters-bg-color: #1a1a2e;
  --shutters-border-color: #333;
  --shutters-focus-color: #4da6ff;
  --shutters-hover-bg: #16213e;
  --shutters-text-color: #e0e0e0;
}
```

---

## How the CSS Grid Animation Works

Shutters uses the modern **CSS Grid `grid-template-rows` transition** technique — the same approach recommended by Google's web.dev team for animating content height. Instead of:

- ❌ `max-height` hacks (janky, requires guessing a large value)
- ❌ JavaScript-measured `scrollHeight` animations (causes layout thrashing)
- ❌ `transform: scaleY()` (distorts content)

Shutters does:

- ✅ Transitions `grid-template-rows` from `0fr` to `1fr`
- ✅ GPU-accelerated, 60fps smooth animations
- ✅ Works with any dynamic content height
- ✅ No layout thrashing or reflows

```css
/* Collapsed state */
.shutters-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-in-out;
}

/* Expanded state */
.opened .shutters-content {
  grid-template-rows: 1fr;
}
```

---

## Accessibility

Shutters implements the [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) with:

- **Automatic ARIA setup** — `role="button"`, `tabindex="0"`, and `aria-expanded` are applied by JS at initialization
- `aria-expanded="true|false"` kept in sync with open/closed state
- **Enter** and **Space** key activation
- **Arrow Up/Down** to move focus between headers
- **Home/End** to jump to the first/last header
- Visible `:focus-visible` indicators for keyboard users
- Compatible with screen readers (NVDA, JAWS, VoiceOver)

---

## Browser Support

| Browser | Version |
|---|---|
| Chrome | 57+ |
| Firefox | 52+ |
| Safari | 10.1+ |
| Edge | 16+ |
| iOS Safari | 10.3+ |
| Chrome Android | 57+ |

Requires CSS Grid support (`grid-template-rows` transitions).

---

## Use Cases

Shutters Accordion is ideal for:

- **FAQ sections** — organize frequently asked questions with auto-close mode
- **Product feature lists** — expandable feature descriptions on landing pages
- **Settings panels** — collapsible configuration groups in dashboards
- **Documentation** — organize API references and guides into expandable sections
- **Mobile navigation** — compact, accessible navigation menus
- **Pricing tables** — expandable plan details and feature comparisons
- **Content-heavy pages** — reduce visual clutter while keeping all content accessible

---

## Development

```bash
# Start development server
npm run dev

# Start demo development server
npm run dev:demo

# Build library for production
npm run build

# Build demo for deployment
npm run build:demo

# Build both library and demo
npm run build:all

# Preview production build
npm run preview
```

---

## Versioning

Current version: **1.1.0**

The version is managed in `package.json` and the `VERSION` file. Use `npm version` to bump versions.

---

## Publishing

```bash
# Update version in package.json, VERSION file, and CHANGELOG.md
npm version patch  # or minor, major

# Build the package
npm run build

# Publish to npm
npm publish
```

---

## Frequently Asked Questions

### Is Shutters Accordion free to use?

Yes. Shutters is open-source software released under the [MIT License](LICENSE). You can use it in personal and commercial projects without restriction.

### Does Shutters work with React / Vue / Svelte / Angular?

Yes. Shutters is framework-agnostic. It works with any framework or plain HTML because it operates on standard DOM elements. Simply render the expected HTML structure and initialize Shutters in your component's mount lifecycle.

### How small is Shutters compared to other accordion libraries?

Shutters weighs under 2KB gzipped (JS + CSS combined). By comparison, jQuery UI Accordion requires jQuery (~90KB), and most framework-specific accordion components add to your existing framework bundle.

### Can I have multiple accordions on the same page?

Yes. Pass a CSS selector that matches multiple containers, or pass an array of DOM elements. Each container operates independently — you can mix auto-close and multi-open accordions on the same page.

### Does Shutters support nested accordions?

Shutters works with nested accordion structures. Each level should use its own `ShuttersAccordion` instance targeting the appropriate container.

### How do I animate the accordion icon?

Shutters includes a default `+` icon that rotates 45° (becoming `×`) when expanded. This is handled by the `.shutters-icon::before` CSS. You can override this with your own icon by modifying the CSS or replacing the icon element.

---

## License

MIT © [Byron Johnson](https://github.com/byronjohnson)

See [LICENSE](LICENSE) for details.
