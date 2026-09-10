# Collected by Faldi: homepage design QA

**final result: passed**

## Comparison target and evidence

- Source visual truth: [selected homepage](docs/reference/collected-by-faldi-selected.png), 1487×1058 pixels.
- Rendered implementation: [desktop capture](docs/verification/home-desktop.png), 1487×1058 pixels, at `http://127.0.0.1:4322/`.
- State: homepage, All filter, closed artifacts, collection view, warm-light theme, loaded self-hosted fonts.
- Normalization: desktop CSS viewport 1487×1058, device density 1. Source and implementation were displayed together at their original dimensions in [comparison.html](docs/verification/comparison.html), then captured in one [2974×1058 comparison](docs/verification/comparison.png). Source is left, implementation right. No screenshot was used as the actual webpage UI.
- Responsive evidence: [1280 desktop](docs/verification/home-1280.png), [1024 desktop](docs/verification/home-small-desktop.png), [tablet](docs/verification/home-tablet.png), [mobile](docs/verification/home-mobile.png), and [200% equivalent reflow](docs/verification/home-200-percent-reflow.png). Full-page captures retain natural scrolling. [Responsive measurements](docs/verification/responsive.json) record CSS viewport, overflow, font family and caption size.
- State evidence: [filtered index](docs/verification/index-software.png), [expanded software](docs/verification/expanded-software.png), [missing media](docs/verification/missing-media.png).

## Findings and resolved iterations

| Before | After | Why |
| --- | --- | --- |
| First desktop portrait was about 450px wide and pushed its caption down | Portrait reduced to the intended roughly 420px width | Restores the dominant-photo proportions and paper gaps |
| Small project clipping overflowed the canvas controls | Sourced copy and 254px cover fit with readable type | Bottom controls remain unobstructed |
| Unadjusted Archivo Black hid D/I behind the software screenshot | Native letterforms fit a documented homepage-specific display size | Retains the selected font without stretching or losing the name |
| Absolute mobile title inherited desktop grid placement and hid behind the photograph | Reset the absolute title’s grid placement | FALDI stays visible on mobile and in filtered layouts |
| 1024px fixed collage collided captions and controls | Normal-flow responsive composition below 1280px | Maintains readable labels while retaining unequal artifact placement |
| A minimum canvas height could enlarge its intrinsic width | Set canvas width explicitly; larger screens retain 900px height | Prevents horizontal overflow at 1280px |
| Reference has generated street photos, fictional UI and a signed quotation | Owner-approved existing photographs, actual project capture and sourced biography | Real content replaces fictional evidence without importing unsupported claims |

Iteration 1 found the portrait/clipping issues in [the initial desktop capture](docs/verification/home-desktop-first.png). These P2 findings were fixed before the next desktop capture. Iteration 2 fixed title placement and native font fitting. Iteration 3 found responsive collisions in [the initial small desktop capture](docs/verification/home-small-desktop-first.png), then fixed the reflow threshold and definite canvas width. Final desktop and responsive captures show those fixes. The full-view final comparison has no remaining actionable P0/P1/P2 issue under the approved real-content substitution.

Focused assessment used the desktop, small-desktop, expanded-state and mobile captures to check the title/photo intersection, caption regions and controls. Separate cropped image files were unnecessary because the original-resolution captures expose each region clearly.

## Fidelity assessment

| Surface | Result |
| --- | --- |
| Typography | Self-hosted Archivo Black 400, Manrope and Source Code Pro loaded. Caption/navigation text is at least 14px. Native wider display geometry and readable labels intentionally differ from generated pixels. No synthetic bold/stretch. |
| Layout | One continuous collection with unequal artifacts, title/photo overlap, software above community, contact sheet to the right and generous paper gaps. No hero-plus-section stack. Smaller viewports reflow rather than shrink text. |
| Color and surfaces | Warm paper, primary/secondary ink, restrained vermilion labels. Flat images, square artifacts, no decorative shadows. Note-paper tint derives from existing ink/paper tokens. |
| Image quality | Existing assets optimized by Astro to responsive WebP. Original personal/event content is retained. Contact sheet uses grayscale presentation; no generated personal facts or invented software screenshot. |
| Copy | Biography/project descriptions trace to existing data and markdown. Gaming-photo caption corrected after inspecting the image. No unverified metrics or generated signatures. |
| Interaction | Working filters, matching index, real destinations, expansion/Close/Escape, focus restoration and visible focus. Reduced-motion and keyboard changes are immediate; pointer motion uses 140/220/260ms. |
| Responsive behavior | No horizontal overflow in measured 390, 744, 834, 1024, 1280 and 1487px viewports. Essential labels and controls stay uncovered. Large composition may scroll vertically on shorter windows. |

