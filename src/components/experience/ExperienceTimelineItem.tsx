import { Calendar, ExternalLink } from "lucide-react";
import type { WorkExperience } from "@/data/experience";
import { cn } from "@/lib";
import { getTechIcon } from "@/lib/techIcons";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeInUp from "@/components/common/FadeInUp";

interface ExperienceTimelineItemProps {
  experience: WorkExperience;
  index: number;
}

const employmentTypeLabels: Record<WorkExperience["employmentType"], string> = {
  "full-time": "Full-time",
  freelance: "Freelance",
  contract: "Contract",
};

export default function ExperienceTimelineItem({
  experience,
  index,
}: ExperienceTimelineItemProps) {
  const isCurrent = experience.endDate === "Present";

  return (
    <FadeInUp delay={0.1 + index * 0.08}>
      <div
        role="listitem"
        className="relative grid grid-cols-1 md:grid-cols-[120px_24px_1fr] gap-2 md:gap-0"
      >
        {/* Date column — visible on md+ */}
        <div className="hidden md:flex flex-col items-end pr-4 pt-1">
          <time
            dateTime={`${experience.startDate} / ${experience.endDate}`}
            className="text-xs text-slate-400 light:text-slate-500 font-mono font-semibold text-right leading-relaxed"
          >
            {experience.startDate}
            <br />
            {experience.endDate}
          </time>
        </div>

        {/* Timeline dot + line segment — visible on md+ */}
        <div className="hidden md:flex flex-col items-center relative" aria-hidden="true">
          <div
            className={cn(
              "mt-1.5 h-3.5 w-3.5 rounded-full border-2 flex-shrink-0 relative z-10",
              isCurrent
                ? "border-blue-500 bg-blue-500/30 light:bg-blue-100"
                : "border-slate-600 light:border-slate-400 bg-slate-800 light:bg-slate-300",
            )}
          />
          <div className="w-px flex-1 bg-slate-800/50 light:bg-slate-300" />
        </div>

        {/* Content card */}
        <article
          aria-label={`${experience.role} at ${experience.companyName}`}
          className={cn(
            "rounded-xl border border-slate-800/70 light:border-slate-200 bg-slate-900/60 light:bg-white/90 light:shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-5 sm:p-6 md:ml-4 touch-action-manipulation motion-safe:transition-[border-color,background-color,box-shadow] motion-safe:duration-200 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-white hover:shadow-lg hover:shadow-slate-900/50 light:hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
            isCurrent &&
              "border-slate-700/50 light:border-slate-300 ring-1 ring-slate-700/20 light:ring-slate-300/20",
          )}
        >
          {/* Mobile date */}
          <div className="flex md:hidden items-center gap-1.5 text-xs text-slate-400 light:text-slate-600 mb-2">
            <Calendar className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            <time
              dateTime={`${experience.startDate} / ${experience.endDate}`}
              className="font-mono font-semibold"
            >
              {experience.startDate} - {experience.endDate}
            </time>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg text-slate-100 light:text-slate-900 font-mono font-bold text-pretty break-words">
                {experience.companyName}
              </h2>
              <p className="text-sm text-slate-400 light:text-slate-600 mt-0.5 font-mono font-medium">
                {experience.role}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
              {isCurrent && (
                <span className="inline-flex items-center rounded-full border border-slate-600 light:border-blue-500 bg-slate-800/80 light:bg-blue-50 px-2 py-0.5 text-xs text-slate-200 light:text-blue-700 font-mono font-semibold motion-safe:animate-pulse">
                  Current
                </span>
              )}
              <span className="inline-flex items-center rounded-full border border-slate-800/70 light:border-slate-300 bg-slate-900/80 light:bg-slate-50 px-2 py-0.5 text-xs text-slate-400 light:text-slate-600 font-mono font-medium">
                {employmentTypeLabels[experience.employmentType]}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 light:text-slate-700 font-body font-medium leading-relaxed mb-3 line-clamp-2">
            {experience.description}
          </p>

          {/* Achievements accordion */}
          {experience.achievements.length > 0 && (
            <Accordion defaultOpen={false} className="w-full mb-3">
              <AccordionTrigger
                className="py-1.5 px-0 hover:bg-slate-800/30 light:hover:bg-slate-100 rounded font-mono font-semibold"
                aria-label={`Toggle key achievements for ${experience.companyName}`}
              >
                <span className="text-xs text-slate-300 light:text-slate-600 uppercase tracking-wider">
                  Key Achievements
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-1.5">
                <ul className="space-y-1.5">
                  {experience.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-300 light:text-slate-700 font-body font-medium"
                    >
                      <span
                        className="text-slate-600 light:text-slate-400 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        ▸
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </Accordion>
          )}

          {/* Tech stack */}
          {experience.techStack.length > 0 && (
            <div
              className="flex flex-wrap items-center gap-1.5"
              role="list"
              aria-label={`Technologies used at ${experience.companyName}`}
            >
              {experience.techStack.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <div
                    key={tech}
                    role="listitem"
                    className="flex items-center gap-1 rounded-md border border-slate-800/70 light:border-slate-300 bg-slate-900/80 light:bg-slate-50 px-2 py-0.5 motion-safe:transition-colors motion-safe:duration-200 hover:border-slate-700/70 light:hover:border-slate-400"
                  >
                    {Icon && (
                      <Icon
                        className="h-3 w-3 text-slate-400 light:text-slate-600"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-xs text-slate-400 light:text-slate-600 font-mono font-medium">
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Website link */}
          {experience.website && (
            <a
              href={experience.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${experience.companyName} website`}
              className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 text-xs text-slate-400 light:text-slate-600 font-mono font-medium rounded-md border border-slate-800/70 light:border-slate-300 motion-safe:transition-[color,border-color] motion-safe:duration-200 hover:text-slate-200 light:hover:text-slate-900 hover:border-slate-700/70 light:hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40"
            >
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              Visit website
            </a>
          )}
        </article>
      </div>
    </FadeInUp>
  );
}
