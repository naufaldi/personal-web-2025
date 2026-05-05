import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib'

export interface RouteRailItem {
  index: string
  label: string
  href: string
  icon?: ReactNode
}

interface RouteRailProps {
  items: RouteRailItem[]
  ariaLabel?: string
}

const baseLinkClassName =
  'motion-button group flex items-center justify-between gap-4 border-l-2 px-4 py-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]'

const activeLinkClassName =
  'border-l-[var(--status-green)] bg-[var(--graphite)] font-medium text-[var(--paper)] hover:bg-[var(--graphite-muted)]'

const inactiveLinkClassName =
  'border-l-transparent bg-[var(--paper)] text-[var(--graphite)] hover:border-l-[var(--status-green)] hover:bg-[var(--surface-subtle)]'

const indexClassName = (isPrimary: boolean): string =>
  isPrimary
    ? 'font-mono text-[11px] tracking-[0.14em] text-[var(--status-green)]'
    : 'text-drawing-label'

const isExternalHref = (href: string): boolean => href.startsWith('http')

export default function RouteRail({ items, ariaLabel }: RouteRailProps) {
  return (
    <div
      className="mt-8 divide-y divide-[var(--border-line)] border-y border-[var(--border-line)]"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const isPrimary = index === 0
        const isExternal = isExternalHref(item.href)

        return (
          <a
            key={item.label}
            href={item.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={cn(
              baseLinkClassName,
              isPrimary ? activeLinkClassName : inactiveLinkClassName,
            )}
          >
            <span className="grid gap-3">
              <span className={indexClassName(isPrimary)}>{item.index}</span>
              <span className="inline-flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        )
      })}
    </div>
  )
}
