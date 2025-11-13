import {
  Sparkles,
  Code2,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import CodePreviewCard from "./CodePreviewCard";
import StatsCards from "./StatsCards";
import FadeInUp from "@/components/common/FadeInUp";

export default function HeroSection() {
  return (
    <section className="relative flex-1">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center pb-12 pt-8 sm:pt-16 lg:pt-24">
          <FadeInUp
            delay={
              0.12
            }
          >
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-slate-100 px-2.5 py-1 text-[11px] text-slate-300 light:text-slate-800">
                <Sparkles className="h-3.5 w-3.5 text-slate-300/90 light:text-slate-800/90" />
                <span
                  style={{
                    fontFamily:
                      "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {
                    siteConfig.statusBadge
                  }
                </span>
                <span
                  className="mx-1.5 h-1 w-1 rounded-full bg-slate-700 light:bg-slate-500"
                  aria-hidden="true"
                />
                <a
                  href="https://www.linkedin.com/in/naufaldirafif/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-slate-600 light:decoration-slate-600 underline-offset-2 hover:text-slate-100 light:hover:text-slate-950 hover:decoration-slate-400 light:hover:decoration-slate-800 transition-colors"
                  style={{
                    fontFamily:
                      "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {
                    siteConfig.availability
                  }
                </a>
              </div>

              <h1
                className="text-2xl sm:text-[32px] md:text-[40px] leading-[1.15] text-slate-100 light:text-slate-950 tracking-tight"
                style={{
                  fontFamily:
                    "var(--font-mono)",
                  fontWeight: 500,
                }}
              >
                {
                  siteConfig.tagline
                }
              </h1>

              <p
                className="text-base md:text-lg text-slate-400 light:text-slate-700 max-w-2xl"
                style={{
                  fontFamily:
                    "var(--font-body)",
                  fontWeight: 500,
                }}
              >
                {
                  siteConfig.bio
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-100 light:bg-slate-950 text-slate-900 light:text-white px-4 py-2 text-sm hover:bg-white light:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-950/40 transition-colors"
                  style={{
                    fontFamily:
                      "var(--font-body)",
                    fontWeight: 600,
                  }}
                >
                  <Code2 className="h-[18px] w-[18px]" />
                  View
                  projects
                </a>
                <a
                  href="https://www.linkedin.com/in/naufaldirafif/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-800/70 light:border-slate-400 bg-slate-900/60 light:bg-white px-4 py-2 text-sm text-slate-300 light:text-slate-800 hover:text-slate-100 light:hover:text-slate-950 hover:border-slate-700/70 light:hover:border-slate-600 hover:bg-slate-900/90 light:hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/30 transition-colors"
                  style={{
                    fontFamily:
                      "var(--font-body)",
                    fontWeight: 600,
                  }}
                >
                  Get
                  in
                  touch
                  <ArrowRight className="h-4 w-4 -mr-0.5" />
                </a>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp
            delay={
              0.22
            }
          >
            <div className="relative">
              <CodePreviewCard />
              <StatsCards />
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
