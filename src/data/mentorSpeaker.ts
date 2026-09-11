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
  type: 'mentoring' | 'speaker' | 'voluntary'
  category?: 'Workshops' | 'Talks' | 'Mentoring' | 'Community'
  role?: string
  venue?: string
  topics?: string[]
  image?: string
  links?: MentorSpeakerLinks
}

export const mentorSpeakerEngagements: MentorSpeakerItem[] = [
  {
    "id": "luma-astra",
    "eventName": "Astra Commons Jakarta",
    "date": "12 September 2026",
    "category": "Community",
    "role": "Host with Aniek S and Pierre",
    "venue": "ReVerse Coffee & Tea",
    "brief": "A scheduled community gathering over coffee to exchange ideas about building with Astra. The format leaves room for conversations and connections without a formal demo programme.",
    "topics": [
      "Community conversations",
      "Builder connections"
    ],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/a7x5kjwz"
    }
  },
  {
    "id": "luma-grok",
    "eventName": "Grok Bot Meetup Jakarta",
    "date": "3 October 2026",
    "category": "Community",
    "role": "Host",
    "venue": "Jakarta",
    "brief": "A community meetup scheduled in Jakarta. See the event page for the current programme and registration details.",
    "topics": [],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/spacexai-zb6b"
    }
  },
  {
    "id": "luma-enterprise",
    "eventName": "Enterprise LLM Architecture: Multimodal, Code & Production APIs #4",
    "date": "22 August 2026",
    "category": "Workshops",
    "role": "Co-host with UCLOUD Global",
    "venue": "Online",
    "brief": "A practical workshop on moving LLM integrations toward production. The programme covers model and region selection, cost estimation, latency measurement, API integration, key safety, monitoring and reliability.",
    "topics": [
      "Model selection and cost",
      "Latency and reliability",
      "Production API integration"
    ],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/s1sx8gln"
    }
  },
  {
    "id": "luma-cursor-aug",
    "eventName": "Cursor Meetup Jakarta: From PRD to Deployment",
    "date": "1 August 2026",
    "category": "Workshops",
    "role": "Co-host with Aniek S",
    "venue": "Hacktiv8, Jakarta",
    "brief": "A hands-on workshop connecting a clear problem statement to a deployed product. Participants work through product requirements, documentation and design specifications, implementation, testing and deployment with Cursor.",
    "topics": [
      "Product requirements",
      "Cursor Skills and environments",
      "Implementation, testing and deployment"
    ],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/4qe99i6e"
    }
  },
  {
    "id": "luma-codex-build",
    "eventName": "OpenAI Build Week Community Hackathon Jakarta",
    "date": "18 July 2026",
    "category": "Workshops",
    "role": "Co-host with Aniek S and Bagas Wastu",
    "venue": "Hellolive, Jakarta",
    "brief": "A one-day build sprint around useful AI workflows for people in Indonesia. The programme combines a Codex introduction, individual building time, mentor check-ins and demonstrations of working prototypes.",
    "topics": [
      "Problem definition",
      "Building with Codex",
      "Prototype demonstrations"
    ],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/keng8c0n"
    }
  },
  {
    "id": "luma-models",
    "eventName": "Stop Reading, Start Vibeing: Which AI Model Wins for Developers? #1",
    "date": "12 July 2026",
    "category": "Workshops",
    "role": "Co-host with UCLOUD Global",
    "venue": "Ciputra International Superblock, Tower 3, Level 5",
    "brief": "A hands-on comparison of AI models using developer tasks. Participants explore how cost, speed, context and output quality affect the journey from an idea through documentation, planning, coding, review and iteration.",
    "topics": [
      "Model comparison",
      "Developer workflows",
      "Review and iteration"
    ],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/69cy4zgc"
    }
  },
  {
    "id": "luma-codex-june",
    "eventName": "Codex Community Meetup Jakarta",
    "date": "13 June 2026",
    "category": "Talks",
    "role": "Host and speaker",
    "venue": "Hellolive, Jakarta",
    "brief": "A community meetup about practical experiences using Codex. The programme includes developer stories, questions and answers, community demonstrations, and my session sharing Codex experience.",
    "topics": [
      "Codex experience",
      "Developer demonstrations",
      "Community Q&A"
    ],
    "type": "speaker",
    "links": {
      "website": "https://luma.com/1gtp0tux"
    }
  },
  {
    "id": "luma-video",
    "eventName": "From Prompt to Product Jakarta #0: Hands-on Video Generation Workshop",
    "date": "9 June 2026",
    "category": "Workshops",
    "role": "Co-host and speaker with UCLOUD Global and Patrick",
    "venue": "Jakarta",
    "brief": "An evening of hands-on video generation and comparing models with real prompts. My session covers choosing the right AI model, followed by Patrick’s video generation workshop and live demonstrations.",
    "topics": [
      "Choosing an AI model",
      "Video generation",
      "Live demonstrations"
    ],
    "type": "speaker",
    "links": {
      "website": "https://luma.com/vsglucso"
    }
  },
  {
    "id": "luma-nix",
    "eventName": "MiniMax: Building Agent Environments & Infrastructure with Nix",
    "date": "25 April 2026",
    "category": "Workshops",
    "role": "Host; session by Rasyidan A. F.",
    "venue": "Zoom",
    "brief": "A workshop led by Rasyidan A. F. on reproducible environments for coding agents. The programme covers Nix shells and flakes, MiniMax integration, agent orchestration, monitoring and infrastructure as code.",
    "topics": [
      "Reproducible environments",
      "Agent infrastructure",
      "Nix shells and flakes"
    ],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/n7lyotk0"
    }
  },
  {
    "id": "luma-cafe",
    "eventName": "Cafe Cursor Jakarta",
    "date": "5 April 2026",
    "category": "Community",
    "role": "Co-host with David Winalda",
    "venue": "South Jakarta",
    "brief": "A post-Eid gathering for coffee, side projects and conversations with other builders, including visiting members of the Cursor team.",
    "topics": [
      "Side projects",
      "Builder conversations"
    ],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/e8w0ktq6"
    }
  },
  {
    "id": "luma-cursor-jan",
    "eventName": "Cursor Jakarta Meetup",
    "date": "24 January 2026",
    "category": "Community",
    "role": "Co-host with Aris Setiawan, Bagas Wastu and Walvenardo",
    "venue": "Hacktiv8, Jakarta",
    "brief": "An in-person gathering exploring the move from vibe coding to agentic workflows and shipping software. The format includes peer discussion and opportunities to share projects.",
    "topics": [
      "Agentic workflows",
      "Project sharing"
    ],
    "type": "voluntary",
    "links": {
      "website": "https://luma.com/cursor-jkt"
    }
  },
  {
    "id": "luma-cursor-dec",
    "eventName": "Cursor Meetup Jakarta: Agentic AI Workflows",
    "date": "20 December 2025",
    "category": "Talks",
    "role": "Co-host and speaker with Aris Setiawan",
    "venue": "Zoom",
    "brief": "A virtual session on agentic AI mental models and everyday coding workflows. I cover the broader concepts, while Aris shares Cursor practices, followed by questions and a community open mic.",
    "topics": [
      "Agentic AI concepts",
      "Cursor practices",
      "Community Q&A"
    ],
    "type": "speaker",
    "links": {
      "website": "https://luma.com/k0ixcofb"
    }
  },
  {
    id: '13',
    eventName: 'Agentic AI for Builders: From Prompt to Autonomous Coding Loop',
    brief: 'Meetup on how autonomous coding agents run through structured cycles: Plan, Act, Verify, and Iterate. Covered decomposing tasks, multi-step execution, evaluating intermediate outputs, and self-correction toward a defined goal—treating AI as a workflow, not a single-shot generator.',
    date: '27 February 2026',
    role: 'Host and speaker',
    venue: 'Online',
    links: { website: 'https://luma.com/lrq146dp' },
    type: 'speaker',
  },
  {
    id: '14',
    eventName: '101 Vibe Engineering with MiniMax M2.1',
    brief: 'A two-hour workshop using MiniMax M2.1 with OpenCode. The programme covers environment setup, guiding model intent, managing context and a research, plan and execute workflow.',
    date: '11 January 2026',
    category: 'Workshops',
    role: 'Host and speaker',
    venue: 'Zoom',
    type: 'speaker',
    links: {
      website: 'https://luma.com/7bbx8bo9',
    },
  },
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
    id: '11',
    eventName: 'Twitter Spaces',
    brief: 'Hosting Twitter Spaces to engage with a global audience through real-time dialogue, sharing knowledge and insights about software engineering, career growth, and the tech industry.',
    date: 'Ongoing',
    type: 'speaker',
    links: {
      x: 'https://x.com/f2aldi',
    },
  },
  {
    id: '5',
    eventName: 'ADPList Mentorship',
    brief: 'Engaged as a mentor on ADPList, providing personalized 1:1 mentorship to emerging engineers, focusing on career growth and technical skills enhancement. Recognized for outstanding impact, achieving Top 1% Mentor status consecutively in February, March, and April 2023.',
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
    brief: 'Mentored over 50 individuals in the \'Dibimbing\' bootcamp, focusing on web development, React, and practical product-building skills for a new generation of developers.',
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
    brief: 'Taught and mentored over 30 mentees, providing comprehensive guidance in web development. Developed a detailed curriculum focusing on HTML, CSS, and JavaScript, aiming to build strong foundational skills.',
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
    brief: 'Led the frontend team in the development of the Logos Festival Website, ensuring timely delivery and high-quality standards. Implemented analytics solutions like Splitbee to analyze user behavior and optimize funneling strategies. Played a pivotal role in selecting the frontend tech stack and managing project workflows using GitHub.',
    date: 'May 2021 - December 2022',
    type: 'voluntary',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '21',
    eventName: 'Codex Developer Ambassador',
    brief: 'Developer ambassador work for Codex, focused on helping developers understand coding-agent workflows, verification habits, and practical AI-assisted software delivery.',
    date: 'April 2026 - Present',
    type: 'voluntary',
    links: {
      website: 'https://openai.com/codex',
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '20',
    eventName: 'Cursor Developer Ambassador',
    brief: 'Developer ambassador work for Cursor, sharing agentic coding practices, editor workflows, and practical ways engineers can use AI-assisted development in real projects.',
    date: 'January 2026 - Present',
    type: 'voluntary',
    links: {
      website: 'https://cursor.com',
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '19',
    eventName: 'MiniMax Developer Ambassador',
    brief: 'Developer ambassador work for MiniMax, helping builders understand AI development workflows, product capabilities, and practical adoption through community sharing.',
    date: 'December 2025 - Present',
    type: 'voluntary',
    links: {
      website: 'https://www.minimax.io',
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '10',
    eventName: 'IxDA Interaction Association',
    brief: 'Engaged in ongoing learning about UX Research to enhance understanding of user behaviors and needs, contributing to more effective frontend strategies. Collaborated with researchers to leverage frontend technologies in gathering meaningful user data, informing product decisions.',
    date: 'August 2019 - December 2023',
    type: 'voluntary',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
      website: 'https://ixda.org',
    },
  },
  {
    id: '12',
    eventName: 'Stasion (Startup Singo Edan)',
    brief: 'Contributing to community initiatives through voluntary work with Stasion, supporting startup ecosystem development and community engagement.',
    date: 'Ended 2020',
    type: 'voluntary',
    links: {
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '15',
    eventName: 'MOFON (Mentorship Frontend)',
    brief: 'Frontend Developer Mentor: HTML, CSS, and JavaScript fundamentals, personalized feedback, curriculum design, and collaboration with other mentors to improve the learning experience for students at all levels.',
    date: 'December 2020 – November 2024',
    type: 'mentoring',
    links: {
      website: 'https://mofon.vercel.app',
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '16',
    eventName: 'Esteh Creative',
    brief: 'Mentor Frontend Developer: fundamentals of web development, recorded tutorials, and hands-on guidance alongside teaching core HTML, CSS, and JavaScript practices.',
    date: 'March 2021 – December 2023',
    type: 'mentoring',
    links: {
      website: 'https://www.esteh.id',
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '17',
    eventName: 'Nest Academy',
    brief: 'Software engineering mentor: built and delivered a structured HTML, CSS, and JavaScript curriculum, guided learners through projects with best practices, and provided ongoing technical support.',
    date: 'August 2022 – September 2022',
    type: 'mentoring',
    links: {
      website: 'https://nestacademy.id',
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
  {
    id: '18',
    eventName: 'Fast Campus — All-in-One Frontend Web Development',
    brief: 'Course instructor for the All-in-One Frontend Web Development package (From Zero To Hero), alongside Jessica Cecilia B., F. Dhani Achmad, and Rizky Ramadhan.',
    date: 'Ongoing',
    type: 'mentoring',
    links: {
      website: 'https://fastcampus.com/en/products/dev_online_fe',
      linkedin: 'https://www.linkedin.com/in/naufaldirafif/',
    },
  },
]

const HOME_MENTOR_SPEAKER_FEATURED_IDS = ['13', '14', '5', '6'] as const

export const getHomeMentorSpeakerPreview = (): MentorSpeakerItem[] => {
  const byId = new Map(mentorSpeakerEngagements.map((item) => [item.id, item]))
  return HOME_MENTOR_SPEAKER_FEATURED_IDS.map((id) => byId.get(id)).filter(
    (item): item is MentorSpeakerItem => item !== undefined,
  )
}

export const getMentoringEngagements = (): MentorSpeakerItem[] => {
  return mentorSpeakerEngagements.filter((item) => item.type === 'mentoring')
}

export const getSpeakerEngagements = (): MentorSpeakerItem[] => {
  return mentorSpeakerEngagements.filter((item) => item.type === 'speaker')
}

export const getVoluntaryWork = (): MentorSpeakerItem[] => {
  return mentorSpeakerEngagements.filter((item) => item.type === 'voluntary')
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
