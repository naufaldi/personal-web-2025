import ManhwaHero from '@/components/manhwa/ManhwaHero'
import CurrentlyReadingManhwaSection from '@/components/manhwa/CurrentlyReadingManhwaSection'
import WishlistManhwaSection from '@/components/manhwa/WishlistManhwaSection'
import RecommendedManhwaSection from '@/components/manhwa/RecommendedManhwaSection'
import { Separator } from '@/components/ui/separator'
import { currentlyReadingManhwa, wishlistManhwa, recommendedManhwa } from '@/data/manhwa'

export default function Manhwa() {
  const hasCurrentlyReading = currentlyReadingManhwa.length > 0
  const hasWishlist = wishlistManhwa.length > 0
  const hasRecommended = recommendedManhwa.length > 0

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-pattern-manhwa" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 w-full py-12 md:py-16 relative z-10">
        <ManhwaHero />

        {hasCurrentlyReading && <CurrentlyReadingManhwaSection />}

        {hasCurrentlyReading && hasWishlist && (
          <Separator className="my-8 bg-slate-800/70" />
        )}

        {hasWishlist && <WishlistManhwaSection />}

        {(hasCurrentlyReading || hasWishlist) && hasRecommended && (
          <Separator className="my-8 bg-slate-800/70" />
        )}

        {hasRecommended && <RecommendedManhwaSection />}
      </div>
    </div>
  )
}
