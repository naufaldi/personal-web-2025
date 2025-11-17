import { Briefcase } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { workExperiences } from '@/data/experience'
import FadeInUp from '@/components/common/FadeInUp'

export default function ExperiencesSection() {
  return (
    <section className="px-6 md:px-0 py-12 md:py-16 relative">
      <div className="bg-orbs-experiences" aria-hidden="true" />
      <div className="mx-auto max-w-7xl sm:px-6 w-full relative z-10">
        <div className="space-y-12">
          <FadeInUp delay={0.06}>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/70 bg-slate-900/60 light:bg-white/80">
                <Briefcase className="h-6 w-6 text-slate-300 light:text-slate-700" />
              </div>
              <h2
                className="text-3xl md:text-4xl text-slate-100 light:text-slate-900 text-center"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                }}
              >
                Experiences
              </h2>
            </div>
          </FadeInUp>

          <div className="space-y-8">
            {workExperiences.map((experience, index) => {
              const endDate =
                experience.endDate === 'Present'
                  ? 'PRESENT'
                  : experience.endDate

              return (
                <FadeInUp key={experience.id} delay={0.12 + index * 0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-6 md:gap-12">
                  <div className="md:pt-1">
                    <p
                      className="text-sm text-slate-400 light:text-slate-600 uppercase"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                      }}
                    >
                      {experience.startDate} — {endDate}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3
                        className="text-xl md:text-2xl text-slate-100 light:text-slate-900"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                        }}
                      >
                        {experience.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        {experience.logoUrl && (
                          <div className="h-4 w-4 rounded bg-slate-700 light:bg-slate-300" />
                        )}
                        <p
                          className="text-base text-slate-300 light:text-slate-700"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500,
                          }}
                        >
                          {experience.companyName}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-slate-400 light:text-slate-600 leading-relaxed">
                      {experience.description}
                    </p>

                    {experience.keyAchievementsMarkdown && (
                      <div className="pt-2">
                        <ReactMarkdown
                          components={{
                            ul: ({ children }) => (
                              <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-slate-300 light:text-slate-700">
                                {children}
                              </ul>
                            ),
                            li: ({ children }) => (
                              <li className="pl-2">{children}</li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-slate-200 light:text-slate-900">
                                {children}
                              </strong>
                            ),
                            p: ({ children }) => (
                              <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                                {children}
                              </p>
                            ),
                          }}
                        >
                          {experience.keyAchievementsMarkdown}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
                </FadeInUp>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
