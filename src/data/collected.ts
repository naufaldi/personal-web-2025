import type { ImageMetadata } from 'astro'
import portrait from '@/assets/collected/portrait.jpg'
import workspace from '@/assets/collected/workspace.jpg'
import meetup from '@/assets/collected/meetup.jpg'
import community from '@/assets/collected/community.jpg'
import friends from '@/assets/collected/friends.jpg'
import personal from '@/assets/collected/personal.jpg'
import project from '@/assets/collected/project.png'
import { aboutBio } from '@/data/about'

export type CollectionCategory = 'Software' | 'Photography' | 'Community'
export interface CollectionMedia {
  image: ImageMetadata
  alt: string
  position: string
  source: string
}
export interface CollectionArtifact {
  id: string
  category: CollectionCategory
  title: string
  label: string
  context: string
  source: string
  variant: 'portrait' | 'software' | 'album' | 'community' | 'library' | 'personal' | 'note'
  media: CollectionMedia[]
  href: string
  linkLabel: string
}

const photo = (image: ImageMetadata, alt: string, position = '50% 50%'): CollectionMedia => ({
  image, alt, position, source: 'src/data/about.ts: existing personal photo collection; reuse approved by owner',
})

export const artifacts: CollectionArtifact[] = [
  {
    id: 'portrait', category: 'Photography', variant: 'portrait',
    title: 'A face behind the work', label: 'Life, in between',
    context: 'I’m a software engineer and mentor from Bekasi, Indonesia. This is a small collection of the work, people, and everyday moments in my life.',
    source: 'src/data/about.ts: aboutBio',
    media: [photo(portrait, 'Faldi outside a building, wearing glasses and a blue shirt', '50% 45%')],
    href: '/about', linkLabel: 'More about me',
  },
  {
    id: 'nextjs-leaflet', category: 'Software', variant: 'software',
    title: 'Next.js + Leaflet', label: 'Maps, made interactive',
    context: 'A practical project exploring interactive maps in Next.js, with Leaflet, GeoJSON, and TypeScript. Built as a reference for a tutorial series.',
    source: 'src/content/projects/nextjs-leaflet.md',
    media: [{ image: project, alt: 'Next.js Leaflet project showing a map and tutorial navigation', position: '50% 50%', source: 'src/content/projects/nextjs-leaflet.md: image' }],
    href: '/projects/nextjs-leaflet', linkLabel: 'Read the case study',
  },
  {
    id: 'contact-sheet', category: 'Photography', variant: 'album',
    title: 'A few things I keep', label: 'A closer look',
    context: 'Personal photographs from my existing collection: a workspace, time playing games, and people from community gatherings. Photography here means moments from my life, without a claim that I took every photograph.',
    source: 'src/data/about.ts: journeyPhotos',
    media: [photo(workspace, 'Desk with two monitors and a laptop'), photo(personal, 'Two game controllers in front of a game'), photo(friends, 'Friends gathered around a table'), photo(meetup, 'A group photograph at a community meetup')],
    href: '/about', linkLabel: 'Explore my journey',
  },
  {
    id: 'community', category: 'Community', variant: 'community',
    title: 'Learning together', label: 'People make the difference',
    context: 'I enjoy helping other people grow through mentoring, workshops, and community conversations. This photograph comes from the community collection on my About page.',
    source: 'src/data/about.ts: bioParagraphs and journeyPhotos',
    media: [photo(community, 'Community members together around a table in a cafe', '50% 58%')],
    href: '/speaker', linkLabel: 'Speaking & mentoring',
  },
  {
    id: 'ts-hooks-kit', category: 'Software', variant: 'library',
    title: 'ts-hooks-kit', label: 'Small tools, shared',
    context: 'A typed React hooks library for React 18 and 19, with documentation, examples, and a migration path from usehooks-ts.',
    source: 'src/content/projects/ts-hooks-kit.md', media: [],
    href: '/projects/ts-hooks-kit', linkLabel: 'Explore the project',
  },
  {
    id: 'off-screen', category: 'Photography', variant: 'personal',
    title: 'Time for play', label: 'Beyond the work',
    context: 'A quieter moment from my personal photo collection: playing a game together. There is a life outside the editor, too.',
    source: 'src/data/about.ts: journeyPhotos, image date.jpg; caption corrected after visual inspection',
    media: [photo(personal, 'Two people holding game controllers in front of a screen', '50% 72%')],
    href: '/about', linkLabel: 'Meet the person',
  },
  {
    id: 'a-small-note', category: 'Community', variant: 'note',
    title: 'Still learning', label: 'A small note',
    context: aboutBio.bioParagraphs[0],
    source: 'src/data/about.ts: aboutBio.bioParagraphs[0]', media: [],
    href: '/about#experiences-heading', linkLabel: 'Read my experience',
  },
]

export const collectionRoutes = [
  { title: 'About', href: '/about' },
  { title: 'Experience', href: '/about#experiences-heading' },
  { title: 'Projects', href: '/projects' },
  { title: 'Writing', href: '/blogs' },
  { title: 'Community', href: '/speaker' },
  { title: 'Shorts', href: '/shorts' },
  { title: 'Books', href: '/book' },
  { title: 'Manhwa', href: '/manhwa' },
]
