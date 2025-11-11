import fm from 'front-matter'

export interface Frontmatter {
  title: string
  slug: string
  tags: string[]
  date: string
}

export interface ParsedMarkdown {
  frontmatter: Frontmatter
  content: string
}

export const parseMarkdown = (markdown: string): ParsedMarkdown => {
  const { attributes, body } = fm<Frontmatter>(markdown)
  return {
    frontmatter: attributes,
    content: body.trim(),
  }
}

