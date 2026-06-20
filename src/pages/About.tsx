import { useMemo } from 'react'
import { BriefcaseBusiness, UserRound } from 'lucide-react'
import AboutMeSection from '@/components/about/AboutMeSection'
import WhatImUpToSection from '@/components/about/WhatImUpToSection'
import ExperiencesSection from '@/components/about/ExperiencesSection'
import JourneyPhotoMarquee from '@/components/about/JourneyPhotoMarquee'
import BlueprintCommandHero from '@/components/design-system/BlueprintCommandHero'
import { aboutBio } from '@/data/about'
import { usePageMeta } from '@/hooks/usePageMeta'
import { getStaticRouteMeta } from '@/lib/seo'

export default function About() {
  const meta = useMemo(() => {
    const route = getStaticRouteMeta('/about')
    return {
      title: route?.title ?? 'About',
      description: route?.description ?? '',
      path: '/about',
    }
  }, [])

  usePageMeta(meta)

  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--graphite)]">
      <BlueprintCommandHero
        eyebrow="IDENTITY"
        title="About Me"
        titleId="about-hero-heading"
        subtitle={aboutBio.title}
        description="A personal system profile: engineering foundations, mentorship signal, community influence, and the current direction from frontend execution toward broader product delivery."
        metadata={['Product systems', 'Mentorship signal', 'Community reach']}
        routes={[
          {
            index: '01',
            label: 'Read profile',
            href: '#about-me-heading',
            icon: <UserRound className="h-4 w-4" aria-hidden="true" />,
          },
          {
            index: '02',
            label: 'Work history',
            href: '#experiences-heading',
            icon: <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />,
          },
        ]}
        footerMetadata={[aboutBio.name, 'Bekasi, Indonesia', 'mentor route active']}
        statusLabel="PROFILE_READY"
      />

      <div className="site-container relative z-10 w-full">
        <AboutMeSection />
        <WhatImUpToSection />
        <JourneyPhotoMarquee />
        <ExperiencesSection />
      </div>
    </div>
  )
}
