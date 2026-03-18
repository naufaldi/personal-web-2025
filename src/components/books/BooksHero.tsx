import { BookOpen } from 'lucide-react'
import FadeInUp from '@/components/common/FadeInUp'

export default function BooksHero() {
  return (
    <div className="px-6 md:px-0 flex flex-col items-center gap-4 mb-12">
      <FadeInUp delay={0.1}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/70 bg-slate-900/60 light:bg-white/85">
          <BookOpen className="h-6 w-6 text-slate-300 light:text-slate-600" aria-hidden="true" />
        </div>
      </FadeInUp>
      <FadeInUp delay={0.18}>
        <h1
          id="books-hero-heading"
          className="text-4xl md:text-5xl text-center font-mono font-bold"
        >
          <span className="text-slate-100 light:text-slate-900">Books</span>
        </h1>
      </FadeInUp>
      <FadeInUp delay={0.26}>
        <p className="text-sm md:text-base text-slate-500 light:text-slate-600 text-center font-body font-medium">
          A collection of knowledge and inspiration
        </p>
      </FadeInUp>
    </div>
  )
}
