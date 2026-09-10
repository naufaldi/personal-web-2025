export {}
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
  pre.after(button)
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
      code.closest('pre')?.before(figure)
    } catch { /* Keep the original diagram source readable when rendering fails. */ }
  }
}
