import { useState, useMemo } from 'react'
import ShortsHero from '@/components/shorts/ShortsHero'
import ShortCard from '@/components/shorts/ShortCard'
import ShortsFilter from '@/components/shorts/ShortsFilter'
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
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-pattern-shorts" aria-hidden="true" />
      <div className="mx-auto max-w-7xl sm:px-6 w-full px-6 md:px-0 py-12 md:py-16 relative z-10">
        <ShortsHero />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          <div>
            {filteredShorts.length === 0 ? (
              <div className="text-center py-12">
                <p
                  className="text-slate-400"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                  }}
                >
                  No shorts found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredShorts.map((short, index) => (
                  <ShortCard key={short.slug} short={short} index={index} />
                ))}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
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
    </div>
  )
}

