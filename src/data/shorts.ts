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

const createShort = (markdownContent: string): Short => {
  const parsed = parseMarkdown(markdownContent)

  return {
    title: parsed.frontmatter.title,
    slug: parsed.frontmatter.slug,
    tags: parsed.frontmatter.tags,
    date: parsed.frontmatter.date,
    content: parsed.content,
  }
}

const sortByNewest = (first: Short, second: Short): number =>
  new Date(second.date).getTime() - new Date(first.date).getTime()

const loadShorts = (): Short[] =>
  Object.values(markdownModules).map(createShort).sort(sortByNewest)

export const allShorts = loadShorts()

export const getShortBySlug = (slug: string): Short | undefined => {
  return allShorts.find((short) => short.slug === slug)
}

export const getAllTags = (): string[] => {
  return Array.from(new Set(allShorts.flatMap((short) => short.tags))).sort()
}
