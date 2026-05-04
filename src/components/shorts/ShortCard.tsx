import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import type { Short } from '@/data/shorts'
import { cn } from '@/lib'

interface ShortCardProps {
  short: Short
  index: number
}

const getExcerpt = (content: string) =>
  content
    .replace(/[#>*_`-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140)

export default function ShortCard({ short, index }: ShortCardProps) {
  return (
    <article
      className={cn(
        'group flex min-h-[260px] flex-col border border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-xs)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]',
      )}
    >
      <Link
        to={`/shorts/${short.slug}`}
        className="flex h-full flex-1 flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)] md:p-6"
        aria-label={`View ${short.title}`}
      >
        <div className="mb-8 flex items-center justify-between">
          <TechnicalLabel>{String(index + 1).padStart(2, '0')}</TechnicalLabel>
          <ArrowUpRight
            className="h-4 w-4 text-[var(--graphite-muted)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--graphite)]"
            aria-hidden="true"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-xl font-medium leading-tight text-[var(--graphite)] md:text-2xl">
            {short.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-[var(--graphite-muted)]">
            {getExcerpt(short.content)}
          </p>
        </div>

        {short.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
            {short.tags.slice(0, 3).map((tag) => (
              <TechnicalLabel key={tag} variant="outline">
                {tag}
              </TechnicalLabel>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}
