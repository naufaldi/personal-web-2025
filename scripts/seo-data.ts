import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import fm from 'front-matter'
import type { JsonLdPayload, SeoRoute } from '../src/lib/seo'

const SITE_URL = 'https://naufaldi.com'
const SITE_NAME = 'Naufaldi Rafif Satriya'
const SITE_TITLE = 'Faldi - Software Engineer Portfolio'
const SITE_DESCRIPTION =
  'Personal portfolio of Naufaldi Rafif Satriya, a software engineer, mentor, and technical writer focused on modern web development, TypeScript, React, and developer experience.'
const DEFAULT_IMAGE = '/image-2.jpg'
const GENERATED_TODAY = new Date().toISOString().slice(0, 10)

type ContentKind = 'blog' | 'project' | 'short'

interface MarkdownFrontmatter {
  title?: string
  slug?: string
  description?: string
  category?: string
  author?: {
    name?: string
  }
  date?: string | Date
  image?: string
  tags?: string[]
}

interface ContentItem {
  kind: ContentKind
  title: string
  slug: string
  description: string
  date: string
  image?: string
  tags?: string[]
  category?: string
  content: string
  author?: string
}

interface RouteBuildResult {
  routes: SeoRoute[]
  blogs: ContentItem[]
  projects: ContentItem[]
  shorts: ContentItem[]
}

const staticRoutes: SeoRoute[] = [
  {
    path: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    canonicalUrl: `${SITE_URL}/`,
    lastmod: GENERATED_TODAY,
    priority: 1,
    changefreq: 'weekly',
    image: DEFAULT_IMAGE,
    kind: 'home',
  },
  {
    path: '/about',
    title: 'About - Naufaldi Rafif Satriya',
    description:
      'Learn about Naufaldi Rafif Satriya, his software engineering journey, technical focus, mentoring work, and current professional direction.',
    canonicalUrl: `${SITE_URL}/about`,
    lastmod: GENERATED_TODAY,
    priority: 0.9,
    changefreq: 'monthly',
    image: DEFAULT_IMAGE,
    kind: 'page',
  },
  {
    path: '/projects',
    title: 'Projects - Naufaldi Rafif Satriya',
    description:
      'A curated catalog of software projects, product systems, frontend work, backend experiments, and technical case studies by Naufaldi Rafif Satriya.',
    canonicalUrl: `${SITE_URL}/projects`,
    lastmod: GENERATED_TODAY,
    priority: 0.9,
    changefreq: 'weekly',
    image: DEFAULT_IMAGE,
    kind: 'collection',
  },
  {
    path: '/blogs',
    title: 'Blog - Naufaldi Rafif Satriya',
    description:
      'Technical writing, engineering notes, career reflections, and frontend development articles by Naufaldi Rafif Satriya.',
    canonicalUrl: `${SITE_URL}/blogs`,
    lastmod: GENERATED_TODAY,
    priority: 0.9,
    changefreq: 'daily',
    image: DEFAULT_IMAGE,
    kind: 'collection',
  },
  {
    path: '/speaker',
    title: 'Speaker and Mentor - Naufaldi Rafif Satriya',
    description:
      'Speaking, mentoring, workshop, and community highlights from Naufaldi Rafif Satriya across software engineering and AI-assisted development.',
    canonicalUrl: `${SITE_URL}/speaker`,
    lastmod: GENERATED_TODAY,
    priority: 0.85,
    changefreq: 'monthly',
    image: DEFAULT_IMAGE,
    kind: 'page',
  },
  {
    path: '/shorts',
    title: 'Short Notes - Naufaldi Rafif Satriya',
    description:
      'Short technical notes and quick software engineering references from Naufaldi Rafif Satriya.',
    canonicalUrl: `${SITE_URL}/shorts`,
    lastmod: GENERATED_TODAY,
    priority: 0.7,
    changefreq: 'monthly',
    image: DEFAULT_IMAGE,
    kind: 'collection',
  },
  {
    path: '/book',
    title: 'Books - Naufaldi Rafif Satriya',
    description:
      'Books Naufaldi Rafif Satriya is reading, recommends, or wants to revisit for software engineering and product thinking.',
    canonicalUrl: `${SITE_URL}/book`,
    lastmod: GENERATED_TODAY,
    priority: 0.5,
    changefreq: 'monthly',
    image: DEFAULT_IMAGE,
    kind: 'page',
  },
  {
    path: '/manhwa',
    title: 'Manhwa - Naufaldi Rafif Satriya',
    description:
      'A personal collection of manhwa and reading interests from Naufaldi Rafif Satriya.',
    canonicalUrl: `${SITE_URL}/manhwa`,
    lastmod: GENERATED_TODAY,
    priority: 0.4,
    changefreq: 'monthly',
    image: DEFAULT_IMAGE,
    kind: 'page',
  },
]

const contentDirectories: Record<ContentKind, string> = {
  blog: 'src/content/blogs',
  project: 'src/content/projects',
  short: 'src/content/shorts',
}

const decodeEntities = (value: string) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCharCode(Number.parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(Number.parseInt(code, 10))
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const stripMarkdown = (value: string) =>
  decodeEntities(value)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const truncate = (value: string, length = 155) => {
  const normalized = stripMarkdown(value)

  if (normalized.length <= length) {
    return normalized
  }

  return `${normalized.slice(0, length - 1).trim()}...`
}

const formatDate = (value?: string | Date) => {
  if (!value) {
    return GENERATED_TODAY
  }

  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return GENERATED_TODAY
  }

  return date.toISOString().slice(0, 10)
}

const byNewest = (a: ContentItem, b: ContentItem) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()

