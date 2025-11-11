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

export const aboutBio: AboutBio = {
  name: 'Lorem Ipsum Dolor',
  title: 'Senior Software Engineer at Example Company',
  bioParagraphs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  ],
  profileImageUrl: 'https://testingbot.com/free-online-tools/random-avatar/300',
  signature: 'Lorem',
}

export const currentActivities: CurrentActivity[] = [
  {
    id: '1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    emoji: '✈️',
  },
  {
    id: '2',
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: '3',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  },
  {
    id: '4',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
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

