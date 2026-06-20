import { useEffect } from 'react'
import {
  absoluteImageUrl,
  buildDefaultJsonLdGraph,
  formatPageTitle,
  canonicalUrl,
  type PageMeta,
} from '@/lib/seo'

const JSON_LD_ID = 'site-json-ld'

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

const upsertJsonLd = (payload: Record<string, unknown>) => {
  let element = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
  if (!element) {
    element = document.createElement('script')
    element.id = JSON_LD_ID
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(payload)
}

export const usePageMeta = (meta: PageMeta) => {
  useEffect(() => {
    const title = formatPageTitle(meta.title)
    const description = meta.description
    const canonical = canonicalUrl(meta.path)
    const image = absoluteImageUrl(meta.image)
    const robots = meta.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    const ogType = meta.type ?? 'website'

    document.title = title
    upsertLink('canonical', canonical)
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:site_name', 'Faldi')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:alt', `${meta.title} preview`)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:site', '@f2aldi')
    upsertMeta('name', 'twitter:creator', '@f2aldi')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)
    upsertMeta('name', 'twitter:image:alt', `${meta.title} preview`)
    upsertJsonLd(buildDefaultJsonLdGraph(meta))
  }, [meta])
}
