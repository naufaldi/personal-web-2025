import { organizationLogos } from '@/data/speaker'
import CloudinaryImg from '@/components/ui/cloudinary-img'
import FadeInUp from '@/components/common/FadeInUp'

export default function OrganizationMarquee() {
  const duplicatedLogos = [...organizationLogos, ...organizationLogos]

  return (
    <section
      className="px-6 md:px-0 py-12 md:py-16 overflow-hidden"
      aria-labelledby="org-marquee-heading"
    >
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <FadeInUp delay={0.1}>
          <h2
            id="org-marquee-heading"
            className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight mb-8 font-mono font-medium"
          >
            Organizations I've Worked With
          </h2>
        </FadeInUp>

        {/* Animated marquee — visible when motion is allowed */}
        <div className="relative overflow-hidden motion-safe:block motion-reduce:hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
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
                    className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale opacity-70"
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
                  className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 rounded-md"
                  aria-label={`Visit ${logo.name} (opens in new tab)`}
                >
                  {content}
                </a>
              )
            })}
          </div>
        </div>

        {/* Static grid — visible when reduced motion is preferred */}
        <div className="motion-safe:hidden motion-reduce:grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
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
                  className="flex items-center justify-center h-16 grayscale opacity-70"
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
                className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 rounded-md"
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
