import { getMentoringEngagements } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'

export default function MentoringSection() {
  const mentoringEngagements = getMentoringEngagements()

  if (mentoringEngagements.length === 0) {
    return null
  }

  return (
    <section className="px-6 md:px-0 py-12 md:py-16">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2
              className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                animation: 'fade-in-up 800ms ease-out both',
                animationDelay: '60ms',
              }}
            >
              Mentoring Engagements
            </h2>
            <span
              className="text-sm text-slate-500 light:text-slate-600 px-3 py-1 rounded-full border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white/75"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              {mentoringEngagements.length} program{mentoringEngagements.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="rounded-3xl border border-slate-800/60 light:border-slate-200/80 bg-slate-900/30 light:bg-white/85 backdrop-blur-sm shadow-[0_20px_80px_rgba(2,6,23,0.45)] light:shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-2 sm:p-4">
            <div
              className="flex flex-col"
              style={{
                animation: 'fade-in 900ms ease-out both',
                animationDelay: '120ms',
              }}
            >
              {mentoringEngagements.map((item, index) => (
                <MentorSpeakerItem key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
