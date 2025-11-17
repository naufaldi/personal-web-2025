import SpeakerMentorHero from '@/components/speaker/SpeakerMentorHero'
import ImpactStats from '@/components/speaker/ImpactStats'
import OrganizationMarquee from '@/components/speaker/OrganizationMarquee'
import VoluntaryWorkSection from '@/components/speaker/VoluntaryWorkSection'
import MentoringSection from '@/components/speaker/MentoringSection'
import SpeakingSection from '@/components/speaker/SpeakingSection'
import { Separator } from '@/components/ui/separator'

export default function Speaker() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 light:bg-slate-50">
      <div className="bg-pattern-speaker" aria-hidden="true" />
      <div className="mx-auto max-w-7xl sm:px-6 w-full py-20 md:py-16 relative z-10">
        <SpeakerMentorHero />
        <ImpactStats />

        <Separator className="my-8 bg-slate-800/70 light:bg-slate-200/80" />

        <OrganizationMarquee />

        <Separator className="my-8 bg-slate-800/70 light:bg-slate-200/80" />

        <VoluntaryWorkSection />

        <Separator className="my-8 bg-slate-800/70 light:bg-slate-200/80" />

        <MentoringSection />

        <Separator className="my-8 bg-slate-800/70 light:bg-slate-200/80" />

        <SpeakingSection />
      </div>
    </div>
  )
}
