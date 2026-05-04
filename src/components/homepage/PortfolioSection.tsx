import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { portfolioItems } from '@/data/portfolio'
import WorkRow from '@/components/design-system/WorkRow'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import FadeInUp from '@/components/common/FadeInUp'
import { Button } from '@/components/ui/button'

export default function PortfolioSection() {
  const featuredItems = portfolioItems.slice(0, 4)
  const projectSignals = [
    {
      label: 'WORK_INDEX',
      value: `${featuredItems.length} featured`,
      detail: 'Selected recent builds',
    },
    {
      label: 'SYSTEM_SCOPE',
      value: 'Product systems',
      detail: 'Interfaces, APIs, data flow, and workflow tools',
    },
    {
      label: 'PRIMARY_OUTPUT',
      value: 'Working software',
      detail: 'Shipped systems shaped around practical workflows',
    },
  ]

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-[var(--paper)] py-16 md:py-24">
      <div className="site-container">
        <FadeInUp delay={0.06}>
          <SectionHeader
            number="03"
            label="PORTFOLIO_WORK_ROW"
            title="Portfolio"
            titleId="projects-heading"
            description="Selected products, systems, and experiments showing the move from interface craft toward broader software engineering."
            action={
              <Button asChild variant="technical">
                <Link to="/projects">
                  View all projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          />
        </FadeInUp>

        <FadeInUp delay={0.12}>
          <div className="mt-8 grid gap-px border-y border-[var(--border-line)] bg-[var(--border-line)] md:grid-cols-3">
            {projectSignals.map((signal, index) => (
              <div key={signal.label} className="bg-[var(--paper)] px-4 py-4 md:px-5">
                <div className="text-drawing-label">
                  {String(index + 1).padStart(2, '0')} // {signal.label}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xl font-medium leading-none text-[var(--graphite)] md:text-2xl">
                      {signal.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--graphite-muted)]">
                      {signal.detail}
                    </p>
                  </div>
                  {signal.label === 'WORK_INDEX' && (
                    <TechnicalLabel variant="mono" className="mt-1">
                      Live
                    </TechnicalLabel>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.18}>
          <div className="relative mt-8 border-t border-[var(--border-line)] bg-[var(--paper)]/72">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[112px] top-0 hidden h-full border-l border-dashed border-[var(--border-dashed)] md:block lg:left-36"
            />
            {featuredItems.map((item, index) => (
              <WorkRow key={item.id} item={item} index={index} />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
