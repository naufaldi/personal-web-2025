import { Users, GraduationCap, Mic, Clock } from 'lucide-react'
import { speakerMentorStats } from '@/data/speaker'
import { cn } from '@/lib'

interface ImpactStatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  className?: string
  delay?: string
}

const ImpactStatCard = ({
  label,
  value,
  icon,
  className,
  delay = '0ms',
}: ImpactStatCardProps) => (
  <div
    className={cn(
      'rounded-lg border border-slate-800/70 bg-slate-900/60 px-4 py-4 text-sm hover:text-slate-200 hover:border-slate-700/70 transition-colors',
      className
    )}
    style={{
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      animation: 'fade-in 900ms ease-out both',
      animationDelay: delay,
    }}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-slate-400">{label}</span>
      <div className="text-slate-500">{icon}</div>
    </div>
    <div className="text-xl md:text-2xl font-semibold text-slate-100">
      {typeof value === 'number' ? `${value.toLocaleString()}+` : value}
    </div>
  </div>
)

export default function ImpactStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 px-6 sm:px-0">
      <ImpactStatCard
        label="Mentees Taught"
        value={speakerMentorStats.menteesTaught}
        icon={<Users className="h-5 w-5" />}
        delay="120ms"
      />
      <ImpactStatCard
        label="Mentoring Sessions"
        value={speakerMentorStats.mentoringSessions}
        icon={<GraduationCap className="h-5 w-5" />}
        delay="180ms"
      />
      <ImpactStatCard
        label="Speaking Engagements"
        value={speakerMentorStats.speakingEngagements}
        icon={<Mic className="h-5 w-5" />}
        delay="240ms"
      />
      {speakerMentorStats.speakerTime && (
        <ImpactStatCard
          label="Speaker Time"
          value={speakerMentorStats.speakerTime}
          icon={<Clock className="h-5 w-5" />}
          delay="300ms"
        />
      )}
    </div>
  )
}

