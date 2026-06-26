---
name: sync-demo-from-src
description: Syncs demo/shutters-core.js and demo CSS copies from src/ after library source changes. Use after editing src/shutters-core.js, shutters-core.css, or shutters-theme.css.
---

# Sync Demo From Source

The demo ships standalone copies of library files (excluded from npm). They must match `src/`.

## Checklist

- [ ] Identify which `src/` files changed
- [ ] Copy changed files:

```bash
cp src/shutters-core.js demo/shutters-core.js
cp src/shutters-core.css demo/shutters-core.css
cp src/shutters-theme.css demo/shutters-theme.css
```

- [ ] Do **not** copy `src/shutters-demo.css` — demo uses `demo/shutters-demo.css`
- [ ] Open `npm run dev` → verify demo accordions work
- [ ] Run `npm run build:demo` — verify production build
- [ ] Run `npm run agent:sync`

## Files that must stay in sync

| src/ | demo/ |
|---|---|
| `shutters-core.js` | `shutters-core.js` |
| `shutters-core.css` | `shutters-core.css` |
| `shutters-theme.css` | `shutters-theme.css` |

## Auto vs manual updates

This entire workflow is manual — no auto-sync script exists yet.
