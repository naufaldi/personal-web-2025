import { useEffect, useState } from 'react'
import { ArrowRight, Calendar, Clock, Eye, Heart } from 'lucide-react'
import { Link } from 'react-router'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getBlogViews, getBlogLikes } from '@/lib/blogStorage'
import type { BlogItem } from '@/data/blogs'
import { cn } from '@/lib'

interface BlogCardProps {
  blog: BlogItem
  index: number
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  const [views, setViews] = useState(0)
  const [likes, setLikes] = useState(0)
  const animationDelay = `${120 + index * 100}ms`

  useEffect(() => {
    getBlogViews(blog.slug).then(setViews)
    getBlogLikes(blog.slug).then(setLikes)
  }, [blog.slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Card
      className={cn(
        'group border-slate-800/70 bg-slate-900/60 transition-all duration-200 hover:border-slate-700/70 hover:bg-slate-900/90 overflow-hidden',
      )}
      style={{
        animation: 'fade-in 900ms ease-out both',
        animationDelay,
      }}
    >
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
        {blog.image && (
          <div className="relative w-full md:w-48 lg:w-64 flex-shrink-0 h-48 md:h-40 rounded-lg overflow-hidden border border-slate-800/70 bg-slate-900/60">
            <img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
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
              <h3
                className="text-lg md:text-xl"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: 'rgb(163, 163, 163)',
                }}
              >
                {blog.title}
              </h3>
              <p
                className="text-sm line-clamp-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  color: 'rgb(163, 163, 163)',
                }}
              >
                {blog.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Avatar className="h-8 w-8 border border-slate-800/70">
              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
              <AvatarFallback className="bg-slate-800 text-slate-300 text-xs">
                {blog.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-wrap items-center gap-3 text-xs" style={{ color: 'rgb(163, 163, 163)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                {blog.author.name}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" style={{ color: 'rgb(163, 163, 163)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                  }}
                >
                  {formatDate(blog.date)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" style={{ color: 'rgb(163, 163, 163)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                  }}
                >
                  {blog.readTime || 5} min read
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" style={{ color: 'rgb(163, 163, 163)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                  }}
                >
                  {views.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" style={{ color: 'rgb(163, 163, 163)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                  }}
                >
                  {likes.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to={`/blogs/${blog.slug}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/70 bg-slate-900/60 px-4 py-2 text-sm transition-all duration-200 hover:border-slate-700/70 hover:bg-slate-900/90 hover:shadow-md hover:shadow-slate-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                color: 'rgb(163, 163, 163)',
              }}
              aria-label={`Read ${blog.title}`}
            >
              Read more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" style={{ color: 'rgb(163, 163, 163)' }} />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

