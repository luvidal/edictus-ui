import FieldWrapper from './fieldwrapper'
import { FieldProps } from './fieldprops'
import { inputBase, inputEditable, inputReadOnly } from './inputstyles'

interface NumberFieldProps extends FieldProps<number> {
  suffix?: string
  step?: string
}

const NumberField = ({
  label,
  tooltip,
  value,
  onChange,
  suffix,
  step = 'any',
  readOnly,
  className,
  visible,
}: NumberFieldProps) => (
  <FieldWrapper label={label} tooltip={tooltip} className={className} visible={visible}>
    <div className="relative">
      <input
        type="number"
        step={step}
        value={value ?? ''}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : undefined}
        onChange={readOnly ? undefined : e => {
          const raw = e.target.value
          onChange?.(raw === '' ? undefined : Number(raw))
        }}
        className={`${inputBase} ${suffix ? '!pr-9' : ''} tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
          readOnly ? inputReadOnly : inputEditable
        }`}
      />
      {suffix && (
        <span aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 pl-1 text-xs leading-none text-ink-tertiary pointer-events-none select-none">
          {suffix}
        </span>
      )}
    </div>
  </FieldWrapper>
)

export default NumberField
