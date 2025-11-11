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
    <div className={cn('flex flex-wrap items-center gap-4', className)}>
      {items.map((item) => {
        const Icon = iconMap[item.iconName] || Code

        return (
          <div
            key={item.name}
            className="flex flex-col items-center gap-2"
            style={{
              animation: 'fade-in 900ms ease-out both',
              animationDelay: `${120 + items.indexOf(item) * 50}ms`,
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/60 transition-colors hover:border-slate-600/80 hover:bg-slate-800/80">
              <Icon className="h-6 w-6 text-slate-300" />
            </div>
            <span
              className="text-xs text-slate-400"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {item.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

