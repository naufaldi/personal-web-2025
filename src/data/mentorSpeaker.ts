export interface MentorSpeakerLinks {
  x?: string
  linkedin?: string
  website?: string
  youtube?: string
}

export interface MentorSpeakerItem {
  id: string
  eventName: string
  brief: string
  date: string
  type: 'mentoring' | 'speaker'
  image?: string
  links?: MentorSpeakerLinks
}

export const mentorSpeakerEngagements: MentorSpeakerItem[] = [
  {
    id: '1',
    eventName: 'React Conf 2024',
    brief: 'Delivered a keynote on "Building Scalable Design Systems with React and TypeScript" to 500+ developers.',
    date: 'March 15, 2024',
    type: 'speaker',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    links: {
      x: 'https://twitter.com/example/react-conf',
      linkedin: 'https://linkedin.com/posts/react-conf',
      website: 'https://reactconf.com',
    },
  },
  {
    id: '2',
    eventName: 'Frontend Masters Workshop',
    brief: 'Conducted a 3-day intensive workshop on "Modern Frontend Architecture" covering React, TypeScript, and performance optimization.',
    date: 'February 8, 2024',
    type: 'speaker',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    links: {
      x: 'https://twitter.com/example/frontend-masters',
      linkedin: 'https://linkedin.com/posts/frontend-masters',
      website: 'https://frontendmasters.com',
    },
  },
  {
    id: '3',
    eventName: 'Tech Mentorship Program',
    brief: 'Mentored 20+ junior developers on product development, code quality, and career growth over 6 months.',
    date: 'January 2024 - June 2024',
    type: 'mentoring',
    image: 'https://images.unsplash.com/photo-1522202176988-66270c2a3e84?q=80&w=1200&auto=format&fit=crop',
    links: {
      linkedin: 'https://linkedin.com/posts/mentorship',
      website: 'https://example.com/mentorship',
    },
  },
  {
    id: '4',
    eventName: 'Web Dev Summit',
    brief: 'Presented "Landing Page Performance: From Concept to Conversion" focusing on Core Web Vitals and user experience.',
    date: 'December 12, 2023',
    type: 'speaker',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop',
    links: {
      x: 'https://twitter.com/example/web-dev-summit',
      linkedin: 'https://linkedin.com/posts/web-dev-summit',
      youtube: 'https://youtube.com/watch?v=example',
    },
  },
]

export const getMentoringEngagements = (): MentorSpeakerItem[] => {
  return mentorSpeakerEngagements.filter((item) => item.type === 'mentoring')
}

export const getSpeakerEngagements = (): MentorSpeakerItem[] => {
  return mentorSpeakerEngagements.filter((item) => item.type === 'speaker')
}

export const getAllOrganizations = (): string[] => {
  const organizations = new Set<string>()
  mentorSpeakerEngagements.forEach((item) => {
    if (item.links?.website) {
      try {
        const url = new URL(item.links.website)
        const domain = url.hostname.replace('www.', '')
        organizations.add(domain)
      } catch {
        organizations.add(item.eventName)
      }
    } else {
      organizations.add(item.eventName)
    }
  })
  return Array.from(organizations)
}

