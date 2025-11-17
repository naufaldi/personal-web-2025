import {
  useParams,
  useNavigate,
} from "react-router";
import { ArrowLeft } from "lucide-react";
import { getShortBySlug } from "@/data/shorts";
import MarkdownRenderer from "@/components/shorts/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";

export default function ShortDetail() {
  const {
    slug,
  } =
    useParams<{
      slug: string;
    }>();
  const navigate =
    useNavigate();
  const short =
    slug
      ? getShortBySlug(
          slug,
        )
      : undefined;

  if (
    !short
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 light:bg-slate-50">
        <div className="text-center">
          <h1
            className="text-2xl text-slate-100 light:text-slate-900 mb-4"
            style={{
              fontFamily:
                "var(--font-mono)",
              fontWeight: 700,
            }}
          >
            Short
            not
            found
          </h1>
          <button
            onClick={() =>
              navigate(
                "/shorts",
              )
            }
            className="text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 transition-colors"
            style={{
              fontFamily:
                "var(--font-body)",
              fontWeight: 500,
            }}
          >
            Back
            to
            Shorts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 light:bg-slate-50">
      <div
        className="shorts-pattern"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-4xl px-6 w-full px-6 md:px-0 py-12 md:py-16 relative z-10">
        <button
          onClick={() =>
            navigate(
              "/shorts",
            )
          }
          className="inline-flex items-center gap-2 mb-8 text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 transition-colors"
          style={{
            fontFamily:
              "var(--font-body)",
            fontWeight: 500,
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
          to
          Shorts
        </button>

        <article
          className="space-y-6"
          style={{
            animation:
              "fade-in 900ms ease-out both",
            animationDelay:
              "60ms",
          }}
        >
          <header className="space-y-4">
            <h1
              className="text-3xl md:text-4xl text-slate-100 light:text-slate-900"
              style={{
                fontFamily:
                  "var(--font-mono)",
                fontWeight: 700,
              }}
            >
              {
                short.title
              }
            </h1>

            {short
              .tags
              .length >
              0 && (
              <div className="flex flex-wrap items-center gap-2">
                {short.tags.map(
                  (
                    tag,
                  ) => (
                    <Badge
                      key={
                        tag
                      }
                      variant="outline"
                      className="border-slate-800/70 light:border-slate-200/70 text-slate-300 light:text-slate-700 bg-slate-900/40 light:bg-white/60"
                      style={{
                        fontFamily:
                          "var(--font-body)",
                        fontWeight: 500,
                      }}
                    >
                      {
                        tag
                      }
                    </Badge>
                  ),
                )}
              </div>
            )}
          </header>

          <div className="prose prose-invert light:prose-light max-w-none">
            <MarkdownRenderer
              content={
                short.content
              }
            />
          </div>
        </article>
      </div>
    </div>
  );
}
