import { journeyPhotos } from '@/data/about'
import FadeInUp from '@/components/common/FadeInUp'
import CloudinaryImg from '@/components/ui/cloudinary-img'

export default function JourneyPhotoMarquee() {
  const duplicatedPhotos = [...journeyPhotos, ...journeyPhotos]

  return (
    <section className="overflow-hidden border-b border-[var(--border-line)] py-10 md:py-14" aria-label="Journey photo gallery" role="region">
      <FadeInUp delay={0.12}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-drawing-label">
              <span>05 // INFLUENCE_LOG</span>
              <span className="hidden h-px w-20 bg-[var(--border-line)] sm:block" />
            </div>
            <h2 className="text-section-title text-[var(--graphite)]">
              Field Signals
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[var(--graphite-muted)]">
            <div>source: cloudinary</div>
            <div>render: media_strip</div>
          </div>
        </div>

        <div className="border border-[var(--border-line)] bg-[var(--paper)]">
          <div className="flex flex-col gap-2 border-b border-[var(--border-line)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--graphite-muted)] sm:flex-row sm:items-center sm:justify-between">
            <span>asset.collection</span>
            <span>items:{journeyPhotos.length}</span>
          </div>
          <div className="relative overflow-hidden marquee-container">
            <div className="flex gap-px animate-marquee whitespace-nowrap bg-[var(--border-line)]">
              {duplicatedPhotos.map((photo, index) => (
                <figure
                  key={`${photo.id}-${index}`}
                  className="group relative h-48 w-64 flex-shrink-0 overflow-hidden bg-[var(--paper)] md:h-56 md:w-72"
                >
                  <CloudinaryImg
                    publicId={photo.imageUrl}
                    width={288}
                    height={224}
                    alt={photo.alt}
                    noStyle
                    preview={false}
                    imgClassName="object-cover grayscale transition duration-300 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 border-t border-[var(--border-line)] bg-[var(--paper)]/88 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--graphite-muted)]">
                    log_{String((index % journeyPhotos.length) + 1).padStart(2, '0')}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-[var(--border-line)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--status-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-green)]" />
            influence_log_ready
          </div>
        </div>
      </FadeInUp>
    </section>
  )
}
