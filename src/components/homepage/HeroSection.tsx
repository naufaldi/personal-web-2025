import { ArrowRight, Code2 } from "lucide-react";
import FadeInUp from "@/components/common/FadeInUp";
import DrawingFrame from "@/components/design-system/DrawingFrame";
import MetadataRow from "@/components/design-system/MetadataRow";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { siteConfig } from "@/data/site";

const heroRoutes = [
  {
    index: "01",
    label: "View projects",
    href: "#projects",
    icon: <Code2 className="h-4 w-4" aria-hidden="true" />,
  },
  {
    index: "02",
    label: "Get in touch",
    href: siteConfig.socialLinks.linkedin ?? "#",
  },
  {
    index: "03",
    label: "Download CV",
    href: siteConfig.socialLinks.linkedin ?? "#",
  },
];

const heroSkills = ["Product Systems", "Backend Foundations", "Engineering Mentorship"];

export default function HeroSection() {
  return (
    <DrawingFrame
      className="min-h-[calc(100dvh-72px)]"
      innerClassName="min-h-[calc(100dvh-72px)]"
    >
      <div className="pointer-events-none absolute inset-x-5 top-10 bottom-10 hidden md:block">
        <div className="absolute left-[8%] right-[8%] top-[18%] border-t border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[8%] right-[8%] top-[48%] border-t border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[8%] right-[8%] bottom-[18%] border-t border-[var(--border-line)]" />
        <div className="absolute left-[8%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[58%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <div className="absolute right-[9%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <span className="coordinate-label absolute left-[8%] top-8">
          X-1440
        </span>
        <span className="coordinate-label absolute left-[58%] top-8">
          X-768
        </span>
        <span className="coordinate-label absolute right-[8%] top-8">
          X-0
        </span>
        <span className="coordinate-label absolute left-[7%] top-[18%]">
          Y-0
        </span>
        <span className="coordinate-label absolute left-[7%] top-[48%]">
          Y-360
        </span>
        <span className="coordinate-label absolute left-[7%] bottom-[18%]">
          Y-720
        </span>
      </div>

      <div className="grid min-h-[calc(100dvh-72px)] items-center py-20 md:py-24">
        <FadeInUp delay={0.12}>
          <div className="relative mx-auto w-full max-w-[1180px] border border-[var(--border-line)] bg-[var(--paper)]/62 p-5 shadow-[var(--shadow-paper-xs)] md:p-8">
            <div
              className="absolute left-0 top-0 h-px w-32 bg-[var(--status-green)]"
              aria-hidden="true"
            />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="space-y-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <TechnicalLabel variant="mono">01 // INTRO</TechnicalLabel>
                  <div className="hidden gap-8 md:flex">
                    <span className="coordinate-label">X-1024</span>
                    <span className="coordinate-label">X-768</span>
                    <span className="coordinate-label">X-480</span>
                  </div>
                </div>

                <div className="border border-[var(--border-line)] bg-[var(--paper)] px-4 py-5 md:px-6 md:py-7">
                  <h1 className="font-display text-[clamp(3.1rem,6.8vw,7.15rem)] font-black uppercase leading-[0.86] tracking-normal text-[var(--graphite)]">
                    NAUFALDI RAFIF S.
                  </h1>
                </div>

                <div className="max-w-2xl space-y-4 md:pl-6">
                  <h2 className="font-mono text-2xl leading-tight text-[var(--graphite)] md:text-3xl">
                    Software Engineer & Mentor
                  </h2>
                  <MetadataRow items={heroSkills} />
                  <p className="text-body-readable">
                    My foundation is frontend, but the direction is broader:
                    backend ownership, product architecture, and end-to-end
                    software delivery.
                  </p>
                </div>
              </div>

              <aside
                className="border-t border-[var(--border-line)] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
                aria-label="Hero routes"
              >
                <TechnicalLabel variant="mono">02 // ROUTES</TechnicalLabel>
                <div className="mt-8 divide-y divide-[var(--border-line)] border-y border-[var(--border-line)]">
                  {heroRoutes.map((route, index) => {
                    const isExternal = route.href.startsWith("http");

                    return (
                      <a
                        key={route.label}
                        href={route.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className={
                          index === 0
                            ? "group flex items-center justify-between gap-4 border-l-2 border-l-[var(--status-green)] bg-[var(--graphite)] px-4 py-4 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--graphite-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
                            : "group flex items-center justify-between gap-4 border-l-2 border-l-transparent bg-[var(--paper)] px-4 py-4 text-sm text-[var(--graphite)] transition-colors hover:border-l-[var(--status-green)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
                        }
                      >
                        <span className="grid gap-3">
                          <span
                            className={
                              index === 0
                                ? "font-mono text-[11px] tracking-[0.14em] text-[var(--status-green)]"
                                : "text-drawing-label"
                            }
                          >
                            {route.index}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            {route.icon}
                            {route.label}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    );
                  })}
                </div>
              </aside>
            </div>

            <div className="mt-9 border-t border-[var(--border-line)] pt-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <MetadataRow
                  items={[
                    "Open to work",
                    `${siteConfig.stats.experience} experience`,
                    `${siteConfig.stats.mentees} mentees`,
                    "Bekasi, Indonesia",
                  ]}
                />
                <div className="flex gap-5">
                  <TechnicalLabel variant="mono">BUILD:2026</TechnicalLabel>
                  <TechnicalLabel variant="mono">PRD:01</TechnicalLabel>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </DrawingFrame>
  );
}
