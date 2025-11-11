# Personal Website - Design System

Inspired by [theodorusclarence.com](https://theodorusclarence.com/) - Modern, minimal, bold, and professional design.

---

## 1. Visual Style & Philosophy

**Style:** Modern, Minimal, Bold, Professional  
**Approach:** Content-first, clean hierarchy, generous whitespace  
**Theme:** Dark mode ONLY (no light mode support)

**Design Principles:**
- ✅ Content is the hero
- ✅ Minimal visual clutter
- ✅ Strong typography hierarchy
- ✅ Consistent spacing and rhythm
- ✅ Bold accents for call-to-action
- ✅ Professional yet approachable

---

## 2. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Black** | `#000000` | `rgb(0, 0, 0)` | Background, primary text |
| **White** | `#FFFFFF` | `rgb(255, 255, 255)` | Text, cards, foreground |
| **Dark Slate** | `#1a1a1a` | `rgb(26, 26, 26)` | Secondary background, elevation |
| **Light Gray** | `#e5e5e5` | `rgb(229, 229, 229)` | Borders, dividers |

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Blue (Primary Accent)** | `#3b82f6` | `rgb(59, 130, 246)` | Links, hover states, highlights |
| **Blue (Hover)** | `#2563eb` | `rgb(37, 99, 235)` | Hover state, interactive |
| **Blue (Light)** | `#dbeafe` | `rgb(219, 234, 254)` | Light backgrounds, subtle highlights |
| **Gray** | `#737373` | `rgb(115, 115, 115)` | Secondary text, muted content |
| **Gray (Light)** | `#d4d4d8` | `rgb(212, 212, 216)` | Subtle borders, light dividers |

### Slate Color Palette

| Name | HSL | Usage |
|------|-----|-------|
| **Slate 900** | `222.2 47.4% 11.2%` | Primary background, cards |
| **Slate 800** | `217.2 32.6% 17.5%` | Borders, dividers |
| **Slate 700** | `217.2 32.6% 25%` | Muted elements, dots |
| **Slate 400** | `215.4 16.3% 46.9%` | Secondary text, labels |
| **Slate 300** | `215.4 16.3% 56.9%` | Interactive text, buttons |
| **Slate 200** | `215.4 16.3% 70%` | Light text on dark |
| **Slate 100** | `210 40% 96.1%` | Primary button background |

### Dark Mode (Default)

```
Background: #000000 (Black)
Surface: #1a1a1a (Dark Slate)
Text Primary: #ffffff (White)
Text Secondary: #a3a3a3 (Gray)
Border: #333333 (Dark Gray)
Accent: #3b82f6 (Blue)
```

---

## 3. Typography

### Font Stack

**Headings:** Source Code Pro (monospace)
```css
font-family: "Source Code Pro", "Courier New", monospace;
```

**Body:** Manrope (sans-serif)
```css
font-family: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

**System Fonts:** Fallback to native OS fonts for performance

### Font Sizes & Weights

#### Headings

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| **H1** | 3.5rem (56px) | 700 (Bold) | 1.1 | Page titles, hero headlines |
| **H2** | 2.5rem (40px) | 700 (Bold) | 1.2 | Section headings |
| **H3** | 1.875rem (30px) | 700 (Bold) | 1.3 | Subsection headings |
| **H4** | 1.5rem (24px) | 600 (Semi-Bold) | 1.4 | Component headings |
| **H5** | 1.25rem (20px) | 600 (Semi-Bold) | 1.4 | Card titles |
| **H6** | 1rem (16px) | 600 (Semi-Bold) | 1.5 | Small headings |

#### Body Text

| Type | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| **Body Large** | 1.125rem (18px) | 400 (Regular) | 1.6 | Main content paragraphs |
| **Body** | 1rem (16px) | 400 (Regular) | 1.6 | General body text |
| **Body Small** | 0.875rem (14px) | 400 (Regular) | 1.6 | Secondary text, metadata |
| **Caption** | 0.75rem (12px) | 400 (Regular) | 1.5 | Captions, labels |

#### Links & Interactive

| Type | Size | Weight | Usage |
|------|------|--------|-------|
| **Link** | inherit | 500 (Medium) | Inline links, navigation |
| **Button** | 1rem (16px) | 600 (Semi-Bold) | Buttons, CTA |

---

## 4. Spacing System

**Base Unit:** 4px grid system

| Scale | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Tight spacing |
| **sm** | 8px | Small gaps |
| **md** | 16px | Standard spacing |
| **lg** | 24px | Component spacing |
| **xl** | 32px | Section spacing |
| **2xl** | 48px | Large sections |
| **3xl** | 64px | Hero sections, major gaps |

### Padding & Margins

- **Container Padding:** 16px (mobile), 24px (tablet), 32px (desktop)
- **Section Margin:** 48px-64px vertical spacing
- **Component Margin:** 16px-24px internal spacing

---

## 5. Components Design

### Navigation / Header

**Style:** Minimal, fixed or sticky top to keep core actions discoverable  
**Background:** Black with white text  
**Height:** 64px (mobile), 72px (desktop) with `px-6` horizontal padding to honor the spacing scale

```
├── Logo/Branding (left)
├── Navigation Links (center/right)
│   ├── Home
│   ├── About
│   ├── Projects
│   ├── Speaking
│   └── Book
└── Social Links / Theme Toggle (right-aligned)
```

- Limit surface-level choices to these five primary links; fold secondary items into a `NavigationMenu` or drawer to respect Hick's Law.
- Position quick actions (“Contact”, “Add New”) at the far right for Jakob’s Law familiarity.
- Keep link targets finger-friendly by using `py-3 px-4 text-sm font-medium` and `gap-3` spacing around grouped icons.

**Hover/Focus State:** Blue accent color, underline or background change with `focus-visible:ring-2 focus-visible:ring-primary` to reinforce affordance.

---

### Hero Section

**Layout:** Full width, centered content with `max-w-7xl` container  
**Padding:** 64px-96px vertical (`py-16 lg:py-24`)  
**Background:** Black with subtle grid line pattern overlay (`.bg-pattern` - see Background Patterns section)

**Content:**
- Status badge with icon, text, and availability link
- Large H1 heading (32px mobile, 40px desktop) using Source Code Pro font
- Description paragraph (16px mobile, 18px desktop) using Manrope font
- Two CTA buttons (primary "View projects", secondary "Get in touch")
- Code preview card on right side (desktop) with:
  - Title bar with three dots and filename
  - Syntax-highlighted code block
  - Ambient background image with blur and gradient mask
  - Stats strip below showing Experience, Stack, and Lead time

**Code Preview Card Pattern:**
- Background: Slate 900/70 with backdrop blur
- Border: Slate 800/70
- Shadow: Multi-layer shadow for depth
- Title bar: Three dots (Slate 700) and filename (Slate 400)
- Code block: Syntax highlighting with Sky, Emerald, Amber, Rose colors
- Stats cards: Grid of 3 cards with icons, labels, and values
- Hover states: Border color transitions on stats cards

**CTA Buttons:**
- Primary: Slate 100 background, Slate 900 text (white button style)
- Secondary: Slate 900/60 background, Slate 800/70 border, Slate 300 text
- Highlight the primary CTA with supporting microcopy to leverage the Goal-Gradient and Zeigarnik effects.

---

### Background Patterns

Each page features a unique, subtle SVG background pattern to add visual texture without distracting from content. All patterns follow the Aesthetic-Usability Effect principle—subtle enough to enhance perceived quality without overwhelming the user.

**Design Principles:**
- Opacity: 0.08-0.12 (subtle, non-distracting)
- Color: Slate 500 (#64758b) for consistency
- Stroke width: 0.5px for delicate appearance
- Position: Absolute, full viewport coverage with `pointer-events: none`
- Base layers: All patterns include radial gradient and linear gradient overlays for depth

**Pattern Assignments:**

| Page | Pattern Class | Pattern Type | Description |
|------|--------------|--------------|-------------|
| **Home** | `.bg-pattern` | Grid Lines | Subtle horizontal and vertical grid lines (24px spacing, opacity 0.10) |
| **About** | `.bg-pattern-about` | Circuit Board | Technical circuit board pattern with grid overlay (40px spacing, opacity 0.12). Grid lines fade out after 40% from top. |
| **Books** | `.bg-pattern-books` | Dot Grid | Small circular dots arranged in a grid (24px spacing, r=1px, opacity 0.12) |
| **Blogs** | `.bg-pattern-blogs` | Writing Lines | Horizontal writing lines pattern (80px spacing, opacity 0.10) |
| **Shorts** | `.bg-pattern-shorts` | Noise Texture | Fractal noise texture using SVG filters (100px spacing, opacity 0.08) |
| **Speaker** | `.bg-pattern-speaker` | Diagonal Lines | Diagonal stripe pattern at 45-degree angle (30px spacing, opacity 0.12) |
| **Experience** | `.bg-pattern-experience` | Timeline/Flow | Connected nodes and flow lines representing timeline (60px spacing, opacity 0.12) |
| **Manhwa** | `.bg-pattern-manhwa` | Hexagon Grid | Hexagonal grid pattern (60px spacing, opacity 0.15) |
| **Projects** | Custom SVG | Grid Lines | Custom inline SVG with vertical and horizontal grid lines (not using pattern class) |

**Implementation:**
```css
/* Example: Subtle pattern with base layers */
.bg-pattern-[name] {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image: 
    url("data:image/svg+xml,..."), /* SVG pattern */
    radial-gradient(1000px 500px at 80% -20%, rgba(148, 163, 184, 0.08), transparent 60%),
    linear-gradient(to bottom, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.2) 60%, rgba(2, 6, 23, 0.6) 100%);
  background-size: [pattern-size], 100% 100%, 100% 100%;
  background-position: center;
}
```

**Usage in Pages:**
```tsx
<div className="min-h-screen flex flex-col relative">
  <div className="bg-pattern-[name]" aria-hidden="true" />
  <div className="mx-auto max-w-7xl px-6 w-full py-12 md:py-16 relative z-10">
    {/* Page content */}
  </div>
