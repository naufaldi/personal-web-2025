import FadeInUp from "@/components/common/FadeInUp";
import PortfolioCard from "@/components/homepage/PortfolioCard";
import { portfolioItems } from "@/data/portfolio";

const formatLatestDate = (dateString?: string) => {
  if (!dateString) {
    return "N/A";
  }

  return new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
};

const uniqueStacks = Array.from(
  new Set(portfolioItems.flatMap((item) => item.techStack))
);

const latestProject = portfolioItems.find((item) => item.date);

const RouteChipGraph = () => (
  <svg
    viewBox="0 0 320 320"
    role="img"
    aria-labelledby="route-chip-title route-chip-desc"
    className="h-full w-full text-[var(--graphite-muted)]"
  >
    <title id="route-chip-title">Route chip graph</title>
    <desc id="route-chip-desc">
      Project markdown files move through data, card, link, and UI nodes.
    </desc>
    <rect
      x="28"
      y="28"
      width="264"
      height="264"
      fill="var(--paper)"
      stroke="var(--border-line)"
    />
    <rect
      x="72"
      y="72"
      width="176"
      height="176"
      fill="none"
      stroke="var(--border-dashed)"
      strokeDasharray="4 5"
    />
    <path
      d="M88 112H42M88 152H42M88 192H42M278 112H232M278 152H232M278 192H232"
      stroke="var(--border-line)"
    />
    <path
      d="M128 48V88M160 48V88M192 48V88M128 232V272M160 232V272M192 232V272"
      stroke="var(--border-line)"
    />
    <path
      d="M106 106H214V214H106V106Z"
      fill="var(--paper)"
      stroke="var(--border-line)"
    />
    <path
      d="M126 126H178V178H140V154H160V144H126V126Z"
      fill="none"
      stroke="var(--status-green)"
      strokeWidth="2"
    />
    <path
      d="M178 126C210 126 226 142 226 166C226 198 202 214 170 214H126"
      fill="none"
      stroke="var(--border-dashed)"
      strokeDasharray="4 5"
    />
    <path
      d="M82 88H128M192 88H238M82 232H128M192 232H238M82 88V232M238 88V232"
      stroke="var(--border-dashed)"
      strokeDasharray="4 5"
    />
    <g className="font-mono text-[11px] uppercase tracking-[0.18em]">
      <rect
        x="60"
        y="72"
        width="44"
        height="32"
        fill="var(--paper)"
        stroke="var(--border-line)"
      />
      <text x="82" y="92" textAnchor="middle" fill="currentColor">
        MD
      </text>
      <rect
        x="216"
        y="72"
        width="44"
        height="32"
        fill="var(--paper)"
        stroke="var(--border-line)"
      />
      <text x="238" y="92" textAnchor="middle" fill="currentColor">
        DATA
      </text>
      <rect
        x="54"
        y="216"
        width="56"
        height="32"
        fill="var(--paper)"
        stroke="var(--border-line)"
      />
      <text x="82" y="236" textAnchor="middle" fill="currentColor">
        CARD
      </text>
      <rect
        x="210"
        y="216"
        width="56"
        height="32"
        fill="var(--paper)"
        stroke="var(--border-line)"
      />
      <text x="238" y="236" textAnchor="middle" fill="currentColor">
        LINK
      </text>
      <rect
        x="136"
        y="266"
        width="48"
        height="28"
        fill="var(--paper)"
        stroke="var(--border-line)"
      />
      <text x="160" y="284" textAnchor="middle" fill="var(--status-green)">
        UI
      </text>
    </g>
  </svg>
);

