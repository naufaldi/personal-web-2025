# Current migration status

All 110 retained public routes are native Astro: seven collection/profile routes, 17 project details and 86 articles. Shorts and its ten detail URLs are retired and return 404. Source Markdown remains in the repository. React renders the homepage icon on the server only; no route mounts the old React application or loads its CSS. The sections below retain the history of each migration phase.

# Collected by Faldi: 2026 migration

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

Native routes are `/`, `/about`, `/speaker`, `/book`, `/manhwa`, `/projects`, `/blogs`, and the 404 page. Compatibility routes are `/shorts`, plus published `/projects/:slug`, `/blogs/:slug`, and `/shorts/:slug`. No new community, photography, book-detail or manhwa-detail URLs were invented.

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
- Homepage previews use native modal dialogs over the unchanged collection. Close and Escape restore the trigger and scroll position; the index stays in flow. Actual destinations remain separate caption/detail links.
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

The initial homepage phase passed four Bun migration tests with 979 assertions, covering native homepage isolation, every published route's metadata/static fallback/HTML alias, safe JSON-LD embedding, crawler files and 404 behavior. [HTTP evidence](verification/routes.json) records 121 successful direct requests with headings and canonical URLs; an unknown route returned 404. These are HTTP/static checks for the full inventory, not 121 separate hydrated browser sessions.

[Browser route evidence](verification/browser-routes.json) covers every legacy collection route and representative project/article/short details, using the requested agent-browser CLI. The long article was also checked through its final Closing Note after lazy content loaded. Browser checks covered home navigation, legacy theme persistence, filters/index/expansion, keyboard/Escape, reduced motion, emulated touch, missing media and empty/reset states. Script-blocked checks used a temporary localhost server with CSP `script-src 'none'`, confirming homepage/index access and legacy project reading fallback.

