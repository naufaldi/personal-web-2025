# Collection title alignment and accessibility review

Reviewed 27 September 2026 against [WCAG 2.2 A and AA](https://www.w3.org/TR/WCAG22/). This is a scoped engineering review, not a site-wide conformance certification.

## Title correction

All eight collection H1s use a shared top-left anchor. Previously, search pushed Projects/Writing down approximately 54px, Home and Community shifted the actual H1 horizontally, and Photography added 10px vertically. At 1440×900 all eight now start at `(40px, 139px)`.

The H1 is independent from the board, so search, filters, empty results, index views, and direct index hashes no longer remove it. Title wording, font treatments, intentional line breaks, artwork grid placements, and entrance timings are retained. Invisible, aria-hidden sizing placeholders preserve the old board tracks without adding accessible headings.

Default artwork coordinates were compared at 1440×900, 1280×720, 1024×768, 834×900, 390×844, and 320×740. Desktop rectangles are unchanged. Comparing the development baseline with production gives a maximum 2.563px accumulated vertical difference in mobile Photography's intrinsic images; same-development comparisons were unchanged. The browser regression allows 3px for image rounding, but only 1px for title alignment. No default page activates the expanded-typography treatment.

Evidence:

- [Writing before](blogs-1440-before.png) and [after](blogs-1440-after.png)
- [Community before](speaker-1440-before.png) and [after](speaker-1440-after.png)
- [Mobile Writing before](blogs-390-before.png) and [after](blogs-390-after.png)
- All eight pages have `*-{1440,1280,1024,834,390,320}-after.png` captures; desktop/mobile baselines use `*-{1440,390}-before.png`.
- [Before geometry](artwork-before.json), [after geometry](artwork-after.json), [automated audit](axe-results.json), and [text enlargement measurements](text-enlargement.json).

## Findings and fixes

| Finding | Relevant criteria | Resolution and evidence |
| --- | --- | --- |
| The only Writing H1 disappeared when search switched to the index. | 1.3.1, 2.4.6 | Shared H1 stays visible outside the hidden board. Browser checks cover search, no results, reset, index, and return. |
| Compact-desktop search label was clipped above the main scrollport during implementation. | 1.3.1, 3.3.2 | Label stays inside its row; regression checks its rectangle against the scrollport. |
| Custom text spacing overflowed large titles; fixed-height desktop boards overlapped article text. | 1.4.10, 1.4.12 | Titles wrap; sizing placeholders grow on compact layouts. Increased typography activates natural content flow, including actual-size enlargement. Tests check title/artifact separation and inner scroll widths, not only document width. |
| Decorative reading backdrop created horizontal overflow with increased spacing. | 1.4.10, 1.4.12 | Only the aria-hidden decorative backdrop is clipped to its containing region. Reading prose stays visible. |
| Indonesian article prose and collection excerpts inherited English. | 3.1.2 | Explicit reviewed language mapping for 53 Indonesian article bodies, independent title/excerpt exceptions, and scoped `lang` on prose, title, TOC, and collection text. The Indonesian quote in State Management is also annotated. Navigation stays English. |
| Focusable code blocks had an accessible label on an unsupported generic role. | 4.1.2 | Code examples use a named group while retaining keyboard scrolling and copy controls. Regression checks axe's prohibited-ARIA finding. |
| 404 did not offer the site's keyboard skip link. | 2.4.1, consistency improvement | Added a skip link and focusable main destination. Existing landmark/heading bypass means the prior absence was not classified as a definite violation. |

## Verification

`bun run build` succeeds with 113 static pages and 111 HTML aliases. Existing legacy icon deprecation warnings remain. The final regression run passed 55 tests with 3,140 assertions and no failures.

The migration, viewport, interaction matrix, state, motion, entrance, title/accessibility, and language suites cover:

- All published static routes' metadata/content contracts; all eight overview title anchors and retained artwork geometry.
- Search/filter/index states, empty results, reset and focus restoration.
- Photo keyboard opening, contained Tab navigation, Escape/opener restoration, image failure/recovery, and no-JavaScript image links.
- Reading TOC, hashes, history/scroll restoration, code scrolling/copy behavior, and named code semantics.
- Keyboard navigation, reduced motion, pointer entrance/exit handoff, short desktops, and script-blocked pages.
- WCAG text-spacing overrides: line-height 1.5, paragraph margin 2em, letter-spacing .12em, and word-spacing .16em. Checks cover 320px horizontal reflow and 1024px title/content separation.
- Controlled 200% enlargement of computed text sizes. The eight collections use intrinsic flow; Experience, 404, and sampled reading content retain contained horizontal widths. This is text enlargement testing, not native browser zoom.

Run against the production preview and the script-blocked fixture:

```sh
bun run build
bun run preview --host 127.0.0.1 --port 4341
bun run scripts/serve-nojs.ts
MOTION_TEST_ORIGIN=http://127.0.0.1:4341 bun test tests/migration.test.ts tests/viewport.browser.test.ts tests/interaction-matrix.browser.test.ts tests/states.browser.test.ts tests/motion.browser.test.ts tests/collection-entrance.browser.test.ts tests/title-alignment.browser.test.ts tests/content-language.test.ts src/astro/lib/contentLanguage.spec.ts
```

Axe 4.12.1 was run after fonts and animations settled with WCAG 2/2.1/2.2 A/AA tags. There were zero definite automated violations on 13 sampled pages: eight collections, Experience, 404, a project detail, and two blog details. Independent checks also covered an open photo dialog and Projects index.

Overlapping titles trigger incomplete automated contrast checks. Visual review confirms dark text on paper where exposed; artwork intentionally masks portions of display titles as before. Color calculations on paper: ink 17.02:1, muted ink 8.21:1, vermilion 4.68:1. Decorative reading backdrops are aria-hidden. Automated overlap flags are not represented as automatic passes or failures.

## Limits

- No VoiceOver/NVDA session was completed. Browser accessibility-tree semantics and keyboard behavior were checked; actual assistive-technology pronunciation/navigation remains unverified.
- Native 200%/400% browser zoom was not verified. Agent-browser's zoom shortcut did not change zoom, and two Chrome Browser Use attempts failed to load the request-header policy. Responsive 320px reflow and controlled 200% text enlargement are separate evidence, not substitutes claimed as native zoom.
- Intrinsic typography adaptation uses ResizeObserver and JavaScript. Standard script-disabled navigation/content was checked; combined script-disabled and user typography overrides were not verified.
- Predominant article languages and known title/excerpt exceptions are annotated. Imported mixed-language quotes and related-article fragments still need paragraph-level editorial review before making a comprehensive content-language claim.
- Chromium was checked locally. Safari, Firefox, physical touch devices, and every embedded content/media item were not exhaustively audited. No deployment was performed.


## Follow-up: stationary motion

The owner rejected shrink/grow transitions because their visible edges resembled changing margins. Collection entry is now a 220ms opacity-only reveal with 30ms stagger capped at 90ms; page exit is a 140ms opacity-only fade using the shared ease-out curve. Shared show/hide helpers no longer translate 6px. Artwork geometry and heading anchors are unchanged.

Verification: `bun run build` passed (113 pages, 111 aliases). `MOTION_TEST_ORIGIN=http://127.0.0.1:4321 bun test tests/collection-entrance.browser.test.ts tests/motion.browser.test.ts tests/title-alignment.browser.test.ts` passed: 27 tests, 0 failures, 3011 assertions. The entrance regression samples actual animated bounds at 0%, 25%, 50%, 75%, and 100% across all eight collections, within 0.1px, and checks opacity-only native exit/reading entrance keyframes. Keyboard, reduced motion, history, hashes, rapid toggles, and search remain covered. Browser navigation was exercised locally. A video export was attempted but unavailable because ffmpeg is not installed; no video proof is claimed.


### Correction: retain small-to-big entrance

The opacity-only follow-up was rejected because it felt like a blink. It is superseded by the original .96-to-1 scale-and-fade entrance (380ms, 55ms stagger), with transform-origin set to the element’s top-left in both animation keyframes. Position is fixed; size deliberately changes. Exit remains a full-size fade, lengthened to 220ms with a gentler ease-out; it does not shrink the whole page. Regression assertions now verify fixed x/y throughout entry and actual 4% size growth, rather than incorrectly requiring fixed dimensions.
