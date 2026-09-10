import type { ImageMetadata } from 'astro'

export interface ArchiveEntry {
  id: string
  title: string
  categories: string[]
  meta: string
  description?: string
  href?: string
  image?: ImageMetadata
  tags?: string[]
}

export const categoryLabels = {
  read: 'Read',
  'currently-reading': 'Reading',
  wishlist: 'Wishlist',
  recommended: 'Recommended',
} as const
