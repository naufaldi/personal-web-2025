import { useEffect, useState } from 'react'
import { Calendar, Clock, Eye, Heart, type LucideIcon } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { getBlogLikes, getBlogViews } from '@/lib/blogStorage'
import type { BlogItem } from '@/data/blogs'

interface BlogMetadataProps {
  blog: BlogItem
  views?: number
  likes?: number
}

interface MetadataItemProps {
  icon: LucideIcon
  label: string
}

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

function MetadataItem({ icon: Icon, label }: MetadataItemProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5" />
      <span className="font-body font-normal">{label}</span>
    </div>
  )
}

export default function BlogMetadata({
  blog,
  views: initialViews,
  likes: initialLikes,
}: BlogMetadataProps) {
  const [views, setViews] = useState(initialViews ?? 0)
  const [likes, setLikes] = useState(initialLikes ?? 0)

  useEffect(() => {
    getBlogViews(blog.slug).then(setViews)
    getBlogLikes(blog.slug).then(setLikes)
  }, [blog.slug])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-slate-800/70 light:border-slate-300/70">
          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
          <AvatarFallback className="bg-slate-800 text-slate-300 light:bg-slate-200 light:text-slate-700">
            {blog.author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-body text-sm font-semibold text-slate-400 light:text-slate-600">
            {blog.author.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 light:text-slate-600">
            <Calendar className="h-3 w-3" />
            <span className="font-body font-normal">{formatDate(blog.date)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 light:text-slate-600">
        <MetadataItem icon={Clock} label={`${blog.readTime || 5} min read`} />
        <MetadataItem icon={Eye} label={`${views.toLocaleString()} views`} />
        <MetadataItem icon={Heart} label={`${likes.toLocaleString()} likes`} />
      </div>
    </div>
  )
}
