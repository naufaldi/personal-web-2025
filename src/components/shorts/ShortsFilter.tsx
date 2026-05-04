import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import { cn } from '@/lib'

interface ShortsFilterProps {
  tags: string[]
  selectedTags: string[]
  searchQuery: string
  onTagToggle: (tag: string) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
}

export default function ShortsFilter({
  tags,
  selectedTags,
  searchQuery,
  onTagToggle,
  onSearchChange,
  onClearFilters,
}: ShortsFilterProps) {
  const hasActiveFilters = selectedTags.length > 0 || searchQuery.length > 0

  return (
    <div className="border border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-xs)]">
      <div className="border-b border-[var(--border-line)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <TechnicalLabel>FILTERS</TechnicalLabel>
            <h3 className="mt-3 font-mono text-lg font-medium text-[var(--graphite)]">
              Search
            </h3>
          </div>
          {hasActiveFilters && (
            <Button variant="technical" size="sm" onClick={onClearFilters}>
              Show all
            </Button>
          )}
        </div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--graphite-muted)]"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search shorts..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 w-full border border-[var(--border-line)] bg-[var(--paper)] px-10 text-sm text-[var(--graphite)] transition-colors placeholder:text-[var(--graphite-faint)] focus:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)]/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--graphite-muted)] transition-colors hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <TechnicalLabel>TOPIC_INDEX</TechnicalLabel>
          <h3 className="mt-3 font-mono text-lg font-medium text-[var(--graphite)]">
            Choose topics
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag)

            return (
              <button
                key={tag}
                type="button"
                className={cn(
                  'border border-dashed px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]',
                  isSelected
                    ? 'border-[var(--graphite)] bg-[var(--graphite)] text-[var(--paper)]'
                    : 'border-[var(--border-dashed)] bg-[var(--paper)] text-[var(--graphite-muted)] hover:border-[var(--border-strong)] hover:text-[var(--graphite)]',
                )}
                onClick={() => onTagToggle(tag)}
                aria-label={`${isSelected ? 'Deselect' : 'Select'} ${tag} tag`}
                aria-pressed={isSelected}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
