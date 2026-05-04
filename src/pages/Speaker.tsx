import SpeakerMentorHero from '@/components/speaker/SpeakerMentorHero'
import ImpactStats from '@/components/speaker/ImpactStats'
import OrganizationMarquee from '@/components/speaker/OrganizationMarquee'
import VoluntaryWorkSection from '@/components/speaker/VoluntaryWorkSection'
import MentoringSection from '@/components/speaker/MentoringSection'
import SpeakingSection from '@/components/speaker/SpeakingSection'

export default function Speaker() {
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
