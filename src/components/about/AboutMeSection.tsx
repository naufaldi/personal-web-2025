import { User } from 'lucide-react'
import ProfilePicture from './ProfilePicture'
import TechStack from './TechStack'
import { aboutBio, techStack } from '@/data/about'

export default function AboutMeSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div
            className="flex justify-center md:justify-start"
            style={{
              animation: 'fade-in 900ms ease-out both',
              animationDelay: '60ms',
            }}
          >
            <ProfilePicture
              imageUrl={aboutBio.profileImageUrl}
              signature={aboutBio.signature}
            />
          </div>

          <div
            className="space-y-6"
            style={{
              animation: 'fade-in 900ms ease-out both',
              animationDelay: '120ms',
            }}
          >
            <div className="space-y-2">
              <h2
                className="text-3xl md:text-4xl text-slate-100"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                }}
              >
                {aboutBio.name}
              </h2>
              <p
                className="text-base md:text-lg text-slate-400"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                {aboutBio.title}
              </p>
            </div>

            <div className="space-y-4">
              {aboutBio.bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm md:text-base text-slate-300 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4">
              <p
                className="mb-4 text-sm text-slate-400"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                I am also a full-stack engineer, here are my current favorite tech stack:
              </p>
              <TechStack items={techStack} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

