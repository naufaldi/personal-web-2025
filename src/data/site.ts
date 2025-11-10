export interface SocialLinks {
  github?: string
  twitter?: string
  linkedin?: string
  email?: string
}

export interface Stats {
  experience: string
  stack: string
  leadTime: string
}

export interface SelectedProject {
  title: string
  description: string
  tech: string
}

export interface SiteConfig {
  name: string
  tagline: string
  bio: string
  statusBadge: string
  availability: string
  heroImage?: string
  stats: Stats
  selectedProjects: SelectedProject[]
  socialLinks: SocialLinks
}

export const siteConfig: SiteConfig = {
  name: 'Naufaldi Rafif S.',
  tagline: 'Product Engineer & Mentor | Frontend Developer',
  bio: 'I design and build product UIs with React, TypeScript, and modern tooling—focused on performance, accessibility, and delightful details.',
  statusBadge: 'Open to new projects',
  availability: 'Q4 • 2025 availability',
  heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop',
  stats: {
    experience: '5 yrs',
    stack: 'TS • React',
    leadTime: '~2 weeks',
  },
  selectedProjects: [
    {
      title: 'E-commerce Dashboard',
      description: 'React, Next.js — 20% faster TTI',
      tech: 'React, Next.js',
    },
    {
      title: 'Design System',
      description: 'Tokens, docs, React components',
      tech: 'React, TypeScript',
    },
    {
      title: 'Analytics Platform',
      description: 'TypeScript, charts, a11y-first',
      tech: 'TypeScript, React',
    },
  ],
  socialLinks: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:hello@example.com',
  },
}

