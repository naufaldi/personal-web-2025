import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-slate-100 text-slate-900 hover:bg-white focus-visible:ring-2 focus-visible:ring-[rgba(241,245,249,0.4)] transition-colors",
        primary:
          "bg-slate-100 text-slate-900 hover:bg-white focus-visible:ring-2 focus-visible:ring-[rgba(241,245,249,0.4)] transition-colors",
        secondary:
          "border border-[rgba(30,41,59,0.7)] bg-[rgba(15,23,42,0.6)] text-slate-300 hover:text-slate-100 hover:bg-[rgba(15,23,42,0.9)] hover:border-[rgba(51,65,85,0.7)] focus-visible:ring-2 focus-visible:ring-[rgba(129,140,248,0.3)] transition-colors",
        "secondary-elevated":
          "border border-slate-700/70 bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-600/70 hover:shadow-md hover:shadow-slate-900/30 focus-visible:ring-2 focus-visible:ring-blue-400/50 transition-all",
        outline:
          "border border-[rgba(148,163,184,0.4)] text-slate-200 hover:text-white hover:border-[rgba(148,163,184,0.6)] focus-visible:ring-2 focus-visible:ring-[rgba(129,140,248,0.25)] bg-transparent transition-colors",
        ghost: "text-slate-300 hover:text-slate-100",
        link: "text-slate-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-3.5 py-1.5 text-sm",
        sm: "px-3 py-1.5 text-xs",
        lg: "px-5 py-2 text-base",
        icon: "h-10 w-10 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
