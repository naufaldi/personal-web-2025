import { organizationLogos } from '@/data/speaker'
import CloudinaryImg from '@/components/ui/cloudinary-img'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function OrganizationMarquee() {
  const duplicatedLogos = [...organizationLogos, ...organizationLogos]

  return (
    <section
      className="overflow-hidden py-12 md:py-16"
      aria-labelledby="org-marquee-heading"
    >
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="04"
            label="ORG_SIGNAL"
            title="Organizations"
            titleId="org-marquee-heading"
            description="Communities, bootcamps, and learning spaces connected to the mentoring and speaking work."
            action={
              <TechnicalLabel variant="status">
                {organizationLogos.length} LOGOS
              </TechnicalLabel>
            }
          />
        </FadeInUp>

        <div className="relative mt-8 overflow-hidden border-y border-[var(--border-line)] py-5 motion-safe:block motion-reduce:hidden">
          <div className="flex gap-px animate-marquee whitespace-nowrap hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {duplicatedLogos.map((logo, index) => {
              const content = (
                <CloudinaryImg
                  publicId={logo.logoUrl}
                  width={128}
                  height={64}
                  alt={logo.name}
                  preview={false}
                  noStyle
                  imgClassName="object-contain"
                />
              )

              if (!logo.websiteUrl) {
                return (
                  <span
                    key={`${logo.name}-${index}`}
                    className="flex h-20 w-40 flex-shrink-0 items-center justify-center border-x border-[var(--border-line)] bg-[var(--paper)] grayscale opacity-60"
                  >
                    {content}
                  </span>
                )
              }

              return (
                <a
                  key={`${logo.name}-${index}`}
                  href={logo.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-20 w-40 flex-shrink-0 items-center justify-center border-x border-[var(--border-line)] bg-[var(--paper)] grayscale opacity-60 transition-all duration-300 hover:bg-[var(--surface-subtle)] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
                  aria-label={`Visit ${logo.name} (opens in new tab)`}
                >
                  {content}
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid-cols-2 gap-px border-y border-[var(--border-line)] bg-[var(--border-line)] motion-safe:hidden motion-reduce:grid sm:grid-cols-4 md:grid-cols-6">
          {organizationLogos.map((logo) => {
            const content = (
              <CloudinaryImg
                publicId={logo.logoUrl}
                width={128}
                height={64}
                alt={logo.name}
                preview={false}
                noStyle
                imgClassName="object-contain"
              />
            )

            if (!logo.websiteUrl) {
              return (
                <span
                  key={logo.name}
                  className="flex h-20 items-center justify-center bg-[var(--paper)] grayscale opacity-60"
                >
                  {content}
                </span>
              )
            }

            return (
              <a
                key={logo.name}
                href={logo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-20 items-center justify-center bg-[var(--paper)] grayscale opacity-60 transition-all duration-300 hover:bg-[var(--surface-subtle)] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
                aria-label={`Visit ${logo.name} (opens in new tab)`}
              >
                {content}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
