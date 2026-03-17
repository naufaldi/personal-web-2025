# faldi.xyz — Personal Portfolio

[![Live Site](https://img.shields.io/badge/live-faldi.xyz-blue)](https://faldi.xyz)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)](https://tailwindcss.com)

Personal portfolio website of **Naufaldi Rafif Satriya** — Product Engineer & Mentor with 7+ years of experience building web applications.

## Features

- **MDX Blog** — Write blog posts in MDX with syntax highlighting, GitHub-flavored markdown, and frontmatter support
- **Project Showcase** — Portfolio with detailed project pages rendered from markdown
- **Dark / Light Mode** — System-aware theme with CSS custom properties
- **Responsive Design** — Mobile-first layout built with Tailwind CSS v4
- **Speaking & Mentoring** — Dedicated pages for speaking engagements and mentorship history
- **Book Collection** — Reading list and wishlist tracker
- **Animated UI** — Smooth transitions powered by Framer Motion
- **shadcn/ui Components** — Consistent, accessible UI primitives

## Quick Start

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh)

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
bun run build
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 5 |
| Frontend | React 18, TypeScript 5 |
| Routing | React Router 7 |
| Styling | Tailwind CSS v4, shadcn/ui |
| Content | MDX, react-markdown, remark |
| Animation | Framer Motion |
| Backend | Supabase |
| Icons | Lucide React |

## Project Structure

```
src/
├── components/
│   ├── common/        # Layout, Header, Footer, Navigation
│   ├── sections/      # Hero, ProjectCard, SpeakingCard, etc.
│   └── ui/            # shadcn/ui components
├── pages/             # Route page components
├── data/              # TypeScript data files
├── content/
│   ├── projects/      # Markdown project details
│   ├── blogs/         # MDX blog posts
│   └── shorts/        # Short-form content
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── styles/            # Additional CSS
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — landing page with bio and featured work |
| `/about` | Extended biography and skills |
| `/projects` | Project portfolio |
| `/projects/:slug` | Project detail page |
| `/blogs` | Blog listing |
| `/blogs/:slug` | Blog post |
| `/experience` | Work history |
| `/speaker` | Speaking engagements and mentoring |
| `/shorts` | Short-form content |
| `/book` | Book collection |
| `/manhwa` | Manhwa collection |

## Environment Variables

Create a `.env` file based on the required variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

## Deployment

The site is deployed via **GitHub Actions** with two targets:

- **Netlify** — Static hosting with `netlify.toml` config
- **Docker + VPS** — Containerized deployment to `faldi.xyz` using Caddy reverse proxy and Watchtower for auto-updates

## License

[MIT](./LICENSE) — Naufaldi Rafif Satriya
