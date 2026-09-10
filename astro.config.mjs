import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'

const markdown = mdx({
  remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }]],
  rehypePlugins: [rehypeSlug],
})

export default defineConfig({
  site: 'https://naufaldi.com',
  srcDir: './src/astro',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), {
      ...markdown,
      name: 'legacy-markdown-no-raw',
      transform(code, id) {
        if (id.includes('?') || !/content\/blogs\/.*\.md$/.test(id)) return null
        return markdown.transform.call(this, code, id)
      },
    }],
    resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
  },
})
