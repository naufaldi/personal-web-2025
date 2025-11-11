import { siteConfig } from '@/data/site'
import { cn } from '@/lib'

interface CodePreviewCardProps {
  className?: string
}

type CodeToken = {
  text: string
  className?: string
}

const codeLines: CodeToken[][] = [
  [
    { text: 'import ', className: 'text-sky-400' },
    { text: '{ useQuery } ', className: 'text-slate-100' },
    { text: 'from ', className: 'text-sky-400' },
    { text: "'@tanstack/react-query'", className: 'text-emerald-400' },
  ],
  [],
  [
    { text: 'interface ', className: 'text-sky-400' },
    { text: 'User ', className: 'text-slate-100' },
    { text: '{ id: ', className: 'text-slate-400' },
    { text: 'number', className: 'text-sky-400' },
    { text: ', name: ', className: 'text-slate-400' },
    { text: 'string', className: 'text-sky-400' },
    { text: ' }', className: 'text-slate-400' },
  ],
  [],
  [
    { text: 'const ', className: 'text-sky-400' },
    { text: 'fetchUser ', className: 'text-slate-100' },
    { text: '= ', className: 'text-slate-400' },
    { text: 'async ', className: 'text-sky-400' },
    { text: '(id: ', className: 'text-slate-400' },
    { text: 'number', className: 'text-sky-400' },
    { text: '): ', className: 'text-slate-400' },
    { text: 'Promise<User> ', className: 'text-sky-400' },
    { text: '=> {', className: 'text-slate-400' },
  ],
  [
    { text: '  const res ', className: 'text-sky-400' },
    { text: '= ', className: 'text-slate-400' },
    { text: 'await ', className: 'text-sky-400' },
    { text: 'fetch', className: 'text-slate-100' },
    { text: '(`/api/users/${id}`)', className: 'text-emerald-400' },
  ],
  [
    { text: '  return ', className: 'text-sky-400' },
    { text: 'res.json', className: 'text-slate-100' },
    { text: '()', className: 'text-slate-400' },
  ],
  [
    { text: '}', className: 'text-slate-400' },
  ],
  [],
  [
    { text: 'export ', className: 'text-sky-400' },
    { text: 'function ', className: 'text-sky-400' },
    { text: 'UserProfile', className: 'text-slate-100' },
    { text: '() {', className: 'text-slate-400' },
  ],
  [
    { text: '  const ', className: 'text-sky-400' },
    { text: '{ data } ', className: 'text-slate-100' },
    { text: '= useQuery', className: 'text-slate-100' },
    { text: '({', className: 'text-slate-400' },
  ],
  [
    { text: '    queryKey: ', className: 'text-slate-400' },
    { text: "['user', id]", className: 'text-emerald-400' },
  ],
  [
    { text: '    queryFn: ', className: 'text-slate-400' },
    { text: '() => fetchUser', className: 'text-slate-100' },
    { text: '(id)', className: 'text-slate-400' },
  ],
  [
    { text: '  })', className: 'text-slate-400' },
  ],
  [],
  [
    { text: '  return ', className: 'text-sky-400' },
    { text: '<div>{data?.name}</div>', className: 'text-slate-100' },
  ],
  [
    { text: '}', className: 'text-slate-100' },
  ],
]

export default function CodePreviewCard({ className }: CodePreviewCardProps) {
  return (
    <div className={cn('relative', className)}>
      {siteConfig.heroImage && (
        <img
          src={siteConfig.heroImage}
          alt=""
          className="absolute -inset-x-8 -top-10 bottom-0 object-cover opacity-10 rounded-2xl blur-sm"
          style={{
            maskImage: 'linear-gradient(to bottom, black, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 80%)',
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative">
        <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 backdrop-blur-sm shadow-[0_0_0_1px_rgba(2,6,23,0.4),0_10px_30px_-10px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-800/70">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            </div>
            <div
              className="text-[11px] text-slate-400 tracking-tight"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              UserProfile.tsx
            </div>
          </div>

          <div className="p-4 md:p-6">
            <pre
              className="text-[12.5px] md:text-sm leading-relaxed text-slate-300"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                whiteSpace: 'pre-wrap',
              }}
            >
              <code>
                {codeLines.map((tokens, lineIndex) => (
                  <span key={lineIndex}>
                    {tokens.map((token, tokenIndex) => (
                      <span key={tokenIndex} className={token.className}>
                        {token.text}
                      </span>
                    ))}
                    {'\n'}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
