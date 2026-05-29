

import { ReactNode, useState, useEffect } from 'react'
import { useIsDesktop } from '../hooks'
import Icon from './icon'
import Skeleton from './skeleton'

interface MasterDetailProps {
  /** Page title */
  title: string
  /** Page icon name */
  icon?: string
  /** The list/master panel content */
  list: ReactNode
  /** The detail panel content (shown when item selected) */
  detail: ReactNode | null
  /** Whether an item is currently selected */
  hasSelection: boolean
  /** Width of sidebar on desktop (default: 280px) */
  sidebarWidth?: number
  /** Action buttons shown in sidebar title area (desktop) - e.g., "Add new" button */
  actions?: ReactNode
  /** Header content for the sidebar (filter, sort, etc) - only shown on desktop */
  sidebarHeader?: ReactNode
  /** Footer content for the sidebar (paginator, etc) - only shown on desktop */
  sidebarFooter?: ReactNode
  /** Toolbar content for mobile header */
  mobileTbar?: ReactNode
  /** Extension content for mobile (sort options, etc) */
  mobileExtension?: ReactNode
  /** Items array for auto-selection. Must have 'id' field. First item auto-selected on desktop. */
  items?: readonly { id: string | number }[]
  /** Called when an item is auto-selected (first item on desktop load) */
  onSelect?: (id: string | number) => void
  /** Detail loading placeholder */
  detailLoading?: ReactNode
}

/**
 * Responsive master-detail layout component.
 *
 * Desktop (≥1024px landscape): Full left-to-right layout
 *   - Sidebar with title, controls, list, paginator
 *   - Detail panel with rounded corners
 *
 * Mobile/Tablet: Traditional header + full-page switching
 *
 * Auto-selection: Pass `items` and `onSelect` to automatically select the first
 * item on desktop. The detail panel should never be empty if data exists.
 */
export default function MasterDetail({
  title,
  icon,
  list,
  detail,
  hasSelection,
  sidebarWidth = 280,
  actions,
  sidebarHeader,
  sidebarFooter,
  mobileTbar,
  items,
  onSelect,
  detailLoading,
}: MasterDetailProps) {
  const isDesktop = useIsDesktop()
  const [showControls, setShowControls] = useState(false)

  // Auto-select first item on desktop when nothing is selected
  useEffect(() => {
    if (isDesktop && !hasSelection && items?.length && onSelect) {
      onSelect(items[0].id)
    }
  }, [isDesktop, hasSelection, items, onSelect])

  const hasControls = sidebarHeader || sidebarFooter
  const hasItems = (items?.length ?? 0) > 0
  const isInitialLoading = items === undefined
  const detailLoadingContent = detailLoading ?? (
    <div className="h-full flex flex-col gap-6 p-6 bg-gradient-to-br from-theme-50 to-white">
      <div className="space-y-2">
        <div className="animate-shimmer rounded h-5 w-40" />
        <div className="animate-shimmer rounded h-3 w-24" />
      </div>
      <Skeleton.Form rows={5} />
    </div>
  )

  // Desktop: full left-to-right layout
  if (isDesktop) {
    return (
      <div className="h-full flex rounded-xl overflow-hidden">
        {/* Sidebar - dark theme with title integrated */}
        <div
          className="h-full flex-shrink-0 flex flex-col bg-gradient-to-b from-theme-700 to-theme-800"
          style={{ width: sidebarWidth }}
        >
          {/* Title + Actions */}
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3">
              {icon && <Icon name={icon} size={22} className="text-white/80" />}
              <span className="text-lg font-bold uppercase tracking-wide text-white">{title}</span>
            </div>
            {actions && <div className="flex-shrink-0">{actions}</div>}
          </div>

          {/* Toggle button for controls */}
          {hasControls && (
            <button
              onClick={() => setShowControls(!showControls)}
              className="flex items-center justify-end h-9 px-4 hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-1.5 text-[11px] text-white/50 uppercase tracking-wider">
                <Icon name={showControls ? 'ChevronUp' : 'SlidersHorizontal'} size={12} />
                Filtros
              </span>
            </button>
          )}

          {/* Sidebar header - collapsible */}
          {showControls && sidebarHeader && (
            <div className="flex-shrink-0 px-4 py-3 border-b border-white/10">{sidebarHeader}</div>
          )}

          {/* Scrollable list */}
          <div className="flex-1 min-h-0 overflow-auto">{list}</div>

          {/* Sidebar footer - always visible */}
          {sidebarFooter && <div className="flex-shrink-0 px-3 py-2">{sidebarFooter}</div>}
        </div>

        {/* Detail panel - rounded, elevated */}
        <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden bg-white rounded-r-xl">
          {hasSelection && detail ? (
            detail
          ) : isInitialLoading ? (
            detailLoadingContent
          ) : hasItems ? (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-theme-50 to-white">
              <div className="text-center">
                <Icon name="MousePointerClick" size={32} className="text-theme-300 mx-auto mb-2" />
                <p className="text-sm text-theme-400">Seleccione un elemento</p>
              </div>
            </div>
          ) : (
            <div className="h-full bg-gradient-to-br from-theme-50 to-white" />
          )}
        </div>
      </div>
    )
  }

  // Mobile/Tablet: Traditional header + full-page view
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Mobile header - only show when no selection (list view) */}
      {!hasSelection && (
        <header className="flex-shrink-0 flex flex-col bg-gradient-to-r from-theme-700 to-theme-600">
          {/* Title row */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-3">
              {icon && <Icon name={icon} size={22} className="text-theme-100 icon-shadow-md" />}
              <span className="text-xl font-bold uppercase tracking-wide text-theme-100 text-shadow-md">
                {title}
              </span>
            </div>
            <div className="flex-1 flex justify-end gap-2">{mobileTbar}</div>
          </div>
          {/* Toggle button for controls - same as desktop */}
          {hasControls && (
            <button
              onClick={() => setShowControls(!showControls)}
              className="flex items-center justify-end h-9 px-4 hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-1.5 text-[11px] text-white/50 uppercase tracking-wider">
                <Icon name={showControls ? 'ChevronUp' : 'SlidersHorizontal'} size={12} />
                Filtros
              </span>
            </button>
          )}
          {/* Controls - collapsible, same as desktop */}
          {showControls && sidebarHeader && (
            <div className="flex-shrink-0 px-4 pt-2 pb-4">{sidebarHeader}</div>
          )}
        </header>
      )}

      {/* Content */}
      <div className="flex-1 min-h-0 bg-white overflow-hidden">
        {hasSelection && detail ? detail : <div className="h-full overflow-auto">{list}</div>}
      </div>
    </div>
  )
}
