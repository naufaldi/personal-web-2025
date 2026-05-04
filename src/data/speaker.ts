export interface SpeakerMentorStats {
  menteesTaught: number
  mentoringSessions: number
  speakingEngagements: number
  speakerTime?: string
}

export interface OrganizationLogo {
  name: string
  logoUrl: string
  type: 'mentoring' | 'speaker' | 'voluntary'
  websiteUrl?: string
}

export const speakerMentorStats: SpeakerMentorStats = {
  menteesTaught: 1000,
  mentoringSessions: 150,
  speakingEngagements: 27,
  speakerTime: '100+ hours',
}

export const organizationLogos: OrganizationLogo[] = [
  {
    name: 'Codex',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-png/light/codex-color.png',
    type: 'voluntary',
    websiteUrl: 'https://openai.com/codex',
  },
  {
    name: 'Cursor',
    logoUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cursor.com&size=128',
    type: 'voluntary',
    websiteUrl: 'https://cursor.com',
  },
  {
    name: 'MiniMax',
    logoUrl: 'https://dl.svgcdn.com/png/simple-icons/minimax-800.png',
    type: 'voluntary',
    websiteUrl: 'https://www.minimax.io',
  },
  {
    name: 'ADPList',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849006/portfolio-2025/logo/adplist.png',
    type: 'mentoring',
    websiteUrl: 'https://adplist.org',
  },
  {
    name: 'Nest Academy',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849014/portfolio-2025/logo/nest.jpg',
    type: 'mentoring',
    websiteUrl: 'https://nestacademy.id',
  },
  {
    name: 'MOFON',
    logoUrl: 'https://avatars.githubusercontent.com/naufaldi?s=128',
    type: 'mentoring',
    websiteUrl: 'https://mofon.vercel.app',
  },
  {
    name: 'Esteh Creative',
    logoUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://esteh.id&size=128',
    type: 'mentoring',
    websiteUrl: 'https://www.esteh.id',
  },
  {
    name: 'Dibimbing',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762851009/portfolio-2025/logo/dibimbing.webp',
    type: 'mentoring',
    websiteUrl: 'https://dibimbing.id',
  },
  {
    name: 'Bearmentor',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849006/portfolio-2025/logo/bearmentor.jpg',
    type: 'mentoring',
    websiteUrl: 'https://github.com/bearmentor',
  },
  {
    name: 'RevoU',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849016/portfolio-2025/logo/revou.jpg',
    type: 'mentoring',
    websiteUrl: 'https://revou.co',
  },
  {
    name: 'Fast Campus',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762851008/portfolio-2025/logo/fast-campus.jpg',
    type: 'mentoring',
    websiteUrl: 'https://fastcampus.com/en/products/dev_online_fe',
  },
  {
    name: 'Ekskul',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849011/portfolio-2025/logo/ekskul.jpg',
    type: 'mentoring',
    websiteUrl: 'https://ekskul.id',
  },
  {
    name: 'Hacktiv8',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762851007/portfolio-2025/logo/hactiv8.webp',
    type: 'speaker',
    websiteUrl: 'https://hacktiv8.com',
  },
  {
    name: 'iSwift Bootcamp',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762849014/portfolio-2025/logo/iswift.png',
    type: 'speaker',
    websiteUrl: 'https://iswift.id',
  },
  {
    name: 'Coding.ID',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762851006/portfolio-2025/logo/coding-id.png',
    type: 'speaker',
    websiteUrl: 'https://coding.id',
  },
  {
    name: 'LOGOS',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850994/portfolio-2025/logo/logos-id.jpg',
    type: 'voluntary',
  },
  {
    name: 'IxDA',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850996/portfolio-2025/logo/ixda-logo.webp',
    type: 'voluntary',
    websiteUrl: 'https://ixda.org',
  },
  {
    name: 'Stasion Malang',
    logoUrl: 'https://res.cloudinary.com/cynux/image/upload/v1762850995/portfolio-2025/logo/stasion-malang.png',
    type: 'voluntary',
    websiteUrl: 'https://stasion.org/',
  },
]