</div>
```

**Accessibility:**
- All pattern divs include `aria-hidden="true"` to prevent screen reader announcement
- Patterns use `pointer-events: none` to ensure they don't interfere with interactions
- Content containers use `relative z-10` to ensure content appears above patterns

---

### Project/Speaking Cards

**Layout:** Grid (1-2 columns mobile, 3 columns desktop) with `gap-6 md:gap-8` to group content  
**Background:** Dark Slate (#1a1a1a)  
**Border:** Subtle border (1px, Dark Gray)  
**Padding:** 24px (`p-6`)  
**Border Radius:** 8px (`rounded-lg`)  
**Hover State:** Shadow lift, slight scale, border color change (`hover:shadow-lg/10 hover:border-primary/60`)

**Content:**
- Thumbnail image (16:9 ratio) - optional
- Title (H5, bold)
- Description (Body small, gray)
- Tags/Meta (Caption, gray)
- Links (Blue accent)
- Keep iconography consistent (`size-4 text-muted-foreground`) and align text baselines to satisfy the Law of Similarity.
- Apply `space-y-4` inside the card to cluster related elements and maintain clear proximity cues.

---

### Experience/Mentorship Cards

**Layout:** Vertical list or timeline with `space-y-5`  
**Background:** Dark Slate (#1a1a1a)  
**Padding:** 24px (`p-6`)  
**Border Left:** 4px blue accent (for current/featured)  
**Spacing:** 16px between cards (`gap-4`)

**Content:**
- Company/Organization (Bold, white)
- Position/Role (Blue accent or highlight)
- Date Range (Gray, small)
- Description (Body text)
- Surface ongoing roles with a “Current” badge to keep progress visible and leverage the Zeigarnik Effect.

---

### Book Card

**Layout:** Grid (2-3 columns mobile, 4+ columns desktop) with `gap-4 sm:gap-6`  
**Content:**
- Book Cover Image (fixed aspect ratio 3:4)
- Title (H6, bold)
- Category Badge (Reading/Wishlist) - Blue or gray
- Links (if applicable)

**Hover State:** Shadow lift, slight zoom; keep interactive areas `min-h-[60px]` to satisfy Fitts's Law.

---

### Footer

**Background:** Black or very dark (#0a0a0a)  
**Border Top:** 1px border (#333333)  
**Padding:** 48px-64px vertical (`py-12 md:py-16`) with `space-y-6`

**Content:**
- Copyright text (left)
- Quick links (center)
- Social links (right)
- Newsletter signup (optional)
- Group related links into columns and cap each list at 5-7 items to align with Miller’s Law.

---

## 6. Layout & Grid

### Container Width

| Breakpoint | Width | Purpose |
|------------|-------|---------|
| **Mobile** | 100% (with 16px padding) | <768px |
| **Tablet** | 728px | 768px-1024px |
| **Desktop** | 960px | 1024px-1280px |
| **Large** | 1200px | 1280px+ |

### Breakpoints (Tailwind CSS)

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

- Use `max-w-3xl` to `max-w-6xl` containers depending on section density so content stays scannable and chunked.
- When layouts exceed seven parallel elements (cards, list items), introduce pagination, carousels, or collapsible groups to respect Hick’s and Miller’s Laws.

---

## 7. Page Designs

### Home Page

**Sections:**
1. Navigation (header)
2. Hero Section
   - Large greeting/intro
   - Brief bio
   - CTA: "Explore My Work"
   - Highlight the primary CTA with supporting copy to reinforce the Goal-Gradient Effect.
3. Mentorship Section
   - Heading: "Mentoring Experience"
   - Grid of mentorship cards (2-3 per row)
   - Each card: Company, Role, Date, Description
   - Group cards into `grid md:grid-cols-2` chunks so readers can parse experience quickly.
4. Work Experience Section
   - Heading: "Work Experience"
   - Timeline or cards
   - Most recent first
   - Surface “Current” roles with badges and keep no more than six entries visible; tuck archives behind “View all” to respect Miller’s Law.
5. Social Links / CTA
6. Footer

---

### About Page

**Layout:** Single column, centered, max-width 800px  
**Background Pattern:** Circuit Board pattern (`.bg-pattern-about`)

**Sections:**
1. Page heading
2. Extended bio (multiple paragraphs)
3. Skills section (if applicable)
4. Contact information
5. Social links
- Chunk long biographies into subsections with `space-y-6` and use accordions for optional deep dives.

---

### Projects Page

**Layout:** Grid of project cards  
**Columns:** 2-3 columns (responsive)  
**Background Pattern:** Custom inline SVG grid pattern (not using pattern class)

**Features:**
- Primary filters limited to category and tech; move advanced filters into an accordion to satisfy Hick's Law.
- Search input with inline clear button; debounce to keep perceived performance under the Doherty threshold.
- Featured projects highlighted
- Pagination or "Load more" after 6-9 cards to prevent cognitive overload.

---

### Project Detail Page

**Layout:** Single column, max-width 900px

**Sections:**
1. Breadcrumb or back button
2. Project title (H1)
3. Project metadata: date, tags, tech stack
4. Featured image
5. Markdown content
6. Links: GitHub, Live Demo, Website
7. Related projects (if applicable)
8. Back to projects CTA
- Use consistent content blocks (`space-y-8`) and anchor links for longer articles to keep information chunked.

---

### Speaking Page

**Layout:** Grid or list view of speaking engagement cards  
**Background Pattern:** Diagonal Lines pattern (`.bg-pattern-speaker`)

**Features:**
- Filter by type: Conference, Workshop, Webinar, Mentoring using segmented controls (`space-x-2 min-w-[44px]` buttons).
- Chronological order (recent first)
- Each card shows: Title, Community/Event, Date, Topic
- Surface upcoming events first and provide progress tags ("Upcoming", "Completed") to align with the Zeigarnik Effect.

---

### Speaking Detail Page

**Layout:** Single column, max-width 900px

**Sections:**
1. Breadcrumb or back button
2. Engagement title (H1)
3. Metadata: Community, Date, Topic, Type
4. Markdown content (rich content about the engagement)
5. Links: Slides, Recording, GitHub, Event Page
6. Related engagements (if applicable)
7. Back to speaking CTA

---

### Book Page

**Layout:** Grid of book cards, organized by category  
**Background Pattern:** Dot Grid pattern (`.bg-pattern-books`)

**Sections:**
1. Page heading
2. "Currently Reading" section
   - Grid of book cards
3. "Wishlist" section
   - Grid of book cards
4. Optional: Search/Filter by category or genre
- Group books into manageable categories and offer collapsible sections for extensive collections.
- Provide consistent badge styling (`variant="outline"`) across categories for the Law of Similarity.

---

### Blogs Page

**Layout:** Grid or list view of blog post cards  
**Background Pattern:** Writing Lines pattern (`.bg-pattern-blogs`)

**Features:**
- Category filters: All, My journey, Idea, Technical writer, Opinions
- Filter buttons with active state styling
- Blog cards showing title, excerpt, date, and category
- Empty state message when no blogs match filters
- Chronological order (recent first)

---

### Shorts Page

**Layout:** Grid of short content cards with sidebar filter  
**Background Pattern:** Noise Texture pattern (`.bg-pattern-shorts`)

**Features:**
- Two-column layout: main content (left) and sticky filter sidebar (right)
- Tag-based filtering with toggle buttons
- Search input for title, tags, and content
- Clear filters button
- Empty state message when no shorts match filters
- Grid layout: 1 column (mobile), 2 columns (desktop)

---

### Experience Page

**Layout:** Single column, centered content  
**Background Pattern:** Timeline/Flow pattern (`.bg-pattern-experience`)

**Sections:**
1. Page heading
2. Work experience timeline or cards
3. Education (if applicable)
4. Skills and technologies
- Most recent experience first
- Surface "Current" roles with badges

---

### Manhwa Page

**Layout:** Grid of manhwa cards, organized by category  
**Background Pattern:** Hexagon Grid pattern (`.bg-pattern-manhwa`)

**Sections:**
1. Page heading
2. "Currently Reading" section
   - Grid of manhwa cards
3. "Recommended" section
   - Grid of manhwa cards
4. "Wishlist" section
   - Grid of manhwa cards
- Similar structure to Books page but for manhwa content
- Consistent card styling with Books page

---

## 8. Interactive Elements

### Links

**Appearance:**
- Color: Blue accent (#3b82f6)
- Text decoration: Underline (optional) with `underline-offset-4`
- Font weight: Medium (500)
- Minimum touch target: `inline-flex` with `py-2 px-2` to maintain accessible hit areas

**Hover State:**
- Color: Darker blue (#2563eb)
- Underline: Always visible on hover
- Provide `focus-visible:ring-2 focus-visible:ring-primary` for keyboard users.

**Visited State:**
- Color: Blue accent (same as unvisited)

---

### Buttons

**Primary Button (Hero/CTA):**
- Background: Slate 100 (#f1f5f9) - white/light background
- Text: Slate 900 (dark text), semi-bold (600)
- Size: `h-10 min-w-[44px] px-4 py-2` to satisfy Fitts's Law
- Border radius: 6px (rounded-md)
- Hover: White background, focus ring with slate-100/40
- Usage: Primary CTAs like "View projects", "Download CV"

**Secondary Button:**
- Background: Slate 900/60 (semi-transparent dark)
- Border: 1px Slate 800/70
- Text: Slate 300, semi-bold (600)
- Size: `h-10 min-w-[44px] px-4 py-2`
- Border radius: 6px (rounded-md)
- Hover: Slate 100 text, Slate 700/70 border, Slate 900/90 background
- Focus ring: Indigo 400/30
- Usage: Secondary actions like "Contact", "Get in touch"

**Default Button (Legacy):**
- Background: Blue (#3b82f6)
- Text: White, semi-bold (600)
- Size: `h-10 min-w-[44px] px-5`
- Border radius: 6px (rounded-md)
- Hover: Darker blue (#2563eb), shadow
- Include subtle progress labels ("Saving…") inline when actions support the Zeigarnik Effect.

**Disabled State:**
- Opacity: 50%
- Cursor: Not-allowed
- Keep disabled buttons tabbable only when necessary; otherwise apply `aria-disabled` and remove `pointer-events`.

---

### Forms

**Input Fields:**
- Background: Dark slate (#1a1a1a)
- Border: 1px gray (#333333)
- Padding: 12px 16px
- Text color: White
- Border radius: 6px (rounded-md)
- Focus: Blue border, no shadow
- Apply `space-y-6` within forms to group related fields per the Law of Proximity.
- For multi-step forms, surface progress indicators (`Progress`, “Step X of Y”) and optimistic feedback (“Draft saved”) to leverage Goal-Gradient and Zeigarnik effects.

**Labels:**
- Font size: 14px
- Font weight: 600
- Color: White
- Margin bottom: 8px
- Keep each fieldset under seven items; move advanced options into accordions to satisfy Hick’s and Miller’s Laws.

---

## 9. Animations & Transitions

**Default Duration:** 200ms  
**Easing:** `ease-in-out`

### Effects

| Effect | Duration | Easing | Usage |
|--------|----------|--------|-------|
| Hover effects | 200ms | ease-in-out | Links, buttons, cards |
| Page transitions | 300ms | ease-out | Route changes |
| Fade in | 400ms | ease-out | Content load |
| Slide up | 500ms | ease-out | Hero elements |

---

## 10. SEO & Meta

### Meta Tags

- **Title:** `[Page Name] - [Your Name]`
- **Description:** Page-specific descriptions (50-160 characters)
- **OG Image:** 1200x630px images for social sharing
- **OG Type:** website

### Favicon

- Multiple sizes: 16x16, 32x32, 192x192, 512x512
- Format: PNG or SVG

---

## 11. Responsive Design

### Mobile-First Approach

- Base styles for mobile (<640px)
- Progressive enhancement with media queries
- Touch-friendly tap targets (44px minimum)

### Breakpoint Strategy

```
Mobile:  <640px (sm)
Tablet:  640px-1024px (md, lg)
Desktop: 1024px+ (xl, 2xl)
```

### Responsive Adjustments

- **Padding:** 16px (mobile) → 32px (desktop)
- **Font sizes:** Slightly smaller on mobile
- **Grid columns:** 1-2 (mobile) → 2-3 (tablet) → 3-4 (desktop)
- **Hero height:** 60vh (mobile) → 80vh (desktop)

---

## 12. Dark Mode Only

**Theme:** Dark Mode ONLY  
**No Light Mode:** This project does not support light mode  
**No Theme Toggle:** No theme switching functionality needed

**Implementation:**
- CSS custom properties for dark theme colors only
- No `prefers-color-scheme` media queries
- No theme toggle components
- Consistent dark mode experience across all devices

```css
:root {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --border: #333333;
  --accent: #3b82f6;
}
```

---

## 13. Accessibility

### Color Contrast

- Text on background: WCAG AA minimum 4.5:1 contrast
- Large text: 3:1 minimum
- All text meets or exceeds AA standards

### Focus States

- Visible focus ring: 2px blue border
- Focus visible on all interactive elements
- Keyboard navigation fully supported

### Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3, etc.)
- Form labels associated with inputs
- Alt text for all images
- ARIA labels where needed

### Motion

- Respect `prefers-reduced-motion`
- Disable animations for users preferring reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 14. Design Tokens

### Tailwind CSS Configuration

```javascript
export default {
  theme: {
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      slate: {
        900: '#1a1a1a',
        700: '#333333',
        400: '#737373',
        200: '#a3a3a3',
      },
      gray: {
        500: '#737373',
        300: '#d4d4d8',
        100: '#e5e5e5',
      },
      blue: {
        600: '#2563eb',
        500: '#3b82f6',
        100: '#dbeafe',
      },
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],
      sm: ['0.875rem', { lineHeight: '1.6' }],
      base: ['1rem', { lineHeight: '1.6' }],
      lg: ['1.125rem', { lineHeight: '1.6' }],
      xl: ['1.25rem', { lineHeight: '1.4' }],
      '2xl': ['1.5rem', { lineHeight: '1.4' }],
      '3xl': ['1.875rem', { lineHeight: '1.3' }],
      '4xl': ['2.5rem', { lineHeight: '1.2' }],
      '5xl': ['3.5rem', { lineHeight: '1.1' }],
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    },
  },
}
```

---

## 15. Reference

**Inspiration:** [theodorusclarence.com](https://theodorusclarence.com/)
- Modern, minimal design
- Strong typography hierarchy
- Dark mode as primary theme
- Professional and approachable
- Content-first approach

**Design Philosophy:** Clean, bold, professional portfolio showcasing work and expertise

---

## 16. Project Setup with shadcn/ui + Tailwind CSS v4

### Prerequisites
- Node.js 18+
- npm or pnpm

### Step 1: Create Vite + React Project

```bash
npm create vite@latest personal-web-v5 -- --template react
cd personal-web-v5
npm install
```

### Step 2: Install Tailwind CSS v4 & Vite Plugin

```bash
npm install tailwindcss @tailwindcss/vite
```

### Step 3: Update vite.config.ts

```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Step 4: Configure src/index.css

