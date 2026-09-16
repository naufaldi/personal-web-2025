import type { ImageMetadata } from 'astro'
import portrait from '@/assets/collected/portrait.jpg'
import community from '@/assets/collected/community.jpg'
import project from '@/assets/collected/project.png'
import cleanCode from '@/assets/shelves/book-clean.jpg'
import soloLeveling from '@/assets/shelves/manhwa-solo.jpg'
import { photographs } from '@/data/photography'
import { featuredWriting } from '@/data/writingCollection'
import { siteSections, type SiteSection } from '@/data/siteSections'

type Visual = { kind: 'image'; image: ImageMetadata; alt: string; position?: string } | { kind: 'note'; title: string; excerpt: string }
export interface CollectionArtifact {
  section: SiteSection
  variant: 'portrait' | 'software' | 'album' | 'community' | 'library' | 'personal' | 'note'
  title: string
  visual: Visual
}
const section = (id: SiteSection['id']): SiteSection => siteSections.find(section => section.id === id)!
export const artifacts: CollectionArtifact[] = [
  { section: section('about'), variant: 'portrait', title: 'A face behind the work', visual: { kind: 'image', image: portrait, alt: 'Faldi outside a building, wearing glasses and a blue shirt', position: '50% 45%' } },
  { section: section('projects'), variant: 'software', title: 'Things I build', visual: { kind: 'image', image: project, alt: 'Next.js Leaflet project showing a map and tutorial navigation' } },
  { section: section('photography'), variant: 'album', title: 'Through my lens', visual: { kind: 'image', image: photographs[0].image, alt: photographs[0].alt } },
  { section: section('community'), variant: 'community', title: 'Learning together', visual: { kind: 'image', image: community, alt: 'Community members together around a table in a cafe', position: '50% 58%' } },
  { section: section('books'), variant: 'library', title: 'On my bookshelf', visual: { kind: 'image', image: cleanCode, alt: 'Clean Code book cover' } },
  { section: section('manhwa'), variant: 'personal', title: 'Stories I follow', visual: { kind: 'image', image: soloLeveling, alt: 'Solo Leveling cover' } },
  { section: section('blog'), variant: 'note', title: 'Notes and ideas', visual: { kind: 'note', title: featuredWriting[0].title, excerpt: featuredWriting[0].description ?? '' } },
]
