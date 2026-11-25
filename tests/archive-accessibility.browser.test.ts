import { expect, test } from 'bun:test'
const origin = process.env.MOTION_TEST_ORIGIN ?? 'http://127.0.0.1:4341'
function browser(...args: string[]) {
  const result = Bun.spawnSync(['agent-browser', '--session', 'faldi-archive-a11y', ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (result.exitCode) throw new Error(new TextDecoder().decode(result.stderr))
  return new TextDecoder().decode(result.stdout)
}
function evaluate<T>(script: string): T {
  return (JSON.parse(browser('eval', script, '--json')) as { data: { result: T } }).data.result
}
function open(path: string) {
  browser('open', origin + path)
  browser('wait', '250')
}

test('escape only closes the archive record containing focus', () => {
  browser('set', 'viewport', '1024', '800')
  open('/projects#ts-hooks-kit')
  expect(evaluate<boolean>(`document.getElementById('ts-hooks-kit').open`)).toBe(true)
  evaluate(`document.querySelector('[data-archive-search]').focus()`)
  browser('press', 'Escape')
  expect(evaluate<boolean>(`document.activeElement.matches('[data-archive-search]')`)).toBe(true)
  expect(evaluate<boolean>(`document.getElementById('ts-hooks-kit').open`)).toBe(true)
  evaluate(`document.querySelector('#ts-hooks-kit a[href^="/projects/"]').focus()`)
  browser('press', 'Escape')
  expect(evaluate<boolean>(`!document.getElementById('ts-hooks-kit').open && document.activeElement === document.querySelector('#ts-hooks-kit summary')`)).toBe(true)
})

test('projects filtered round trip and browser back restore view state and result focus', () => {
  browser('set', 'viewport', '1024', '800')
  open('/projects')
  browser('fill', '[data-archive-search]', 'ts-hooks-kit')
  browser('wait', '150')
  browser('focus', '[data-editorial-filter="Software"]')
  browser('press', 'Enter')
  browser('wait', '150')
  const outgoing = evaluate<string | null>(`document.querySelector('#ts-hooks-kit a[href^="/projects/ts-hooks-kit"]')?.getAttribute('href') ?? null`)
  expect(outgoing).toContain('return=')
  evaluate(`document.querySelector('#ts-hooks-kit summary').scrollIntoView({ block: 'center', behavior: 'instant' })`)
  browser('wait', '100')
  browser('click', '#ts-hooks-kit summary')
  browser('wait', '100')
  evaluate(`document.querySelector('#ts-hooks-kit a[href^="/projects/ts-hooks-kit"]').scrollIntoView({ block: 'center', behavior: 'instant' })`)
  browser('wait', '100')
  browser('click', '#ts-hooks-kit a[href^="/projects/ts-hooks-kit"]')
  browser('wait', '350')
  expect(browser('get', 'url').trim()).toContain('/projects/ts-hooks-kit')
  const back = evaluate<string | null>(`document.querySelector('.reading-intro a.editorial-link')?.getAttribute('href') ?? null`)
  expect(back).toContain('/projects?')
  browser('focus', '.reading-intro a.editorial-link')
  browser('press', 'Enter')
  browser('wait', '800')
  const restored = evaluate<Record<string, unknown>>(`(()=>({
    path: location.pathname,
    query: document.querySelector('[data-archive-search]').value,
    softwarePressed: document.querySelector('[data-editorial-filter="Software"]').getAttribute('aria-pressed'),
    indexVisible: !document.querySelector('[data-directory]').hidden,
    boardHidden: document.querySelector('[data-board]').hidden,
    focusRecord: document.activeElement?.closest('[data-record]')?.id ?? null,
    activeHref: document.activeElement?.getAttribute('href') ?? null,
    status: document.querySelector('[data-editorial-status]').textContent,
  }))()`)
  expect(restored.path).toBe('/projects')
  expect(restored.query).toBe('ts-hooks-kit')
  expect(restored.softwarePressed).toBe('true')
  expect(restored.indexVisible).toBe(true)
  expect(restored.boardHidden).toBe(true)
  expect(restored.focusRecord).toBe('ts-hooks-kit')
  expect(String(restored.activeHref)).toContain('/projects/ts-hooks-kit')
  browser('press', 'Enter')
  browser('wait', '800')
  expect(browser('get', 'url').trim()).toContain('/projects/ts-hooks-kit')
  browser('back')
  browser('wait', '800')
  const afterBack = evaluate<Record<string, unknown>>(`(()=>({
    query: document.querySelector('[data-archive-search]').value,
    softwarePressed: document.querySelector('[data-editorial-filter="Software"]').getAttribute('aria-pressed'),
    indexVisible: !document.querySelector('[data-directory]').hidden,
    focusRecord: document.activeElement?.closest('[data-record]')?.id ?? null,
  }))()`)
  expect(afterBack).toEqual({ query: 'ts-hooks-kit', softwarePressed: 'true', indexVisible: true, focusRecord: 'ts-hooks-kit' })
})

test('projects collection-view round trip restores the originating board artifact focus', () => {
  browser('set', 'viewport', '1024', '800')
  open('/projects')
  const outgoing = evaluate<string | null>(`document.querySelector('[data-board] a[href^="/projects/ts-hooks-kit"]')?.getAttribute('href') ?? null`)
  const returnDestination = outgoing ? new URL(outgoing, origin).searchParams.get('return') : null
  const focus = returnDestination ? new URL(returnDestination, origin).searchParams.get('focus') : null
  expect(focus).toBe('board:ts-hooks-kit')
  browser('focus', '[data-board] a[href^="/projects/ts-hooks-kit"]')
  browser('press', 'Enter')
  browser('wait', '800')
  expect(browser('get', 'url').trim()).toContain('/projects/ts-hooks-kit')
  browser('focus', '.reading-intro a.editorial-link')
  browser('press', 'Enter')
  browser('wait', '800')
  const restored = evaluate<Record<string, unknown>>(`(()=>({
    path: location.pathname,
    boardVisible: !document.querySelector('[data-board]').hidden,
    indexHidden: document.querySelector('[data-directory]').hidden,
    boardFocused: document.activeElement?.matches('[data-board] a[href^="/projects/ts-hooks-kit"]') ?? false,
    query: document.querySelector('[data-archive-search]').value,
  }))()`)
  expect(restored).toEqual({ path: '/projects', boardVisible: true, indexHidden: true, boardFocused: true, query: '' })
})

test('case study return destinations are optional and constrained to the local projects archive', () => {
  open('/projects/ts-hooks-kit')
  expect(evaluate<string>(`document.querySelector('.reading-intro a.editorial-link').getAttribute('href')`)).toBe('/projects')
  const validReturn = '/projects?q=ts-hooks-kit&view=index&focus=index%3Ats-hooks-kit'
  open(`/projects/ts-hooks-kit?return=${encodeURIComponent(validReturn)}`)
  expect(evaluate<string>(`document.querySelector('.reading-intro a.editorial-link').getAttribute('href')`)).toBe(validReturn)
  open(`/projects/ts-hooks-kit?return=${encodeURIComponent('https://example.net/projects?q=stolen')}`)
  expect(evaluate<string>(`document.querySelector('.reading-intro a.editorial-link').getAttribute('href')`)).toBe('/projects')
  open(`/projects/ts-hooks-kit?return=${encodeURIComponent('/about?q=wrong')}`)
  expect(evaluate<string>(`document.querySelector('.reading-intro a.editorial-link').getAttribute('href')`)).toBe('/projects')
})

test('mobile projects controls precede the first feature and keep usable control sizes', () => {
  for (const width of [320, 390]) {
    browser('set', 'viewport', String(width), '844')
    open('/projects')
    const result = evaluate<Record<string, number>>(`(()=>{
      const box = selector => { const rect = document.querySelector(selector).getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, height: rect.height } }
      const search = box('[data-archive-search]')
      const filters = box('[data-editorial-filters]')
      const toggle = box('[data-view-toggle]')
      const firstFeature = box('[data-feature-category]')
      const firstButton = document.querySelector('[data-editorial-filter]').getBoundingClientRect()
      return { width: innerWidth, searchBottom: search.bottom, filtersTop: filters.top, filtersHeight: filters.height, toggleTop: toggle.top, toggleHeight: toggle.height, firstButtonHeight: firstButton.height, featureTop: firstFeature.top }
    })()`)
    expect(result.searchBottom).toBeLessThanOrEqual(result.filtersTop)
    expect(result.filtersTop).toBeLessThan(result.featureTop)
    expect(result.toggleTop).toBeLessThan(result.featureTop)
    expect(result.firstButtonHeight).toBeGreaterThanOrEqual(44)
    expect(result.toggleHeight).toBeGreaterThanOrEqual(44)
  }
})

test('featured archive destinations expose one keyboard stop per item', () => {
  const pages: Array<[string, string, string]> = [
    ['/projects', '[data-board] .archive-artifact', '[data-board] .archive-artifact .archive-face'],
    ['/blogs', '[data-board] .writing-artifact', '[data-board] a.writing-artifact'],
    ['/speaker', '[data-board] figure', '[data-board] figure > a'],
  ]
  browser('set', 'viewport', '1024', '800')
  for (const [path, selector, focusSelector] of pages) {
    open(path)
    const stops = evaluate<number[]>(`(()=>[...document.querySelectorAll(${JSON.stringify(selector)})].map(item=>{
      const links = [...item.querySelectorAll('a[href]')]
      if (item.matches('a[href]')) links.unshift(item)
      return links.length
    }))()`)
    expect({ path, stops }).toEqual({ path, stops: stops.map(() => 1) })
    browser('focus', focusSelector)
    const visibleFocus = evaluate<boolean>(`document.activeElement.matches(':focus-visible') && getComputedStyle(document.activeElement).outlineWidth !== '0px'`)
    expect({ path, visibleFocus }).toEqual({ path, visibleFocus: true })
    browser('press', 'Tab')
    const movedPastItem = evaluate<boolean>(`(()=>{ const item = document.querySelector(${JSON.stringify(selector)}); return document.activeElement !== item && !item.contains(document.activeElement) })()`)
    expect({ path, movedPastItem }).toEqual({ path, movedPastItem: true })
  }
})

test('encoded and malformed archive fragments resolve safely', () => {
  open('/projects#ts%2Dhooks%2Dkit')
  expect(evaluate<boolean>(`document.getElementById('ts-hooks-kit').open && !document.querySelector('[data-directory]').hidden`)).toBe(true)
  expect(evaluate<boolean>(`(()=>{ const recordTop = document.getElementById('ts-hooks-kit').getBoundingClientRect().top; const main = document.querySelector('main'); return main.scrollTop > 0 && Math.abs(recordTop - main.getBoundingClientRect().top) < 40 })()`)).toBe(true)
  open('/projects#%')
  expect(evaluate<boolean>(`!document.querySelector('[data-search-control]').hidden && !document.querySelector('[data-editorial-filters]').hidden`)).toBe(true)
})

test('homepage artifact count is derived from the rendered collection', () => {
  open('/')
  const result = evaluate<{ count: number; totals: string[] }>(`(()=>({
    count: document.querySelectorAll('.artifact').length,
    totals: [...document.querySelectorAll('.artifact-number')].map(item => item.textContent.split('/').at(-1).trim()),
  }))()`)
  expect(new Set(result.totals).size).toBe(1)
  expect(Number(result.totals[0])).toBe(result.count)
})
