import { Mic } from 'lucide-react'

export default function SpeakerMentorHero() {
  return (
    <div
      className="flex flex-col items-center gap-4 mb-12"
      style={{
        animation: 'fade-in 900ms ease-out both',
        animationDelay: '60ms',
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/60">
        <Mic className="h-6 w-6 text-slate-300" />
      </div>
      <h1
        className="text-4xl md:text-5xl text-center"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
        }}
      >
        <span className="text-slate-100">Speaker </span>
        <span className="text-slate-300">& Mentor</span>
      </h1>
      <p
        className="text-sm md:text-base text-slate-500 text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
        }}
      >
        Empowering developers through knowledge sharing and mentorship
      </p>
    </div>
  )
}

