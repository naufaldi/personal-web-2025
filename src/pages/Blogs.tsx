import { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import { getBlogsByCategory, type BlogCategory } from '@/data/blogs'
import BlogCard from '@/components/blogs/BlogCard'
import { cn } from '@/lib'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const categories: (BlogCategory | 'All')[] = ['All', 'My journey', 'Idea', 'Technical writer', 'Opinions']
const ITEMS_PER_PAGE = 10

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const filteredBlogs = getBlogsByCategory(selectedCategory)
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE)

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-900 light:bg-slate-50">
      <div className="bg-pattern-blogs" />
      <div className="mx-auto max-w-7xl px-6 w-full relative z-10 py-20 md:py-16">
        <div
          className="px-6 md:px-0 flex flex-col items-center gap-4 mb-12"
          style={{
            animation: 'fade-in 900ms ease-out both',
            animationDelay: '60ms',
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-300/60 bg-slate-900/60 light:bg-slate-100/60">
            <BookOpen className="h-6 w-6 text-slate-300 light:text-slate-700" />
          </div>
          <h1
            className="text-4xl md:text-5xl text-center"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}
          >
            <span className="text-slate-100 light:text-slate-900">My </span>
            <span className="text-slate-300 light:text-slate-700">Blog</span>
          </h1>
          <p
            className="text-sm md:text-base text-center text-slate-500 light:text-slate-600"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            Thoughts, ideas, and experiences I want to share.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-md border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40',
                selectedCategory === category
                  ? 'border-slate-700/70 light:border-slate-200/70 bg-slate-900/90 light:bg-white/90 text-slate-200 light:text-slate-800'
                  : 'border-slate-800/70 light:border-slate-300/70 bg-slate-900/60 light:bg-slate-100/60 hover:border-slate-700/70 light:hover:border-slate-200/70 hover:bg-slate-900/80 light:hover:bg-slate-100/80 text-slate-400 light:text-slate-600'
              )}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: selectedCategory === category ? 600 : 500,
              }}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {paginatedBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p
                className="text-slate-400 light:text-slate-600"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
              >
                No blogs found in this category.
              </p>
            </div>
          ) : (
            paginatedBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={startIndex + index} />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 py-6 px-4 rounded-lg bg-slate-900/40 light:bg-white/60 backdrop-blur-sm border border-slate-800/50 light:border-slate-200/50">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={cn(
                      currentPage === 1 && "pointer-events-none opacity-50"
                    )}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={cn(
                      currentPage === totalPages && "pointer-events-none opacity-50"
                    )}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}