Replace content of `src/index.css`:

```css
@import "tailwindcss";
```

### Step 5: Install shadcn/ui CLI

```bash
npm install -D shadcn-ui
```

### Step 6: Initialize shadcn/ui

```bash
npx shadcn-ui@latest init
```

When prompted, provide the following answers:

```
✔ Would you like to use TypeScript (recommended)? › Yes
✔ Which style would you like to use? › Default
✔ Which color would you like as base color? › Slate
✔ Where is your global CSS file? › src/index.css
✔ Would you like to configure path aliases? › Yes
✔ Which path alias would you like configured? › @/
✔ How would you like to configure CSS variables? › Use CSS Variables
```

This creates `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@/lib/utils"
  },
  "iconLibrary": "lucide"
}
```

### Step 7: Install React Router v7

```bash
npm install react-router
```

### Step 8: Customize shadcn/ui Colors for Design System

Update your CSS variables in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  /* Dark Mode Colors (Default) */
  --color-background: 0 0% 0%; /* #000000 */
  --color-foreground: 0 0% 100%; /* #ffffff */
  --color-card: 0 0% 10.4%; /* #1a1a1a */
  --color-card-foreground: 0 0% 100%; /* #ffffff */
  --color-primary: 217.2 91.2% 59.8%; /* #3b82f6 */
  --color-primary-foreground: 0 0% 100%; /* #ffffff */
  --color-secondary: 0 0% 10.4%; /* #1a1a1a */
  --color-secondary-foreground: 0 0% 100%; /* #ffffff */
  --color-destructive: 0 84.2% 60.2%; /* #ff5555 */
  --color-destructive-foreground: 0 0% 100%; /* #ffffff */
  --color-muted: 0 0% 45.1%; /* #737373 */
  --color-muted-foreground: 0 0% 100%; /* #ffffff */
  --color-accent: 217.2 91.2% 59.8%; /* #3b82f6 */
  --color-accent-foreground: 0 0% 100%; /* #ffffff */
  --color-border: 0 0% 20%; /* #333333 */
  --color-input: 0 0% 20%; /* #333333 */
  --color-ring: 217.2 91.2% 59.8%; /* #3b82f6 */
}

