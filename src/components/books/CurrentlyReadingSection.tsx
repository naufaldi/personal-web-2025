import { currentlyReadingBooks } from '@/data/books'
import BookCard from './BookCard'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function CurrentlyReadingSection() {
  if (currentlyReadingBooks.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="currently-reading-heading" className="py-12 md:py-16">
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="04"
            label="ACTIVE_READ"
            title="Currently reading"
            titleId="currently-reading-heading"
            description="Books in the active queue right now."
            action={
              <TechnicalLabel variant="status">
                {currentlyReadingBooks.length} active
              </TechnicalLabel>
            }
          />
        </FadeInUp>

        <div className="mt-8 grid grid-cols-1 gap-0 border-y border-[var(--border-line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentlyReadingBooks.map((book, index) => (
            <FadeInUp key={book.id} delay={0.1 + index * 0.08} className="h-full">
              <BookCard book={book} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
