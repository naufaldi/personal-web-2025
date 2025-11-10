export interface PortfolioItem {
  id: string
  title: string
  description: string
  liveUrl?: string
  githubUrl?: string
  techStack: string[]
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'E-commerce Dashboard',
    description: 'Modern e-commerce platform with real-time analytics, inventory management, and seamless checkout experience.',
    liveUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/example/ecommerce',
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
  },
  {
    id: '2',
    title: 'Design System',
    description: 'Comprehensive design system with reusable components, tokens, and documentation for consistent UI development.',
    liveUrl: 'https://example.com/design-system',
    githubUrl: 'https://github.com/example/design-system',
    techStack: ['React', 'TypeScript', 'Storybook'],
  },
  {
    id: '3',
    title: 'Analytics Platform',
    description: 'Data visualization dashboard with interactive charts, real-time metrics, and customizable reporting features.',
    liveUrl: 'https://example.com/analytics',
    githubUrl: 'https://github.com/example/analytics',
    techStack: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: '4',
    title: 'Landing Page',
    description: 'High-converting landing page with smooth animations, responsive design, and optimized performance.',
    liveUrl: 'https://example.com/landing',
    githubUrl: 'https://github.com/example/landing',
    techStack: ['React', 'TypeScript', 'Tailwind'],
  },
]

