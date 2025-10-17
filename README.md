# Shutters Accordion

[![npm version](https://img.shields.io/npm/v/shutters-accordion.svg)](https://www.npmjs.com/package/shutters-accordion)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight, developer-friendly accordion component that prioritizes simplicity and customization.

## Installation

### npm (Public Registry)

```bash
npm install shutters-accordion
```

### GitHub Packages

```bash
# Configure .npmrc first (see GITHUB_PACKAGES.md)
npm install @byronjohnson/shutters-accordion
```

### CDN

```html
<!-- ES Module -->
<script type="module">
  import { ShuttersAccordion } from 'https://unpkg.com/shutters-accordion@1.0.0/dist/shutters.es.js';
</script>

<!-- UMD (for browsers) -->
<script src="https://unpkg.com/shutters-accordion@1.0.0/dist/shutters.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/shutters-accordion@1.0.0/dist/style.css">
```

## Quick Start

### Basic HTML Structure

```html
<div class="shutters-accordion">
  <div class="shutters-item">
    <input type="checkbox" id="shutters-item-1" class="shutters-toggle">
    <label for="shutters-item-1" class="shutters-header">
      <span class="shutters-title">Section Title</span>
      <span class="shutters-icon"></span>
    </label>
    <div class="shutters-content">
      <div class="shutters-body">
        <!-- Your content here -->
      </div>
    </div>
  </div>
</div>
```

### CSS Files

Include the core CSS for functionality:
```html
<link rel="stylesheet" href="./src/shutters-core.css">
```

Optionally include the theme CSS for styling:
```html
<link rel="stylesheet" href="./src/shutters-theme.css">
```

### JavaScript Usage

#### ES Module

```javascript
import { ShuttersAccordion } from 'shutters-accordion';
import 'shutters-accordion/style.css';

const accordion = new ShuttersAccordion({
  container: '.shutters-accordion',
  animationDuration: 300,
  defaultOpen: 'first'
});

// Check version
console.log(ShuttersAccordion.VERSION); // "1.0.0"
console.log(accordion.version); // "1.0.0"
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

### API Methods

```javascript
// Open item by index
accordion.open(0);

// Close item by index
accordion.close(0);

// Toggle item by index
accordion.toggle(0);

// Destroy instance and clean up
accordion.destroy();
```

## Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Features

- **Lightweight**: Less than 50 lines of critical CSS
- **Modular**: Separate core functionality from presentation styles  
- **Accessible**: Keyboard navigation and screen reader support
- **Customizable**: Black and white theme with CSS custom properties
- **Compatible**: Works with Vite and modern build tools

## Browser Support

- Modern browsers with CSS Grid support
- Fallback support for IE11+ using max-height animations

## Versioning

Current version: **1.0.0**

### Version Access

```javascript
// Static property
console.log(ShuttersAccordion.VERSION); // "1.0.0"

// Instance property
const accordion = new ShuttersAccordion();
console.log(accordion.version); // "1.0.0"
```

## Publishing

To publish a new version:

```bash
# Update version in package.json, VERSION file, and CHANGELOG.md
npm version patch  # or minor, major

# Build the package
npm run build

# Publish to npm
npm publish
```

## License

MIT © Byron Johnson

See [LICENSE](LICENSE) for details.