export interface Book {
  id: string
  title: string
  author: string
  cover: string
  category: 'read' | 'currently-reading' | 'wishlist'
  recommended?: boolean
  links?: {
    amazon?: string
    goodreads?: string
    website?: string
  }
}

export const readBooks: Book[] = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    cover: 'https://picsum.photos/300/450?random=1',
    category: 'read',
    recommended: true,
    links: {
      amazon: 'https://amazon.com/clean-code',
      goodreads: 'https://goodreads.com/clean-code',
    },
  },
  {
    id: '2',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    cover: 'https://picsum.photos/300/450?random=2',
    category: 'read',
    recommended: true,
    links: {
      amazon: 'https://amazon.com/pragmatic-programmer',
      goodreads: 'https://goodreads.com/pragmatic-programmer',
    },
  },
  {
    id: '3',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    cover: 'https://picsum.photos/300/450?random=3',
    category: 'read',
    links: {
      amazon: 'https://amazon.com/ddia',
      goodreads: 'https://goodreads.com/ddia',
    },
  },
]

export const currentlyReadingBooks: Book[] = [
  {
    id: '4',
    title: 'System Design Interview',
    author: 'Alex Xu',
    cover: 'https://picsum.photos/300/450?random=4',
    category: 'currently-reading',
    links: {
      amazon: 'https://amazon.com/system-design-interview',
      goodreads: 'https://goodreads.com/system-design-interview',
    },
  },
]

export const wishlistBooks: Book[] = [
  {
    id: '5',
    title: 'Refactoring',
    author: 'Martin Fowler',
    cover: 'https://picsum.photos/300/450?random=5',
    category: 'wishlist',
    links: {
      amazon: 'https://amazon.com/refactoring',
      goodreads: 'https://goodreads.com/refactoring',
    },
  },
  {
    id: '6',
    title: 'You Don\'t Know JS',
    author: 'Kyle Simpson',
    cover: 'https://picsum.photos/300/450?random=6',
    category: 'wishlist',
    links: {
      amazon: 'https://amazon.com/ydkjs',
      goodreads: 'https://goodreads.com/ydkjs',
    },
  },
]

