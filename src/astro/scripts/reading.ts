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
if (toc && compactReading.matches) setDisclosure(toc, false)
compactReading.addEventListener('change', ({ matches }) => {
  if (toc && !matches) setDisclosure(toc, true)
})
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('.reading-toc a')]
const sections = tocLinks.flatMap(link => {
  const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)))
  return heading ? [{ link, heading }] : []
})
function updateCurrentHeading() {
  const passed = sections.filter(({ heading }) => heading.getBoundingClientRect().top <= 120)
  const current = passed[passed.length - 1] ?? sections[0]
  sections.forEach(({ link }) => {
    if (link === current?.link) link.setAttribute('aria-current', 'location')
    else link.removeAttribute('aria-current')
  })
}
let scheduled = false
addEventListener('scroll', () => {
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(() => { updateCurrentHeading(); scheduled = false })
}, { passive: true })
updateCurrentHeading()
document.querySelectorAll<HTMLPreElement>('.reading-prose pre').forEach(pre => {
  pre.tabIndex = 0
  pre.setAttribute('aria-label', 'Code example')
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'copy-code'
  button.textContent = 'Copy code'
  button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(pre.textContent ?? ''); button.textContent = 'Copied' }
    catch { button.textContent = 'Select code to copy'; pre.focus() }
    setTimeout(() => { button.textContent = 'Copy code' }, 1800)
  })
  const block = document.createElement('div')
  block.className = 'reading-code-block'
  pre.before(block)
  block.append(button, pre)
})
document.querySelectorAll<HTMLImageElement>('.reading-layout img').forEach(image => {
  const fallback = () => {
    const note = document.createElement('span')
    note.className = 'font-mono text-caption'
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
}
