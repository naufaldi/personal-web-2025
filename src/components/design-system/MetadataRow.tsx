import { cn } from '@/lib'

interface MetadataRowProps {
  items: string[]
  className?: string
}

export default function MetadataRow({ items, className }: MetadataRowProps) {
  return (
    <dl className={cn('flex flex-wrap items-center gap-x-4 gap-y-2 text-meta', className)}>
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-4">
          {index > 0 && <span className="h-3 w-px bg-[var(--border-line)]" aria-hidden="true" />}
          <dt className="sr-only">Metadata</dt>
          <dd>{item}</dd>
        </div>
      ))}
    </dl>
  )
}
