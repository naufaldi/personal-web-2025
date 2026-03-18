import { Briefcase } from "lucide-react";
import { workExperiences } from "@/data/experience";
import ExperienceTimelineItem from "@/components/experience/ExperienceTimelineItem";
import FadeInUp from "@/components/common/FadeInUp";

export default function Experience() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 light:bg-slate-50">
      <div className="bg-pattern-experience" aria-hidden="true" />
      <section
        aria-labelledby="experience-heading"
        className="mx-auto max-w-7xl px-6 w-full relative z-10 py-20 md:py-16"
      >
        {/* Page header */}
        <FadeInUp delay={0.06}>
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/70 bg-slate-900/60 light:bg-white/80">
              <Briefcase
                className="h-6 w-6 text-slate-300 light:text-slate-700"
                aria-hidden="true"
              />
            </div>
            <h1
              id="experience-heading"
              className="text-4xl md:text-5xl text-center font-mono font-bold text-balance"
            >
              <span className="text-slate-100 light:text-slate-900">
                Work{" "}
              </span>
              <span className="text-slate-300 light:text-slate-600">
                Experience
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 light:text-slate-600 text-center font-body font-medium">
              Building products and leading teams across startups and companies.
            </p>
          </div>
        </FadeInUp>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div role="list" aria-label="Work experience timeline" className="space-y-4 md:space-y-6">
            {workExperiences.map((experience, index) => (
              <ExperienceTimelineItem
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
