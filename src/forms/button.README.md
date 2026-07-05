# Button

Primary action button. Consumed via `import { Button } from '@edictus/ui'`.

```tsx
<Button icon="Play" text="Enviar" onClick={submit} disabled={!canSubmit} />
```

Props (beyond standard `<button>` HTML attributes):

- `icon?: string` — lucide-react icon name rendered before the text
- `text?: string` — label rendered with the caller-provided casing
- `loading?: boolean` — replaces the icon with an inline spinner AND sets `disabled` internally
- `variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'` — visual style; default `'primary'`
- `size?: 'sm' | 'md'` — height/padding scale; default `'md'` (h-10), `'sm'` = h-8

## Visual contract

- Primary chrome uses semantic brand tokens: `bg-brand`, `text-brand-on`, `hover:bg-brand-hover`.
- Elevation uses token shadows (`shadow-token-sm` → `shadow-token-md`) so light and dark themes share the same hierarchy model.
- Label, icon, and spinner do not use `text-shadow`, blur, grayscale, filters, or forced all-caps styling.

## DIRECTIVE — Disabled state rules

**The chrome of a Button NEVER changes when disabled.** Only inner content gets dimmed.

- The button's background, border, shadow, ring, and any other chromatic property must remain **identical** in disabled and enabled states.
- The label (`<span>`), icon (`<Icon>`), and loading spinner receive `opacity-70` — and nothing else. No `blur-*`, no `grayscale`, no filter chains. "Dimmed" means opacity only.
- The only allowed disabled-specific addition to the outer `<button>` element is `cursor-not-allowed`.
- `loading` is treated as `disabled` for visual purposes.

### Why this rule exists

Past iterations tried to signal "disabled" by desaturating, graying out, heavily dimming, or blurring the entire button. Those patterns break visual hierarchy, especially in light theme where brand ramps can land on warm midtones. Keeping the chrome stable and only lightly dimming the content preserves the button's identity as "the primary action here, currently unavailable" without making the label look broken.

### How to enforce

- `DIRECTIVE` comment lives next to the `disabledContent` const in `button.tsx`. Per the global DIRECTIVE rule (see user CLAUDE.md), that comment is a behavioral contract — never modify, remove, or skip it.
- Any PR that adds disabled-only `opacity-*`, `grayscale`, `blur`, `filter`, or changes `bg-*` / `border-*` / `ring-*` / `shadow-*` on the `<button>` element when `isDisabled` is set should be rejected on sight.
- `ToolbarButton` (`src/header/toolbarbutton.tsx`) shares this contract and should be kept in sync if its disabled styling is ever touched.

## Variants

Five token-driven variants, all sharing the disabled DIRECTIVE (chrome stable, content dims):

| variant | fill | foreground | hover |
|---|---|---|---|
| `primary` (default) | `bg-brand` | `text-brand-on` | `bg-brand-hover` |
| `secondary` | `bg-surface-2` | `text-ink-primary` | `bg-surface-3` |
| `ghost` | transparent | `text-ink-secondary` | `bg-surface-2/40` |
| `danger` | `bg-status-danger` | `text-white` | `bg-status-danger/90` |
| `link` | none | `text-brand` underline | `text-brand-hover` |

`text-brand-on` is the host-computed per-tenant CTA contrast (`--brand-on` in jogi
`lib/branding`): white on a saturated brand in light, AA-dark in dark, and
pale-brand-safe (falls back to dark when white would fail). Custom per-instance
styling still passes through `className`, merged last — callers CAN override
intentionally, but must preserve the disabled-state invariant.
