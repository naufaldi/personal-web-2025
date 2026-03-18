import { Mic } from 'lucide-react'
import FadeInUp from '@/components/common/FadeInUp'

export default function SpeakerMentorHero() {
  return (
    <section
      className="px-6 md:px-0 flex flex-col items-center gap-4 mb-12"
      aria-labelledby="speaker-hero-heading"
    >
      <FadeInUp delay={0.1}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/70 bg-slate-900/60 light:bg-white/80">
          <Mic className="h-6 w-6 text-slate-300 light:text-slate-600" aria-hidden="true" />
        </div>
      </FadeInUp>
      <FadeInUp delay={0.18}>
        <h1
          id="speaker-hero-heading"
          className="text-4xl md:text-5xl text-center font-mono font-bold"
        >
          <span className="text-slate-100 light:text-slate-900">Speaker </span>
          <span className="text-slate-300 light:text-slate-500">& Mentor</span>
        </h1>
      </FadeInUp>
      <FadeInUp delay={0.26}>
        <p className="text-sm md:text-base text-slate-400 light:text-slate-600 text-center font-body font-medium">
          Empowering developers through knowledge sharing, mentorship, and community engagement
        </p>
      </FadeInUp>
    </section>
  )
}
