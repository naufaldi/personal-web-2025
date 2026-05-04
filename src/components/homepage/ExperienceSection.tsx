import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { getLatestExperiences, workExperiences } from '@/data/experience'
import { siteConfig } from '@/data/site'
import ExperienceRow from '@/components/design-system/ExperienceRow'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import FadeInUp from '@/components/common/FadeInUp'
import { Button } from '@/components/ui/button'

export default function ExperienceSection() {
  const latestExperiences = getLatestExperiences(4)
  const currentRole = latestExperiences.find((experience) => experience.endDate === 'Present')
  const experienceSignals = [
    {
      label: 'TIMELINE_SPAN',
      value: siteConfig.stats.experience,
      detail: 'Professional experience',
    },
    {
      label: 'CURRENT_NODE',
      value: currentRole?.companyName ?? 'Available',
      detail: currentRole?.role ?? 'Open to work',
    },
    {
      label: 'ROLE_INDEX',
      value: `${workExperiences.length} roles`,
      detail: 'Product delivery, system ownership, and engineering breadth',
    },
  ]

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-16 md:py-24">
      <div className="site-container">
        <FadeInUp delay={0.06}>
          <SectionHeader
            number="02"
            label="EXPERIENCE_ROW"
            title="Experience"
            titleId="experience-heading"
            description="Evolving into a broader software engineer through product delivery, system ownership, and team collaboration."
            action={
              <Button asChild variant="technical">
                <Link to="/experience">
                  View all experience
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          />
        </FadeInUp>

        <FadeInUp delay={0.12}>
          <div className="mt-8 grid gap-px border-y border-[var(--border-line)] bg-[var(--border-line)] md:grid-cols-3">
            {experienceSignals.map((signal, index) => (
              <div
                key={signal.label}
                className="bg-[var(--paper)] px-4 py-4 md:px-5"
              >
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
                  {signal.label === 'CURRENT_NODE' && (
                    <TechnicalLabel variant="status" className="mt-1">
                      Live
                    </TechnicalLabel>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.18}>
          <div className="relative mt-8 border-t border-[var(--border-line)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[112px] top-0 hidden h-full border-l border-dashed border-[var(--border-dashed)] md:block lg:left-36"
            />
            {latestExperiences.map((experience, index) => (
              <ExperienceRow key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
