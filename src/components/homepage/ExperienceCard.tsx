import { Calendar } from 'lucide-react'
import type { WorkExperience } from '@/data/experience'
import { cn } from '@/lib'
import { getTechIcon } from '@/lib/techIcons'
import { Accordion, AccordionContent, AccordionTrigger } from '@/components/ui/accordion'

interface ExperienceCardProps {
  experience: WorkExperience
  index: number
}

const employmentTypeLabels: Record<WorkExperience['employmentType'], string> = {
  'full-time': 'Full-time',
  freelance: 'Freelance',
  contract: 'Contract',
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const animationDelay = `${120 + index * 100}ms`
  const isCurrent = experience.endDate === 'Present'

  return (
    <article
      className={cn(
        'rounded-lg border bg-slate-900/60 p-3 transition-all duration-200 hover:border-slate-700/70 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-slate-900/50',
        isCurrent && 'border-slate-700/50 ring-1 ring-slate-700/20',
      )}
      style={{
        animation: 'fade-in 900ms ease-out both',
        animationDelay,
      }}
    >
      <div className="space-y-2">
        {/* Header: Company | Year Badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm text-slate-100 truncate"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {experience.companyName}
            </h3>
            <p
              className="text-xs text-slate-400 mt-0.5"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {experience.role}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
            {isCurrent && (
              <span
                className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800/80 px-2 py-0.5 text-xs text-slate-200"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                }}
              >
                Current
              </span>
            )}
            <span
              className="inline-flex items-center rounded-full border border-slate-800/70 bg-slate-900/80 px-2 py-0.5 text-xs text-slate-400"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {employmentTypeLabels[experience.employmentType]}
            </span>
          </div>
        </div>

        {/* Year */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="h-3 w-3 flex-shrink-0" />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            {experience.startDate} - {experience.endDate}
          </span>
        </div>

        {/* Achievements - Accordion */}
        {experience.achievements.length > 0 && (
          <Accordion defaultOpen={false} className="w-full">
            <AccordionTrigger
              className="py-1.5 px-0 hover:bg-transparent"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
              }}
            >
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                Key Achievements
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1.5">
              <ul className="space-y-1.5">
                {experience.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-300"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                    }}
                  >
                    <span className="text-slate-600 mt-0.5 flex-shrink-0">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </Accordion>
        )}

        {/* Tech Stack */}
        {experience.techStack.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {experience.techStack.map((tech) => {
              const Icon = getTechIcon(tech)
              return (
                <div
                  key={tech}
                  className="flex items-center gap-1 rounded-md border border-slate-800/70 bg-slate-900/80 px-2 py-0.5 transition-colors hover:border-slate-700/70"
                  title={tech}
                >
                  {Icon && <Icon className="h-3 w-3 text-slate-400" />}
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
        )}
      </div>
    </article>
  )
}
