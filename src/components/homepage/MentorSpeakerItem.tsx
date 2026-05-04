import { ArrowUpRight } from 'lucide-react'
import type { MentorSpeakerItem as MentorSpeakerItemType } from '@/data/mentorSpeaker'
import DividerRow from '@/components/design-system/DividerRow'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import { Button } from '@/components/ui/button'

interface MentorSpeakerItemProps {
  item: MentorSpeakerItemType
  index: number
}

export default function MentorSpeakerItem({ item, index }: MentorSpeakerItemProps) {
  const primaryLink =
    item.links?.website || item.links?.linkedin || item.links?.youtube || item.links?.x
  const rowNumber = String(index + 1).padStart(2, '0')
  const headingId = `mentor-speaker-${item.id}-heading`
  const typeLabel = item.type === 'mentoring' ? 'Mentoring' : item.type

  return (
    <DividerRow aria-labelledby={headingId} className="relative overflow-hidden py-7 md:py-8">
      <div
        aria-hidden="true"
        className="absolute left-[112px] top-8 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[var(--border-dashed)] bg-[var(--paper)] transition-colors group-hover/row:border-[var(--graphite-muted)] md:block lg:left-36"
      />

      <div className="relative grid gap-5 md:grid-cols-[112px_minmax(0,1fr)_minmax(180px,280px)] md:items-start lg:grid-cols-[144px_minmax(0,1fr)_minmax(220px,320px)]">
        <div className="text-drawing-label">{rowNumber} // {item.type}</div>

        <div className="max-w-3xl space-y-4">
          <div className="space-y-2">
            <TechnicalLabel variant="mono">{typeLabel}</TechnicalLabel>
            <h3
              id={headingId}
              className="font-mono text-2xl font-medium leading-tight text-[var(--graphite)] md:text-3xl"
            >
            {item.eventName}
            </h3>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-[var(--graphite-muted)] md:text-base">
            {item.brief}
          </p>
        </div>

        <div className="space-y-4 md:text-right">
          <TechnicalLabel variant="outline">{item.date}</TechnicalLabel>
          {primaryLink && (
            <div className="md:flex md:justify-end">
              <Button asChild variant="technical" size="sm">
                <a href={primaryLink} target="_blank" rel="noopener noreferrer">
                  Open
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </DividerRow>
  )
}
