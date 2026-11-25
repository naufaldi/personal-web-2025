import { setDisclosure } from './motion'
const toc = document.querySelector<HTMLDetailsElement>('.reading-toc')
toc?.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toc.open) {
    event.preventDefault()
    setDisclosure(toc, false)
    toc.querySelector('summary')?.focus({ preventScroll: true })
  }
})
const compactReading = matchMedia('(max-width: 63.999rem)')
compactReading.addEventListener('change', ({ matches }) => {
  if (toc && !matches) setDisclosure(toc, true)
})
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('.reading-toc a')]
const sections = tocLinks.flatMap(link => {
  const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)))
  return heading ? [{ link, heading }] : []
})
const readingMain = document.querySelector<HTMLElement>('.reading-main')
function projectsReturnDestination(value: string | null) {
  if (!value) return null
  try {
    const url = new URL(value, location.origin)
    if (url.origin !== location.origin) return null
    if (url.pathname !== '/projects' && url.pathname !== '/projects/') return null
    return `${url.pathname}${url.search}${url.hash}`
  } catch { return null }
}
const projectsReturn = projectsReturnDestination(new URLSearchParams(location.search).get('return'))
if (projectsReturn) {
  document.querySelectorAll<HTMLAnchorElement>('.reading-intro a[href="/projects"], .reading-end a[href="/projects"]')
    .forEach(link => { link.href = projectsReturn })
}
function updateCurrentHeading() {
  const threshold = compactReading.matches ? 120 : (readingMain?.getBoundingClientRect().top ?? 0) + 80
  const passed = sections.filter(({ heading }) => heading.getBoundingClientRect().top <= threshold)
  const current = passed[passed.length - 1] ?? sections[0]
  sections.forEach(({ link }) => {
    if (link === current?.link) link.setAttribute('aria-current', 'location')
    else link.removeAttribute('aria-current')
  })
}
let scheduled = false
function scheduleHeadingUpdate() {
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(() => { updateCurrentHeading(); scheduled = false })
}
addEventListener('scroll', scheduleHeadingUpdate, { passive: true })
readingMain?.addEventListener('scroll', scheduleHeadingUpdate, { passive: true })
addEventListener('resize', scheduleHeadingUpdate)
addEventListener('load', scheduleHeadingUpdate, { once: true })
void document.fonts?.ready.then(scheduleHeadingUpdate)
updateCurrentHeading()
document.querySelectorAll<HTMLPreElement>('.reading-prose pre').forEach(pre => {
  pre.tabIndex = 0
  pre.setAttribute('aria-label', 'Code example')
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'copy-code'
  button.textContent = 'Copy code'
  const status = document.createElement('span')
  status.className = 'copy-code-status'
  status.setAttribute('role', 'status')
  status.setAttribute('aria-live', 'polite')
  status.setAttribute('aria-atomic', 'true')
  let attempt = 0
  let announcement = 0
  let reset: ReturnType<typeof setTimeout> | undefined
  const announce = (message: string) => {
    const current = ++announcement
    status.textContent = ''
    setTimeout(() => { if (current === announcement) status.textContent = message }, 0)
  }
  button.addEventListener('click', async () => {
    const current = ++attempt
    clearTimeout(reset)
    try {
      await navigator.clipboard.writeText(pre.textContent ?? '')
      if (current !== attempt) return
      button.textContent = 'Copied'
      announce('Code copied to clipboard')
    } catch {
      if (current !== attempt) return
      button.textContent = 'Select code to copy'
      announce('Copy unavailable. Select the code to copy.')
      pre.focus()
    }
    reset = setTimeout(() => {
      if (current !== attempt) return
      button.textContent = 'Copy code'
      status.textContent = ''
    }, 1800)
  })
  const block = document.createElement('div')
  block.className = 'reading-code-block'
  pre.before(block)
  block.append(button, pre, status)
})
document.querySelectorAll<HTMLImageElement>('.reading-layout img').forEach(image => {
  const fallback = () => {
    const note = document.createElement('span')
    note.className = 'reading-media-error font-mono text-caption'
    note.textContent = image.alt ? `Image unavailable: ${image.alt}` : 'Image unavailable'
    image.replaceWith(note)
  }
  image.addEventListener('error', fallback, { once: true })
  if (image.complete && !image.naturalWidth) fallback()
})

const diagrams = document.querySelectorAll<HTMLElement>('.reading-prose code.language-mermaid')
if (diagrams.length) {
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' })
  for (const [index, code] of [...diagrams].entries()) {
    try {
      const { svg } = await mermaid.render(`reading-diagram-${index}`, code.textContent ?? '')
      const figure = document.createElement('figure')
      figure.className = 'reading-diagram'
      figure.innerHTML = svg
      code.closest('.reading-code-block')?.before(figure)
    } catch { /* Keep the original diagram source readable when rendering fails. */ }
  }
  scheduleHeadingUpdate()
}
