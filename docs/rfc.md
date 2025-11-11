# Personal Website - Architecture & Information Map

## 1. Project Overview

A modern personal website portfolio built with **Vite + React v7** showcasing professional work, projects, experiences, and speaking engagements.

**Key Objectives:**
- Display professional summary and top projects on landing page
- Showcase project portfolio with detailed project pages
- Highlight work experience and professional history
- Feature speaking engagements and mentoring activities

---

## 2. Page Structure & Routes

### 2.1 Pages

| Page | Route | Purpose | Key Elements |
|------|-------|---------|--------------|
| **Home** | `/` | Landing page with summary | Hero section, bio summary, Mentorship list, Work experience list |
| **About** | `/about` | Extended bio & profile | Detailed background, skills, philosophy, contact info |
| **Projects** | `/projects` | All projects listing | Project cards, filters/categories, featured projects highlighted |
| **Project Detail** | `/projects/:slug` | Individual project details | Full project essay (from markdown), tech stack, links, metadata |
| **Speaking** | `/speaking` | Speaking engagements & mentoring list | Cards/list of all engagements with quick info |
| **Speaking Detail** | `/speaking/:slug` | Individual engagement details | Full engagement details (from markdown), topic, docs, github, slides, recording, etc. |
| **Book** | `/book` | Book collection display | Book cover, title, category (reading/wishlist), links |

---

## 3. Directory Structure

