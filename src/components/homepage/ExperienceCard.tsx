import { ArrowRight, Briefcase, Calendar, MapPin } from 'lucide-react'
import type { WorkExperience } from '@/data/experience'
import { cn } from '@/lib'
import { getTechIcon } from '@/lib/techIcons'

interface ExperienceCardProps {
  experience: WorkExperience
  index: number
  isLast: boolean
}

const employmentTypeLabels: Record<WorkExperience['employmentType'], string> = {
  'full-time': 'Full-time',
  freelance: 'Freelance',
  contract: 'Contract',
}

export default function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
  const animationDelay = `${120 + index * 100}ms`
  const isCurrent = experience.endDate === 'Present'

  return (
    <div className="relative flex gap-6 group">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={cn(
            'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            isCurrent
              ? 'border-slate-600 bg-slate-800/60 ring-2 ring-slate-700/30'
              : 'border-slate-800/70 bg-slate-900/60 group-hover:border-slate-700/70',
          )}
          style={{
            animation: 'fade-in 900ms ease-out both',
            animationDelay,
          }}
        >
          {experience.logoUrl ? (
            <img
              src={experience.logoUrl}
              alt={`${experience.companyName} logo`}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Briefcase className="h-5 w-5 text-slate-400" />
          )}
        </div>
        {!isLast && (
          <div
            className="w-0.5 h-full bg-slate-800/70 mt-2"
            style={{
              animation: 'fade-in 900ms ease-out both',
              animationDelay: `${parseInt(animationDelay) + 50}ms`,
            }}
          />
        )}
      </div>

      {/* Card content */}
      <article
        className={cn(
          'flex-1 rounded-lg border bg-slate-900/60 p-6 transition-all duration-200 hover:border-slate-700/70 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-slate-900/50',
          isCurrent && 'border-slate-700/50 ring-1 ring-slate-700/20',
        )}
        style={{
          animation: 'fade-in 900ms ease-out both',
          animationDelay,
        }}
      >
        <div className="space-y-4">
          {/* Header: Role, Company, Badges */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="space-y-1">
              <h3
                className="text-xl md:text-2xl text-slate-100"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                {experience.role}
              </h3>
              <p
                className="text-base text-slate-300"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                {experience.companyName}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {isCurrent && (
                <span
                  className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1 text-xs text-slate-200 font-medium"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                  }}
                >
                  Current
                </span>
              )}
              <span
                className="inline-flex items-center rounded-full border border-slate-800/70 bg-slate-900/80 px-3 py-1 text-xs text-slate-400"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                {employmentTypeLabels[experience.employmentType]}
              </span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              {experience.startDate} - {experience.endDate}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-sm text-slate-400 leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            {experience.description}
          </p>

          {/* Achievements */}
          {experience.achievements.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800/50">
              <h4
                className="text-xs text-slate-500 uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                }}
              >
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-300"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                    }}
                  >
                    <span className="text-slate-600 mt-1 flex-shrink-0">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {experience.techStack.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {experience.techStack.map((tech) => {
                const Icon = getTechIcon(tech)
                return (
                  <div
                    key={tech}
                    className="flex items-center gap-1.5 rounded-md border border-slate-800/70 bg-slate-900/80 px-2.5 py-1 transition-colors hover:border-slate-700/70"
                    title={tech}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5 text-slate-400" />}
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
    </div>
  )
}
