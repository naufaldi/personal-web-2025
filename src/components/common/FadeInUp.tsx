import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FadeInUpProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

const FadeInUp = ({ children, className, delay = 0.12, duration = 0.8 }: FadeInUpProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default FadeInUp

