import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import MarkdownRenderer from '@/components/shorts/MarkdownRenderer'
import { Button } from '@/components/ui/button'
import DrawingFrame from '@/components/design-system/DrawingFrame'
import MetadataRow from '@/components/design-system/MetadataRow'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import { getShortBySlug } from '@/data/shorts'

export default function ShortDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const short = slug ? getShortBySlug(slug) : undefined

  if (!short) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--paper)] px-6 text-[var(--graphite)]">
        <div className="border border-[var(--border-line)] bg-[var(--paper)] p-8 text-center shadow-[var(--shadow-paper-xs)]">
          <TechnicalLabel>404 // SHORT_NOT_FOUND</TechnicalLabel>
          <h1 className="mt-4 font-mono text-2xl font-semibold text-[var(--graphite)]">
            Short not found
          </h1>
          <Button asChild variant="technical" className="mt-6">
            <Link to="/shorts">Back to shorts</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--paper)] text-[var(--graphite)]">
      <DrawingFrame className="py-10 md:py-14">
        <div className="mx-auto max-w-5xl">
          <Button
            type="button"
            variant="technical"
            onClick={() => navigate('/shorts')}
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to shorts
          </Button>

          <article className="border border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-xs)]">
            <header className="grid gap-px bg-[var(--border-line)] md:grid-cols-[minmax(0,1fr)_280px]">
              <div className="bg-[var(--paper)] p-5 md:p-8">
                <div className="text-drawing-label">01 // SHORT_DETAIL</div>
                <h1 className="mt-8 max-w-3xl font-mono text-4xl font-semibold leading-tight text-[var(--graphite)] md:text-6xl">
                  {short.title}
                </h1>

                {short.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    {short.tags.map((tag) => (
                      <TechnicalLabel key={tag} variant="outline">
                        {tag}
                      </TechnicalLabel>
                    ))}
                  </div>
                )}
              </div>

              <aside className="bg-[var(--paper)] p-5 md:p-8" aria-label="Short metadata">
                <TechnicalLabel variant="status">DETAIL_READY</TechnicalLabel>
                <div className="mt-8">
                  <MetadataRow
                    items={[
                      `route: /shorts/${short.slug}`,
                      `date: ${short.date}`,
                      `tags: ${short.tags.length}`,
                    ]}
                  />
                </div>
              </aside>
            </header>

            <div className="prose prose-invert light:prose-light max-w-none p-5 md:p-8">
              <MarkdownRenderer content={short.content} />
            </div>
          </article>
        </div>
      </DrawingFrame>
    </div>
  )
}
