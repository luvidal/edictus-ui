# Forms

Shared form primitives route labels and visibility through `FieldWrapper`.

## Field suffixes

- `TextField`, `NumberField`, and `ComputedField` support `suffix` for units such as `%`, `UF`, or `m²`.
- Suffix fields reserve right padding (`pr-9`) so input text does not collide with the unit.
- `TextField` also accepts `inputClassName` for input-level alignment or compact layout tweaks while keeping wrapper classes on `className`.
- `TextField` suffix rendering takes precedence over `icon`; callers should choose one right-side adornment per field.
