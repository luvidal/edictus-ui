---
slug: button-light-theme
created: 2026-06-23
status: active
---

# Button light-theme cleanup

## Goal
Make the shared primary `Button` read cleanly in Jogi's tokenized light theme, especially when disabled inside modal footers.

## Touched modules + contracts
- `src/forms` — primary `Button` remains backward-compatible but updates visual treatment.

## Expected paths
- src/forms/button.tsx
- src/forms/button.README.md
- src/forms/README.md
- tests/forms.test.tsx
- CLAUDE.md
- docs/plans/button-light-theme.md

## Steps
- [x] Switch Button chrome from hard-coded theme ramp to semantic brand tokens.
- [x] Remove fuzzy text-shadow/all-caps treatment from labels and icons.
- [x] Keep disabled chrome stable while making disabled content legible.
- [x] Add form tests for the new Button visual contract.
- [x] Add `variant` (primary/secondary/ghost/danger/link) + `size` (sm/md) API; primary foreground is `text-brand-on` (host `--brand-on`: white on a saturated brand in light, AA-dark in dark, pale-safe). Default `primary`/`md` is back-compatible.

## Acceptance
`npm test` passes in `jogi@ui`.
