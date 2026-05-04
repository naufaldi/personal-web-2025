import ManhwaHero from '@/components/manhwa/ManhwaHero'
import CurrentlyReadingManhwaSection from '@/components/manhwa/CurrentlyReadingManhwaSection'
import WishlistManhwaSection from '@/components/manhwa/WishlistManhwaSection'
import RecommendedManhwaSection from '@/components/manhwa/RecommendedManhwaSection'
import { currentlyReadingManhwa, wishlistManhwa, recommendedManhwa } from '@/data/manhwa'

export default function Manhwa() {
  const hasCurrentlyReading = currentlyReadingManhwa.length > 0
  const hasWishlist = wishlistManhwa.length > 0
  const hasRecommended = recommendedManhwa.length > 0

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--paper)] text-[var(--graphite)]">
      <div className="drawing-sheet">
        <ManhwaHero />
        {hasCurrentlyReading && <CurrentlyReadingManhwaSection />}
        {hasWishlist && <WishlistManhwaSection />}
        {hasRecommended && <RecommendedManhwaSection />}
      </div>
    </div>
  )
}
