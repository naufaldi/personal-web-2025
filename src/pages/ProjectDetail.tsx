import {
  useParams,
  Link,
} from "react-router";
import {
  ArrowLeft,
  ExternalLink,
  Github,
} from "lucide-react";
import { getProjectBySlug } from "@/data/portfolio";
import { extractTOC } from "@/lib/toc";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import TableOfContents from "@/components/projects/TableOfContents";
import { getTechIcon } from "@/lib/techIcons";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetail() {
  const {
    slug,
  } =
    useParams<{
      slug: string;
    }>();
  const project =
    slug
      ? getProjectBySlug(
          slug,
        )
      : undefined;

  if (
    !project ||
    !project.content
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 light:bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl text-slate-100 light:text-slate-900 mb-4 font-mono font-bold">
            Project
            not
            found
          </h1>
          <Link
            to="/projects"
            className="text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-800 transition-colors font-body font-medium"
          >
            Back
            to
            Projects
          </Link>
        </div>
      </div>
    );
  }

  const toc =
    extractTOC(
      project.content,
    );

  return (
    <div className="project-detail-pattern min-h-screen flex flex-col relative bg-slate-950 light:bg-slate-50">
      <div className="mx-auto max-w-7xl sm:px-6 w-full px-6 md:px-0 py-12 md:py-16 relative z-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mb-8 text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-800 transition-colors font-body font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
          to
          Projects
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <article
              className="space-y-6 bg-slate-900/30 light:bg-white/40 rounded-lg p-6 md:p-8 border border-slate-800/50 light:border-slate-200/50"
              style={{
                animation:
                  "fade-in 900ms ease-out both",
                animationDelay:
                  "60ms",
              }}
            >
              <header className="space-y-4">
                {project.image && (
                  <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border border-slate-800/70 light:border-slate-200/70 bg-slate-900/60 light:bg-white/60">
                    <img
                      src={
                        project.image
                      }
                      alt={
                        project.title
                      }
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl text-slate-100 light:text-slate-900 mb-2 font-mono font-bold">
                      {
                        project.title
                      }
                    </h1>
                    <p className="text-base md:text-lg mb-4 font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700">
                      {
                        project.description
                      }
                    </p>
                  </div>
                  {project.type ===
                    "blog" && (
                    <Badge
                      variant="outline"
                      className="border-slate-700/70 light:border-slate-300/70 text-slate-300 light:text-slate-600 bg-slate-900/40 light:bg-slate-100/40 font-body font-medium"
                    >
                      Technical
                      Blog
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {project.techStack.map(
                    (
                      tech,
                    ) => {
                      const Icon =
                        getTechIcon(
                          tech,
                        );
                      return (
                        <div
                          key={
                            tech
                          }
                          className="flex items-center gap-1.5 rounded border border-slate-800/70 light:border-slate-300/70 bg-slate-900/80 light:bg-white/60 px-2 py-1"
                          title={
                            tech
                          }
                        >
                          {Icon && (
                            <Icon className="h-3.5 w-3.5 text-slate-400 light:text-slate-600" />
                          )}
                          <span className="text-xs text-slate-400 light:text-slate-600 font-mono font-medium">
                            {
                              tech
                            }
                          </span>
                        </div>
                      );
                    },
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-300/70 bg-slate-900/60 light:bg-slate-100/60 px-4 py-2 text-sm text-slate-300 light:text-slate-600 transition-colors hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-100/80 hover:text-slate-100 light:hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 font-body font-medium"
                      aria-label={`Visit ${project.title} live website`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={
                        project.githubUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 light:border-slate-300/70 bg-slate-900/60 light:bg-slate-100/60 px-4 py-2 text-sm text-slate-300 light:text-slate-600 transition-colors hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-100/80 hover:text-slate-100 light:hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40 font-body font-medium"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="h-4 w-4" />
                      View
                      Code
                    </a>
                  )}
                </div>
              </header>

              <div className="prose prose-invert max-w-none">
                <MarkdownRenderer
                  content={
                    project.content
                  }
                />
              </div>
            </article>
          </div>

          {toc.length >
            0 && (
            <TableOfContents
              items={
                toc
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
