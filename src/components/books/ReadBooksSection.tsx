import { readBooks } from '@/data/books'
import BookCard from './BookCard'
import FadeInUp from '@/components/common/FadeInUp'
import SectionHeader from '@/components/design-system/SectionHeader'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'

export default function ReadBooksSection() {
  if (readBooks.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="read-heading" className="py-12 md:py-16">
      <div className="site-container">
        <FadeInUp delay={0.1}>
          <SectionHeader
            number="03"
            label="READ_STACK"
            title="Read"
            titleId="read-heading"
            description="Books already absorbed into my engineering and product thinking."
            action={
              <TechnicalLabel variant="outline">
                {readBooks.length} book{readBooks.length !== 1 ? 's' : ''}
              </TechnicalLabel>
            }
          />
        </FadeInUp>

        <div className="mt-8 grid grid-cols-1 gap-0 border-y border-[var(--border-line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {readBooks.map((book, index) => (
            <FadeInUp key={book.id} delay={0.1 + index * 0.08} className="h-full">
              <BookCard book={book} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
