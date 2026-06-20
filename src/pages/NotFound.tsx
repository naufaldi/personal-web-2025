import { ArrowLeft, Code2, FileText, Home } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import FadeInUp from '@/components/common/FadeInUp'
import DrawingFrame from '@/components/design-system/DrawingFrame'
import MetadataRow from '@/components/design-system/MetadataRow'
import RouteRail from '@/components/design-system/RouteRail'
import { TechnicalLabel } from '@/components/design-system/TechnicalLabel'
import { Button } from '@/components/ui/button'

const fallbackRoutes = [
  {
    index: '01',
    label: 'Return home',
    href: '/',
    icon: <Home className="h-4 w-4" aria-hidden="true" />,
  },
  {
    index: '02',
    label: 'View projects',
    href: '/projects',
    icon: <Code2 className="h-4 w-4" aria-hidden="true" />,
  },
  {
    index: '03',
    label: 'Read writing',
    href: '/blogs',
    icon: <FileText className="h-4 w-4" aria-hidden="true" />,
  },
]

export default function NotFound() {
  const location = useLocation()
  const navigate = useNavigate()
  const requestedPath = location.pathname || '/'

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--paper)] text-[var(--graphite)]">
      <DrawingFrame
        className="min-h-[calc(82dvh-72px)]"
        innerClassName="min-h-[calc(82dvh-72px)]"
      >
        <div className="pointer-events-none absolute inset-x-5 top-10 bottom-10 hidden md:block">
          <div className="absolute left-[8%] right-[8%] top-[20%] border-t border-dashed border-[var(--border-dashed)]" />
          <div className="absolute left-[8%] right-[8%] top-[52%] border-t border-dashed border-[var(--border-dashed)]" />
          <div className="absolute left-[8%] right-[8%] bottom-[20%] border-t border-[var(--border-line)]" />
          <div className="absolute left-[8%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
          <div className="absolute left-[60%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
          <div className="absolute right-[9%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
          <span className="coordinate-label absolute left-[8%] top-8">X-1440</span>
          <span className="coordinate-label absolute left-[60%] top-8">X-704</span>
          <span className="coordinate-label absolute right-[8%] top-8">X-0</span>
          <span className="coordinate-label absolute left-[7%] top-[20%]">Y-0</span>
          <span className="coordinate-label absolute left-[7%] top-[52%]">Y-404</span>
          <span className="coordinate-label absolute left-[7%] bottom-[20%]">Y-808</span>
        </div>

        <section
          className="grid min-h-[calc(82dvh-72px)] items-center py-16 md:py-20"
          aria-labelledby="not-found-heading"
        >
          <FadeInUp delay={0.1}>
            <div className="relative mx-auto w-full max-w-[1180px] border border-[var(--border-line)] bg-[var(--paper)]/70 p-5 shadow-[var(--shadow-paper-xs)] md:p-8">
              <div
                className="absolute left-0 top-0 h-px w-32 bg-[var(--status-green)]"
                aria-hidden="true"
              />

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="space-y-7">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-[var(--border-dashed)] pb-5">
                    <TechnicalLabel variant="mono">01 // NOT_FOUND</TechnicalLabel>
                    <TechnicalLabel variant="status">ROUTE_MISSING</TechnicalLabel>
                  </div>

                  <div className="border border-[var(--border-line)] bg-[var(--paper)] px-4 py-5 md:px-6 md:py-7">
                    <h1
                      id="not-found-heading"
                      className="font-display text-[clamp(3.1rem,6.8vw,7.15rem)] font-black uppercase leading-[0.86] tracking-normal text-[var(--graphite)]"
                    >
                      404 /
                      <br />
                      Route Lost
                    </h1>
                  </div>

                  <div className="max-w-2xl space-y-5 md:pl-6">
                    <h2 className="font-mono text-2xl leading-tight text-[var(--graphite)] md:text-3xl">
                      The requested route is not mapped.
                    </h2>
                    <p className="text-body-readable">
                      This address does not exist in the current route index, or
                      it moved during a rebuild. Pick a known path from the route
                      rail, or step back to the page that sent you here.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Button
                        type="button"
                        variant="technical"
                        onClick={() => navigate(-1)}
                        className="w-full justify-center sm:w-auto"
                      >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Go back
                      </Button>
                    </div>
                  </div>
                </div>

                <aside
                  className="border-t border-[var(--border-line)] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
                  aria-label="Fallback route links"
                >
                  <TechnicalLabel variant="mono">02 // ROUTES</TechnicalLabel>
                  <RouteRail items={fallbackRoutes} ariaLabel="Fallback route links" />
                </aside>
              </div>

              <div className="mt-9 border-t border-[var(--border-line)] pt-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <MetadataRow
                    items={[
                      'Status: 404',
                      `Request: ${requestedPath}`,
                      'Build: 2026',
                    ]}
                  />
                  <TechnicalLabel variant="outline">TRACE_ROUTE</TechnicalLabel>
                </div>
              </div>
            </div>
          </FadeInUp>
        </section>
      </DrawingFrame>
    </div>
  )
}
