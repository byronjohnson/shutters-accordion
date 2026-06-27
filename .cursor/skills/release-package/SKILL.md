---
name: release-package
description: Bumps version and publishes shutters-accordion to npm or GitHub Packages. Use for releases, version bumps, CHANGELOG updates, npm publish, or GitHub release creation.
---

# Release Package

## Pre-release checklist

- [ ] All changes merged to `master` (deploy) / `develop` (active dev)
- [ ] Demo copies synced (`npm run sync:demo`)
- [ ] `npm test` passes (20 tests + `verify:vanilla`)
- [ ] `npm run build` succeeds
- [ ] `npm run size` passes (ES ≤ 2320 B gzip, UMD ≤ 2200 B)
- [ ] `npm run sri && npm run build:demo` succeeds
- [ ] `CHANGELOG.md` updated with release notes

## Version bump

1. Update `VERSION` file (e.g. `1.3.0`)
2. Run `npm run version:sync` — syncs:
   - `package.json`
   - README CDN pins + version footer
   - `demo/index.html` JSON-LD + `.version-badge`
   - Local `docs/QUICKSTART.md`, `docs/API.md`
3. Run `npm run agent:sync` — verify no version drift in inventory

## Publish to npm

```bash
npm publish --otp=YOUR_6_DIGIT_CODE   # if 2FA enabled
```

`prepublishOnly` runs `clean` + `build` automatically.

## Git tag & push

```bash
git add -A   # tracked files only — docs/ is gitignored
git commit -m "Release X.Y.Z — …"
git tag X.Y.Z
git push Github master
git push Github X.Y.Z
```

Tag format: `1.3.0` (no `v` prefix — matches existing tags).

## GitHub Packages

Create a GitHub Release → triggers `.github/workflows/publish.yml`. See `docs/GITHUB_PACKAGES.md`.

## GitHub Pages demo

Push to `main` or `master` → `deploy-demo.yml` builds and deploys `dist-demo/` to `/shutters-accordion/demo/`.

## Post-release

- [ ] Verify package on https://www.npmjs.com/package/shutters-accordion
- [ ] Verify live demo: https://byronjohnson.github.io/shutters-accordion/demo/
- [ ] Update `docs/ROADMAP.md` release status (local, gitignored)
- [ ] Run `npm run agent:sync`

## Reference docs

- `docs/PRE_RELEASE_CHECKLIST.md`
- `docs/GITHUB_PACKAGES.md`
- `CHANGELOG.md`
