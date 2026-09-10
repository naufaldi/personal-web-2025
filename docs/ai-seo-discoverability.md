# AI and SEO Discoverability Guide

How this personal portfolio site exposes public metadata for search engines and AI systems, and how to extend it safely.

## Why this exists

Search engines and AI crawlers need more than a React app shell. They rely on:

- HTML metadata and structured data
- Static files at predictable URLs (`/robots.txt`, `/sitemap.xml`, `/llms.txt`)
- Consistent public copy across HTML, UI, and machine-readable files

Astro generates the homepage and compatibility route HTML at build time. Unmigrated routes then mount React over static fallback content. See [migration-2026.md](migration-2026.md).

## File roles (do not mix them up)

| File | Purpose | Blocks crawlers? |
|------|---------|------------------|
| `robots.txt` | Access control for crawlers | Yes (by convention) |
| `sitemap.xml` | URL discovery for search engines | No |
| `llms.txt` | Short curated index for LLMs | No |
| `llms-full.txt` | Fuller grounded context for LLMs | No |
| `.well-known/ai.txt` | Explicit AI usage and citation policy | No |
| `Document.astro` + `seo-render.ts` | Page title, social previews, rich results | No |
| `site.webmanifest` | PWA identity, icons, shortcuts | No |

**Rule:** `robots.txt` controls *permission*. `llms.txt` controls *curation*. They solve different problems and should both exist.

## Site layout

```
personal-web-2025/
├── src/astro/layouts/Document.astro   # shared head and metadata
├── scripts/seo-render.ts              # metadata and static legacy fallback
├── scripts/seo-data.ts                # published route inventory
├── scripts/finalize-static.ts         # HTML aliases and redirects
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

Astro copies `public/` into `dist/` on build. Canonical site URL: `https://naufaldi.com/`

## Checklist for a new route or content item

### 1. Baseline SEO (Astro + route metadata)

- [ ] `Document.astro` emits title, description, canonical, robots, OG/Twitter, manifest and JSON-LD; homepage content and legacy fallback are present without JavaScript
- [ ] Static routes appear in `scripts/seo-data.ts` and match `src/lib/seo.ts` on legacy pages
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
- Use `https://naufaldi.com/blogs/:slug` as canonical for local blog pages

### 3. Static policy files

- [ ] `robots.txt` allows public crawling and references the sitemap
- [ ] `.well-known/ai.txt` states public AI usage scope and citation preference
- [ ] `site.webmanifest` stays valid JSON
- [ ] `dist/_redirects` maps HTML aliases to canonical routes and unknown paths to a 404; it must not rewrite every path to the homepage

### 4. Copy consistency

- [ ] Page metadata matches visible content
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

- `https://naufaldi.com/robots.txt`
- `https://naufaldi.com/sitemap.xml`
- `https://naufaldi.com/llms.txt`
- `https://naufaldi.com/llms-full.txt`
- `https://naufaldi.com/.well-known/ai.txt`

Submit the sitemap in Google Search Console.

## Migration-specific gotchas

1. **Preserve static content:** compatibility pages include readable fallback HTML before React loads. The native homepage never mounts React.
2. **Metadata belongs in initial HTML:** retain canonical, social tags and JSON-LD for every published URL; client hooks alone are insufficient.
3. **Rebuild after adding markdown:** `bun run build` generates discoverability, route HTML and aliases. Run `bun run test:migration` afterward.
4. **No homepage catch-all:** unknown paths use `404.html`; the `.html` aliases redirect to their canonical route on Netlify.
5. **Deployment is separate:** local verification does not establish live hosting behavior.

## When to extend

| Change | Update |
|--------|--------|
| New static route | Add to `scripts/seo-data.ts`; keep legacy metadata aligned; regenerate and verify route HTML |
| New blog/project/short markdown | Regenerate discoverability files |
| Product positioning change | Sync `scripts/seo-data.ts`, `src/lib/seo.ts`, and generated LLM files |
| New AI crawler | Add `User-agent` allow rule in `robots.txt` |
| Stricter AI policy | Update `.well-known/ai.txt` and cross-links in `llms.txt` |
| Route-specific social previews | Use the shared Astro document and verify emitted HTML |

## Related reference

This workflow adapts patterns documented in the Go-Pixo repo at `docs/ai-seo-discoverability.md`, adjusted for a portfolio with an Astro shell and legacy React pages.
