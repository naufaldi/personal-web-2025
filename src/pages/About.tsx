import { User } from 'lucide-react'
import AboutMeSection from '@/components/about/AboutMeSection'
import WhatImUpToSection from '@/components/about/WhatImUpToSection'
import ExperiencesSection from '@/components/about/ExperiencesSection'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-pattern-about" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 w-full py-12 md:py-16 relative z-10">
        <div
          className="flex flex-col items-center gap-4 mb-12"
          style={{
            animation: 'fade-in 900ms ease-out both',
            animationDelay: '60ms',
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/60">
            <User className="h-6 w-6 text-slate-300" />
          </div>
          <h1
            className="text-4xl md:text-5xl text-center"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}
          >
            <span className="text-slate-100">About </span>
            <span className="text-slate-300">Me</span>
          </h1>
          <p
            className="text-sm md:text-base text-slate-500 text-center"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            A story of growth and discovery
          </p>
        </div>

        <AboutMeSection />
        <WhatImUpToSection />
        <ExperiencesSection />
      </div>
    </div>
  )
}