## Runtime checks

- Category filtering returns Software 2, Photography 3 and Community 2 artifacts; All restores 7. Empty-state behavior was exercised with a temporary verification-only unmatched category, then Reset to All restored 7.
- Index uses the same filtered items, links every collection route, and returns to the preserved filter. Inline expansion uses separate destination links.
- Keyboard Enter applies filtering without animations; Escape closes expansion and restores focus to the original trigger. Reduced motion reported zero running animations after a pointer filter action.
- A real emulated touch event changed portrait expansion from false to true with `pointer: touch`, coarse-pointer matching and no hover: [evidence](docs/verification/touch.json).
- A forced missing-image request preserved 613.56px of portrait space, displayed the fallback and retained the About link. The temporary failure was cleared by reloading.
- Script-blocked homepage retained all 7 artifacts, 34 links and the full index; interactive filters were hidden. Script-blocked project detail retained its static article. This used CSP on a temporary localhost verification server, not a production CSP change.
- Every existing collection route and representative detail page rendered in the browser without reported application exceptions. The long MDX article was additionally checked through its final Closing Note (30,722 rendered article characters, no loading state).
- Legacy theme preference persists and does not change the native homepage’s warm-light palette. Home links leave the legacy router. Local HTML alias entry normalizes to its canonical path before React mounts.
- All 121 published routes passed direct HTTP metadata/heading checks; unknown route returned 404. Four migration tests passed with 979 assertions. See [migration guide](docs/migration-2026.md) for commands and scope.

## Limits and follow-up polish

- The reference is generated art, not a pixel-perfect asset inventory. Real subject matter, the chosen font’s native proportions and accessible caption sizes are intentional differences.
- Physical-device and Safari testing remain unperformed. Touch input was emulated in Chromium. The 200% check uses equivalent 744×529 CSS-pixel reflow, not a separate browser-chrome zoom test.
- Hosting-level Netlify redirect behavior and live canonical-domain behavior require deployment verification. Nothing was deployed.
- Existing legacy dependency/build deprecation and large-bundle notices remain outside homepage redesign scope; the homepage has no React client island.
- Optional P3 follow-up: replace the personal images with an owner-curated photography set later, while keeping the same artifact contracts and composition.

## Implementation checklist

- [x] Selected reference and rendered implementation compared together
- [x] Actionable visual findings fixed and recaptured
- [x] Desktop, responsive and core interaction states checked
- [x] Motion, focus, keyboard and script-blocked behavior checked
- [x] Existing routes, metadata, static fallback and aliases verified
- [x] Original reference PNGs preserved
- [x] Migration documentation and local preview prepared

## About implementation

Reference: [About mockup](docs/reference/about-v2.png). Evidence: [desktop](docs/verification/about-desktop.png), [tablet](docs/verification/about-tablet.png), [mobile](docs/verification/about-mobile.png).

| Before | After | Why |
| --- | --- | --- |
| Stacked React biography sections | One asymmetric About composition | Follow the selected page arrangement |
| Grid minimum height enlarged its width | Explicit board width | Keep images inside the 32px desktop gutter |
| Career content separated from the composition | In-flow native details with preserved anchor | Keep complete history accessible without a section stack |

Real portrait, workspace, game controllers, and community photos replace fictional mockup imagery. Archivo Black is wider and shorter than the generated title glyphs; no font stretching. Browser checks confirmed six career records, keyboard focus restoration, and no tablet/mobile overflow.

## In Good Company and final inner-page QA

Status: passed for the implemented desktop/responsive/browser checks; no outstanding P0–P2 issues observed. Physical touch and actual browser-chrome 200% zoom remain untested in this phase.

| Before | After | Why |
| --- | --- | --- |
| Separate stats, logo, mentoring and speaking sections | One In Good Company collection with five varied artifacts | Preserve the selected composition |
| Top photo caption collided with the poster | Wider photo crop with reserved caption space | Keep every detail link readable and clickable |
| Portrait caption crossed bottom filters | Shorter portrait crop | Separate artifact context from navigation |
| Generated workshop imagery and claims | Existing photos labeled as archive material, sourced event text | Avoid inventing events or attributing an unrelated photograph to a talk |
| Duplicated event presentation | Featured IDs reference the full 21-record index | Keep names, dates and links consistent |

