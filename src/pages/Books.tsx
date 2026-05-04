import BooksHero from '@/components/books/BooksHero'
import ReadBooksSection from '@/components/books/ReadBooksSection'
import CurrentlyReadingSection from '@/components/books/CurrentlyReadingSection'
import WishlistSection from '@/components/books/WishlistSection'
import { readBooks, currentlyReadingBooks, wishlistBooks } from '@/data/books'

export default function Books() {
  const hasReadBooks = readBooks.length > 0
  const hasCurrentlyReading = currentlyReadingBooks.length > 0
  const hasWishlist = wishlistBooks.length > 0

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--paper)] text-[var(--graphite)]">
      <div className="drawing-sheet">
        <BooksHero />
        {hasReadBooks && <ReadBooksSection />}
        {hasCurrentlyReading && <CurrentlyReadingSection />}
        {hasWishlist && <WishlistSection />}
      </div>
    </div>
  )
}
