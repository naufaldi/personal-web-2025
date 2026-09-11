import { mentorSpeakerEngagements } from '@/data/mentorSpeaker'
import type { MentorSpeakerItem } from '@/data/mentorSpeaker'
import type { ImageMetadata } from 'astro'
import cursorSpeaker from '@/assets/collected/events/cursor-aug-speaker.webp'
import cursorAudience from '@/assets/collected/events/cursor-aug-audience.webp'
import codexWorking from '@/assets/collected/events/codex-build-working.webp'
import codexGroup from '@/assets/collected/events/codex-build-group.webp'
import community from '@/assets/collected/community.jpg'


export type CommunityCategory = 'Workshops' | 'Talks' | 'Mentoring' | 'Community'
export interface CommunityEntry extends MentorSpeakerItem { category: CommunityCategory }
export const communityEntries: CommunityEntry[] = mentorSpeakerEngagements.map(entry => ({
  ...entry,
  category: entry.category ?? (entry.type === 'mentoring' ? 'Mentoring' : entry.type === 'voluntary' ? 'Community' : /workshop/i.test(entry.eventName) ? 'Workshops' : 'Talks'),
}))
interface FeaturedEntry { entry: CommunityEntry; placement: string; image?: ImageMetadata; alt?: string; label: string }
const selection = [
  { id: 'luma-cursor-aug', placement: 'gathering', image: cursorSpeaker, alt: 'Speaker holding a microphone beside a presentation screen at the Cursor Jakarta workshop', label: 'From PRD to deployment' },
  { id: '5', placement: 'mentoring', image: community, alt: 'A community gathering around a cafe table', label: 'Share and grow' },
  { id: '11', placement: 'notes', label: 'Conversations in public' },
  { id: '3', placement: 'workshop', label: 'Code & conversation' },
  { id: 'luma-codex-build', placement: 'people', image: codexGroup, alt: 'Five participants posing together at the Codex Build Week event', label: 'Building with others' },
]
export const featuredCommunity: FeaturedEntry[] = selection.map(({ id, ...feature }) => {
  const entry = communityEntries.find(entry => entry.id === id)
  if (!entry) throw new Error(`Missing featured community record: ${id}`)
  return { ...feature, entry }
})

export const communityPhotos: Record<string, { image: ImageMetadata; alt: string; caption: string }[]> = {
  'luma-cursor-aug': [
    { image: cursorSpeaker, alt: 'Speaker holding a microphone beside a presentation screen', caption: 'Cursor Jakarta workshop / 1 August 2026' },
    { image: cursorAudience, alt: 'Participants seated in the workshop room', caption: 'Working through ideas together' },
  ],
  'luma-codex-build': [
    { image: codexWorking, alt: 'Participants building on laptops around a table', caption: 'OpenAI Build Week Jakarta / 18 July 2026' },
    { image: codexGroup, alt: 'Five participants posing together at the event', caption: 'People behind the projects' },
  ],
}
