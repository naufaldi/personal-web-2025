import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, Calendar, Clock, Eye, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBlogLikes, getBlogViews } from "@/lib/blogStorage";
import type { BlogItem } from "@/data/blogs";
import { cn } from "@/lib";

interface BlogCardProps {
  blog: BlogItem;
  index: number;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatRoute = (category: string) => category.toUpperCase().replace(/\s+/g, "_");

export default function BlogCard({ blog, index }: BlogCardProps) {
  const navigate = useNavigate();
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(blog.image);
  const imageOnRight = index % 2 === 0;

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) {
      return;
    }

    navigate(`/blogs/${blog.slug}`);
  };

  useEffect(() => {
    getBlogViews(blog.slug).then(setViews);
    getBlogLikes(blog.slug).then(setLikes);
  }, [blog.slug]);

  const imagePreview = hasImage ? (
    <div
      className={cn(
        "relative min-h-[180px] overflow-hidden border border-[var(--border-line)] bg-[var(--surface-subtle)] md:min-h-[220px]",
        imageOnRight ? "lg:order-3" : "lg:order-1"
      )}
    >
      <div className="absolute left-3 top-3 z-[1] border border-[var(--border-line)] bg-[var(--hero-panel)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--graphite-muted)] backdrop-blur-[2px]">
        Preview
      </div>
      {imgError ? (
        <div className="flex h-full min-h-[180px] items-center justify-center px-5 text-center md:min-h-[220px]">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--graphite-muted)]">
            {blog.title}
          </span>
        </div>
      ) : (
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full min-h-[180px] w-full object-cover opacity-90 grayscale transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0 md:min-h-[220px]"
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  ) : null;

  return (
    <article
      role="article"
      aria-label={blog.title}
      onClick={handleCardClick}
      className="motion-card group grid cursor-pointer grid-cols-1 border-t border-[var(--border-line)] lg:grid-cols-[170px_minmax(0,1fr)]"
    >
      <div className="border-b border-[var(--border-line)] py-5 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--graphite-muted)] lg:border-b-0 lg:py-8 lg:pr-8">
        {String(index + 1).padStart(2, "0")} // ENTRY
      </div>

      <div
        className={cn(
          "grid gap-5 py-6 transition-colors duration-200 group-hover:bg-[var(--surface-subtle)] md:py-8 lg:px-7",
          hasImage ? "lg:grid-cols-[minmax(0,1fr)_320px]" : "lg:grid-cols-1"
        )}
      >
        {!imageOnRight && imagePreview}

        <div
          className={cn(
            "min-w-0 space-y-5",
            hasImage && (imageOnRight ? "lg:order-1" : "lg:order-2")
          )}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--graphite-muted)]">
            <span className="inline-flex items-center gap-2 text-[#22c55e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
              {formatRoute(blog.category)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(blog.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {blog.readTime || 5} min read
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="max-w-4xl font-mono text-2xl leading-tight tracking-tight text-[var(--graphite)] md:text-3xl">
              <Link
                to={`/blogs/${blog.slug}`}
                className="motion-link rounded-sm transition-colors hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]"
              >
                {blog.title}
              </Link>
            </h2>

            <p className="max-w-4xl font-body text-sm font-medium leading-7 text-[var(--graphite-muted)] md:text-base">
              {blog.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--border-line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 rounded-full border border-[var(--border-line)]">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback className="bg-[var(--surface-subtle)] font-mono text-xs text-[var(--graphite-muted)]">
                  {blog.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-body text-sm font-semibold text-[var(--graphite)]">
                  {blog.author.name}
                </div>
                <div className="mt-0.5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--graphite-muted)]">
                  <span className="inline-flex items-center gap-1" aria-label={`${views.toLocaleString()} views`}>
                    <Eye className="h-3 w-3" aria-hidden="true" />
                    {views.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1" aria-label={`${likes.toLocaleString()} likes`}>
                    <Heart className="h-3 w-3" aria-hidden="true" />
                    {likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to={`/blogs/${blog.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="motion-button inline-flex w-fit items-center gap-2 border border-[var(--border-line)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--graphite-muted)] transition-colors group-hover:border-[var(--border-strong)] group-hover:text-[var(--graphite)]"
            >
              Read
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {imageOnRight && imagePreview}
      </div>
    </article>
  );
}
