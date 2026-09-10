import { mentorSpeakerEngagements } from '@/data/mentorSpeaker'
import type { MentorSpeakerItem } from '@/data/mentorSpeaker'
import type { ImageMetadata } from 'astro'
import meetup from '@/assets/collected/meetup.jpg'
import community from '@/assets/collected/community.jpg'
import friends from '@/assets/collected/friends.jpg'

export type CommunityCategory = 'Workshops' | 'Talks' | 'Mentoring' | 'Community'
export interface CommunityEntry extends MentorSpeakerItem { category: CommunityCategory }
export const communityEntries: CommunityEntry[] = mentorSpeakerEngagements.map(entry => ({
  ...entry,
  category: entry.type === 'mentoring' ? 'Mentoring' : entry.type === 'voluntary' ? 'Community' : /workshop/i.test(entry.eventName) ? 'Workshops' : 'Talks',
}))
interface FeaturedEntry { entry: CommunityEntry; placement: string; image?: ImageMetadata; alt?: string; label: string }
const selection = [
  { id: '13', placement: 'gathering', image: meetup, alt: 'Friends at a cafe meetup, from the community photo archive', label: 'Learning together' },
  { id: '5', placement: 'mentoring', image: community, alt: 'A community gathering around a cafe table', label: 'Share and grow' },
  { id: '11', placement: 'notes', label: 'Conversations in public' },
  { id: '3', placement: 'workshop', label: 'Code & conversation' },
  { id: '21', placement: 'people', image: friends, alt: 'Friends gathered at a cafe, from the community photo archive', label: 'Building with others' },
]
export const featuredCommunity: FeaturedEntry[] = selection.map(({ id, ...feature }) => {
  const entry = communityEntries.find(entry => entry.id === id)
  if (!entry) throw new Error(`Missing featured community record: ${id}`)
  return { ...feature, entry }
})
