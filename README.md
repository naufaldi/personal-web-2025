# Personal Website v5

A modern personal portfolio website built with Vite, React, TypeScript, Tailwind CSS v4, and shadcn/ui.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Bun (https://bun.sh)

### Installation

```bash
bun install
```

### Development Server

```bash
bun run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/          # Layout, Header, Footer, Navigation
│   ├── sections/        # Hero, ProjectCard, SpeakingCard, etc.
│   └── ui/              # shadcn/ui components (button, card, etc.)
├── pages/               # Page components (Home, About, Projects, etc.)
├── data/                # TypeScript data files (projects, experience, speaking, books)
├── content/
│   ├── projects/        # Markdown files for project details
│   └── speaking/        # Markdown files for speaking engagements
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions (cn utility)
├── styles/              # Additional CSS/styles
├── App.tsx              # Main App component with routing
├── main.tsx             # React DOM entry point
└── index.css            # Tailwind CSS v4 configuration
```

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Build Tool** | Vite | ^5.0.0 |
| **Frontend** | React | ^18.3.1 |
| **Language** | TypeScript | ^5.3.3 |
| **Routing** | React Router | ^7.6.2 |
| **Styling** | Tailwind CSS v4 | ^4.0.0 |
| **UI Components** | shadcn/ui | ^0.9.0 |
| **Content** | react-markdown, remark | ^8.0.7, ^14.0.2 |
| **Icons** | lucide-react | - |

## 🎨 Design System

### Colors (Dark Mode Primary)
- **Background**: `#000000` (black)
- **Surface**: `#1a1a1a` (dark slate)
- **Text Primary**: `#ffffff` (white)
- **Text Secondary**: `#a3a3a3` (gray)
- **Accent**: `#3b82f6` (blue)
- **Border**: `#333333` (dark gray)

### Light Mode Support
Full light mode support with CSS custom properties and `prefers-color-scheme` media queries.

### Typography
- **Font Stack**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- **Font Sizes**: xs (0.75rem) to 5xl (3.5rem)
- **Spacing**: xs (4px) to 3xl (64px)

See `src/index.css` for complete design token configuration.

## 📄 Pages & Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Landing page with bio and featured work |
| `/about` | About | Extended biography and skills |
| `/projects` | Projects | Portfolio of all projects |
| `/projects/:slug` | Project Detail | Full project details from markdown |
| `/speaking` | Speaking | Speaking engagements and mentoring |
| `/speaking/:slug` | Speaking Detail | Full engagement details from markdown |
| `/book` | Book | Book collection (reading/wishlist) |
| `*` | 404 | Not found page |

## 🧩 Component Architecture

### Installed shadcn/ui Components
- **Button**: Reusable button component with variants
- **Card**: Container component for content
- **Navigation Menu**: Navigation menu with submenus

### Custom Components (to be built)
- **Layout**: Main layout wrapper with header/footer
- **Header/Navigation**: Site navigation
- **HeroSection**: Landing page hero
- **ProjectCard**: Individual project preview
- **SpeakingCard**: Speaking engagement preview
- **ExperienceCard**: Work/mentorship experience

## 🔧 Configuration Files

### `vite.config.ts`
- Vite configuration with React and Tailwind CSS v4 plugins
- Path alias configuration (`@` → `src/`)

### `tsconfig.json`
- Strict TypeScript configuration
- Path alias resolution
- ES2020 target with DOM libraries

### `src/index.css`
- Tailwind CSS v4 import
- `@theme` block with design system tokens
- CSS custom properties for dark/light modes
- Base styles and animations

### `