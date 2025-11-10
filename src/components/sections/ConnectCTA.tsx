import { Twitter, Linkedin } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib'

export default function ConnectCTA() {
  return (
    <section className="bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Connect with me
          </h2>
          <p className="text-sm md:text-base text-slate-400 mb-6 leading-relaxed">
            Don't miss out 😉. Get updates on my latest work and insights.
          </p>
          <div className="flex flex-col gap-3">
            {siteConfig.socialLinks.twitter && (
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center justify-between w-full px-4 py-3',
                  'bg-black border border-slate-600 text-white',
                  'hover:bg-black hover:text-white hover:border-slate-400',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                  'transition-colors duration-200 rounded-md',
                  'text-sm font-medium'
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
                  'inline-flex items-center justify-between w-full px-4 py-3',
                  'bg-black border border-slate-600 text-white',
                  'hover:bg-black hover:text-white hover:border-slate-400',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                  'transition-colors duration-200 rounded-md',
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

