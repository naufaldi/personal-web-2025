import {
  Code2,
  FileCode,
  Zap,
  Palette,
  Server,
  Globe,
  type LucideIcon,
} from 'lucide-react'

export const techIconMap: Record<string, LucideIcon> = {
  React: Code2,
  TypeScript: FileCode,
  'Next.js': Zap,
  Tailwind: Palette,
  'Node.js': Server,
  Storybook: Globe,
}

export const getTechIcon = (techName: string): LucideIcon | null => {
  return techIconMap[techName] || null
}

