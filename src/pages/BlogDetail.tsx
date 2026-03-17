import {
  useEffect,
  useState,
  type ComponentType,
} from "react";
import {
  useParams,
  Link,
} from "react-router";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug } from "@/data/blogs";
import { extractTOC } from "@/lib/toc";
import { incrementBlogViews } from "@/lib/blogStorage";
import { mdxComponents } from "@/components/mdx/mdx-components";
import TableOfContents from "@/components/projects/TableOfContents";
import BlogMetadata from "@/components/blogs/BlogMetadata";
import BlogActions from "@/components/blogs/BlogActions";
import { Badge } from "@/components/ui/badge";

const mdxModules = import.meta.glob<{
  default: ComponentType<{ components?: Record<string, unknown> }>;
}>("../content/blogs/*.md");

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? getBlogBySlug(slug) : undefined;
  const [viewsTracked, setViewsTracked] = useState(false);
  const [MdxContent, setMdxContent] = useState<ComponentType<{
    components?: Record<string, unknown>;
  }> | null>(null);

  useEffect(() => {
    if (blog && !viewsTracked) {
      incrementBlogViews(blog.slug).then(() => {
        setViewsTracked(true);
      });
    }
  }, [blog, viewsTracked]);

  useEffect(() => {
    if (!blog) return;

    const path = Object.keys(mdxModules).find((p) =>
      p.endsWith(`/${blog.slug}.md`)
    );
    if (!path) return;

    mdxModules[path]().then((mod) => {
      setMdxContent(() => mod.default);
    });
  }, [blog]);

  if (!blog || !blog.content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 light:bg-slate-50">
        <div className="text-center">
          <h1
            className="text-2xl mb-4 text-slate-400 light:text-slate-600"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
            }}
          >
            Blog not found
          </h1>
          <Link
            to="/blogs"
            className="transition-colors hover:opacity-80 text-slate-400 light:text-slate-600"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const toc = extractTOC(blog.content);

  return (
    <div className="blog-detail-pattern min-h-screen flex flex-col relative bg-slate-950 light:bg-slate-50">
      <div className="mx-auto max-w-6xl sm:px-6 w-full px-6 md:px-0 py-12 md:py-16 relative z-10">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 mb-8 transition-colors hover:opacity-80 text-slate-400 light:text-slate-600"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <article
              style={{
                animation: "fade-in 900ms ease-out both",
                animationDelay: "60ms",
              }}
            >
              {/* Header */}
              <header className="mb-8 max-w-prose mx-auto">
                <Badge
                  variant="outline"
                  className="mb-3 border-slate-700/70 light:border-slate-300/70 bg-slate-900/40 light:bg-slate-100/40 text-slate-400 light:text-slate-600 font-body"
                >
                  {blog.category}
                </Badge>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 text-slate-100 light:text-slate-900 font-blog">
                  {blog.title}
                </h1>

                <p className="text-sm md:text-base leading-relaxed mb-5 text-slate-400 light:text-slate-600 font-blog max-w-prose">
                  {blog.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800/50 light:border-slate-200/50">
                  <BlogMetadata blog={blog} />
                  <BlogActions slug={blog.slug} />
                </div>
              </header>

              {/* Hero image */}
              {blog.image && (
                <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border border-slate-800/70 light:border-slate-200/70 bg-slate-900/60 light:bg-white/60 mb-8">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}

              {/* Content */}
              <div className="max-w-prose mx-auto">
                {MdxContent ? (
                  <MdxContent components={mdxComponents} />
                ) : (
                  <div className="text-slate-400 text-center py-8">
                    Loading content...
                  </div>
                )}
              </div>
            </article>
          </div>

          {toc.length > 0 && <TableOfContents items={toc} />}
        </div>
      </div>
    </div>
  );
}
