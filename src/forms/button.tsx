import Icon from '../common/icon'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
export type ButtonSize = 'sm' | 'md'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string
    text?: string
    /** Shows inline spinner and disables interaction */
    loading?: boolean
    /** Visual style. Default 'primary' (the legacy brand-filled chrome). */
    variant?: ButtonVariant
    /** Height/padding scale. Default 'md' (h-10); 'sm' = h-8. */
    size?: ButtonSize
}

// CHROME per variant — enabled/disabled-IDENTICAL (the disabled DIRECTIVE below
// forbids changing any of it when disabled; only inner content dims). Primary's
// foreground is --brand-on: the per-tenant CTA contrast (white on a saturated
// brand in light, AA-dark in dark, pale-safe), host-computed in lib/branding.
const VARIANT_CHROME: Record<ButtonVariant, string> = {
    primary: 'bg-brand text-brand-on border-transparent shadow-token-sm enabled:hover:bg-brand-hover enabled:hover:shadow-token-md',
    secondary: 'bg-surface-2 text-ink-primary border-transparent shadow-token-sm enabled:hover:bg-surface-3',
    ghost: 'bg-transparent text-ink-secondary border-transparent enabled:hover:bg-surface-2/40',
    danger: 'bg-status-danger text-white border-transparent shadow-token-sm enabled:hover:bg-status-danger/90',
    link: 'bg-transparent text-brand border-transparent underline underline-offset-2 enabled:hover:text-brand-hover',
}
const SIZE_CHROME: Record<ButtonSize, string> = {
    md: 'h-10 px-5 text-sm',
    sm: 'h-8 px-3 text-xs',
}

const Button = ({ icon, text, loading = false, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) => {
    const isDisabled = props.disabled || loading

    // DIRECTIVE: Disabled state never changes the <button>'s bg/border/shadow/ring.
    // Only inner content dims. Keep it legible: no blur, grayscale, filters, or
    // text-shadow. See src/forms/button.README.md for rationale.
    const disabledContent = isDisabled ? 'opacity-70' : ''

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-btn border transition-all duration-200 whitespace-nowrap enabled:active:scale-[0.98] disabled:cursor-not-allowed ${SIZE_CHROME[size]} ${VARIANT_CHROME[variant]} ${className}`}
            {...props}
            disabled={isDisabled}
        >
            {loading ? (
                <svg className={`animate-spin h-4 w-4 text-current ${disabledContent}`} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : (
                icon && <Icon name={icon} size={16} className={`shrink-0 ${disabledContent}`} />
            )}
            {text && <span className={`truncate font-semibold ${disabledContent}`}>{text}</span>}
        </button>
    )
}

export default Button
