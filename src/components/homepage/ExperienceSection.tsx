import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { getLatestExperiences } from '@/data/experience'
import ExperienceCard from './ExperienceCard'

export default function ExperienceSection() {
  const latestExperiences = getLatestExperiences(4)

  return (
    <section id="experience" className="bg-slate-950 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="space-y-8">
          {/* Header */}
          <div
            className="space-y-2"
            style={{
              animation: 'fade-in-up 800ms ease-out both',
              animationDelay: '60ms',
            }}
          >
            <h2
              className="text-[24px] md:text-[28px] text-slate-100 tracking-tight"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              Experience
            </h2>
            <p
              className="text-sm text-slate-500 max-w-2xl"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              Building products and leading teams across startups and companies
            </p>
          </div>

          {/* Experience Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            style={{
              animation: 'fade-in 900ms ease-out both',
              animationDelay: '120ms',
            }}
          >
            {latestExperiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div
            className="flex justify-center pt-4"
            style={{
              animation: 'fade-in 900ms ease-out both',
              animationDelay: `${120 + latestExperiences.length * 100}ms`,
            }}
          >
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 rounded-md border border-slate-800/70 bg-slate-900/60 px-6 py-3 text-sm text-slate-300 transition-all duration-200 hover:text-slate-100 hover:border-slate-700/70 hover:bg-slate-900/90 hover:shadow-md hover:shadow-slate-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
              }}
            >
              View all experience
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
