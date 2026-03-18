# Speaker Page Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit and enhance the Speaker page for WCAG accessibility, animation with reduced-motion support, and UI/UX polish (Issue #19)

**Architecture:** Component-by-component approach — each of the 6 speaker sub-components gets base audit fixes + enhancements in a single pass. One shared utility (useCountUp hook) is created first. All changes follow established patterns from the homepage (ff150a5) and projects list (0722ea3) audits.

**Tech Stack:** React, TypeScript, Tailwind CSS v4, framer-motion, Lucide icons

**Spec:** `docs/superpowers/specs/2026-03-18-speaker-page-audit-design.md`

**Note:** This project has no test framework. Verification is done via `npm run build` (type-check + build) and manual browser testing.

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/hooks/useCountUp.ts` | Create | Animated number counter hook |
| `src/components/speaker/SpeakerMentorHero.tsx` | Modify | Hero section audit + stagger entrance |
| `src/components/speaker/ImpactStats.tsx` | Modify | Stats cards audit + count-up animation |
| `src/components/speaker/OrganizationMarquee.tsx` | Modify | Marquee audit + pause/motion-safe |
| `src/components/speaker/VoluntaryWorkSection.tsx` | Modify | Section audit + FadeInUp wrappers |
| `src/components/speaker/MentoringSection.tsx` | Modify | Section audit + FadeInUp wrappers |
| `src/components/speaker/SpeakingSection.tsx` | Modify | Section audit + FadeInUp wrappers |
| `src/pages/Speaker.tsx` | Modify | Parent audit + separator animations |

---

### Task 1: Create `useCountUp` Hook

**Files:**
- Create: `src/hooks/useCountUp.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface UseCountUpOptions {
  duration?: number
  suffix?: string
}

export function useCountUp(target: number, options: UseCountUpOptions = {}) {
  const { duration = 1.5, suffix = '' } = options
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    const durationMs = duration * 1000
    let rafId: number
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, target, duration, prefersReducedMotion])

  const display = `${count.toLocaleString()}+${suffix ? ` ${suffix}` : ''}`

  return { ref, count, display }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (unused export is fine)

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCountUp.ts
git commit -m "feat: add useCountUp hook for animated stat counters"
```

---

### Task 2: Audit `SpeakerMentorHero`

**Files:**
- Modify: `src/components/speaker/SpeakerMentorHero.tsx`

- [ ] **Step 1: Rewrite the component**

Replace the full file content with:

```tsx
import { Mic } from 'lucide-react'
import FadeInUp from '@/components/common/FadeInUp'

export default function SpeakerMentorHero() {
  return (
    <section
      className="px-6 md:px-0 flex flex-col items-center gap-4 mb-12"
      aria-labelledby="speaker-hero-heading"
    >
      <FadeInUp delay={0.1}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/70 bg-slate-900/60 light:bg-white/80">
          <Mic className="h-6 w-6 text-slate-300 light:text-slate-600" aria-hidden="true" />
        </div>
      </FadeInUp>
      <FadeInUp delay={0.18}>
        <h1
          id="speaker-hero-heading"
          className="text-4xl md:text-5xl text-center font-mono font-bold"
        >
          <span className="text-slate-100 light:text-slate-900">Speaker </span>
          <span className="text-slate-300 light:text-slate-500">& Mentor</span>
        </h1>
      </FadeInUp>
      <FadeInUp delay={0.26}>
        <p className="text-sm md:text-base text-slate-400 light:text-slate-600 text-center font-body font-medium">
          Empowering developers through knowledge sharing, mentorship, and community engagement
        </p>
      </FadeInUp>
    </section>
  )
}
```

Changes:
- Inline `style=` removed (3 instances) → Tailwind classes
- Inline CSS animation → 3 staggered `FadeInUp` wrappers
- `text-slate-500` → `text-slate-400` (contrast fix)
- Wrapped in `<section aria-labelledby="speaker-hero-heading">`
- `aria-hidden="true"` on decorative Mic icon

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/speaker/SpeakerMentorHero.tsx
git commit -m "fix: audit SpeakerMentorHero — WCAG, animation & inline styles"
```

---

### Task 3: Audit `ImpactStats` with Count-Up

