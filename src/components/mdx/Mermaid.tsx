import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import type { MermaidConfig } from "mermaid";

interface MermaidProps {
  chart: string;
  config?: MermaidConfig;
}

export default function Mermaid({ chart, config }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [id] = useState(
    () => `mermaid-${Math.random().toString(36).substring(2, 9)}`
  );

  useEffect(() => {
    if (!ref.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        primaryColor: "#334155",
        primaryTextColor: "#e2e8f0",
        primaryBorderColor: "#475569",
        lineColor: "#64748b",
        secondaryColor: "#1e293b",
        tertiaryColor: "#0f172a",
        background: "#0f172a",
        mainBkg: "#0f172a",
        secondBkg: "#1e293b",
        tertiaryBkg: "#334155",
      },
      ...config,
    });

    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      })
      .catch((error) => {
        console.error("Mermaid render error:", error);
        if (ref.current) {
          ref.current.innerHTML = `<pre style="color: red;">${error}</pre>`;
        }
      });
  }, [chart, id, config]);

  return <div ref={ref} className="mermaid" />;
}
