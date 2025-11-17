import { User } from 'lucide-react'
import AboutMeSection from '@/components/about/AboutMeSection'
import WhatImUpToSection from '@/components/about/WhatImUpToSection'
import ExperiencesSection from '@/components/about/ExperiencesSection'
import JourneyPhotoMarquee from '@/components/about/JourneyPhotoMarquee'
import FadeInUp from '@/components/common/FadeInUp'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 light:bg-slate-50">
      <div className="bg-pattern-about" aria-hidden="true" />
      <div className="mx-auto max-w-7xl sm:px-6 w-full py-20 md:py-16 relative z-10">
        <FadeInUp delay={0.06}>
          <div className="px-6 md:px-0 flex flex-col items-center gap-4 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/70 bg-slate-900/60 light:bg-white/80">
              <User className="h-6 w-6 text-slate-300 light:text-slate-700" />
            </div>
            <h1
              className="text-4xl md:text-5xl text-center"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
              }}
            >
              <span className="text-slate-100 light:text-slate-900">About </span>
              <span className="text-slate-300 light:text-slate-600">Me</span>
            </h1>
            <p
              className="text-sm md:text-base text-slate-500 light:text-slate-600 text-center"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              A story of growth and discovery
            </p>
          </div>
        </FadeInUp>

        <AboutMeSection />
        <WhatImUpToSection />
        <JourneyPhotoMarquee />
        <ExperiencesSection />
      </div>
    </div>
  )
}
