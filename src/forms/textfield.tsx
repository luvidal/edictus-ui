import { useState, useEffect } from 'react'
import Icon from '../common/icon'
import FieldWrapper from './fieldwrapper'
import { FieldProps } from './fieldprops'
import { inputBase, inputEditable, inputReadOnly } from './inputstyles'

interface Props extends Omit<FieldProps<string>, 'onChange'> {
  /** TextField commits a sanitized string — never undefined. */
  onChange?: (v: string) => void
  fullWidth?: boolean
  icon?: string
  onIconClick?: () => void
  suffix?: string
  inputClassName?: string
}

type TextFieldProps = Props & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'readOnly'>

const sanitizeValue = (s: any) => String(s || '')
  .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
  .replace(/[\u00A0\u1680\u180E\u2000-\u200D\u2028-\u202F\u205F\u2060\u3000\uFEFF]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const TextField = ({
  label,
  tooltip,
  value = '',
  onChange,
  readOnly,
  placeholder,
  className = '',
  visible,
  fullWidth,
  icon,
  onIconClick,
  suffix,
  inputClassName = '',
  ...rest
}: TextFieldProps) => {
  const [localValue, setLocalValue] = useState(value)
  const [cleanValue, setCleanValue] = useState(() => sanitizeValue(value))

  useEffect(() => {
    setLocalValue(value)
    setCleanValue(sanitizeValue(value))
  }, [value])

  const commit = () => {
    const sanitized = sanitizeValue(localValue)
    setLocalValue(sanitized)
    if (sanitized !== cleanValue) onChange?.(sanitized)
  }

  const hasSuffix = !!suffix
  const hasIcon = !!icon && !hasSuffix
  const isInteractive = hasIcon && !!onIconClick
  const wrapperClass = `${fullWidth ? 'col-span-2' : ''} ${className}`.trim()

  return (
    <FieldWrapper label={label} tooltip={tooltip} className={wrapperClass} visible={visible}>
      <div className="relative">
        <input
          {...rest}
          type="text"
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : undefined}
          placeholder={readOnly ? undefined : placeholder}
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
          onBlur={commit}
          onKeyDown={e => e.key === 'Enter' && commit()}
          className={`${inputBase} ${hasSuffix ? '!pr-9' : hasIcon ? 'pr-8' : ''} ${readOnly ? inputReadOnly : inputEditable} ${inputClassName}`}
        />
        {hasSuffix && (
          <span aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 pl-1 text-xs leading-none text-ink-tertiary pointer-events-none select-none">
            {suffix}
          </span>
        )}
        {hasIcon && isInteractive && (
          <button
            onClick={onIconClick}
            tabIndex={-1}
            type="button"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-surface-2 transition-colors"
          >
            <Icon name={icon!} size={14} className="text-ink-tertiary hover:text-ink-secondary" />
          </button>
        )}
        {hasIcon && !isInteractive && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name={icon!} size={14} className="text-ink-tertiary/60" />
          </span>
        )}
      </div>
    </FieldWrapper>
  )
}

export default TextField
