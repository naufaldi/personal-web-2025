import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib'

interface DividerRowProps extends ComponentPropsWithoutRef<'article'> {}

export default function DividerRow({ children, className, ...props }: DividerRowProps) {
  return (
    <article
      className={cn(
        'group/row relative border-b border-[var(--border-line)] py-6',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-2 left-3 right-3 bg-[var(--surface-subtle)]/70 opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:left-4 md:right-4"
      />
      <div className="relative">{children}</div>
    </article>
  )
}
