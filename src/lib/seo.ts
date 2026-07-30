import { siteConfig } from '@/data/site'

export const SITE_URL = 'https://naufaldi.com'
export const SITE_NAME = 'Faldi'
export const SITE_FULL_NAME = 'Naufaldi Rafif Satriya'
export const SITE_TAGLINE = siteConfig.tagline
export const SITE_DESCRIPTION =
  'Personal portfolio of Naufaldi Rafif Satriya — software engineer, mentor, and technical writer focused on modern web development, TypeScript, React, and developer experience.'
export const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/cynux/image/upload/v1762848965/portfolio-2025/avatar.jpg'
export const TWITTER_HANDLE = '@f2aldi'
export const THEME_COLOR = '#020817'

export interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export type SeoRouteKind =
  | 'home'
  | 'page'
  | 'collection'
  | 'blog'
  | 'project'
  | 'short'

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export interface SeoRoute {
  path: string
  title: string
  description: string
  canonicalUrl: string
  lastmod: string
  priority: number
  changefreq: ChangeFrequency
  image?: string
  kind: SeoRouteKind
  noindex?: boolean
  content?: string
  tags?: string[]
  date?: string
  author?: string
}

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdPayload
  | JsonLdValue[]

export interface JsonLdPayload {
  '@context'?: 'https://schema.org'
  '@type': string
  [key: string]: JsonLdValue | undefined
}

export interface StaticRouteMeta {
  path: string
  title: string
  description: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

export const STATIC_ROUTES: StaticRouteMeta[] = [
  {
    path: '/',
    title: `${SITE_NAME} – Software Engineer Portfolio`,
    description: SITE_DESCRIPTION,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about',
    title: `About – ${SITE_NAME}`,
    description:
      'Extended profile of Naufaldi Rafif Satriya: software engineering background, mentorship, community work, and current focus on product systems.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/projects',
    title: `Projects – ${SITE_NAME}`,
    description:
      'Curated software projects spanning frontend systems, backend work, content sites, and experiments.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/blogs',
    title: `Blog – ${SITE_NAME}`,
    description:
      'Technical writing, personal essays, and engineering notes on frontend, product delivery, and developer experience.',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    path: '/speaker',
    title: `Speaker & Mentor – ${SITE_NAME}`,
    description:
      'Speaking engagements, mentoring sessions, and community work by Naufaldi Rafif Satriya.',
    changefreq: 'monthly',
    priority: 0.85,
  },
  {
    path: '/shorts',
    title: `Shorts – ${SITE_NAME}`,
    description: 'Short-form engineering notes, snippets, and quick technical references.',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/book',
    title: `Books – ${SITE_NAME}`,
    description: 'Reading list, currently reading titles, and book recommendations.',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/manhwa',
    title: `Manhwa – ${SITE_NAME}`,
    description: 'Personal manhwa reading list and recommendations.',
    changefreq: 'monthly',
    priority: 0.4,
  },
]

const EXCLUDED_BLOG_SLUGS = new Set(['community', 'coming-soon'])

export const isIndexableBlogSlug = (slug: string, category?: string): boolean => {
  if (category === 'draft') return false
  if (EXCLUDED_BLOG_SLUGS.has(slug)) return false
  return true
}

export const canonicalUrl = (path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return `${SITE_URL}/`
  return `${SITE_URL}${normalized}`
}

export const absoluteImageUrl = (image?: string): string => {
  if (!image || image.trim() === '') return DEFAULT_OG_IMAGE
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  if (image.startsWith('/')) return `${SITE_URL}${image}`
  return `${SITE_URL}/${image}`
}

export const formatPageTitle = (title: string): string => {
  if (title.includes('–') || title.includes('|')) return title
  return `${title} – ${SITE_NAME}`
}

export const getStaticRouteMeta = (path: string): StaticRouteMeta | undefined =>
  STATIC_ROUTES.find((route) => route.path === path)

export const buildPersonJsonLd = (): Record<string, unknown> => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_FULL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  jobTitle: SITE_TAGLINE,
  description: siteConfig.bio,
  image: DEFAULT_OG_IMAGE,
  sameAs: [
    siteConfig.socialLinks.github,
    siteConfig.socialLinks.twitter,
    siteConfig.socialLinks.linkedin,
    siteConfig.socialLinks.instagram,
    siteConfig.socialLinks.adplist,
  ].filter((url): url is string => Boolean(url)),
})

export const buildWebSiteJsonLd = (): Record<string, unknown> => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: SITE_FULL_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: { '@id': `${SITE_URL}/#person` },
})

export const buildWebPageJsonLd = (meta: PageMeta): Record<string, unknown> => ({
  '@type': 'WebPage',
  '@id': `${canonicalUrl(meta.path)}#webpage`,
  url: canonicalUrl(meta.path),
  name: meta.title,
  description: meta.description,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'en-US',
})

export const buildBlogPostingJsonLd = (input: {
  title: string
  description: string
  slug: string
  date: string
  image?: string
  authorName?: string
}): Record<string, unknown> => ({
  '@type': 'BlogPosting',
  '@id': `${canonicalUrl(`/blogs/${input.slug}`)}#article`,
  headline: input.title,
  description: input.description,
  url: canonicalUrl(`/blogs/${input.slug}`),
  datePublished: input.date,
  dateModified: input.date,
  image: absoluteImageUrl(input.image),
  author: {
    '@type': 'Person',
    name: input.authorName ?? SITE_FULL_NAME,
    url: SITE_URL,
  },
  publisher: { '@id': `${SITE_URL}/#person` },
  mainEntityOfPage: { '@id': `${canonicalUrl(`/blogs/${input.slug}`)}#webpage` },
  inLanguage: 'en-US',
})

export const buildCreativeWorkJsonLd = (input: {
  title: string
  description: string
  slug: string
  date?: string
  image?: string
  techStack?: string[]
}): Record<string, unknown> => ({
  '@type': 'CreativeWork',
  '@id': `${canonicalUrl(`/projects/${input.slug}`)}#project`,
  name: input.title,
  description: input.description,
  url: canonicalUrl(`/projects/${input.slug}`),
  image: absoluteImageUrl(input.image),
  datePublished: input.date,
  keywords: input.techStack?.join(', '),
  author: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'en-US',
})

export const buildDefaultJsonLdGraph = (meta?: PageMeta): Record<string, unknown> => {
  const graph: Record<string, unknown>[] = [buildPersonJsonLd(), buildWebSiteJsonLd()]
  if (meta) {
    graph.push(buildWebPageJsonLd(meta))
    if (Array.isArray(meta.jsonLd)) {
      graph.push(...meta.jsonLd)
    } else if (meta.jsonLd) {
      graph.push(meta.jsonLd)
    }
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export const excerptFromMarkdown = (content: string, maxLength = 240): string => {
  const plain = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~`-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (plain.length <= maxLength) return plain
  return `${plain.slice(0, maxLength - 1).trim()}…`
}
