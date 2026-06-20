import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StaggerGroupProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
  viewportMargin?: string
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

const itemVariants: Variants = {
  hidden: { y: 14, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
}

export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.06,
  initialDelay = 0,
  viewportMargin = '-48px 0px -80px',
}: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: staggerDelay, delayChildren: initialDelay },
    },
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin, amount: 0.12 }}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  )
}

export default StaggerGroup
