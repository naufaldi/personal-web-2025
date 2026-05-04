import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ExternalLink, FileCode2, Github } from "lucide-react";
import { getProjectBySlug } from "@/data/portfolio";
import { extractTOC } from "@/lib/toc";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import TableOfContents from "@/components/projects/TableOfContents";
import { getTechIcon } from "@/lib/techIcons";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import FadeInUp from "@/components/common/FadeInUp";

const formatDate = (dateString?: string) => {
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

const formatStackLabel = (tech: string) => tech.toUpperCase().replace(/\s+/g, "_");

export default function ProjectDetail() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  if (!project || !project.content) {
    return (
      <div className="drawing-sheet flex min-h-screen flex-col items-center justify-center bg-[var(--paper)] px-6">
        <div className="border border-[var(--border-line)] bg-[var(--paper)] p-8 text-center shadow-[var(--shadow-paper-xs)]">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--graphite-muted)]">
            00 // MISSING_ROUTE
          </p>
          <h1 className="mb-5 font-mono text-2xl text-[var(--graphite)]">
            Project not found
          </h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-[var(--border-line)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--graphite)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const toc = extractTOC(project.content);

  return (
    <div className="project-detail-pattern relative flex min-h-screen flex-col bg-[var(--paper)]">
      <div className="site-container relative z-10 w-full py-10 md:py-14">
        <div className="mb-6 border border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-xs)]">
          <Link
            to="/projects"
            className="group flex items-center justify-between gap-4 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--graphite-muted)] transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] sm:px-5"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              route:/projects
            </span>
            <span className="hidden text-[var(--status-green)] sm:inline">
              return_index
            </span>
          </Link>
        </div>

        <section className="mb-6 border border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-xs)]">
          <div className="flex flex-col gap-2 border-b border-[var(--border-line)] px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--graphite-muted)] sm:flex-row sm:items-center sm:justify-between">
            <span>02 // PROJECT_META</span>
            <span>BUILD:2026</span>
          </div>

          <div className="grid gap-px bg-[var(--border-line)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr_1.2fr]">
            <div className="bg-[var(--paper)] px-3 py-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--graphite-muted)]">
                Type
              </div>
              <div className="mt-1.5 truncate font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--graphite)]">
                {project.type === "blog" ? "TECHNICAL_BLOG" : "PROJECT"}
              </div>
            </div>
            <div className="bg-[var(--paper)] px-3 py-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--graphite-muted)]">
                Published
              </div>
              <div className="mt-1.5 font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--graphite)]">
                {formatDate(project.date)}
              </div>
            </div>
            <div className="bg-[var(--paper)] px-3 py-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--graphite-muted)]">
                Stack
              </div>
              <div className="mt-1.5 truncate font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--graphite)]">
                {project.techStack.slice(0, 3).map(formatStackLabel).join(" / ")}
              </div>
            </div>
            <div className="bg-[var(--paper)] px-3 py-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--graphite-muted)]">
                Pipeline
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em]">
                <span className="border border-[var(--border-line)] px-2 py-1 text-[var(--graphite-muted)]">
                  MD
                </span>
                <span className="hidden h-px min-w-8 flex-1 border-t border-dashed border-[var(--border-dashed)] sm:block" />
                <span className="border border-[var(--border-line)] px-2 py-1 text-[var(--graphite-muted)]">
                  ROUTE
                </span>
                <span className="hidden h-px min-w-8 flex-1 border-t border-dashed border-[var(--border-dashed)] sm:block" />
                <span className="border border-[var(--border-line)] px-2 py-1 text-[var(--status-green)]">
                  UI
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-[var(--border-line)] px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--status-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-green)]" />
            PROJECT_READY
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex-1 min-w-0">
            <FadeInUp delay={0.06}>
              <article
                className="w-full max-w-full overflow-hidden border border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-xs)]"
                aria-labelledby="project-detail-heading"
              >
                <header className="relative overflow-hidden border-b border-[var(--border-line)]">
                  <div
                    className="pointer-events-none absolute inset-0 hidden md:block"
                    aria-hidden="true"
                  >
                    <div className="absolute left-6 right-6 top-10 border-t border-dashed border-[var(--border-dashed)]" />
                    <div className="absolute left-[58%] top-0 bottom-0 border-l border-dashed border-[var(--border-dashed)]" />
                    <div className="absolute left-6 top-10 h-px w-40 bg-[var(--status-green)]" />
                  </div>

                  <div className="relative z-10 px-4 py-8 sm:px-6 md:px-8 md:py-10">
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--graphite-muted)]">
                      <span>01 // PROJECT_MODULE</span>
                      <span className="hidden text-[10px] tracking-[0.18em] md:inline">
                        src/content/projects/{project.slug}.md
                      </span>
                    </div>

                    <div className="relative isolate max-w-full overflow-hidden border border-[var(--border-line)] bg-[var(--paper)] px-4 py-5 sm:px-6 md:px-7">
                      <div
                        className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
                        aria-hidden="true"
                      >
                        <div className="absolute left-[7%] right-[7%] top-[52%] border-t border-dashed border-[var(--border-dashed)]" />
                        <div className="absolute right-5 top-5 border border-[var(--border-line)] bg-[var(--paper)]/88 p-2 font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-[var(--graphite-muted)]">
                          <div>GET /projects/{project.slug}</div>
                          <div>MD - TSX</div>
                          <div>VITE OK</div>
                        </div>
                      </div>
                      <div className="relative z-10 max-w-4xl bg-[var(--paper)] pr-4">
                        <Badge
                          variant="outline"
                          className="mb-4 rounded-none border-[var(--border-line)] bg-[var(--paper)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--graphite-muted)]"
                        >
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[var(--status-green)]" />
                          {project.type === "blog" ? "Technical Blog" : "Project"}
                        </Badge>
                        <h1
                          id="project-detail-heading"
                          className="max-w-[290px] break-words pr-5 font-mono text-lg font-medium leading-[1.2] tracking-normal text-[var(--graphite)] sm:max-w-none sm:pr-0 sm:text-4xl md:text-5xl"
                        >
                          {project.title}
                        </h1>
                      </div>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
                      <p className="max-w-[290px] pr-5 font-body text-sm font-medium leading-7 text-[var(--graphite-muted)] sm:max-w-3xl sm:pr-0 md:text-lg md:leading-8">
                        {project.description}
                      </p>
                      <div className="min-w-0 border-l border-[var(--border-line)] pl-4 font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[var(--graphite-muted)]">
                        <div className="break-all">ROUTE: /PROJECTS/{project.slug}</div>
                        <div>SOURCE: MARKDOWN</div>
                        <div>STATE: PUBLISHED</div>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-[var(--border-line)] pt-5">
                      {project.techStack.map((tech) => {
                        const Icon = getTechIcon(tech);
                        return (
                          <div
                            key={tech}
                            className="flex items-center gap-1.5 border border-[var(--border-line)] bg-[var(--paper)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--graphite-muted)] transition-colors hover:border-[var(--border-strong)]"
                            aria-label={tech}
                          >
                            {Icon && (
                              <Icon
                                className="h-3.5 w-3.5 text-[var(--graphite-muted)]"
                                aria-hidden="true"
                              />
                            )}
                            <span>{tech}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-[var(--border-line)] bg-[var(--graphite)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--paper)] transition-colors hover:bg-[var(--graphite-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
                          aria-label={`Visit ${project.title} live website`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-[var(--border-line)] bg-[var(--paper)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="h-3.5 w-3.5" aria-hidden="true" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </header>

                <div className="border-b border-[var(--border-line)]">
                  <div className="flex items-center justify-between border-b border-[var(--border-line)] bg-[var(--surface-subtle)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--graphite-muted)] sm:px-6 md:px-8">
                    <span className="inline-flex items-center gap-2">
                      <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                      asset.project
                    </span>
                    <span className="hidden sm:inline">render:image</span>
                  </div>

                  <div className="relative h-64 w-full bg-[var(--surface-subtle)] md:h-80 lg:h-96">
                    {imgLoading && !imgError && project.image && (
                      <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-[var(--surface-subtle)]" />
                    )}
                    {!project.image || imgError ? (
                      <div className="flex h-full w-full items-center justify-center px-4">
                        <span className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--graphite-muted)]">
                          {project.title}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        className="h-full w-full object-cover grayscale"
                        loading="eager"
                        decoding="async"
                        onLoad={() => setImgLoading(false)}
                        onError={() => setImgError(true)}
                      />
                    )}
                  </div>
                </div>

                <div className="mx-auto max-w-3xl px-4 py-8 pr-8 sm:px-6 md:px-8 md:py-10">
                  <MarkdownRenderer content={project.content} />
                </div>
              </article>
            </FadeInUp>
          </div>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
