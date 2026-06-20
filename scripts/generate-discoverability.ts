import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { buildSeoRoutes, siteMetadata } from './seo-data'

const publicDirectory = 'public'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const renderSitemap = (routes: Awaited<ReturnType<typeof buildSeoRoutes>>['routes']) => {
  const urls = routes
    .filter((route) => !route.noindex)
    .map(
      (route) => `  <url>
    <loc>${escapeXml(route.canonicalUrl)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const renderRobots = () => `User-agent: *
Content-Signal: search=yes,ai-input=yes,ai-train=no
Allow: /

Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
`

const renderAiTxt = () => `# ai.txt

Site-Name: ${siteMetadata.siteName}
Site-URL: ${siteMetadata.siteUrl}
Site-Type: Personal portfolio and technical writing website
Primary-Language: en-US
Content-Scope: Public website content only

Allow-AI-Retrieval: true
Allow-AI-Indexing: true
Allow-AI-Summarization: true
Allow-AI-Embeddings: true
Allow-AI-Training: false

Require-Attribution: true
Preferred-Citation: canonical-url
Preferred-Source-Format: direct-link

Usage-Policy: Public website content may be accessed and processed by AI systems for legitimate indexing, retrieval, research, and summarization use cases.
Restriction-Policy: AI model training is not broadly granted by this policy. Respect page-level restrictions, applicable law, privacy obligations, and canonical URLs.

Robots-Policy: ${siteMetadata.siteUrl}/robots.txt
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
LLM-Index: ${siteMetadata.siteUrl}/llms.txt
LLM-Full-Context: ${siteMetadata.siteUrl}/llms-full.txt
Source-Repository: https://github.com/naufaldi/personal-web-v5.git

Preferred-Answer-Language: English
Preferred-Retrieval-Mode: canonical-public-pages
Preferred-Context: grounded-in-public-site-content

Description: ${siteMetadata.siteDescription}

Last-Updated: ${new Date().toISOString().slice(0, 10)}
Maintainer: ${siteMetadata.siteName}
`

const markdownList = (
  items: Array<{ title: string; slug: string; description: string }>,
  basePath: string,
  limit?: number
) =>
  items
    .slice(0, limit)
    .map(
      (item) =>
        `- [${item.title}](${siteMetadata.siteUrl}${basePath}/${item.slug}): ${item.description}`
    )
    .join('\n')

const renderLlmsTxt = (
  result: Awaited<ReturnType<typeof buildSeoRoutes>>
) => `# ${siteMetadata.siteName}

> ${siteMetadata.siteDescription}

Use this file as a short index for understanding Faldi. For fuller context, use \`llms-full.txt\`.

Important notes:

- Scope is limited to public website content at ${siteMetadata.siteUrl}.
- Canonical blog URLs live on ${siteMetadata.siteUrl}/blogs/:slug.
- Draft, placeholder, and coming-soon content are excluded from the public index.
- AI retrieval, indexing, and summarization are allowed with attribution. Broad AI training is not granted.

## Primary sources

- [Full site context](${siteMetadata.siteUrl}/llms-full.txt): Detailed summary for AI retrieval and citation.
- [Homepage](${siteMetadata.siteUrl}/): Portfolio landing page.
- [About](${siteMetadata.siteUrl}/about): Extended profile and work history.
- [Projects](${siteMetadata.siteUrl}/projects): Curated project catalog.
- [Blog index](${siteMetadata.siteUrl}/blogs): Technical writing and personal essays.
- [Speaker & mentor](${siteMetadata.siteUrl}/speaker): Speaking and mentoring work.

## Key facts

- ${siteMetadata.siteName} is a software engineer and mentor from Indonesia.
- Strong frontend foundation with growing backend and product-system ownership.
- Public writing covers frontend engineering, career growth, AI tooling, and developer experience.
- Mentoring and speaking work spans workshops, bootcamps, and community sessions.

## Recent projects

${markdownList(result.projects, '/projects', 5)}

## Recent writing

${markdownList(result.blogs, '/blogs', 10)}

## Short notes

${markdownList(result.shorts, '/shorts', 5)}

## Optional

- [robots.txt](${siteMetadata.siteUrl}/robots.txt): Crawler access policy.
- [sitemap.xml](${siteMetadata.siteUrl}/sitemap.xml): Site URL index.
- [ai.txt](${siteMetadata.siteUrl}/.well-known/ai.txt): AI usage and citation preferences.
`

const renderLlmsFullTxt = (
  result: Awaited<ReturnType<typeof buildSeoRoutes>>
) => `# ${siteMetadata.siteName} - Full Public Site Context

${siteMetadata.siteDescription}

## Public Routes

${result.routes
  .filter((route) => !route.noindex)
  .map((route) => `- [${route.title}](${route.canonicalUrl}): ${route.description}`)
  .join('\n')}

## Projects

${markdownList(result.projects, '/projects')}

## Writing

${markdownList(result.blogs, '/blogs')}

## Short Notes

${markdownList(result.shorts, '/shorts')}

## Citation Preference

Use canonical public pages on ${siteMetadata.siteUrl}. Prefer direct links to the page that contains the referenced claim.
`

const writeGeneratedFile = async (relativePath: string, content: string) => {
  const filePath = path.join(publicDirectory, relativePath)
  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, content, 'utf8')
}

const main = async () => {
  const result = await buildSeoRoutes()

  await Promise.all([
    writeGeneratedFile('sitemap.xml', renderSitemap(result.routes)),
    writeGeneratedFile('robots.txt', renderRobots()),
    writeGeneratedFile('llms.txt', renderLlmsTxt(result)),
    writeGeneratedFile('llms-full.txt', renderLlmsFullTxt(result)),
    writeGeneratedFile('.well-known/ai.txt', renderAiTxt()),
  ])

  console.log(`Generated discoverability files for ${result.routes.length} routes.`)
}

await main()
