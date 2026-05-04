import { Link } from 'react-router'
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { siteConfig } from '@/data/site'
import FooterColumn from '@/components/design-system/FooterColumn'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
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
  { name: 'Email', icon: Mail, href: siteConfig.socialLinks.email || '#', ariaLabel: 'Send email to Naufaldi Rafif S.' },
  { name: 'LinkedIn', icon: Linkedin, href: siteConfig.socialLinks.linkedin || '#', ariaLabel: 'Visit LinkedIn profile' },
  { name: 'Twitter/X', icon: Twitter, href: siteConfig.socialLinks.twitter || '#', ariaLabel: 'Follow on X' },
  { name: 'GitHub', icon: Github, href: siteConfig.socialLinks.github || '#', ariaLabel: 'Visit GitHub profile' },
  { name: 'Instagram', icon: Instagram, href: siteConfig.socialLinks.instagram || '#', ariaLabel: 'Follow on Instagram' },
]

const footerLinkClassName =
  'font-mono text-xs uppercase tracking-[0.08em] text-[var(--graphite-muted)] transition-colors hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]'

const renderLink = (link: { name: string; href: string; external: boolean }) => {
  if (link.external) {
    return (
      <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={footerLinkClassName}>
        {link.name}
      </a>
    )
  }

  return (
    <Link key={link.name} to={link.href} className={footerLinkClassName}>
      {link.name}
    </Link>
  )
}

export default function Footer() {
  const footerSignals = [
    { label: 'BUILD', value: '2026' },
    { label: 'SYSTEM', value: 'faldi.xyz' },
    { label: 'OWNER', value: siteConfig.name },
  ]

  return (
    <footer className="bg-[var(--paper)] py-12 md:py-16">
      <div className="site-container">
        <div className="grid gap-px border-y border-[var(--border-line)] bg-[var(--border-line)] md:grid-cols-3">
          {footerSignals.map((signal, index) => (
            <div key={signal.label} className="bg-[var(--paper)] px-4 py-4 md:px-5">
              <div className="text-drawing-label">
                {String(index + 1).padStart(2, '0')} // {signal.label}
              </div>
              <p className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-[var(--graphite)]">
                {signal.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-px border-b border-[var(--border-line)] bg-[var(--border-line)] md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <div className="bg-[var(--paper)] px-4 py-8 md:px-5 md:py-10">
              <div className="text-drawing-label">01 // IDENTITY</div>
              <div className="mt-5">
              <h2 className="font-mono text-2xl font-medium text-[var(--graphite)]">{siteConfig.name}</h2>
              <p className="mt-2 text-sm text-[var(--graphite-muted)]">{siteConfig.tagline}</p>
            </div>
              <div className="mt-6 flex items-center gap-3">
              {socialIcons.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-line)] text-[var(--graphite-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]',
                    )}
                    aria-label={social.ariaLabel}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                )
              })}
              </div>
            </div>
          </div>

          <FooterColumn title="GENERAL" className="bg-[var(--paper)] px-4 py-8 md:px-5 md:py-10">
            {generalLinks.map(renderLink)}
          </FooterColumn>
          <FooterColumn title="THE WEBSITE" className="bg-[var(--paper)] px-4 py-8 md:px-5 md:py-10">
            {websiteLinks.map(renderLink)}
          </FooterColumn>
          <FooterColumn title="RESOURCES" className="bg-[var(--paper)] px-4 py-8 md:px-5 md:py-10">
            {resourceLinks.map(renderLink)}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-3 border-b border-[var(--border-line)] py-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--graphite-muted)] md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2025 {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            <TechnicalLabel variant="mono">LOCAL_TIME</TechnicalLabel>
            <p>Bekasi, Indonesia</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
