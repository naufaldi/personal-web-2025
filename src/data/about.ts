export interface AboutBio {
  name: string
  title: string
  bioParagraphs: string[]
  profileImageUrl: string
  signature: string
}

export interface CurrentActivity {
  id: string
  text: string
  emoji?: string
}

export interface TechStackItem {
  name: string
  iconName: string
}

export interface JourneyPhoto {
  id: string
  imageUrl: string
  alt: string
}

export const aboutBio: AboutBio = {
  name: 'Naufaldi Rafif Satriya',
  title: 'Product Engineer & Mentor',
bioParagraphs: [
    'I\'m a product engineer and mentor from Bekasi, Indonesia. I\'ve focused on building meaningful products from designs. I believe that code is a craft and mentorship is how we build a legacy.',
    'My purpose extends beyond coding. I find deep satisfaction in helping others grow, having mentored over 200 individuals and connected with a community of 14,000+ on Twitter. I enjoy hosting workshops and sessions, especially for the "aha" moments that lead to breakthroughs.',
    'Balance is key. I\'m expanding my skills by learning backend development and, most importantly, learning to be a better partner. I believe great engineers are whole people, bringing curiosity and heart to everything they do.',
  ],
  profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  signature: 'Naufaldi',
}

export const currentActivities: CurrentActivity[] = [
  {
    id: '1',
    text: 'Planting seeds of influence, one tweet and post at a time',
    emoji: '🌱',
  },
  {
    id: '2',
    text: 'Crafting impact that ripples through the company',
    emoji: '💫',
  },
  {
    id: '3',
    text: 'Diving deep into backend realms, expanding my horizons',
    emoji: '🚀',
  },
  {
    id: '4',
    text: 'Learning the art of partnership, one day at a time',
    emoji: '💕',
  },
]

export const journeyPhotos: JourneyPhoto[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    alt: 'Team collaboration and mentorship',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    alt: 'Workshop and speaking engagement',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    alt: 'Coding and development journey',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    alt: 'Professional growth and learning',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
    alt: 'Building products and solutions',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
    alt: 'Mentorship and knowledge sharing',
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    alt: 'Community engagement',
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    alt: 'Career milestones',
  },
]

export const techStack: TechStackItem[] = [
  { name: 'React', iconName: 'Code' },
  { name: 'TypeScript', iconName: 'FileCode' },
  { name: 'Next.js', iconName: 'Zap' },
  { name: 'Tailwind CSS', iconName: 'Palette' },
  { name: 'Node.js', iconName: 'Server' },
  { name: 'PostgreSQL', iconName: 'Database' },
]

