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
    eventName: 'Basic Javascript with Weather Apps',
    brief: 'Build simple website using HTML/CSS/JS for swifting career to Frontend.',
    date: 'March 2024',
    type: 'speaker',
    links: {
      website: 'https://hacktiv8.com',
    },
  },
  {
    id: '2',
    eventName: 'Workshop NextJs Frontend Development',
    brief: 'Building from Zero to Hero NextJS App with ecosystem.',
    date: 'February 2024',
    type: 'speaker',
    links: {
      website: 'https://iswift.id',
    },
  },
  {
    id: '3',
    eventName: 'Workshop Deep Dive Into Grid and Flexbox',
    brief: 'The aim of this workshop is for participants to master slicing and converting designs into code for all types of layouts created by designers. For example, if participants receive a layout like this, they can use Flexbox or Grid to implement it.',
    date: 'November 2023',
    type: 'speaker',
    links: {
      website: 'https://iswift.id',
    },
  },
  {
    id: '4',
    eventName: 'Create NextJS Component with Chakra UI',
    brief: 'Technical Guide on How Create Chakra UI Component with NextJS',
    date: 'June 2022',
    type: 'speaker',
    links: {
      website: 'https://coding.id',
    },
  },
  {
    id: '5',
    eventName: 'ADPList Mentorship',
    brief: 'Engaged as a mentor on ADPList, providing personalized 1:1 mentorship to emerging Frontend Engineers, focusing on career growth and technical skills enhancement. Recognized for outstanding impact, achieving Top 1% Mentor status consecutively in February, March, and April 2023.',
    date: 'February 2023 - Present',
    type: 'mentoring',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
      website: 'https://adplist.org/mentors/naufaldi-rafif-s',
    },
  },
  {
    id: '6',
    eventName: 'Dibimbing Bootcamp',
    brief: 'Mentored over 50 individuals in the \'Dibimbing\' bootcamp, focusing on Frontend Engineering with an emphasis on Web Development and the React Ecosystem, fostering a new generation of skilled developers.',
    date: 'June 2023 - January 2024',
    type: 'mentoring',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
      website: 'https://dibimbing.id',
    },
  },
  {
    id: '7',
    eventName: 'RevoU Software Engineer Fundamentals',
    brief: 'Facilitated the learning journey for mentees in the RevoU short course on Software Engineer Fundamentals, covering HTML, CSS, and JavaScript. Taught and mentored over 100 mentees, demonstrating a strong commitment to education and the development of future talent in the tech industry.',
    date: 'February 2023 - April 2023',
    type: 'mentoring',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
      website: 'https://revou.co',
    },
  },
  {
    id: '8',
    eventName: 'Ekskul Frontend Development',
    brief: 'Taught and mentored over 30 mentees, providing comprehensive guidance in frontend development. Developed a detailed curriculum focusing on HTML, CSS, and JavaScript, aiming to build strong foundational skills.',
    date: 'December 2021 - January 2022',
    type: 'mentoring',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
      website: 'https://ekskul.id',
    },
  },
  {
    id: '9',
    eventName: 'LOGOS Festival Website',
    brief: 'Led the frontend team in the development of the Logos Festival Website, ensuring timely delivery and high-quality standards. Implemented analytics solutions like Splitbee to analyze user behavior and optimize funneling strategies.',
    date: 'May 2021 - December 2022',
    type: 'mentoring',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '10',
    eventName: 'IxDA Interaction Association',
    brief: 'Engaged in ongoing learning about UX Research to enhance understanding of user behaviors and needs, contributing to more effective frontend strategies. Collaborated with researchers to leverage frontend technologies in gathering meaningful user data.',
    date: 'August 2019 - Present',
    type: 'mentoring',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
      website: 'https://ixda.org',
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

