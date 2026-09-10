const root = document.querySelector<HTMLElement>('[data-collection]')

if (root) {
  const canvas = root.querySelector<HTMLElement>('[data-canvas]')!
  const index = root.querySelector<HTMLElement>('#index')!
  const toggle = root.querySelector<HTMLAnchorElement>('[data-index-toggle]')!
  const status = root.querySelector<HTMLElement>('[data-status]')!
  const cards = [...root.querySelectorAll<HTMLElement>('[data-artifact]')]
  const rows = [...root.querySelectorAll<HTMLElement>('[data-index-item]')]
  const filters = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let category = 'All'
  let selected: HTMLElement | null = null
  let indexOpen = false

  root.querySelectorAll<HTMLElement>('.filters, [data-expand], [data-index-expand]').forEach(element => { element.hidden = false })
  index.hidden = true
  toggle.setAttribute('aria-expanded', 'false')
  toggle.setAttribute('aria-controls', 'index')
  document.addEventListener('keydown', () => {
    root.dataset.input = 'keyboard'
    root.getAnimations({ subtree: true }).forEach(animation => animation.cancel())
  })
  document.addEventListener('pointerdown', () => { root.dataset.input = 'pointer' })

  function update(animate: boolean, mutate: () => void) {
    const before = new Map(cards.filter(card => !card.hidden).map(card => [card, card.getBoundingClientRect()]))
    root!.getAnimations({ subtree: true }).forEach(animation => animation.cancel())
    mutate()
    if (!animate || reduced.matches) return
    for (const card of cards.filter(card => !card.hidden && !canvas.hidden)) {
      const old = before.get(card)
      const next = card.getBoundingClientRect()
      if (old && old.width && old.height) {
        const x = old.left - next.left
        const y = old.top - next.top
        card.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: 'translate(0, 0)' }], {
          duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        })
      } else {
        card.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' })
      }
    }
  }

  function closeSelection(restoreFocus: boolean) {
    if (!selected) return
    const trigger = selected.querySelector<HTMLButtonElement>('[data-expand]')!
    selected.classList.remove('is-selected')
    selected.querySelector<HTMLElement>('.artifact-detail')!.hidden = true
    trigger.setAttribute('aria-expanded', 'false')
    selected = null
    canvas.classList.toggle('is-reflow', category !== 'All')
    if (restoreFocus) trigger.focus()
  }

  function setFilter(next: string, animate: boolean) {
    update(animate, () => {
      category = next
      if (selected && next !== 'All' && selected.dataset.category !== next) closeSelection(false)
      for (const item of [...cards, ...rows]) item.hidden = next !== 'All' && item.dataset.category !== next
      for (const filter of filters) filter.setAttribute('aria-pressed', String(filter.dataset.filter === next))
      canvas.classList.toggle('is-reflow', next !== 'All' || !!selected)
      const count = cards.filter(card => !card.hidden).length
      root!.querySelector<HTMLElement>('.empty-state')!.hidden = count > 0
      status.textContent = `${count} artifacts. ${next} collection.`
    })
  }

  function setIndex(open: boolean) {
    indexOpen = open
    canvas.hidden = open
    index.hidden = !open
    toggle.setAttribute('aria-expanded', String(open))
    toggle.firstChild!.textContent = open ? 'Back to collection ' : 'Open index '
    status.textContent = open ? 'Index view.' : 'Collection view.'
  }

  function expand(id: string, animate: boolean, fromIndex = false) {
    const card = cards.find(item => item.dataset.artifact === id)
    if (!card) return
    update(animate, () => {
      if (indexOpen) setIndex(false)
      const isSame = selected === card && !fromIndex
      closeSelection(false)
      if (isSame) return
      selected = card
      canvas.classList.add('is-reflow')
      card.classList.add('is-selected')
      card.querySelector<HTMLElement>('.artifact-detail')!.hidden = false
      card.querySelector('[data-expand]')!.setAttribute('aria-expanded', 'true')
      status.textContent = `${card.querySelector('.artifact-caption a')!.textContent} expanded.`
    })
    if (fromIndex || selected) {
      card.querySelector<HTMLButtonElement>('[data-expand]')!.focus({ preventScroll: true })
      card.scrollIntoView({ block: 'nearest', behavior: 'instant' })
    }
  }

  root.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null
    const button = target?.closest<HTMLElement>('button, [data-index-toggle]')
    if (!button) return
    const animate = event.detail > 0
    if (button.dataset.filter) setFilter(button.dataset.filter, animate)
    else if (button.dataset.expand) expand(button.dataset.expand, animate)
    else if (button.dataset.indexExpand) expand(button.dataset.indexExpand, animate, true)
    else if (button.hasAttribute('data-close')) update(animate, () => closeSelection(true))
    else if (button.hasAttribute('data-reset')) {
      setFilter('All', animate)
      filters[0].focus()
    } else if (button.hasAttribute('data-index-toggle')) {
      event.preventDefault()
      setIndex(!indexOpen)
      if (indexOpen) {
        const heading = index.querySelector<HTMLElement>('h2')!
        heading.tabIndex = -1
        heading.focus()
      } else {
        root.querySelector<HTMLElement>('main')!.focus()
      }
    }
  })
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && selected) {
      event.preventDefault()
      update(false, () => closeSelection(true))
    }
  })
  const mediaError = (image: HTMLImageElement) => {
    const frame = image.closest<HTMLElement>('.media-frame')!
    frame.classList.add('has-error')
    frame.querySelector<HTMLElement>('.media-unavailable')!.hidden = false
    image.style.visibility = 'hidden'
  }
  root.querySelectorAll<HTMLImageElement>('.media-frame img').forEach(image => {
    image.addEventListener('error', () => mediaError(image))
    if (image.complete && image.naturalWidth === 0) mediaError(image)
  })
  reduced.addEventListener('change', () => {
    if (reduced.matches) root.getAnimations({ subtree: true }).forEach(animation => animation.cancel())
  })
  if (location.hash === '#index') setIndex(true)
}
