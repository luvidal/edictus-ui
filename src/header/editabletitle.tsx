import { useState, useEffect } from 'react'
import Icon from '../common/icon'

interface EditableTitleProps {
    value: string
    onChange?: (value: string) => void
    className?: string
}

const EditableTitle = ({ value, onChange, className = '' }: EditableTitleProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(value)

    useEffect(() => {
        setEditValue(value)
    }, [value])

    const handleSave = () => {
        if (editValue.trim() && editValue !== value) {
            onChange?.(editValue.trim())
        }
        setIsEditing(false)
    }

    // Check if custom text color is provided via className
    const hasCustomColor = className.includes('text-')

    if (isEditing) {
        return (
            <input
                type='text'
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                onClick={e => e.stopPropagation()}
                className={`font-semibold bg-transparent focus:outline-none focus:ring-0 w-full ${hasCustomColor ? '' : 'text-ink-primary'} ${className}`}
                style={{ padding: 0, border: 'none' }}
                autoFocus
            />
        )
    }

    return (
        <h3
            className={`group/title font-semibold truncate inline-flex items-center gap-1 ${hasCustomColor ? '' : 'text-ink-primary hover:text-theme-600'} ${onChange ? 'cursor-text' : ''} ${className}`}
            onClick={e => { e.stopPropagation(); onChange && setIsEditing(true) }}
            title={onChange ? 'Clic para editar' : undefined}
        >
            {value}
            {onChange && <Icon name='Pencil' size={12} className={`opacity-0 group-hover/title:opacity-100 transition-opacity flex-shrink-0 ${hasCustomColor ? 'text-current' : 'text-ink-tertiary'}`} />}
        </h3>
    )
}

export default EditableTitle
