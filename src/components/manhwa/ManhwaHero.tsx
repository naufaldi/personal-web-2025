import BlueprintIndexHero from '@/components/design-system/BlueprintIndexHero'
import {
  currentlyReadingManhwa,
  recommendedManhwa,
  wishlistManhwa,
} from '@/data/manhwa'

export default function ManhwaHero() {
  const totalManhwa =
    currentlyReadingManhwa.length + wishlistManhwa.length + recommendedManhwa.length

  return (
    <BlueprintIndexHero
      eyebrow="WEBTOON_INDEX"
      title="Manhwa"
      titleId="manhwa-hero-heading"
      description="Korean webcomic stack for action, fantasy, and story craft. A reading board for ongoing series, wishlist candidates, and favorites worth recommending."
      stats={[
        { label: 'Active', value: currentlyReadingManhwa.length },
        { label: 'Queued', value: wishlistManhwa.length },
      ]}
      latestLabel="Recommended"
      latestValue={`${recommendedManhwa.length} picks`}
      statusLabel="READING_PIPE_READY"
      metadata={[`${totalManhwa} entries`, 'covers: real', 'source: anilist_mangadex']}
      actionHref="#currently-reading-manhwa-heading"
      actionLabel="View series"
    />
  )
}
