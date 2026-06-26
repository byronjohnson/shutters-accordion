---
name: release-package
description: Bumps version and publishes shutters-accordion to npm or GitHub Packages. Use for releases, version bumps, CHANGELOG updates, npm publish, or GitHub release creation.
---

# Release Package

## Pre-release checklist

- [ ] All changes merged to `develop`
- [ ] Demo copies synced (`sync-demo-from-src` skill)
- [ ] `npm run build` succeeds
- [ ] `npm run build:demo` succeeds
- [ ] CHANGELOG.md updated with release notes

## Version bump

**Note:** `scripts/sync-version.js` is partially stale (expects removed runtime VERSION constants). Until fixed, sync manually:

- [ ] Update `VERSION` file
- [ ] Update `package.json` version (or `npm version patch|minor|major`)
- [ ] Update CDN version pins in `README.md`
- [ ] Update JSON-LD `version` in `demo/index.html`
- [ ] Run `npm run agent:sync` — check drift report

## Publish to npm

```bash
npm run build
npm publish
```

`prepublishOnly` runs clean + build automatically.

## GitHub Packages

Create a GitHub Release → triggers `.github/workflows/publish.yml`. See `docs/GITHUB_PACKAGES.md`.

## GitHub Pages demo

Merge/push to `main` or `master` → `deploy-demo.yml` builds and deploys `dist-demo/`.

## Post-release

- [ ] Verify package on npmjs.com
- [ ] Verify live demo URL
- [ ] Tag pushed: `git push origin --tags`
- [ ] Run `npm run agent:sync`

## Reference docs

- `docs/PRE_RELEASE_CHECKLIST.md`
- `docs/GITHUB_PACKAGES.md`
- `CHANGELOG.md`