Visual evidence and iteration history are in [design-qa.md](../design-qa.md). Viewports: 1487×1058, 1280×900, 1024×768, 834×1112, 390×844, and 744×529 CSS pixels for equivalent 200% desktop reflow. The agent-browser iPhone preset did not enable touch by itself. Touch was enabled through the same session’s local DevTools connection, following the [Emulation](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/) and [Input](https://chromedevtools.github.io/devtools-protocol/tot/Input/) APIs. A dispatched touch event opened an artifact with coarse pointer enabled and hover disabled; see [touch evidence](verification/touch.json). No physical-device or Safari verification is claimed. Native browser zoom was not exercised separately from equivalent CSS viewport reflow.

All 16 reference PNG hashes were checked against the pre-migration snapshot. No source markdown was changed. Generated sitemap/AI-policy dates changed through the normal build pipeline. The initial homepage phase ended uncommitted. Subsequent phases use atomic commits at the user’s request; nothing has been pushed or deployed.

## Remaining work

All retained routes now use native Astro. Shorts is retired. Remaining work is optional cleanup of unused React components/dependencies and verification on physical devices and the eventual hosting environment. Preserve original article/project slugs and source Markdown.

Preview is local. A later deployment must verify Netlify alias/404 rules, canonical-domain behavior and live crawler files. Host configuration and personal infrastructure were not accessed.

## About migration, September 10

`/about` is native Astro, using the approved About composition and existing biography, six career records, and local photographs. `#experiences-heading` opens the complete career history. Native details retain content access without JavaScript; the small editorial controller adds index switching and Escape focus restoration. The old About route module was removed. Legacy links to About perform document navigation. Shared header/photo components and page-scoped composition CSS keep the homepage unchanged.

Verified at 1487 × 1058, 834 × 1112, and 390 × 844 with agent-browser. Career expansion renders six records; Escape closes and restores the initiating link. No horizontal overflow at mobile/tablet. Production build and migration contract checks run before commit. Existing source claims are preserved in career details; conflicting aggregate mentoring metrics are not promoted.

## In Good Company migration, September 10

`/speaker` now renders the selected In Good Company composition in Astro. Five featured artifacts derive from `src/data/communityCollection.ts`, which references the unchanged 21 records in `mentorSpeaker.ts`. Categories are Workshops (2), Talks (5), Mentoring (8), and Community (6). The same category selection filters the featured composition and complete index. All records and resource links are present in static HTML inside native details elements. Generated handwritten notes/posters are replaced with editable typography using real event titles. Archive photographs are explicitly labeled; they do not claim to depict the linked engagement.

The editorial controller preserves filter state between views, announces counts, keeps filter focus, opens matching records, and restores the triggering artifact on Escape. Pointer filtering uses an interruptible 220ms opacity/transform transition; keyboard and reduced-motion changes are immediate. Detail expansion is a native immediate disclosure. The old `Speaker.tsx` route module is removed. Shared legacy components remain available for later cleanup; no remaining React route imports About or Speaker.

Final verification: `bun run build` passes (122 pages, 120 aliases); `bun run test:migration` passes five tests and 987 assertions. [Interaction evidence](verification/inner-pages-interactions.json) records all category counts, pressed state/focus, index persistence, keyboard activation, Escape, reduced motion, and About anchor behavior. [Route evidence](verification/inner-pages-routes.json) confirms all 121 published routes return 200 with canonical metadata and unknown URLs return 404. New native pages contain no React islands; six career records and 21 engagement records remain in the static output.

Visual comparisons: [About](verification/about-comparison.png) and [In Good Company](verification/community-comparison.png), selected reference and implementation side by side. Desktop 1487 × 1058, tablet 834 × 1112, mobile 390 × 844, and 744 × 529 reflow checked. The latter represents 200% layout space, not native browser-chrome zoom. Physical-device touch and live hosting redirects were not re-tested in this phase. Reference PNGs are unchanged.

## Books and Manhwa collections

`/book` and `/manhwa` now render as native Astro archives. Both preserve the large-title/cover composition, full index, multi-label filtering, and native in-flow title details. Books contains all six source records. Manhwa groups exact repeated titles into 14 entries with combined Reading/Wishlist/Recommended membership; original data and alternate titles remain unchanged. No reviews, chapter progress or publication claims were invented. Publication status is explicitly labeled as the value listed in existing data.

Seven cover images are copied from the existing Open Library/AniList URLs into `src/assets/shelves` and transformed by Astro. Each downloaded cover was visually checked against its title. Cover art remains the work of its respective creators/publishers. Original source URLs remain in `src/data/books.ts` and `src/data/manhwa.ts`. Existing own photos provide supporting artifacts. No generated reference image is used as page artwork. Source purchase/reading URLs contain placeholder-like paths; the new shelf details show the sourced title/author/status instead of promoting those unverified destinations. The original link data remains unchanged.

Shared archive components handle entry/index rendering and optional search. The editorial controller now supports multiple category labels. A category without a featured cover shows a link to matching index entries. A filtered-title grid positioning bug was corrected for both archives and community. Keyboard/reduced-motion updates remain immediate. Old Books and Manhwa React route modules were removed.

## Projects collection

`/projects` now uses native Astro, all 17 existing project records, a four-artifact composition, a full index, and search. Curated experiment membership covers the Leaflet, Slate, Reading List, and Redux learning projects; other entries remain Software. Search matches title, description, and technology tags across the complete index. Empty searches keep the field focused and provide a readable empty state. Project details remain on their existing React routes. Their Back links now perform document navigation to the Astro archive.

The real Leaflet and Slate captures are sourced from existing project frontmatter. Slate is copied into `src/assets/shelves/project-slate.png`; Leaflet reuses the homepage asset. TS Hooks Kit and Reading List use editable, sourced title/description artifacts. Their generated mockup interfaces were not presented as real software captures. No Markdown source or project slug was changed.

## Writing collection and current handoff

`/blogs` is now a native Astro archive with 86 published articles, five sourced featured essays, category filters, full-index search, and original article destinations. The page intersects existing blog records with the SEO route inventory, preserving published content and excluding draft/placeholder routes. Categories preserve Journey, Ideas, Technical, Opinions, plus the existing Security Incident category. Additional source categories are discovered instead of silently disappearing from filter choices. Titles decode legacy HTML entities; excerpts strip Markdown and use the first complete source sentence where available. No generated essay text or fictional quotations were imported. Existing personal images illustrate the composition.

Article detail routes still hydrate their existing React/MDX renderer. Both normal and missing-article return links now use document navigation to the native Writing page. Native archives have no React islands or legacy CSS. The source articles, metadata, canonical slugs, sitemap and 120 HTML compatibility aliases are retained. Only the Books, Manhwa, Projects and Blogs page modules were deleted in this phase; retained legacy components/dependencies can be pruned as the remaining detail pages migrate.

The user’s “together” item is treated as the existing In Good Company page (`/speaker`), already implemented; no new route was invented.

Final archive verification: `bun run build` passes with 122 pages and 120 compatibility aliases. `bun run test:migration` passes seven tests and 1100 assertions. Astro reports zero errors, zero warnings and 17 existing hints. [Direct route checks](verification/archive-routes.json) cover all 121 published paths and unknown-route 404 handling. [Shared interaction checks](verification/archive-regressions.json) cover community filtering, About history, the Books empty-feature/index path, missing-image fallback and the native homepage. Reference PNGs and source Markdown are unchanged. Screenshots and corrections are recorded in [design-qa.md](../design-qa.md). Physical touch and native browser zoom remain outside this phase’s verification.

## Painted covers and completed reading migration

Every project now has a local cover under `src/assets/project-covers`: nine existing product screenshots and eight generated watercolor illustrations. The eight subjects are reusable pieces (ts-hooks-kit), books (Reading List), cooling (FanGuard), teaching (Teacher Exam), workers (Worker Class), collaborative review (Cursor deck), road reporting (Viralkan), and food commodities (Pangan). Viralkan and Pangan’s original screenshot URLs returned 404; six other records had repository cards or a placeholder. [Provenance inventory](verification/project-cover-sources.json) records each source and fallback. Generated illustrations depict fictional subjects, not the author or actual users. Titles remain HTML text outside the paintings. Screenshots remain screenshots and are not painted over.

`projectCollection.ts` requires a cover for every project, so a new record cannot silently ship without one. Archive artifacts, all 17 index thumbnails, detail covers and project social metadata reuse those assets. Astro emits responsive WebP renditions; original PNGs are retained locally. The original content frontmatter remains unchanged.

Project/article details now use `Reading.astro` and a shared build-time Markdown processor with GFM tables, nested lists, links, images, syntax highlighting and stable heading IDs. Body-level H1 headings become H2 beneath the page title. Reading text is constrained to 65ch; wide code/tables scroll within their own bounds. Table-of-contents disclosure and reading/navigation links work without JavaScript. Small client enhancements add code copying, image failure text and Mermaid rendering while keeping diagram source readable. There is no decorative entrance animation on reading content.

Removed `src/App.tsx`, `src/astro/components/LegacyApp.tsx`, and the ProjectDetail, BlogDetail, Shorts and ShortDetail React page modules. Removed the legacy MDX Vite transform from Astro config. The React integration remains for server-rendered homepage icons; unused React components and their dependencies remain for a separate cleanup rather than broadening this visual migration.

Shorts is absent from the SEO route inventory, generated sitemap/LLM indexes and collection navigation. Static builds no longer emit `/shorts` or its former detail files/aliases. The existing catch-all 404 rule handles those URLs; they are not redirected to unrelated writing. Historical source Markdown and reference PNGs remain unchanged. Live hosting behavior has not been exercised.

Verification for the completed migration: `bun run build` passes (111 pages including 404, 109 compatibility aliases), with zero errors, zero warnings and 14 existing unused-component deprecation hints. `bun run test:migration` passes eight tests and 1094 assertions. Agent-browser verifies 17 loaded project index covers, search/keyboard filters, heading links, code copying, Mermaid rendering and responsive layouts at 1487/834/390/320px. A localhost CSP `script-src 'none'` check verifies content and navigation without page scripts. All 110 public routes return 200; Shorts, its ten detail URLs, its `.html` index alias and an unknown URL return 404. Visual evidence and explicit device/hosting limitations are in [design-qa.md](../design-qa.md). Nothing is pushed or deployed.

## September 10: approved detail studies implemented

The shared `src/astro/layouts/Reading.astro` now implements the selected [project and blog v3 studies](reference/detail-studies/README.md) for all 17 projects and 86 published articles. Route generation, metadata, aliases and original Markdown remain unchanged. No new dependency or client framework was added.

Projects retain their existing local cover and sourced description/resources. The blog title now has the existing `src/assets/project-covers/reading-list.png` watercolor beside it, identified as AI-generated illustration. The v3 generated PNGs are layout references only; their invented margin quote, unrelated product label and abbreviated content are excluded. Older reference images remain unchanged.

`reading.css` owns both opening compositions and responsive reading grids. The contents rail is visible and sticky on desktop; native details remains usable without JavaScript. `reading.ts` adds current-heading tracking, compact-screen initial disclosure state and code-copy buttons inside reserved code-block space. Keyboard/reduced-motion heading navigation is immediate. The Markdown processor uses the GitHub dark Shiki theme; Mermaid source remains visible alongside progressively rendered diagrams. No files were removed in this revision.

Verification: `bun run build` passed with 111 static pages and 109 HTML aliases; `bun run test:migration` passed eight tests and 1,094 assertions. Browser checks covered 1440, 834, 390 and 320 CSS-pixel widths, loaded artwork, heading navigation, keyboard copy, reduced motion, two Mermaid diagrams and script-blocked reading. See [QA evidence](../design-qa.md) for comparisons, intentional differences and remaining device coverage gaps. No route migration remains for published pages; retained unused React source/dependency cleanup is a separate task. No deployment or push was performed.

## September 10: quiet editorial motion

Native document routing remains unchanged. `PageMotion.astro` installs early navigation listeners and opts capable browsers into cross-document transitions. Only unmodified same-origin pointer links set a short-lived navigation intent; keyboard, hashes, history, downloads and new-tab links do not. The destination consumes the intent before deciding whether to animate. Skipped transitions handle their expected ready-promise rejection. JavaScript-disabled and unsupported browsers do not opt in. No client router, hydration layer or animation dependency was added.

The shared motion module owns duration/easing defaults, input modality, reduced-motion response, tracked animations, deferred exits and native disclosure enhancement. Controllers retain content/filter state. Repositioning reads the current visible frame before canceling prior motion, then applies the latest layout and animates only visible elements. Deferred close callbacks are canceled or settled before another state change. Keyboard/reduced-motion input settles pending work immediately; back/forward cache restoration clears transient input and navigation state.

Homepage expansion, archive filters/index changes, About/community records, shelf disclosures and reading contents use these helpers. Press/hover rules are shared without scaling entire reading records. Original HTML, routes, source content, images, metadata and aliases are preserved. No files were removed.

Commands: `bun run build`, `bun run test:migration`, and `bun run test:motion`. The browser motion tests require the existing `agent-browser` CLI and a production preview at `http://127.0.0.1:4341`; set `MOTION_TEST_ORIGIN` to another local preview when needed. They cover stale closes, rapid filters, homepage expansion, Escape/focus, search, reduced motion and navigation exclusions. Browser screenshots cover 36 page/viewport combinations; see [motion QA](../design-qa.md) and [responsive evidence](verification/motion-responsive.json). No push or deployment was performed.

## Site-wide interaction repair (2026-09-11)

Home selection no longer sets the filter reflow class or scrolls the selected artifact. Each existing artifact owns a named native dialog. Its media is copied from the existing face at initialization, without duplicate content records or new assets. Selection preserves collection/index/filter state. Scrollbar space stays reserved while the background is locked; Close/Escape restore the original trigger. Native modal inertness is retained, with explicit Tab wrapping. The entire dialog surface uses the shared 220ms entrance and 140ms exit, avoiding an opaque empty panel during dismissal. Obsolete selected-card CSS was removed.

Shared anchor enhancement now preserves modified/new-tab/download behavior. Code-copy controls use attempt ownership and cancel old reset timers, so old clipboard completions cannot replace newer feedback. No routes, content, reference PNGs, dependencies, or deployment rules changed.

Verification commands (production preview at 4341):

```sh
bun run build
bun run scripts/serve-nojs.ts # separate terminal, local script-blocked fixture on 4343
bun test tests/migration.test.ts tests/motion.browser.test.ts tests/interaction-matrix.browser.test.ts
bun run scripts/audit-interactions.ts
```

The audit inventory derives from `buildSeoRoutes()`, including retired source slugs for 404 checks. [Route results](verification/interaction-audit.json) contain every canonical route at desktop and mobile with HTTP status, title/canonical agreement, main content, horizontal overflow and image-load checks. [Design QA](../design-qa.md) separates automated checks, Browser visual review and coverage gaps.


### Community content enrichment, 11 September 2026

The native `/speaker` collection now draws richer Luma event records from `src/data/mentorSpeaker.ts`. Optional role, venue, category and topic fields preserve the distinction between hosting and presenting. The collection adds twelve records and enriches two existing records, without removing existing mentoring content. Four optimized documentary photographs are imported by `communityCollection.ts` and used in the collage and matching disclosure galleries. See [event and image provenance](community-event-sources.md). No routes, router, animation dependencies or reference PNGs changed.


### Illustrated recovery states

`EmptyState.astro` supplies the shared collection/search recovery markup. `editorial.ts` distinguishes zero featured artifacts from zero matching records, and exposes an accessible reset action. The native 404 and media-error fallbacks use generated watercolor assets under `public/images/states/`. `states.css` centralizes their presentation. Static routing and existing source content are preserved.
