export interface TOCItem {
  id: string
  text: string
  level: 2 | 3
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const extractTOC = (markdown: string): TOCItem[] => {
  const toc: TOCItem[] = []
  const lines = markdown.split('\n')
  
  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/)
    const h3Match = line.match(/^###\s+(.+)$/)
    
    if (h2Match) {
      const text = h2Match[1].trim()
      toc.push({
        id: slugify(text),
        text,
        level: 2,
      })
    } else if (h3Match) {
      const text = h3Match[1].trim()
      toc.push({
        id: slugify(text),
        text,
        level: 3,
      })
    }
  }
  
  return toc
}
