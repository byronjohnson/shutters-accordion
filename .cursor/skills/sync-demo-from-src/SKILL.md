---
name: sync-demo-from-src
description: Deprecated — demo moved to shutters-site. After library src changes, release to npm and update shutters-site dependency. Use shutters-site sync-library-release skill.
---

# Sync Demo From Src (deprecated)

The `demo/` folder and `npm run sync:demo` were removed from this repo.

## Current workflow

1. Change library in `src/` (this repo)
2. `npm test && npm run build`
3. Release to npm (see `release-package` skill)
4. In **shutters-site** sibling repo:
   - Bump `shutters-accordion` version in `package.json`
   - `npm install` / `npm update shutters-accordion`
   - `npm run sri && npm run build`
   - Deploy to Vercel → https://shuttersjs.com/

See shutters-site `.cursor/skills/sync-library-release/SKILL.md`.
