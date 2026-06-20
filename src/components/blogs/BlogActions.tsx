import { useEffect, useState } from 'react'
import { Bookmark, Heart, type LucideIcon } from 'lucide-react'
import {
  isBlogLiked,
  isBlogSaved,
  toggleBlogLike,
  toggleBlogSave,
} from '@/lib/blogStorage'
import { cn } from '@/lib'

interface BlogActionsProps {
  slug: string
  initialLiked?: boolean
}

interface BlogActionButtonProps {
  active: boolean
  activeClassName: string
  ariaLabel: string
  disabled?: boolean
  icon: LucideIcon
  inactiveClassName: string
  label: string
  onClick: () => void
}

const actionButtonClassName =
  'motion-button inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 font-body text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40'

const inactiveActionClassName =
  'border-slate-800/70 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:bg-slate-800/80 hover:text-slate-200 light:border-slate-300/70 light:bg-slate-100/60 light:text-slate-600 light:hover:border-slate-400 light:hover:bg-slate-200/80 light:hover:text-slate-800'

function BlogActionButton({
  active,
  activeClassName,
  ariaLabel,
  disabled = false,
  icon: Icon,
  inactiveClassName,
  label,
  onClick,
}: BlogActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        actionButtonClassName,
        active ? activeClassName : inactiveClassName,
        disabled && 'opacity-50 !cursor-not-allowed',
      )}
      aria-label={ariaLabel}
    >
      <Icon className={cn('h-4 w-4', active && 'fill-current')} />
      {label}
    </button>
  )
}

export default function BlogActions({
  slug,
  initialLiked = false,
}: BlogActionsProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [saved, setSaved] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  useEffect(() => {
    isBlogLiked(slug).then(setLiked)
    setSaved(isBlogSaved(slug))
  }, [slug])

  const handleLike = () => {
    if (isLiking) {
      return
    }

    setIsLiking(true)
    toggleBlogLike(slug)
      .then(setLiked)
      .catch((error) => {
        console.error('Error toggling like:', error)
      })
      .finally(() => {
        setIsLiking(false)
      })
  }

  const handleSave = () => {
    setSaved(toggleBlogSave(slug))
  }

  return (
    <div className="flex items-center gap-3">
      <BlogActionButton
        active={liked}
        activeClassName="border-red-500/70 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-[0_0_12px_rgba(239,68,68,0.15)] light:text-red-600 light:hover:bg-red-500/20"
        ariaLabel={liked ? 'Unlike this blog' : 'Like this blog'}
        disabled={isLiking}
        icon={Heart}
        inactiveClassName={inactiveActionClassName}
        label={liked ? 'Liked' : 'Like'}
        onClick={handleLike}
      />
      <BlogActionButton
        active={saved}
        activeClassName="border-blue-500/70 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] light:text-blue-600 light:hover:bg-blue-500/20"
        ariaLabel={saved ? 'Remove from saved' : 'Save for later'}
        icon={Bookmark}
        inactiveClassName={inactiveActionClassName}
        label={saved ? 'Saved' : 'Save'}
        onClick={handleSave}
      />
    </div>
  )
}
