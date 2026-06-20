import ReactMarkdown from 'react-markdown'
import CodeBlock from '@/components/mdx/CodeBlock'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert light:prose-light max-w-none">
      <ReactMarkdown
        components={{
          h1: () => null,
          h2: ({ children }) => (
            <h2 className="mb-4 mt-6 font-mono text-2xl font-bold text-slate-100 light:text-slate-900 md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-5 font-mono text-xl font-semibold text-slate-100 light:text-slate-900 md:text-2xl">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 font-body text-sm font-normal leading-relaxed text-slate-300 light:text-slate-700 md:text-base">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 ml-6 list-outside list-disc space-y-2 font-body font-normal text-slate-300 light:text-slate-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-6 list-outside list-decimal space-y-2 font-body font-normal text-slate-300 light:text-slate-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-2 font-body font-normal">{children}</li>
          ),
          code: ({ children, className }) => {
            if (!className) {
              return (
                <code className="rounded bg-slate-800/70 px-1.5 py-0.5 font-mono text-sm font-normal text-slate-200 light:bg-slate-100 light:text-slate-900">
                  {children}
                </code>
              )
            }

            const language = className.replace('language-', '')
            const codeString = String(children).replace(/\n$/, '')

            return <CodeBlock code={codeString} language={language} />
          },
          pre: ({ children }) => <>{children}</>,
          strong: ({ children }) => (
            <strong className="font-body font-semibold text-slate-200 light:text-slate-900">
              {children}
            </strong>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-link font-body font-medium text-slate-200 transition-colors hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-4 border-slate-700 pl-4 font-body font-normal italic text-slate-400 light:border-slate-300 light:text-slate-600">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
