import type { ReactNode } from 'react'
import { cn } from '@/lib'

interface TechnicalLabelProps {
  children: ReactNode
  className?: string
  variant?: 'mono' | 'status' | 'outline'
}

export function TechnicalLabel({
  children,
  className,
  variant = 'mono',
}: TechnicalLabelProps) {
  return (
    <span
      className={cn(
        'mono-label inline-flex items-center gap-2 text-[11px] leading-none text-[var(--graphite-muted)]',
        variant === 'status' &&
          'text-[var(--status-green)] before:h-2 before:w-2 before:rounded-full before:bg-[var(--status-green)]',
        variant === 'outline' &&
          'border border-dashed border-[var(--border-dashed)] px-2 py-1 text-[var(--graphite-muted)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
