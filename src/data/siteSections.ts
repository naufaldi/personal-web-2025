export const siteSections = [
  { id: 'projects', title: 'Projects', href: '/projects' },
  { id: 'blog', title: 'Blog', href: '/blogs' },
  { id: 'community', title: 'Community', href: '/speaker' },
  { id: 'books', title: 'Books', href: '/book' },
  { id: 'manhwa', title: 'Manhwa', href: '/manhwa' },
  { id: 'photography', title: 'Photography', href: '/photography' },
  { id: 'about', title: 'About', href: '/about' },
] as const
export type SiteSection = typeof siteSections[number]
