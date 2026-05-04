import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import {
  getHomeMentorSpeakerPreview,
  mentorSpeakerEngagements,
} from '@/data/mentorSpeaker'
import MentorSpeakerItem from './MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import { Button } from '@/components/ui/button'

export default function MentorSpeakerSection() {
  const previewItems = getHomeMentorSpeakerPreview()
  const speakerCount = mentorSpeakerEngagements.filter((item) => item.type === 'speaker').length
  const mentoringCount = mentorSpeakerEngagements.filter((item) => item.type === 'mentoring').length
  const signalItems = [
    {
      label: 'PUBLIC_WORK',
      value: `${speakerCount} talks`,
      detail: 'Workshops, meetups, and learning sessions',
    },
    {
      label: 'MENTORSHIP_LOOP',
      value: `${mentoringCount} programs`,
      detail: 'Career guidance and software engineering mentoring',
    },
    {
      label: 'FEATURED_SET',
      value: `${previewItems.length} featured`,
      detail: 'Selected engagements for the homepage',
    },
  ]

  return (
    <section id="mentor-speaker" aria-labelledby="mentor-speaker-heading" className="py-16 md:py-24">
      <div className="site-container">
        <FadeInUp delay={0.06}>
          <SectionHeader
            number="04"
            label="MENTOR_SPEAKER_ROW"
            title="Mentor / Speaker"
            titleId="mentor-speaker-heading"
            description="Workshops, mentoring programs, and talks about software engineering growth, product systems, and agentic workflows."
            action={
              <Button asChild variant="technical">
                <Link to="/speaker">
                  View all engagements
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          />
        </FadeInUp>

        <FadeInUp delay={0.12}>
          <div className="mt-8 grid gap-px border-y border-[var(--border-line)] bg-[var(--border-line)] md:grid-cols-3">
            {signalItems.map((signal, index) => (
              <div key={signal.label} className="bg-[var(--paper)] px-4 py-4 md:px-5">
                <div className="text-drawing-label">
                  {String(index + 1).padStart(2, '0')} // {signal.label}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xl font-medium leading-none text-[var(--graphite)] md:text-2xl">
                      {signal.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--graphite-muted)]">
                      {signal.detail}
                    </p>
                  </div>
                  {signal.label === 'FEATURED_SET' && (
                    <TechnicalLabel variant="mono" className="mt-1">
                      Live
                    </TechnicalLabel>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.18}>
          <div className="relative mt-8 border-t border-[var(--border-line)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[112px] top-0 hidden h-full border-l border-dashed border-[var(--border-dashed)] md:block lg:left-36"
            />
            {previewItems.map((item, index) => (
              <MentorSpeakerItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
