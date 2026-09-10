export {}
const root = document.querySelector<HTMLElement>('[data-editorial]')
if (root) {
  const board = root.querySelector<HTMLElement>('[data-board]')!
  const directory = root.querySelector<HTMLElement>('[data-directory]')!
  const toggle = root.querySelector<HTMLAnchorElement>('[data-view-toggle]')!
  const status = root.querySelector<HTMLElement>('[data-editorial-status]')!
  const records = [...root.querySelectorAll<HTMLDetailsElement>('[data-record]')]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let returnTarget: HTMLElement | null = null
  let category = 'All'
  directory.hidden = true
  root.querySelectorAll<HTMLElement>('[data-editorial-filters]').forEach(el => { el.hidden = false })
  function view(index: boolean) {
    board.hidden = index
    directory.hidden = !index
    toggle.textContent = index ? 'Back to collection ↗' : 'Open index ↗'
    toggle.setAttribute('aria-expanded', String(index))
    status.textContent = index ? 'Index view.' : 'Collection view.'
  }
  toggle.setAttribute('aria-controls', directory.id)
  toggle.setAttribute('aria-expanded', 'false')
  function reveal(id: string, trigger?: HTMLElement) {
    const record = records.find(record => record.id === id)
    if (!record) return
    if (directory.contains(record)) view(true)
    record.hidden = false
    record.open = true
    returnTarget = trigger ?? null
    record.querySelector('summary')!.focus()
    record.scrollIntoView({ block: 'start', behavior: 'instant' })
  }
  root.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>('a, button') : null
    if (!target) return
    if (target.hasAttribute('data-view-toggle')) {
      event.preventDefault()
      view(directory.hidden)
      if (!directory.hidden) directory.querySelector<HTMLElement>('h2')!.focus()
      else root.querySelector<HTMLElement>('main')!.focus()
    } else if (target.dataset.reveal) {
      event.preventDefault()
      reveal(target.dataset.reveal, target)
    } else if (target.hasAttribute('data-profile')) {
      view(false)
      records.forEach(record => { record.open = false })
    } else if (target.dataset.editorialFilter) {
      category = target.dataset.editorialFilter
      board.classList.toggle('is-filtered', category !== 'All')
      root.querySelectorAll<HTMLElement>('[data-feature-category]').forEach(feature => { feature.hidden = category !== 'All' && feature.dataset.featureCategory !== category })
      records.forEach(record => {
        record.hidden = category !== 'All' && record.dataset.category !== category
        if (record.hidden) record.open = false
      })
      root.querySelectorAll<HTMLElement>('[data-editorial-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.editorialFilter === category)))
      status.textContent = `${records.filter(record => !record.hidden).length} entries. ${category}.`
      const surface = directory.hidden ? board : directory
      root.getAnimations({ subtree: true }).forEach(animation => animation.cancel())
      if (event.detail > 0 && !reduced.matches) surface.animate([{ opacity: .4, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'cubic-bezier(.23,1,.32,1)' })
    }
  })
  root.addEventListener('keydown', event => {
    root.getAnimations({ subtree: true }).forEach(animation => animation.cancel())
    if (event.key === 'Escape') {
      const open = records.find(record => record.open && record.contains(document.activeElement)) ?? records.find(record => record.open)
      if (open) {
        open.open = false
        if (returnTarget) { view(directory.contains(returnTarget)); returnTarget.focus() }
        else open.querySelector('summary')!.focus()
        returnTarget = null
      }
    }
  })
  root.querySelectorAll<HTMLImageElement>('.media-frame img').forEach(image => {
    const fallback = () => {
      image.style.visibility = 'hidden'
      image.closest('.media-frame')!.querySelector<HTMLElement>('.media-unavailable')!.hidden = false
    }
    image.addEventListener('error', fallback)
    if (image.complete && !image.naturalWidth) fallback()
  })
  reduced.addEventListener('change', () => { if (reduced.matches) root.getAnimations({ subtree: true }).forEach(animation => animation.cancel()) })
  if (location.hash === '#index') view(true)
  else if (location.hash) reveal(location.hash.slice(1))
}
