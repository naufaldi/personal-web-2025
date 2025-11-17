import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";

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
    <div className="prose prose-invert light:prose-light max-w-none">
      <ReactMarkdown
        components={{
          h1: () =>
            null,
          h2: ({
            children,
          }) => (
            <h2
              className="text-2xl md:text-3xl text-slate-100 light:text-slate-900 mb-4 mt-6"
              style={{
                fontFamily:
                  "var(--font-mono)",
                fontWeight: 700,
              }}
            >
              {
                children
              }
            </h2>
          ),
          h3: ({
            children,
          }) => (
            <h3
              className="text-xl md:text-2xl text-slate-100 light:text-slate-900 mb-3 mt-5"
              style={{
                fontFamily:
                  "var(--font-mono)",
                fontWeight: 600,
              }}
            >
              {
                children
              }
            </h3>
          ),
          p: ({
            children,
          }) => (
            <p
              className="text-sm md:text-base text-slate-300 light:text-slate-700 leading-relaxed mb-4"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 400,
              }}
            >
              {
                children
              }
            </p>
          ),
          ul: ({
            children,
          }) => (
            <ul
              className="list-disc list-outside ml-6 space-y-2 mb-4 text-slate-300 light:text-slate-700"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 400,
              }}
            >
              {
                children
              }
            </ul>
          ),
          ol: ({
            children,
          }) => (
            <ol
              className="list-decimal list-outside ml-6 space-y-2 mb-4 text-slate-300 light:text-slate-700"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 400,
              }}
            >
              {
                children
              }
            </ol>
          ),
          li: ({
            children,
          }) => (
            <li
              className="pl-2"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 400,
              }}
            >
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
                <code
                  className="px-1.5 py-0.5 rounded bg-slate-800/70 light:bg-slate-100 text-slate-200 light:text-slate-900 text-sm"
                  style={{
                    fontFamily:
                      "var(--font-mono)",
                    fontWeight: 400,
                  }}
                >
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
              <div className="mb-4 rounded-lg overflow-hidden border border-slate-800/70 light:border-slate-200/70">
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
              <strong
                className="font-semibold text-slate-200 light:text-slate-900"
                style={{
                  fontFamily:
                    "var(--font-body)",
                  fontWeight: 600,
                }}
              >
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
              className="text-slate-200 light:text-slate-600 underline hover:text-slate-100 light:hover:text-slate-900 transition-colors"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 500,
              }}
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
              <blockquote
                className="border-l-4 border-slate-700 light:border-slate-300 pl-4 italic text-slate-400 light:text-slate-600 mb-4"
                style={{
                  fontFamily:
                    "var(--font-body)",
                  fontWeight: 400,
                }}
              >
                {
                  children
                }
              </blockquote>
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
