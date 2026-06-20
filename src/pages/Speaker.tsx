import { useMemo } from 'react'
import SpeakerMentorHero from '@/components/speaker/SpeakerMentorHero'
import ImpactStats from '@/components/speaker/ImpactStats'
import OrganizationMarquee from '@/components/speaker/OrganizationMarquee'
import VoluntaryWorkSection from '@/components/speaker/VoluntaryWorkSection'
import MentoringSection from '@/components/speaker/MentoringSection'
import SpeakingSection from '@/components/speaker/SpeakingSection'
import { usePageMeta } from '@/hooks/usePageMeta'
import { getStaticRouteMeta } from '@/lib/seo'

export default function Speaker() {
  const meta = useMemo(() => {
    const route = getStaticRouteMeta('/speaker')
    return {
      title: route?.title ?? 'Speaker & Mentor',
      description: route?.description ?? '',
      path: '/speaker',
    }
  }, [])

  usePageMeta(meta)

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--paper)] text-[var(--graphite)]">
      <div className="drawing-sheet">
        <SpeakerMentorHero />
        <ImpactStats />
        <OrganizationMarquee />
        <VoluntaryWorkSection />
        <MentoringSection />
        <SpeakingSection />
      </div>
    </div>
  )
}
