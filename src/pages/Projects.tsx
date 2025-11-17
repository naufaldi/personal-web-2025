import { Folder } from "lucide-react";
import { portfolioItems } from "@/data/portfolio";
import PortfolioCard from "@/components/homepage/PortfolioCard";
import FadeInUp from "@/components/common/FadeInUp";

const ProjectBackground =
  () => (
    <svg
      viewBox="0 0 1153 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute overflow-hidden top-6 inset-x-0 md:top-10 lg:w-full z-[-1] md:max-w-[68rem] lg:max-w-7xl mx-auto opacity-15 md:opacity-30 lg:opacity-40 text-slate-100/20 light:text-slate-500/40"
      aria-hidden="true"
    >
      <path
        d="M59.311 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M86.6379 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M113.948 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M141.275 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M168.586 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M195.897 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M223.224 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M250.535 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M277.845 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M305.172 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M332.483 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M359.81 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M387.121 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M414.432 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M441.758 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M469.069 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M496.396 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M523.707 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M551.018 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M578.344 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M605.656 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M632.982 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M660.293 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M687.604 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M714.931 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M742.242 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M769.568 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M796.879 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M824.19 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M851.517 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M878.828 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M906.139 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M933.465 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M960.776 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M988.103 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M1015.41 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1042.72 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M1070.05 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1097.36 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.09307"
        strokeMiterlimit="10"
      />
      <path
        d="M1124.69 74.5547V798.515"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 771.695H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 744.891H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 718.071H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 691.268H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 664.448H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 637.628H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 610.824H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 584.004H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 557.2H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 530.38H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 503.561H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 476.756H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 449.937H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 423.133H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 396.313H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 369.493H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 342.689H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 315.87H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 289.065H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 262.246H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 235.442H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 208.622H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 181.802H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 154.998H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 128.179H32"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
      <path
        d="M1152 101.374H32"
        stroke="currentColor"
        strokeWidth="1.58416"
        strokeMiterlimit="10"
        strokeDasharray="3.17 3.17"
      />
      <path
        d="M1152 74.5547H32V798.515H1152V74.5547Z"
        stroke="currentColor"
        strokeWidth="1.10891"
        strokeMiterlimit="10"
      />
    </svg>
  );

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 light:bg-slate-50">
      <div
        className="bg-pattern-projects"
        aria-hidden="true"
      />
      <ProjectBackground />
      <div className="mx-auto max-w-7xl px-6 w-full relative z-10 py-20 md:py-16">
        <FadeInUp
          delay={
            0.06
          }
        >
          <div className="px-6 md:px-0 flex flex-col items-center gap-4 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 light:border-slate-200/70 bg-slate-900/60 light:bg-white/80">
              <Folder className="h-6 w-6 text-slate-300 light:text-slate-700" />
            </div>
            <h1
              className="text-4xl md:text-5xl text-center"
              style={{
                fontFamily:
                  "var(--font-mono)",
                fontWeight: 700,
              }}
            >
              <span className="text-slate-100 light:text-slate-900">
                Curated{" "}
              </span>
              <span className="text-slate-300 light:text-slate-600">
                Projects
              </span>
            </h1>
            <p
              className="text-sm md:text-base text-slate-500 light:text-slate-600 text-center"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Showcase
              of
              my
              projects
              that
              I'm
              proud
              of.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp
          delay={
            0.12
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {portfolioItems.map(
              (
                item,
                index,
              ) => (
                <PortfolioCard
                  key={
                    item.id
                  }
                  item={
                    item
                  }
                  index={
                    index
                  }
                />
              ),
            )}
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
