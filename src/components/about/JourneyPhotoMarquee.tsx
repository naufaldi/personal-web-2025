import { journeyPhotos } from '@/data/about'
import FadeInUp from '@/components/common/FadeInUp'
import CloudinaryImg from '@/components/ui/cloudinary-img'

export default function JourneyPhotoMarquee() {
  const duplicatedPhotos = [...journeyPhotos, ...journeyPhotos]

  return (
    <section className="px-6 md:px-0 py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <FadeInUp delay={0.12}>
          <div className="relative overflow-hidden marquee-container">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {duplicatedPhotos.map((photo, index) => (
                <div
                  key={`${photo.id}-${index}`}
                  className="flex-shrink-0 h-48 w-64 md:h-56 md:w-72 rounded-lg overflow-hidden grayscale transition-all duration-300 opacity-90"
                >
                  <CloudinaryImg
                    publicId={photo.imageUrl}
                    width={288}
                    height={224}
                    alt={photo.alt}
                    noStyle
                    preview={false}
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