**Files:**
- Modify: `src/components/speaker/ImpactStats.tsx`

- [ ] **Step 1: Rewrite the component**

Replace the full file content with:

```tsx
import { Users, GraduationCap, Mic, Clock } from 'lucide-react'
import { speakerMentorStats } from '@/data/speaker'
import { cn } from '@/lib'
import FadeInUp from '@/components/common/FadeInUp'
import { useCountUp } from '@/hooks/useCountUp'

interface ImpactStatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  className?: string
  index: number
  suffix?: string
}

const ImpactStatCard = ({
  label,
  value,
  icon,
  className,
  index,
  suffix,
}: ImpactStatCardProps) => {
  const { ref, display } = useCountUp(value, { suffix })

  return (
    <FadeInUp delay={0.1 + index * 0.08}>
      <div
        ref={ref}
        role="listitem"
        className={cn(
          'rounded-xl border border-slate-800/70 light:border-slate-200/80 bg-slate-900/60 light:bg-white/80 px-4 py-4 text-sm shadow-sm light:shadow transition-colors hover:text-slate-200 light:hover:text-slate-900 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/80 light:hover:bg-white font-body font-medium',
          className
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 light:text-slate-500">{label}</span>
          <div className="text-slate-500 light:text-slate-400" aria-hidden="true">{icon}</div>
        </div>
        <div className="text-xl md:text-2xl font-semibold text-slate-100 light:text-slate-900">
          {display}
        </div>
      </div>
    </FadeInUp>
  )
}

interface ImpactStatStringCardProps {
  label: string
  value: string
  icon: React.ReactNode
  className?: string
  index: number
}

const ImpactStatStringCard = ({
  label,
  value,
  icon,
  className,
  index,
}: ImpactStatStringCardProps) => (
  <FadeInUp delay={0.1 + index * 0.08}>
    <div
      role="listitem"
      className={cn(
        'rounded-xl border border-slate-800/70 light:border-slate-200/80 bg-slate-900/60 light:bg-white/80 px-4 py-4 text-sm shadow-sm light:shadow transition-colors hover:text-slate-200 light:hover:text-slate-900 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/80 light:hover:bg-white font-body font-medium',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 light:text-slate-500">{label}</span>
        <div className="text-slate-500 light:text-slate-400" aria-hidden="true">{icon}</div>
      </div>
      <div className="text-xl md:text-2xl font-semibold text-slate-100 light:text-slate-900">
        {value}
      </div>
    </div>
  </FadeInUp>
)

export default function ImpactStats() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 px-6 sm:px-0"
      role="list"
      aria-label="Impact statistics"
    >
      <ImpactStatCard
        label="Mentees Taught"
        value={speakerMentorStats.menteesTaught}
        icon={<Users className="h-5 w-5" />}
        index={0}
      />
      <ImpactStatCard
        label="Mentoring Sessions"
        value={speakerMentorStats.mentoringSessions}
        icon={<GraduationCap className="h-5 w-5" />}
        index={1}
      />
      <ImpactStatCard
        label="Speaking Engagements"
        value={speakerMentorStats.speakingEngagements}
        icon={<Mic className="h-5 w-5" />}
        index={2}
      />
      {speakerMentorStats.speakerTime && (
        <ImpactStatStringCard
          label="Speaker Time"
          value={speakerMentorStats.speakerTime}
          icon={<Clock className="h-5 w-5" />}
          index={3}
        />
      )}
    </div>
  )
}
```

Changes:
- Inline `style=` removed (2 instances per card) → Tailwind `font-body font-medium`
- Inline CSS animation → `FadeInUp` wrapper with stagger delays
- `delay` prop replaced with `index` prop for stagger calculation
- Numeric values use `useCountUp` hook for animated count-up
- String values (`speakerTime`) use separate `ImpactStatStringCard` — no animation
- `aria-hidden="true"` on all decorative icons
- `role="list"` on grid, `role="listitem"` on cards
- `aria-label="Impact statistics"` on container
- Removed hover/active scale effects (non-interactive elements)

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/speaker/ImpactStats.tsx
git commit -m "fix: audit ImpactStats — WCAG, count-up animation & inline styles"
```

---

### Task 4: Audit `OrganizationMarquee`

**Files:**
- Modify: `src/components/speaker/OrganizationMarquee.tsx`
- Reference: `src/index.css` (for marquee animation CSS)

- [ ] **Step 1: Rewrite the component**

Replace the full file content with:

```tsx
import { organizationLogos } from '@/data/speaker'
import CloudinaryImg from '@/components/ui/cloudinary-img'
import FadeInUp from '@/components/common/FadeInUp'

