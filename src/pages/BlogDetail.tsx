import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { getBlogBySlug } from '@/data/blogs'
import { extractTOC } from '@/lib/toc'
import { incrementBlogViews } from '@/lib/blogStorage'
import MarkdownRenderer from '@/components/common/MarkdownRenderer'
import TableOfContents from '@/components/projects/TableOfContents'
import BlogMetadata from '@/components/blogs/BlogMetadata'
import BlogActions from '@/components/blogs/BlogActions'
import { Badge } from '@/components/ui/badge'

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const blog = slug ? getBlogBySlug(slug) : undefined
  const [viewsTracked, setViewsTracked] = useState(false)

  useEffect(() => {
    if (blog && !viewsTracked) {
      incrementBlogViews(blog.slug).then(() => {
        setViewsTracked(true)
      })
    }
  }, [blog, viewsTracked])

  if (!blog || !blog.content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: 'rgb(10, 10, 10)' }}>
        <div className="text-center">
          <h1
            className="text-2xl mb-4"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'rgb(163, 163, 163)',
            }}
          >
            Blog not found
          </h1>
          <Link
            to="/blogs"
            className="transition-colors hover:opacity-80"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              color: 'rgb(163, 163, 163)',
            }}
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  const toc = extractTOC(blog.content)

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: 'rgb(10, 10, 10)' }}>
      <div className="mx-auto max-w-7xl px-6 w-full py-12 md:py-16 relative z-10">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 mb-8 transition-colors hover:opacity-80"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            color: 'rgb(163, 163, 163)',
          }}
        >
          <ArrowLeft className="h-4 w-4" style={{ color: 'rgb(163, 163, 163)' }} />
          Back to Blogs
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <article
              className="space-y-6 bg-slate-900/30 rounded-lg p-6 md:p-8 border border-slate-800/50"
              style={{
                animation: 'fade-in 900ms ease-out both',
                animationDelay: '60ms',
              }}
            >
              <header className="space-y-4">
                {blog.image && (
                  <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border border-slate-800/70 bg-slate-900/60">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="border-slate-700/70 bg-slate-900/40"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 500,
                          color: 'rgb(163, 163, 163)',
                        }}
                      >
                        {blog.category}
                      </Badge>
                    </div>
                    <h1
                      className="text-3xl md:text-4xl mb-2 text-slate-100"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                      }}
                    >
                      {blog.title}
                    </h1>
                    <p
                      className="text-base md:text-lg mb-4 text-slate-300"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        lineHeight: '1.75',
                      }}
                    >
                      {blog.description}
                    </p>
                  </div>
                </div>

                <BlogMetadata blog={blog} />

                <div className="pt-2">
                  <BlogActions slug={blog.slug} />
                </div>
              </header>

              <div className="prose prose-invert max-w-none">
                <MarkdownRenderer content={blog.content} />
              </div>
            </article>
          </div>

          {toc.length > 0 && <TableOfContents items={toc} />}
        </div>
      </div>
    </div>
  )
}

