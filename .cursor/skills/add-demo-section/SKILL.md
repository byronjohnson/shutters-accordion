---
name: add-demo-section
description: Adds a new section, usage example, or FAQ block to the Shutters marketing demo page. Use when editing demo/index.html, adding showcase accordions, or updating SEO/JSON-LD.
---

# Add Demo Section

Reference existing sections in `demo/index.html` for markup patterns.

## Checklist

- [ ] Add HTML using standard accordion class structure (no manual ARIA attributes)
- [ ] Wrap in appropriate `<section>` with heading matching page style
- [ ] If new accordion group with auto-close: add `shutters-autoclose` class on container
- [ ] Ensure init script selector covers new containers (or add separate instance if needed)
- [ ] Update JSON-LD FAQ entries if adding FAQ content
- [ ] Run `npm run dev:demo` — visual check
- [ ] Run `npm run build:demo` — verify GitHub Pages output in `dist-demo/`
- [ ] Run `npm run agent:sync`

## Accordion markup template

```html
<div class="shutters-accordion">
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
```

## Auto vs manual updates

| Auto | Manual |
|---|---|
| Inventory demo file list | HTML content, JSON-LD text |
