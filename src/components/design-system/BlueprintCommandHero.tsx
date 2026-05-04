import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import FadeInUp from '@/components/common/FadeInUp'
import DrawingFrame from '@/components/design-system/DrawingFrame'
import MetadataRow from '@/components/design-system/MetadataRow'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

interface CommandRoute {
  index: string
  label: string
  href: string
  icon?: ReactNode
}

interface BlueprintCommandHeroProps {
  eyebrow: string
  title: string
  titleId: string
  subtitle: string
  description: string
  metadata: string[]
  routes: CommandRoute[]
  footerMetadata: string[]
  statusLabel: string
}

export default function BlueprintCommandHero({
  eyebrow,
  title,
  titleId,
  subtitle,
  description,
  metadata,
  routes,
  footerMetadata,
  statusLabel,
}: BlueprintCommandHeroProps) {
  return (
    <DrawingFrame
      className="min-h-[calc(82dvh-72px)]"
      innerClassName="min-h-[calc(82dvh-72px)]"
    >
      <div className="pointer-events-none absolute inset-x-5 top-10 bottom-10 hidden md:block">
        <div className="absolute left-[8%] right-[8%] top-[22%] border-t border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[8%] right-[8%] bottom-[22%] border-t border-[var(--border-line)]" />
        <div className="absolute left-[8%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[58%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <div className="absolute right-[9%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <span className="coordinate-label absolute left-[8%] top-8">X-1440</span>
        <span className="coordinate-label absolute left-[58%] top-8">X-768</span>
        <span className="coordinate-label absolute right-[8%] top-8">X-0</span>
      </div>

      <section
        className="grid min-h-[calc(82dvh-72px)] items-center py-16 md:py-20"
        aria-labelledby={titleId}
      >
        <FadeInUp delay={0.1}>
          <div className="relative mx-auto w-full max-w-[1180px] border border-[var(--border-line)] bg-[var(--paper)]/70 p-5 shadow-[var(--shadow-paper-xs)] md:p-8">
            <div
              className="absolute left-0 top-0 h-px w-32 bg-[var(--status-green)]"
              aria-hidden="true"
            />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="space-y-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <TechnicalLabel variant="mono">01 // {eyebrow}</TechnicalLabel>
                  <TechnicalLabel variant="status">{statusLabel}</TechnicalLabel>
                </div>

                <div className="border border-[var(--border-line)] bg-[var(--paper)] px-4 py-5 md:px-6 md:py-7">
                  <h1
                    id={titleId}
                    className="font-display text-[clamp(3.15rem,7.4vw,7.7rem)] font-black uppercase leading-[0.86] tracking-normal text-[var(--graphite)]"
                  >
                    {title}
                  </h1>
                </div>

                <div className="max-w-2xl space-y-4 md:pl-6">
                  <h2 className="font-mono text-2xl leading-tight text-[var(--graphite)] md:text-3xl">
                    {subtitle}
                  </h2>
                  <MetadataRow items={metadata} />
                  <p className="text-body-readable">{description}</p>
                </div>
              </div>

              <aside
                className="border-t border-[var(--border-line)] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
                aria-label={`${eyebrow} routes`}
              >
                <TechnicalLabel variant="mono">02 // ROUTES</TechnicalLabel>
                <div className="mt-8 divide-y divide-[var(--border-line)] border-y border-[var(--border-line)]">
                  {routes.map((route, index) => (
                    <a
                      key={route.label}
                      href={route.href}
                      className={
                        index === 0
                          ? 'group flex items-center justify-between gap-4 border-l-2 border-l-[var(--status-green)] bg-[var(--graphite)] px-4 py-4 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--graphite-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]'
                          : 'group flex items-center justify-between gap-4 border-l-2 border-l-transparent bg-[var(--paper)] px-4 py-4 text-sm text-[var(--graphite)] transition-colors hover:border-l-[var(--status-green)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]'
                      }
                    >
                      <span className="grid gap-3">
                        <span
                          className={
                            index === 0
                              ? 'font-mono text-[11px] tracking-[0.14em] text-[var(--status-green)]'
                              : 'text-drawing-label'
                          }
                        >
                          {route.index}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          {route.icon}
                          {route.label}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </aside>
            </div>

            <div className="mt-9 border-t border-[var(--border-line)] pt-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <MetadataRow items={footerMetadata} />
                <TechnicalLabel variant="mono">BUILD:2026</TechnicalLabel>
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>
    </DrawingFrame>
  )
}
