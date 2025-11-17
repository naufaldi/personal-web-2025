import { useEffect, useState, useMemo, useCallback } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { type TOCItem } from "@/lib/toc";
import { cn } from "@/lib";

interface TableOfContentsProps {
  items: TOCItem[];
}

interface GroupedTOCItem {
  h2: TOCItem;
  h3s: TOCItem[];
}

const groupTOCItems = (items: TOCItem[]): GroupedTOCItem[] => {
  const grouped: GroupedTOCItem[] = [];
  let currentH2: TOCItem | null = null;
  let currentH3s: TOCItem[] = [];

  for (const item of items) {
    if (item.level === 2) {
      if (currentH2) {
        grouped.push({
          h2: currentH2,
          h3s: currentH3s,
        });
      }
      currentH2 = item;
      currentH3s = [];
    } else if (item.level === 3 && currentH2) {
      currentH3s.push(item);
    }
  }

  if (currentH2) {
    grouped.push({
      h2: currentH2,
      h3s: currentH3s,
    });
  }

  return grouped;
};

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const groupedItems = useMemo(() => groupTOCItems(items), [items]);

  useEffect(() => {
    if (items.length === 0) return;

    const observerOptions = {
      rootMargin: "-100px 0px -66%",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  useEffect(() => {
    if (activeId && groupedItems.length > 0) {
      const group = groupedItems.find(
        (g) => g.h2.id === activeId || g.h3s.some((h3) => h3.id === activeId)
      );
      if (group && group.h3s.length > 0) {
        setExpandedSections((prev) => {
          if (prev.has(group.h2.id)) {
            return prev;
          }
          return new Set(prev).add(group.h2.id);
        });
      }
    }
  }, [activeId, groupedItems]);

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const toggleSection = useCallback((h2Id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(h2Id)) {
        next.delete(h2Id);
      } else {
        next.add(h2Id);
      }
      return next;
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-24">
        <div
          className="border border-slate-800/70 light:border-slate-200/70 bg-slate-900/80 light:bg-white/60 rounded-lg p-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
          style={{
            animation: "fade-in 900ms ease-out both",
            animationDelay: "120ms",
            scrollbarWidth: "thin",
            scrollbarColor: "rgb(51 65 85) rgb(15 23 42 / 0.5)",
          }}
        >
          <h3
            className="text-sm text-slate-200 light:text-slate-900 mb-4 font-semibold"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
            }}
          >
            Table of Contents
          </h3>
          <nav className="space-y-1">
            {groupedItems.map((group) => {
              const isExpanded = expandedSections.has(group.h2.id);
              const hasH3s = group.h3s.length > 0;
              const isActive = activeId === group.h2.id;

              return (
                <div key={group.h2.id} className="space-y-0.5">
                  <div className="flex items-center gap-1">
                    {hasH3s && (
                      <button
                        onClick={() => toggleSection(group.h2.id)}
                        className="flex-shrink-0 p-0.5 text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 transition-colors rounded"
                        aria-label={
                          isExpanded ? "Collapse section" : "Expand section"
                        }
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                    {!hasH3s && <div className="w-4" />}
                    <button
                      onClick={() => handleClick(group.h2.id)}
                      className={cn(
                        "flex-1 text-left px-2 py-1.5 rounded-md transition-colors text-sm",
                        isActive
                          ? "bg-slate-800/90 light:bg-slate-200/80 text-slate-50 light:text-slate-900 font-medium"
                          : "text-slate-300 light:text-slate-700 hover:text-slate-100 light:hover:text-slate-900 hover:bg-slate-800/50 light:hover:bg-slate-200/40"
                      )}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {group.h2.text}
                    </button>
                  </div>
                  {hasH3s && isExpanded && (
                    <div className="ml-5 space-y-0.5">
                      {group.h3s.map((h3) => {
                        const isH3Active = activeId === h3.id;
                        return (
                          <button
                            key={h3.id}
                            onClick={() => handleClick(h3.id)}
                            className={cn(
                              "block w-full text-left px-2 py-1 rounded-md transition-colors text-xs",
                              isH3Active
                                ? "bg-slate-800/90 light:bg-slate-200/80 text-slate-50 light:text-slate-900 font-medium"
                                : "text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-800/40 light:hover:bg-slate-200/40"
                            )}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontWeight: isH3Active ? 500 : 400,
                            }}
                          >
                            {h3.text}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
