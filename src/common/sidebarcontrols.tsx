

import { useState } from 'react'
import Icon from './icon'

interface SidebarFilterProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

/** Compact filter input for the master-detail sidebar */
export function SidebarFilter({ value, onChange, placeholder = 'Filtrar...' }: SidebarFilterProps) {
    return (
        <div className='flex items-center gap-2 bg-surface-2 border border-edge-subtle/30 rounded-btn px-3 h-9'>
            <Icon name='Search' size={14} className='text-ink-tertiary' />
            <input
                type='text'
                defaultValue={value}
                onBlur={e => onChange(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { onChange(e.currentTarget.value); e.currentTarget.blur() } }}
                placeholder={placeholder}
                className='flex-1 min-w-0 bg-transparent text-sm text-ink-primary placeholder:text-ink-tertiary border-none focus:ring-0 outline-none'
            />
        </div>
    )
}

interface SidebarSortProps {
    options: { value: string; label: string }[]
    value: string
    onChange: (value: string) => void
    direction: 'asc' | 'desc'
    onDirectionChange: (dir: 'asc' | 'desc') => void
}

/** Compact sort dropdown for the master-detail sidebar */
export function SidebarSort({ options, value, onChange, direction, onDirectionChange }: SidebarSortProps) {
    return (
        <div className='flex items-center gap-2'>
            <div className='relative flex-1 min-w-0'>
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className='w-full h-8 px-3 pr-8 text-xs bg-surface-2 text-ink-primary rounded-btn border border-edge-subtle/30 focus:ring-1 focus:ring-edge-focus/40 cursor-pointer appearance-none'
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value} className='bg-surface-2 text-ink-primary'>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <Icon
                    name='ChevronDown'
                    size={12}
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none'
                />
            </div>
            <button
                onClick={() => onDirectionChange(direction === 'asc' ? 'desc' : 'asc')}
                className='h-8 w-8 flex items-center justify-center rounded-btn bg-surface-2 border border-edge-subtle/30 hover:bg-surface-3 transition-colors'
                title={direction === 'asc' ? 'Ascendente' : 'Descendente'}
            >
                <Icon
                    name={direction === 'asc' ? 'ArrowUp' : 'ArrowDown'}
                    size={14}
                    className='text-ink-secondary'
                />
            </button>
        </div>
    )
}

interface SidebarPaginatorProps {
    page: number
    setPage: (page: number) => void
    hasNext: boolean
}

/** Compact paginator for the master-detail sidebar - auto-hides when only one page */
export function SidebarPaginator({ page, setPage, hasNext }: SidebarPaginatorProps) {
    const hasPrev = page > 0

    // Hide paginator if on first page with no next page (single page of results)
    if (!hasPrev && !hasNext) return null

    return (
        <div className='flex items-center justify-between'>
            <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={!hasPrev}
                className='h-8 w-8 flex items-center justify-center rounded-btn bg-surface-2 border border-edge-subtle/30 hover:bg-surface-3 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
            >
                <Icon name='ChevronLeft' size={16} className='text-ink-secondary' />
            </button>
            <span className='text-xs text-ink-tertiary'>
                Página {page + 1}
            </span>
            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasNext}
                className='h-8 w-8 flex items-center justify-center rounded-btn bg-surface-2 border border-edge-subtle/30 hover:bg-surface-3 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
            >
                <Icon name='ChevronRight' size={16} className='text-ink-secondary' />
            </button>
        </div>
    )
}

interface SidebarControlsProps {
    // Filter
    search: string
    onSearchChange: (value: string) => void
    // Sort
    sortOptions: { value: string; label: string }[]
    sortBy: string
    onSortChange: (value: string) => void
    sortDir: 'asc' | 'desc'
    onSortDirChange: (dir: 'asc' | 'desc') => void
}

/** Collapsible sidebar controls - filter and sort */
export default function SidebarControls({
    search,
    onSearchChange,
    sortOptions,
    sortBy,
    onSortChange,
    sortDir,
    onSortDirChange
}: SidebarControlsProps) {
    const [expanded, setExpanded] = useState(false)

    const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label || sortBy

    return (
        <div className='flex flex-col'>
            {/* Collapsed: show summary bar */}
            <button
                onClick={() => setExpanded(!expanded)}
                className='flex items-center justify-between gap-2 h-9 px-3 rounded-btn bg-surface-2 border border-edge-subtle/30 hover:bg-surface-3 transition-colors'
            >
                <div className='flex items-center gap-2 min-w-0'>
                    <Icon name='SlidersHorizontal' size={14} className='text-ink-tertiary flex-shrink-0' />
                    <span className='text-xs text-ink-secondary truncate'>
                        {search ? `"${search}"` : currentSortLabel}
                        {search && ` · ${currentSortLabel}`}
                    </span>
                </div>
                <Icon
                    name={expanded ? 'ChevronUp' : 'ChevronDown'}
                    size={14}
                    className='text-ink-tertiary flex-shrink-0'
                />
            </button>

            {/* Expanded: show full controls */}
            {expanded && (
                <div className='flex flex-col gap-2 mt-2'>
                    <SidebarFilter value={search} onChange={onSearchChange} />
                    <SidebarSort
                        options={sortOptions}
                        value={sortBy}
                        onChange={onSortChange}
                        direction={sortDir}
                        onDirectionChange={onSortDirChange}
                    />
                </div>
            )}
        </div>
    )
}
