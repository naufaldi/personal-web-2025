import {
  ArrowRight,
  ExternalLink,
  Github,
} from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import { getTechIcon } from "@/lib/techIcons";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib";
import FadeInUp from "@/components/common/FadeInUp";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

export default function PortfolioCard({
  item,
  index,
}: PortfolioCardProps) {
  return (
    <FadeInUp
      delay={
        0.12 +
        index *
          0.1
      }
    >
      <Card
        className={cn(
          "group border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white transition-all duration-200 hover:border-slate-700/70 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 overflow-hidden flex flex-col",
        )}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-3 sm:p-4 md:p-5 space-y-2 flex flex-col justify-center">
            <CardHeader className="space-y-1.5 p-0">
              <h3
                className="text-sm sm:text-base md:text-lg text-slate-100 light:text-slate-900"
                style={{
                  fontFamily:
                    "var(--font-mono)",
                  fontWeight: 500,
                }}
              >
                {
                  item.title
                }
              </h3>
              <p
                className="text-xs sm:text-sm text-slate-400 light:text-slate-600"
                style={{
                  fontFamily:
                    "var(--font-body)",
                  fontWeight: 500,
                }}
              >
                {
                  item.description
                }
              </p>
            </CardHeader>
          </div>
          <div className="relative w-full sm:w-48 md:w-56 lg:w-64 flex-shrink-0 h-40 sm:h-40">
            <img
              src={
                item.image
              }
              alt={
                item.title
              }
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="border-t border-slate-800/70 light:border-slate-300 p-3 sm:p-4 md:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {item.techStack.map(
              (
                tech,
              ) => {
                const Icon =
                  getTechIcon(
                    tech,
                  );
                if (
                  !Icon
                )
                  return null;
                return (
                  <div
                    key={
                      tech
                    }
                    className="flex items-center gap-1 sm:gap-1.5 rounded border border-slate-800/70 light:border-slate-300 bg-slate-900/80 light:bg-slate-50 px-2 py-1 text-xs"
                    title={
                      tech
                    }
                  >
                    <Icon className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-slate-400 light:text-slate-600" />
                    <span
                      className="hidden sm:inline text-slate-400 light:text-slate-600"
                      style={{
                        fontFamily:
                          "var(--font-mono)",
                        fontWeight: 500,
                      }}
                    >
                      {
                        tech
                      }
                    </span>
                  </div>
                );
              },
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/projects/${item.slug}`}
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-300 light:text-slate-700 transition-all duration-200 hover:border-slate-700/70 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-950 hover:shadow-md hover:shadow-slate-900/50 light:hover:shadow-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 600,
              }}
              aria-label={`View ${item.title} project details`}
            >
              Brief
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            {item.liveUrl && (
              <a
                href={
                  item.liveUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-700 transition-colors hover:border-slate-700/70 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40"
                style={{
                  fontFamily:
                    "var(--font-body)",
                  fontWeight: 500,
                }}
                aria-label={`Visit ${item.title} live website`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live
                Web
              </a>
            )}
            {item.githubUrl && (
              <a
                href={
                  item.githubUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-700 transition-colors hover:border-slate-700/70 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40"
                style={{
                  fontFamily:
                    "var(--font-body)",
                  fontWeight: 500,
                }}
                aria-label={`View ${item.title} on GitHub`}
              >
                <Github className="h-3.5 w-3.5" />
                Github
              </a>
            )}
          </div>
        </div>
      </Card>
    </FadeInUp>
  );
}
