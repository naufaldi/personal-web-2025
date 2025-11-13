import { Twitter, Linkedin } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib'

export default function ConnectCTA() {
  return (
    <section className="relative bg-slate-900 light:bg-slate-50 border-t border-slate-800/70 light:border-slate-300 px-6 md:px-0 py-12 md:py-16">
      <div
        className="absolute inset-0 opacity-30 light:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top right, rgba(148, 163, 184, 0.15), transparent 50%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white light:text-slate-900 mb-4">
              Connect with me
            </h2>
            <p className="text-sm md:text-base text-slate-400 light:text-slate-600 leading-relaxed">
              Don't miss out 👋. Get updates on my latest work and insights.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {siteConfig.socialLinks.twitter && (
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center justify-between w-full px-6 py-3',
                  'bg-slate-100 light:bg-slate-950 text-slate-900 light:text-white',
                  'hover:bg-white light:hover:bg-slate-900 hover:shadow-md hover:shadow-slate-900/20 light:hover:shadow-slate-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 light:focus-visible:ring-offset-white',
                  'transition-all duration-200 rounded-md',
                  'text-sm font-semibold'
                )}
              >
                <span>Follow on X</span>
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            )}
            {siteConfig.socialLinks.linkedin && (
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center justify-between w-full px-6 py-3',
                  'border border-slate-700/70 light:border-slate-300 bg-slate-800/90 light:bg-white text-slate-200 light:text-slate-800',
                  'hover:text-white light:hover:text-slate-950 hover:bg-slate-800 light:hover:bg-slate-50 hover:border-slate-600/70 light:hover:border-slate-400',
                  'hover:shadow-md hover:shadow-slate-900/30 light:hover:shadow-slate-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 light:focus-visible:ring-offset-white',
                  'transition-all duration-200 rounded-md',
                  'text-sm font-medium'
                )}
              >
                <span>Contact on LinkedIn</span>
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

