import { useState } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTechIcon } from "@/lib/techIcons";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  return (
      <Card
        role="article"
        aria-label={item.title}
        className={cn(
          "group border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white motion-safe:transition-all motion-safe:duration-200 hover:border-slate-600/80 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:shadow-lg hover:shadow-slate-900/20 light:hover:shadow-slate-300/30 overflow-hidden flex flex-col h-full"
        )}
      >
        <div className="flex flex-col sm:flex-row flex-1">
          <div className="flex-1 p-3 sm:p-4 md:p-5 space-y-2 flex flex-col">
            <CardHeader className="space-y-1.5 p-0 flex flex-col">
              <h2
                className="text-sm sm:text-base md:text-lg text-slate-100 light:text-slate-900 line-clamp-2 font-mono font-medium"
              >
                {item.title}
              </h2>
              <p
                className="text-xs sm:text-sm text-slate-400 light:text-slate-600 line-clamp-4 font-body font-medium"
              >
                {item.description}
              </p>
            </CardHeader>
          </div>
          <div className="relative w-full sm:w-48 md:w-56 lg:w-64 flex-shrink-0 h-40 overflow-hidden bg-slate-800/40 light:bg-slate-100/60">
            {imgLoading && !imgError && (
              <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-slate-800/60" />
            )}
            {imgError ? (
              <div className="flex h-full w-full items-center justify-center bg-slate-800/60 light:bg-slate-200/60 px-4">
                <span
                  className="text-center text-xs text-slate-400 light:text-slate-500 line-clamp-3 font-body font-medium"
                >
                  {item.title}
                </span>
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onLoad={() => setImgLoading(false)}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>
        <div className="border-t border-slate-800/70 light:border-slate-300 p-3 sm:p-4 md:p-4 space-y-2 sm:space-y-3 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2" aria-label="Technologies used" role="list">
            {item.techStack.slice(0, 5).map((tech) => {
              const Icon = getTechIcon(tech);
              if (!Icon) return null;
              return (
                <div
                  key={tech}
                  className="flex items-center gap-1 sm:gap-1.5 rounded border border-slate-800/70 light:border-slate-300 bg-slate-900/80 light:bg-slate-50 px-2 py-1 text-xs"
                  title={tech}
                  role="listitem"
                >
                  <Icon className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-slate-400 light:text-slate-600" aria-hidden="true" />
                  <span
                    className="sr-only sm:not-sr-only sm:inline text-slate-400 light:text-slate-600 font-mono font-medium"
                  >
                    {tech}
                  </span>
                </div>
              );
            })}
            {item.techStack.length > 5 && (
              <div
                className="flex items-center gap-1 sm:gap-1.5 rounded border border-slate-800/70 light:border-slate-300 bg-slate-900/80 light:bg-slate-50 px-2 py-1 text-xs font-semibold"
                title={item.techStack.slice(5).join(", ")}
              >
                <span className="text-slate-400 light:text-slate-600">
                  +{item.techStack.length - 5}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            <Link
              to={`/projects/${item.slug}`}
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-300 light:text-slate-700 transition-all duration-200 hover:border-slate-700/70 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-950 hover:shadow-md hover:shadow-slate-900/50 light:hover:shadow-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 font-body font-semibold"
              aria-label={`View ${item.title} project details`}
            >
              Brief
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-700 transition-colors hover:border-slate-700/70 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 font-body font-medium"
                aria-label={`Visit ${item.title} live website`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Web
              </a>
            )}
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-white px-3 py-2 text-xs text-slate-300 light:text-slate-700 transition-colors hover:border-slate-700/70 light:hover:border-slate-400 hover:bg-slate-900/90 light:hover:bg-slate-50 hover:text-slate-100 light:hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 font-body font-medium"
                aria-label={`View ${item.title} on GitHub`}
              >
                <Github className="h-3.5 w-3.5" />
                Github
              </a>
            )}
          </div>
        </div>
      </Card>
  );
}
