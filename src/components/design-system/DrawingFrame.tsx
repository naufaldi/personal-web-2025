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
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.82)_100%)] dark:bg-[linear-gradient(180deg,rgba(9,10,12,0.58),rgba(9,10,12,0.2)_34%,rgba(9,10,12,0.82)_100%)]" />
      <div className={cn('site-container relative', innerClassName)}>
        {children}
      </div>
    </section>
  )
}
