import { journeyPhotos } from '@/data/about'
import FadeInUp from '@/components/common/FadeInUp'

export default function JourneyPhotoMarquee() {
  const duplicatedPhotos = [...journeyPhotos, ...journeyPhotos]

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <FadeInUp delay={0.12}>
          <div className="relative overflow-hidden marquee-container">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {duplicatedPhotos.map((photo, index) => (
                <div
                  key={`${photo.id}-${index}`}
                  className="flex-shrink-0 h-48 w-64 md:h-56 md:w-72 rounded-lg overflow-hidden grayscale transition-all duration-300 opacity-90"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

