const heading = document.querySelector<HTMLElement>('.collection-heading')
const layout = heading?.closest<HTMLElement>('.collection-layout')

if (heading && layout) {
  const update = () => {
    const style = getComputedStyle(heading)
    const size = parseFloat(style.fontSize)
    const leading = parseFloat(style.lineHeight)
    const intendedSize = parseFloat(style.getPropertyValue('--collection-title-size'))
    const lines = Number(heading.dataset.titleLines)
    const expanded = size > intendedSize * 1.1 || leading > size * 1.1 || parseFloat(style.letterSpacing) > size * .05 ||
      heading.offsetHeight > leading * lines + 2
    layout.toggleAttribute('data-expanded-type', expanded)
  }
  const observer = new ResizeObserver(update)
  observer.observe(heading)
  document.fonts.ready.then(update)
}
