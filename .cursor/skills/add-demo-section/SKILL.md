---
name: add-demo-section
description: Adds a new section, usage example, or FAQ block to the Shutters marketing demo page. Use when editing demo/index.html, adding showcase accordions, or updating SEO/JSON-LD.
---

# Add Demo Section

Reference existing sections in `demo/index.html` for markup patterns.

## Page zones (v1.3+)

Place new content in the correct `.page-zone`:

| Zone | Use for |
|---|---|
| `#overview` | Product highlights (accordion content) |
| `#demos` | Interactive Shutters examples |
| `#comparisons` | Side-by-side or vs-library content |
| `#documentation` | Install/API/customization guide blocks |

Each block: `<section class="section-card demo-section">` with `<h3 class="section-title">`.

## Checklist

- [ ] Add HTML using standard accordion class structure (no manual ARIA attributes)
- [ ] Wrap in `.section-card` inside the appropriate `.page-zone`
- [ ] If new accordion group with auto-close: add `shutters-autoclose` class on container
- [ ] If `[data-shutters]`: exclude from manual `ShuttersAccordion` selector
- [ ] Update JSON-LD FAQ entries if adding FAQ content
- [ ] Style demo-only UI in `demo/shutters-demo.css` (not `src/`)
- [ ] Run `npm run dev:demo` — visual check
- [ ] Run `npm run build:demo` — verify GitHub Pages output in `dist-demo/`
- [ ] Run `npm run agent:sync`

## Accordion markup template

```html
<section class="section-card demo-section" aria-labelledby="my-heading">
  <h3 id="my-heading" class="section-title">Section Title</h3>
  <div class="shutters-accordion demo-accordion">
    <div class="shutters-item">
      <div class="shutters-header">
        <span class="shutters-title">Title</span>
        <span class="shutters-icon"></span>
      </div>
      <div class="shutters-content">
        <div class="shutters-body"><p>Content</p></div>
      </div>
    </div>
  </div>
</section>
```

## Auto vs manual updates

| Auto | Manual |
|---|---|
| Inventory demo file list | HTML content, JSON-LD text, demo CSS |
