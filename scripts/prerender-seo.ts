import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { buildSeoRoutes, createJsonLdForRoute, siteMetadata } from './seo-data'
import type { JsonLdPayload, SeoRoute } from '../src/lib/seo'

const distDirectory = 'dist'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeAttribute = (value: string) => escapeHtml(value).replace(/'/g, '&#39;')

const toAbsoluteUrl = (url?: string) => {
  const fallback = `${siteMetadata.siteUrl}${siteMetadata.defaultImage}`

  if (!url) {
    return fallback
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return `${siteMetadata.siteUrl}${url.startsWith('/') ? url : `/${url}`}`
}

const renderJsonLd = (payloads: JsonLdPayload[]) =>
  payloads
    .map(
      (payload) =>
        `<script type="application/ld+json">${JSON.stringify(payload)}</script>`
    )
    .join('\n')

const renderInlineMarkdown = (value: string) =>
  escapeHtml(value)
    .replace(/!\[([^\]]*)]\(([^)]+)\)/g, '')
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')

const renderMarkdownContent = (content: string) => {
  const lines = content.split(/\r?\n/)
  const html: string[] = []
  let paragraph: string[] = []
  let listItems: string[] = []
  let codeLines: string[] = []
  let inCodeBlock = false

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return
    }

    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`)
    paragraph = []
  }

  const flushList = () => {
    if (listItems.length === 0) {
      return
    }

    html.push(`<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`)
    listItems = []
  }

  const flushCode = () => {
    if (codeLines.length === 0) {
      return
    }

    html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
    codeLines = []
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCode()
        inCodeBlock = false
      } else {
        flushParagraph()
        flushList()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (!trimmed) {
      flushParagraph()
      flushList()
      continue
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)]\(([^)]+)\)/)
    if (imageMatch) {
      flushParagraph()
      flushList()
      html.push(
        `<figure><img src="${escapeAttribute(imageMatch[2])}" alt="${escapeAttribute(imageMatch[1])}" loading="lazy" decoding="async" /></figure>`
      )
      continue
    }

    const headingMatch = trimmed.match(/^(#{2,4})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      flushList()
      const level = Math.min(headingMatch[1].length, 4)
      html.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`)
      continue
    }

    const listMatch = trimmed.match(/^[-*]\s+(.+)$/)
    if (listMatch) {
      flushParagraph()
      listItems.push(listMatch[1])
      continue
    }

    const orderedListMatch = trimmed.match(/^\d+\.\s+(.+)$/)
    if (orderedListMatch) {
      flushParagraph()
      listItems.push(orderedListMatch[1])
      continue
    }

    if (trimmed.startsWith('>')) {
      flushParagraph()
      flushList()
      html.push(`<blockquote>${renderInlineMarkdown(trimmed.replace(/^>\s?/, ''))}</blockquote>`)
      continue
    }

    paragraph.push(trimmed)
  }

  flushParagraph()
  flushList()
  flushCode()

  return html.join('\n')
}

const renderStaticContent = (route: SeoRoute) => {
  const contentHtml = route.content
    ? renderMarkdownContent(route.content)
    : `<p>${escapeHtml(route.description)}</p>`
  const publishedDate = route.date
    ? `<time datetime="${escapeAttribute(route.date)}">${escapeHtml(route.date)}</time>`
    : ''
  const tags = route.tags?.length
    ? `<ul aria-label="Tags">${route.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>`
    : ''
  const image = route.image
    ? `<img src="${escapeAttribute(toAbsoluteUrl(route.image))}" alt="${escapeAttribute(route.title)}" loading="eager" decoding="async" />`
    : ''

  return `<main data-prerendered-content="true" style="max-width: 760px; margin: 0 auto; padding: 48px 24px; font-family: system-ui, sans-serif; line-height: 1.7;">
      <article>
        <header>
          <p style="text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.75rem;">${escapeHtml(route.kind)}</p>
          <h1>${escapeHtml(route.title)}</h1>
          <p>${escapeHtml(route.description)}</p>
          ${publishedDate}
          ${tags}
        </header>
        ${image}
        <section>
          ${contentHtml}
        </section>
      </article>
    </main>`
}

const renderSeoBlock = (route: SeoRoute) => {
  const image = toAbsoluteUrl(route.image)
  const type = route.kind === 'blog' ? 'article' : 'website'
  const jsonLd = renderJsonLd(createJsonLdForRoute(route))

  return `<title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="author" content="${escapeHtml(siteMetadata.siteName)}" />
    <link rel="canonical" href="${escapeHtml(route.canonicalUrl)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="Faldi" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:url" content="${escapeHtml(route.canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(route.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@f2aldi" />
    <meta name="twitter:creator" content="@f2aldi" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(route.title)}" />
    ${route.noindex ? '<meta name="robots" content="noindex, nofollow" />' : '<meta name="robots" content="index, follow" />'}
    ${jsonLd}`
}

const removeExistingSeo = (html: string) =>
  html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']author["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>\s*/gi, '')

const injectSeo = (baseHtml: string, route: SeoRoute) => {
  const cleanedHtml = removeExistingSeo(baseHtml)
  const seoBlock = renderSeoBlock(route)

  return cleanedHtml
    .replace(/(<meta\s+name=["']viewport["'][^>]*>\s*)/i, `$1\n    ${seoBlock}\n`)
    .replace(
      /<div\s+id=["']root["'][^>]*>\s*<\/div>/i,
      `<div id="root">${renderStaticContent(route)}</div>`
    )
}

const routeToOutputPaths = (routePath: string) => {
  if (routePath === '/') {
    return [path.join(distDirectory, 'index.html')]
  }

  const cleanPath = routePath.replace(/^\//, '')

  return [
    path.join(distDirectory, cleanPath, 'index.html'),
    path.join(distDirectory, `${cleanPath}.html`),
  ]
}

const main = async () => {
  const baseHtml = await readFile(path.join(distDirectory, 'index.html'), 'utf8')
  const { routes } = await buildSeoRoutes()

  for (const route of routes.filter((item) => !item.noindex)) {
    const html = injectSeo(baseHtml, route)
    const outputPaths = routeToOutputPaths(route.path)

    for (const outputPath of outputPaths) {
      await mkdir(path.dirname(outputPath), { recursive: true })
      await writeFile(outputPath, html, 'utf8')
    }
  }

  console.log(`Prerendered SEO HTML for ${routes.length} routes.`)
}

await main()
