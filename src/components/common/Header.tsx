import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import Navigation from "./Navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const initials = siteConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--border-line)] bg-[var(--paper)]/94 backdrop-blur-sm">
      <div className="site-container">
        <div className="flex h-[72px] items-center justify-between gap-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 group"
            aria-label="Home"
          >
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-line)] bg-[var(--surface-raised)]">
              <span className="font-mono text-[11px] font-medium tracking-tight text-[var(--graphite)]">
                {initials}
              </span>
            </div>
            <span className="hidden text-sm font-medium tracking-tight text-[var(--graphite)] transition-colors group-hover:text-[var(--graphite-muted)] sm:inline">
              {siteConfig.name}
            </span>
          </Link>

          <div className="flex flex-1 justify-end md:justify-center">
            <Navigation />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              variant="secondary"
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
            >
              <a
                href="https://www.linkedin.com/in/naufaldirafif/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
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
