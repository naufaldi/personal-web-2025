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

## Project covers and native reading pages

| Before | After | Why |
| --- | --- | --- |
| Two screenshot artifacts and two large text-only blocks | Four illustrated/screenshot artifacts, with a cover for all 17 projects in the index and details | Give every project a visual identity |
| GitHub repository cards, a placeholder and two broken screenshot sources | Eight individual watercolor covers, clearly identified as illustrations | Avoid pretending conceptual art is a real product interface |
| Reading List cover crossed Slate’s caption | Reserved caption gap and rebalanced desktop rows | Keep controls and text unobscured |
| Project introduction used the truncated SEO description | Full sourced project description | Metadata length constraints must not shorten visible content |
| React detail shell and legacy CSS | Native Astro reading canvas, 65ch body, heading links and source content | Extend the approved design through the complete reading experience |
| Body H1 competed with page title | Body H1 normalized to H2, with stable text-based anchors | Preserve one clear page heading |
| Decorative project title overflowed mobile | Narrow-screen fluid title sizing | Preserve composition without horizontal scrolling |
| Shorts remained a migration target | Shorts removed from public navigation, route generation and crawler files | Follow the user’s retirement decision |

Nine retained screenshot sources were visually inspected together in the [cover audit](docs/verification/cover-audit.png). Eight generated covers use the approved watercolor/paper treatment, with individual subjects tied to project purpose. Their subjects are illustrative and do not represent real users or the author. Source details: [cover inventory](docs/verification/project-cover-sources.json).

Status: passed for the checked desktop, tablet and mobile views, with no outstanding actionable P0–P2 issues observed. [Painted project collection](docs/verification/projects-painted-desktop.png), [mobile collection](docs/verification/projects-painted-mobile.png), [project-detail comparison](docs/verification/project-reading-comparison.png), and [article comparison](docs/verification/article-reading-comparison.png) record the visual pass. The comparison keeps oversized background lettering, unequal imagery and a paper reading surface; actual source content and the newly approved paintings intentionally differ from the mockup’s fictional interfaces and copy.

[Responsive checks](docs/verification/reading-responsive.json) cover Projects, a project detail and an article at 1487, 834, 390 and 320 CSS pixels, all without horizontal overflow and with one H1. [Browser interaction evidence](docs/verification/reading-interactions.json) confirms all 17 index covers load, project search, keyboard filtering with zero animations, heading targets, code copying, two Mermaid diagrams and the retired page. [Script-blocked evidence](docs/verification/reading-nojs.json) confirms native article content, diagram source, TOC disclosure and the project index remain accessible. [Route checks](docs/verification/completed-route-checks.json) cover 110 retained paths and 13 retired/unknown URL cases. Production build and eight migration tests pass (1094 assertions).

Physical touch, Safari, actual browser-chrome 200% zoom and live host redirects were not tested in this phase. Some images embedded in older article bodies remain external and may fail independently; the reading view provides descriptive fallback text. Reference PNGs and all original source Markdown remain unchanged.

## Approved detail v3 implementation

Source targets: [project](docs/reference/detail-studies/project-detail-v3.png) and [blog](docs/reference/detail-studies/blog-detail-v3.png), each 1065 × 1477 pixels. Production captures: [project desktop](docs/verification/project-detail-v3-desktop.png) and [blog desktop](docs/verification/blog-detail-v3-desktop.png), each 1440 × 2000 CSS/pixel viewport at density 1. Each paired comparison displays both images at 720 × 1000, preserving their approximately equal aspect ratios. The source is a shortened complete-page study; the implementation capture shows the opening 2000 pixels of the complete original document. Footer and later code therefore occur farther down.

Full-view comparisons: [project pair](docs/verification/project-detail-v3-comparison.png), [blog pair](docs/verification/blog-detail-v3-comparison.png). Focused code/contents evidence: [code view](docs/verification/blog-detail-v3-code.png). Additional [responsive evidence](docs/verification/detail-v3-responsive.json) covers desktop, tablet, mobile and narrow mobile for both page types.

