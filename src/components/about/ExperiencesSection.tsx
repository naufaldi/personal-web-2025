import ReactMarkdown from 'react-markdown'
import { workExperiences } from '@/data/experience'
import FadeInUp from '@/components/common/FadeInUp'

export default function ExperiencesSection() {
  return (
    <section className="py-10 md:py-14" aria-labelledby="experiences-heading">
      <div className="space-y-8">
        <FadeInUp delay={0.06}>
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3 text-drawing-label">
                <span>06 // EXPERIENCE_TRACE</span>
                <span className="hidden h-px w-20 bg-[var(--border-line)] sm:block" />
              </div>
              <h2
                id="experiences-heading"
                className="text-section-title text-[var(--graphite)]"
              >
                Experiences
              </h2>
            </div>
            <div className="border-l border-[var(--border-line)] pl-4 font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[var(--graphite-muted)]">
              <div>source: data/experience.ts</div>
              <div>render: work_rows</div>
              <div>records: {workExperiences.length}</div>
            </div>
          </div>
        </FadeInUp>

        <div className="border border-[var(--border-line)] bg-[var(--paper)]">
          <div className="flex flex-col gap-2 border-b border-[var(--border-line)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--graphite-muted)] sm:flex-row sm:items-center sm:justify-between">
            <span>work.history</span>
            <span>status:published</span>
          </div>
          <div className="divide-y divide-[var(--border-line)]">
            {workExperiences.map((experience, index) => {
              const endDate =
                experience.endDate === 'Present'
                  ? 'PRESENT'
                  : experience.endDate

              return (
                <FadeInUp key={experience.id} delay={0.12 + index * 0.1}>
                  <article className="grid gap-px bg-[var(--border-line)] lg:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="bg-[var(--surface-subtle)] p-4 sm:p-5">
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <span className="text-drawing-label">
                          exp_{String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-green)]" />
                      </div>
                      <p className="font-mono text-xs uppercase leading-6 tracking-[0.16em] text-[var(--graphite)]">
                        {experience.startDate}
                        <br />
                        {endDate}
                      </p>
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--graphite-muted)]">
                        {experience.employmentType.replace('-', '_')}
                      </p>
                    </div>

                    <div className="bg-[var(--paper)] p-4 sm:p-5 md:p-6">
                      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
                        <div className="space-y-2">
                          <h3 className="font-mono text-xl font-medium leading-tight text-[var(--graphite)] md:text-2xl">
                            {experience.role}
                          </h3>
                          <p className="font-body text-base font-medium text-[var(--graphite-muted)]">
                            {experience.companyName}
                          </p>
                        </div>
                        <div className="border-l border-[var(--border-line)] pl-4 font-mono text-[10px] uppercase leading-6 tracking-[0.18em] text-[var(--graphite-muted)]">
                          <div>company: {experience.companyName}</div>
                          <div>type: {experience.employmentType}</div>
                          <div>state: shipped</div>
                        </div>
                      </div>

                      <p className="mt-5 max-w-3xl font-body text-sm leading-7 text-[var(--graphite-muted)] md:text-base md:leading-8">
                        {experience.description}
                      </p>

                      {experience.keyAchievementsMarkdown && (
                        <div className="mt-5 border-l border-dashed border-[var(--border-dashed)] pl-4">
                          <ReactMarkdown
                            components={{
                              ul: ({ children }) => (
                                <ul className="m-0 list-none space-y-2 font-body text-sm leading-7 text-[var(--graphite-muted)]">
                                  {children}
                                </ul>
                              ),
                              li: ({ children }) => (
                                <li className="grid gap-3 sm:grid-cols-[34px_minmax(0,1fr)]">
                                  <span className="mt-3 h-px bg-[var(--border-line)]" aria-hidden="true" />
                                  <span>{children}</span>
                                </li>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold text-[var(--graphite)]">
                                  {children}
                                </strong>
                              ),
                              p: ({ children }) => (
                                <p className="font-body text-sm leading-7 text-[var(--graphite-muted)]">
                                  {children}
                                </p>
                              ),
                            }}
                          >
                            {experience.keyAchievementsMarkdown}
                          </ReactMarkdown>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[var(--border-line)] pt-4">
                        {experience.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="border border-[var(--border-line)] bg-[var(--paper)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--graphite-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </FadeInUp>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
