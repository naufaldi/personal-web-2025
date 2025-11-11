import BooksHero from '@/components/books/BooksHero'
import ReadBooksSection from '@/components/books/ReadBooksSection'
import CurrentlyReadingSection from '@/components/books/CurrentlyReadingSection'
import WishlistSection from '@/components/books/WishlistSection'
import { Separator } from '@/components/ui/separator'
import { readBooks, currentlyReadingBooks, wishlistBooks } from '@/data/books'

export default function Books() {
  const hasReadBooks = readBooks.length > 0
  const hasCurrentlyReading = currentlyReadingBooks.length > 0
  const hasWishlist = wishlistBooks.length > 0

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-pattern-books" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 w-full py-12 md:py-16 relative z-10">
        <BooksHero />

        {hasReadBooks && <ReadBooksSection />}

        {hasReadBooks && hasCurrentlyReading && (
          <Separator className="my-8 bg-slate-800/70" />
        )}

        {hasCurrentlyReading && <CurrentlyReadingSection />}

        {(hasReadBooks || hasCurrentlyReading) && hasWishlist && (
          <Separator className="my-8 bg-slate-800/70" />
        )}

        {hasWishlist && <WishlistSection />}
      </div>
    </div>
  )
}

