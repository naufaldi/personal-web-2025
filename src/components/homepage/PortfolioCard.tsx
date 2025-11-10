import { ExternalLink, Github } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getTechIcon } from '@/lib/techIcons'
import type { PortfolioItem } from '@/data/portfolio'
import { cn } from '@/lib'

interface PortfolioCardProps {
  item: PortfolioItem
  index: number
}

export default function PortfolioCard({ item, index }: PortfolioCardProps) {
  const animationDelay = `${120 + index * 100}ms`

  return (
    <Card
      className={cn(
        'group border-slate-800/70 bg-slate-900/60 transition-all duration-200 hover:border-slate-700/70 hover:bg-slate-900/90',
      )}
      style={{
        animation: 'fade-in 900ms ease-out both',
        animationDelay,
      }}
    >
      <CardHeader className="space-y-3 pb-4">
        <h3
          className="text-lg text-slate-100"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
          }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm text-slate-400"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
          }}
        >
          {item.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="flex flex-wrap items-center gap-2">
          {item.techStack.map((tech) => {
            const Icon = getTechIcon(tech)
            if (!Icon) return null
            return (
              <div
                key={tech}
                className="flex items-center gap-1.5 rounded border border-slate-800/70 bg-slate-900/80 px-2 py-1"
                title={tech}
              >
                <Icon className="h-3.5 w-3.5 text-slate-400" />
                <span
                  className="text-xs text-slate-400"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-2 pt-2">
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
              aria-label={`Visit ${item.title} live website`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Web
            </a>
          )}
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
              aria-label={`View ${item.title} on GitHub`}
            >
              <Github className="h-3.5 w-3.5" />
              Github
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

