const main = document.querySelector<HTMLElement>('.collection-layout > main')
const desktop = matchMedia('(min-width: 64rem)')
const key = 'collectionScroll'
if (main) {
  if (!main.id) main.id = 'page-content'
  main.tabIndex = -1
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  const stored: unknown = history.state?.[key]
  const saved = typeof stored === 'number' && Number.isFinite(stored) ? stored : 0
  let restoring = true
  let timer: ReturnType<typeof setTimeout> | undefined
  const save = () => {
    if (restoring || !desktop.matches) return
    try { history.replaceState({ ...history.state, [key]: main.scrollTop }, '') } catch { /* History may be unavailable in embedded previews. */ }
  }
  const restore = () => {
    if (location.hash) {
      let id = ''
      try { id = decodeURIComponent(location.hash.slice(1)) } catch { return }
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    } else if (desktop.matches && navigation?.type === 'back_forward') main.scrollTop = saved
    restoring = false
  }
  main.addEventListener('scroll', () => {
    clearTimeout(timer)
    timer = setTimeout(save, 120)
  }, { passive: true })
  window.addEventListener('pagehide', save)
  window.addEventListener('pageshow', event => { if (!event.persisted) requestAnimationFrame(restore) })
  if (document.readyState === 'complete') requestAnimationFrame(restore)
  window.addEventListener('hashchange', () => {
    if (!location.hash && desktop.matches) main.scrollTop = 0
    else requestAnimationFrame(restore)
  })
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href="#"]') : null
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (desktop.matches) main.scrollTop = 0
  })
  desktop.addEventListener('change', () => {
    main.scrollTop = 0
    window.scrollTo(0, 0)
  })
}
