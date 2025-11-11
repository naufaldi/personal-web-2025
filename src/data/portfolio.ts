import { parseMarkdown, type PortfolioFrontmatter } from '@/lib/markdown'

export interface PortfolioItem {
  id: string
  title: string
  description: string
  slug: string
  image: string
  liveUrl?: string
  githubUrl?: string
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

const loadProjects = (): PortfolioItem[] => {
  const projects: PortfolioItem[] = []

  for (const path in markdownModules) {
    const markdownContent = markdownModules[path] as string
    const parsed = parseMarkdown<PortfolioFrontmatter>(markdownContent)

    projects.push({
      id: parsed.frontmatter.slug,
      title: parsed.frontmatter.title,
      description: parsed.frontmatter.description,
      slug: parsed.frontmatter.slug,
      image: parsed.frontmatter.image,
      liveUrl: parsed.frontmatter.liveUrl,
      githubUrl: parsed.frontmatter.githubUrl,
      techStack: parsed.frontmatter.techStack,
      content: parsed.content,
      date: parsed.frontmatter.date,
      type: parsed.frontmatter.type || 'project',
    })
  }

  return projects.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return 0
  })
}

export const portfolioItems = loadProjects()

export const getProjectBySlug = (slug: string): PortfolioItem | undefined => {
  return portfolioItems.find((project) => project.slug === slug)
}

