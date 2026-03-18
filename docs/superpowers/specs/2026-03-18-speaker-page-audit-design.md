# Speaker Page Audit — WCAG, Animation & UI/UX

**Issue:** [#19](https://github.com/naufaldi/personal-web-2025/issues/19)
**Date:** 2026-03-18
**Approach:** Component-by-component (Approach A) — apply base audit fixes + enhancements in a single pass per component

## Scope

Audit and enhance the Speaker page (`/speaker`) across three areas:
1. WCAG & Accessibility
2. Animation & Motion
3. UI/UX Design

Files affected:
- `src/pages/Speaker.tsx`
- `src/components/speaker/SpeakerMentorHero.tsx`
- `src/components/speaker/ImpactStats.tsx`
- `src/components/speaker/OrganizationMarquee.tsx`
- `src/components/speaker/VoluntaryWorkSection.tsx`
- `src/components/speaker/MentoringSection.tsx`
- `src/components/speaker/SpeakingSection.tsx`
- `src/hooks/useCountUp.ts` (new)

## Established Patterns (from Homepage & Projects Audits)

These patterns were established in commits ff150a5 and 0722ea3 and will be applied consistently:

- **Inline styles to Tailwind**: `style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}` becomes `className="font-mono font-bold"`
- **CSS animations to FadeInUp**: Replace inline `animation` styles with `<FadeInUp>` wrapper (has built-in `useReducedMotion()` support)
- **Color contrast**: `text-slate-500` on body text becomes `text-slate-400` (dark mode) for WCAG AA compliance
- **ARIA**: `aria-labelledby` on sections linked to heading `id`, descriptive `aria-label` on links
- **Focus indicators**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40`
- **Touch targets**: Minimum 40px (`w-10 h-10`)
- **Stagger animations**: `delay={0.1 + index * 0.08}` on list items
- **Active feedback**: `active:scale-[0.98]` on interactive elements

## Section 1: Shared Utilities

### `useCountUp` Hook (`src/hooks/useCountUp.ts`)

Custom hook for animated number count-up:
- Uses `useInView` from framer-motion to detect when element scrolls into viewport
- Animates from 0 to target over ~1.5s using `requestAnimationFrame`
- Returns `{ ref, count }` — attach `ref` to the container, render `count`
- Respects `useReducedMotion()`: returns final value immediately if reduced motion preferred
- Handles non-numeric values gracefully (pass-through)

## Section 2: SpeakerMentorHero

### Base Audit Fixes
- Replace inline `fontFamily`/`fontWeight` styles with Tailwind: `font-mono font-bold` (h1), `font-body font-medium` (subtitle)
- Replace inline CSS `animation: 'fade-in 900ms...'` with `FadeInUp` wrapper
- Fix subtitle contrast: `text-slate-500` becomes `text-slate-400`
- Wrap in `<section aria-labelledby="speaker-hero-heading">`, add `id="speaker-hero-heading"` to `<h1>`

### Enhancements
- Staggered entrance: icon, heading, subtitle each get own `FadeInUp` with delays `0.1`, `0.18`, `0.26`

## Section 3: ImpactStats

### Base Audit Fixes
- Replace inline font styles with Tailwind: `font-body font-medium`
- Replace inline CSS animations with `FadeInUp` wrappers, staggered: `delay={0.1 + index * 0.08}`
- Add `role="list"` on grid, `role="listitem"` on cards
- Add section `aria-label="Impact statistics"`

### Enhancements
- **Count-up animation**: Numeric values use `useCountUp` hook — animate from 0 to target on scroll-in
- **Hover effect**: `hover:scale-[1.02] hover:shadow-lg` with `motion-safe:transition-transform duration-200`
- **Active feedback**: `active:scale-[0.98]`

## Section 4: OrganizationMarquee

### Base Audit Fixes
- Inline font styles on heading become `font-mono font-medium`
- Inline animation on heading becomes `FadeInUp` wrapper
- Add `id="org-marquee-heading"` + `aria-labelledby="org-marquee-heading"` on section
- Add `focus-visible:ring-2` styles on logo links

### Enhancements
- Pause marquee on hover (CSS `animation-play-state: paused` via Tailwind `hover:[animation-play-state:paused]`)
- Smoother grayscale transition: `duration-500`
- Motion-safe guard: wrap marquee in `motion-safe:animate-marquee`; show static grid layout when `prefers-reduced-motion` is active

## Section 5: VoluntaryWorkSection, MentoringSection, SpeakingSection

All three sections share identical structure and receive the same treatment.

### Base Audit Fixes
- Inline font styles become Tailwind: `font-mono font-medium` (headings), `font-body font-medium` (count badges)
- Inline CSS animations become `FadeInUp` wrappers
- Add `id` + `aria-labelledby` on each section:
  - `id="voluntary-work-heading"` / `aria-labelledby="voluntary-work-heading"`
  - `id="mentoring-heading"` / `aria-labelledby="mentoring-heading"`
  - `id="speaking-heading"` / `aria-labelledby="speaking-heading"`
- Fix count badge contrast: `text-slate-500` becomes `text-slate-400`

### Enhancements
- **Stagger animations on items**: Each `MentorSpeakerItem` wrapped in `FadeInUp` with `delay={0.1 + index * 0.08}`
- **Hover on card container**: `hover:border-slate-700/90 light:hover:border-slate-300`
- **Scroll-triggered section reveal**: Outer section wrapped in `FadeInUp`

## Section 6: Speaker Page (Parent)

### Base Audit Fixes
- Ensure content connects to existing `#main-content` landmark from Layout

### Enhancements
- Separators get subtle fade-in via `FadeInUp` as they scroll into view

## Implementation Order

1. Create `useCountUp` hook
2. `SpeakerMentorHero` (audit + enhancements)
3. `ImpactStats` (audit + enhancements + count-up)
4. `OrganizationMarquee` (audit + enhancements + motion-safe marquee)
5. `VoluntaryWorkSection` (audit + enhancements)
6. `MentoringSection` (audit + enhancements)
7. `SpeakingSection` (audit + enhancements)
8. `Speaker.tsx` parent (audit + separator animations)

## Testing Checklist

- [ ] All inline `style=` attributes removed from speaker components
- [ ] `FadeInUp` wraps all animated elements
- [ ] `prefers-reduced-motion` disables all animations (verify in browser)
- [ ] Color contrast passes WCAG AA (4.5:1 for body text)
- [ ] All sections have `aria-labelledby`
- [ ] All interactive elements have `focus-visible` ring
- [ ] Count-up animation triggers on scroll into view
- [ ] Marquee pauses on hover
- [ ] Marquee shows static grid when reduced motion preferred
- [ ] Stagger delays work correctly on list items
- [ ] Responsive layout intact across mobile/tablet/desktop
