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
  const animationDelay = `${80 + (index % 10) * 40}ms`;
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
        "relative min-h-[180px] overflow-hidden border border-slate-800/70 bg-slate-900 light:border-[#e3e5e8] light:bg-[#f1f3f4] md:min-h-[220px]",
        imageOnRight ? "lg:order-3" : "lg:order-1"
      )}
    >
      <div className="absolute left-3 top-3 z-[1] border border-slate-700/70 bg-slate-950/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300 light:border-[#d7dbe0] light:bg-white/85 light:text-[#5b5f66]">
        Preview
      </div>
      {imgError ? (
        <div className="flex h-full min-h-[180px] items-center justify-center px-5 text-center md:min-h-[220px]">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 light:text-[#8c929b]">
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
      className="group grid cursor-pointer grid-cols-1 border-t border-slate-800/70 light:border-[#e3e5e8] lg:grid-cols-[170px_minmax(0,1fr)]"
      style={{
        animation: "fade-in 420ms ease-out both",
        animationDelay,
      }}
    >
      <div className="border-b border-slate-800/70 py-5 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 light:border-[#e3e5e8] light:text-[#8c929b] lg:border-b-0 lg:py-8 lg:pr-8">
        {String(index + 1).padStart(2, "0")} // ENTRY
      </div>

      <div
        className={cn(
          "grid gap-5 py-6 transition-colors duration-200 group-hover:bg-slate-900/40 light:group-hover:bg-white/75 md:py-8 lg:px-7",
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 light:text-[#8c929b]">
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
            <h2 className="max-w-4xl font-mono text-2xl leading-tight tracking-tight text-slate-100 light:text-[#111214] md:text-3xl">
              <Link
                to={`/blogs/${blog.slug}`}
                className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:hover:text-[#111214] light:focus-visible:ring-slate-900/30"
              >
                {blog.title}
              </Link>
            </h2>

            <p className="max-w-4xl font-body text-sm font-medium leading-7 text-slate-400 light:text-[#5b5f66] md:text-base">
              {blog.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-800/70 pt-5 light:border-[#e3e5e8] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 rounded-full border border-slate-800/70 light:border-[#e3e5e8]">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback className="bg-slate-900 font-mono text-xs text-slate-300 light:bg-[#f1f3f4] light:text-[#5b5f66]">
                  {blog.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-body text-sm font-semibold text-slate-200 light:text-[#111214]">
                  {blog.author.name}
                </div>
                <div className="mt-0.5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 light:text-[#8c929b]">
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
              className="inline-flex w-fit items-center gap-2 border border-slate-800/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300 transition-colors group-hover:border-slate-700 group-hover:text-slate-100 light:border-[#e3e5e8] light:text-[#5b5f66] light:group-hover:border-[#bfc5cc] light:group-hover:text-[#111214]"
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
