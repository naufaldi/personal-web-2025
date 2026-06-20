import type { ReactNode } from 'react'
import { cn } from '@/lib'

interface DrawingFrameProps {
  children: ReactNode
  className?: string
  innerClassName?: string
}

export default function DrawingFrame({
  children,
  className,
  innerClassName,
}: DrawingFrameProps) {
  return (
    <section className={cn('drawing-sheet relative overflow-hidden', className)}>
      <div className="pointer-events-none absolute inset-x-4 top-0 bottom-0 hidden drawing-rail md:block" />
      <div className="pointer-events-none absolute left-[8%] top-0 bottom-0 hidden border-l border-dashed border-[var(--border-dashed)] opacity-70 lg:block" />
      <div className="pointer-events-none absolute right-[8%] top-0 bottom-0 hidden border-l border-dashed border-[var(--border-dashed)] opacity-70 lg:block" />
      <div className="drawing-frame-overlay pointer-events-none absolute inset-0" />
      <div className={cn('site-container relative', innerClassName)}>
        {children}
      </div>
    </section>
  )
}