| Before | After | Why |
| --- | --- | --- |
| Closed desktop contents and an unrelated support portrait | Visible sticky contents rail with a subtle divider; support portrait removed | Follow the approved reading composition |
| Workspace photograph beside the blog title | Existing reading watercolor, with illustration provenance | Match the selected blog study |
| First iteration reserved two rows for the illustration, leaving a large blank gap | Peripheral illustration positioned independently on desktop; prose occupies the row beside contents | Keep reading directly below the title without obscuring text |
| Copy controls after light code blocks | Dark syntax-highlighted code, with a reserved top strip for copy controls | Match the study while keeping long lines scrollable |
| Shared hover styling colored Copy red on black | Paper-colored hover/focus text and visible focus outline | Preserve contrast on the dark surface |
| Narrow bottom navigation | Full-width hairline and reading navigation | Close the continuous composition consistently |

Comparison history: the initial browser pass exposed the P1 blank reading gap. The corrected desktop capture and paired comparison confirm it is removed. The focused code pass exposed the P2 hover contrast mismatch; the revised code capture confirms paper-colored focused text. No actionable P0–P2 issue remains in the checked states.

Fidelity review: Archivo Black retains its native wider letterforms and weight 400; Manrope/Source Code Pro retain the settled text hierarchy, with 18px desktop/17px mobile prose and captions at least 14px. These deliberately differ from the mockup's synthesized lettering and enlarged excerpt typography. Warm paper, ink, vermilion and flat surfaces remain consistent. Cover subjects and the blog watercolor are the actual existing assets, displayed without distortion. Unequal openings, generous gaps and rail/body separation match the chosen direction. Original Markdown and metadata replace generated placeholder text; no invented claims were copied.

Interaction evidence: the Zustand contents link reached `#zustand` and became current; keyboard Enter did the same. Copy returned “Copied” with paper-colored focused text. Reduced-motion media was verified true with zero active animations. Both Mermaid diagrams rendered and retained their source. No browser runtime errors were reported on these tested routes. With scripts blocked, the state-management article retained 11,061 text characters, its open native contents and zero copy controls. Eight viewport checks reported no horizontal overflow or failed cover images.

Build/check and all eight migration tests passed (1,094 assertions), covering static route metadata, one H1, aliases, all 17 project covers and retired Shorts. Original source Markdown and previously tracked reference PNGs are unchanged. Physical touch, Safari and actual browser-chrome 200% zoom were not retested; responsive widths are not claimed as substitutes. External images/links inside historical article content remain subject to their original hosts.

Final result: passed.

## Quiet editorial motion review

The approved motion contract is the visual/interaction target; existing reference compositions remain unchanged. Browser review used production output at port 4341 and a slow-motion development capture at port 4340. [Normal-speed recording](docs/verification/motion-normal.webm) and [quarter-speed disclosure recording](docs/verification/motion-slow.webm) record 1440 × 1000 viewport interaction. Slow playback was applied in the browser only, never shipped. Extracted frames were inspected for text scaling, inconsistent origins and close/reopen artifacts.

| Before | After | Why |
| --- | --- | --- |
| Archive filters replayed a whole-surface entrance | Shared visible-item repositioning captures current rendered positions before cancellation | Rapid input retargets without restarting from a fixed frame |
| Disclosures instantly removed content | 220ms entry; inert/aria-hidden exit over 140ms followed by up to 120ms repositioning | Explain state changes without animating height or blocking the trigger |
| Homepage close could not reverse during an exit | Reopening invalidates pending completion; keyboard/Escape settles immediately | A stale callback must never hide reopened content |
| Separate page-family hover rules | Shared fine-pointer 3px lift and compact-control `.98` press | Consistent feedback without moving captions or scaling records |
| Hard document switches | Pointer-only native page transitions and a stationary identity layer | Add continuity while preserving static routing |
| Intentional transition skip produced an AbortError during initial QA | Handle the expected `ready` rejection on outgoing and incoming transitions | Clean keyboard/history/reduced-motion fallback |
| Motion-test setup reused an already-open page | Reload each independent test case | Ensure failure evidence reflects the interaction being tested |

