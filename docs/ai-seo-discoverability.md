# AI and SEO Discoverability Guide

How this personal portfolio site exposes public metadata for search engines and AI systems, and how to extend it safely.

## Why this exists

Search engines and AI crawlers need more than a React app shell. They rely on:

- HTML metadata and structured data
- Static files at predictable URLs (`/robots.txt`, `/sitemap.xml`, `/llms.txt`)
- Consistent public copy across HTML, UI, and machine-readable files

This site is a Vite React SPA with many markdown-backed routes. We use **build-time generation** plus static public files instead of a Next.js metadata layer.

## File roles (do not mix them up)

| File | Purpose | Blocks crawlers? |
|------|---------|------------------|
| `robots.txt` | Access control for crawlers | Yes (by convention) |
| `sitemap.xml` | URL discovery for search engines | No |
| `llms.txt` | Short curated index for LLMs | No |
| `llms-full.txt` | Fuller grounded context for LLMs | No |
| `.well-known/ai.txt` | Explicit AI usage and citation policy | No |
| `index.html` meta + JSON-LD | Page title, social previews, rich results | No |
| `site.webmanifest` | PWA identity, icons, shortcuts | No |

**Rule:** `robots.txt` controls *permission*. `llms.txt` controls *curation*. They solve different problems and should both exist.

## Site layout

```
personal-web-2025/
├── index.html                         # root metadata, JSON-LD, noscript fallback
├── scripts/generate-discoverability.ts
├── src/lib/seo.ts                     # canonical facts and JSON-LD builders
├── src/hooks/usePageMeta.ts           # client-side route metadata
└── public/
    ├── robots.txt
    ├── sitemap.xml                    # generated
    ├── llms.txt                       # generated
    ├── llms-full.txt                  # generated
    ├── site.webmanifest
    ├── _redirects
    ├── favicon.svg
    ├── icon.svg
    └── .well-known/ai.txt
```

Vite copies `public/` into `dist/` on build. Canonical site URL: `https://faldi.xyz/`

## Checklist for a new route or content item

### 1. Baseline SEO (`index.html` + route metadata)

- [ ] Root `index.html` has title, description, canonical, robots, OG/Twitter, manifest, JSON-LD, and `<noscript>` fallback
- [ ] Static routes have metadata in `src/lib/seo.ts`
- [ ] Detail pages call `usePageMeta()` with title, description, canonical path, and JSON-LD where appropriate

### 2. Generated crawler files

Run:

```bash
bun run generate:discoverability
```

Then verify:

- [ ] New public route appears in `public/sitemap.xml`
- [ ] New blog/project/short appears in generated LLM files when indexable
- [ ] Draft or placeholder content stays excluded

Generation rules:

- Exclude blog posts with `category: draft`
- Exclude stub slugs such as `community` and `coming-soon`
- Use `https://faldi.xyz/blogs/:slug` as canonical for local blog pages

### 3. Static policy files

- [ ] `robots.txt` allows public crawling and references the sitemap
- [ ] `.well-known/ai.txt` states public AI usage scope and citation preference
- [ ] `site.webmanifest` stays valid JSON
- [ ] `_redirects` keeps SPA deep links working on Netlify

### 4. Copy consistency

- [ ] Page metadata matches visible hero/content
- [ ] Generated LLM files only claim features present on the public site
- [ ] Footer and navigation link to real local routes (`/blogs`, `/speaker`)

### 5. Verify before merge

```bash
bun run generate:discoverability
bun run build
python3 -m json.tool public/site.webmanifest
python3 -c "import xml.etree.ElementTree as ET; ET.parse('public/sitemap.xml')"
test -f dist/robots.txt && test -f dist/sitemap.xml && test -f dist/llms.txt
```

After deploy, verify live:

- `https://faldi.xyz/robots.txt`
- `https://faldi.xyz/sitemap.xml`
- `https://faldi.xyz/llms.txt`
- `https://faldi.xyz/llms-full.txt`
- `https://faldi.xyz/.well-known/ai.txt`

Submit the sitemap in Google Search Console.

## SPA-specific gotchas

1. **Body content is JS-rendered** — many crawlers only see the root HTML shell on first fetch. Mitigate with root metadata, JSON-LD, `<noscript>`, generated LLM files, and `usePageMeta()` after navigation.
2. **Social previews on deep links still need prerender/SSG** — client-side metadata helps post-render crawlers, but non-JS social bots still read the initial HTML shell.
3. **Generated files must be rebuilt** — adding markdown content is not enough; run `bun run generate:discoverability` or `bun run build`.
4. **Deploy is required** — files in git are not live until built and deployed.

## When to extend

| Change | Update |
|--------|--------|
| New static route | Add metadata in `src/lib/seo.ts`, use `usePageMeta()`, regenerate discoverability files |
| New blog/project/short markdown | Regenerate discoverability files |
| Product positioning change | Sync `index.html`, `src/lib/seo.ts`, and generated LLM files |
| New AI crawler | Add `User-agent` allow rule in `robots.txt` |
| Stricter AI policy | Update `.well-known/ai.txt` and cross-links in `llms.txt` |
| Route-specific social previews | Add prerender/SSG follow-up |

## Related reference

This workflow adapts patterns documented in the Go-Pixo repo at `docs/ai-seo-discoverability.md`, adjusted for a multi-route portfolio/blog SPA.