export default function Projects() {
  return (
    <div className="drawing-sheet min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14">
        <FadeInUp delay={0.06}>
          <header className="relative overflow-hidden border border-[var(--border-line)] bg-[var(--paper)]/82 shadow-[var(--shadow-paper-xs)]">
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              aria-hidden="true"
            >
              <div className="absolute left-8 right-8 top-10 border-t border-dashed border-[var(--border-dashed)]" />
              <div className="absolute left-8 right-8 bottom-10 border-t border-dashed border-[var(--border-dashed)]" />
              <div className="absolute left-[35%] top-0 bottom-0 border-l border-dashed border-[var(--border-dashed)]" />
              <div className="absolute left-[68%] top-0 bottom-0 border-l border-dashed border-[var(--border-dashed)]" />
              <div className="absolute left-8 top-10 h-px w-40 bg-[var(--status-green)]" />
              <span className="coordinate-label absolute left-[35%] top-6 -translate-x-1/2">
                SYSTEM_SCOPE
              </span>
              <span className="coordinate-label absolute left-[68%] top-6 -translate-x-1/2">
                PRIMARY_OUTPUT
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative px-5 py-10 sm:px-6 md:px-8 md:py-14 lg:pr-14">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-drawing-label">
                    <span>01 // WORK_INDEX</span>
                    <span className="hidden h-px w-16 bg-[var(--border-line)] sm:block" />
                  </div>
                  <div className="hidden gap-6 text-drawing-label sm:flex">
                    <span>src/pages/Projects.tsx</span>
                    <span>route:/projects</span>
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
                      <div>GET /projects</div>
                      <div>MD - TSX</div>
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
                    Curated
                    <br />
                    Projects
                  </h1>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
                  <p className="text-body-readable text-base font-medium md:text-lg">
                    Software work catalog: shipped products, backend systems,
                    content sites, and experiments mapped from source files to
                    public outputs.
                  </p>
                  <div className="border-l border-[var(--border-line)] pl-4 font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[var(--graphite-muted)]">
                    <div>ROUTE: /PROJECTS</div>
                    <div>SOURCE: MD_FILES</div>
                    <div>RENDER: WORK_CARD</div>
                  </div>
                </div>
              </div>

              <aside className="border-t border-[var(--border-line)] px-5 py-8 sm:px-6 lg:border-l lg:border-t-0 lg:px-8 lg:py-12">
                <div className="mb-9 flex items-center justify-between gap-4 text-drawing-label">
                  <span>02 // BUILD_META</span>
                  <span>BUILD:2026</span>
                </div>

                <dl className="grid grid-cols-2 gap-px border border-[var(--border-line)] bg-[var(--border-line)]">
                  <div className="bg-[var(--paper)] px-4 py-5">
                    <dt className="text-drawing-label">Projects</dt>
                    <dd className="mt-2 font-mono text-3xl text-[var(--graphite)]">
                      {portfolioItems.length}
                    </dd>
                  </div>
                  <div className="bg-[var(--paper)] px-4 py-5">
                    <dt className="text-drawing-label">Stacks</dt>
                    <dd className="mt-2 font-mono text-3xl text-[var(--graphite)]">
                      {uniqueStacks.length}
                    </dd>
                  </div>
                  <div className="col-span-2 bg-[var(--paper)] px-4 py-5">
                    <dt className="text-drawing-label">Latest output</dt>
                    <dd className="mt-2 font-mono text-sm uppercase tracking-[0.16em] text-[var(--graphite)]">
                      {formatLatestDate(latestProject?.date)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--status-green)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--status-green)]" />
                  <span>PRIMARY_OUTPUT_READY</span>
                </div>

                <div className="mt-10 hidden border border-dashed border-[var(--border-dashed)] p-4 lg:block">
                  <div className="mb-4 text-drawing-label">Route graph</div>
                  <div className="aspect-square overflow-hidden">
                    <RouteChipGraph />
                  </div>
                </div>
              </aside>
            </div>
          </header>
        </FadeInUp>

        <section className="border-b border-[var(--border-line)] py-8">
          <div className="mb-5 flex items-center gap-3 text-drawing-label">
            <span>03 // WORK_RECORDS</span>
            <span className="hidden h-px flex-1 bg-[var(--border-line)] sm:block" />
            <span className="hidden sm:inline">source:content/projects</span>
          </div>
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            role="list"
            aria-label="Project list"
          >
            {portfolioItems.map((item, index) => (
              <FadeInUp key={item.id} delay={0.1 + index * 0.08}>
                <div role="listitem" className="h-full">
                  <PortfolioCard item={item} index={index} />
                </div>
              </FadeInUp>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
