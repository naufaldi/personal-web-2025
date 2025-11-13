import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import Navigation from "./Navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const initials =
    siteConfig.name
      .split(
        " ",
      )
      .map(
        (
          n,
        ) =>
          n[0],
      )
      .join(
        "",
      )
      .toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-slate-900/95 light:bg-white/95 backdrop-blur-sm border-b border-slate-800/70 light:border-slate-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 group"
            aria-label="Home"
          >
            <div className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-slate-800/80 light:border-slate-300 bg-slate-900/80 light:bg-slate-100 ring-1 ring-inset ring-slate-800/40 light:ring-slate-300/40">
              <span
                className="text-slate-100 light:text-slate-950 text-[11px] tracking-tight font-medium"
                style={{
                  fontFamily:
                    "var(--font-mono)",
                }}
              >
                {
                  initials
                }
              </span>
            </div>
            <span
              className="text-slate-300 light:text-slate-800 text-sm tracking-tight font-medium group-hover:text-slate-100 light:group-hover:text-slate-950 transition-colors"
              style={{
                fontFamily:
                  "var(--font-body)",
              }}
            >
              {
                siteConfig.name
              }
            </span>
          </Link>

          <div className="flex-1 flex justify-end sm:justify-center">
            <Navigation />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              variant="secondary"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 500,
              }}
            >
              <a
                href="https://www.linkedin.com/in/naufaldirafif/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </Button>
            <Button
              asChild
              variant="primary"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 600,
              }}
            >
              <a
                href="https://www.linkedin.com/in/naufaldirafif/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
                CV
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
