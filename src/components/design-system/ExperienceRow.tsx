import type { WorkExperience } from '@/data/experience'
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib'
import DividerRow from './DividerRow'
import { TechnicalLabel } from './TechnicalLabel'

const employmentTypeLabels: Record<WorkExperience['employmentType'], string> = {
  'full-time': 'Full-time',
  freelance: 'Freelance',
  contract: 'Contract',
}

interface ExperienceRowProps {
  experience: WorkExperience
  index: number
}

export default function ExperienceRow({ experience, index }: ExperienceRowProps) {
  const isCurrent = experience.endDate === 'Present'
  const rowNumber = String(index + 1).padStart(2, '0')
  const headingId = `experience-${experience.id}-heading`

  return (
    <DividerRow
      aria-labelledby={headingId}
      className={cn(
        'group relative overflow-hidden py-7 md:py-8',
      )}
    >
      {isCurrent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-2 left-3 right-3 bg-[var(--surface-subtle)]/55 md:left-4 md:right-4"
        />
      )}

      <div
        aria-hidden="true"
        className={cn(
          'absolute left-[112px] top-8 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[var(--border-dashed)] bg-[var(--paper)] md:block lg:left-36',
          isCurrent && 'border-[var(--status-green)] bg-[var(--status-green)]',
        )}
      />

      <div className="relative grid gap-5 md:grid-cols-[112px_minmax(0,1fr)_minmax(220px,320px)] md:items-start lg:grid-cols-[144px_minmax(0,1fr)_minmax(240px,360px)]">
        <div className="text-drawing-label">
          <span>{rowNumber} // ROLE</span>
          {isCurrent && (
            <span
              aria-hidden="true"
              className="ml-3 inline-block h-2 w-2 rounded-full bg-[var(--status-green)] md:hidden"
            />
          )}
        </div>

        <div className="max-w-3xl space-y-5">
          <div className="space-y-1">
            <h3
              id={headingId}
              className="font-mono text-2xl font-medium leading-tight text-[var(--graphite)] md:text-3xl"
            >
              {experience.companyName}
            </h3>
            <p className="text-sm font-medium text-[var(--graphite-muted)]">{experience.role}</p>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-[var(--graphite-muted)] md:text-base">
            {experience.description}
          </p>
        </div>

        <div className="space-y-4 md:text-right">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {isCurrent && <TechnicalLabel variant="status">Current</TechnicalLabel>}
            <TechnicalLabel variant="outline">
              {employmentTypeLabels[experience.employmentType]}
            </TechnicalLabel>
          </div>

          <dl className="grid gap-1">
            <dt className="sr-only">Period</dt>
            <dd className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite-muted)]">
              {experience.startDate} - {experience.endDate}
            </dd>
          </dl>

          <div className="flex flex-wrap gap-2 md:justify-end" aria-label="Technology stack">
            {experience.techStack.slice(0, 4).map((tech) => (
              <TechnicalLabel key={tech} variant="outline">
                {tech}
              </TechnicalLabel>
            ))}
          </div>
        </div>

        {experience.achievements.length > 0 && (
          <div className="md:col-span-2 md:col-start-2">
            <Accordion className="w-full">
              <AccordionTrigger
                aria-label={`Toggle key achievements for ${experience.companyName}`}
                className="min-h-11 rounded-none border-t border-[var(--border-line)] px-0 pt-4 text-left font-mono text-xs uppercase tracking-[0.14em] text-[var(--graphite-muted)] hover:bg-transparent hover:text-[var(--graphite)] focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
              >
                <span>View key achievements</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <ul className="grid gap-3 text-sm leading-7 text-[var(--graphite-muted)] md:max-w-3xl">
                  {experience.achievements.map((achievement) => (
                    <li key={achievement} className="border-l border-[var(--border-line)] pl-4">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </Accordion>
          </div>
        )}
      </div>
    </DividerRow>
  )
}