const isLowQualityContent = (item: {
  title?: string
  slug?: string
  description?: string
  category?: string
}) => {
  const title = item.title?.trim().toLowerCase()
  const description = item.description?.trim().toLowerCase()
  const slug = item.slug?.trim().toLowerCase()
  const category = item.category?.trim().toLowerCase()

  return (
    !title ||
    !slug ||
    title === 'placeholder' ||
    description === 'placeholder' ||
    title === 'coming soon' ||
    slug === 'coming-soon' ||
    category === 'draft'
  )
}

const toAbsoluteUrl = (url?: string) => {
  if (!url) {
    return `${SITE_URL}${DEFAULT_IMAGE}`
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`
}

const readMarkdownDirectory = async (kind: ContentKind) => {
  const directory = contentDirectories[kind]
  const entries = await readdir(directory)
  const markdownFiles = entries.filter((entry) => entry.endsWith('.md'))
  const items: ContentItem[] = []

  for (const fileName of markdownFiles) {
    const filePath = path.join(directory, fileName)
    const raw = await readFile(filePath, 'utf8')
    const parsed = fm<MarkdownFrontmatter>(raw)
    const frontmatter = parsed.attributes

    if (isLowQualityContent(frontmatter)) {
      continue
    }

    const title = decodeEntities(frontmatter.title?.trim() ?? '')
    const slug = frontmatter.slug?.trim() ?? ''
    const content = parsed.body.trim()
    const description = frontmatter.description
      ? truncate(frontmatter.description)
      : truncate(content)

    items.push({
      kind,
      title,
      slug,
      description,
      date: formatDate(frontmatter.date),
      image: frontmatter.image ? decodeEntities(frontmatter.image) : undefined,
      tags: frontmatter.tags,
      category: frontmatter.category,
      content,
      author: frontmatter.author?.name,
    })
  }

  return items.sort(byNewest)
}

const createContentRoutes = (items: ContentItem[]): SeoRoute[] =>
  items.map((item) => {
    const basePath =
      item.kind === 'blog'
        ? '/blogs'
        : item.kind === 'project'
          ? '/projects'
          : '/shorts'

    const priority = item.kind === 'blog' ? 0.75 : item.kind === 'project' ? 0.8 : 0.65
    const titleSuffix =
      item.kind === 'blog'
        ? 'Blog'
        : item.kind === 'project'
          ? 'Project'
          : 'Short Note'

    return {
      path: `${basePath}/${item.slug}`,
      title: `${item.title} - ${titleSuffix} - Naufaldi Rafif Satriya`,
      description: item.description,
      canonicalUrl: `${SITE_URL}${basePath}/${item.slug}`,
      lastmod: item.date,
      priority,
      changefreq: 'monthly',
      image: toAbsoluteUrl(item.image),
      kind: item.kind,
      content: item.content,
      tags: item.tags,
      date: item.date,
      author: item.author ?? SITE_NAME,
    }
  })

const buildBreadcrumbJsonLd = (route: SeoRoute): JsonLdPayload => {
  const segments = route.path.split('/').filter(Boolean)
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: isLast
        ? route.title.replace(' - Naufaldi Rafif Satriya', '').replace(' - Blog', '').replace(' - Project', '')
        : segment.charAt(0).toUpperCase() + segment.slice(1),
      item: `${SITE_URL}${currentPath}`,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

const basePublisher = {
  '@type': 'Person',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
} satisfies JsonLdPayload

export const createJsonLdForRoute = (route: SeoRoute): JsonLdPayload[] => {
  const image = toAbsoluteUrl(route.image)

  if (route.kind === 'home') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        image,
        jobTitle: 'Software Engineer',
        sameAs: [
          'https://github.com/naufaldi',
          'https://www.linkedin.com/in/naufaldirafif/',
          'https://twitter.com/f2aldi',
        ],
        description: route.description,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Faldi',
        url: `${SITE_URL}/`,
        description: route.description,
        publisher: basePublisher,
      },
    ]
  }

  const payloads: JsonLdPayload[] = []

  if (route.kind === 'blog') {
    payloads.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: route.title.replace(' - Blog - Naufaldi Rafif Satriya', ''),
      description: route.description,
      url: route.canonicalUrl,
      image,
      datePublished: route.date ?? route.lastmod,
      dateModified: route.lastmod,
      author: basePublisher,
      publisher: basePublisher,
    })
  } else if (route.kind === 'project') {
    payloads.push({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: route.title.replace(' - Project - Naufaldi Rafif Satriya', ''),
      description: route.description,
      url: route.canonicalUrl,
      image,
      author: basePublisher,
      datePublished: route.date ?? route.lastmod,
    })
  } else {
    payloads.push({
      '@context': 'https://schema.org',
      '@type': route.kind === 'collection' ? 'CollectionPage' : 'WebPage',
      name: route.title,
      description: route.description,
      url: route.canonicalUrl,
      image,
      publisher: basePublisher,
    })
  }

  if (route.path !== '/') {
    payloads.push(buildBreadcrumbJsonLd(route))
  }

  return payloads
}

export const siteMetadata = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  siteTitle: SITE_TITLE,
  siteDescription: SITE_DESCRIPTION,
  defaultImage: DEFAULT_IMAGE,
}

export const buildSeoRoutes = async (): Promise<RouteBuildResult> => {
  const [blogs, projects, shorts] = await Promise.all([
    readMarkdownDirectory('blog'),
    readMarkdownDirectory('project'),
    readMarkdownDirectory('short'),
  ])

  const contentRoutes = createContentRoutes([...projects, ...blogs, ...shorts])
  const routes = [...staticRoutes, ...contentRoutes].sort((a, b) => {
    if (a.path === '/') return -1
    if (b.path === '/') return 1
    return a.path.localeCompare(b.path)
  })

  return {
    routes,
    blogs,
    projects,
    shorts,
  }
}

export { SITE_URL }
