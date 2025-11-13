import { Link } from 'react-router'
import { Twitter, Linkedin, Mail, Github, Instagram } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib'

const generalLinks = [
  { name: 'Home', href: '/', external: false },
  { name: 'Blog', href: 'https://blog.faldi.xyz/', external: true },
  { name: 'Projects', href: '/projects', external: false },
  { name: 'About', href: '/about', external: false },
  { name: 'Speaker', href: '/speaker', external: false },
]

const websiteLinks = [
  { name: 'Book', href: '/book', external: false },
  { name: 'Manhwa', href: '/manhwa', external: false },
  { name: 'Short', href: '/shorts', external: false },
  { name: 'Experience', href: '/experience', external: false },
  { name: 'Speaking', href: '/speaking', external: false },
]

const resourceLinks = [
  { name: 'GitHub', href: siteConfig.socialLinks.github || '#', external: true },
  { name: 'LinkedIn', href: siteConfig.socialLinks.linkedin || '#', external: true },
  { name: 'Twitter/X', href: siteConfig.socialLinks.twitter || '#', external: true },
  { name: 'Instagram', href: siteConfig.socialLinks.instagram || '#', external: true },
  { name: 'ADPList', href: siteConfig.socialLinks.adplist || '#', external: true },
]

const socialIcons = [
  {
    name: 'Email',
    icon: Mail,
    href: siteConfig.socialLinks.email || '#',
    ariaLabel: 'Send email to Naufaldi Rafif S.',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: siteConfig.socialLinks.linkedin || '#',
    ariaLabel: 'Visit LinkedIn profile',
  },
  {
    name: 'Twitter/X',
    icon: Twitter,
    href: siteConfig.socialLinks.twitter || '#',
    ariaLabel: 'Follow on X (Twitter)',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: siteConfig.socialLinks.github || '#',
    ariaLabel: 'Visit GitHub profile',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: siteConfig.socialLinks.instagram || '#',
    ariaLabel: 'Follow on Instagram',
  },
]

const renderLink = (link: { name: string; href: string; external: boolean }) => {
  const linkClassName = cn(
    'text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'underline-offset-4 hover:underline'
  )

  if (link.external) {
    return (
      <a
        key={link.name}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {link.name}
      </a>
    )
  }

  return (
    <Link key={link.name} to={link.href} className={linkClassName}>
      {link.name}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 px-6 md:px-0 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-white">{siteConfig.name}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-4">
              {socialIcons.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center justify-center w-10 h-10 rounded-md',
                      'text-slate-300 hover:text-slate-200 transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                      'focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                    )}
                    aria-label={social.ariaLabel}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <nav className="space-y-4" aria-label="General navigation">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              General
            </h3>
            <ul className="flex flex-col space-y-3">
              {generalLinks.map(renderLink)}
            </ul>
          </nav>

          <nav className="space-y-4" aria-label="Website navigation">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              The Website
            </h3>
            <ul className="flex flex-col space-y-3">
              {websiteLinks.map(renderLink)}
            </ul>
          </nav>

          <nav className="space-y-4" aria-label="Resources">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="flex flex-col space-y-3">
              {resourceLinks.map(renderLink)}
            </ul>
          </nav>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <p className="text-sm text-slate-500 text-center">
            Copyright © 2025 {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
