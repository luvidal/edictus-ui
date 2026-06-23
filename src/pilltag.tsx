import Icon from './common/icon'

interface PillTagProps {
    children: React.ReactNode
    grip?: boolean
}

const PillTag = ({ children, grip }: PillTagProps) => (
    <div className='inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-surface-2 border border-edge-subtle/15 text-ink-secondary'>
        {grip && <Icon name='GripVertical' size={12} className='text-ink-tertiary' />}
        <span className='truncate'>{children}</span>
    </div>
)

export default PillTag
