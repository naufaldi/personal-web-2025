import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { mentorSpeakerEngagements } from '@/data/mentorSpeaker'
import MentorSpeakerItem from './MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'

export default function MentorSpeakerSection() {
  return (
    <section id="mentor-speaker" aria-labelledby="mentor-speaker-heading" className="relative bg-slate-950 light:bg-slate-50 px-6 md:px-0 py-12 md:py-16">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <div className="space-y-8">
          <FadeInUp delay={0.06}>
            <h2
              id="mentor-speaker-heading"
              className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight font-mono font-medium"
            >
              Mentor / Speaker
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.12}>
            <div className="flex flex-col">
              {mentorSpeakerEngagements.slice(0, 4).map((item, index) => (
                <MentorSpeakerItem key={item.id} item={item} index={index} />
              ))}
            </div>
          </FadeInUp>

          <FadeInUp delay={0.12 + mentorSpeakerEngagements.slice(0, 4).length * 0.1}>
            <div className="flex justify-center pt-4">
            <Link
              to="/speaker"
              className="group inline-flex items-center gap-2 rounded-md border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white px-6 py-3 text-sm text-slate-300 light:text-slate-700 transition-all duration-200 hover:text-slate-100 light:hover:text-slate-950 hover:border-slate-700/70 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:shadow-md hover:shadow-slate-900/50 light:hover:shadow-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 font-body font-semibold"
            >
              View all engagements
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}

