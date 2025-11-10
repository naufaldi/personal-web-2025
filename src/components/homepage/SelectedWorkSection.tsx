import { siteConfig } from '@/data/site'

export default function SelectedWorkSection() {
  return (
    <section id="features" className="bg-slate-950 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <h2
          className="text-[24px] md:text-[28px] text-slate-100 tracking-tight"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            animation: 'fade-in-up 800ms ease-out both',
            animationDelay: '60ms',
          }}
        >
          Selected work
        </h2>
        <div
          className="mt-5 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            animation: 'fade-in 900ms ease-out both',
            animationDelay: '120ms',
          }}
        >
          {siteConfig.selectedProjects.map((project) => (
            <div
              key={project.title}
              className="group rounded-lg border border-slate-800/70 bg-slate-900/60 p-4 hover:border-slate-700/70 transition-colors"
            >
              <h3
                className="text-slate-100 text-[18px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                {project.title}
              </h3>
              <p
                className="mt-1.5 text-sm text-slate-400"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

