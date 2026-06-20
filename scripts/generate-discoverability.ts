import fs from 'fs'
import path from 'path'
import fm from 'front-matter'
import { siteConfig } from '../src/data/site.ts'
import { aboutBio } from '../src/data/about.ts'
import { workExperiences } from '../src/data/experience.ts'
import { mentorSpeakerEngagements } from '../src/data/mentorSpeaker.ts'
import { readBooks, currentlyReadingBooks, wishlistBooks } from '../src/data/books.ts'
import {
  currentlyReadingManhwa,
  wishlistManhwa,
  recommendedManhwa,
} from '../src/data/manhwa.ts'
import {
  SITE_URL,
  SITE_NAME,
  SITE_FULL_NAME,
  SITE_DESCRIPTION,
  STATIC_ROUTES,
  isIndexableBlogSlug,
  excerptFromMarkdown,
} from '../src/lib/seo.ts'

const ROOT = path.resolve(import.meta.dir, '..')
const PUBLIC_DIR = path.join(ROOT, 'public')
const BLOGS_DIR = path.join(ROOT, 'src/content/blogs')
const PROJECTS_DIR = path.join(ROOT, 'src/content/projects')
const SHORTS_DIR = path.join(ROOT, 'src/content/shorts')

interface BlogEntry {
  title: string
  slug: string
  description: string
  category: string
  date: string
  content: string
}

interface ProjectEntry {
  title: string
  slug: string
  description: string
  date: string
  techStack: string[]
  content: string
}

interface ShortEntry {
  title: string
  slug: string
  tags: string[]
  date: string
  content: string
}

interface SitemapEntry {
  loc: string
  lastmod: string
  changefreq: string
  priority: number
}

const readMarkdownDir = <T>(
  dir: string,
  map: (attributes: Record<string, unknown>, body: string) => T | null,
): T[] => {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const parsed = fm<Record<string, unknown>>(raw)
      return map(parsed.attributes, parsed.body.trim())
    })
    .filter((entry): entry is T => entry !== null)
}

const toIsoDate = (value?: string): string => {
  if (!value) return new Date().toISOString().slice(0, 10)
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10)
  return parsed.toISOString().slice(0, 10)
}

const isPlaceholderContent = (attributes: Record<string, unknown>): boolean => {
  const title = String(attributes.title ?? '').trim().toLowerCase()
  const description = String(attributes.description ?? '').trim().toLowerCase()
  return title === 'placeholder' || description === 'placeholder'
}

