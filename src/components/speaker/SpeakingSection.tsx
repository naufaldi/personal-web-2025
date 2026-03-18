import { getSpeakerEngagements } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'

export default function SpeakingSection() {
  const speakerEngagements = getSpeakerEngagements()

  if (speakerEngagements.length === 0) {
    return null
  }

  return (
    <section className="px-6 md:px-0 py-12 md:py-16" aria-labelledby="speaking-heading">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <FadeInUp delay={0.1}>
              <h2
                id="speaking-heading"
                className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight font-mono font-medium"
              >
                Speaking & Webinar Engagements
              </h2>
            </FadeInUp>
            <span className="text-sm text-slate-400 light:text-slate-600 px-3 py-1 rounded-full border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white/75 font-body font-medium">
              {speakerEngagements.length} event{speakerEngagements.length !== 1 ? 's' : ''}
            </span>
          </div>
          <FadeInUp delay={0.18}>
            <div className="rounded-3xl border border-slate-800/60 light:border-slate-200/80 bg-slate-900/30 light:bg-white/85 backdrop-blur-sm shadow-[0_20px_80px_rgba(2,6,23,0.45)] light:shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-2 sm:p-4 transition-colors hover:border-slate-700/90 light:hover:border-slate-300">
              <div className="flex flex-col">
                {speakerEngagements.map((item, index) => (
                  <MentorSpeakerItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
