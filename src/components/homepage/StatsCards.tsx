import { Briefcase, Code2, Calendar } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib'

interface StatCardProps {
  label: string
  value: string
  icon: React.ReactNode
  className?: string
}

const StatCard = ({ label, value, icon, className }: StatCardProps) => (
  <div
    className={cn(
      'rounded-lg border border-slate-800/70 bg-slate-900/60 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700/70 transition-colors',
      className
    )}
    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
  >
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <div className="text-slate-500">{icon}</div>
    </div>
    <div className="mt-1 text-slate-200">{value}</div>
  </div>
)

export default function StatsCards() {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
      <StatCard
        label="Experience"
        value={siteConfig.stats.experience}
        icon={<Briefcase className="h-3.5 w-3.5" />}
      />
      <StatCard
        label="Stack"
        value={siteConfig.stats.stack}
        icon={<Code2 className="h-3.5 w-3.5" />}
      />
      <StatCard
        label="Lead time"
        value={siteConfig.stats.leadTime}
        icon={<Calendar className="h-3.5 w-3.5" />}
      />
    </div>
  )
}
