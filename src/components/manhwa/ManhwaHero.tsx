import { BookOpen } from 'lucide-react'

export default function ManhwaHero() {
  return (
    <div
      className="px-6 md:px-0 flex flex-col items-center gap-4 mb-12"
      style={{
        animation: 'fade-in 900ms ease-out both',
        animationDelay: '60ms',
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/70 bg-slate-900/60 light:bg-white/85">
        <BookOpen className="h-6 w-6 text-slate-300 light:text-slate-600" />
      </div>
      <h1
        className="text-4xl md:text-5xl text-center"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
        }}
      >
        <span className="text-slate-100 light:text-slate-900">Manhwa</span>
      </h1>
      <p
        className="text-sm md:text-base text-slate-500 light:text-slate-600 text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
        }}
      >
        A collection of Korean webcomics and stories
      </p>
    </div>
  )
}
