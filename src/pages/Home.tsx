import { ChevronRight } from "lucide-react";
import HeroSection from "@/components/homepage/HeroSection";
import ExperienceSection from "@/components/homepage/ExperienceSection";
import PortfolioSection from "@/components/homepage/PortfolioSection";
import MentorSpeakerSection from "@/components/homepage/MentorSpeakerSection";
import FadeInUp from "@/components/common/FadeInUp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="bg-pattern"
        aria-hidden="true"
      />
      <HeroSection />
      <FadeInUp>
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="border-t border-slate-800/70 light:border-slate-200" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            <p
              className="text-xs text-slate-500 light:text-slate-600"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Building with clarity, performance, and craft.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 transition-colors whitespace-nowrap"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Browsework
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
