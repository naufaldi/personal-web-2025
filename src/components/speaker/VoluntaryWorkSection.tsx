import { getVoluntaryWork } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function VoluntaryWorkSection() {
  const voluntaryWork = getVoluntaryWork()

  if (voluntaryWork.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16" aria-labelledby="voluntary-work-heading">
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="05"
            label="COMMUNITY_ROW"
            title="Voluntary work"
            titleId="voluntary-work-heading"
            description="Community contributions and support work across learning groups and startup ecosystems."
            action={
              <TechnicalLabel variant="outline">
                {voluntaryWork.length} contribution{voluntaryWork.length !== 1 ? 's' : ''}
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
            {voluntaryWork.map((item, index) => (
              <MentorSpeakerItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
