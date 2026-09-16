import { motion } from '@/astro/scripts/motion'

declare global { interface Window { collectionExit?: Promise<void> } }

const reduced = matchMedia('(prefers-reduced-motion: reduce)')
const running = new Set<Animation>()
const settle = () => {
  delete document.documentElement.dataset.collectionPending
  running.forEach(animation => animation.cancel())
  running.clear()
}
document.addEventListener('keydown', settle, { capture: true })
document.addEventListener('pointerdown', settle, { capture: true })
document.addEventListener('focusin', settle)
document.addEventListener('input', settle, { capture: true })
reduced.addEventListener('change', () => { if (reduced.matches) settle() })
window.addEventListener('pagehide', settle)
window.addEventListener('pageshow', event => { if (event.persisted) settle() })

let started = false
function enterCollection(afterExit?: Promise<void>) {
  const main = document.querySelector<HTMLElement>('.collection-layout > main')
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  const internalArrival = navigation?.type === 'navigate' && document.referrer.startsWith(`${location.origin}/`)
  const pointerArrival = document.documentElement.dataset.collectionArrival === 'pointer'
  if (started || !main || typeof main.animate !== 'function' || reduced.matches || location.hash ||
    document.documentElement.dataset.input === 'keyboard' || navigation?.type === 'back_forward' || (internalArrival && !pointerArrival)) return
  started = true
  const desktop = matchMedia('(min-width: 64rem)').matches
  const bounds = desktop ? main.getBoundingClientRect() : { top: 0, bottom: innerHeight }
  const elements = [...main.querySelectorAll<HTMLElement>('.collection-title, [data-artifact], [data-board] > h1, [data-board] > article, [data-board] > figure, [data-board] > a, .photography-title, .photograph')]
  const visible = elements.filter(element => {
    const rect = element.getBoundingClientRect()
    return rect.width > 0 && rect.height > 0 && rect.bottom > bounds.top && rect.top < bounds.bottom
  })
  visible.forEach((element, index) => {
    const animation = element.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }],
      { duration: 380, delay: index * 55, easing: motion.out, fill: 'backwards' })
    if (afterExit) {
      animation.pause()
      afterExit.then(() => { if (running.has(animation)) animation.play() }, settle)
    }
    running.add(animation)
    animation.onfinish = () => { running.delete(animation); animation.cancel() }
  })
  delete document.documentElement.dataset.collectionPending
}

// pagereveal can precede module loading; both paths use the same exit promise.
document.addEventListener('collection:enter', event => enterCollection((event as CustomEvent<Promise<void> | undefined>).detail))
requestAnimationFrame(() => enterCollection(window.collectionExit))
