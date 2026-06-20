import { useMemo } from 'react'
import ManhwaHero from '@/components/manhwa/ManhwaHero'
import CurrentlyReadingManhwaSection from '@/components/manhwa/CurrentlyReadingManhwaSection'
import WishlistManhwaSection from '@/components/manhwa/WishlistManhwaSection'
import RecommendedManhwaSection from '@/components/manhwa/RecommendedManhwaSection'
import { currentlyReadingManhwa, wishlistManhwa, recommendedManhwa } from '@/data/manhwa'
import { usePageMeta } from '@/hooks/usePageMeta'
import { getStaticRouteMeta } from '@/lib/seo'

export default function Manhwa() {
  const meta = useMemo(() => {
    const route = getStaticRouteMeta('/manhwa')
    return {
      title: route?.title ?? 'Manhwa',
      description: route?.description ?? '',
      path: '/manhwa',
    }
  }, [])

  usePageMeta(meta)

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
