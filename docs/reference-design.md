# Collected by Faldi: Composition and Implementation Reference

This document defines page composition, content access and the homepage-first handoff. [Root design.md](../design.md) is the sole token/component styling specification. The [image gallery](reference/README.md) contains the selected homepage and twelve revised page/detail mockups; superseded boards remain isolated in its archive.

## Selected direction

Faldi selected “Collected by Faldi”: a personal world of software engineering, photography, professional experience, mentoring, workshops and community. Identity comes from authentic things made, seen and shared. Career depth stays easy to find.

The [selected homepage](reference/collected-by-faldi-selected.png) is the composition anchor: giant FALDI lettering partly behind a dominant portrait photograph, counterbalanced by software and event imagery, with smaller artifacts and deliberate paper gaps. Unequal sizes, crops and overlaps form one coherent contact sheet. Consistent grid and spacing support that composition.

Each archive page follows this same language. One composition can grow vertically; it is not a fixed-height screenshot. Do not add conventional About, featured-project, experience or contact sections below an opening hero. The readable index is an alternate collection view, not a duplicated list appended underneath.

The rejected isometric Personal Studio and the unselected “Faldi, in Motion” and “Between Frames” directions do not guide implementation. No WebGL, decorative 3D, terminal coordinates, generic split hero or equal card grid is required.

The original selected file remains preserved: task `01a08408-b318-7671-ae62-7b3380ee4766`, image `exec-4075886e-132e-4845-aca8-87016336bfde.png`. All repository PNGs are unchanged reference copies.

## Settled design and remaining content work

The visual direction, warm-light-only theme, and free self-hosted Archivo Black / Manrope / Source Code Pro typography are settled in root design.md. Do not reopen those choices from older notes or infer fonts from generated pixels.

Real asset selection, factual captions, event resources, career-date/metric reconciliation and production image crops remain implementation prerequisites. The mockups show intended composition and selected/reading states; animation, focus, responsive behavior and real content still need runtime verification.

Generated handwritten notes, including those signed “faldi,” are not Faldi's statements. Generated interface behavior, portraits, events, covers, dates, contact details and reading notes are not factual evidence. Replace them with authentic content. The book-detail mockup's subtle panel shadow does not override the flat-surface rule in root design.md.

## Page composition map

| Route | Composition | Content access |
| --- | --- | --- |
| `/` | Selected FALDI contact sheet | All / Software / Photography / Community, artifact selection, About/Experience/Contact and Open index |
| `/about` | Personal dossier with large ABOUT, dominant photo, biography, compact experience text and supporting artifacts | Read full experience in place; retain the existing experience anchor and direct contact access |
| `/projects` | Large PROJECTS behind unequal interface/code artifacts | Existing search/filter capability, project destinations and alternate index within the same surface |
| `/speaker` | Community contact sheet of event images, posters and mentoring artifacts | Categories and individual context/resources, rather than separate event and mentoring sections |
| `/blogs` | WRITING integrated with unequal essay clippings and occasional photographs | Readable previews, categories, direct article links and alternate index |
| `/book` | Flat cover contact sheet with a dominant cover, smaller covers and reading artifacts | Existing reading/wishlist categories via filters and item captions |
| `/manhwa` | Unequal covers/panels around large type | Existing categories/status and item-level context |
| `/projects/:slug` | Opened project artifact with peripheral collection context | Actual interface, contribution, decisions and full case study |
| `/blogs/:slug` | Focused reading artifact in the same visual language | Complete body/code, headings, readable column and parent navigation |
| Not found | Minimal paper/type composition | Working Home and index links |

Use [Astro detail route](../src/astro/pages/[...path].astro) as the route baseline. There is no existing `/experience`, `/speaking`, `/speaking/:slug`, book-detail, manhwa-detail or photography route. About already uses `#experiences-heading`; preserve and verify its rendered target. Use the actual Contact destination rather than generated contact information. Keep books, manhwa, writing, projects and career content reachable through the index/navigation.

## Collection and detail interaction

Use one typed collection source with stable IDs and derive filtered/index views from it. An artifact needs category, title, image dimensions/alt text, source/permission record, crop focal point, context and destination when available. Do not introduce a CMS or new backend just to support this collection.

