import { useState, useEffect, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { Copy, Check } from "lucide-react";

// Custom themes matching site's slate palette
// Dark: slate-800/900 range instead of pure black
const darkTheme = githubDarkInit({
  settings: {
    background: "#1e293b",      // slate-800 — softer than github's #0d1117
    gutterBackground: "#1e293b",
    gutterForeground: "#64748b", // slate-500
    selection: "#334155",        // slate-700
    lineHighlight: "#334155",    // slate-700
  },
});

// Light: clean white with slate accents
const lightTheme = githubLightInit({
  settings: {
    background: "#f8fafc",       // slate-50
    gutterBackground: "#f8fafc",
    gutterForeground: "#94a3b8", // slate-400
    selection: "#e2e8f0",        // slate-200
    lineHighlight: "#f1f5f9",    // slate-100
  },
});

const getLanguageExtension = (lang: string | undefined) => {
  if (!lang) return null;

  const languageMap: Record<string, ReturnType<typeof javascript>> = {
    javascript: javascript({ jsx: true, typescript: true }),
    js: javascript({ jsx: true }),
    jsx: javascript({ jsx: true }),
    ts: javascript({ jsx: true, typescript: true }),
    typescript: javascript({ jsx: true, typescript: true }),
    tsx: javascript({ jsx: true, typescript: true }),
    html: html(),
    css: css(),
    json: json(),
  };

  return languageMap[lang.toLowerCase()];
};

function useIsLightMode() {
  const [isLight, setIsLight] = useState(
    () => document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isLight;
}

export default function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const isLight = useIsLightMode();
  const extension = getLanguageExtension(language);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="mb-4 -mx-8 md:-mx-16 rounded-lg overflow-hidden border border-slate-800/70 light:border-slate-300 group">
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-800/80 light:bg-slate-100 border-b border-slate-700/50 light:border-slate-300">
        <span className="text-xs text-slate-400 light:text-slate-500 font-mono select-none">
          {language || "text"}
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs cursor-pointer rounded px-2 py-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95 ${
            copied
              ? "bg-emerald-500/20 text-emerald-400 light:bg-emerald-100 light:text-emerald-600"
              : "text-slate-400 light:text-slate-500 hover:bg-slate-700/50 hover:text-slate-200 light:hover:bg-slate-200 light:hover:text-slate-700"
          }`}
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        >
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <CodeMirror
        value={code}
        theme={isLight ? lightTheme : darkTheme}
        extensions={extension ? [extension] : []}
        editable={false}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: false,
          highlightSelectionMatches: false,
        }}
        style={{ fontSize: "14px" }}
      />
    </div>
  );
}
