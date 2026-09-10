import { describe, expect, test } from 'bun:test'
import { readFile } from 'node:fs/promises'
import { buildSeoRoutes } from '../scripts/seo-data'
import { renderSeoBlock } from '../scripts/seo-render'

const { routes } = await buildSeoRoutes()
const home = await readFile('dist/index.html', 'utf8')

describe('Astro static migration contract', () => {
  test('homepage is native HTML with seven artifacts and no React island', () => {
    expect(home.match(/data-artifact=/g)).toHaveLength(7)
    expect(home).not.toContain('<astro-island')
    expect(home).not.toContain('Connect with me')
    expect(home).toContain('href="/fonts/archivo-black-latin-400.woff2"')
    expect(home).toContain('aria-label="Full site index"')
    expect(home).toContain('data-filter="Software"')
  })

  test('every published route has static content, metadata, and matching HTML alias', async () => {
    for (const route of routes) {
      const html = route.path === '/' ? home : await readFile(`dist${route.path}/index.html`, 'utf8')
      expect(html).toContain(`href="${route.canonicalUrl}"`)
      expect(html.match(/<title>/g)).toHaveLength(1)
      expect(html).toContain('application/ld+json')
      if (route.path !== '/') {
        if (['/about', '/projects', '/speaker', '/book', '/manhwa'].includes(route.path)) expect(html).not.toContain('<astro-island')
        else {
          expect(html).toContain('data-prerendered-content="true"')
          expect(html).toContain('client="only"')
        }
        expect(await readFile(`dist${route.path}.html`, 'utf8')).toBe(html)
      }
      if (route.content) expect(html).toContain('<article>')
    }
  })

  test('native inner pages preserve career and engagement records without hydration', async () => {
    const about = await readFile('dist/about/index.html', 'utf8')
    const community = await readFile('dist/speaker/index.html', 'utf8')
    expect(about).toContain('id="experiences-heading"')
    expect(about.match(/<article>/g)).toHaveLength(6)
    expect(community.match(/data-record/g)).toHaveLength(21)
    expect(community.match(/data-feature-category/g)).toHaveLength(5)
    for (const html of [about, community]) {
      expect(html).not.toContain('<astro-island')
      expect(html).toContain('<details')
      expect(html).toContain('aria-label="Full site index"')
    }
  })

  test('reading shelves keep every unique title and overlapping shelf labels', async () => {
    const books = await readFile('dist/book/index.html', 'utf8')
    const manhwa = await readFile('dist/manhwa/index.html', 'utf8')
    expect(books.match(/data-record/g)).toHaveLength(6)
    expect(manhwa.match(/data-record/g)).toHaveLength(14)
    expect(manhwa).toContain('data-category="Reading|Recommended"')
    expect(manhwa.match(/id="manhwa-1"/g)).toHaveLength(1)
    expect(manhwa).toContain('Mercenary Enrollment')
    expect(manhwa).toContain('Teenage Mercenary')
    expect(books).toContain('System Design Interview')
    expect(books).toContain('Refactoring')
  })

  test('JSON-LD cannot terminate its script element with content text', () => {
    const html = renderSeoBlock({ ...routes[0], title: '</script><script>alert(1)</script>' })
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    expect(blocks.length).toBeGreaterThan(0)
    for (const block of blocks) expect(() => JSON.parse(block[1])).not.toThrow()
    expect(html).not.toContain('<script>alert(1)')
  })

  test('404 and crawler files remain static and the SPA rewrite is gone', async () => {
    const missing = await readFile('dist/404.html', 'utf8')
    expect(missing).toContain('noindex, nofollow')
    expect(missing).toContain('Back to the collection')
    const redirects = await readFile('dist/_redirects', 'utf8')
    expect(redirects).not.toContain('/index.html   200')
    expect(redirects).toContain('/projects.html /projects 301')
    expect(redirects).toContain('/* /404.html 404')
    for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', '.well-known/ai.txt', 'site.webmanifest']) {
      expect((await readFile(`dist/${file}`, 'utf8')).length).toBeGreaterThan(0)
    }
    const sitemap = await readFile('dist/sitemap.xml', 'utf8')
    for (const route of routes) expect(sitemap).toContain(`<loc>${route.canonicalUrl}</loc>`)
    expect(sitemap).not.toContain('/coming-soon<')
  })
})
