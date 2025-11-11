export type EmploymentType = 'full-time' | 'freelance' | 'contract'

export interface WorkExperience {
  id: string
  companyName: string
  role: string
  startDate: string
  endDate: string | 'Present'
  employmentType: EmploymentType
  description: string
  achievements: string[]
  keyAchievementsMarkdown?: string
  techStack: string[]
  logoUrl?: string
  website?: string
}

export const workExperiences: WorkExperience[] = [
  {
    id: '1',
    companyName: 'eFishery',
    role: 'Mid Frontend Engineer',
    startDate: '2022',
    endDate: 'Present',
    employmentType: 'full-time',
    description: 'Developed web-based solutions for data visualization and analysis',
    achievements: [
      'Built scalable dashboard reducing load time by 40%',
      'Led frontend architecture migration to React 18',
      'Collaborated with AI/ML teams on data visualization',
    ],
    keyAchievementsMarkdown: `- Built scalable dashboard reducing load time by **40%**
- Led frontend architecture migration to React 18
- Collaborated with AI/ML teams on data visualization`,
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    website: 'https://efishery.com',
  },
  {
    id: '2',
    companyName: 'Tech Startup',
    role: 'Frontend Engineer',
    startDate: '2021',
    endDate: '2022',
    employmentType: 'full-time',
    description: 'Built and maintained product UIs for SaaS platform',
    achievements: [
      'Developed reusable component library used across 10+ features',
      'Improved page load performance by 30% through code splitting',
      'Mentored junior developers on React best practices',
    ],
    keyAchievementsMarkdown: `- Developed reusable component library used across **10+** features
- Improved page load performance by **30%** through code splitting
- Mentored junior developers on React best practices`,
    techStack: ['React', 'TypeScript', 'Redux', 'Material-UI'],
    website: 'https://example.com',
  },
  {
    id: '3',
    companyName: 'Freelance Client',
    role: 'Frontend Developer',
    startDate: '2020',
    endDate: '2021',
    employmentType: 'freelance',
    description: 'Delivered custom landing pages and web applications',
    achievements: [
      'Created 15+ high-converting landing pages',
      'Achieved 95+ Lighthouse performance scores',
      'Built responsive designs for various industries',
    ],
    keyAchievementsMarkdown: `- Created **15+** high-converting landing pages
- Achieved **95+** Lighthouse performance scores
- Built responsive designs for various industries`,
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: '4',
    companyName: 'Digital Agency',
    role: 'Junior Frontend Developer',
    startDate: '2019',
    endDate: '2020',
    employmentType: 'full-time',
    description: 'Developed client websites and web applications',
    achievements: [
      'Built 20+ client websites from scratch',
      'Collaborated with designers to implement pixel-perfect UIs',
      'Optimized websites for SEO and performance',
    ],
    keyAchievementsMarkdown: `- Built **20+** client websites from scratch
- Collaborated with designers to implement pixel-perfect UIs
- Optimized websites for SEO and performance`,
    techStack: ['React', 'JavaScript', 'CSS', 'WordPress'],
  },
  {
    id: '5',
    companyName: 'Startup Inc',
    role: 'Frontend Developer',
    startDate: '2018',
    endDate: '2019',
    employmentType: 'contract',
    description: 'Developed MVP for early-stage startup',
    achievements: [
      'Built MVP frontend in 3 months',
      'Implemented real-time features using WebSockets',
      'Created responsive mobile-first designs',
    ],
    keyAchievementsMarkdown: `- Built MVP frontend in **3 months**
- Implemented real-time features using WebSockets
- Created responsive mobile-first designs`,
    techStack: ['React', 'JavaScript', 'CSS', 'Socket.io'],
  },
]

export const getLatestExperiences = (limit: number = 4): WorkExperience[] => {
  return workExperiences.slice(0, limit)
}

