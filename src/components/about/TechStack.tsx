import {
  Code,
  FileCode,
  Zap,
  Palette,
  Server,
  Database,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib'
import type { TechStackItem } from '@/data/about'

interface TechStackProps {
  items: TechStackItem[]
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  Code,
  FileCode,
  Zap,
  Palette,
  Server,
  Database,
}

export default function TechStack({ items, className }: TechStackProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-px border border-[var(--border-line)] bg-[var(--border-line)] sm:grid-cols-3', className)}>
      {items.map((item, index) => {
        const Icon = iconMap[item.iconName] || Code

        return (
          <div
            key={item.name}
            className="group bg-[var(--paper)] px-3 py-3 transition-colors hover:bg-[var(--surface-subtle)]"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--graphite-muted)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <Icon className="h-4 w-4 text-[var(--graphite-muted)] transition-colors group-hover:text-[var(--graphite)]" />
            </div>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--graphite)]">
              {item.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
