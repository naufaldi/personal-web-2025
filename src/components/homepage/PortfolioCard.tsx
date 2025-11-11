import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { Link } from 'react-router'
import { Card, CardHeader } from '@/components/ui/card'
import { getTechIcon } from '@/lib/techIcons'
import type { PortfolioItem } from '@/data/portfolio'
import { cn } from '@/lib'
import FadeInUp from '@/components/common/FadeInUp'

interface PortfolioCardProps {
  item: PortfolioItem
  index: number
}

export default function PortfolioCard({ item, index }: PortfolioCardProps) {
  return (
    <FadeInUp delay={0.12 + index * 0.1}>
      <Card
        className={cn(
          'group border-slate-800/70 bg-slate-900/60 transition-all duration-200 hover:border-slate-700/70 hover:bg-slate-900/90 overflow-hidden flex flex-col',
        )}
      >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 md:p-5 space-y-2 flex flex-col justify-center">
          <CardHeader className="space-y-1.5 p-0">
            <h3
              className="text-base md:text-lg text-slate-100"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {item.title}
            </h3>
            <p
              className="text-xs md:text-sm text-slate-400"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              {item.description}
            </p>
          </CardHeader>
        </div>
        <div className="relative w-full md:w-56 lg:w-64 flex-shrink-0 h-40 md:h-40">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="border-t border-slate-800/70 p-3 md:p-4 space-y-2">
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
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/projects/${item.slug}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 transition-all duration-200 hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 hover:shadow-md hover:shadow-slate-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
            }}
            aria-label={`View ${item.title} project details`}
          >
            Brief
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 transition-colors hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
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
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 transition-colors hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
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
      </div>
    </Card>
    </FadeInUp>
  )
}

