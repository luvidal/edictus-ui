// Shared base contract for every form field in @jogi/ui.
// Concrete fields extend this with their value type (string, number, etc.)
// and any field-specific extras (suffix, step, icon, …).
export interface FieldProps<T> {
  label?: string
  tooltip?: string
  value?: T
  onChange?: (v: T | undefined) => void
  readOnly?: boolean
  placeholder?: string
  className?: string
  visible?: boolean
}
