# Personal Website - Design System

Inspired by [theodorusclarence.com](https://theodorusclarence.com/) - Modern, minimal, bold, and professional design.

---

## 1. Visual Style & Philosophy

**Style:** Modern, Minimal, Bold, Professional  
**Approach:** Content-first, clean hierarchy, generous whitespace  
**Theme:** Dark mode (primary), Light mode support (secondary)

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

### Dark Mode (Default)

```
Background: #000000 (Black)
Surface: #1a1a1a (Dark Slate)
Text Primary: #ffffff (White)
Text Secondary: #a3a3a3 (Gray)
Border: #333333 (Dark Gray)
Accent: #3b82f6 (Blue)
```

### Light Mode (Alternative)

```
Background: #ffffff (White)
Surface: #f5f5f5 (Light Gray)
Text Primary: #000000 (Black)
Text Secondary: #666666 (Gray)
Border: #e5e5e5 (Light Gray)
Accent: #2563eb (Blue)
```

---

## 3. Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
```

**System Fonts:** Native OS fonts for performance, no web font loading needed

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

**Style:** Minimal, fixed or sticky top  
**Background:** Black with white text  
**Height:** 64px (mobile), 72px (desktop)

```
├── Logo/Branding (left)
├── Navigation Links (center/right)
│   ├── Home
│   ├── About
│   ├── Projects
│   ├── Speaking
│   └── Book
└── Social Links / Theme Toggle (right)
```

**Hover State:** Blue accent color, underline or background change

---

### Hero Section

**Layout:** Full width, centered content  
**Padding:** 80px-120px vertical  
**Background:** Black with subtle gradient or pattern (optional)

**Content:**
- Large H1 heading (56px)
- Subtitle or description (18px, gray)
- CTA buttons (if applicable)

**CTA Buttons:**
- Primary: Blue background, white text, bold
- Secondary: Border only, white text

---

### Project/Speaking Cards

**Layout:** Grid (1-2 columns mobile, 3 columns desktop)  
**Background:** Dark Slate (#1a1a1a)  
**Border:** Subtle border (1px, Dark Gray)  
**Padding:** 24px  
**Border Radius:** 8px  
**Hover State:** Shadow lift, slight scale, border color change

**Content:**
- Thumbnail image (16:9 ratio) - optional
- Title (H5, bold)
- Description (Body small, gray)
- Tags/Meta (Caption, gray)
- Links (Blue accent)

---

### Experience/Mentorship Cards

**Layout:** Vertical list or timeline  
**Background:** Dark Slate (#1a1a1a)  
**Padding:** 24px  
**Border Left:** 4px blue accent (for current/featured)  
**Spacing:** 16px between cards

**Content:**
- Company/Organization (Bold, white)
- Position/Role (Blue accent or highlight)
- Date Range (Gray, small)
- Description (Body text)

---

### Book Card

**Layout:** Grid (2-3 columns mobile, 4+ columns desktop)  
**Content:**
- Book Cover Image (fixed aspect ratio 3:4)
- Title (H6, bold)
- Category Badge (Reading/Wishlist) - Blue or gray
- Links (if applicable)

**Hover State:** Shadow lift, slight zoom

---

### Footer

**Background:** Black or very dark (#0a0a0a)  
**Border Top:** 1px border (#333333)  
**Padding:** 48px-64px vertical

**Content:**
- Copyright text (left)
- Quick links (center)
- Social links (right)
- Newsletter signup (optional)

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

---

## 7. Page Designs

### Home Page

**Sections:**
1. Navigation (header)
2. Hero Section
   - Large greeting/intro
   - Brief bio
   - CTA: "Explore My Work"
3. Mentorship Section
   - Heading: "Mentoring Experience"
   - Grid of mentorship cards (2-3 per row)
   - Each card: Company, Role, Date, Description
4. Work Experience Section
   - Heading: "Work Experience"
   - Timeline or cards
   - Most recent first
5. Social Links / CTA
6. Footer

---

### About Page

**Layout:** Single column, centered, max-width 800px

**Sections:**
1. Page heading
2. Extended bio (multiple paragraphs)
3. Skills section (if applicable)
4. Contact information
5. Social links

---

### Projects Page

**Layout:** Grid of project cards  
**Columns:** 2-3 columns (responsive)

**Features:**
- Search/Filter by tags (optional)
- Featured projects highlighted
- Pagination or infinite scroll (if many projects)

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

---

### Speaking Page

**Layout:** Grid or list view of speaking engagement cards

**Features:**
- Filter by type: Conference, Workshop, Webinar, Mentoring
- Chronological order (recent first)
- Each card shows: Title, Community/Event, Date, Topic

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

**Sections:**
1. Page heading
2. "Currently Reading" section
   - Grid of book cards
3. "Wishlist" section
   - Grid of book cards
4. Optional: Search/Filter by category or genre

---

## 8. Interactive Elements

### Links

**Appearance:**
- Color: Blue accent (#3b82f6)
- Text decoration: Underline (optional)
- Font weight: Medium (500)

**Hover State:**
- Color: Darker blue (#2563eb)
- Underline: Always visible on hover

**Visited State:**
- Color: Blue accent (same as unvisited)

---

### Buttons

**Primary Button:**
- Background: Blue (#3b82f6)
- Text: White, semi-bold (600)
- Padding: 12px 24px
- Border radius: 6px
- Hover: Darker blue (#2563eb), shadow

**Secondary Button:**
- Background: Transparent
- Border: 1px white
- Text: White, semi-bold (600)
- Padding: 12px 24px
- Border radius: 6px
- Hover: Blue border and text, slight background

**Disabled State:**
- Opacity: 50%
- Cursor: Not-allowed

---

### Forms

**Input Fields:**
- Background: Dark slate (#1a1a1a)
- Border: 1px gray (#333333)
- Padding: 12px 16px
- Text color: White
- Focus: Blue border, no shadow

**Labels:**
- Font size: 14px
- Font weight: 600
- Color: White
- Margin bottom: 8px

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

## 12. Dark/Light Mode

**Default:** Dark Mode (always available)  
**Light Mode:** Toggle available (optional enhancement)

**Implementation:**
- CSS custom properties for theme colors
- `prefers-color-scheme` media query as fallback
- Local storage to persist user preference
- No forced light mode, respects system preference

```css
:root {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --border: #333333;
  --accent: #3b82f6;
}

@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #000000;
    --text-secondary: #666666;
    --border: #e5e5e5;
    --accent: #2563eb;
  }
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

Ready to start building! 🚀

