import { ArrowUpRight, Linkedin, Mail, Twitter } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import { Button } from '@/components/ui/button'

export default function ConnectCTA() {
  const contactSignals = [
    {
      label: 'STATUS',
      value: 'Open channel',
      detail: 'Software engineering work, speaking, and mentorship',
    },
    {
      label: 'LOCATION',
      value: 'Bekasi',
      detail: 'Indonesia based, remote friendly',
    },
    {
      label: 'PRIMARY_ROUTE',
      value: 'LinkedIn',
      detail: 'Best path for work conversations',
    },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-y border-[var(--border-line)] bg-[var(--paper)] py-12 md:py-16"
    >
      <div className="site-container">
        <div className="section-rule grid gap-8 pt-5 md:grid-cols-[minmax(0,1fr)_minmax(320px,560px)] md:items-end">
          <div className="space-y-4">
            <div className="text-drawing-label">05 // CONTACT_SURFACE</div>
            <div className="space-y-2">
              <h2
                id="contact-heading"
                className="font-mono text-3xl font-medium leading-none text-[var(--graphite)] md:text-5xl"
              >
                Connect with me
              </h2>
              <p className="text-body-readable">
                Get updates on my latest software work, writing, and practical engineering notes.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {siteConfig.socialLinks.twitter && (
              <Button asChild variant="primary" className="justify-between">
                <a href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  Follow on X
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            )}
            {siteConfig.socialLinks.linkedin && (
              <Button asChild variant="secondary" className="justify-between">
                <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  Contact on LinkedIn
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            )}
            {siteConfig.socialLinks.email && (
              <Button asChild variant="technical" className="justify-between">
                <a href={siteConfig.socialLinks.email}>
                  Send email
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-px border-y border-[var(--border-line)] bg-[var(--border-line)] md:grid-cols-3">
          {contactSignals.map((signal, index) => (
            <div key={signal.label} className="bg-[var(--paper)] px-4 py-3 md:px-5 md:py-4">
              <div className="text-drawing-label">
                {String(index + 1).padStart(2, '0')} // {signal.label}
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-lg font-medium leading-none text-[var(--graphite)] md:text-xl">
                    {signal.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--graphite-muted)]">
                    {signal.detail}
                  </p>
                </div>
                {signal.label === 'STATUS' && (
                  <TechnicalLabel variant="status" className="mt-1">
                    Live
                  </TechnicalLabel>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-[var(--border-line)]">
          <a
            href="/projects"
            className="group/row relative grid min-h-16 items-center border-b border-[var(--border-line)] py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-2 left-3 right-3 bg-[var(--surface-subtle)]/70 opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:left-4 md:right-4"
            />
            <span className="relative flex items-center justify-between gap-4">
              <span>
                <span className="text-drawing-label">04 // NEXT_ROUTE</span>
                <span className="mt-2 block font-mono text-lg font-medium text-[var(--graphite)]">
                  Browse selected work
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-[var(--graphite)]" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
