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
  profileImageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762848965/portfolio-2025/avatar.jpg',
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
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850360/portfolio-2025/influence/meetup-mas-prim.jpg',
    alt: 'Meetup event at MAS Prim',
  },
  {
    id: '2',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850359/portfolio-2025/influence/date.jpg',
    alt: 'Speaking engagement event',
  },
  {
    id: '3',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850358/portfolio-2025/influence/last-efishery.jpg',
    alt: 'eFishery speaking engagement',
  },
  {
    id: '4',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850313/portfolio-2025/influence/meetup-last.jpg',
    alt: 'Tech meetup event',
  },
  {
    id: '5',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850313/portfolio-2025/influence/workspace.jpg',
    alt: 'Workspace and development environment',
  },
  {
    id: '6',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850312/portfolio-2025/influence/idsw.jpg',
    alt: 'IDSW event participation',
  },
  {
    id: '7',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850312/portfolio-2025/influence/quora_indo.jpg',
    alt: 'Quora Indonesia community event',
  },
  {
    id: '8',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850312/portfolio-2025/influence/techbro-wfc.jpg',
    alt: 'TechBro WFC event',
  },
  {
    id: '10',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849076/portfolio-2025/influence/image-5.jpg',
    alt: 'Community engagement and networking',
  },
  {
    id: '11',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849075/portfolio-2025/influence/image-2.jpg',
    alt: 'Workshop and learning session',
  },
  {
    id: '12',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849074/portfolio-2025/influence/image-1.jpg',
    alt: 'Tech community event',
  },
  {
    id: '13',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849074/portfolio-2025/influence/image-4.jpg',
    alt: 'Speaking and mentorship engagement',
  },
  {
    id: '14',
    imageUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849073/portfolio-2025/influence/image-3.jpg',
    alt: 'Professional development and growth',
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

