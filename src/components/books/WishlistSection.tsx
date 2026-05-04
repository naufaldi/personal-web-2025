import { wishlistBooks } from '@/data/books'
import BookCard from './BookCard'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function WishlistSection() {
  if (wishlistBooks.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="wishlist-heading" className="py-12 md:py-20">
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="05"
            label="BOOK_QUEUE"
            title="Wishlist"
            titleId="wishlist-heading"
            description="Books queued for later reading."
            action={
              <TechnicalLabel variant="outline">
                {wishlistBooks.length} queued
              </TechnicalLabel>
            }
          />
        </FadeInUp>

        <div className="mt-8 grid grid-cols-1 gap-0 border-y border-[var(--border-line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistBooks.map((book, index) => (
            <FadeInUp key={book.id} delay={0.1 + index * 0.08} className="h-full">
              <BookCard book={book} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
