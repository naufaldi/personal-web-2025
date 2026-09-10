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
  let query = ''
  const features = [...root.querySelectorAll<HTMLElement>('[data-feature-category]')]
  const empty = root.querySelector<HTMLElement>('[data-empty]')
  const search = root.querySelector<HTMLInputElement>('[data-archive-search]')
  root.querySelectorAll<HTMLElement>('[data-search-control]').forEach(el => { el.hidden = false })
  const matches = (element: HTMLElement, value: string | undefined) =>
    (category === 'All' || value?.split('|').includes(category)) &&
    (!query || (element.dataset.search ?? element.textContent ?? '').toLocaleLowerCase().includes(query))
  function filter(animate: boolean) {
    board.classList.toggle('is-filtered', category !== 'All' || Boolean(query))
    features.forEach(feature => { feature.hidden = !matches(feature, feature.dataset.featureCategory) })
    records.forEach(record => {
      record.hidden = !matches(record, record.dataset.category)
      if (record.hidden) record.open = false
    })
    root!.querySelectorAll<HTMLElement>('[data-editorial-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.editorialFilter === category)))
    const count = records.filter(record => !record.hidden).length
    if (empty) {
      const noFeatures = features.every(feature => feature.hidden)
      empty.hidden = directory.hidden ? !noFeatures : count > 0
      empty.firstChild!.textContent = count === 0 ? 'No entries match. Try another search or filter. ' : 'No featured entries match. '
      empty.querySelector<HTMLElement>('a')!.hidden = count === 0
    }
    status.textContent = `${count} entries. ${category}.${query ? ` Search: ${query}.` : ''}`
    const surface = directory.hidden ? board : directory
    root!.getAnimations({ subtree: true }).forEach(animation => animation.cancel())
    if (animate && !reduced.matches) surface.animate([{ opacity: .4, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'cubic-bezier(.23,1,.32,1)' })
  }
  directory.hidden = true
  root.querySelectorAll<HTMLElement>('[data-editorial-filters]').forEach(el => { el.hidden = false })
  function view(index: boolean) {
    board.hidden = index
    directory.hidden = !index
    toggle.textContent = index ? 'Back to collection ↗' : 'Open index ↗'
    toggle.setAttribute('aria-expanded', String(index))
    status.textContent = index ? 'Index view.' : 'Collection view.'
    if (empty) empty.hidden = index ? records.some(record => !record.hidden) : features.some(feature => !feature.hidden)
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
    if (target.hasAttribute('data-open-index')) {
      event.preventDefault()
      view(true)
      directory.querySelector<HTMLElement>('h2')!.focus()
    } else if (target.hasAttribute('data-view-toggle')) {
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
      filter(event.detail > 0)
    }
  })
  search?.addEventListener('input', () => {
    query = search.value.trim().toLocaleLowerCase()
    view(true)
    filter(false)
  })
  records.forEach(record => record.querySelector('summary')!.addEventListener('click', () => { returnTarget = null }))
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
