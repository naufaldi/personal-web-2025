import { useEffect, useState } from 'react'
import { Calendar, Clock, Eye, Heart } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getBlogViews, getBlogLikes } from '@/lib/blogStorage'
import type { BlogItem } from '@/data/blogs'

interface BlogMetadataProps {
  blog: BlogItem
  views?: number
  likes?: number
}

export default function BlogMetadata({ blog, views: initialViews, likes: initialLikes }: BlogMetadataProps) {
  const [views, setViews] = useState(initialViews ?? 0)
  const [likes, setLikes] = useState(initialLikes ?? 0)

  useEffect(() => {
    getBlogViews(blog.slug).then(setViews)
    getBlogLikes(blog.slug).then(setLikes)
  }, [blog.slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-slate-800/70">
          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
          <AvatarFallback className="bg-slate-800 text-slate-300">
            {blog.author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p
            className="text-sm"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              color: 'rgb(163, 163, 163)',
            }}
          >
            {blog.author.name}
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'rgb(163, 163, 163)' }}>
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
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'rgb(163, 163, 163)' }}>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" style={{ color: 'rgb(163, 163, 163)' }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}
          >
            {blog.readTime || 5} min read
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5" style={{ color: 'rgb(163, 163, 163)' }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}
          >
            {views.toLocaleString()} views
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Heart className="h-3.5 w-3.5" style={{ color: 'rgb(163, 163, 163)' }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}
          >
            {likes.toLocaleString()} likes
          </span>
        </div>
      </div>
    </div>
  )
}

