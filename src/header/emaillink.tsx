import Icon from '../common/icon'

interface EmailLinkProps {
    label: string
    email?: string
    onClick?: () => void
    className?: string
}

const EmailLink = ({ label, email, onClick, className = '' }: EmailLinkProps) => {
    // Check if custom text color is provided via className
    const hasCustomColor = className.includes('text-')

    return (
        <span
            className={`group/name inline-flex items-center ${hasCustomColor ? '' : 'text-ink-secondary hover:text-theme-600'} ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={e => { e.stopPropagation(); onClick?.() }}
            title={onClick ? (email || 'Enviar correo') : undefined}
        >
            <span className={`truncate ${email ? 'group-hover/name:hidden' : ''}`}>{label}</span>
            {email && <span className='hidden group-hover/name:inline truncate'>{email}</span>}
            {onClick && <Icon name='Mail' size={10} className={`hidden group-hover/name:inline ml-1 flex-shrink-0 ${hasCustomColor ? 'text-current' : 'text-ink-tertiary'}`} />}
        </span>
    )
}

export default EmailLink
