import { motion, useReducedMotion, type ViewportOptions } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FadeInUpProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
  viewport?: ViewportOptions
}

const FadeInUp = ({
  children,
  className,
  delay = 0.08,
  duration = 0.45,
  distance = 16,
  viewport = { once: true, margin: '-48px 0px -80px' },
}: FadeInUpProps) => {
  const prefersReducedMotion = useReducedMotion()

  const initialState = prefersReducedMotion
    ? { y: 0, opacity: 1 }
    : { y: distance, opacity: 0 }

  const animateState = {
    y: 0,
    opacity: 1,
  }

  return (
    <motion.div
      initial={initialState}
      whileInView={animateState}
      viewport={viewport}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default FadeInUp
