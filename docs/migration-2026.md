# Collected by Faldi: 2026 homepage migration

## Result and scope

The homepage is a native Astro contact sheet using Tailwind CSS v4, the selected warm-light design system, real existing images, and small browser interactions. It replaces the old stacked React homepage. Existing React pages retain their UI, theme preference and source content while they await their own redesign.

Work is in the main checkout `/Users/naufaldi.satriya/WebApps/personal-web-2025`, branch `codex/collected-by-faldi-design`, based on `1be09ed`. Changes are uncommitted. Nothing was deployed. The pre-existing design documents and reference gallery were preserved and updated, not reset.

## Architecture and route ownership

| Area | Before | Now |
| --- | --- | --- |
| Entry/build | Vite SPA, `index.html`, `src/main.tsx` | `astro.config.mjs`; static Astro output from `src/astro/pages` |
| `/` | React Home, Hero/Experience/Portfolio/MentorSpeaker section stack | Native Astro composition; no React client island or legacy app bundle |
| Other routes | BrowserRouter with lazy React pages | Static Astro compatibility pages mounting `LegacyApp` with `client:only="react"` |
| Initial HTML | Script rewrote every page from the root SPA shell | Shared Astro document emits metadata; compatibility island has static reading fallback |
| Missing routes | Catch-all served root HTML with status 200 | Dedicated Astro `404.html`, noindex, static-host 404 rule |
| `.html` aliases | Copied route HTML | Copies retained, Netlify canonical 301 rules generated; local compatibility entry normalizes alias before React mounts |

Native routes are `/` and the 404 page. Compatibility routes are `/about`, `/projects`, `/blogs`, `/speaker`, `/shorts`, `/book`, `/manhwa`, plus published `/projects/:slug`, `/blogs/:slug`, and `/shorts/:slug`. No new community, photography, book-detail or manhwa-detail URLs were invented.

Astro 5.18.2 and `@astrojs/react` 4.4.2 are locked in Bun for React 18 compatibility. Tailwind uses its Vite plugin inside Astro. The existing blog markdown/MDX transform remains, including its `?raw` exclusion. Content imports and the `@/` source alias are preserved.

`src/astro/layouts/Document.astro` owns the head. `scripts/seo-data.ts` remains the published route inventory. The extracted `scripts/seo-render.ts` supplies metadata and escaped static legacy content; JSON-LD escapes `<` before embedding. Astro replaces the old post-build root-template rewrite. `scripts/finalize-static.ts` only creates compatibility copies and redirect rules after Astro finishes.

Home links in the legacy header/navigation/footer perform document navigation, ensuring they reach the native Astro page. The original `vite-ui-theme` storage key and legacy theme provider remain. An HTML alias retains static content without JavaScript; JavaScript normalizes the path before the compatibility router starts. Hosting-level 301 behavior remains a deployment verification item.

## Design, content and CSS boundaries

[Root design.md](../design.md) is the token specification. [reference-design.md](reference-design.md) defines compositions and detail behavior. [The gallery](reference/README.md) retains the selected visual reference unchanged.

New styles live in `src/astro/styles/collected.css`, imported only by native pages. Legacy `src/index.css` is imported only by compatibility pages and was not edited. The homepage uses self-hosted Archivo Black 400, Manrope 400–700, and Source Code Pro 400–600; WOFF2 files and original OFL licenses live in `public/fonts`. Fontsource packages record their source. Fonts use swap, and Archivo Black is never synthetically bolded or stretched.

The home uses one continuous composition with seven unequal artifacts, an overlapping portrait/title, software capture, contact sheet, community photograph, project clipping, personal photograph, and sourced biography excerpt. It has no added contact/footer section stack. The small project clipping is editorial HTML about the real ts-hooks-kit project, not a reproduced generated poster or simulated product interface.

Native Archivo Black is wider than the generated mockup lettering. The homepage fits it with a documented `clamp(5rem, 14vw, 14rem)` desktop override so FALDI remains readable. Captions/navigation remain at least 14px. The 12-column desktop composition reserves 900px of canvas height at widths of 1280px and above. Below 1280px, artifacts use normal-flow grid rows to prevent captions colliding. The underlying grids remain 12 columns from 1024px, six from 768px, and two below 768px. Content can scroll naturally. Mobile reading content spans the available width.

### Asset provenance

The owner approved reuse of existing personal/event images. Originals were copied byte-for-byte from the existing Cloudinary URLs into `src/assets/collected`; Astro generates responsive WebP derivatives at build time. The typed media data records image dimensions, descriptions, focal positions and source records. Existing content and photo source files remain untouched.

| Local source | Existing record | Use |
| --- | --- | --- |
| `portrait.jpg` | `src/data/about.ts`, profileImageUrl / avatar.jpg | Dominant personal portrait |
| `workspace.jpg` | journeyPhotos / influence/workspace.jpg | Monochrome contact sheet |
| `meetup.jpg` | journeyPhotos / influence/meetup-mas-prim.jpg | Contact sheet; original privacy stickers retained |
| `friends.jpg` | journeyPhotos / influence/techbro-wfc.jpg | Contact sheet |
| `community.jpg` | journeyPhotos / influence/image-2.jpg | Wide community photograph |
| `personal.jpg` | journeyPhotos / influence/date.jpg | Contact sheet and supporting gaming photograph |
| `project.png` | `src/content/projects/nextjs-leaflet.md`, portfolio/map.png | Real software capture |

