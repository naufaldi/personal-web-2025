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

const getOutputState = (item: PortfolioItem) => {
  if (item.liveUrl) {
    return "LIVE_OUTPUT";
  }

  if (item.githubUrl) {
    return "REPO_TRACE";
  }

  return "CASE_FILE";
};

export default function PortfolioCard({ item, index }: PortfolioCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const outputState = getOutputState(item);
  const primaryStack = item.techStack[0] ?? "Project";
  const secondaryStack = item.techStack[1] ?? "Build";
  const itemNumber = String(index + 1).padStart(2, "0");

  return (
    <Card
      role="article"
      aria-label={item.title}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-none border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-xs)] motion-safe:transition-colors motion-safe:duration-200 hover:border-[var(--border-strong)]"
      )}
    >
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-[minmax(0,1fr)_240px]">
        <div className="flex min-w-0 flex-col p-4 sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="text-drawing-label">project_{itemNumber}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--status-green)]">
              {outputState}
            </span>
          </div>

          <CardHeader className="space-y-3 p-0">
            <h2 className="line-clamp-2 font-mono text-lg font-medium leading-snug text-[var(--graphite)]">
              {item.title}
            </h2>
            <p className="line-clamp-4 font-body text-sm font-medium leading-7 text-[var(--graphite-muted)]">
              {item.description}
            </p>
          </CardHeader>

          <dl className="mt-5 grid grid-cols-2 gap-px border border-[var(--border-line)] bg-[var(--border-line)]">
            <div className="bg-[var(--paper)] px-3 py-3">
              <dt className="text-drawing-label">Stack</dt>
              <dd className="mt-1 truncate font-mono text-xs text-[var(--graphite)]">
                {primaryStack}
              </dd>
            </div>
            <div className="bg-[var(--paper)] px-3 py-3">
              <dt className="text-drawing-label">System</dt>
              <dd className="mt-1 truncate font-mono text-xs text-[var(--graphite)]">
                {secondaryStack}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative min-h-44 border-t border-[var(--border-line)] bg-[var(--surface-subtle)] sm:min-h-full sm:border-l sm:border-t-0">
          <div
            className="pointer-events-none absolute inset-0 z-10 border border-transparent"
            aria-hidden="true"
          >
            <div className="absolute left-4 right-4 top-4 border-t border-dashed border-[var(--border-dashed)]" />
            <div className="absolute bottom-4 left-4 right-4 border-t border-dashed border-[var(--border-dashed)]" />
            <div className="absolute bottom-5 right-5 bg-[var(--paper)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--graphite-muted)]">
              output:{itemNumber}
            </div>
          </div>
          {imgLoading && !imgError && (
            <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-[var(--surface-subtle)]" />
          )}
          {imgError ? (
            <div className="flex h-full min-h-44 w-full items-center justify-center bg-[var(--surface-subtle)] px-4">
              <span className="line-clamp-3 text-center font-mono text-xs uppercase tracking-[0.14em] text-[var(--graphite-muted)]">
                {item.title}
              </span>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="h-full min-h-44 w-full object-cover saturate-[0.9] motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoading(false)}
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-[var(--border-line)] p-4">
        <div
          className="flex flex-wrap items-center gap-2"
          aria-label="Technologies used"
          role="list"
        >
          {item.techStack.slice(0, 5).map((tech) => {
            const Icon = getTechIcon(tech);
            if (!Icon) return null;
            return (
              <div
                key={tech}
                className="flex items-center gap-1.5 rounded-none border border-[var(--border-line)] bg-[var(--paper)] px-2 py-1 text-xs"
                title={tech}
                role="listitem"
              >
                <Icon
                  className="h-3.5 w-3.5 text-[var(--graphite-muted)]"
                  aria-hidden="true"
                />
                <span className="font-mono font-medium text-[var(--graphite-muted)]">
                  {tech}
                </span>
              </div>
            );
          })}
          {item.techStack.length > 5 && (
            <div
              className="flex items-center gap-1.5 rounded-none border border-[var(--border-line)] bg-[var(--paper)] px-2 py-1 text-xs font-semibold"
              title={item.techStack.slice(5).join(", ")}
            >
              <span className="font-mono text-[var(--graphite-muted)]">
                +{item.techStack.length - 5}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          <Link
            to={`/projects/${item.slug}`}
            className="inline-flex items-center gap-1.5 rounded-none border border-[var(--graphite)] bg-[var(--graphite)] px-3 py-2 font-body text-sm font-semibold text-[var(--paper)] transition-colors duration-200 hover:bg-[var(--graphite-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] active:translate-y-px"
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
              className="inline-flex items-center gap-1.5 rounded-none border border-[var(--border-line)] bg-[var(--paper)] px-3 py-2 font-body text-xs font-medium text-[var(--graphite)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] active:translate-y-px"
              aria-label={`Visit ${item.title} live website`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live Web
            </a>
          )}
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-none border border-[var(--border-line)] bg-[var(--paper)] px-3 py-2 font-body text-xs font-medium text-[var(--graphite)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] active:translate-y-px"
              aria-label={`View ${item.title} on GitHub`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Github
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
