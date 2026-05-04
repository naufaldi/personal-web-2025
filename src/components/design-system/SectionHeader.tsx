import type { ReactNode } from 'react'
import { cn } from '@/lib'

interface SectionHeaderProps {
  number: string
  label: string
  title: string
  titleId?: string
  description?: string
  action?: ReactNode
  className?: string
}

export default function SectionHeader({
  number,
  label,
  title,
  titleId,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('section-rule grid gap-5 pt-5 md:grid-cols-[minmax(0,1fr)_auto]', className)}>
      <div className="space-y-4">
        <div className="text-drawing-label">
          {number} // {label}
        </div>
        <div className="space-y-2">
          <h2 id={titleId} className="text-section-title text-[var(--graphite)]">{title}</h2>
          {description && <p className="text-body-readable">{description}</p>}
        </div>
      </div>
      {action && <div className="self-end">{action}</div>}
    </div>
  )
}
