import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import Mermaid from "@/components/mdx/Mermaid";
import Callout, { type CalloutType } from "@/components/mdx/Callout";
import CodeBlock from "@/components/mdx/CodeBlock";

const CALLOUT_TYPES: Record<string, CalloutType> = {
  NOTE: "note",
  WARNING: "warning",
  QUOTE: "quote",
  AI: "ai",
  TIP: "note",
  IMPORTANT: "warning",
  CAUTION: "warning",
};

function extractTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!isValidElement(node)) return "";
  const children = node.props.children;
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractTextContent).join("");
  return extractTextContent(children);
}

function parseCalloutBlockquote(children: ReactNode): {
  type: CalloutType;
  content: ReactNode;
} | null {
  const childArray = Children.toArray(children);
  if (childArray.length === 0) return null;

  const firstChild = childArray[0];
  const text = extractTextContent(firstChild);
  const match = text.match(/^\[!(NOTE|WARNING|QUOTE|AI|TIP|IMPORTANT|CAUTION)\]\s*/i);
  if (!match) return null;

  const type = CALLOUT_TYPES[match[1].toUpperCase()];
  if (!type) return null;

  // Remove the [!TYPE] prefix from the first paragraph
  const prefix = match[0];
  const remainingText = text.slice(prefix.length);

  // Rebuild children without the callout prefix
  const newChildren = [...childArray];
  if (isValidElement(firstChild) && firstChild.type === "p") {
    const pChildren = Children.toArray(firstChild.props.children);
    if (pChildren.length > 0 && typeof pChildren[0] === "string") {
      const newFirst = pChildren[0].slice(prefix.length);
      const newPChildren = [newFirst, ...pChildren.slice(1)];
      newChildren[0] = <p key="callout-first">{newPChildren}</p>;
    }
  } else if (typeof firstChild === "string") {
    newChildren[0] = remainingText;
  }

  return { type, content: newChildren };
}

export const mdxComponents = {
  h1: () => null,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="text-2xl md:text-3xl text-slate-200 light:text-slate-900 mb-4 mt-6 scroll-mt-24 font-mono font-bold"
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="text-xl md:text-2xl text-slate-200 light:text-slate-900 mb-3 mt-5 scroll-mt-24 font-mono font-semibold"
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className="text-sm md:text-base leading-[1.75] mb-4 font-blog font-normal text-slate-300 light:text-slate-700"
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="list-disc list-outside ml-6 space-y-2 mb-4 font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700"
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="list-decimal list-outside ml-6 space-y-2 mb-4 font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700"
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li
      {...props}
      className="pl-2 font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700"
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong
      {...props}
      className="font-semibold text-slate-300 light:text-slate-700 font-blog"
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 light:text-blue-600 underline hover:text-blue-300 light:hover:text-blue-700 transition-colors font-blog font-medium"
    />
  ),
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => {
    const callout = parseCalloutBlockquote(children);
    if (callout) {
      return <Callout type={callout.type}>{callout.content}</Callout>;
    }
    return (
      <blockquote
        {...props}
        className="border-l-4 border-slate-600 light:border-slate-300 pl-4 italic mb-4 bg-slate-900/40 light:bg-slate-100/40 py-2 rounded-r font-blog font-normal leading-[1.75] text-slate-300 light:text-slate-700"
      >
        {children}
      </blockquote>
    );
  },
  Callout,
  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
    <div className="my-6 -mx-8 md:-mx-16 rounded-lg overflow-hidden border border-slate-800/70 light:border-slate-200/70 bg-slate-900/60 light:bg-white/60">
      <img
        src={src}
        alt={alt || ""}
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
        {...props}
      />
      {alt && (
        <p className="text-xs px-4 py-2 bg-slate-900/80 light:bg-slate-100/80 border-t border-slate-800/70 light:border-slate-200/70 font-blog font-normal text-slate-300 light:text-slate-700">
          {alt}
        </p>
      )}
    </div>
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 -mx-8 md:-mx-16 overflow-x-auto">
      <table
        {...props}
        className="w-full text-sm font-blog border-collapse border border-slate-700 light:border-slate-300 rounded"
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead
      {...props}
      className="bg-slate-800/60 light:bg-slate-100"
    />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className="px-4 py-2 text-left font-semibold text-slate-200 light:text-slate-900 border border-slate-700 light:border-slate-300"
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      className="px-4 py-2 text-slate-300 light:text-slate-700 border border-slate-700 light:border-slate-300"
    />
  ),
  pre: ({ children }: ComponentPropsWithoutRef<"pre">) => <>{children}</>,
  code: ({
    children,
    className,
  }: ComponentPropsWithoutRef<"code">) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-slate-800/70 light:bg-slate-100 text-slate-200 light:text-slate-900 text-sm font-mono font-normal">
          {children}
        </code>
      );
    }

    const language = className?.replace("language-", "");
    const codeString = String(children).replace(/\n$/, "");

    if (language === "mermaid") {
      return (
        <div className="mb-6 -mx-8 md:-mx-16 rounded-lg overflow-hidden border border-slate-800/70 light:border-slate-300/70 bg-slate-950/40 light:bg-white/40 p-4">
          <Mermaid chart={codeString} />
        </div>
      );
    }

    return <CodeBlock code={codeString} language={language} />;
  },
};
