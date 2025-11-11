import { Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
  const handleTagClick = (tag: string) => {
    onTagToggle(tag)
  }

  const handleTagKeyDown = (e: React.KeyboardEvent, tag: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onTagToggle(tag)
    }
  }

  const hasActiveFilters = selectedTags.length > 0 || searchQuery.length > 0

  return (
    <div className="space-y-6">
      <div>
        <h3
          className="text-lg text-slate-100 mb-4"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
          }}
        >
          Search
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search shorts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 bg-slate-900/60 border-slate-800/70 text-slate-200 placeholder:text-slate-500 focus-visible:ring-slate-700/70"
            style={{
              fontFamily: 'var(--font-body)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-lg text-slate-100"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}
          >
            Choose topics
          </h3>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="h-7 px-2 text-xs border-slate-700/70 text-slate-300 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/50"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              Show All
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <Badge
                key={tag}
                variant="outline"
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  isSelected
                    ? 'border-slate-600 bg-slate-800/70 text-slate-100'
                    : 'border-slate-700/70 text-slate-300 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/50',
                )}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
                onClick={() => handleTagClick(tag)}
                onKeyDown={(e) => handleTagKeyDown(e, tag)}
                tabIndex={0}
                role="button"
                aria-label={`${isSelected ? 'Deselect' : 'Select'} ${tag} tag`}
                aria-pressed={isSelected}
              >
                {tag}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}

