import {
  Briefcase,
  Code2,
  Users,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}

const StatCard =
  ({
    label,
    value,
    icon,
    className,
  }: StatCardProps) => (
    <div
      className={cn(
        "rounded-lg border border-slate-800/70 light:border-slate-300 bg-slate-900/60 light:bg-slate-50 px-2 sm:px-3 py-2 text-xs text-slate-400 light:text-slate-700 hover:text-slate-200 light:hover:text-slate-900 hover:border-slate-700/70 light:hover:border-slate-400 transition-colors",
        className,
      )}
      style={{
        fontFamily:
          "var(--font-body)",
        fontWeight: 500,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs sm:text-xs">
          {
            label
          }
        </span>
        <div className="text-slate-500 light:text-slate-600 h-3.5 w-3.5 sm:h-4 sm:w-4">
          {
            icon
          }
        </div>
      </div>
      <div className="mt-1 text-sm sm:text-base text-slate-200 light:text-slate-900">
        {
          value
        }
      </div>
    </div>
  );

export default function StatsCards() {
  return (
    <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2 text-xs">
      <StatCard
        label="Experience"
        value={
          siteConfig
            .stats
            .experience
        }
        icon={
          <Briefcase className="h-3.5 w-3.5" />
        }
      />
      <StatCard
        label="Stack"
        value={
          siteConfig
            .stats
            .stack
        }
        icon={
          <Code2 className="h-3.5 w-3.5" />
        }
      />
      <StatCard
        label="Mentees"
        value={
          siteConfig
            .stats
            .mentees
        }
        icon={
          <Users className="h-3.5 w-3.5" />
        }
      />
    </div>
  );
}
