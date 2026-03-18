import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FadeInUpProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  animateOpacity?: boolean
}

const FadeInUp = ({
  children,
  className,
  delay = 0.12,
  duration = 0.8,
  animateOpacity = false,
}: FadeInUpProps) => {
  const prefersReducedMotion = useReducedMotion()

  const initialState = prefersReducedMotion
    ? { y: 0, opacity: 1 }
    : { y: 20, opacity: animateOpacity ? 0 : 1 }

  const animateState = {
    y: 0,
    opacity: 1,
  }

  return (
    <motion.div
      initial={initialState}
      whileInView={animateState}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: 'easeOut',
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default FadeInUp

