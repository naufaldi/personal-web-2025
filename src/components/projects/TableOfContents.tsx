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
      className="w-full"
      aria-label="Table of contents"
    >
      <div
        className="max-h-[calc(100vh-8rem)] overflow-y-auto border border-[var(--border-line)] bg-[var(--paper)] p-4 shadow-[var(--shadow-paper-xs)]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--border-strong) transparent",
        }}
      >
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--graphite-muted)]">
          03 // ON_THIS_PAGE
        </p>

        <nav aria-label="Table of contents">
          <ul className="m-0 list-none border-l border-dashed border-[var(--border-dashed)] p-0">
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
                        className="absolute -left-px top-0 bottom-0 w-[2px] bg-[var(--status-green)]"
                        aria-hidden="true"
                      />
                    )}

                    {hasH3s ? (
                      <button
                        onClick={() => toggleSection(group.h2.id)}
                        className="ml-2 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center text-[var(--graphite-muted)] transition-colors hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]"
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
                        "flex-1 py-1.5 pr-1 text-left font-body text-[13px] font-medium leading-[1.45] transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]",
                        isActive
                          ? "text-[var(--status-green)]"
                          : "text-[var(--graphite-muted)] hover:text-[var(--graphite)]"
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
                                "block w-full py-1 pl-10 pr-1 text-left font-mono text-[10px] uppercase leading-[1.5] tracking-[0.12em] transition-colors duration-150",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]",
                                isH3Active
                                  ? "text-[var(--status-green)]"
                                  : "text-[var(--graphite-muted)] hover:text-[var(--graphite)]"
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
