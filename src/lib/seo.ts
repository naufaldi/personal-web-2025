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
