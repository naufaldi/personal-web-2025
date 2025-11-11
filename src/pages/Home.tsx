import { ChevronRight } from 'lucide-react'
import HeroSection from '@/components/homepage/HeroSection'
import ExperienceSection from '@/components/homepage/ExperienceSection'
import PortfolioSection from '@/components/homepage/PortfolioSection'
import MentorSpeakerSection from '@/components/homepage/MentorSpeakerSection'
import FadeInUp from '@/components/common/FadeInUp'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-pattern" aria-hidden="true" />
      <HeroSection />
      <FadeInUp>
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="border-t border-slate-800/70" />
          <div className="flex items-center justify-between py-6">
            <p
              className="text-xs text-slate-500"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              Building with clarity, performance, and craft.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              Browse work
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </FadeInUp>
      <ExperienceSection />
      <PortfolioSection />
      <MentorSpeakerSection />
    </div>
  )
}
