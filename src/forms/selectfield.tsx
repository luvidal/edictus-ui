import FieldWrapper from './fieldwrapper'
import { FieldProps } from './fieldprops'
import { inputBase, inputEditable, inputReadOnly } from './inputstyles'

interface SelectFieldProps extends FieldProps<string> {
  options: { label: string; value: string }[]
}

const SelectField = ({
  label,
  tooltip,
  value,
  options,
  onChange,
  readOnly,
  placeholder = '—',
  className,
  visible,
}: SelectFieldProps) => (
  <FieldWrapper label={label} tooltip={tooltip} className={className} visible={visible}>
    <select
      value={value ?? ''}
      disabled={readOnly}
      onChange={readOnly ? undefined : e => onChange?.(e.target.value || undefined)}
      className={`${inputBase} ${readOnly ? inputReadOnly : inputEditable}`}
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </FieldWrapper>
)

export default SelectField
