import { Sparkles } from 'lucide-react'
import { currentActivities } from '@/data/about'
import FadeInUp from '@/components/common/FadeInUp'

export default function WhatImUpToSection() {
  return (
    <section className="px-6 md:px-0 py-12 md:py-16">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <FadeInUp delay={0.18}>
          <div className="rounded-lg border border-slate-800/70 bg-slate-900/60 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-800/60">
                <Sparkles className="h-5 w-5 text-slate-300" />
              </div>
              <h2
                className="text-2xl md:text-3xl text-slate-100"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                }}
              >
                What I'm up to now
              </h2>
            </div>

            <ul className="list-disc list-outside ml-6 space-y-3 text-sm md:text-base text-slate-300">
              {currentActivities.map((activity, index) => (
                <FadeInUp key={activity.id} delay={0.24 + index * 0.05}>
                  <li className="pl-2">
                    {activity.emoji && <span className="mr-2">{activity.emoji}</span>}
                    {activity.text}
                  </li>
                </FadeInUp>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

