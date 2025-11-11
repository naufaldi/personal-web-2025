import { useNavigate } from 'react-router'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Short } from '@/data/shorts'
import { cn } from '@/lib'

interface ShortCardProps {
  short: Short
  index: number
}

export default function ShortCard({ short, index }: ShortCardProps) {
  const navigate = useNavigate()
  const animationDelay = `${120 + index * 100}ms`

  const handleClick = () => {
    navigate(`/shorts/${short.slug}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <Card
      className={cn(
        'group border-slate-800/70 bg-slate-900/60 transition-all duration-200 hover:border-slate-700/70 hover:bg-slate-900/90 cursor-pointer',
      )}
      style={{
        animation: 'fade-in 900ms ease-out both',
        animationDelay,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${short.title}`}
    >
      <CardHeader className="space-y-3">
        <h3
          className="text-lg md:text-xl text-slate-100"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
          }}
        >
          {short.title}
        </h3>
        {short.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {short.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-700/70 text-slate-300 bg-slate-900/40"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
    </Card>
  )
}

