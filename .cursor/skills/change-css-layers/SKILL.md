---
name: change-css-layers
description: Modifies Shutters accordion CSS — core mechanics or theme styling, grid animation, or CSS custom properties. Use when editing shutters-core.css, shutters-theme.css, or accordion visual/animation behavior.
---

# Change CSS Layers

## Decide layer first

| Change | File |
|---|---|
| Grid animation, opacity, icon rotation, header layout | `src/shutters-core.css` |
| Colors, borders, padding, fonts, focus ring | `src/shutters-theme.css` |
| Demo page layout | shutters-site `src/shutters-demo.css` (sibling repo) |

## Checklist

- [ ] Edit the correct layer — never put visuals in core CSS
- [ ] Preserve grid animation: `grid-template-rows: 0fr → 1fr` on `.shutters-content`
- [ ] Keep `.shutters-body { min-height: 0; overflow: hidden; }`
- [ ] Maintain `:focus-visible` ring in theme (never bare `outline: none`)
- [ ] If library CSS changed: verify on https://shuttersjs.com/ after shutters-site deploy
- [ ] Run `npm run build` — check `dist/core.css` / `dist/theme.css` output
- [ ] Run `npm run agent:sync`

## Custom property reference

Theme: `--shutters-bg-color`, `--shutters-border-color`, `--shutters-focus-color`, `--shutters-hover-bg`, `--shutters-text-color`

Timing (JS may override inline): `--shutters-animation-duration`, `--shutters-animation-easing`

## Auto vs manual updates

| Auto | Manual |
|---|---|
| Inventory CSS file list | Visual review in browser |
