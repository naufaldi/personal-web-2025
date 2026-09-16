export const motion = {
  enter: 220, exit: 140, move: 260, settle: 120,
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  reposition: 'cubic-bezier(0.77, 0, 0.175, 1)',
} as const
const reduced = matchMedia('(prefers-reduced-motion: reduce)')
const running = new Map<HTMLElement, Animation>()
const pending = new Map<HTMLElement, () => void>()
export const canAnimate = (requested: boolean) => requested && !reduced.matches && document.documentElement.dataset.input === 'pointer'
const visible = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const main = element.closest('main')
  const bounds = main && matchMedia('(min-width: 64rem)').matches ? main.getBoundingClientRect() : { top: 0, bottom: innerHeight }
  return rect.width > 0 && rect.height > 0 && rect.bottom > bounds.top && rect.top < bounds.bottom
}
function cancel(element: HTMLElement) {
  running.get(element)?.cancel()
  running.delete(element)
}
function play(element: HTMLElement, frames: Keyframe[], duration: number, easing: string, done?: () => void) {
  cancel(element)
  const animation = element.animate(frames, { duration, easing })
  running.set(element, animation)
  animation.onfinish = () => {
    if (running.get(element) !== animation) return
    running.delete(element)
    done?.()
  }
}
export function settleExits() {
  const entries = [...pending.entries()]
  pending.clear()
  entries.forEach(([element, complete]) => { cancel(element); complete() })
}
export function settleMotion() {
  const completions = [...pending.values()]
  pending.clear()
  running.forEach(animation => animation.cancel())
  running.clear()
  completions.forEach(complete => complete())
}
export function enter(element: HTMLElement, requested: boolean) {
  if (!canAnimate(requested) || !visible(element)) return
  const active = running.has(element)
  const style = getComputedStyle(element)
  const from = active ? { opacity: style.opacity, transform: style.transform } : { opacity: 0, transform: 'translateY(6px)' }
  play(element, [from, { opacity: 1, transform: 'translateY(0)' }], motion.enter, motion.out)
}
export function reflow(elements: HTMLElement[], requested: boolean, mutate: () => void, duration: number = motion.move) {
  const before = new Map(elements.filter(visible).map(element => [element, { rect: element.getBoundingClientRect(), opacity: getComputedStyle(element).opacity }]))
  elements.forEach(cancel)
  mutate()
  if (!canAnimate(requested)) return
  elements.filter(visible).forEach(element => {
    const old = before.get(element)
    if (!old) { enter(element, true); return }
    const next = element.getBoundingClientRect()
    const x = old.rect.left - next.left
    const y = old.rect.top - next.top
    if (x || y || Number(old.opacity) < 1) play(element, [
      { transform: `translate(${x}px, ${y}px)`, opacity: old.opacity },
      { transform: 'translate(0, 0)', opacity: 1 },
    ], duration, motion.reposition)
  })
}
export function cancelExit(element: HTMLElement) {
  pending.delete(element)
  element.inert = false
  element.removeAttribute('aria-hidden')
  // Preserve the visible frame until enter/reflow samples it.
}
export function exit(element: HTMLElement, requested: boolean, complete: (animateLayout: boolean) => void) {
  cancelExit(element)
  const finish = (animateLayout: boolean) => {
    pending.delete(element)
    element.inert = false
    element.removeAttribute('aria-hidden')
    complete(animateLayout)
  }
  if (!canAnimate(requested) || !visible(element)) { cancel(element); finish(false); return }
  const style = getComputedStyle(element)
  element.inert = true
  element.setAttribute('aria-hidden', 'true')
  pending.set(element, () => finish(false))
  play(element, [{ opacity: style.opacity, transform: style.transform }, { opacity: 0, transform: 'translateY(6px)' }], motion.exit, motion.out, () => finish(true))
}

const disclosures = new WeakMap<HTMLDetailsElement, { content: HTMLElement; desired: boolean }>()
export function setDisclosure(record: HTMLDetailsElement, open: boolean, requested = false) {
  const state = disclosures.get(record)
  if (!state) { record.open = open; return }
  const { content } = state
  state.desired = open
  const summary = record.querySelector('summary')!
  summary.setAttribute('aria-expanded', String(open))
  const siblings = [...(record.parentElement?.children ?? [])].filter((el): el is HTMLElement => el instanceof HTMLElement)
  cancelExit(content)
  if (open) {
    reflow(siblings, requested, () => { record.open = true })
    enter(content, requested)
  } else {
    if (content.contains(document.activeElement)) summary.focus({ preventScroll: true })
    exit(content, requested, animate => {
      if (!state.desired) reflow(siblings, animate, () => { record.open = false }, motion.settle)
    })
  }
}
document.querySelectorAll<HTMLDetailsElement>('details').forEach(record => {
  const summary = record.querySelector('summary')
  const content = [...record.children].find((child): child is HTMLElement => child instanceof HTMLElement && child !== summary)
  if (!summary || !content) return
  const state = { content, desired: record.open }
  disclosures.set(record, state)
  summary.addEventListener('click', event => {
    if ((event.target as Element).closest('a, button')) return
    event.preventDefault()
    const open = pending.has(content) ? true : !record.open
    setDisclosure(record, open, event.detail > 0)
  })
})
document.addEventListener('keydown', () => {
  document.documentElement.dataset.input = 'keyboard'
  settleMotion()
}, { capture: true })
document.addEventListener('pointerdown', () => { document.documentElement.dataset.input = 'pointer' }, { capture: true })
document.addEventListener('pointermove', event => {
  if (event.pointerType === 'mouse') document.documentElement.dataset.input = 'pointer'
}, { passive: true })
reduced.addEventListener('change', () => { if (reduced.matches) settleMotion() })
addEventListener('pagehide', settleMotion)
window.addEventListener('pageshow', event => {
  if (event.persisted) { settleMotion(); delete document.documentElement.dataset.input }
})

export function isNativeLinkAction(event: MouseEvent, target: HTMLElement) {
  return target instanceof HTMLAnchorElement && (
    event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
    target.hasAttribute('download') || Boolean(target.target && target.target !== '_self')
  )
}
