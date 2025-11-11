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
    companyName: 'PT Sukanda Djaya',
    role: 'Senior Frontend Developer',
    startDate: 'March 2025',
    endDate: 'Present',
    employmentType: 'full-time',
    description: 'PT Sukanda Djaya is one of Indonesia\'s largest food and beverage distribution companies under the Diamond Food Group, serving diverse channels such as food service, retail, and QSR (Quick Service Restaurant).',
    achievements: [
      'Designed a modular component architecture in React, cutting future development time and reducing duplicate code',
      'Decreased production error rates by **over 25%** through improved error handling, log tracking, and better testing workflows',
      'Built and improved pages for SOL\'s e-commerce website handling large product catalogs and high traffic volumes',
      'Improved team documentation by writing RFCs and maintaining updated internal docs, ensuring smoother handoffs',
    ],
    keyAchievementsMarkdown: `- Designed a modular component architecture in React, cutting future development time and reducing duplicate code
- Decreased production error rates by **over 25%** through improved error handling, log tracking, and better testing workflows
- Built and improved pages for SOL's e-commerce website handling large product catalogs and high traffic volumes
- Improved team documentation by writing RFCs and maintaining updated internal docs, ensuring smoother handoffs`,
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    website: 'https://sukandaonelink.com',
  },
  {
    id: '2',
    companyName: 'eFishery',
    role: 'Product Engineer - Mid Frontend Developer',
    startDate: 'Maret 2022',
    endDate: 'February 2025',
    employmentType: 'full-time',
    description: 'eFishery is an Indonesian unicorn startup revolutionizing the aquaculture industry through technology. It offers a comprehensive ecosystem encompassing P2P lending, IoT devices for precise aquafarming, and a marketplace to empower farmers.',
    achievements: [
      'Cut Service Level Agreements by **30%** by migrating from Google Sheets to a custom NextJS solution, boosting operational efficiency',
      'Enhanced dashboard performance, increasing Google Lighthouse score from **70-80 to 80-90** through optimization and modern web standards',
      'Migrated from Budibase to a fully customized NextJS solution, delivering advanced features and dynamic UIs',
      'Integrated OJK API using GraphQL for compliance and secure real-time data updates, building user trust',
    ],
    keyAchievementsMarkdown: `- Cut Service Level Agreements by **30%** by migrating from Google Sheets to a custom NextJS solution, boosting operational efficiency
- Enhanced dashboard performance, increasing Google Lighthouse score from **70-80 to 80-90** through optimization and modern web standards
- Migrated from Budibase to a fully customized NextJS solution, delivering advanced features and dynamic UIs
- Integrated OJK API using GraphQL for compliance and secure real-time data updates, building user trust`,
    techStack: ['React', 'TypeScript', 'Next.js', 'React Native', 'GraphQL', 'React Query', 'Leaflet'],
    website: 'https://efishery.com',
  },
  {
    id: '3',
    companyName: 'Bahasa.ai',
    role: 'Software Engineer - Frontend Developer',
    startDate: 'Sept 2021',
    endDate: 'Jan 2022',
    employmentType: 'full-time',
    description: 'Bahasa.ai is a leading Southeast Asia-based enterprise AI service provider, focusing on developing state-of-the-art generative AI solutions for a variety of use cases.',
    achievements: [
      'Led the migration from JavaScript to TypeScript, enhancing type safety, security, and developer experience',
      'Developed internal tools using NextJS, Chakra UI, and Recoil, enabling rapid prototyping and client demonstrations',
      'Conducted technical discovery sessions, translating business needs into actionable project plans',
      'Addressed bug fixes and developed new features based on Product Management requests, ensuring continuous improvement',
    ],
    keyAchievementsMarkdown: `- Led the migration from JavaScript to TypeScript, enhancing type safety, security, and developer experience
- Developed internal tools using NextJS, Chakra UI, and Recoil, enabling rapid prototyping and client demonstrations
- Conducted technical discovery sessions, translating business needs into actionable project plans
- Addressed bug fixes and developed new features based on Product Management requests, ensuring continuous improvement`,
    techStack: ['React', 'TypeScript', 'Next.js', 'Chakra UI', 'Recoil'],
  },
  {
    id: '4',
    companyName: 'Dipa Inhouse',
    role: 'Frontend Engineer',
    startDate: 'April 2021',
    endDate: 'August 2021',
    employmentType: 'contract',
    description: 'Dipa Inhouse is a design studio with a focus on creating compelling landing pages and animations. They dedicate themselves to developing digital products that not only meet business objectives but also resonate with users.',
    achievements: [
      'Developed a comprehensive UI Kit, accelerating prototyping and fostering efficient development workflows',
      'Achieved pixel-perfect implementation of landing pages, meticulously aligning with design specifications',
      'Implemented engaging animations and integrated marketing tools (Loxo and EmailJS), improving user engagement and conversion rates',
      'Collaborated closely with designers to implement a style guide, establishing standardization across projects',
    ],
    keyAchievementsMarkdown: `- Developed a comprehensive UI Kit, accelerating prototyping and fostering efficient development workflows
- Achieved pixel-perfect implementation of landing pages, meticulously aligning with design specifications
- Implemented engaging animations and integrated marketing tools (Loxo and EmailJS), improving user engagement and conversion rates
- Collaborated closely with designers to implement a style guide, establishing standardization across projects`,
    techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'EmailJS'],
  },
  {
    id: '5',
    companyName: 'Esteh Creative',
    role: 'Frontend Developer',
    startDate: 'Oct 2019',
    endDate: 'March 2021',
    employmentType: 'contract',
    description: 'Estech Creative operates as a dynamic software house, offering comprehensive engineering and design teams tasked with developing applications tailored to client business needs. They specialize in aiding businesses in their digital transformation journeys, leveraging technology and design to bring innovative solutions to life.',
    achievements: [
      'Converted Figma designs to pixel-perfect HTML/CSS code, facilitating rapid integration into Laravel framework',
      'Developed a dynamic Blog/Company Profile using ReactJS with backend API integration, enabling quick launch of feature-rich applications',
      'Built responsive websites optimized for various browsers, focusing on accessibility features like color contrast and ARIA labels',
      'Mentored interns on frontend development practices, elevating their skills and contributing to team capacity growth',
    ],
    keyAchievementsMarkdown: `- Converted Figma designs to pixel-perfect HTML/CSS code, facilitating rapid integration into Laravel framework
- Developed a dynamic Blog/Company Profile using ReactJS with backend API integration, enabling quick launch of feature-rich applications
- Built responsive websites optimized for various browsers, focusing on accessibility features like color contrast and ARIA labels
- Mentored interns on frontend development practices, elevating their skills and contributing to team capacity growth`,
    techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'Laravel'],
  },
  {
    id: '6',
    companyName: 'Deliv Indonesia',
    role: 'Frontend Developer',
    startDate: 'Oct 2018',
    endDate: 'Sept 2019',
    employmentType: 'contract',
    description: 'Deliv is an innovative PPOB startup designed to assist merchants in easily purchasing pulsa, token listrik, and other essential tools. This platform is particularly beneficial for users in rural areas, providing them with a convenient way to make purchases.',
    achievements: [
      'Developed a company landing page using component frameworks, delivering high-quality outcomes and accelerating prototyping',
      'Built a transaction management dashboard using HTML/CSS, optimized for Laravel integration and efficient transaction oversight',
      'Engineered internal tools for simplifying operational tasks, improving process efficiency',
      'Mentored interns on frontend development practices, effectively managing and enriching their learning experience',
    ],
    keyAchievementsMarkdown: `- Developed a company landing page using component frameworks, delivering high-quality outcomes and accelerating prototyping
- Built a transaction management dashboard using HTML/CSS, optimized for Laravel integration and efficient transaction oversight
- Engineered internal tools for simplifying operational tasks, improving process efficiency
- Mentored interns on frontend development practices, effectively managing and enriching their learning experience`,
    techStack: ['HTML', 'CSS', 'JavaScript', 'Laravel'],
  },
]

export const getLatestExperiences = (limit: number = 4): WorkExperience[] => {
  return workExperiences.slice(0, limit)
}

