import { getSpeakerEngagements } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function SpeakingSection() {
  const speakerEngagements = getSpeakerEngagements()

  if (speakerEngagements.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-20" aria-labelledby="speaking-heading">
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="07"
            label="SPEAKING_ROW"
            title="Speaking"
            titleId="speaking-heading"
            description="Talks, webinars, meetups, and workshops about frontend, product engineering, and agentic development."
            action={
              <TechnicalLabel variant="outline">
                {speakerEngagements.length} event{speakerEngagements.length !== 1 ? 's' : ''}
              </TechnicalLabel>
            }
          />
        </FadeInUp>
        <FadeInUp delay={0.18}>
          <div className="relative mt-8 border-t border-[var(--border-line)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[112px] top-0 hidden h-full border-l border-dashed border-[var(--border-dashed)] md:block lg:left-36"
            />
            {speakerEngagements.map((item, index) => (
              <MentorSpeakerItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
