import { Twitter, Linkedin, ExternalLink, Youtube } from 'lucide-react'
import type { MentorSpeakerItem } from '@/data/mentorSpeaker'
import { cn } from '@/lib'

interface MentorSpeakerItemProps {
  item: MentorSpeakerItem
  index: number
}

export default function MentorSpeakerItem({ item, index }: MentorSpeakerItemProps) {
  const animationDelay = `${120 + index * 100}ms`

  return (
    <article
      className={cn(
        'group flex flex-col md:flex-row gap-6 py-6 border-b border-slate-800/70 transition-colors hover:bg-slate-900/30',
      )}
      style={{
        animation: 'fade-in 900ms ease-out both',
        animationDelay,
      }}
    >
      {item.image && (
        <div className="flex-shrink-0 w-full md:w-64 h-40 md:h-32 rounded-lg overflow-hidden shadow-sm">
          <img
            src={item.image}
            alt={`${item.eventName} banner`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <h3
            className="text-xl md:text-2xl text-slate-100"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
            }}
          >
            {item.eventName}
          </h3>
          <p
            className="text-sm md:text-base text-slate-400"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            {item.brief}
          </p>
          <p
            className="text-xs text-slate-500"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            {item.date}
          </p>
        </div>
        {item.links && (
          <div className="flex items-center gap-2 flex-wrap">
            {item.links.x && (
              <a
                href={item.links.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-slate-800/70 bg-slate-900/60 text-slate-400 transition-colors hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
                aria-label={`View ${item.eventName} on X`}
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {item.links.linkedin && (
              <a
                href={item.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-slate-800/70 bg-slate-900/60 text-slate-400 transition-colors hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
                aria-label={`View ${item.eventName} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {item.links.youtube && (
              <a
                href={item.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-slate-800/70 bg-slate-900/60 text-slate-400 transition-colors hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
                aria-label={`Watch ${item.eventName} on YouTube`}
              >
                <Youtube className="h-4 w-4" />
              </a>
            )}
            {item.links.website && (
              <a
                href={item.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-slate-800/70 bg-slate-900/60 text-slate-400 transition-colors hover:border-slate-700/70 hover:bg-slate-900/90 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
                aria-label={`Visit ${item.eventName} website`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

