interface ButtonGroupProps {
    children?: React.ReactNode
    className?: string
    /** Visual variant — dark for teal/colored headers, light for white backgrounds */
    variant?: 'dark' | 'light'
}

const ButtonGroup = ({ children, className = '', variant = 'dark' }: ButtonGroupProps) => {
    const bg = variant === 'dark'
        ? 'bg-surface-2'
        : 'bg-surface-2 shadow-token-sm'

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`flex gap-px ${bg} rounded-btn p-px overflow-hidden ${className}`}
        >
            {children}
        </div>
    )
}

export default ButtonGroup
