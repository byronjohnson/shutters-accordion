# Shutters CSS Accordion Utility

A lightweight, developer-friendly accordion component that prioritizes simplicity and customization.

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

### Optional JavaScript

For enhanced features like auto-close and programmatic control:
```html
<script type="module" src="./src/shutters.js"></script>
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