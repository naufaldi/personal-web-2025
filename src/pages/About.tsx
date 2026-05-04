import { GitBranch, MapPin, Network, UserRound, UsersRound } from 'lucide-react'
import AboutMeSection from '@/components/about/AboutMeSection'
import WhatImUpToSection from '@/components/about/WhatImUpToSection'
import ExperiencesSection from '@/components/about/ExperiencesSection'
import JourneyPhotoMarquee from '@/components/about/JourneyPhotoMarquee'
import FadeInUp from '@/components/common/FadeInUp'
import { aboutBio } from '@/data/about'

const profileSignals = [
  {
    label: 'Role',
    value: aboutBio.title,
  },
  {
    label: 'Location',
    value: 'Bekasi, Indonesia',
  },
  {
    label: 'Mentorship',
    value: '200+ people',
  },
  {
    label: 'Community',
    value: '14,000+ reach',
  },
]

function ProfileSystemGraph() {
  return (
    <svg
      viewBox="0 0 320 260"
      role="img"
      aria-labelledby="about-graph-title about-graph-desc"
      className="h-full w-full text-[var(--graphite-muted)]"
    >
      <title id="about-graph-title">About page profile system graph</title>
      <desc id="about-graph-desc">
        Identity, work, mentorship, location, and learning nodes connected into
        the about page interface.
      </desc>
      <rect
        x="28"
        y="28"
        width="264"
        height="204"
        fill="var(--paper)"
        stroke="var(--border-line)"
      />
      <path
        d="M58 72H262M58 132H262M58 192H262M94 48V212M160 48V212M226 48V212"
        stroke="var(--border-dashed)"
        strokeDasharray="4 6"
      />
      <path
        d="M94 132H160M160 132H226M160 132V72M160 132V192"
        stroke="var(--border-line)"
      />
      <g className="font-mono text-[10px] uppercase tracking-[0.18em]">
        <rect
          x="58"
          y="112"
          width="72"
          height="40"
          fill="var(--paper)"
          stroke="var(--border-line)"
        />
        <text x="94" y="136" textAnchor="middle" fill="currentColor">
          ID
        </text>
        <rect
          x="124"
          y="52"
          width="72"
          height="40"
          fill="var(--paper)"
          stroke="var(--border-line)"
        />
        <text x="160" y="76" textAnchor="middle" fill="currentColor">
          WORK
        </text>
        <rect
          x="190"
          y="112"
          width="72"
          height="40"
          fill="var(--paper)"
          stroke="var(--border-line)"
        />
        <text x="226" y="136" textAnchor="middle" fill="currentColor">
          MENTOR
        </text>
        <rect
          x="124"
          y="172"
          width="72"
          height="40"
          fill="var(--paper)"
          stroke="var(--border-line)"
        />
        <text x="160" y="196" textAnchor="middle" fill="var(--status-green)">
          GROW
        </text>
      </g>
      <circle cx="160" cy="132" r="5" fill="var(--status-green)" />
    </svg>
  )
}