```
personal-web-v5/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Layout.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MentorshipSection.tsx
│   │   │   ├── WorkSection.tsx
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── SpeakingCard.tsx
│   │   │   └── BookCard.tsx
│   │   └── mdx/
│   │       ├── MarkdownRenderer.tsx
│   │       └── CodeBlock.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Speaking.tsx
│   │   ├── SpeakingDetail.tsx
│   │   ├── Book.tsx
│   │   └── NotFound.tsx
│   ├── data/
│   │   ├── projects.ts (projects metadata)
│   │   ├── experience.ts (mentorship & work experience)
│   │   ├── speaking.ts (speaking engagements list)
│   │   ├── books.ts (books collection)
│   │   └── site.ts (site config, constants)
│   ├── content/
│   │   ├── projects/
│   │   │   ├── project-1.md
│   │   │   ├── project-2.md
│   │   │   └── project-3.md
│   │   └── speaking/
│   │       ├── speaking-1.md
│   │       ├── speaking-2.md
│   │       └── speaking-3.md
│   ├── hooks/
│   │   ├── useMarkdown.ts
│   │   └── useScrollTo.ts
│   ├── utils/
│   │   ├── markdown.ts
│   │   └── helpers.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── docs/
│   └── rfc.md (this file)
├── public/
│   └── (static assets)
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Data Structure & Schema

### 4.1 Project Data

**File Location:** `src/data/projects.ts`

```typescript
interface ProjectMetadata {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  featured?: boolean;
  order?: number;
  tags: string[];
  image?: string;
  links?: {
    github?: string;
    live?: string;
    website?: string;
  };
  date: string;
}
```

**Markdown:** `src/content/projects/*.md` with frontmatter metadata

### 4.2 Experience Data (Mentorship & Work)

**File Location:** `src/data/experience.ts`

```typescript
interface Mentorship {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  type: 'full-time' | 'part-time' | 'contract';
  startDate: string;
  endDate?: string;
  description?: string;
  technologies?: string[];
}
```

### 4.3 Speaking Engagements Data

**File Location:** `src/data/speaking.ts`

```typescript
interface SpeakingEngagement {
  id: string;
  slug: string;
  type: 'conference' | 'workshop' | 'meetup' | 'webinar' | 'mentoring';
  title: string;
  community: string;
  date: string;
  topic: string;
  image?: string;
  quickDescription?: string;
  links?: {
    slides?: string;
    video?: string;
    recording?: string;
    github?: string;
  };
}
```

**Markdown:** `src/content/speaking/*.md` with frontmatter metadata
- Each engagement as separate markdown file
- Rich content: overview, learnings, resources, documentation

### 4.4 Books Data

**File Location:** `src/data/books.ts`

```typescript
interface Book {
  id: string;
  title: string;
  cover: string; // image URL
  category: 'reading' | 'wishlist';
  links?: {
    amazon?: string;
    goodreads?: string;
    website?: string;
  };
}
```

**Structure:** Static metadata only, no markdown files needed

---

## 5. Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── Navigation
│   ├── Router (Pages)
│   │   ├── Home
│   │   │   ├── HeroSection
│   │   │   ├── MentorshipSection
│   │   │   └── WorkSection
│   │   ├── About
│   │   ├── Projects
│   │   │   └── ProjectCard (multiple)
│   │   ├── ProjectDetail
│   │   │   └── MarkdownRenderer
│   │   ├── Speaking
│   │   │   └── SpeakingCard (multiple)
│   │   ├── SpeakingDetail
│   │   │   └── MarkdownRenderer
│   │   ├── Book
│   │   │   └── BookCard (multiple)
│   │   └── NotFound
│   └── Footer
```

---

## 6. Data Flow & Loading Strategy

### 6.1 Static Content Loading

- Project markdown files: `src/content/projects/*.md`
- Speaking markdown files: `src/content/speaking/*.md` (one per engagement)
- Experience/Speaking data: TypeScript objects in `src/data/`
- Books data: TypeScript objects in `src/data/books.ts`

**Why this approach?**
- No backend required
- All data bundled with app
- Version-controlled content
- Fast performance

### 6.2 Markdown Processing

**Tools:**
- `react-markdown` for markdown rendering
- `remark` plugins for extended features
- `prism.js` for code syntax highlighting

---

## 7. Routing Structure

**Framework:** React Router v7

```typescript
{
  path: '/',
  element: <Layout />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/projects', element: <Projects /> },
    { path: '/projects/:slug', element: <ProjectDetail /> },
    { path: '/speaking', element: <Speaking /> },
    { path: '/speaking/:slug', element: <SpeakingDetail /> },
    { path: '/book', element: <Book /> },
    { path: '*', element: <NotFound /> }
  ]
}
```

---

## 8. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Build Tool** | Vite | Fast build & dev server |
| **Frontend Framework** | React 7 | UI library |
| **Language** | TypeScript | Type safety |
| **Routing** | React Router v7 | Client-side routing |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Animations** | Framer Motion | Viewport-triggered animations |
| **Markdown** | react-markdown + remark | Content rendering |
| **Code Highlighting** | Prism.js | Syntax highlighting |
| **Package Manager** | Bun | Dependency management |

---

## 9. Key Features & User Flows

### 9.1 Homepage Flow
1. User lands on `/`
2. Sees hero section with professional summary
3. Sees Mentorship section (list of mentoring roles)
4. Sees Work section (work experience timeline)
5. Footer with navigation links

### 9.2 Project Flow
1. User navigates to `/projects`
2. Sees all projects in grid/list
3. Featured projects highlighted
4. Clicks project → `/projects/:slug`
5. Reads full project details from markdown

### 9.3 Speaking Flow
1. User navigates to `/speaking`
2. Sees speaking engagements list (cards with quick info)
3. Clicks engagement → `/speaking/:slug`
4. Reads detailed engagement content from markdown
5. Can view slides, recordings, GitHub, docs, etc.

### 9.4 Book Flow
1. User navigates to `/book`
2. Sees all books organized by category (reading/wishlist)
3. Shows book cover, title, links
4. No detail pages needed

---

## 10. Performance Considerations

- Code splitting by route
- Lazy loading of markdown content
- Image optimization (covers, screenshots)
- CSS optimization with Tailwind
- SEO optimization (meta tags, og:tags)

---

## 11. Animation System

**Framework:** Framer Motion

**Animation Pattern:** Fade-in-up with viewport detection

All sections and components use a consistent animation pattern:

- **Component:** `FadeInUp` wrapper component (`src/components/common/FadeInUp.tsx`)
- **Animation:** Fade-in-up (opacity 0→1, translateY 20px→0)
- **Duration:** 800ms
- **Easing:** ease-out
- **Delay:** 120ms (default, customizable per element)
- **Trigger:** Viewport entry (once only - `once: true`)
- **Viewport Margin:** -50px (triggers slightly before element enters viewport)

**Usage:**
```tsx
import FadeInUp from '@/components/common/FadeInUp'

<FadeInUp>
  <section>Content</section>
</FadeInUp>

// With custom delay
<FadeInUp delay={0.2}>
  <div>Delayed content</div>
</FadeInUp>
```

**Implementation Guidelines:**
- Apply to all page sections and major components
- Use cascading delays for child elements (e.g., 120ms, 240ms, 360ms)
- Animations trigger only on first viewport entry
- Maintain consistent timing across the site
- Replace CSS animations with FadeInUp component

**Applied To:**
- All page sections (Hero, Experience, Projects, etc.)
- Individual components (Cards, Lists, etc.)
- Page headers and content blocks
- Child elements for staggered animations

---

## 12. Next Steps

1. ✅ **Architecture Review** (Updated)
2. **Design Discussion** - UI/UX, color scheme, typography
3. **Environment Setup** - Vite + React initialization
4. **Component Implementation** - Build components
5. **Content Integration** - Add markdown & data
6. **Styling & Polish** - Apply design system
7. **Deployment** - Build & deploy

---

## Reference

Based on structure from [faldi.xyz](https://faldi.xyz/) - minimal, clean portfolio structure
