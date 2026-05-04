import BlueprintIndexHero from '@/components/design-system/BlueprintIndexHero'
import { currentlyReadingBooks, readBooks, wishlistBooks } from '@/data/books'

export default function BooksHero() {
  const totalBooks = readBooks.length + currentlyReadingBooks.length + wishlistBooks.length

  return (
    <BlueprintIndexHero
      eyebrow="LIBRARY_INDEX"
      title="Books"
      titleId="books-hero-heading"
      description="A reading index for engineering, systems, and craft. Books that shaped how I think about software delivery, maintainability, and long-term engineering taste."
      stats={[
        { label: 'Read', value: readBooks.length },
        { label: 'Active', value: currentlyReadingBooks.length },
      ]}
      latestLabel="Wishlist"
      latestValue={`${wishlistBooks.length} queued`}
      statusLabel="LIBRARY_READY"
      metadata={[`${totalBooks} books`, 'covers: real', 'source: open_library']}
      actionHref="#read-heading"
      actionLabel="View library"
    />
  )
}
