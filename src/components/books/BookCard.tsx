import { ExternalLink, BookOpen } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Book } from '@/data/books'
import { cn } from '@/lib'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card
      role="article"
      className={cn(
        'group border-slate-800/70 light:border-slate-200/80 bg-slate-900/60 light:bg-white/90 motion-safe:transition-all motion-safe:duration-200 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-white shadow-sm light:shadow overflow-hidden flex flex-col',
      )}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img
          src={book.cover}
          alt={`${book.title} by ${book.author}`}
          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {(book.category === 'currently-reading' || book.recommended) && (
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {book.category === 'currently-reading' && (
              <Badge className="bg-blue-600/90 text-white border-blue-500/50 font-body font-semibold">
                Currently Reading
              </Badge>
            )}
            {book.recommended && (
              <Badge className="bg-emerald-600/90 text-white border-emerald-500/50 font-body font-semibold">
                Recommended
              </Badge>
            )}
          </div>
        )}
      </div>
      <div className="p-4 space-y-3 flex flex-col flex-1">
        <CardHeader className="space-y-1.5 p-0">
          <h3 className="text-base md:text-lg text-slate-100 light:text-slate-900 line-clamp-2 font-mono font-medium">
            {book.title}
          </h3>
          <p className="text-sm text-slate-400 light:text-slate-600 font-body font-medium">
            {book.author}
          </p>
        </CardHeader>
        {book.links && (book.links.amazon || book.links.goodreads || book.links.website) && (
          <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
            {book.links.amazon && (
              <a
                href={book.links.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-600 motion-safe:transition-colors motion-safe:duration-200 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/30 font-body font-medium"
                aria-label={`View ${book.title} on Amazon`}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Amazon
              </a>
            )}
            {book.links.goodreads && (
              <a
                href={book.links.goodreads}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-600 motion-safe:transition-colors motion-safe:duration-200 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/30 font-body font-medium"
                aria-label={`View ${book.title} on Goodreads`}
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Goodreads
              </a>
            )}
            {book.links.website && (
              <a
                href={book.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-600 motion-safe:transition-colors motion-safe:duration-200 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/30 font-body font-medium"
                aria-label={`Visit ${book.title} website`}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Website
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
