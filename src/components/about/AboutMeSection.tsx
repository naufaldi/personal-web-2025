import ProfilePicture from '@/components/about/ProfilePicture'
import TechStack from '@/components/about/TechStack'
import { aboutBio, techStack } from '@/data/about'
import FadeInUp from '@/components/common/FadeInUp'

export default function AboutMeSection() {
  return (
    <section className="border-b border-[var(--border-line)] py-10 md:py-14" aria-labelledby="about-me-heading">
      <div className="mb-6 flex items-center gap-3 text-drawing-label">
        <span>03 // CURRENT_NODE</span>
        <span className="hidden h-px flex-1 bg-[var(--border-line)] sm:block" />
        <span className="hidden sm:inline">source:data/about.ts</span>
      </div>

      <div className="grid grid-cols-1 gap-px border border-[var(--border-line)] bg-[var(--border-line)] lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="bg-[var(--paper)] p-5 sm:p-6 md:p-8">
          <FadeInUp delay={0.06}>
            <ProfilePicture
              imageUrl={aboutBio.profileImageUrl}
              signature={aboutBio.signature}
            />
          </FadeInUp>
        </div>

        <div className="bg-[var(--paper)] p-5 sm:p-6 md:p-8">
          <FadeInUp delay={0.12}>
            <div className="space-y-7">
              <div className="flex flex-col gap-5 border-b border-[var(--border-line)] pb-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <p className="text-drawing-label">identity.record</p>
                  <h2
                    id="about-me-heading"
                    className="font-mono text-3xl font-medium leading-tight text-[var(--graphite)] md:text-5xl"
                  >
                    {aboutBio.name}
                  </h2>
                  <p className="font-body text-base font-medium text-[var(--graphite-muted)] md:text-lg">
                    {aboutBio.title}
                  </p>
                </div>
                <div className="border-l border-[var(--border-line)] pl-4 font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[var(--graphite-muted)]">
                  <div>NODE: PERSONAL_PROFILE</div>
                  <div>LOCATION: BEKASI</div>
                  <div>STATUS: GROWING</div>
                </div>
              </div>

              <div className="space-y-5">
                {aboutBio.bioParagraphs.map((paragraph, index) => (
                  <div
                    key={paragraph}
                    className="grid gap-4 border-b border-dashed border-[var(--border-dashed)] pb-5 last:border-b-0 last:pb-0 md:grid-cols-[72px_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--graphite-muted)]">
                      p_{String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="font-body text-sm font-normal leading-7 text-[var(--graphite-muted)] md:text-base md:leading-8">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border-line)] pt-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-drawing-label">skill_graph</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--status-green)]">
                    stack_ready
                  </span>
                </div>
                <p className="mb-4 text-body-readable text-sm">
                  Current favorite stack for product engineering and full-stack
                  systems work.
                </p>
                <TechStack items={techStack} />
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