const loadBlogs = (): BlogEntry[] =>
  readMarkdownDir(BLOGS_DIR, (attributes, body) => {
    const slug = String(attributes.slug ?? '')
    const category = String(attributes.category ?? '')
    if (!slug || !isIndexableBlogSlug(slug, category) || isPlaceholderContent(attributes)) {
      return null
    }
    return {
      title: String(attributes.title ?? slug),
      slug,
      description: String(attributes.description ?? ''),
      category,
      date: String(attributes.date ?? ''),
      content: body,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const loadProjects = (): ProjectEntry[] =>
  readMarkdownDir(PROJECTS_DIR, (attributes, body) => {
    const slug = String(attributes.slug ?? '')
    if (!slug) return null
    return {
      title: String(attributes.title ?? slug),
      slug,
      description: String(attributes.description ?? ''),
      date: String(attributes.date ?? ''),
      techStack: Array.isArray(attributes.techStack)
        ? attributes.techStack.map(String)
        : [],
      content: body,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const loadShorts = (): ShortEntry[] =>
  readMarkdownDir(SHORTS_DIR, (attributes, body) => {
    const slug = String(attributes.slug ?? '')
    if (!slug) return null
    return {
      title: String(attributes.title ?? slug),
      slug,
      tags: Array.isArray(attributes.tags) ? attributes.tags.map(String) : [],
      date: String(attributes.date ?? ''),
      content: body,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const buildSitemapEntries = (
  blogs: BlogEntry[],
  projects: ProjectEntry[],
  shorts: ShortEntry[],
): SitemapEntry[] => {
  const entries: SitemapEntry[] = STATIC_ROUTES.map((route) => ({
    loc: route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: route.changefreq,
    priority: route.priority,
  }))

  for (const project of projects) {
    entries.push({
      loc: `${SITE_URL}/projects/${project.slug}`,
      lastmod: toIsoDate(project.date),
      changefreq: 'monthly',
      priority: 0.8,
    })
  }

  for (const blog of blogs) {
    entries.push({
      loc: `${SITE_URL}/blogs/${blog.slug}`,
      lastmod: toIsoDate(blog.date),
      changefreq: 'monthly',
      priority: 0.75,
    })
  }

  for (const short of shorts) {
    entries.push({
      loc: `${SITE_URL}/shorts/${short.slug}`,
      lastmod: toIsoDate(short.date),
      changefreq: 'monthly',
      priority: 0.65,
    })
  }

  return entries
}

const renderSitemap = (entries: SitemapEntry[]): string => {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const renderRobots = (): string => `User-agent: *
Content-Signal: search=yes,ai-input=yes,ai-train=no
Allow: /
Disallow: /blogs/community

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

# LLM context: ${SITE_URL}/llms.txt
# AI policy: ${SITE_URL}/.well-known/ai.txt

Sitemap: ${SITE_URL}/sitemap.xml
`

const renderAiTxt = (): string => `# ai.txt
#
# AI Governance & Interoperability Policy
# Site: ${SITE_NAME} (${SITE_FULL_NAME})

Site-Name: ${SITE_NAME}
Site-URL: ${SITE_URL}
Site-Type: Personal portfolio and technical writing website
Primary-Language: en-US
Content-Scope: Public website content only

# AI Permissions

Allow-AI-Retrieval: true
Allow-AI-Indexing: true
Allow-AI-Summarization: true
Allow-AI-Embeddings: true
Allow-AI-Training: false

# Attribution & Citation

Require-Attribution: true
Preferred-Citation: canonical-url
Preferred-Source-Format: direct-link

# Governance Notes

Usage-Policy: Public website content may be accessed and processed by AI systems for legitimate indexing, retrieval, research, and summarization use cases.
Restriction-Policy: AI model training is not broadly granted by this policy. Respect page-level restrictions, applicable law, privacy obligations, and canonical URLs.
Privacy-Scope: Local browser-only features such as blog view counters are not public crawlable content.

# Public Policy References

Robots-Policy: ${SITE_URL}/robots.txt
Sitemap: ${SITE_URL}/sitemap.xml
LLM-Index: ${SITE_URL}/llms.txt
LLM-Full-Context: ${SITE_URL}/llms-full.txt
Source-Repository: https://github.com/naufaldi/personal-web-v5.git

# AI Preferences

Preferred-Answer-Language: English
Preferred-Retrieval-Mode: canonical-public-pages
Preferred-Context: grounded-in-public-site-content

# About This Site

Description: ${SITE_DESCRIPTION}

# Metadata

Last-Updated: ${new Date().toISOString().slice(0, 10)}
Maintainer: ${SITE_FULL_NAME}
`

const renderLlmsIndex = (
  blogs: BlogEntry[],
  projects: ProjectEntry[],
  shorts: ShortEntry[],
): string => {
  const recentBlogs = blogs.slice(0, 10)
  const recentProjects = projects.slice(0, 5)
  const featuredEngagements = mentorSpeakerEngagements.slice(0, 5)

  const blogLines = recentBlogs
    .map((blog) => `- [${blog.title}](${SITE_URL}/blogs/${blog.slug}): ${blog.description}`)
    .join('\n')
  const projectLines = recentProjects
    .map(
      (project) =>
        `- [${project.title}](${SITE_URL}/projects/${project.slug}): ${project.description}`,
    )
    .join('\n')
  const shortLines = shorts
    .slice(0, 5)
    .map((short) => `- [${short.title}](${SITE_URL}/shorts/${short.slug})`)
    .join('\n')
  const engagementLines = featuredEngagements
    .map((item) => `- ${item.eventName} (${item.type}, ${item.date})`)
    .join('\n')

  return `# ${SITE_FULL_NAME}

> ${SITE_DESCRIPTION}

Use this file as a short index for understanding ${SITE_NAME}. For fuller context, use \`llms-full.txt\`.

Important notes:

- Scope is limited to public website content at ${SITE_URL}.
- Canonical blog URLs live on ${SITE_URL}/blogs/:slug.
- Draft and placeholder blog routes are excluded from the public index.

## Primary sources

- [Full site context](${SITE_URL}/llms-full.txt): Detailed summary for AI retrieval and citation.
- [Homepage](${SITE_URL}/): Portfolio landing page.
- [About](${SITE_URL}/about): Extended profile and work history.
- [Projects](${SITE_URL}/projects): Curated project catalog.
- [Blog index](${SITE_URL}/blogs): Technical writing and personal essays.
- [Speaker & mentor](${SITE_URL}/speaker): Speaking and mentoring work.

## Key facts

- ${SITE_FULL_NAME} is a software engineer and mentor from Indonesia.
- Strong frontend foundation with growing backend and product-system ownership.
- Public writing covers frontend engineering, career growth, AI tooling, and developer experience.
- Mentoring and speaking work spans workshops, bootcamps, and community sessions.

## Recent projects

${projectLines}

## Recent writing

${blogLines}

## Short notes

${shortLines}

## Speaking and mentoring highlights

${engagementLines}

## Preferred citation

When describing this site, refer to ${SITE_FULL_NAME} as a software engineer portfolio and link to ${SITE_URL}/ as the authoritative source.

## Optional

- [robots.txt](${SITE_URL}/robots.txt): Crawler access policy
- [sitemap.xml](${SITE_URL}/sitemap.xml): Site URL index
- [ai.txt](${SITE_URL}/.well-known/ai.txt): AI usage and citation preferences
`
}

const renderLlmsFull = (
  blogs: BlogEntry[],
  projects: ProjectEntry[],
  shorts: ShortEntry[],
): string => {
  const projectSections = projects
    .map(
      (project) => `### ${project.title}

- URL: ${SITE_URL}/projects/${project.slug}
- Description: ${project.description}
- Stack: ${project.techStack.join(', ') || 'N/A'}
- Updated: ${project.date || 'N/A'}
- Summary: ${excerptFromMarkdown(project.content, 320)}`,
    )
    .join('\n\n')

  const blogSections = blogs
    .slice(0, 25)
    .map(
      (blog) => `### ${blog.title}

- URL: ${SITE_URL}/blogs/${blog.slug}
- Category: ${blog.category}
- Published: ${blog.date}
- Description: ${blog.description}
- Summary: ${excerptFromMarkdown(blog.content, 280)}`,
    )
    .join('\n\n')

  const shortSections = shorts
    .map(
      (short) => `### ${short.title}

- URL: ${SITE_URL}/shorts/${short.slug}
- Tags: ${short.tags.join(', ') || 'N/A'}
- Published: ${short.date}
- Summary: ${excerptFromMarkdown(short.content, 220)}`,
    )
    .join('\n\n')

  const experienceLines = workExperiences
    .slice(0, 6)
    .map((item) => `- ${item.role} at ${item.companyName} (${item.startDate} – ${item.endDate})`)
    .join('\n')

  const engagementLines = mentorSpeakerEngagements
    .slice(0, 10)
    .map((item) => `- ${item.eventName}: ${item.brief}`)
    .join('\n')

  const bookCount = readBooks.length + currentlyReadingBooks.length + wishlistBooks.length
  const manhwaCount =
    currentlyReadingManhwa.length + wishlistManhwa.length + recommendedManhwa.length

  return `# ${SITE_FULL_NAME}

> ${SITE_DESCRIPTION}

This file provides fuller public context for AI systems. Use canonical URLs on ${SITE_URL} as the source of truth.

## Site overview

${SITE_FULL_NAME}, also known as ${siteConfig.name}, is a software engineer and mentor focused on product systems, frontend craft, performance, and developer experience. The public site is a Vite React SPA with markdown-backed projects, blogs, and short notes.

## Identity

- Name: ${aboutBio.name}
- Title: ${aboutBio.title}
- Bio: ${aboutBio.bioParagraphs.join(' ')}
- Location: Bekasi, Indonesia

## Public routes

- ${SITE_URL}/
- ${SITE_URL}/about
- ${SITE_URL}/projects
- ${SITE_URL}/blogs
- ${SITE_URL}/speaker
- ${SITE_URL}/shorts
- ${SITE_URL}/book
- ${SITE_URL}/manhwa

## Work experience highlights

${experienceLines}

## Projects

${projectSections}

## Recent blog writing

${blogSections}

## Short notes

${shortSections}

## Speaking and mentoring

${engagementLines}

## Personal sections

- Books page lists ${bookCount} titles across read, currently reading, and wishlist sections.
- Manhwa page lists ${manhwaCount} titles across reading and recommendation sections.

## Canonical and policy references

- [llms.txt](${SITE_URL}/llms.txt)
- [robots.txt](${SITE_URL}/robots.txt)
- [sitemap.xml](${SITE_URL}/sitemap.xml)
- [ai.txt](${SITE_URL}/.well-known/ai.txt)

## Preferred citation

Refer to ${SITE_FULL_NAME} as a software engineer portfolio and cite ${SITE_URL} as the authoritative public source.
`
}

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const blogs = loadBlogs()
const projects = loadProjects()
const shorts = loadShorts()
const sitemapEntries = buildSitemapEntries(blogs, projects, shorts)

ensureDir(PUBLIC_DIR)
ensureDir(path.join(PUBLIC_DIR, '.well-known'))
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), renderSitemap(sitemapEntries))
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), renderRobots())
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), renderLlmsIndex(blogs, projects, shorts))
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), renderLlmsFull(blogs, projects, shorts))
fs.writeFileSync(path.join(PUBLIC_DIR, '.well-known/ai.txt'), renderAiTxt())

console.log(`Generated discoverability files in ${PUBLIC_DIR}`)
console.log(`- sitemap.xml (${sitemapEntries.length} URLs)`)
console.log(`- robots.txt`)
console.log(`- llms.txt`)
console.log(`- llms-full.txt`)
console.log(`- .well-known/ai.txt`)
