import type { ReactNode } from "react";
import { Info, AlertTriangle, Quote, Sparkles } from "lucide-react";

export type CalloutType = "note" | "warning" | "quote" | "ai";

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: typeof Info;
    label: string;
    border: string;
    bg: string;
    iconColor: string;
    role: "note" | "alert";
  }
> = {
  note: {
    icon: Info,
    label: "Note",
    border: "border-blue-500",
    bg: "bg-blue-500/10 light:bg-blue-50",
    iconColor: "text-blue-400 light:text-blue-600",
    role: "note",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    border: "border-amber-500",
    bg: "bg-amber-500/10 light:bg-amber-50",
    iconColor: "text-amber-400 light:text-amber-600",
    role: "alert",
  },
  quote: {
    icon: Quote,
    label: "Quote",
    border: "border-slate-400 light:border-slate-500",
    bg: "bg-slate-500/10 light:bg-slate-100",
    iconColor: "text-slate-300 light:text-slate-600",
    role: "note",
  },
  ai: {
    icon: Sparkles,
    label: "AI Prompt",
    border: "border-purple-500",
    bg: "bg-purple-500/10 light:bg-purple-50",
    iconColor: "text-purple-400 light:text-purple-600",
    role: "note",
  },
};

export default function Callout({ type = "note", children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      role={config.role}
      aria-label={config.label}
      className={`border-l-4 ${config.border} ${config.bg} rounded-r-lg p-4 mb-4 not-italic`}
    >
      <div className={`flex items-center gap-2 mb-2 ${config.iconColor}`}>
        <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="text-sm font-semibold font-blog">{config.label}</span>
      </div>
      <div className="font-blog font-normal leading-[1.75] text-slate-200 light:text-slate-700 text-sm md:text-base [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
