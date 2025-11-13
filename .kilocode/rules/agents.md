# Personal Website v5 - Repository Guidelines

## Project Structure & Module Organization

- **Structure**: Single-app portfolio website using React Router + Vite (client-side)
- **src/**: Application code (pages, components, data, content, styles)
- **public/**: Static assets served as-is at the web root
- **dist/**: Generated on build; contains optimized production bundles
- **Config**: `vite.config.ts`, `tsconfig.json`, `components.json`
- **Package Manager**: Bun (fast JavaScript runtime and package manager)

Key files for reference:
- `package.json:1`: Scripts and dependencies (uses Bun)
- `vite.config.ts:1`: Vite + React Router + Tailwind CSS v4 + TS paths
- `tsconfig.json:1`: TypeScript strict config with `@/*` path alias to `src/*`
- `src/index.css:1`: Tailwind CSS v4 with design system tokens via `@theme`
- `src/App.tsx:1`: React Router setup with all routes

## Build, Test, and Development Commands

- `bun run dev`: Start dev server with HMR via Vite
- `bun run build`: TypeScript check + Vite production build
- `bun run preview`: Preview production build locally
- `bun install`: Install dependencies (creates bun.lock)
- `bun add <package>`: Add new dependency
- `bun x <cmd>`: Run CLI tools (equivalent to npx)

Notes:
- Use `bun` exclusively for all commands and installs (bun.lock present)
- Never mix npm, yarn, or pnpm
- Bun is 3-4x faster than npm and drops directly into projects

## Coding Style & Naming Conventions

- **Indentation**: 2 spaces
- **Quotes**: Single or double consistently (Prettier-friendly)
- **Styling**: Tailwind CSS v4 utility-first classes; use `cn` from `src/lib/utils.ts` for class merging
- **UI Components**: shadcn/ui + Radix UI under `src/components/ui/*`
- **Naming**: PascalCase for React components; camelCase for variables/functions; kebab-case for file names
- **Paths**: Always use `@/*` alias for imports from `src/*` (see `tsconfig.json`)
- **Routes**: Place route modules in `src/pages/*` and register in `src/App.tsx`

### Comments Policy

- Avoid comments unless they add clear, essential value
- Do not comment straightforward code or function behavior
- Comment to document inputs/outputs or non-obvious logic; keep comments current
- Follow design.md and rfc.md for reference documentation

## Frontend Development Guidelines

Target stack: React 18, React Router 7, Vite 5, Tailwind CSS v4, Radix UI, shadcn/ui, TypeScript strict, Bun

### Core Principles

- **Reusability**: Build composable, accessible components in `src/components/ui` and reuse throughout
- **Consistency**: Follow shadcn/ui patterns and Tailwind design tokens from `src/index.css`
- **Design System**: Align all components with `docs/design.md` specifications
- **Performance**: Keep components lean; use lazy loading for images; leverage Vite's fast refresh
- **Type Safety**: No `any`. Leverage strict TypeScript and proper prop typing
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, WCAG AA contrast ratios

### Component Architecture & Organization

#### Shared UI Components (`src/components/ui/*`)

- **Purpose**: Reusable, atomic UI elements (Button, Card, Input, Dialog, Select)
- **Composition**: Wrap Radix primitives with cohesive APIs and Tailwind styles
- **Export**: Each component file should export its component(s) and variants
- **Files**:
  - `button.tsx` - Primary button component (design.md aligned)
  - `card.tsx` - Container component for content
  - `navigation-menu.tsx` - Navigation with submenus

Use `cn` for class composition:
```tsx
import { cn } from '@/lib'

const className = cn(
  'base-class',
  condition && 'conditional-class'
)
```

#### Feature & Page Components

- **Page components**: Implement in `src/pages/*.tsx` and register in `src/App.tsx`
- **Layout/Shared**: Common sections (Header, Footer, Layout) in `src/components/common/*`
- **Page based Components**: Reusable page component (Component for each page) in `src/components/[page-name]/*`

#### Forbidden Practices

- Do not duplicate UI primitives; extend shared components instead
- Do not mix multiple styling paradigms (inline styles + Tailwind + CSS modules)
- Do not import from outside `src/*` via relative paths; always use `@/*` alias

### Styling & UI Framework

- **Tailwind CSS v4** is the primary styling system (no Tailwind config file needed)
- **Design tokens** defined in `src/index.css` using `@theme` directive
- **CSS Variables** for colors, spacing, typography automatically available
- **Dark/Light modes** via `prefers-color-scheme` media queries
- Use semantic class groupings and keep classes readable; use CVA for complex variants
- Avoid inline styles except for dynamic computed values Tailwind can't express

### Performance & State Management

- **Client-first**: SPA architecture with client-side routing (no SSR)
- **State**: Prefer local `useState` and lifted state; use context only when justified
- **Data**: Store static data in `src/data/*.ts`; fetch markdown from `src/content/*`
- **Lazy loading**: Use `loading="lazy"` for images; code-split at route boundaries
- **Images**: Optimize with appropriate sizing; use modern formats (WebP/AVIF when possible)

### Content Management

- **Static Data**: TypeScript files in `src/data/` for projects, experience, speaking, books
- **Markdown Content**: Markdown files in `src/content/projects/*` and `src/content/speaking/*`
- **Rendering**: Use `react-markdown` with `remark` for markdown processing

### Routing Conventions

- **Routes**: All routes defined in `src/App.tsx` using React Router v7
- **Pages**: Page components in `src/pages/` with descriptive names (Home, About, Projects, etc.)
- **Nested routes**: Use React Router's nested Route structure for layout management
- **Dynamic routes**: Use `:slug` params for detail pages (e.g., `/projects/:slug`)

### Package Management with Bun

- Use `bun` exclusively for all package operations
- Install: `bun install` locally when modifying dependencies
- Add packages: `bun add <package-name>`
- Run scripts: `bun run <script>`
- Run CLI tools: `bun x <cli-name>`
- Do not use npm, yarn, or pnpm

### TypeScript & Code Quality

- **Strict mode**: Enabled (see `tsconfig.json`)
- **No `any`**: Type all component props and function returns
- **Imports**: Use `@/*` paths exclusively (configured in `tsconfig.json`)
- **Formatting**: Keep code Prettier-friendly; maintain consistent naming

### Asset & Image Handling

- Place static files under `public/`; reference as `/path.ext`
- Use descriptive `alt` text on all images
- Apply `loading="lazy"` and `decoding="async"` for below-the-fold images
- Prefer modern formats (WebP/AVIF) with fallbacks

### Development Workflow

- **Setup**: `bun install` at project root
- **Develop**: `bun run dev` then iterate on pages and components
- **Type Check**: `bun run build` (includes TypeScript check) before commits
- **Build**: `bun run build` creates `dist/` folder with optimized assets
- **Preview**: `bun run preview` tests production build locally

Code organization example:
```tsx
// 1) External imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2) Internal imports
import { projects } from '@/data/projects'

// 3) Component
export default function ProjectsPage() {
  const [filter, setFilter] = useState('')
  
  return (
    <div>
      <Button onClick={() => setFilter('')}>Clear</Button>
      {projects.map(p => <div key={p.id}>{p.title}</div>)}
    </div>
  )
}
```

### Deployment & Build

- Client-side SPA; deploy `dist/` folder to any static host
- Build command runs TypeScript check + Vite optimization
- Env vars: Inject at build or runtime as needed; do not commit secrets
- Recommended: Netlify, Vercel, or any static host with CDN

## Testing Guidelines

- Unit: Co-locate `*.spec.ts(x)` with source when tests are added
- E2E: Use Playwright or Cypress for critical flows (to be added)
- Accessibility: Consider `@axe-core/react` in development
- Run: Provide `bun test` when test runner is added

## Commit & Pull Request Guidelines

- **Style**: Conventional commits (feat, fix, chore, refactor, test, docs)
- **Before pushing**: Ensure clean build (`bun run build` succeeds)
- **PRs**: Clear description, screenshots for UI changes, steps to verify

## Design System Reference

All design decisions follow `docs/design.md`:

- **Colors**: Dark mode (default) + light mode support via CSS variables
- **Typography**: System fonts, 9 font sizes (xs-5xl), semi-bold weights
- **Spacing**: 4px grid system (xs: 4px → 3xl: 64px)
- **Components**: Button, Card, Navigation Menu all follow design specs
- **Accessibility**: WCAG AA contrast, keyboard navigation, focus states

See `docs/design.md` for complete color palette, typography scale, and component specifications.

## Architecture Reference

Project structure follows `docs/rfc.md`:

- **Home** `/` - Landing with hero, bio, experience overview
- **About** `/about` - Extended biography and skills
- **Projects** `/projects` - Portfolio grid with filters
- **Project Detail** `/projects/:slug` - Full project from markdown
- **Speaking** `/speaking` - Speaking engagements and mentoring
- **Speaking Detail** `/speaking/:slug` - Full engagement details
- **Book** `/book` - Book collection (reading/wishlist)

See `docs/rfc.md` for complete architecture, data structures, and page details.

---

## Agent Rules

You are an advanced coding assistant working on this personal website project. Follow these rules:

### General Guidelines

- Be precise and align with AGENTS.md, design.md, rfc.md, and latest requirements
- Match effort to task complexity
- Default to clarity and conciseness

### Instruction Formatting

- Prefer compact, focused changes
- Use Tailwind CSS utilities for styling
- Use existing shadcn/ui and Radix components from `src/components/ui`
- Use `bun run` for all scripts

### Language Style

- Keep language direct, balanced, and naturally thorough
- Prioritize readability and maintainability

### Self-Reflection

- Plan briefly for multi-step work
- Verify against AGENTS.md, design.md, and rfc.md
- Consider correctness, type-safety, accessibility, and DX

### Eagerness Control

- Gather only necessary context
- Group related actions; minimize tool calls
- Make reasonable assumptions and document them in mdc:[TODO](TODO.md)
