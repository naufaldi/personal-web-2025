import { Code2 } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import DrawingFrame from "@/components/design-system/DrawingFrame";
import MetadataRow from "@/components/design-system/MetadataRow";
import RouteRail from "@/components/design-system/RouteRail";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { siteConfig } from "@/data/site";

const heroRoutes = [
  {
    index: "01",
    label: "View projects",
    href: "#projects",
    icon: <Code2 className="h-4 w-4" aria-hidden="true" />,
  },
  {
    index: "02",
    label: "Get in touch",
    href: siteConfig.socialLinks.linkedin ?? "#",
  },
  {
    index: "03",
    label: "Download CV",
    href: siteConfig.socialLinks.linkedin ?? "#",
  },
];

const heroSkills = ["Product Systems", "Backend Foundations", "Engineering Mentorship"];

const HERO_EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: HERO_EASE },
    },
  };

  const headline: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: HERO_EASE, delay: 0.08 },
    },
  };

  const meta: Variants = {
    hidden: { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: HERO_EASE, delay: 0.18 },
    },
  };

  const panel: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: HERO_EASE,
        delay: 0.05,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  // When reduced motion is on, render in final state with no transitions.
  const initial = prefersReducedMotion ? "visible" : "hidden";

  return (
    <DrawingFrame
      className="min-h-[calc(100dvh-72px)]"
      innerClassName="min-h-[calc(100dvh-72px)]"
    >
      <motion.div
        initial={initial}
        animate="visible"
        variants={fadeIn}
        className="pointer-events-none absolute inset-x-5 top-10 bottom-10 hidden md:block"
      >
        <div className="absolute left-[8%] right-[8%] top-[18%] border-t border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[8%] right-[8%] top-[48%] border-t border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[8%] right-[8%] bottom-[18%] border-t border-[var(--border-line)]" />
        <div className="absolute left-[8%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <div className="absolute left-[58%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <div className="absolute right-[9%] top-10 bottom-10 border-l border-dashed border-[var(--border-dashed)]" />
        <span className="coordinate-label absolute left-[8%] top-8">
          X-1440
        </span>
        <span className="coordinate-label absolute left-[58%] top-8">
          X-768
        </span>
        <span className="coordinate-label absolute right-[8%] top-8">
          X-0
        </span>
        <span className="coordinate-label absolute left-[7%] top-[18%]">
          Y-0
        </span>
        <span className="coordinate-label absolute left-[7%] top-[48%]">
          Y-360
        </span>
        <span className="coordinate-label absolute left-[7%] bottom-[18%]">
          Y-720
        </span>
      </motion.div>

      <div className="grid min-h-[calc(100dvh-72px)] items-center py-20 md:py-24">
        <motion.div
          initial={initial}
          animate="visible"
          variants={panel}
          className="relative mx-auto w-full max-w-[1180px] border border-[var(--border-line)] bg-[var(--hero-panel)] p-5 shadow-[var(--shadow-paper-xs)] backdrop-blur-[2px] md:p-8"
        >
          <div
            className="absolute left-0 top-0 h-px w-32 bg-[var(--status-green)]"
            aria-hidden="true"
          />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="space-y-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <TechnicalLabel variant="mono">01 // INTRO</TechnicalLabel>
                <div className="hidden gap-8 md:flex">
                  <span className="coordinate-label">X-1024</span>
                  <span className="coordinate-label">X-768</span>
                  <span className="coordinate-label">X-480</span>
                </div>
              </div>

              <motion.div
                variants={headline}
                className="border border-[var(--border-line)] bg-[var(--hero-title-surface)] px-4 py-5 md:px-6 md:py-7"
              >
                <h1 className="text-hero-name text-[var(--graphite)]">
                  <span>NAUFALDI</span>{" "}
                  <span className="whitespace-nowrap">RAFIF S.</span>
                </h1>
              </motion.div>

              <motion.div
                variants={meta}
                className="max-w-2xl space-y-4 md:pl-6"
              >
                <h2 className="font-mono text-2xl leading-tight text-[var(--graphite)] md:text-3xl">
                  Software Engineer & Mentor
                </h2>
                <MetadataRow items={heroSkills} />
                <p className="text-body-readable">
                  My foundation is frontend, but the direction is broader:
                  backend ownership, product architecture, and end-to-end
                  software delivery.
                </p>
              </motion.div>
            </div>

            <motion.aside
              variants={meta}
              className="border-t border-[var(--border-line)] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
              aria-label="Hero routes"
            >
              <TechnicalLabel variant="mono">02 // ROUTES</TechnicalLabel>
              <RouteRail items={heroRoutes} ariaLabel="Hero route links" />
            </motion.aside>
          </div>

          <motion.div
            variants={meta}
            className="mt-9 border-t border-[var(--border-line)] pt-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <MetadataRow
                items={[
                  "Open to work",
                  `${siteConfig.stats.experience} experience`,
                  `${siteConfig.stats.mentees} mentees`,
                  "Bekasi, Indonesia",
                ]}
              />
              <div className="flex gap-5">
                <TechnicalLabel variant="mono">BUILD:2026</TechnicalLabel>
                <TechnicalLabel variant="mono">PRD:01</TechnicalLabel>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DrawingFrame>
  );
}
