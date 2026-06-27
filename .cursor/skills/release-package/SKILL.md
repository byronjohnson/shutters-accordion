---
name: release-package
description: Bumps version and publishes shutters-accordion to npm or GitHub Packages. Use for releases, version bumps, CHANGELOG updates, npm publish, or GitHub release creation.
---

# Release Package

## Pre-release checklist

- [ ] All changes merged to `master` (deploy) / `develop` (active dev)
- [ ] shutters-site updated if user-facing demo/docs changed (sibling repo)
- [ ] `npm test` passes (20 tests + `verify:vanilla`)
- [ ] `npm run build` succeeds
- [ ] `npm run size` passes (ES ≤ 2320 B gzip, UMD ≤ 2200 B)
- [ ] `CHANGELOG.md` updated with release notes

## Version bump

1. Update `VERSION` file (e.g. `1.3.0`)
2. Run `npm run version:sync` — syncs:
   - `package.json`
   - README CDN pins + version footer
   - `../shutters-site/index.html` + `about/index.html` badges (if sibling exists)
   - Local `docs/QUICKSTART.md`, `docs/API.md`
3. In **shutters-site**: bump `shutters-accordion` dependency, `npm run sri`, `npm run sync-version`
4. Run `npm run agent:sync` — verify no version drift in inventory

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

## Legacy GitHub Pages redirect

Push to `main` or `master` → `deploy-demo.yml` updates redirect stubs so  
https://byronjohnson.github.io/shutters-accordion/demo/ → https://shuttersjs.com/

## Post-release

- [ ] Verify package on https://www.npmjs.com/package/shutters-accordion (`homepage` → https://shuttersjs.com/)
- [ ] Verify live site: https://shuttersjs.com/
- [ ] Deploy shutters-site to Vercel if version/SRI changed
- [ ] Update `docs/ROADMAP.md` release status (local, gitignored)
- [ ] Run `npm run agent:sync`

## Reference docs

- `docs/PRE_RELEASE_CHECKLIST.md`
- `docs/GITHUB_PACKAGES.md`
- `CHANGELOG.md`