The old `date.jpg` label described a speaking engagement; visual inspection showed game controllers. The new caption describes the image accurately. Photography labels describe personal photographs without claiming Faldi took every image. Current biography and project markdown supply copy; conflicting counts, stale availability, generated quotations and unverified event/ambassador claims are omitted.

## Interaction contract

`src/data/collected.ts` is the single typed source for artifact IDs, categories, captions, context, media and destinations. Collection and index render from it. `src/astro/scripts/collection.ts` progressively enables controls.

- All / Software / Photography / Community filters agree with the index and announce result counts. Filtering keeps button focus and closes a selected artifact excluded by the new filter.
- Expansion is in flow, exposes `aria-expanded`, and keeps full-page scrolling. Close and Escape return focus to the trigger. Actual destinations remain separate caption/detail links.
- Open index reveals the same filtered artifacts and all existing collection routes, including About experience. Returning preserves the filter. `/#index` opens the index directly.
- Without scripts, all seven artifacts and the complete site index remain visible; interactive controls remain hidden and real links still work.
- Motion uses 140ms feedback, 220ms fades, and 260ms transform transitions. Rapid changes cancel/retarget running animations. Keyboard actions and reduced motion are immediate. Hover effects apply only to fine pointers; touch targets are at least 44px.
- Missing images retain reserved geometry, captions and destinations with an honest fallback. Empty results include Reset to All.

## Cleanup

Removed the obsolete `index.html`, `src/main.tsx`, `vite.config.ts`, inactive `react-router.config.ts`, old `scripts/prerender-seo.ts`, React `Home.tsx`, and eight exclusively homepage components: CodePreviewCard, ExperienceCard, ExperienceSection, HeroSection, MentorSpeakerSection, PortfolioSection, SelectedWorkSection and StatsCards.

Retained `homepage/PortfolioCard.tsx` and `homepage/MentorSpeakerItem.tsx` because Projects and Speaker pages still import them. Kept shared components, React Router, Framer Motion and other legacy dependencies still in use. Removed direct Vite/plugin-react and inactive React Router server dependencies; Astro owns its Vite toolchain. Bun is the only package manager used; the historical package-lock.json was not used or regenerated.

## Commands and verification

```sh
bun install --frozen-lockfile
bun run dev --host 127.0.0.1 --port 4321
bun run build
bun run test:migration
bun run preview --host 127.0.0.1 --port 4322
```

`build` runs discoverability generation, Astro/TypeScript checks, Astro static generation and alias finalization. It generated 122 pages: 121 published routes and one 404, plus 120 non-home HTML aliases. There were no type errors; existing legacy Lucide brand-icon deprecation hints remain.

Four Bun migration tests pass with 979 assertions, covering native homepage isolation, every published route's metadata/static fallback/HTML alias, safe JSON-LD embedding, crawler files and 404 behavior. [HTTP evidence](verification/routes.json) records 121 successful direct requests with headings and canonical URLs; an unknown route returned 404. These are HTTP/static checks for the full inventory, not 121 separate hydrated browser sessions.

[Browser route evidence](verification/browser-routes.json) covers every legacy collection route and representative project/article/short details, using the requested agent-browser CLI. The long article was also checked through its final Closing Note after lazy content loaded. Browser checks covered home navigation, legacy theme persistence, filters/index/expansion, keyboard/Escape, reduced motion, emulated touch, missing media and empty/reset states. Script-blocked checks used a temporary localhost server with CSP `script-src 'none'`, confirming homepage/index access and legacy project reading fallback.

Visual evidence and iteration history are in [design-qa.md](../design-qa.md). Viewports: 1487×1058, 1280×900, 1024×768, 834×1112, 390×844, and 744×529 CSS pixels for equivalent 200% desktop reflow. The agent-browser iPhone preset did not enable touch by itself. Touch was enabled through the same session’s local DevTools connection, following the [Emulation](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/) and [Input](https://chromedevtools.github.io/devtools-protocol/tot/Input/) APIs. A dispatched touch event opened an artifact with coarse pointer enabled and hover disabled; see [touch evidence](verification/touch.json). No physical-device or Safari verification is claimed. Native browser zoom was not exercised separately from equivalent CSS viewport reflow.

All 16 reference PNG hashes were checked against the pre-migration snapshot. No source markdown was changed. Generated sitemap/AI-policy dates changed through the normal build pipeline. There was no commit, push or deployment.

## Remaining page migration

Migrate About next, then Projects and project details, Community, Writing/Shorts, and Books/Manhwa using their selected references. Each phase should remove only its own compatibility route and unused code after content/SEO/browser checks. Keep full detail documents and original slugs. Retire the React island and legacy CSS only after the last dependent route migrates.

Preview is local. A later deployment must verify Netlify alias/404 rules, canonical-domain behavior and live crawler files. Host configuration and personal infrastructure were not accessed.

## About migration, September 10

`/about` is native Astro, using the approved About composition and existing biography, six career records, and local photographs. `#experiences-heading` opens the complete career history. Native details retain content access without JavaScript; the small editorial controller adds index switching and Escape focus restoration. The old About route module was removed. Legacy links to About perform document navigation. Shared header/photo components and page-scoped composition CSS keep the homepage unchanged.

Verified at 1487 × 1058, 834 × 1112, and 390 × 844 with agent-browser. Career expansion renders six records; Escape closes and restores the initiating link. No horizontal overflow at mobile/tablet. Production build and migration contract checks run before commit. Existing source claims are preserved in career details; conflicting aggregate mentoring metrics are not promoted.
