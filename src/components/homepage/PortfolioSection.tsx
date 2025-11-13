import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { portfolioItems } from "@/data/portfolio";
import PortfolioCard from "./PortfolioCard";
import FadeInUp from "@/components/common/FadeInUp";

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="bg-slate-950 py-8 sm:py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="space-y-6 sm:space-y-8">
          <FadeInUp
            delay={
              0.06
            }
          >
            <h2
              className="text-[24px] md:text-[28px] text-slate-100 tracking-tight"
              style={{
                fontFamily:
                  "var(--font-mono)",
                fontWeight: 500,
              }}
            >
              Portfolio
            </h2>
          </FadeInUp>
          <FadeInUp
            delay={
              0.12
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
              {portfolioItems.map(
                (
                  item,
                  index,
                ) => (
                  <PortfolioCard
                    key={
                      item.id
                    }
                    item={
                      item
                    }
                    index={
                      index
                    }
                  />
                ),
              )}
            </div>
          </FadeInUp>

          <FadeInUp
            delay={
              0.12 +
              portfolioItems.length *
                0.1
            }
          >
            <div className="flex justify-center pt-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-md border border-slate-800/70 bg-slate-900/60 px-6 py-3 text-sm text-slate-300 transition-all duration-200 hover:text-slate-100 hover:border-slate-700/70 hover:bg-slate-900/90 hover:shadow-md hover:shadow-slate-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
                style={{
                  fontFamily:
                    "var(--font-body)",
                  fontWeight: 600,
                }}
              >
                View
                all
                projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
