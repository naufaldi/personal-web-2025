import { getMentoringEngagements } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function MentoringSection() {
  const mentoringEngagements = getMentoringEngagements()

  if (mentoringEngagements.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16" aria-labelledby="mentoring-heading">
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="06"
            label="MENTORSHIP_ROW"
            title="Mentoring"
            titleId="mentoring-heading"
            description="Programs, cohorts, and long-running mentoring channels for web development and engineering growth."
            action={
              <TechnicalLabel variant="outline">
                {mentoringEngagements.length} program{mentoringEngagements.length !== 1 ? 's' : ''}
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
            {mentoringEngagements.map((item, index) => (
              <MentorSpeakerItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