Review verdict: Approve for the checked implementation and states. No outstanding feel-breaking, timing, keyboard, reduced-motion or transform/property issue was found after corrections. Controls and status update immediately; entering items use 6px travel, not scale-from-zero. The deliberate native page crossfade is justified by navigation continuity. Filters/index changes animate visible items only; search remains immediate. Exit content is noninteractive and retains no stale inert state after completion or reversal.

Verification: production build/check and eight migration tests pass (1,094 assertions). Nine real-browser motion tests pass (11 assertions), including reading-contents Escape/focus restoration. [Responsive evidence](docs/verification/motion-responsive.json) covers nine routes at 1440, 834, 390 and 320 CSS pixels, with no horizontal overflow, one H1 and no React islands in all 36 checks. [Desktop home](docs/verification/motion-home-1440.png), [mobile home](docs/verification/motion-home-390.png), [desktop books](docs/verification/motion-book-1440.png) and [mobile reading](docs/verification/motion-state-management-in-reactjs-390.png) preserve the compositions.

Actual Home → About pointer navigation produced a native transition and navigation intent; keyboard return produced no intent. Back/Forward completed with no console errors. Script-blocked Books kept usable native details, zero animation and no native transition opt-in. Navigation exclusion tests cover keyboard, modifiers, same-page hashes, downloads and new-tab targets. The animation code changes only transform/opacity during playback; layout measurement occurs at interaction boundaries rather than in a per-frame layout loop.

Limitations: unsupported-engine fallback is feature-gated but was not tested in a separate unsupported browser engine. Physical touch, Safari, browser-chrome zoom and CPU-throttled performance traces were not completed. The video recorder samples fewer frames than a display refresh; frame review supports visual continuity, not a numerical 60fps claim. No production-host navigation or deployment was tested. Previously tracked reference PNGs and source content remain unchanged.

Final result: passed.

## Site-wide interaction repair, 2026-09-11

| Before | After | Why |
| --- | --- | --- |
| P2: Home preview enables full-canvas reflow, changes image crop/title and scrolls automatically. Reproduced in Browser. | Native dialog over stationary composition; regression measures background rectangles and scroll. | `collection.ts` selection shared the filter layout state; translation cannot compensate for geometry changes. |
| P2: Ctrl-click on Books preview sets board.hidden and prevents native link action. Reproduced in browser event dispatch. | Only ordinary same-tab anchor clicks are enhanced. | `editorial.ts` unconditionally prevented default. Same guard needed for Home index. |
| P2: Copy twice 1000ms apart; 900ms later latest feedback is already cleared. Reproduced with resolved clipboard stub. | Latest attempt owns completion and its 1800ms reset. | `reading.ts` retained earlier timers and accepted stale async results. |

Verification results are recorded below after repair.

P2 correction during keyboard verification: Chromium moved focus to browser chrome after the last dialog link. Explicit Tab/Shift+Tab wrapping now keeps the two preview controls in the requested cycle; native modal background inertness remains browser-owned.

P2 correction from slowed recording: fading only the panel contents left an opaque blank paper rectangle during exit. Entrance/exit now target the whole dialog surface, retaining transform/opacity-only animation and eliminating that intermediate blank surface.

### Verification evidence

Final combined run: **27 tests passed, 0 failed, 1,160 assertions**.

