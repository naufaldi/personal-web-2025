import { recommendedManhwa } from '@/data/manhwa'
import ManhwaCard from './ManhwaCard'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function RecommendedManhwaSection() {
  if (recommendedManhwa.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="recommended-manhwa-heading" className="py-12 md:py-20">
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="05"
            label="RECOMMENDED_SET"
            title="Recommended"
            titleId="recommended-manhwa-heading"
            description="Series I would hand to someone looking for a solid starting set."
            action={
              <TechnicalLabel variant="status">
                {recommendedManhwa.length} picks
              </TechnicalLabel>
            }
          />
        </FadeInUp>

        <div className="mt-8 grid grid-cols-1 gap-0 border-y border-[var(--border-line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recommendedManhwa.map((manhwa, index) => (
            <FadeInUp key={manhwa.id} delay={0.1 + index * 0.08} className="h-full">
              <ManhwaCard manhwa={manhwa} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
