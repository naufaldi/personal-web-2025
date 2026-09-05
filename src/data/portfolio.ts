import { parseMarkdown, type PortfolioFrontmatter } from '@/lib/markdown'

export interface PortfolioItem {
  id: string
  title: string
  description: string
  slug: string
  image: string
  liveUrl?: string
  githubUrl?: string
  status?: string
  featuredOrder?: number
  techStack: string[]
  content?: string
  date?: string
  type?: 'project' | 'blog'
}

const markdownModules = import.meta.glob<string>('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const createPortfolioItem = (markdownContent: string): PortfolioItem => {
  const parsed = parseMarkdown<PortfolioFrontmatter>(markdownContent)

  return {
    id: parsed.frontmatter.slug,
    title: parsed.frontmatter.title,
    description: parsed.frontmatter.description,
    slug: parsed.frontmatter.slug,
    image: parsed.frontmatter.image,
    liveUrl: parsed.frontmatter.liveUrl,
    githubUrl: parsed.frontmatter.githubUrl,
    status: parsed.frontmatter.status,
    featuredOrder: parsed.frontmatter.featuredOrder,
    techStack: parsed.frontmatter.techStack,
    content: parsed.content,
    date: parsed.frontmatter.date,
    type: parsed.frontmatter.type || 'project',
  }
}

const sortByNewest = (first: PortfolioItem, second: PortfolioItem): number => {
  if (!first.date || !second.date) {
    return 0
  }

  return new Date(second.date).getTime() - new Date(first.date).getTime()
}

const loadProjects = (): PortfolioItem[] =>
  Object.values(markdownModules).map(createPortfolioItem).sort(sortByNewest)

export const portfolioItems = loadProjects()

export const featuredPortfolioItems = portfolioItems
  .filter((item) => item.featuredOrder !== undefined)
  .sort((first, second) => first.featuredOrder! - second.featuredOrder!)

export const getProjectBySlug = (slug: string): PortfolioItem | undefined => {
  return portfolioItems.find((project) => project.slug === slug)
}
