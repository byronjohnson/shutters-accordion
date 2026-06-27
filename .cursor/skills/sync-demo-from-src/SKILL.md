---
name: sync-demo-from-src
description: Syncs demo library copies from src/ after library source changes. Use after editing src/shutters-core.js, shutters-auto.js, shutters-core.css, or shutters-theme.css.
---

# Sync Demo From Source

The demo ships standalone copies of library files (excluded from npm). They must match `src/`.

## Checklist

- [ ] Identify which `src/` files changed
- [ ] Run sync:

```bash
npm run sync:demo
```

Equivalent manual copies:

```bash
cp src/shutters-core.js demo/shutters-core.js
cp src/shutters-auto.js demo/shutters-auto.js
cp src/shutters-core.css demo/shutters-core.css
cp src/shutters-theme.css demo/shutters-theme.css
```

- [ ] Do **not** copy `src/shutters-demo.css` — demo uses `demo/shutters-demo.css`
- [ ] Demo-only files (`shutters-demo-ui.js`, `shutters-demo.css`) are **not** synced from `src/`
- [ ] Open `npm run dev` → verify demo accordions work
- [ ] Run `npm run build:demo` — verify production build
- [ ] Run `npm run agent:sync`

## Files that must stay in sync

| src/ | demo/ |
|---|---|
| `shutters-core.js` | `shutters-core.js` |
| `shutters-auto.js` | `shutters-auto.js` |
| `shutters-core.css` | `shutters-core.css` |
| `shutters-theme.css` | `shutters-theme.css` |

## Auto vs manual updates

`npm run sync:demo` handles library copies. Demo HTML/CSS/JS (`shutters-demo-ui.js`) are edited directly in `demo/`.
