import { currentlyReadingBooks } from '@/data/books'
import BookCard from './BookCard'

export default function CurrentlyReadingSection() {
  if (currentlyReadingBooks.length === 0) {
    return null
  }

  return (
    <section className="px-6 md:px-0 py-12 md:py-16">
      <div className="mx-auto max-w-7xl sm:px-6 w-full">
        <div className="space-y-8">
          <h2
            className="text-[24px] md:text-[28px] text-slate-100 light:text-slate-900 tracking-tight"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              animation: 'fade-in-up 800ms ease-out both',
              animationDelay: '60ms',
            }}
          >
            Currently Reading
          </h2>
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{
              animation: 'fade-in 900ms ease-out both',
              animationDelay: '120ms',
            }}
          >
            {currentlyReadingBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