- Production build: 111 pages, 109 HTML aliases; type checks pass (14 pre-existing deprecated-icon hints).
- Route sweep: 110 canonical routes × 1487×1058 and 390×844 = 220 successful browser loads, matching titles/canonicals, no horizontal overflow and no broken images detected after eager loading. Unknown URL, `/shorts` and all ten retired detail slugs return 404. See [machine-readable results](docs/verification/interaction-audit.json).
- Interaction matrix: nine page families × four widths (1487, 834, 390, 320), all filters, available disclosures, search/empty results, immediate keyboard state and image fallback. All seven Home previews additionally preserve background geometry, scroll and focus.
- Regression coverage includes interrupted close/reopen, index return, Tab cycling, reduced-motion changes during a deliberately slowed exit, repeated and out-of-order clipboard completions, native modified-link exclusions, navigation Back/Forward and hashes.
- Script-blocked browser checks cover all nine families. Static migration tests additionally inspect every route and alias, JSON-LD, project covers, source inventory and discoverability files. Both Mermaid diagrams render on `compiler-vs-transpiler`, with source retained and no mobile overflow.
- Browser visual review: Home open/close, About experience, community event, Books and Manhwa records, Projects and article detail navigation. Automated browser sweeps supplement this review; they are not a claim of manual visual review of every article.
- [Desktop closed](docs/verification/preview-1487-closed.png), [desktop open](docs/verification/preview-1487-open.png), [320px open](docs/verification/preview-320-open.png); equivalent 834px and 390px pairs are alongside them. [Normal recording](docs/verification/preview-normal.webm) and [slowed recording](docs/verification/preview-slow.webm) were reviewed as sampled frames. The final surface fades as one piece, with no blank paper rectangle, title resizing or background reflow.

### Coverage limits

Safari, physical touch hardware, actual 200% browser zoom, assistive-technology testing and a frame-performance trace were not verified in this environment. Viewport emulation and sampled recordings do not establish those results or prove 60fps. Unsupported native transition behavior is covered through event/feature fallback checks, not an actual older browser. External resources were not visited exhaustively; local destinations and static metadata were checked. No unresolved reproduced P0–P2 issue remains in the tested paths; this does not certify the untested environments.


## 11 September 2026: preview timing review and community content

Motion review verdict: **Block timing/cohesion approval for the large preview**. This is a polish finding, not a newly reproduced focus or layout regression. The previous behavioral test results do not establish perceptual smoothness.

| Before | After / recommendation | Why |
| --- | --- | --- |
| Preview shares 220ms entry and 140ms exit with small disclosures (`src/astro/scripts/motion.ts:2`; `collection.ts:29,76`) | Proposed preview-only 280ms entry and 220ms exit, pending the requested user choice | Large photographic surfaces need a more legible transition; avoid slowing frequent controls globally |
| Backdrop has a static 40% black background (`src/astro/styles/collected.css:265`) | Proposed synchronized backdrop opacity, same lifecycle and cancellation as the panel | A backdrop appearing/disappearing immediately undermines the content fade |
| Both directions use a strongly front-loaded ease-out | Review opacity with a gentler curve while retaining ease-out for 6px travel | Duration alone does not determine how quickly the visible change occurs |
| Event records have sparse descriptions and generic feature images | 12 sourced Luma records added, two enriched, four real event photos placed | Makes the archive useful and ties documentary imagery to the correct event |

Relevant review tiers: purpose and token consistency pass; timing and visual cohesion need revision; existing transform/opacity implementation and immediate keyboard/reduced-motion behavior remain appropriate. No new animation code was changed in this pass. Re-test cancellation, backdrop cleanup, keyboard and reduced-motion settlement when the timing proposal is implemented.

Community verification: production build and type checks pass. Browser inspected the Cursor event hash destination, expanded source content and two-image gallery at the in-app desktop viewport. Images load with meaningful alt text. Source provenance is in [community-event-sources.md](docs/community-event-sources.md). Physical-device and Safari coverage are not claimed.

Follow-up verification: the 390px Cursor event has no horizontal overflow and both gallery images load. All eight migration tests pass (1152 assertions). The first motion run had a browser-startup hook timeout and a geometry assertion failure; a rerun with a 15-second test timeout passed all 13 tests. This is recorded as test-run variability, not proof the first geometry failure was diagnosed. No motion source was changed. `git diff --check` passes.

