import { BookOpen, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import type { Book } from '@/data/books'
import { cn } from '@/lib'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const statusLabel =
    book.category === 'currently-reading'
      ? 'Currently reading'
      : book.recommended
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
          src={book.cover}
          alt={`${book.title} by ${book.author}`}
          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {statusLabel && (
          <div className="absolute right-3 top-3 bg-[var(--paper)] px-2 py-1 shadow-[var(--shadow-paper-xs)]">
            <TechnicalLabel variant={book.recommended ? 'status' : 'mono'}>
              {statusLabel}
            </TechnicalLabel>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-4 border-t border-[var(--border-line)] p-4">
        <div className="space-y-1.5">
          <h3 className="line-clamp-2 font-mono text-base font-medium text-[var(--graphite)] md:text-lg">
            {book.title}
          </h3>
          <p className="text-sm font-medium text-[var(--graphite-muted)]">
            {book.author}
          </p>
        </div>

        {book.links && (book.links.amazon || book.links.goodreads || book.links.website) && (
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {book.links.amazon && (
              <Button asChild variant="technical" size="sm">
                <a
                  href={book.links.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${book.title} on Amazon`}
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  Amazon
                </a>
              </Button>
            )}
            {book.links.goodreads && (
              <Button asChild variant="technical" size="sm">
                <a
                  href={book.links.goodreads}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${book.title} on Goodreads`}
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Goodreads
                </a>
              </Button>
            )}
            {book.links.website && (
              <Button asChild variant="technical" size="sm">
                <a
                  href={book.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${book.title} website`}
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
