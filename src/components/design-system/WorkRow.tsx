import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib'
import DividerRow from './DividerRow'
import { TechnicalLabel } from './TechnicalLabel'
import type { PortfolioItem } from '@/data/portfolio'

interface WorkRowProps {
  item: PortfolioItem
  index: number
}

export default function WorkRow({ item, index }: WorkRowProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const rowNumber = String(index + 1).padStart(2, '0')
  const headingId = `work-${item.id}-heading`
  const projectType = item.type === 'blog' ? 'Writing' : 'Project'
  const displayDate = item.date ? item.date.slice(0, 4) : 'Live'

  return (
    <DividerRow aria-labelledby={headingId} className="relative overflow-hidden py-7 md:py-8">
      <div
        aria-hidden="true"
        className="absolute left-[112px] top-8 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[var(--border-dashed)] bg-[var(--paper)] transition-colors group-hover/row:border-[var(--graphite-muted)] md:block lg:left-36"
      />

      <div className="relative grid gap-5 md:grid-cols-[112px_minmax(0,1fr)_minmax(260px,380px)] md:items-start lg:grid-cols-[144px_minmax(0,1fr)_minmax(320px,430px)]">
        <div className="text-drawing-label">{rowNumber} // WORK</div>

        <div className="max-w-3xl space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <TechnicalLabel variant="mono">{projectType}</TechnicalLabel>
              <TechnicalLabel variant="outline">{displayDate}</TechnicalLabel>
            </div>

            <h3
              id={headingId}
              className="max-w-3xl font-mono text-2xl font-medium leading-tight text-[var(--graphite)] md:text-3xl"
            >
              {item.title}
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-[var(--graphite-muted)] md:text-base">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Technology stack">
            {item.techStack.slice(0, 5).map((tech) => (
              <TechnicalLabel key={tech} variant="outline">
                {tech}
              </TechnicalLabel>
            ))}
            {item.techStack.length > 5 && (
              <TechnicalLabel variant="outline">+{item.techStack.length - 5}</TechnicalLabel>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="viewport-frame drawing-grid relative aspect-[16/9] overflow-hidden bg-[var(--paper)]">
            {imageFailed ? (
              <div className="flex h-full items-center justify-center px-6 text-center font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite-muted)]">
                {item.title}
              </div>
            ) : (
              <img
                src={item.image}
                alt={`${item.title} project preview`}
                className={cn(
                  'h-full w-full object-cover grayscale transition duration-300 group-hover/row:opacity-100 group-hover/row:grayscale-0',
                  'opacity-70',
                )}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            )}
            <span className="coordinate-label absolute left-3 top-3">PREVIEW</span>
            <span className="coordinate-label absolute bottom-3 right-3">WORK_{rowNumber}</span>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[var(--border-line)] pt-3">
            <span className="text-drawing-label">ROUTE_PROJECT</span>
            <Button asChild variant="technical" className="w-fit">
              <Link to={`/projects/${item.slug}`}>
                Brief
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DividerRow>
  )
}
