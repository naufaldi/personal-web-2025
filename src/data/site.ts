export interface SocialLinks {
  github?: string
  twitter?: string
  linkedin?: string
  email?: string
  instagram?: string
  adplist?: string
}

export interface Stats {
  experience: string
  stack: string
  mentees: string
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
  tagline: 'Product Engineer & Mentor',
  bio: 'Building frontend solutions with 7 years of experience. Mentored 200+ developers and transitioning towards fullstack while sharing knowledge through speaking and mentorship.',
  statusBadge: 'Open to new projects',
  availability: 'Q4 • 2025 availability',
  heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop',
  stats: {
    experience: '7 yrs',
    stack: 'TypeScript',
    mentees: '1000+',
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
    github: 'https://github.com/naufaldi',
    twitter: 'https://twitter.com/f2aldi',
    linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    email: 'mailto:naufaldi.rafif@gmail.com',
    instagram: 'https://instagram.com/rafifsatriya',
    adplist: 'https://adplist.org/mentors/naufaldi-rafif-s',
  },
}

