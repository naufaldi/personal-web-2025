import { isModifierOnlyKey, isNativeLinkAction, reflow, setDisclosure, settleMotion, settleExits } from './motion'
import { decodeFragment } from './fragments'
const root = document.querySelector<HTMLElement>('[data-editorial]')
if (root) {
  const board = root.querySelector<HTMLElement>('[data-board]')!
  const directory = root.querySelector<HTMLElement>('[data-directory]')!
  const toggle = root.querySelector<HTMLAnchorElement>('[data-view-toggle]')!
  const status = root.querySelector<HTMLElement>('[data-editorial-status]')!
  const records = [...root.querySelectorAll<HTMLDetailsElement>('[data-record]')]
  const filterButtons = [...root.querySelectorAll<HTMLElement>('[data-editorial-filter]')]
  const categories = new Set(filterButtons.map(button => button.dataset.editorialFilter ?? ''))
  const isProjectsArchive = location.pathname.replace(/\/$/, '') === '/projects'
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
  function updateEmpty() {
    if (!empty) return
    const count = records.filter(record => !record.hidden).length
    empty.hidden = directory.hidden ? features.some(feature => !feature.hidden) : count > 0
    empty.querySelector<HTMLElement>('[data-empty-title]')!.textContent = count ? 'More in the index.' : 'No matches this time.'
    empty.querySelector<HTMLElement>('[data-empty-description]')!.textContent = count
      ? `${count} matching ${count === 1 ? 'entry is' : 'entries are'} in the index. This selection has no featured artifacts.`
      : 'Try another search or clear the filters to see the collection.'
    empty.querySelector<HTMLElement>('[data-open-index]')!.hidden = count === 0
  }
  function decodePathSegment(value: string) {
    try { return decodeURIComponent(value) } catch { return value }
  }
  function projectLinkInfo(link: HTMLAnchorElement) {
    if (!isProjectsArchive) return null
    const href = link.getAttribute('href')
    if (!href) return null
    const url = new URL(href, location.origin)
    const segments = url.pathname.split('/').filter(Boolean)
    if (url.origin !== location.origin || segments.length !== 2 || segments[0] !== 'projects') return null
    const id = decodePathSegment(segments[1]!)
    if (!records.some(record => record.id === id)) return null
    const area = link.closest('[data-record]') ? 'index' : 'board'
    return { id, area, key: `${area}:${id}` }
  }
  function collectionUrl(focusKey?: string) {
    const url = new URL('/projects', location.origin)
    if (query) url.searchParams.set('q', query)
    if (category !== 'All') url.searchParams.set('category', category)
    if (!directory.hidden) url.searchParams.set('view', 'index')
    if (focusKey) url.searchParams.set('focus', focusKey)
    return url
  }
  function decorateProjectLinks() {
    if (!isProjectsArchive) return
    root!.querySelectorAll<HTMLAnchorElement>('a[href^="/projects/"]').forEach(link => {
      const info = projectLinkInfo(link)
      const href = link.getAttribute('href')
      if (!info || !href) return
      const destination = new URL(href, location.origin)
      const back = collectionUrl(info.key)
      destination.searchParams.set('return', `${back.pathname}${back.search}`)
      link.setAttribute('href', `${destination.pathname}${destination.search}`)
    })
  }
  function syncUrl(focusKey: string | null) {
    if (!isProjectsArchive) return
    const url = new URL(location.href)
    if (query) url.searchParams.set('q', query)
    else url.searchParams.delete('q')
    if (category !== 'All') url.searchParams.set('category', category)
    else url.searchParams.delete('category')
    if (!directory.hidden) url.searchParams.set('view', 'index')
    else url.searchParams.delete('view')
    if (focusKey) url.searchParams.set('focus', focusKey)
    else url.searchParams.delete('focus')
    try { history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`) } catch { /* Embedded previews can reject history writes. */ }
    decorateProjectLinks()
  }
  function filter(animate: boolean) {
    settleExits()
    reflow([...features, ...records], animate, () => {
      board.classList.toggle('is-filtered', category !== 'All' || Boolean(query))
      features.forEach(feature => { feature.hidden = !matches(feature, feature.dataset.featureCategory) })
      records.forEach(record => {
        record.hidden = !matches(record, record.dataset.category)
        if (record.hidden) setDisclosure(record, false)
    })
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.editorialFilter === category)))
    const count = records.filter(record => !record.hidden).length
    updateEmpty()
    status.textContent = `${count} entries. ${category}.${query ? ` Search: ${query}.` : ''}`
    })
  }
  directory.hidden = true
  root.querySelectorAll<HTMLElement>('[data-editorial-filters]').forEach(el => { el.hidden = false })
  function view(index: boolean, animate = false) {
    if (board.hidden === index) return
    settleExits()
    reflow([...features, ...records], animate, () => {
      board.hidden = index
      directory.hidden = !index
      toggle.textContent = index ? 'Back to collection ↗' : 'Open index ↗'
      toggle.setAttribute('aria-expanded', String(index))
      status.textContent = index ? 'Index view.' : 'Collection view.'
      updateEmpty()
    })
  }
  toggle.setAttribute('aria-controls', directory.id)
  toggle.setAttribute('aria-expanded', 'false')
  function reveal(id: string, trigger?: HTMLElement, animate = false) {
    const record = records.find(record => record.id === id)
    if (!record) return
    if (directory.contains(record)) view(true)
    record.hidden = false
    setDisclosure(record, true, animate)
    returnTarget = trigger ?? null
    record.querySelector('summary')!.focus()
    record.scrollIntoView({ block: 'start', behavior: 'instant' })
  }
  function restoreFocusedResult(value: string | null) {
    if (!value || !isProjectsArchive) return
    const separator = value.indexOf(':')
    if (separator < 1) return
    const area = value.slice(0, separator)
    const id = value.slice(separator + 1)
    if ((area !== 'index' && area !== 'board') || !records.some(record => record.id === id)) return
    const record = records.find(item => item.id === id)!
    if (area === 'index') {
      if (record.hidden) return
      setDisclosure(record, true)
    }
    const candidates = area === 'index'
      ? [...record.querySelectorAll<HTMLAnchorElement>('a[href^="/projects/"]')]
      : [...board.querySelectorAll<HTMLAnchorElement>('a[href^="/projects/"]')].filter(link => projectLinkInfo(link)?.id === id)
    const target = candidates.find(link => {
      const rect = link.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    })
    if (!target) return
    target.focus({ preventScroll: true })
    target.scrollIntoView({ block: 'nearest', behavior: 'instant' })
  }
  function openFragment() {
    const id = decodeFragment(location.hash)
    if (id === 'index') view(true)
    else if (id) reveal(id)
  }
  root.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>('a, button') : null
    if (!target || isNativeLinkAction(event, target)) return
    if (target instanceof HTMLAnchorElement) {
      const projectLink = projectLinkInfo(target)
      if (projectLink) syncUrl(projectLink.key)
    }
    if (target.hasAttribute('data-editorial-reset')) {
      category = 'All'
      query = ''
      if (search) search.value = ''
      filter(false)
      syncUrl(null)
      const focusTarget = search ?? root.querySelector<HTMLElement>('[data-editorial-filter="All"]')
      focusTarget?.focus({ preventScroll: true })
    } else if (target.hasAttribute('data-open-index')) {
      event.preventDefault()
      view(true, event.detail > 0)
      syncUrl(null)
      directory.querySelector<HTMLElement>('h2')!.focus()
    } else if (target.hasAttribute('data-view-toggle')) {
      event.preventDefault()
      view(directory.hidden, event.detail > 0)
      syncUrl(null)
      if (!directory.hidden) directory.querySelector<HTMLElement>('h2')!.focus()
      else root.querySelector<HTMLElement>('main')!.focus()
    } else if (target.dataset.reveal) {
      event.preventDefault()
      reveal(target.dataset.reveal, target, event.detail > 0)
    } else if (target.hasAttribute('data-profile')) {
      view(false)
      records.forEach(record => setDisclosure(record, false))
    } else if (target.dataset.editorialFilter) {
      category = target.dataset.editorialFilter
      filter(event.detail > 0)
      syncUrl(null)
    }
  })
  search?.addEventListener('input', () => {
    query = search.value.trim().toLocaleLowerCase()
    view(true)
    filter(false)
    syncUrl(null)
  })
  records.forEach(record => record.querySelector('summary')!.addEventListener('click', () => { returnTarget = null }))
  root.addEventListener('keydown', event => {
    if (!isModifierOnlyKey(event)) settleMotion()
    if (event.key === 'Escape') {
      const open = records.find(record => record.open && record.contains(document.activeElement))
      if (open) {
        event.preventDefault()
        setDisclosure(open, false)
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
  const initialParams = new URLSearchParams(location.search)
  const initialQuery = (initialParams.get('q') ?? '').trim().slice(0, 200)
  query = initialQuery.toLocaleLowerCase()
  if (search) search.value = initialQuery
  const initialCategory = initialParams.get('category')
  if (initialCategory && categories.has(initialCategory)) category = initialCategory
  filter(false)
  if (initialParams.get('view') === 'index' || query) view(true)
  openFragment()
  restoreFocusedResult(initialParams.get('focus'))
  decorateProjectLinks()
  window.addEventListener('hashchange', openFragment)
}
