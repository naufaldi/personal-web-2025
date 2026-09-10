import { portfolioItems } from '@/data/portfolio'
import type { ArchiveEntry } from '@/data/archive'
import type { ImageMetadata } from 'astro'

const coverModules = import.meta.glob<ImageMetadata>('../assets/project-covers/*.png', { eager: true, import: 'default' })
const illustrations = new Set(['ts-hooks-kit', 'reading-list', 'mac-fan-ctrl', 'worker-class', 'teacher-exam', 'cursor-feb-2026', 'viralkan-app', 'pangan-be'])
export const projectCover = (slug: string) => {
  const image = coverModules[`../assets/project-covers/${slug}.png`]
  if (!image) throw new Error(`Missing project cover: ${slug}`)
  return { image, kind: illustrations.has(slug) ? 'illustration' as const : 'screenshot' as const }
}

const experiments = new Set(['nextjs-leaflet', 'slate-js-editor', 'reading-list', 'redux-toolkit-example'])
export const projectEntries: ArchiveEntry[] = portfolioItems.map(project => ({
  id: project.slug, title: project.title, description: project.description,
  categories: [experiments.has(project.slug) ? 'Experiments' : 'Software'],
  meta: project.techStack.slice(0, 3).join(' / '), tags: project.techStack,
  href: `/projects/${project.slug}`, image: projectCover(project.slug).image, imageKind: projectCover(project.slug).kind,
}))
export const featuredProjects = ['ts-hooks-kit', 'nextjs-leaflet', 'slate-js-editor', 'reading-list'].map(id => {
  const entry = projectEntries.find(entry => entry.id === id)
  if (!entry) throw new Error(`Missing featured project: ${id}`)
  return entry
})
