import BlueprintIndexHero from '@/components/design-system/BlueprintIndexHero'
import { allShorts, getAllTags } from '@/data/shorts'

export default function ShortsHero() {
  const latestShort = allShorts[0]

  return (
    <BlueprintIndexHero
      eyebrow="SHORT_INDEX"
      title={
        <>
          Shorts /
          <br />
          Notes
        </>
      }
      titleId="shorts-hero-heading"
      description="Quick tips, code snippets, and rules for scanning first, applying second. Small notes pulled into a quick reference index."
      stats={[
        { label: 'MD files', value: allShorts.length },
        { label: 'Topics', value: getAllTags().length },
      ]}
      latestLabel="Latest short"
      latestValue={latestShort?.date ?? 'READY'}
      statusLabel="SNIPPETS_READY"
      metadata={['route: /shorts', 'source: md_to_card']}
      actionHref="#shorts-index-heading"
      actionLabel="View index"
    />
  )
}
