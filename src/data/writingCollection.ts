import { blogItems } from '@/data/blogs'
import type { ArchiveEntry } from '@/data/archive'
import { excerptFromMarkdown } from '@/lib/seo'

const labels: Record<string, string> = { 'My journey': 'Journey', Idea: 'Ideas', 'Technical writer': 'Technical', Opinions: 'Opinions' }
const entities: Record<string, string> = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' }
const decode = (text: string) => text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity: string) => {
  if (!entity.startsWith('#')) return entities[entity.toLowerCase()] ?? match
  const code = entity.toLowerCase().startsWith('#x') ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
  return code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match
})
export const writingEntries: ArchiveEntry[] = blogItems.map(blog => {
  const excerpt = decode(excerptFromMarkdown(blog.description, 220))
  const firstSentence = excerpt.match(/^.*?[.!?](?:\s|$)/)?.[0].trim()
  const date = new Date(blog.date)
  return {
    id: blog.slug, title: decode(blog.title), categories: [labels[blog.category] ?? blog.category],
    description: firstSentence || excerpt || undefined,
    meta: `${Number.isNaN(date.getTime()) ? blog.date : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })} / ${blog.readTime} min read`,
    href: `/blogs/${blog.slug}`,
  }
})
export const featuredWriting = [
  'menulis-untuk-membuat-sejarah',
  'harus-ya-mahir-menuliskan-kode',
  'reading-book',
  'state-management-in-reactjs',
  'pelajaran-yang-saya-dapatkan-saat-memberikan-mentorship-frontend',
].map(id => {
  const entry = writingEntries.find(entry => entry.id === id)
  if (!entry) throw new Error(`Missing featured essay: ${id}`)
  return entry
})
