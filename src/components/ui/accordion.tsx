import * as React from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib'

const Accordion = CollapsiblePrimitive.Root

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      'group flex w-full items-center justify-between gap-2 rounded-md transition-colors hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
  </CollapsiblePrimitive.Trigger>
))
AccordionTrigger.displayName = CollapsiblePrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      className,
    )}
    {...props}
  >
    <div>{children}</div>
  </CollapsiblePrimitive.Content>
))
AccordionContent.displayName = CollapsiblePrimitive.Content.displayName

export { Accordion, AccordionTrigger, AccordionContent }

