import FieldWrapper from './fieldwrapper'
import { FieldProps } from './fieldprops'

interface ComputedFieldProps extends Omit<FieldProps<string>, 'onChange' | 'readOnly' | 'placeholder'> {
  suffix?: string
}

const ComputedField = ({ label, tooltip, value = '', suffix, className, visible }: ComputedFieldProps) => (
  <FieldWrapper label={label} tooltip={tooltip} className={className} visible={visible}>
    <div className="relative">
      <div className={`border border-dashed border-edge-subtle/30 rounded-xl w-full text-sm px-3 py-2 ${suffix ? '!pr-9' : ''} tabular-nums bg-surface-0 text-ink-primary font-medium cursor-default select-none`}>
        {value}
      </div>
      {suffix && (
        <span aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 pl-1 text-xs leading-none text-ink-tertiary pointer-events-none select-none">
          {suffix}
        </span>
      )}
    </div>
  </FieldWrapper>
)

export default ComputedField
