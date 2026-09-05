import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { featuredPortfolioItems } from '@/data/portfolio'
import WorkRow from '@/components/design-system/WorkRow'
import SectionHeader from '@/components/design-system/SectionHeader'
import FadeInUp from '@/components/common/FadeInUp'
import { StaggerGroup, StaggerItem } from '@/components/common/StaggerGroup'
import { Button } from '@/components/ui/button'

export default function PortfolioSection() {
  const featuredItems = featuredPortfolioItems
  const projectSignals = [
    {
      label: 'WORK_INDEX',
      value: `${featuredItems.length} featured`,
      detail: 'Selected for depth, not release date',
    },
    {
      label: 'SYSTEM_SCOPE',
      value: 'Product systems',
      detail: 'Interfaces, APIs, data flow, and workflow tools',
    },
    {
      label: 'PRIMARY_OUTPUT',
      value: 'Decisions and evidence',
      detail: 'What I built, how I checked it, and what remains',
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
            description="I build interfaces, APIs, and the data flows behind them. These projects show the decisions, failure cases, and checks that shaped my work."
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
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>

        <StaggerGroup
          className="relative mt-8 border-t border-[var(--border-line)] bg-[var(--paper)]/72"
          initialDelay={0.05}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[112px] top-0 hidden h-full border-l border-dashed border-[var(--border-dashed)] md:block lg:left-36"
          />
          {featuredItems.map((item, index) => (
            <StaggerItem key={item.id}>
              <WorkRow item={item} index={index} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