@supports (color: oklch(0 0 0)) {
  @theme {
    /* Optional: Use OKLch for better color perception */
    --color-background: oklch(0 0 0);
    --color-foreground: oklch(1 0 0);
    --color-card: oklch(0.104 0 0);
    --color-primary: oklch(0.598 0.254 217.2);
  }
}

/* Light Mode Override */
@media (prefers-color-scheme: light) {
  @theme {
    --color-background: 0 0% 100%; /* #ffffff */
    --color-foreground: 0 0% 0%; /* #000000 */
    --color-card: 0 0% 96.1%; /* #f5f5f5 */
    --color-card-foreground: 0 0% 0%; /* #000000 */
    --color-primary: 217.2 91.2% 59.8%; /* #3b82f6 */
    --color-primary-foreground: 0 0% 100%; /* #ffffff */
    --color-muted: 0 0% 40%; /* #666666 */
    --color-muted-foreground: 0 0% 0%; /* #000000 */
    --color-border: 0 0% 90.2%; /* #e5e5e5 */
    --color-input: 0 0% 90.2%; /* #e5e5e5 */
  }
}
```

### Step 9: Add Common Components

Install essential components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add navigation-menu
```

### Step 10: Create Project Structure

```bash
mkdir -p src/{components,pages,data,content/{projects,speaking},hooks,utils,styles}
```

