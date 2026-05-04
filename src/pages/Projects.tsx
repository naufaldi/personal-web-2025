import FadeInUp from "@/components/common/FadeInUp";
import BlueprintIndexHero from "@/components/design-system/BlueprintIndexHero";
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
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--graphite)]">
      <BlueprintIndexHero
        eyebrow="WORK_INDEX"
        title={
          <>
            Curated
            <br />
            Projects
          </>
        }
        titleId="projects-hero-heading"
        description="Software work catalog: shipped products, backend systems, content sites, and experiments mapped from source files to public outputs."
        stats={[
          { label: "Projects", value: portfolioItems.length },
          { label: "Stacks", value: uniqueStacks.length },
        ]}
        latestLabel="Latest output"
        latestValue={formatLatestDate(latestProject?.date)}
        statusLabel="PRIMARY_OUTPUT_READY"
        metadata={["route: /projects", "source: md_files", "render: work_card"]}
        actionHref="#projects"
        actionLabel="View projects"
        graphLabel="Route graph"
        graph={<RouteChipGraph />}
      />

      <div className="site-container">
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
