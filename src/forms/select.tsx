import { useEffect } from 'react'
import FieldWrapper from './fieldwrapper'
import { inputBase, inputEditable } from './inputstyles'

interface Props {
  label?: string
  value: string
  placeholder?: string
  options: { label: string; value: string }[]
  className?: string
  tooltip?: string
  onChange: (value: string) => void
}

const Select = ({ label, value, placeholder, options, className = '', onChange }: Props) => {
  useEffect(() => {
    if (options.length === 1 && value !== options[0].value) {
      onChange(options[0].value)
    }
  }, [options, value, onChange])

  return (
    <FieldWrapper label={label} className={className}>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} ${inputEditable} appearance-none cursor-pointer pr-9 ${value ? 'text-ink-primary' : 'text-ink-tertiary'}`}
        style={{
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
