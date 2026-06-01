---
slug: textfield-suffix
created: 2026-06-01
status: active
---

# TextField suffix support

## Goal
Let shared form fields render unit suffixes with reserved input padding so host apps do not hand-roll percent/UF suffix inputs.

## Touched modules + contracts
- `src/forms` — field components keep the shared `FieldWrapper` contract and stay backward-compatible.

## Expected paths
- src/forms/textfield.tsx
- src/forms/numberfield.tsx
- src/forms/computedfield.tsx
- src/forms/README.md
- tests/forms.test.tsx
- CLAUDE.md
- docs/plans/textfield-suffix.md

## Steps
- [ ] Add suffix support to `TextField`.
- [ ] Reserve suffix space in text, number, and computed fields.
- [ ] Cover suffix spacing with tests.

## Acceptance
`npm test` and `npm run build` pass in `jogi@ui`, and Jogi can consume the new `TextField` suffix API.
