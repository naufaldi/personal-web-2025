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
        grouped.push({ h2: currentH2, h3s: currentH3s });
      }
      currentH2 = item;
      currentH3s = [];
    } else if (item.level === 3 && currentH2) {
      currentH3s.push(item);
    }
  }

  if (currentH2) {
    grouped.push({ h2: currentH2, h3s: currentH3s });
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (activeId && groupedItems.length > 0) {
      const group = groupedItems.find(
        (g) => g.h2.id === activeId || g.h3s.some((h3) => h3.id === activeId)
      );
      if (group && group.h3s.length > 0) {
        setExpandedSections((prev) => {
          if (prev.has(group.h2.id)) return prev;
          return new Set(prev).add(group.h2.id);
        });
      }
    }
  }, [activeId, groupedItems]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const toggleSection = useCallback((h2Id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(h2Id)) next.delete(h2Id);
      else next.add(h2Id);
      return next;
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <aside
      className="hidden lg:block w-56 flex-shrink-0"
      aria-label="Table of contents"
    >
      <div
        className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(148 163 184 / 0.3) transparent",
        }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 light:text-slate-500 mb-3 font-sans">
          On this page
        </p>

        <nav aria-label="Table of contents">
          <ul className="list-none m-0 p-0 border-l border-slate-800 light:border-slate-200">
            {groupedItems.map((group) => {
              const isExpanded = expandedSections.has(group.h2.id);
              const hasH3s = group.h3s.length > 0;
              const isActive = activeId === group.h2.id;
              const isSectionActive =
                isActive || group.h3s.some((h3) => h3.id === activeId);

              return (
                <li key={group.h2.id}>
                  <div className="flex items-start relative">
                    {/* Active indicator — overlays the border-l */}
                    {isSectionActive && (
                      <div
                        className="absolute -left-px top-0 bottom-0 w-[2px] bg-blue-400 light:bg-blue-600"
                        aria-hidden="true"
                      />
                    )}

                    {hasH3s ? (
                      <button
                        onClick={() => toggleSection(group.h2.id)}
                        className="flex-shrink-0 flex items-center justify-center w-6 h-6 mt-0.5 ml-2 text-slate-500 light:text-slate-400 hover:text-slate-300 light:hover:text-slate-700 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label={
                          isExpanded
                            ? `Collapse ${group.h2.text}`
                            : `Expand ${group.h2.text}`
                        }
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </button>
                    ) : (
                      <div className="w-6 ml-2 flex-shrink-0" aria-hidden="true" />
                    )}

                    <button
                      onClick={() => handleClick(group.h2.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex-1 text-left py-1.5 pr-1 font-sans text-[13px] leading-[1.4] transition-colors duration-150 rounded-sm",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                        isActive
                          ? "text-blue-400 light:text-blue-600 font-medium"
                          : "text-slate-400 light:text-slate-500 hover:text-slate-200 light:hover:text-slate-900"
                      )}
                    >
                      {group.h2.text}
                    </button>
                  </div>

                  {hasH3s && (
                    <ul
                      className={cn(
                        "list-none m-0 p-0 overflow-hidden transition-all duration-200",
                        isExpanded
                          ? "max-h-[600px] opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      {group.h3s.map((h3) => {
                        const isH3Active = activeId === h3.id;
                        return (
                          <li key={h3.id}>
                            <button
                              onClick={() => handleClick(h3.id)}
                              aria-current={isH3Active ? "true" : undefined}
                              className={cn(
                                "block w-full text-left py-1 pl-10 pr-1 font-sans text-[11px] leading-[1.4] transition-colors duration-150 rounded-sm",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                                isH3Active
                                  ? "text-blue-400 light:text-blue-600 font-medium"
                                  : "text-slate-500 light:text-slate-400 hover:text-slate-300 light:hover:text-slate-800"
                              )}
                            >
                              {h3.text}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
