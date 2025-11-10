import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/data/site'
import Navigation from './Navigation'

export default function Header() {
  const initials = siteConfig.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <header className="relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between border-b border-slate-800/70">
          <Link
            to="/"
            className="inline-flex items-center gap-2 group"
            aria-label="Home"
          >
            <div className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-slate-800/80 bg-slate-900/80 ring-1 ring-inset ring-slate-800/40">
              <span
                className="text-slate-100 text-[11px] tracking-tight font-medium"
                style={{
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {initials}
              </span>
            </div>
            <span
              className="text-slate-300 text-sm tracking-tight font-medium group-hover:text-slate-100 transition-colors"
              style={{
                fontFamily: 'var(--font-body)',
              }}
            >
              {siteConfig.name}
            </span>
          </Link>

          <div className="flex-1 flex justify-center">
            <Navigation />
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="secondary"
              
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              <Link to="#contact">Contact</Link>
            </Button>
            <Button
              asChild
              variant="primary"
              
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
              }}
            >
              <Link to="#resume">
                Download CV
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
