import { portfolioItems } from '@/data/portfolio'
import type { ArchiveEntry } from '@/data/archive'
import map from '@/assets/collected/project.png'
import slate from '@/assets/shelves/project-slate.png'

const experiments = new Set(['nextjs-leaflet', 'slate-js-editor', 'reading-list', 'redux-toolkit-example'])
const images = new Map([['nextjs-leaflet', map], ['slate-js-editor', slate]])
export const projectEntries: ArchiveEntry[] = portfolioItems.map(project => ({
  id: project.slug, title: project.title, description: project.description,
  categories: [experiments.has(project.slug) ? 'Experiments' : 'Software'],
  meta: project.techStack.slice(0, 3).join(' / '), tags: project.techStack,
  href: `/projects/${project.slug}`, image: images.get(project.slug),
}))
export const featuredProjects = ['ts-hooks-kit', 'nextjs-leaflet', 'slate-js-editor', 'reading-list'].map(id => {
  const entry = projectEntries.find(entry => entry.id === id)
  if (!entry) throw new Error(`Missing featured project: ${id}`)
  return entry
})
