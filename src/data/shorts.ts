import { parseMarkdown } from '@/lib/markdown'

export interface Short {
  title: string
  slug: string
  tags: string[]
  date: string
  content: string
}

const markdownModules = import.meta.glob<string>('../content/shorts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const loadShorts = (): Short[] => {
  const shorts: Short[] = []

  for (const path in markdownModules) {
    const markdownContent = markdownModules[path] as string
    const parsed = parseMarkdown(markdownContent)

    shorts.push({
      title: parsed.frontmatter.title,
      slug: parsed.frontmatter.slug,
      tags: parsed.frontmatter.tags,
      date: parsed.frontmatter.date,
      content: parsed.content,
    })
  }

  return shorts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const allShorts = loadShorts()

export const getShortBySlug = (slug: string): Short | undefined => {
  return allShorts.find((short) => short.slug === slug)
}

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>()
  allShorts.forEach((short) => {
    short.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

