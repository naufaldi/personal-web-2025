import { ChevronRight } from "lucide-react";
import HeroSection from "@/components/homepage/HeroSection";
import ExperienceSection from "@/components/homepage/ExperienceSection";
import PortfolioSection from "@/components/homepage/PortfolioSection";
import MentorSpeakerSection from "@/components/homepage/MentorSpeakerSection";
import FadeInUp from "@/components/common/FadeInUp";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--paper)] text-[var(--graphite)]">
      <HeroSection />
      <FadeInUp>
        <div className="site-container">
          <div className="section-rule" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            <p
              className="text-meta"
            >
              Building with clarity, performance, and craft.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite-muted)] transition-colors hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)]"
            >
              Browse work
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </FadeInUp>
      <ExperienceSection />
      <PortfolioSection />
      <MentorSpeakerSection />
    </div>
  );
}