| State | Required behavior |
| --- | --- |
| Resting | Visible caption/category and clear action; ordinary page scrolling works immediately |
| Hover/focus | Modest emphasis and visible keyboard focus; no essential information available only on hover |
| Selected | One item expands while neighbors make room; text and controls remain uncovered |
| Close/switch | Visible Close, Escape for inline details, focus restored to the trigger; predictable reading position on switch |
| Filtered | Pressed state and immediate feedback; keep focus on the filter, politely announce result count, collapse any selection excluded by the filter |
| Empty | Honest message and working reset to All; never fabricate filler artifacts |
| Index | Readable alternate view with the same items, direct destinations and a return-to-collection action |
| Missing media | Retain title, context, link and reserved image space; do not replace missing evidence with generated imagery |
| Reduced motion | Immediate state changes without rearrangement travel or parallax |

Expansion buttons and destination links remain separate, never nested. Inline triggers expose `aria-expanded` and their controlled region. The index is in-flow; do not silently convert it into a modal with different focus behavior.

| Detail | Expanded content | Navigation |
| --- | --- | --- |
| Project | Actual interface, role/contribution, decisions, verified results and access to the complete case study | Preserve `/projects/:slug`; parent link works on fresh direct visits |
| Article/short | Full text, existing metadata, real headings/code/images and natural reading scroll | Preserve existing detail URLs; return to the originating item when reached from a collection |
| Community event | Verified context, role/date when sourced, available slides/recording/event resources | In-page expansion on `/speaker`; close to the same event/filter |
| Book | Actual title/author, recorded status, saved notes and verified information link | In-page expansion on `/book`; close to the same cover/filter |
| Manhwa | Actual title, recorded status and saved notes; progress only if actually tracked | In-page expansion on `/manhwa`; close to the same item/filter |

Collection/detail continuity is a visual contract, not a requirement to replace routing with modals. Direct project/article URLs must render full content independently. A project preview may offer “Read full case study,” but no article or case study may be truncated to fit the reference image. On mobile, inline details follow their trigger in normal flow; avoid tiny internal scrolling panels.

## Content and asset requirements

Inventory real assets before homepage implementation. Use owned/permitted photography, real software captures with private data removed, and attributable event photos/posters. Record specific software contributions without implying ownership of entire products. Preserve existing content while changing presentation.

Codex and SpaceXAI ambassador activities are user-stated scope. Confirm exact public wording, dates, links and usable materials before detailed claims. Do not add affiliations from older records without verification. No fake testimonials, awards, metrics, endorsements or personal quotations.

The supplied private CV is background context. Differences between its dates/metrics and the website remain to be reconciled claim by claim; do not choose unsupported figures or copy the private document into public content.

The [gallery](reference/README.md) includes seven revised archive/dossier pages and five detail states, plus the approved homepage. Images under `reference/archive/` are historical only. No separate mobile or not-found mockup is provided; responsive reflow follows root design.md rather than shrinking a desktop image.

## Homepage implementation and remaining migration

The homepage now uses native Astro HTML, Tailwind v4 collection styling, self-hosted fonts, optimized existing photographs and a small browser script. It implements category filters, inline expansion, keyboard/Escape handling and an in-flow index. See [migration-2026.md](migration-2026.md) for the exact architecture and verification record.

Work remains in `/Users/naufaldi.satriya/WebApps/personal-web-2025` on `codex/collected-by-faldi-design`. Changes are committed in atomic migration steps as requested. Reference PNGs remain unchanged.

Astro owns URL generation and metadata. All published routes now render native Astro HTML; retained legacy React source does not mount on those routes. Current route/content and SEO contracts remain the compatibility baseline. Future page families follow their selected mockups individually; natural scrolling keeps full detail documents readable.

The approved real-photo substitution preserves major artifact placement, but photo subjects, project imagery and sourced copy intentionally differ from the generated reference. Archivo Black is a chosen implementation font; the homepage fits its native wider letters to the available space. No generated personal quotations, event claims or results were imported.

About and In Good Company (`/speaker`) now also use native Astro compositions with real content and in-flow disclosures. Books, Manhwa, Projects, and Writing archives are also native Astro. Project and article details are now native Astro reading views. Shorts is retired; its source Markdown is retained but its routes and navigation are removed. Keep the root design specification authoritative, preserve keyboard/touch/reduced-motion behavior, and compare each rendered page with its selected reference as it changes.

## Selected detail revision

The [v3 detail studies](reference/detail-studies/README.md) now guide project and article pages. Project pages pair the actual project cover with context and resource links. Articles use the shared reading watercolor beside the title. Both retain a visible desktop contents rail, a narrow unboxed body and full-width bottom navigation. Contents collapse on compact screens after script initialization and remain available without JavaScript. Keep all source Markdown, including content omitted by the generated mockups.