### Step 11: Create Entry Point

`src/main.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Step 12: Create App Component with Routing

`src/App.tsx`:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Speaking from './pages/Speaking'
import SpeakingDetail from './pages/SpeakingDetail'
import Book from './pages/Book'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/speaking/:slug" element={<SpeakingDetail />} />
          <Route path="/book" element={<Book />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### Step 13: Create Utilities

`src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
```

Install dependencies:

```bash
npm install clsx tailwind-merge
```

### Step 14: Install Additional Libraries

For markdown support:

```bash
npm install react-markdown remark prism-react-renderer
```

For meta tags:

```bash
npm install react-helmet-async
```

### Step 15: Customize Component Styling

All shadcn/ui components use CSS variables, automatically themed with your color scheme. Components will automatically match the dark mode color palette defined in step 8.

To customize a specific component after adding it, edit the component file (e.g., `src/components/ui/button.tsx`) and modify the className to match your design specifications.

Example customization for button component:

```typescript
// In src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Add more variants as needed
      },
      size: {
        default: "h-10 px-4 py-2",
        // Add more sizes as needed
      },
    },
  }
)
```

### Step 16: Development Server

Start development:

```bash
npm run dev
```

Your app will be available at `http://localhost:5173`

---

## 17. Customization Tips

### 1. Adding Custom Colors

