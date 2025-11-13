import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { getBlogsByCategory, type BlogCategory } from '@/data/blogs'
import BlogCard from '@/components/blogs/BlogCard'
import { cn } from '@/lib'

const categories: (BlogCategory | 'All')[] = ['All', 'My journey', 'Idea', 'Technical writer', 'Opinions']

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All')
  const filteredBlogs = getBlogsByCategory(selectedCategory)

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-900 light:bg-white">
      <div className="bg-pattern-blogs" />
      <div className="mx-auto max-w-7xl px-6 w-full relative z-10 py-20 md:py-16">
        <div
          className="px-6 md:px-0 flex flex-col items-center gap-4 mb-12"
          style={{
            animation: 'fade-in 900ms ease-out both',
            animationDelay: '60ms',
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/60 bg-slate-900/60 light:bg-white/60">
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
          {filteredBlogs.length === 0 ? (
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
            filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