Compared both selected references with their actual renderings in the same visual input: [About comparison](docs/verification/about-comparison.png), [community comparison](docs/verification/community-comparison.png). Layout differences are deliberate: native Archivo Black is wider than the generated lettering; readable 14px captions take more room; actual owned photos replace generated subjects. About preserves the dominant central portrait, upper-right workspace, biography and supporting photographs. Community preserves the two-line title, central tall photo, upper-right wide photo, note, poster and supporting photo.

Evidence: [community desktop](docs/verification/community-desktop.png), [tablet](docs/verification/community-tablet.png), [mobile](docs/verification/community-mobile.png), [filtered index](docs/verification/community-mentoring-index.png), [interaction checks](docs/verification/inner-pages-interactions.json). All categories match their source counts; filter state persists through index switching; Enter opens a record without animation; Escape returns focus; reduced motion produces zero active animations. No horizontal overflow at 1487, 834, 390 or 744 CSS pixels. The 744px check is reflow coverage, not a native zoom claim.

## Books and Manhwa

| Before | After | Why |
| --- | --- | --- |
| Separate reading-status sections | Unequal covers in one collection and an alternate index | Follow the selected archive mockups |
| Repeated Manhwa titles in recommendation sections | One title with multiple filter memberships | Preserve source classifications without duplicate artifacts |
| Filtered title retained grid coordinates | Reset absolute title grid area | Keep empty-state links and controls uncovered |
| Book caption covered by the next cover | Pragmatic Programmer caption above its cover | Preserve intentional image overlap without hiding text |

Real cover editions and their colors differ from the generated mockup. Some existing cover sources are low resolution; no synthetic reconstruction was used. All source records remain accessible in the native index.

Books/Manhwa status: passed for checked views. Side-by-side comparisons: [Books](docs/verification/books-comparison.png), [Manhwa](docs/verification/manhwa-comparison.png). [Filter evidence](docs/verification/shelves-interactions.json) verifies all category counts. Desktop 1487 × 1058, tablet 834 × 1112, and mobile 390 × 844 have no horizontal overflow. All lazy images were scrolled into view and decoded before full screenshots. Enter opens details and Escape restores the initiating cover. Six migration tests pass with 993 assertions.

## Projects archive

| Before | After | Why |
| --- | --- | --- |
| React project card grid | Large title, primary software artifact, two real screenshots and supporting pieces | Follow the selected Projects composition |
| Mockup TS Hooks interface and placeholder Reading List image | Sourced typographic artifacts | Avoid presenting fictional product screenshots |
| Leaflet caption overlapped Slate | Wider Leaflet crop and reserved caption gap | Keep titles and links readable |
| Lower artifacts crossed controls | More desktop canvas height | Allow natural scrolling without overlap |

Source artwork intentionally differs from the dark generated interfaces. Existing project details retain their full content and original slugs.

Projects status: passed after production-specific CSS fixes. [Comparison](docs/verification/projects-comparison.png), [mobile](docs/verification/projects-mobile.png), [interaction checks](docs/verification/projects-interactions.json). Scoped selectors prevent shared CSS from overriding note height and title sizes in the production bundle. All 17 entries remain searchable, and unmatched queries show an empty state without moving input focus. Responsive checks at 1487, 1100, 834 and 390 CSS pixels show no overflow. The ts-hooks-kit detail renders and its return link reaches native Projects.

## Writing archive

| Before | After | Why |
| --- | --- | --- |
| Paginated React list under a hero | Five-essay composition plus complete searchable index | Match the selected editorial direction |
| Generated essay headlines and excerpts | Existing essay titles and source excerpts | Preserve authorship and destinations |
| Top essay action touched the next article’s metadata | Summary excerpt stays in the index | Give both article links clear space |
| An existing category had no filter button | Include Security Incident from source data | Keep all 86 published entries discoverable by category |

The large title sits behind the lead paper artifact. Existing personal photographs replace generated city imagery. Full titles, readable captions and search add vertical space, so this composition scrolls naturally rather than shrinking typography into one viewport.

Writing status: passed for checked views, with no outstanding actionable P0–P2 issues observed. [Side-by-side comparison](docs/verification/writing-comparison.png), [mobile](docs/verification/writing-mobile.png), [tablet](docs/verification/writing-tablet.png), and [interaction evidence](docs/verification/writing-interactions.json). Category counts are 86 / 10 / 6 / 64 / 5 / 1 for All / Journey / Ideas / Technical / Opinions / Security Incident. Search, empty results, focus retention, keyboard activation and reduced motion passed. Checked widths 1487, 1100, 834, 390, 320 and 744 CSS pixels without horizontal overflow. Article navigation and return to the native archive passed. The 744px viewport verifies reflow; actual browser-chrome 200% zoom and physical touch were not tested in this phase.
