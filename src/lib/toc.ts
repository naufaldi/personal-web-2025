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

const createTOCItem = (text: string, level: TOCItem['level']): TOCItem => ({
  id: slugify(text),
  text,
  level,
})

const parseHeadingLine = (line: string): TOCItem | null => {
  const h3Match = line.match(/^###\s+(.+)$/)
  if (h3Match) {
    return createTOCItem(h3Match[1].trim(), 3)
  }

  const h2Match = line.match(/^##\s+(.+)$/)
  if (h2Match) {
    return createTOCItem(h2Match[1].trim(), 2)
  }

  return null
}

export const extractTOC = (markdown: string): TOCItem[] =>
  markdown
    .split('\n')
    .map(parseHeadingLine)
    .filter((item): item is TOCItem => item !== null)