export default function About() {
  return (
    <div className="drawing-sheet relative min-h-screen bg-[var(--paper)]">
      <div className="site-container relative z-10 w-full py-10 md:py-14">
        <FadeInUp delay={0.06}>
          <header className="relative overflow-hidden border border-[var(--border-line)] bg-[var(--paper)]/82 shadow-[var(--shadow-paper-xs)]">
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              aria-hidden="true"
            >
              <div className="absolute left-8 right-8 top-10 border-t border-dashed border-[var(--border-dashed)]" />
              <div className="absolute left-8 right-8 bottom-10 border-t border-dashed border-[var(--border-dashed)]" />
              <div className="absolute left-[36%] top-0 bottom-0 border-l border-dashed border-[var(--border-dashed)]" />
              <div className="absolute left-[68%] top-0 bottom-0 border-l border-dashed border-[var(--border-dashed)]" />
              <div className="absolute left-8 top-10 h-px w-40 bg-[var(--status-green)]" />
              <span className="coordinate-label absolute left-[36%] top-6 -translate-x-1/2">
                CURRENT_NODE
              </span>
              <span className="coordinate-label absolute left-[68%] top-6 -translate-x-1/2">
                PROFILE_GRAPH
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative px-5 py-10 sm:px-6 md:px-8 md:py-14 lg:pr-14">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-drawing-label">
                    <span>01 // IDENTITY</span>
                    <span className="hidden h-px w-16 bg-[var(--border-line)] sm:block" />
                  </div>
                  <div className="hidden gap-6 text-drawing-label sm:flex">
                    <span>src/pages/About.tsx</span>
                    <span>route:/about</span>
                  </div>
                </div>

                <div className="relative isolate max-w-4xl overflow-hidden border border-[var(--border-line)] bg-[var(--paper)] px-4 py-5 sm:px-6 md:px-7">
                  <div
                    className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
                    aria-hidden="true"
                  >
                    <div className="absolute left-[8%] right-[8%] top-[50%] border-t border-dashed border-[var(--border-dashed)]" />
                    <div className="absolute left-[48%] top-[12%] bottom-[12%] border-l border-dashed border-[var(--border-dashed)]" />
                    <div className="absolute right-5 top-5 border border-[var(--border-line)] bg-[var(--paper)]/76 p-2 font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-[var(--graphite-muted)]">
                      <div>GET /about</div>
                      <div>DATA - TSX</div>
                      <div>VITE OK</div>
                    </div>
                    <div className="absolute right-12 bottom-5 grid grid-cols-3 gap-1">
                      <span className="h-2 w-2 bg-[var(--status-green)]" />
                      <span className="h-2 w-2 bg-[var(--border-line)]" />
                      <span className="h-2 w-2 bg-[var(--border-line)]" />
                      <span className="h-2 w-2 bg-[var(--border-line)]" />
                      <span className="h-2 w-2 bg-[var(--status-green)]" />
                      <span className="h-2 w-2 bg-[var(--border-line)]" />
                    </div>
                  </div>
                  <h1 className="relative z-10 inline-block bg-[var(--paper)] pr-5 font-mono text-[44px] font-medium leading-[0.98] tracking-normal text-[var(--graphite)] sm:text-[72px] md:text-[96px]">
                    About
                    <br />
                    Me
                  </h1>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
                  <p className="text-body-readable text-base font-medium md:text-lg">
                    A personal system profile: engineering foundations,
                    mentorship signal, community influence, and the current
                    direction from frontend execution toward broader product
                    delivery.
                  </p>
                  <div className="border-l border-[var(--border-line)] pl-4 font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[var(--graphite-muted)]">
                    <div>ROUTE: /ABOUT</div>
                    <div>SOURCE: PROFILE_DATA</div>
                    <div>RENDER: IDENTITY_MAP</div>
                  </div>
                </div>
              </div>

              <aside className="border-t border-[var(--border-line)] px-5 py-8 sm:px-6 lg:border-l lg:border-t-0 lg:px-8 lg:py-12">
                <div className="mb-9 flex items-center justify-between gap-4 text-drawing-label">
                  <span>02 // BUILD_META</span>
                  <span>BUILD:2026</span>
                </div>

                <dl className="grid grid-cols-2 gap-px border border-[var(--border-line)] bg-[var(--border-line)]">
                  {profileSignals.map((signal) => (
                    <div key={signal.label} className="bg-[var(--paper)] px-4 py-5">
                      <dt className="text-drawing-label">{signal.label}</dt>
                      <dd className="mt-2 font-mono text-sm uppercase tracking-[0.12em] text-[var(--graphite)]">
                        {signal.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--status-green)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--status-green)]" />
                  <span>PROFILE_READY</span>
                </div>

                <div className="mt-10 hidden border border-dashed border-[var(--border-dashed)] p-4 lg:block">
                  <div className="mb-4 flex items-center justify-between gap-4 text-drawing-label">
                    <span>Profile graph</span>
                    <Network className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div className="aspect-[1.23] overflow-hidden">
                    <ProfileSystemGraph />
                  </div>
                </div>

                <div className="mt-8 grid gap-3 border-t border-[var(--border-line)] pt-5 font-mono text-[10px] uppercase leading-6 tracking-[0.18em] text-[var(--graphite-muted)]">
                  <div className="flex items-center gap-2">
                    <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{aboutBio.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Bekasi, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersRound className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Mentor route active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Branch: broader_engineering</span>
                  </div>
                </div>
              </aside>
            </div>
          </header>
        </FadeInUp>

        <AboutMeSection />
        <WhatImUpToSection />
        <JourneyPhotoMarquee />
        <ExperiencesSection />
      </div>
    </div>
  )
}
