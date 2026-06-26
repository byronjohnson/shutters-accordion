---
name: add-api-method
description: Adds a new public method, event, or constructor option to ShuttersAccordion. Use when extending the library API, adding custom events, or changing constructor options in shutters-core.js.
---

# Add Public API Method

## Checklist

- [ ] Read existing patterns in `src/shutters-core.js` (e.g. `open`, `close`, `on`)
- [ ] Implement method with JSDoc block matching existing style
- [ ] Wire through internal helpers if needed (`_setState`, `_emit`, `_byIndex`)
- [ ] Copy `src/shutters-core.js` → `demo/shutters-core.js`
- [ ] Add usage example to root `README.md` → **API Methods** section
- [ ] Add demo example in `demo/index.html` if user-visible
- [ ] Add entry under `## [Unreleased]` or new version in `CHANGELOG.md`
- [ ] Run `npm run build` — confirm ES gzip stays ~2 KB
- [ ] Run `npm run agent:sync`

## Pattern

```js
/** Brief description */
methodName(arg) {
  const r = this._byIndex(index); // if index-based
  if (!r) return;
  // use _setState / _emit for state changes
}
```

## Auto vs manual updates

| Auto | Manual |
|---|---|
| `inventory.md` public API list (via `agent:sync`) | README, CHANGELOG, demo HTML |
