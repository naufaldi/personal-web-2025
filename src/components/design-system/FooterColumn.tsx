import type { ReactNode } from 'react'
import { cn } from '@/lib'

interface FooterColumnProps {
  title: string
  children: ReactNode
  className?: string
}

export default function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <nav className={cn('space-y-4', className)} aria-label={title}>
      <h3 className="text-drawing-label">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </nav>
  )
}
