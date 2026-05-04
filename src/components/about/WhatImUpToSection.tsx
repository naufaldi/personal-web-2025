import { currentActivities } from '@/data/about'
import FadeInUp from '@/components/common/FadeInUp'

export default function WhatImUpToSection() {
  return (
    <section className="border-b border-[var(--border-line)] py-10 md:py-14" aria-labelledby="what-im-up-to-heading">
      <FadeInUp delay={0.18}>
        <div className="mb-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_260px] md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-drawing-label">
              <span>04 // CURRENT_ACTIVITY</span>
              <span className="hidden h-px w-20 bg-[var(--border-line)] sm:block" />
            </div>
            <h2
              id="what-im-up-to-heading"
              className="text-section-title text-[var(--graphite)]"
            >
              Now Queue
            </h2>
          </div>
          <div className="border-l border-[var(--border-line)] pl-4 font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[var(--graphite-muted)]">
            <div>ROUTE: /ABOUT</div>
            <div>MODULE: CURRENT_NODE</div>
            <div>STATUS: ACTIVE</div>
          </div>
        </div>

        <div className="border border-[var(--border-line)] bg-[var(--paper)]">
          <div className="flex flex-col gap-2 border-b border-[var(--border-line)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--graphite-muted)] sm:flex-row sm:items-center sm:justify-between">
            <span>source: profile_state</span>
            <span>render: activity_rows</span>
          </div>
          <ul className="divide-y divide-[var(--border-line)]" aria-label="Current activity list">
            {currentActivities.map((activity, index) => (
              <FadeInUp key={activity.id} delay={0.24 + index * 0.05}>
                <li className="grid gap-4 px-4 py-5 transition-colors hover:bg-[var(--surface-subtle)] sm:grid-cols-[88px_minmax(0,1fr)_140px] sm:items-center">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--graphite-muted)]">
                    node_{String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-sm font-medium leading-7 text-[var(--graphite-muted)] md:text-base">
                    {activity.text}
                  </p>
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--status-green)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-green)]" />
                    active
                  </span>
                </li>
              </FadeInUp>
            ))}
          </ul>
        </div>
      </FadeInUp>
    </section>
  )
}
