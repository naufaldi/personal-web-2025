import type { Root, Content } from 'mdast'
import { createMarkdownProcessor } from '@astrojs/markdown-remark'

function normalizeHeadings() {
  return (tree: Root) => {
    const visit = (node: Root | Content) => {
      if (node.type === 'heading' && node.depth === 1) node.depth = 2
      if ('children' in node) node.children.forEach(visit)
    }
    visit(tree)
  }
}
const processor = createMarkdownProcessor({ gfm: true, remarkPlugins: [normalizeHeadings], smartypants: false, syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] }, shikiConfig: { theme: 'github-dark' } })
export async function renderReading(content: string) {
  const result = await (await processor).render(content)
  return { html: result.code, headings: result.metadata.headings.filter(heading => heading.depth <= 3) }
}
