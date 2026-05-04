import { BookOpen, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import type { Manhwa } from '@/data/manhwa'
import { cn } from '@/lib'

interface ManhwaCardProps {
  manhwa: Manhwa
}

export default function ManhwaCard({ manhwa }: ManhwaCardProps) {
  const statusLabel =
    manhwa.category === 'currently-reading'
      ? 'Currently reading'
      : manhwa.category === 'recommended'
        ? 'Recommended'
        : undefined

  return (
    <article
      role="article"
      className={cn(
        'group flex h-full flex-col border border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-xs)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]',
      )}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[var(--surface-subtle)]">
        <img
          src={manhwa.cover}
          alt={`${manhwa.title} by ${manhwa.author}`}
          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {statusLabel && (
          <div className="absolute right-3 top-3 bg-[var(--paper)] px-2 py-1 shadow-[var(--shadow-paper-xs)]">
            <TechnicalLabel
              variant={manhwa.category === 'recommended' ? 'status' : 'mono'}
            >
              {statusLabel}
            </TechnicalLabel>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-4 border-t border-[var(--border-line)] p-4">
        <div className="space-y-1.5">
          <h3 className="line-clamp-2 font-mono text-base font-medium text-[var(--graphite)] md:text-lg">
            {manhwa.title}
          </h3>
          <p className="text-sm font-medium text-[var(--graphite-muted)]">
            {manhwa.author}
          </p>
        </div>

        {(manhwa.genre || manhwa.status) && (
          <div className="flex flex-wrap items-center gap-2">
            {manhwa.genre && (
              <TechnicalLabel variant="outline">{manhwa.genre}</TechnicalLabel>
            )}
            {manhwa.status && (
              <TechnicalLabel variant="outline">{manhwa.status}</TechnicalLabel>
            )}
          </div>
        )}

        {manhwa.links && (manhwa.links.webtoon || manhwa.links.website) && (
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {manhwa.links.webtoon && (
              <Button asChild variant="technical" size="sm">
                <a
                  href={manhwa.links.webtoon}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${manhwa.title} on Webtoon`}
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Webtoon
                </a>
              </Button>
            )}
            {manhwa.links.website && (
              <Button asChild variant="technical" size="sm">
                <a
                  href={manhwa.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${manhwa.title} website`}
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  Website
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