Edit `components.json` and update the CSS variables in `src/index.css`:

```json
{
  "tailwind": {
    "baseColor": "black"
  }
}
```

Then update in `src/index.css`:

```css
@theme {
  --color-custom: 0 0% 50%; /* Custom color value */
}
```

### 2. Overriding Component Styles

After adding a component with `npx shadcn-ui@latest add <component>`, edit the file in `src/components/ui/<component>.tsx` to customize styling.

### 3. Creating Themed Components

Create custom components in `src/components/` that wrap shadcn/ui components and apply design-specific styling:

```typescript
// src/components/sections/ProjectCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  className?: string
}

export const ProjectCard = ({ title, description, className }: ProjectCardProps) => (
  <Card className={cn("border-border hover:shadow-lg transition-shadow", className)}>
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)
```

---

## 18. Final Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Layout.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SpeakingCard.tsx
│   │   └── ExperienceCard.tsx
│   └── ui/ (shadcn/ui components)
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── Speaking.tsx
│   ├── SpeakingDetail.tsx
│   ├── Book.tsx
│   └── NotFound.tsx
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   ├── speaking.ts
│   ├── books.ts
│   └── site.ts
├── content/
│   ├── projects/ (markdown files)
│   └── speaking/ (markdown files)
├── hooks/
│   ├── useMarkdown.ts
│   └── useScrollTo.ts
├── lib/
│   └── utils.ts
├── styles/ (custom CSS if needed)
├── App.tsx
├── main.tsx
└── index.css
```

---

## 19. UX Heuristics & Interaction Patterns

### Aesthetic-Usability Effect
- Maintain generous spacing using the 4px scale (`gap-6`, `px-6`, `py-10`) so layouts feel polished while staying readable.
- Reinforce the typography hierarchy defined in Section 3 with consistent heading weights and supporting copy (`text-muted-foreground`) for scannability.
- Pair key interactions with subtle depth cues (`shadow-lg/5`, `border-border/60`) to improve perceived affordance without adding clutter.

### Hick's Law
- Keep surface-level choices minimal: limit navigation to core routes and collapse secondary filters into popovers, accordions, or tabs.
- For project and speaking filters, group related controls and hide advanced options behind `Accordion` or `Collapsible` components to avoid overwhelming the user.

### Jakob’s Law
- Reuse familiar portfolio conventions: top navigation, hero CTA on the left, card-based lists, and persistent contact actions in the footer.
- When presenting list management tools (e.g., CMS-like admin or editable tables), mirror WordPress patterns by placing “Add New” on the top-right and status toggles inline with row titles.

### Fitts’s Law
- Size primary buttons at least `h-10 px-4` and ensure touch targets have `min-w-[44px]` when icon-only to stay finger-friendly.
- Provide comfortable spacing (`space-x-3`) around grouped actions like card CTAs so the intended target is easy to hit.

### Law of Proximity
- Use the spacing scale (`space-y-6`, `gap-8`) to cluster related content inside cards and sections, separating unrelated blocks with `md:py-16`.
- Employ `Card`, `Panel`, or bordered containers to visually bundle controls such as filter sets or form fields.

### Zeigarnik Effect
- Surface current progress for multi-step tasks with steppers (`Breadcrumb`, `Progress`) and display state banners (“Saving…”, “Draft saved”) during content edits.
- On long forms, keep incomplete sections visible with subtle reminders (`text-muted-foreground`) so users can resume quickly.

### Goal-Gradient Effect
- Highlight the next action in any flow using the primary button style and supportive microcopy (“Next: Submit Request”) directly beneath progress indicators.
- For multi-step journeys, show progress percentages or step counts near the CTA to encourage completion momentum.

### Law of Similarity
- Standardize component styling—buttons, badges, toggle switches—via shared variants (`variant="outline"`, `variant="secondary"`) to reinforce rhythm.
- Align icon sizes (`size-5`, `size-4`) and typography (`text-sm`, `text-xs`) across cards, tables, and lists so related items read as a cohesive set.

### Miller’s Law
- Chunk information into digestible groups of five to seven items per section, using tabs or accordions to tuck away auxiliary content.
- Break dense project details into titled sub-sections with `space-y-4` spacing to prevent cognitive overload.

### Doherty Threshold
- Target sub-400ms feedback: render optimistic UI states, display loading skeletons (`animate-pulse`, `bg-muted/50`), or spinner fallbacks during data fetches.
- Defer heavy imagery with `loading="lazy"` and keep transitions (`duration-200`) snappy to sustain perceived responsiveness.

Ready to start building! 🚀
