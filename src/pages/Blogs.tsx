import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { getBlogsByCategory, type BlogCategory } from "@/data/blogs";
import BlogCard from "@/components/blogs/BlogCard";
import { cn } from "@/lib";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const categories: (BlogCategory | "All")[] = [
  "All",
  "My journey",
  "Idea",
  "Technical writer",
  "Opinions",
];

const ITEMS_PER_PAGE = 10;

const formatLatestDate = (dateString?: string) => {
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

const formatCategoryLabel = (category: BlogCategory | "All") =>
  category === "All" ? "ALL_POSTS" : category.toUpperCase().replace(/\s+/g, "_");

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | "All"
  >("All");
  const [currentPage, setCurrentPage] = useState(1);
  const allBlogs = getBlogsByCategory("All");
  const filteredBlogs = getBlogsByCategory(selectedCategory);
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const latestBlog = allBlogs[0];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (heroRef.current) {
        heroRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="blog-pattern min-h-screen flex flex-col relative bg-slate-950 light:bg-[#fafafa]">
      <div
        ref={heroRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 w-full relative z-10 py-10 md:py-14"
      >
        <header
          className="border-y border-slate-800/70 light:border-[#e3e5e8]"
          style={{
            animation: "fade-in 420ms ease-out both",
            animationDelay: "40ms",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="relative px-0 py-10 md:py-14 lg:pr-14">
              <div className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500 light:text-[#8c929b]">
                <span>01 // BLOG_INDEX</span>
                <span className="hidden h-px w-16 bg-slate-700/70 light:bg-[#d7dbe0] sm:block" />
              </div>

              <h1 className="max-w-4xl font-mono text-[48px] leading-[0.98] tracking-tight text-slate-100 light:text-[#111214] sm:text-[72px] md:text-[96px]">
                Writing /
                <br />
                Notes
              </h1>

              <p className="mt-7 max-w-2xl font-body text-base font-medium leading-8 text-slate-400 light:text-[#5b5f66] md:text-lg">
                Field notes, technical breakdowns, and personal essays from the
                workbench. Built for scanning first, reading second.
              </p>
            </div>

            <aside className="border-t border-slate-800/70 px-0 py-8 light:border-[#e3e5e8] lg:border-l lg:border-t-0 lg:px-8 lg:py-12">
              <div className="mb-9 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 light:text-[#8c929b]">
                <span>02 // INDEX_META</span>
                <span>BUILD:2026</span>
              </div>

              <dl className="grid grid-cols-2 gap-px overflow-hidden border border-slate-800/70 bg-slate-800/70 light:border-[#e3e5e8] light:bg-[#e3e5e8]">
                <div className="bg-slate-950 px-4 py-5 light:bg-white">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 light:text-[#8c929b]">
                    Posts
                  </dt>
                  <dd className="mt-2 font-mono text-3xl text-slate-100 light:text-[#111214]">
                    {allBlogs.length}
                  </dd>
                </div>
                <div className="bg-slate-950 px-4 py-5 light:bg-white">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 light:text-[#8c929b]">
                    Routes
                  </dt>
                  <dd className="mt-2 font-mono text-3xl text-slate-100 light:text-[#111214]">
                    {categories.length - 1}
                  </dd>
                </div>
                <div className="col-span-2 bg-slate-950 px-4 py-5 light:bg-white">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 light:text-[#8c929b]">
                    Latest dispatch
                  </dt>
                  <dd className="mt-2 font-mono text-sm uppercase tracking-[0.16em] text-slate-200 light:text-[#111214]">
                    {formatLatestDate(latestBlog?.date)}
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22c55e]">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                <span>ARCHIVE_LIVE</span>
              </div>
            </aside>
          </div>
        </header>

        <section className="border-b border-slate-800/70 light:border-[#e3e5e8]">
          <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[170px_minmax(0,1fr)] lg:items-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 light:text-[#8c929b]">
              03 // ROUTES
            </div>

            <div
              className="grid grid-cols-2 border border-slate-800/70 light:border-[#e3e5e8] sm:flex"
              role="tablist"
              aria-label="Filter blog posts by category"
            >
              {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="blog-feed"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "group relative min-h-12 border-b border-r border-slate-800/70 px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:border-[#e3e5e8] light:focus-visible:ring-slate-900/30 sm:border-b-0",
                      isActive
                        ? "bg-slate-100 text-slate-950 light:bg-[#111214] light:text-white"
                        : "bg-slate-950/40 text-slate-400 hover:bg-slate-900/80 hover:text-slate-100 light:bg-white/70 light:text-[#5b5f66] light:hover:bg-[#f3f4f4] light:hover:text-[#111214]"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors",
                          isActive
                            ? "bg-[#22c55e]"
                            : "bg-slate-700 light:bg-[#d7dbe0]"
                        )}
                        aria-hidden="true"
                      />
                      {formatCategoryLabel(category)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="sr-only" aria-live="polite" role="status">
          {filteredBlogs.length === 0
            ? "No blog posts found"
            : `${filteredBlogs.length} blog post${filteredBlogs.length === 1 ? "" : "s"} found`}
        </div>

        <section
          id="blog-feed"
          role="feed"
          aria-label="Blog posts"
          className="border-b border-slate-800/70 light:border-[#e3e5e8]"
        >
          {paginatedBlogs.length === 0 ? (
            <div className="grid grid-cols-1 gap-6 py-16 lg:grid-cols-[170px_minmax(0,1fr)]">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 light:text-[#8c929b]">
                00 // EMPTY
              </div>
              <div className="border border-dashed border-slate-700 px-6 py-12 light:border-[#d7dbe0]">
                <FileText
                  className="mb-5 h-8 w-8 text-slate-500 light:text-[#8c929b]"
                  aria-hidden="true"
                />
                <h2 className="font-mono text-2xl text-slate-100 light:text-[#111214]">
                  No entries on this route
                </h2>
                <p className="mt-3 max-w-xl font-body text-sm font-medium leading-7 text-slate-400 light:text-[#5b5f66]">
                  Try another category rail to inspect the rest of the writing
                  archive.
                </p>
              </div>
            </div>
          ) : (
            paginatedBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={startIndex + index} />
            ))
          )}
        </section>

        {totalPages > 1 && (
          <section className="grid grid-cols-1 gap-6 py-7 lg:grid-cols-[170px_minmax(0,1fr)] lg:items-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 light:text-[#8c929b]">
              04 // PAGE_CTRL
            </div>

            <div className="flex flex-col gap-4 border border-slate-800/70 bg-slate-950/50 p-3 light:border-[#e3e5e8] light:bg-white/70 md:flex-row md:items-center md:justify-between">
              <div className="px-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400 light:text-[#5b5f66]">
                Page {String(currentPage).padStart(2, "0")} /{" "}
                {String(totalPages).padStart(2, "0")}
              </div>

              <Pagination className="mx-0 w-full justify-start md:w-auto md:justify-end">
                <PaginationContent className="flex-wrap justify-start gap-1 md:justify-end">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-10 rounded-none border-slate-800/70 bg-transparent px-4 font-mono text-[11px] uppercase tracking-[0.18em] shadow-none light:border-[#e3e5e8]"
                    />
                  </PaginationItem>

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, i) => i + 1
                  ).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={page === currentPage}
                            aria-label={`Go to page ${page}`}
                            className="h-10 w-10 rounded-none border-slate-800/70 bg-transparent font-mono text-[11px] shadow-none light:border-[#e3e5e8]"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis className="h-10 w-10 text-slate-500 light:text-[#8c929b]" />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-10 rounded-none border-slate-800/70 bg-transparent px-4 font-mono text-[11px] uppercase tracking-[0.18em] shadow-none light:border-[#e3e5e8]"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
