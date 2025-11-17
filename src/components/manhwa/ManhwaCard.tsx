import { ExternalLink, BookOpen } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Manhwa } from '@/data/manhwa'
import { cn } from '@/lib'

interface ManhwaCardProps {
  manhwa: Manhwa
  index: number
}

export default function ManhwaCard({ manhwa, index }: ManhwaCardProps) {
  const animationDelay = `${120 + index * 100}ms`

  return (
    <Card
      className={cn(
        'group border-slate-800/70 light:border-slate-200/80 bg-slate-900/60 light:bg-white/90 transition-all duration-200 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-white shadow-sm light:shadow overflow-hidden flex flex-col',
      )}
      style={{
        animation: 'fade-in 900ms ease-out both',
        animationDelay,
      }}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img
          src={manhwa.cover}
          alt={`${manhwa.title} by ${manhwa.author}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {(manhwa.category === 'currently-reading' || manhwa.category === 'recommended') && (
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {manhwa.category === 'currently-reading' && (
              <Badge
                className="bg-blue-600/90 text-white border-blue-500/50"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                }}
              >
                Currently Reading
              </Badge>
            )}
            {manhwa.category === 'recommended' && (
              <Badge
                className="bg-emerald-600/90 text-white border-emerald-500/50"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                }}
              >
                Recommended
              </Badge>
            )}
          </div>
        )}
      </div>
      <div className="p-4 space-y-3 flex flex-col flex-1">
        <CardHeader className="space-y-1.5 p-0">
          <h3
            className="text-base md:text-lg text-slate-100 light:text-slate-900 line-clamp-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
            }}
          >
            {manhwa.title}
          </h3>
          <p
            className="text-sm text-slate-400 light:text-slate-600"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            {manhwa.author}
          </p>
        </CardHeader>
        {(manhwa.genre || manhwa.status) && (
          <div className="flex flex-wrap items-center gap-2">
            {manhwa.genre && (
              <Badge
                variant="outline"
                className="border-slate-700/70 light:border-slate-200 text-slate-300 light:text-slate-600 bg-slate-900/40 light:bg-slate-50"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                {manhwa.genre}
              </Badge>
            )}
            {manhwa.status && (
              <Badge
                variant="outline"
                className="border-slate-700/70 light:border-slate-200 text-slate-300 light:text-slate-600 bg-slate-900/40 light:bg-slate-50"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                {manhwa.status}
              </Badge>
            )}
          </div>
        )}
        {manhwa.links && (manhwa.links.webtoon || manhwa.links.website) && (
          <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
            {manhwa.links.webtoon && (
              <a
                href={manhwa.links.webtoon}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-600 transition-colors hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/30"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
                aria-label={`Read ${manhwa.title} on Webtoon`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Webtoon
              </a>
            )}
            {manhwa.links.website && (
              <a
                href={manhwa.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-600 transition-colors hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/30"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
                aria-label={`Visit ${manhwa.title} website`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Website
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
