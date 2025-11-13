import { organizationLogos } from '@/data/speaker'
import CloudinaryImg from '@/components/ui/cloudinary-img'

export default function OrganizationMarquee() {
  const duplicatedLogos = [...organizationLogos, ...organizationLogos]

  return (
    <section className="px-6 md:px-0 py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <h2
          className="text-[24px] md:text-[28px] text-slate-100 tracking-tight mb-8"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            animation: 'fade-in-up 800ms ease-out both',
            animationDelay: '60ms',
          }}
        >
          Organizations I've Worked With
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {duplicatedLogos.map((logo, index) => (
              <a
                key={`${logo.name}-${index}`}
                href={logo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                aria-label={`Visit ${logo.name}`}
              >
                <CloudinaryImg
                  publicId={logo.logoUrl}
                  width={128}
                  height={64}
                  alt={logo.name}
                  preview={false}
                  noStyle
                  imgClassName="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

