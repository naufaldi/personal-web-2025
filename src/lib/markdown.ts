import fm from 'front-matter'

export interface Frontmatter {
  title: string
  slug: string
  tags: string[]
  date: string
}

export interface PortfolioFrontmatter {
  title: string
  slug: string
  description: string
  image: string
  liveUrl?: string
  githubUrl?: string
  techStack: string[]
  date: string
  type?: 'project' | 'blog'
}

export interface BlogFrontmatter {
  title: string
  slug: string
  description: string
  category: 'My journey' | 'Idea' | 'Technical writer' | 'Opinions'
  author: {
    name: string
    avatar: string
  }
  date: string
  image?: string
  readTime?: number
}

export interface ParsedMarkdown<T = Frontmatter> {
  frontmatter: T
  content: string
}

export const parseMarkdown = <T = Frontmatter>(markdown: string): ParsedMarkdown<T> => {
  const { attributes, body } = fm<T>(markdown)
  return {
    frontmatter: attributes,
    content: body.trim(),
  }
}

