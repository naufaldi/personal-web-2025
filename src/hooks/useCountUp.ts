import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface UseCountUpOptions {
  duration?: number
  suffix?: string
}

export function useCountUp(target: number, options: UseCountUpOptions = {}) {
  const { duration = 1.5, suffix = '' } = options
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    const durationMs = duration * 1000
    let rafId: number
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, target, duration, prefersReducedMotion])

  const display = `${count.toLocaleString()}+${suffix ? ` ${suffix}` : ''}`

  return { ref, count, display }
}
