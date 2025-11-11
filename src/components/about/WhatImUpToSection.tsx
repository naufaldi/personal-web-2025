import { Sparkles } from 'lucide-react'
import { currentActivities } from '@/data/about'

export default function WhatImUpToSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div
          className="rounded-lg border border-slate-800/70 bg-slate-900/60 p-6 md:p-8"
          style={{
            animation: 'fade-in 900ms ease-out both',
            animationDelay: '180ms',
          }}
        >
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
              <li
                key={activity.id}
                className="pl-2"
                style={{
                  animation: 'fade-in 900ms ease-out both',
                  animationDelay: `${240 + index * 50}ms`,
                }}
              >
                {activity.emoji && <span className="mr-2">{activity.emoji}</span>}
                {activity.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

