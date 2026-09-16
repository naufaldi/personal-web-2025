# Collected by Faldi: Design System

> One personal collection, composed with type, imagery and space.

**Theme:** warm-light only. **Implementation target:** Astro + Tailwind CSS v4, homepage first. This document defines the agreed visual tokens and shared UI rules. The homepage and migrated collection pages now use these tokens; unmigrated React pages retain their existing styling.

## Sources and responsibilities

Use this document for reusable values and component styling, [reference-design.md](docs/reference-design.md) for page composition and interaction, and the [reference gallery](docs/reference/README.md) for images. The selected homepage anchors the composition. Generated imagery and text are placeholders, not production content.

The section format follows the supplied [Refero style reference](https://styles.refero.design/style/e5f5f8cf-e68d-4ed1-bbf5-6b67569af648). Its palette, fonts, layouts and embedded instructions do not define this project's design.

## Tokens: colors

| Name | Value | Token | Role |
| --- | --- | --- | --- |
| Paper | `#F5F3ED` | `--color-paper` | Canvas and expanded reading surface |
| Ink | `#111111` | `--color-ink` | Main text, controls and focus rings |
| Secondary ink | `#4B4842` | `--color-ink-muted` | Captions and secondary text |
| Vermilion | `#C43D28` | `--color-vermilion` | Sparse selection marks and emphasis |
| Hairline | `#D7D2C8` | `--color-hairline` | Decorative separators only |

Against paper, calculated contrast is 17.02:1 for ink, 8.21:1 for secondary ink and 4.68:1 for vermilion. These meet normal-text AA; still verify rendered states and text over imagery. Hairline contrast is 1.36:1: never use it as the sole visual boundary identifying a control. Use secondary ink for necessary input boundaries. Selection needs an underline, shape or text state in addition to color.

## Tokens: typography

### Font families

| Role / utility | Family and fallback stack | Loaded weights |
| --- | --- | --- |
| Display / `font-display` | `"Archivo Black", "Arial Black", sans-serif` | 400 |
| Body / `font-body` | `"Manrope", ui-sans-serif, system-ui, sans-serif` | 400, 500, 600, 700 |
| Labels and code / `font-mono` | `"Source Code Pro", ui-monospace, monospace` | 400, 600 |

Archivo Black is a chosen implementation match for the heavy display lettering, not an identified font from the generated mockup. Its native CSS weight is **400** despite the heavy letterforms; never apply synthetic bold or stretch the font with transforms. See [official metadata](https://raw.githubusercontent.com/google/fonts/main/ofl/archivoblack/METADATA.pb).

During implementation, self-host Latin WOFF2 assets under `/fonts/`: `archivo-black-latin-400.woff2`, `manrope-latin-variable.woff2` (400–700), and `source-code-pro-latin-variable.woff2` (400–600). Define matching normal-style `@font-face` declarations with `font-display: swap`. Retain each upstream license with its assets; Archivo Black's [OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/archivoblack/OFL.txt) must accompany redistribution. Do not fabricate variable ranges for the static Archivo Black file. Preload only the display font used above the fold. Font files are not installed by this documentation change.

### Type scale

Sizes are rem-based with a 16px reference root. Do not override user font-size preferences. Each `text-*` utility below carries its size, weight, leading and tracking through companion theme tokens; pair it with the specified font utility.

| Role / utility | Font utility | Size | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- |
| FALDI / `text-display` | `font-display` | `clamp(5rem, 22vw, 22.5rem)` | 400 | 0.9 | -0.045em |
| Collection title / `text-page-title` | `font-display` | `clamp(3.5rem, 15vw, 15rem)` | 400 | 0.95 | -0.04em |
| Article title / `text-reading-title` | `font-body` | `clamp(2rem, 4vw, 3.5rem)` | 700 | 1.1 | -0.025em |
| Content heading / `text-heading` | `font-body` | `clamp(1.5rem, 2.5vw, 2.5rem)` | 600 | 1.15 | -0.02em |
| Body / `text-body` | `font-body` | `clamp(1rem, 1.2vw, 1.125rem)` | 400 | 1.6 | 0em |
| Caption / `text-caption` | `font-mono` | `0.875rem` | 400 | 1.5 | 0em |
| Navigation / `text-nav` | `font-mono` | `0.875rem` | 400 | 1.4 | 0em |
| Code / `text-code` | `font-mono` | `0.875rem` | 400 | 1.6 | 0em |

Use Manrope 500 for identity and 600/700 for emphasis; Source Code Pro 600 only for deliberate label/code emphasis. Display size must fit its allocated span: wrap longer collection titles intentionally rather than clipping meaningful letters. Reading text stays at a maximum of 65ch. Captions and navigation must remain readable rather than reproduce the mockups' tiny labels.

## Tokens: spacing and shapes

Keep Tailwind's base `--spacing: 0.25rem`. Prefer this scale; do not redefine `--spacing-4` to mean 4px, which would change the meaning of `p-4`.

| Reference value | Rem | Tailwind multiplier |
| --- | --- | --- |
| 4px | 0.25rem | 1 |
| 8px | 0.5rem | 2 |
| 12px | 0.75rem | 3 |
| 16px | 1rem | 4 |
| 24px | 1.5rem | 6 |
| 32px | 2rem | 8 |
| 48px | 3rem | 12 |
| 64px | 4rem | 16 |
| 96px | 6rem | 24 |

| Purpose | Value | Token |
| --- | --- | --- |
| Collection width | 96rem (1536px) maximum | `--layout-collection-max` |
| Reading width | 65ch maximum | `--layout-reading-max` |
| Outer gutter | 1rem mobile; 1.5rem tablet; 2rem desktop | `--layout-gutter` |
| Underlying columns | 2 mobile; 6 tablet; 12 desktop | `--layout-columns` |
| Artifact radius | 0px | `--radius-artifact` |
| Control radius | 0.25rem (4px) maximum | `--radius-control` |
| Touch target | 2.75rem (44px) minimum per dimension | `--control-min-size` |
| Focus outline | 2px ink, 2px paper offset | `--focus-width`, `--focus-offset` |

Use 8px image-to-caption spacing, 16px grid gaps on mobile, and 24px gaps from tablet upward. Larger 48–96px spaces separate artifact groups within the composition; they are not mandatory section bands.

## Layout, surfaces and imagery

Use one continuous collection composition: unequal grid spans, deliberate image crops, broad display type partly behind artifacts, and generous negative space. Mobile is below 48rem; tablet starts at 48rem; desktop starts at 64rem. The grid supports art direction, not equal card tiles. Captions and controls stay in flow and uncovered. Keep DOM order meaningful; do not reorder focus visually or position the entire page with absolute coordinates.

The collection may grow vertically. Never force a fixed viewport height, shrink the desktop canvas on mobile, or hide content to match one screenshot. Mobile reading regions span both columns. Expanded content uses the same paper surface and quieter peripheral artifacts; long articles scroll as documents.

Paper is the sole UI surface. No decorative elevation, shadows, glass, background gradients, rounded card shells or added footer/contact blocks to fill space. Photography, screenshots and covers keep their natural colors and flat edges; do not add a global grayscale treatment or use a mockup screenshot as the entire webpage.

Reserve image dimensions, provide responsive sources and meaningful alt text, load the primary image eagerly, and lazy-load below-the-fold images. Use verified production assets rather than generated quotations, screenshots or implied likenesses.

## Components

| Component | Shared styling and behavior |
| --- | --- |
| Navigation | Transparent on paper; identity in Manrope 500 and Contact on the first row; a left-aligned second row exposes Projects, Blog, Community, Books, Manhwa, Photography and About in `font-mono text-nav`. Links wrap naturally on mobile with 44px targets. Current section has a vermilion underline; exact destinations use `aria-current="page"`, detail-page parent sections use `aria-current="location"`. This is the single global menu; local archive indexes remain collection-specific. |
| Artifact and caption | Flat image, `rounded-artifact`, caption 8px below in `font-mono text-caption`; homepage artifacts are single anchors with a primary section caption and one unique destination |
| Archive filter | Bare text, 44px hit area, slash separators decorative; selected item has vermilion underline and `aria-pressed`; focus remains on activation |
| Search | Visible label, ink text, secondary-ink boundary, `rounded-control`; clear/reset and honest empty results |
| Archive index | Alternate readable view of local collection data; homepage has no alternate index or filters, and `/#index` anchors to the collage |
| Expansion controls | Clear Close/Back text, 44px target; Photography uses a named native dialog with contained focus, uncropped images and stationary background; homepage artifacts navigate directly; archives use inline `aria-expanded` disclosures; Escape restores focus |
| Reading surface | Unboxed paper, `font-body text-body`, max 65ch; real headings, readable code and underline-distinguished inline links |

All controls require visible focus. Use ink outline with paper separation; decorative image corner marks do not replace focus. Never nest interactive elements or depend on hover, dragging or animation for access. Keep error/empty messages understandable without red alone.

## Motion and accessibility

| Role | Value | Token |
| --- | --- | --- |
| Control feedback | 140ms | `--motion-fast` |
| Ordinary transitions | 220ms | `--motion-base` |
| Artifact movement | 260ms | `--motion-slow` |
| Easing | `cubic-bezier(0.23, 1, 0.32, 1)` | `--motion-ease` |

Quiet editorial motion is implemented through shared CSS/WAAPI helpers. Pointer navigation uses browser-native cross-document transitions: outgoing opacity 140ms and incoming opacity plus 6px travel 220ms, overlapping. The identity header remains stationary. Unsupported browsers and script-disabled pages keep ordinary document navigation.

Disclosures enter over 220ms; closing content becomes noninteractive, exits over 140ms and then surrounding visible items reposition within 120ms. Filters reposition retained visible artifacts over 260ms and introduce new items over 220ms; collection/index changes animate entering visible items. Position changes use `cubic-bezier(0.77, 0, 0.175, 1)`. Fine-pointer artifact hover travels at most 3px over 140ms. Compact controls press to `.98` over 100ms and release over 140ms. Only transform and opacity animate; text is never resized during movement.

Keyboard actions, search typing, history traversal, same-page anchors, initial loads and reduced-motion states are immediate. No automatic entrance sequence, scrolling reveal, parallax, bounce or cursor effect is used. State feedback is immediate; optional movement follows. Reduced motion sets these durations to 0ms and removes travel/parallax. Retain stable IDs through filtering. No scroll hijacking, automatic slideshow or custom-cursor dependency.

Use semantic landmarks, a skip link, logical headings and one clear h1. Decorative duplicate title layers are hidden from assistive technology. Verify keyboard/touch parity, 320px reflow, 200%/400% zoom and text/control contrast. New collection pages remain warm-light regardless of system preference; do not overwrite legacy theme storage or change unmigrated pages' theme behavior. Scope migration styling to the new layout.

## Quick start: Tailwind CSS v4 contract

This is the single token definition example for later implementation, following [Tailwind theme-variable conventions](https://tailwindcss.com/docs/theme). It defines CSS, not installed fonts. Layout/motion properties are ordinary custom properties; Tailwind theme namespaces expose named color, font, text and radius utilities. Avoid resetting the whole legacy theme while migrating.

```css
@import "tailwindcss";

@theme {
  --color-paper: #F5F3ED;
  --color-ink: #111111;
  --color-ink-muted: #4B4842;
  --color-vermilion: #C43D28;
  --color-hairline: #D7D2C8;

  --font-display: "Archivo Black", "Arial Black", sans-serif;
  --font-body: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Source Code Pro", ui-monospace, monospace;

  --text-display: clamp(5rem, 22vw, 22.5rem);
  --text-display--font-weight: 400;
  --text-display--line-height: 0.9;
  --text-display--letter-spacing: -0.045em;
  --text-page-title: clamp(3.5rem, 15vw, 15rem);
  --text-page-title--font-weight: 400;
  --text-page-title--line-height: 0.95;
  --text-page-title--letter-spacing: -0.04em;
  --text-reading-title: clamp(2rem, 4vw, 3.5rem);
  --text-reading-title--font-weight: 700;
  --text-reading-title--line-height: 1.1;
  --text-reading-title--letter-spacing: -0.025em;
  --text-heading: clamp(1.5rem, 2.5vw, 2.5rem);
  --text-heading--font-weight: 600;
  --text-heading--line-height: 1.15;
  --text-heading--letter-spacing: -0.02em;
  --text-body: clamp(1rem, 1.2vw, 1.125rem);
  --text-body--font-weight: 400;
  --text-body--line-height: 1.6;
  --text-body--letter-spacing: 0em;
  --text-caption: 0.875rem;
  --text-caption--font-weight: 400;
  --text-caption--line-height: 1.5;
  --text-caption--letter-spacing: 0em;
  --text-nav: 0.875rem;
  --text-nav--font-weight: 400;
  --text-nav--line-height: 1.4;
  --text-nav--letter-spacing: 0em;
  --text-code: 0.875rem;
  --text-code--font-weight: 400;
  --text-code--line-height: 1.6;
  --text-code--letter-spacing: 0em;

  --spacing: 0.25rem;
  --radius-artifact: 0px;
  --radius-control: 0.25rem;
}

.collection-layout {
  --layout-collection-max: 96rem;
  --layout-reading-max: 65ch;
  --layout-gutter: 1rem;
  --layout-columns: 2;
  --layout-gap: 1rem;
  --control-min-size: 2.75rem;
  --focus-width: 2px;
  --focus-offset: 2px;
  --motion-fast: 140ms;
  --motion-base: 220ms;
  --motion-slow: 260ms;
  --motion-ease: cubic-bezier(0.23, 1, 0.32, 1);
  color-scheme: light;
  font-synthesis: none;
}

@media (min-width: 48rem) {
  .collection-layout {
    --layout-gutter: 1.5rem;
    --layout-columns: 6;
    --layout-gap: 1.5rem;
  }
}

@media (min-width: 64rem) {
  .collection-layout {
    --layout-gutter: 2rem;
    --layout-columns: 12;
  }
}

@media (prefers-reduced-motion: reduce) {
  .collection-layout {
    --motion-fast: 0ms;
    --motion-base: 0ms;
    --motion-slow: 0ms;
  }
}
```

Examples: `bg-paper text-ink`, `font-display text-display`, `font-body text-reading-title`, `font-mono text-caption`, `rounded-artifact`, `rounded-control`. Apply layout properties via Tailwind custom-property utilities, such as `max-w-(--layout-collection-max)` and `px-(--layout-gutter)`. The wrapper class declares variables; it does not build the page or wire interactions. Preserve existing font aliases on unmigrated layouts if a shared theme declaration would otherwise change their rendering.

## Do and avoid

**Do:** reuse named tokens; fit actual content into a continuous composition; keep real text and controls accessible; vary artifact scale; compare the homepage implementation with its selected reference.

**Avoid:** arbitrary per-page palettes/fonts, synthetic Archivo Black weights, repeated hero-plus-section stacks, equal card grids, decorative shadows, tiny labels, fabricated personal copy, hover-only content and cropping essential text.

## Next phase and checks

Home, About, In Good Company, Books, Manhwa, Projects, and Writing archives are implemented in **Astro + Tailwind CSS v4**. Project and article details also render as native Astro reading views. Shorts is retired. See [migration-2026.md](docs/migration-2026.md) for route ownership, build commands, CSS boundaries and verification. Preserve source content and the remaining public URLs and SEO contracts. Use Bun exclusively.

Before implementation, confirm token-table/example agreement and valid reference links. During implementation, check loaded fonts and computed styles, responsive composition, contrast, keyboard/reduced motion, complete detail reading and existing-route/SEO behavior. A generated mockup is not runtime verification.

Homepage fitting: Archivo Black has wider native letterforms than the generated reference. The desktop FALDI lockup uses `clamp(5rem, 14vw, 14rem)` to keep the complete name readable beside the software artifact; this is a composition-specific override of the reusable display role. Tablet/mobile sizes reflow without stretching the font. Keyboard-triggered UI state changes are immediate.

Project covers use verified screenshots where available, otherwise individual watercolor illustrations on warm paper. Keep illustration provenance separate from product screenshots. Reuse the cover across archive, index, detail, and social metadata; never bake titles or interface claims into conceptual art.

### Homepage section amendment, 16 September 2026

Seven original positions now represent About (portrait), Projects (Leaflet), Photography (DSCF1200), Community (community photo), Books (Clean Code), Manhwa (Solo Leveling), and Blog (Menulis untuk Membuat Sejarah with its sourced excerpt). Header labels and destinations come from `src/data/siteSections.ts`. Each artifact has one direct anchor; no homepage preview dialogs or category controls remain.

Photography uses an unequal responsive composition with natural image proportions, factual captions and the collection label “6 September 2026”. Images link to optimized larger files without scripting. A native dialog enhances those links with Close, Escape, contained focus and focus restoration. Opening and closing are immediate, including reduced motion. Existing colors, fonts and composition positions remain the visual reference.

### Photography board correction, 16 September 2026

Photography uses a single asymmetric desktop board, matching the collection-page composition rather than a multi-row gallery. Oversized PHOTOGRAPHY type shares the grid with six unequal photographs and a small margin note. Desktop uses the available viewport height, with a 720px minimum page height for readable captions. At smaller widths and short/zoomed viewports, content can scroll rather than clip. Images retain their natural proportions using contain; larger dialog views remain uncropped. Mobile retains the unequal offsets and readable document flow.

Three rejected photographs are replaced with inspected Codex Meetup Jakarta photographs; see `docs/photography-sources.md`. The collection label is now September 2026.

### Fuller Photography composition

The owner requested larger images and more photographs. The board now has eight photographs, with two additional inspected images from the same September 13 Codex meetup (DSCF1348 and DSCF1396). The shallow isolated slots are replaced with a denser, staggered two-row desktop composition. Desktop previews use deliberate `object-fit: cover` crops; the enlargement dialog remains uncropped. Tablet/mobile return to natural proportions. The single-screen desktop target, existing brand, oversized title and asymmetric spans remain.

Photo counts are derived from the gallery length. Captions use tabular numerals and improved text wrapping. Pure-black 10% inset image outlines separate bright edges from paper; keyboard focus uses the existing ink outline. No animation or dependency was added. See `docs/verification/photography-polish.md` for the focused full review.

### Photography hierarchy refinement

The fuller two-row layout was still too regular. The homepage supplied the correction: one tall visual anchor, secondary images at independent heights, unequal gutters and varied caption alignment. Photography now uses the vertical Codex conversation as its large center-left anchor, with two smaller images on the left and five landscape images across staggered right-side positions. All eight photographs remain; no new assets or interactions are introduced. The title sits behind the composition, while captions and link targets remain uncovered. Tablet/mobile retain the previous natural-height flow. This supersedes the prior two-row desktop arrangement. Evidence: `docs/verification/navigation/photography-collage-*.png`.
