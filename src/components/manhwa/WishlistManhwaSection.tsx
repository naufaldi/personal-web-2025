import { wishlistManhwa } from '@/data/manhwa'
import ManhwaCard from './ManhwaCard'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function WishlistManhwaSection() {
  if (wishlistManhwa.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="wishlist-manhwa-heading" className="py-12 md:py-16">
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="04"
            label="MANHWA_QUEUE"
            title="Wishlist"
            titleId="wishlist-manhwa-heading"
            description="Series queued for later reading."
            action={
              <TechnicalLabel variant="outline">
                {wishlistManhwa.length} queued
              </TechnicalLabel>
            }
          />
        </FadeInUp>

        <div className="mt-8 grid grid-cols-1 gap-0 border-y border-[var(--border-line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistManhwa.map((manhwa, index) => (
            <FadeInUp key={manhwa.id} delay={0.1 + index * 0.08} className="h-full">
              <ManhwaCard manhwa={manhwa} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
