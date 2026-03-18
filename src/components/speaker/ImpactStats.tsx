import { Users, GraduationCap, Mic, Clock } from 'lucide-react'
import { speakerMentorStats } from '@/data/speaker'
import { cn } from '@/lib'
import FadeInUp from '@/components/common/FadeInUp'
import { useCountUp } from '@/hooks/useCountUp'

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
  const { ref, display } = useCountUp(value, { suffix })

  return (
    <FadeInUp delay={0.1 + index * 0.08}>
      <div
        ref={ref}
        role="listitem"
        className={cn(
          'rounded-xl border border-slate-800/70 light:border-slate-200/80 bg-slate-900/60 light:bg-white/80 px-4 py-4 text-sm shadow-sm light:shadow transition-colors hover:text-slate-200 light:hover:text-slate-900 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/80 light:hover:bg-white font-body font-medium',
          className
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 light:text-slate-500">{label}</span>
          <div className="text-slate-500 light:text-slate-400" aria-hidden="true">{icon}</div>
        </div>
        <div className="text-xl md:text-2xl font-semibold text-slate-100 light:text-slate-900">
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
      className={cn(
        'rounded-xl border border-slate-800/70 light:border-slate-200/80 bg-slate-900/60 light:bg-white/80 px-4 py-4 text-sm shadow-sm light:shadow transition-colors hover:text-slate-200 light:hover:text-slate-900 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/80 light:hover:bg-white font-body font-medium',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 light:text-slate-500">{label}</span>
        <div className="text-slate-500 light:text-slate-400" aria-hidden="true">{icon}</div>
      </div>
      <div className="text-xl md:text-2xl font-semibold text-slate-100 light:text-slate-900">
        {value}
      </div>
    </div>
  </FadeInUp>
)

export default function ImpactStats() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 px-6 sm:px-0"
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
  )
}
