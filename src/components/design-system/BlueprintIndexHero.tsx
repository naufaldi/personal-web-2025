import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import FadeInUp from '@/components/common/FadeInUp'
import DrawingFrame from '@/components/design-system/DrawingFrame'
import MetadataRow from '@/components/design-system/MetadataRow'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import { cn } from '@/lib'

interface IndexStat {
  label: string
  value: string | number
}

interface BlueprintIndexHeroProps {
  eyebrow: string
  title: ReactNode
  titleId: string
  description: string
  stats: IndexStat[]
  latestLabel?: string
  latestValue?: string
  statusLabel: string
  metadata: string[]
  actionHref?: string
  actionLabel?: string
  graphLabel?: string
  graph?: ReactNode
  className?: string
}

export default function BlueprintIndexHero({
  eyebrow,
  title,
  titleId,
  description,
  stats,
  latestLabel,
  latestValue,
  statusLabel,
  metadata,
  actionHref,
  actionLabel = 'View index',
  graphLabel,
  graph,
  className,
}: BlueprintIndexHeroProps) {
  return (
    <DrawingFrame
      className={cn('min-h-[calc(76dvh-72px)]', className)}
      innerClassName="min-h-[calc(76dvh-72px)]"
    >
      <div className="pointer-events-none absolute inset-x-5 top-10 bottom-10 hidden md:block">
        <div className="absolute left-[8%] right-[8%] top-[24%] border-t border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[8%] right-[8%] bottom-[24%] border-t border-[var(--border-line)]" />
        <div className="absolute left-[8%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[62%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <div className="absolute right-[9%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <span className="coordinate-label absolute left-[8%] top-8">X-1440</span>
        <span className="coordinate-label absolute left-[62%] top-8">X-640</span>
        <span className="coordinate-label absolute right-[8%] top-8">X-0</span>
      </div>

      <section
        className="grid min-h-[calc(76dvh-72px)] items-center py-16 md:py-20"
        aria-labelledby={titleId}
      >
        <FadeInUp delay={0.1}>
          <div className="relative mx-auto w-full max-w-[1180px] border border-[var(--border-line)] bg-[var(--paper)]/70 p-5 shadow-[var(--shadow-paper-xs)] md:p-8">
            <div
              className="absolute left-0 top-0 h-px w-32 bg-[var(--status-green)]"
              aria-hidden="true"
            />

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="min-w-0 space-y-7">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-[var(--border-dashed)] pb-5">
                  <TechnicalLabel variant="mono">01 // {eyebrow}</TechnicalLabel>
                  <TechnicalLabel variant="status">{statusLabel}</TechnicalLabel>
                </div>

                <div className="border border-[var(--border-line)] bg-[var(--paper)] px-4 py-5 md:px-6 md:py-7">
                  <h1
                    id={titleId}
                    className="font-display text-[clamp(3.1rem,6.8vw,7.15rem)] font-black uppercase leading-[0.86] tracking-normal text-[var(--graphite)]"
                  >
                    {title}
                  </h1>
                </div>

                <div className="max-w-2xl md:pl-6">
                  <p className="text-body-readable max-w-2xl">{description}</p>
                </div>
              </div>

              <aside
                className="border-t border-[var(--border-line)] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
                aria-label={`${eyebrow} metadata`}
              >
                <div className="grid grid-cols-2 border border-[var(--border-line)]">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div
                      key={stat.label}
                      className={cn('p-4', index === 0 && 'border-r border-[var(--border-line)]')}
                    >
                      <TechnicalLabel>{stat.label}</TechnicalLabel>
                      <p className="mt-4 font-mono text-3xl text-[var(--graphite)]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                  {latestLabel && latestValue && (
                    <div className="col-span-2 border-t border-[var(--border-line)] p-4">
                      <TechnicalLabel>{latestLabel}</TechnicalLabel>
                      <p className="mt-4 font-mono text-sm uppercase tracking-[0.16em] text-[var(--graphite)]">
                        {latestValue}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-4">
                  <MetadataRow items={metadata} />
                  {actionHref && (
                    <a
                      href={actionHref}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite)] transition-colors hover:text-[var(--status-green)]"
                    >
                      {actionLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>

                {graph && (
                  <div className="mt-8 hidden border border-dashed border-[var(--border-dashed)] p-4 lg:block">
                    {graphLabel && <div className="mb-4 text-drawing-label">{graphLabel}</div>}
                    <div className="aspect-square overflow-hidden">{graph}</div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </FadeInUp>
      </section>
    </DrawingFrame>
  )
}