export default function OrganizationMarquee() {
  const duplicatedLogos = [...organizationLogos, ...organizationLogos]

  return (
    <section
      className="px-6 md:px-0 py-12 md:py-16 overflow-hidden"
      aria-labelledby="org-marquee-heading"
    >
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <FadeInUp delay={0.1}>
          <h2
            id="org-marquee-heading"
            className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight mb-8 font-mono font-medium"
          >
            Organizations I've Worked With
          </h2>
        </FadeInUp>

        {/* Animated marquee — visible when motion is allowed */}
        <div className="relative overflow-hidden motion-safe:block motion-reduce:hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {duplicatedLogos.map((logo, index) => {
              const content = (
                <CloudinaryImg
                  publicId={logo.logoUrl}
                  width={128}
                  height={64}
                  alt={logo.name}
                  preview={false}
                  noStyle
                  imgClassName="object-contain"
                />
              )

              if (!logo.websiteUrl) {
                return (
                  <span
                    key={`${logo.name}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale opacity-70"
                  >
                    {content}
                  </span>
                )
              }

              return (
                <a
                  key={`${logo.name}-${index}`}
                  href={logo.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 rounded-md"
                  aria-label={`Visit ${logo.name} (opens in new tab)`}
                >
                  {content}
                </a>
              )
            })}
          </div>
        </div>

        {/* Static grid — visible when reduced motion is preferred */}
        <div className="motion-safe:hidden motion-reduce:grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {organizationLogos.map((logo) => {
            const content = (
              <CloudinaryImg
                publicId={logo.logoUrl}
                width={128}
                height={64}
                alt={logo.name}
                preview={false}
                noStyle
                imgClassName="object-contain"
              />
            )

            if (!logo.websiteUrl) {
              return (
                <span
                  key={logo.name}
                  className="flex items-center justify-center h-16 grayscale opacity-70"
                >
                  {content}
                </span>
              )
            }

            return (
              <a
                key={logo.name}
                href={logo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 rounded-md"
                aria-label={`Visit ${logo.name} (opens in new tab)`}
              >
                {content}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

Changes:
- Inline `style=` removed (heading) → `font-mono font-medium`
- Inline animation → `FadeInUp` on heading
- `aria-labelledby="org-marquee-heading"` on section
- `focus-visible:ring-2` on all logo links
- `aria-label` includes "(opens in new tab)" on `target="_blank"` links
- Logos without `websiteUrl` render as `<span>` instead of `<a>`
- Marquee pauses on hover AND focus-within
- Grayscale transition smoothed to `duration-500`
- `motion-safe:block` / `motion-reduce:hidden` for marquee
- Static grid fallback with `motion-safe:hidden` / `motion-reduce:grid`

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/speaker/OrganizationMarquee.tsx
git commit -m "fix: audit OrganizationMarquee — WCAG, motion-safe & keyboard nav"
```

---

### Task 5: Audit `VoluntaryWorkSection`

**Files:**
- Modify: `src/components/speaker/VoluntaryWorkSection.tsx`

- [ ] **Step 1: Rewrite the component**

Replace the full file content with:

```tsx
import { getVoluntaryWork } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'

export default function VoluntaryWorkSection() {
  const voluntaryWork = getVoluntaryWork()

  if (voluntaryWork.length === 0) {
    return null
  }

  return (
    <section className="px-6 md:px-0 py-12 md:py-16" aria-labelledby="voluntary-work-heading">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <FadeInUp delay={0.1}>
              <h2
                id="voluntary-work-heading"
                className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight font-mono font-medium"
              >
                Voluntary Work & Community Contributions
              </h2>
            </FadeInUp>
            <span className="text-sm text-slate-400 light:text-slate-600 px-3 py-1 rounded-full border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white/75 font-body font-medium">
              {voluntaryWork.length} contribution{voluntaryWork.length !== 1 ? 's' : ''}
            </span>
          </div>
          <FadeInUp delay={0.18}>
            <div className="rounded-3xl border border-slate-800/60 light:border-slate-200/80 bg-slate-900/30 light:bg-white/85 backdrop-blur-sm shadow-[0_20px_80px_rgba(2,6,23,0.45)] light:shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-2 sm:p-4 transition-colors hover:border-slate-700/90 light:hover:border-slate-300">
              <div className="flex flex-col">
                {voluntaryWork.map((item, index) => (
                  <MentorSpeakerItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
```

Changes:
- Inline `style=` removed (3 instances) → Tailwind classes
- Inline CSS animations removed → `FadeInUp` on heading + card container (no outer section wrapper to avoid nested animation)
- `aria-labelledby="voluntary-work-heading"` on section
- `text-slate-500` → `text-slate-400` on count badge
- Card container gets `hover:border-slate-700/90` for subtle hover
- `MentorSpeakerItem` already has FadeInUp + stagger — no changes needed

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/speaker/VoluntaryWorkSection.tsx
git commit -m "fix: audit VoluntaryWorkSection — WCAG, animation & inline styles"
```

---

### Task 6: Audit `MentoringSection`

**Files:**
- Modify: `src/components/speaker/MentoringSection.tsx`

- [ ] **Step 1: Rewrite the component**

Replace the full file content with:

```tsx
import { getMentoringEngagements } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'

export default function MentoringSection() {
  const mentoringEngagements = getMentoringEngagements()

  if (mentoringEngagements.length === 0) {
    return null
  }

  return (
    <section className="px-6 md:px-0 py-12 md:py-16" aria-labelledby="mentoring-heading">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <FadeInUp delay={0.1}>
              <h2
                id="mentoring-heading"
                className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight font-mono font-medium"
              >
                Mentoring Engagements
              </h2>
            </FadeInUp>
            <span className="text-sm text-slate-400 light:text-slate-600 px-3 py-1 rounded-full border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white/75 font-body font-medium">
              {mentoringEngagements.length} program{mentoringEngagements.length !== 1 ? 's' : ''}
            </span>
          </div>
          <FadeInUp delay={0.18}>
            <div className="rounded-3xl border border-slate-800/60 light:border-slate-200/80 bg-slate-900/30 light:bg-white/85 backdrop-blur-sm shadow-[0_20px_80px_rgba(2,6,23,0.45)] light:shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-2 sm:p-4 transition-colors hover:border-slate-700/90 light:hover:border-slate-300">
              <div className="flex flex-col">
                {mentoringEngagements.map((item, index) => (
                  <MentorSpeakerItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
```

Changes: Same pattern as VoluntaryWorkSection — inline styles removed, FadeInUp wrappers, aria-labelledby, contrast fix, hover on card container.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/speaker/MentoringSection.tsx
git commit -m "fix: audit MentoringSection — WCAG, animation & inline styles"
```

---

### Task 7: Audit `SpeakingSection`

**Files:**
- Modify: `src/components/speaker/SpeakingSection.tsx`

- [ ] **Step 1: Rewrite the component**

Replace the full file content with:

```tsx
import { getSpeakerEngagements } from '@/data/mentorSpeaker'
import MentorSpeakerItem from '@/components/homepage/MentorSpeakerItem'
import FadeInUp from '@/components/common/FadeInUp'

export default function SpeakingSection() {
  const speakerEngagements = getSpeakerEngagements()

  if (speakerEngagements.length === 0) {
    return null
  }

  return (
    <section className="px-6 md:px-0 py-12 md:py-16" aria-labelledby="speaking-heading">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <FadeInUp delay={0.1}>
              <h2
                id="speaking-heading"
                className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight font-mono font-medium"
              >
                Speaking & Webinar Engagements
              </h2>
            </FadeInUp>
            <span className="text-sm text-slate-400 light:text-slate-600 px-3 py-1 rounded-full border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white/75 font-body font-medium">
              {speakerEngagements.length} event{speakerEngagements.length !== 1 ? 's' : ''}
            </span>
          </div>
          <FadeInUp delay={0.18}>
            <div className="rounded-3xl border border-slate-800/60 light:border-slate-200/80 bg-slate-900/30 light:bg-white/85 backdrop-blur-sm shadow-[0_20px_80px_rgba(2,6,23,0.45)] light:shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-2 sm:p-4 transition-colors hover:border-slate-700/90 light:hover:border-slate-300">
              <div className="flex flex-col">
                {speakerEngagements.map((item, index) => (
                  <MentorSpeakerItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
```

Changes: Same pattern as VoluntaryWorkSection and MentoringSection.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/speaker/SpeakingSection.tsx
git commit -m "fix: audit SpeakingSection — WCAG, animation & inline styles"
```

---

### Task 8: Audit `Speaker.tsx` Parent Page

**Files:**
- Modify: `src/pages/Speaker.tsx`

- [ ] **Step 1: Rewrite the component**

Replace the full file content with:

```tsx
import SpeakerMentorHero from '@/components/speaker/SpeakerMentorHero'
import ImpactStats from '@/components/speaker/ImpactStats'
import OrganizationMarquee from '@/components/speaker/OrganizationMarquee'
import VoluntaryWorkSection from '@/components/speaker/VoluntaryWorkSection'
import MentoringSection from '@/components/speaker/MentoringSection'
import SpeakingSection from '@/components/speaker/SpeakingSection'
import { Separator } from '@/components/ui/separator'
import FadeInUp from '@/components/common/FadeInUp'

export default function Speaker() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 light:bg-slate-50">
      <div className="bg-pattern-speaker" aria-hidden="true" />
      <div className="mx-auto max-w-7xl sm:px-6 w-full py-20 md:py-16 relative z-10">
        <SpeakerMentorHero />
        <ImpactStats />

        <FadeInUp>
          <Separator className="my-8 bg-slate-800/70 light:bg-slate-200/80" />
        </FadeInUp>

        <OrganizationMarquee />

        <FadeInUp>
          <Separator className="my-8 bg-slate-800/70 light:bg-slate-200/80" />
        </FadeInUp>

        <VoluntaryWorkSection />

        <FadeInUp>
          <Separator className="my-8 bg-slate-800/70 light:bg-slate-200/80" />
        </FadeInUp>

        <MentoringSection />

        <FadeInUp>
          <Separator className="my-8 bg-slate-800/70 light:bg-slate-200/80" />
        </FadeInUp>

        <SpeakingSection />
      </div>
    </div>
  )
}
```

Changes:
- Import `FadeInUp`
- Wrap each `Separator` in `FadeInUp` for scroll-triggered fade-in
- Note: `#main-content` landmark is handled by `Layout.tsx` (already has `<main id="main-content">`)

- [ ] **Step 2: Verify full build**

Run: `npm run build`
Expected: Build succeeds with no errors or warnings

- [ ] **Step 3: Commit**

```bash
git add src/pages/Speaker.tsx
git commit -m "fix: audit Speaker page parent — separator animations"
```

---

### Task 9: Final Verification

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Clean build, no errors

- [ ] **Step 2: Manual browser verification checklist**

Run: `npm run dev`

Verify in browser at `/speaker`:
- [ ] All inline `style=` attributes gone (inspect elements)
- [ ] Hero icon, title, subtitle fade in with stagger
- [ ] Stat numbers count up from 0 when scrolled into view
- [ ] "100+ hours" displays immediately (no count-up)
- [ ] Marquee scrolls smoothly, pauses on hover
- [ ] Tab through marquee links — marquee pauses on focus
- [ ] Enable "Reduce motion" in OS settings — marquee shows static grid, no animations
- [ ] LOGOS org renders as `<span>` (no link), all others as `<a>`
- [ ] All sections have proper aria-labelledby (inspect in DevTools)
- [ ] All icons have aria-hidden="true" (inspect in DevTools)
- [ ] Color contrast on subtitle text is readable (text-slate-400 vs bg)
- [ ] Responsive: test mobile (375px), tablet (768px), desktop (1280px)

- [ ] **Step 3: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: audit speaker page final adjustments"
```
