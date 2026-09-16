import { mentorSpeakerEngagements } from '../src/data/mentorSpeaker'
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
    expect(home).not.toContain('aria-label="Full site index"')
    expect(home).not.toContain('data-filter=')
    expect(home).not.toContain('<dialog')
    expect(home).toContain('href="/photography"')
  })

  test('every published route has static content, metadata, and matching HTML alias', async () => {
    for (const route of routes) {
      const html = route.path === '/' ? home : await readFile(`dist${route.path}/index.html`, 'utf8')
      expect(html).toContain(`href="${route.canonicalUrl}"`)
      expect(html.match(/<title>/g)).toHaveLength(1)
      expect(html.match(/<h1(?: | >|>)/g)).toHaveLength(1)
      expect(html).toContain('application/ld+json')
      if (route.path !== '/') {
        expect(html).not.toContain('<astro-island')
        expect(await readFile(`dist${route.path}.html`, 'utf8')).toBe(html)
      }
      if (route.content) expect(html).toContain('id="reading-content"')
    }
  })

  test('native inner pages preserve career and engagement records without hydration', async () => {
    const about = await readFile('dist/about/index.html', 'utf8')
    const community = await readFile('dist/speaker/index.html', 'utf8')
    expect(about).toContain('id="experiences-heading"')
    expect(about.match(/<article>/g)).toHaveLength(6)
    expect(community.match(/data-record/g)).toHaveLength(mentorSpeakerEngagements.length)
    for (const entry of mentorSpeakerEngagements) expect(community).toContain(`id="engagement-${entry.id}"`)
    for (let id = 1; id <= 21; id++) expect(community).toContain(`id="engagement-${id}"`)
    expect(community).toContain('https://luma.com/4qe99i6e')
    expect(community).toContain('https://luma.com/keng8c0n')
    expect(community).toContain('cursor-aug-speaker')
    expect(community).toContain('codex-build-group')
    expect(community.match(/data-feature-category/g)).toHaveLength(5)
    for (const html of [about, community]) {
      expect(html).not.toContain('<astro-island')
      expect(html).toContain('<details')
      expect(html).not.toContain('aria-label="Full site index"')
      expect(html).toContain('aria-label="Primary"')
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

  test('project and writing indexes link every published detail without exposing drafts', async () => {
    for (const prefix of ['/projects/', '/blogs/']) {
      const html = await readFile(`dist${prefix}index.html`, 'utf8')
      const details = routes.filter(route => route.path.startsWith(prefix))
      expect(html.match(/data-record/g)).toHaveLength(details.length)
      for (const route of details) expect(html).toContain(`href="${route.path}"`)
      expect(html).toContain('data-archive-search')
      expect(html).not.toContain('href="/blogs/coming-soon"')
    }
  })

  test('all projects have local covers and retired Shorts is absent', async () => {
    const projects = routes.filter(route => route.kind === 'project')
    expect(projects).toHaveLength(17)
    for (const route of projects) {
      const html = await readFile(`dist${route.path}/index.html`, 'utf8')
      expect(html).toContain('class="reading-cover"')
      expect(html).toContain('/_astro/')
      expect(html).not.toContain('via.placeholder.com')
      expect(html).not.toContain('opengraph.githubassets.com')
    }
    expect(routes.some(route => route.path.startsWith('/shorts'))).toBe(false)
    for (const file of ['sitemap.xml', 'llms.txt', 'llms-full.txt']) expect(await readFile(`dist/${file}`, 'utf8')).not.toContain('naufaldi.com/shorts')
    expect(home).not.toContain('href="/shorts"')
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
    expect(missing).toContain('Home')
    expect(missing).toContain('href="/projects"')
    const redirects = await readFile('dist/_redirects', 'utf8')
    expect(redirects).not.toContain('/index.html   200')
    expect(redirects).toContain('/projects.html /projects 301')
    expect(redirects).not.toContain('/* /404.html 404')
    for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', '.well-known/ai.txt', 'site.webmanifest']) {
      expect((await readFile(`dist/${file}`, 'utf8')).length).toBeGreaterThan(0)
    }
    const sitemap = await readFile('dist/sitemap.xml', 'utf8')
    for (const route of routes) expect(sitemap).toContain(`<loc>${route.canonicalUrl}</loc>`)
    expect(sitemap).not.toContain('/coming-soon<')
  })
})
