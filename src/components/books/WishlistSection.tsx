import { wishlistBooks } from '@/data/books'
import BookCard from './BookCard'
import FadeInUp from '@/components/common/FadeInUp'

export default function WishlistSection() {
  if (wishlistBooks.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="wishlist-heading" className="px-6 md:px-0 py-12 md:py-16">
      <div className="space-y-8">
        <FadeInUp delay={0.1}>
          <h2
            id="wishlist-heading"
            className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight font-mono font-medium"
          >
            Wishlist
          </h2>
        </FadeInUp>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistBooks.map((book, index) => (
            <FadeInUp key={book.id} delay={0.1 + index * 0.08}>
              <BookCard book={book} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
