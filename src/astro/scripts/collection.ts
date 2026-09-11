import { isNativeLinkAction, reflow, enter, exit, cancelExit, settleExits } from './motion'
const root = document.querySelector<HTMLElement>('[data-collection]')

if (root) {
  const canvas = root.querySelector<HTMLElement>('[data-canvas]')!
  const index = root.querySelector<HTMLElement>('#index')!
  const toggle = root.querySelector<HTMLAnchorElement>('[data-index-toggle]')!
  const status = root.querySelector<HTMLElement>('[data-status]')!
  const cards = [...root.querySelectorAll<HTMLElement>('[data-artifact]')]
  const rows = [...root.querySelectorAll<HTMLElement>('[data-index-item]')]
  const filters = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')]
  let selected: HTMLElement | null = null
  let indexOpen = false
  let previewTrigger: HTMLElement | null = null

  root.querySelectorAll<HTMLElement>('.filters, [data-expand], [data-index-expand]').forEach(element => { element.hidden = false })
  index.hidden = true
  toggle.setAttribute('aria-expanded', 'false')
  toggle.setAttribute('aria-controls', 'index')
  function update(animate: boolean, mutate: () => void) {
    reflow([...cards, ...rows], animate, mutate)
  }

  function closeSelection(restoreFocus: boolean, animate = false) {
    if (!selected) return
    const card = selected
    const dialog = card.querySelector<HTMLDialogElement>('dialog')!
    card.querySelector('[data-expand]')!.setAttribute('aria-expanded', 'false')
    exit(dialog, animate, () => {
      dialog.close()
      document.documentElement.classList.remove('preview-open')
      selected = null
      if (restoreFocus) previewTrigger?.focus({ preventScroll: true })
    })
  }

  function setFilter(next: string, animate: boolean) {
    settleExits()
    update(animate, () => {
      if (selected && next !== 'All' && selected.dataset.category !== next) closeSelection(false)
      for (const item of [...cards, ...rows]) item.hidden = next !== 'All' && item.dataset.category !== next
      for (const filter of filters) filter.setAttribute('aria-pressed', String(filter.dataset.filter === next))
      canvas.classList.toggle('is-reflow', next !== 'All')
      const count = cards.filter(card => !card.hidden).length
      root!.querySelector<HTMLElement>('.empty-state')!.hidden = count > 0
      status.textContent = `${count} artifacts. ${next} collection.`
    })
  }

  function setIndex(open: boolean, animate = false) {
    settleExits()
    update(animate, () => {
      indexOpen = open
      canvas.hidden = open
      index.hidden = !open
      toggle.setAttribute('aria-expanded', String(open))
      toggle.firstChild!.textContent = open ? 'Back to collection ' : 'Open index '
      status.textContent = open ? 'Index view.' : 'Collection view.'
    })
  }

  function expand(id: string, animate: boolean, fromIndex = false) {
    const card = cards.find(item => item.dataset.artifact === id)
    if (!card) return
    const dialog = card.querySelector<HTMLDialogElement>('dialog')!
    cancelExit(dialog)
    if (selected && selected !== card) closeSelection(false)
    selected = card
    previewTrigger = fromIndex
      ? rows.find(row => row.dataset.indexItem === id)!.querySelector<HTMLElement>('[data-index-expand]')!
      : card.querySelector<HTMLElement>('[data-expand]')!
    document.documentElement.classList.add('preview-open')
    if (!dialog.open) dialog.showModal()
    card.querySelector('[data-expand]')!.setAttribute('aria-expanded', 'true')
    dialog.querySelector<HTMLButtonElement>('[data-close]')!.focus({ preventScroll: true })
    enter(dialog, animate)
  }

  cards.forEach(card => {
    const dialog = card.querySelector<HTMLDialogElement>('dialog')!
    const media = card.querySelector<HTMLElement>('.artifact-face')!.cloneNode(true) as HTMLElement
    media.querySelector('[data-expand]')?.remove()
    media.querySelectorAll('img').forEach(image => { image.loading = 'eager' })
    dialog.querySelector('.preview-media')!.append(media)
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return
      const controls = [...dialog.querySelectorAll<HTMLElement>('button, a[href]')]
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    })
    dialog.addEventListener('cancel', event => {
      event.preventDefault()
      closeSelection(true)
    })
  })

  root.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null
    const button = target?.closest<HTMLElement>('button, [data-index-toggle]')
    if (!button || isNativeLinkAction(event, button)) return
    const animate = event.detail > 0
    if (button.dataset.filter) setFilter(button.dataset.filter, animate)
    else if (button.dataset.expand) expand(button.dataset.expand, animate)
    else if (button.dataset.indexExpand) expand(button.dataset.indexExpand, animate, true)
    else if (button.hasAttribute('data-close')) closeSelection(true, animate)
    else if (button.hasAttribute('data-reset')) {
      setFilter('All', animate)
      filters[0].focus()
    } else if (button.hasAttribute('data-index-toggle')) {
      event.preventDefault()
      setIndex(!indexOpen, animate)
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
  if (location.hash === '#index') setIndex(true)
}
