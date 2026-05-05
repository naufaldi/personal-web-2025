import { supabase } from './supabase'

const ANONYMOUS_USER_ID_KEY = 'blog_anonymous_user_id'
const SAVED_BLOGS_KEY = 'blog_saved_blogs'

const getAnonymousUserId = (): string => {
  const storedUserId = localStorage.getItem(ANONYMOUS_USER_ID_KEY)
  if (storedUserId) {
    return storedUserId
  }

  const userId = crypto.randomUUID()
  localStorage.setItem(ANONYMOUS_USER_ID_KEY, userId)
  return userId
}

const readSavedBlogs = (): string[] => {
  const saved = localStorage.getItem(SAVED_BLOGS_KEY)
  return saved ? (JSON.parse(saved) as string[]) : []
}

const writeSavedBlogs = (savedBlogs: string[]): void => {
  localStorage.setItem(SAVED_BLOGS_KEY, JSON.stringify(savedBlogs))
}

export const getBlogViews = async (slug: string): Promise<number> => {
  if (!supabase) return 0

  try {
    const { data, error } = await supabase
      .from('blog_views')
      .select('views')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('Error fetching blog views:', error)
      return 0
    }

    return data?.views || 0
  } catch (error) {
    console.error('Error fetching blog views:', error)
    return 0
  }
}

export const incrementBlogViews = async (slug: string): Promise<number> => {
  if (!supabase) return 0

  try {
    const { data, error } = await supabase
      .from('blog_views')
      .select('views')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('Error fetching blog views:', error)
      return 0
    }

    if (!data) {
      // No existing record, create new one
      const { data: newData, error: insertError } = await supabase
        .from('blog_views')
        .insert({ slug, views: 1 })
        .select('views')
        .maybeSingle()

      if (insertError) {
        console.error('Error inserting blog views:', insertError)
        return 0
      }

      return newData?.views || 1
    }

    const newViews = (data.views || 0) + 1

    const { data: updateData, error: updateError } = await supabase
      .from('blog_views')
      .update({ views: newViews, updated_at: new Date().toISOString() })
      .eq('slug', slug)
      .select('views')
      .maybeSingle()

    if (updateError) {
      console.error('Error updating blog views:', updateError)
      return data.views || 0
    }

    return updateData?.views || newViews
  } catch (error) {
    console.error('Error incrementing blog views:', error)
    return 0
  }
}

export const getBlogLikes = async (slug: string): Promise<number> => {
  if (!supabase) return 0

  try {
    const { count, error } = await supabase
      .from('blog_likes')
      .select('*', { count: 'exact', head: true })
      .eq('slug', slug)

    if (error) {
      console.error('Error fetching blog likes:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('Error fetching blog likes:', error)
    return 0
  }
}

export const isBlogLiked = async (slug: string): Promise<boolean> => {
  if (!supabase) return false

  try {
    const userId = getAnonymousUserId()
    const { data, error } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('slug', slug)
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      console.error('Error checking blog like:', error)
      return false
    }

    return !!data
  } catch (error) {
    console.error('Error checking blog like:', error)
    return false
  }
}

export const toggleBlogLike = async (slug: string): Promise<boolean> => {
  if (!supabase) return false

  try {
    const userId = getAnonymousUserId()
    const isLiked = await isBlogLiked(slug)

    if (isLiked) {
      const { error } = await supabase
        .from('blog_likes')
        .delete()
        .eq('slug', slug)
        .eq('user_id', userId)

      if (error) {
        console.error('Error removing blog like:', error)
        return true
      }

      return false
    }

    const { error } = await supabase
      .from('blog_likes')
      .insert({ slug, user_id: userId })

    if (error) {
      console.error('Error adding blog like:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error toggling blog like:', error)
    return false
  }
}

export const isBlogSaved = (slug: string): boolean => {
  try {
    return readSavedBlogs().includes(slug)
  } catch (error) {
    console.error('Error checking saved blog:', error)
    return false
  }
}

export const toggleBlogSave = (slug: string): boolean => {
  try {
    const savedBlogs = readSavedBlogs()
    const nextSavedBlogs = savedBlogs.includes(slug)
      ? savedBlogs.filter((savedSlug) => savedSlug !== slug)
      : [...savedBlogs, slug]

    writeSavedBlogs(nextSavedBlogs)
    return nextSavedBlogs.includes(slug)
  } catch (error) {
    console.error('Error toggling saved blog:', error)
    return false
  }
}
