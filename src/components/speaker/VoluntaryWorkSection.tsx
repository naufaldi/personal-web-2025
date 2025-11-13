import { getVoluntaryWork } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'

export default function VoluntaryWorkSection() {
  const voluntaryWork = getVoluntaryWork()

  if (voluntaryWork.length === 0) {
    return null
  }

  return (
    <section className="px-6 md:px-0 py-12 md:py-16">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2
              className="text-[24px] md:text-[28px] text-slate-100 tracking-tight"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                animation: 'fade-in-up 800ms ease-out both',
                animationDelay: '60ms',
              }}
            >
              Voluntary Work & Community Contributions
            </h2>
            <span
              className="text-sm text-slate-500 px-3 py-1 rounded-full border border-slate-800/70 bg-slate-900/60"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              {voluntaryWork.length} contribution{voluntaryWork.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div
            className="flex flex-col"
            style={{
              animation: 'fade-in 900ms ease-out both',
              animationDelay: '120ms',
            }}
          >
            {voluntaryWork.map((item, index) => (
              <MentorSpeakerItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

