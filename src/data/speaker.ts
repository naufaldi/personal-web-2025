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
  menteesTaught: 200,
  mentoringSessions: 150,
  speakingEngagements: 25,
  speakerTime: '50+ hours',
}

export const organizationLogos: OrganizationLogo[] = [
  {
    name: 'ADPList',
    logoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&h=60&fit=crop&auto=format',
    type: 'mentoring',
    websiteUrl: 'https://adplist.org',
  },
  {
    name: 'Dibimbing',
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&h=60&fit=crop&auto=format',
    type: 'mentoring',
    websiteUrl: 'https://dibimbing.id',
  },
  {
    name: 'RevoU',
    logoUrl: 'https://images.unsplash.com/photo-1522202176988-66270c2a3e84?w=120&h=60&fit=crop&auto=format',
    type: 'mentoring',
    websiteUrl: 'https://revou.co',
  },
  {
    name: 'Ekskul',
    logoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=120&h=60&fit=crop&auto=format',
    type: 'mentoring',
    websiteUrl: 'https://ekskul.id',
  },
  {
    name: 'Hacktiv8',
    logoUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&h=60&fit=crop&auto=format',
    type: 'speaker',
    websiteUrl: 'https://hacktiv8.com',
  },
  {
    name: 'iSwift Bootcamp',
    logoUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&h=60&fit=crop&auto=format',
    type: 'speaker',
    websiteUrl: 'https://iswift.id',
  },
  {
    name: 'Coding.ID',
    logoUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=120&h=60&fit=crop&auto=format',
    type: 'speaker',
    websiteUrl: 'https://coding.id',
  },
  {
    name: 'LOGOS',
    logoUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=120&h=60&fit=crop&auto=format',
    type: 'voluntary',
  },
  {
    name: 'IxDA',
    logoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&h=60&fit=crop&auto=format',
    type: 'voluntary',
    websiteUrl: 'https://ixda.org',
  },
]

