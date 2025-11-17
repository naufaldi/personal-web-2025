import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { slugify } from "@/lib/toc";

interface MarkdownRendererProps {
  content: string;
}

const getLanguageExtension =
  (
    lang:
      | string
      | undefined,
  ) => {
    if (
      !lang
    )
      return null;

    const languageMap: Record<
      string,
      any
    > = {
      javascript:
        javascript(
          {
            jsx: true,
            typescript: true,
          },
        ),
      js: javascript(
        {
          jsx: true,
        },
      ),
      jsx: javascript(
        {
          jsx: true,
        },
      ),
      ts: javascript(
        {
          jsx: true,
          typescript: true,
        },
      ),
      typescript:
        javascript(
          {
            jsx: true,
            typescript: true,
          },
        ),
      html: html(),
      css: css(),
      json: json(),
    };

    return languageMap[
      lang.toLowerCase()
    ];
  };

export default function MarkdownRenderer({
  content,
}: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h1: () =>
            null,
          h2: ({
            children,
          }) => {
            const text =
              String(
                children,
              );
            const id =
              slugify(
                text,
              );
            return (
              <h2
                id={
                  id
                }
                className="text-2xl md:text-3xl text-slate-200 light:text-slate-900 mb-4 mt-6 scroll-mt-24 font-mono font-bold"
              >
                {
                  children
                }
              </h2>
            );
          },
          h3: ({
            children,
          }) => {
            const text =
              String(
                children,
              );
            const id =
              slugify(
                text,
              );
            return (
              <h3
                id={
                  id
                }
                className="text-xl md:text-2xl text-slate-200 light:text-slate-900 mb-3 mt-5 scroll-mt-24 font-mono font-semibold"
              >
                {
                  children
                }
              </h3>
            );
          },
          p: ({
            children,
          }) => (
            <p className="text-sm md:text-base leading-[1.75] mb-4 font-blog font-normal text-slate-300 light:text-slate-700">
              {
                children
              }
            </p>
          ),
          ul: ({
            children,
          }) => (
            <ul className="list-disc list-outside ml-6 space-y-2 mb-4 font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700">
              {
                children
              }
            </ul>
          ),
          ol: ({
            children,
          }) => (
            <ol className="list-decimal list-outside ml-6 space-y-2 mb-4 font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700">
              {
                children
              }
            </ol>
          ),
          li: ({
            children,
          }) => (
            <li className="pl-2 font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700">
              {
                children
              }
            </li>
          ),
          code: ({
            children,
            className,
          }) => {
            const isInline =
              !className;
            if (
              isInline
            ) {
              return (
                <code className="px-1.5 py-0.5 rounded bg-slate-800/70 light:bg-slate-100 text-slate-200 light:text-slate-900 text-sm font-mono font-normal">
                  {
                    children
                  }
                </code>
              );
            }

            const language =
              className?.replace(
                "language-",
                "",
              );
            const codeString =
              String(
                children,
              ).replace(
                /\n$/,
                "",
              );
            const extension =
              getLanguageExtension(
                language,
              );

            return (
              <div className="mb-4 rounded-lg overflow-hidden border border-slate-800/70 light:border-slate-300/70">
                <CodeMirror
                  value={
                    codeString
                  }
                  theme={
                    oneDark
                  }
                  extensions={
                    extension
                      ? [
                          extension,
                        ]
                      : []
                  }
                  editable={
                    false
                  }
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLine: false,
                    highlightSelectionMatches: false,
                  }}
                  style={{
                    fontSize:
                      "14px",
                  }}
                />
              </div>
            );
          },
          pre: ({
            children,
          }) => {
            return (
              <>
                {
                  children
                }
              </>
            );
          },
          strong:
            ({
              children,
            }) => (
              <strong className="font-semibold text-slate-300 light:text-slate-700 font-blog">
                {
                  children
                }
              </strong>
            ),
          a: ({
            children,
            href,
          }) => (
            <a
              href={
                href
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 light:text-blue-600 underline hover:text-blue-300 light:hover:text-blue-700 transition-colors font-blog font-medium"
            >
              {
                children
              }
            </a>
          ),
          blockquote:
            ({
              children,
            }) => (
              <blockquote className="border-l-4 border-slate-600 light:border-slate-300 pl-4 italic mb-4 bg-slate-900/40 light:bg-slate-100/40 py-2 rounded-r font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700">
                {
                  children
                }
              </blockquote>
            ),
          img: ({
            src,
            alt,
          }) => (
            <div className="my-6 rounded-lg overflow-hidden border border-slate-800/70 light:border-slate-200/70 bg-slate-900/60 light:bg-white/60">
              <img
                src={
                  src
                }
                alt={
                  alt ||
                  ""
                }
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
              {alt && (
                <p className="text-xs px-4 py-2 bg-slate-900/80 light:bg-slate-100/80 border-t border-slate-800/70 light:border-slate-200/70 font-blog font-normal text-slate-300 light:text-slate-700">
                  {
                    alt
                  }
                </p>
              )}
            </div>
          ),
        }}
      >
        {
          content
        }
      </ReactMarkdown>
    </div>
  );
}
