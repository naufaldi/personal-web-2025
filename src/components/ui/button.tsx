import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] disabled:pointer-events-none disabled:opacity-45 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--graphite)] bg-[var(--graphite)] text-[var(--paper)] shadow-[var(--shadow-paper-xs)] hover:bg-[var(--graphite-muted)] hover:border-[var(--graphite-muted)]",
        primary:
          "border border-[var(--graphite)] bg-[var(--graphite)] text-[var(--paper)] shadow-[var(--shadow-paper-xs)] hover:bg-[var(--graphite-muted)] hover:border-[var(--graphite-muted)]",
        secondary:
          "border border-[var(--border-line)] bg-[var(--surface-raised)] text-[var(--graphite)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]",
        "secondary-elevated":
          "border border-[var(--border-line)] bg-[var(--surface-raised)] text-[var(--graphite)] shadow-[var(--shadow-paper-sm)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]",
        outline:
          "border border-[var(--border-line)] bg-transparent text-[var(--graphite)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]",
        technical:
          "border border-[var(--border-line)] bg-[var(--paper)] font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite)] hover:border-[var(--graphite)] hover:bg-[var(--surface-subtle)]",
        ghost: "text-[var(--graphite-muted)] hover:text-[var(--graphite)] hover:bg-[var(--surface-subtle)]",
        link: "text-[var(--graphite-muted)] underline-offset-4 hover:text-[var(--graphite)] hover:underline",
      },
      size: {
        default: "px-4 py-2 text-sm",
        sm: "px-3 py-1.5 text-xs",
        lg: "px-5 py-2.5 text-base",
        icon: "h-10 w-10 p-0 [&_svg]:size-5",
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
