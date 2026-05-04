import { Clock, GraduationCap, Mic, Users } from 'lucide-react'
import { speakerMentorStats } from '@/data/speaker'
import { cn } from '@/lib'
import FadeInUp from '@/components/common/FadeInUp'

interface ImpactStatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  className?: string
  index: number
  suffix?: string
}

const ImpactStatCard = ({
  label,
  value,
  icon,
  className,
  index,
  suffix,
}: ImpactStatCardProps) => {
  const display = `${value.toLocaleString()}+${suffix ? ` ${suffix}` : ''}`

  return (
    <FadeInUp delay={0.1 + index * 0.08}>
      <div
        role="listitem"
        className={cn('bg-[var(--paper)] px-4 py-4 md:px-5', className)}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-drawing-label">
            {String(index + 1).padStart(2, '0')} // {label.replace(/\s+/g, '_')}
          </span>
          <div className="text-[var(--graphite-muted)]" aria-hidden="true">
            {icon}
          </div>
        </div>
        <div className="mt-4 font-mono text-2xl font-medium leading-none text-[var(--graphite)] md:text-3xl">
          {display}
        </div>
      </div>
    </FadeInUp>
  )
}

interface ImpactStatStringCardProps {
  label: string
  value: string
  icon: React.ReactNode
  className?: string
  index: number
}

const ImpactStatStringCard = ({
  label,
  value,
  icon,
  className,
  index,
}: ImpactStatStringCardProps) => (
  <FadeInUp delay={0.1 + index * 0.08}>
    <div
      role="listitem"
      className={cn('bg-[var(--paper)] px-4 py-4 md:px-5', className)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-drawing-label">
          {String(index + 1).padStart(2, '0')} // {label.replace(/\s+/g, '_')}
        </span>
        <div className="text-[var(--graphite-muted)]" aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className="mt-4 font-mono text-2xl font-medium leading-none text-[var(--graphite)] md:text-3xl">
        {value}
      </div>
    </div>
  </FadeInUp>
)

export default function ImpactStats() {
  return (
    <section className="site-container py-10 md:py-12" aria-labelledby="speaker-stats-heading">
      <div className="section-rule grid gap-4 pt-5 lg:grid-cols-[170px_minmax(0,1fr)] lg:items-start">
        <div>
          <div className="text-drawing-label">03 // IMPACT_METRICS</div>
          <h2 id="speaker-stats-heading" className="sr-only">
            Speaker and mentor impact metrics
          </h2>
        </div>

        <div
          className="grid gap-px border-y border-[var(--border-line)] bg-[var(--border-line)] sm:grid-cols-2 xl:grid-cols-4"
          role="list"
          aria-label="Impact statistics"
        >
          <ImpactStatCard
            label="Mentees Taught"
            value={speakerMentorStats.menteesTaught}
            icon={<Users className="h-5 w-5" />}
            index={0}
          />
          <ImpactStatCard
            label="Mentoring Sessions"
            value={speakerMentorStats.mentoringSessions}
            icon={<GraduationCap className="h-5 w-5" />}
            index={1}
          />
          <ImpactStatCard
            label="Speaking Engagements"
            value={speakerMentorStats.speakingEngagements}
            icon={<Mic className="h-5 w-5" />}
            index={2}
          />
          {speakerMentorStats.speakerTime && (
            <ImpactStatStringCard
              label="Speaker Time"
              value={speakerMentorStats.speakerTime}
              icon={<Clock className="h-5 w-5" />}
              index={3}
            />
          )}
        </div>
      </div>
    </section>
  )
}
