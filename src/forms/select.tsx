import { useEffect } from 'react'
import FieldWrapper from './fieldwrapper'
import { FieldProps } from './fieldprops'
import { inputBase, inputEditable, inputReadOnly } from './inputstyles'

interface Props extends Omit<FieldProps<string>, 'onChange'> {
  /** Select emits the picked option's string value — never undefined. */
  onChange?: (v: string) => void
  options: { label: string; value: string }[]
}

const Select = ({
  label,
  tooltip,
  value,
  placeholder,
  options,
  className,
  readOnly,
  visible,
  onChange,
}: Props) => {
  useEffect(() => {
    if (!readOnly && options.length === 1 && value !== options[0].value) {
      onChange?.(options[0].value)
    }
  }, [options, value, onChange, readOnly])

  return (
    <FieldWrapper label={label} tooltip={tooltip} className={className} visible={visible}>
      <select
        value={value || ''}
        disabled={readOnly}
        onChange={readOnly ? undefined : e => onChange?.(e.target.value)}
        className={`${inputBase} ${readOnly ? inputReadOnly : inputEditable} appearance-none ${readOnly ? '' : 'cursor-pointer'} pr-9 ${value ? 'text-ink-primary' : 'text-ink-tertiary'}`}
        style={readOnly ? undefined : {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em'
        }}
      >
        {placeholder && (
          <option value='' disabled>
            {placeholder}
          </option>
        )}
        {options?.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}

export default Select
