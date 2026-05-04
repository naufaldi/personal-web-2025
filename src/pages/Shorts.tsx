import { useState, useMemo } from 'react'
import ShortsHero from '@/components/shorts/ShortsHero'
import ShortCard from '@/components/shorts/ShortCard'
import ShortsFilter from '@/components/shorts/ShortsFilter'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import { allShorts, getAllTags } from '@/data/shorts'

export default function Shorts() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const allTags = getAllTags()

  const filteredShorts = useMemo(() => {
    let filtered = allShorts

    if (selectedTags.length > 0) {
      filtered = filtered.filter((short) =>
        short.tags.some((tag) => selectedTags.includes(tag)),
      )
    }

    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (short) =>
          short.title.toLowerCase().includes(query) ||
          short.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          short.content.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [selectedTags, searchQuery])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }

  const handleClearFilters = () => {
    setSelectedTags([])
    setSearchQuery('')
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--paper)] text-[var(--graphite)]">
      <ShortsHero />

      <section aria-labelledby="shorts-index-heading" className="drawing-sheet py-12 md:py-16">
        <div className="site-container">
          <FadeInUp delay={0.1}>
            <SectionHeader
              number="03"
              label="SNIPPET_INDEX"
              title="Shorts"
              titleId="shorts-index-heading"
              description="Small notes, code fragments, and rules pulled into a quick reference index."
              action={
                <TechnicalLabel variant="outline">
                  {filteredShorts.length} of {allShorts.length}
                </TechnicalLabel>
              }
            />
          </FadeInUp>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
            <div>
              {filteredShorts.length === 0 ? (
                <div className="border border-[var(--border-line)] bg-[var(--paper)] p-8">
                  <TechnicalLabel>NO_MATCH</TechnicalLabel>
                  <p className="mt-4 text-body-readable">
                    No shorts found matching your filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-0 border-y border-[var(--border-line)] md:grid-cols-2">
                  {filteredShorts.map((short, index) => (
                    <FadeInUp key={short.slug} delay={0.08 + index * 0.04}>
                      <ShortCard short={short} index={index} />
                    </FadeInUp>
                  ))}
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="mb-4 hidden lg:block">
                <TechnicalLabel variant="status">PIPELINE_READY</TechnicalLabel>
              </div>
              <ShortsFilter
                tags={allTags}
                selectedTags={selectedTags}
                searchQuery={searchQuery}
                onTagToggle={handleTagToggle}
                onSearchChange={setSearchQuery}
                onClearFilters={handleClearFilters}
              />
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
