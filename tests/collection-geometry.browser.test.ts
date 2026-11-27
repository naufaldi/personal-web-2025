import { afterAll, expect, test } from 'bun:test'
const origin = process.env.MOTION_TEST_ORIGIN ?? 'http://127.0.0.1:4341'
function browser(...args: string[]) {
  const result = Bun.spawnSync(['agent-browser', '--session', 'faldi-collection-geometry', ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (result.exitCode) throw new Error(new TextDecoder().decode(result.stderr))
  return new TextDecoder().decode(result.stdout)
}
function evaluate<T>(script: string): T {
  return (JSON.parse(browser('eval', script, '--json')) as { data: { result: T } }).data.result
}
afterAll(() => {
  Bun.spawnSync(['agent-browser', '--session', 'faldi-collection-geometry', 'close'], { stdout: 'pipe', stderr: 'pipe' })
})
type Geometry = {
  navBottom: number
  boardTop: number
  boardBottom: number
  titleTop: number
  boardMinusNav: number
  titleMinusNav: number
  mainHorizontalOverflow: number
  mainVerticalOverflow: number
  documentHorizontalOverflow: number
  search: null | { top: number; height: number; width: number; id: string }
  searchControl: null | { top: number; width: number; tagName: string }
  searchLabel: null | { visible: boolean; htmlFor: string }
}
const geometryScript = `(async () => {
  await document.fonts.ready;
  const rect = selector => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const box = el.getBoundingClientRect();
    return { top: box.top, bottom: box.bottom, height: box.height, width: box.width };
  };
  const nav = rect('.collection-header nav');
  const board = rect('[data-board]');
  const title = rect('.archive-title, .editorial-title');
  const input = document.querySelector('[data-archive-search]');
  const control = document.querySelector('[data-search-control]');
  const label = control?.querySelector('label');
  const inputBox = input?.getBoundingClientRect();
  const controlBox = control?.getBoundingClientRect();
  const labelBox = label?.getBoundingClientRect();
  const main = document.querySelector('main');
  return {
    navBottom: nav.bottom,
    boardTop: board.top,
    boardBottom: board.bottom,
    titleTop: title.top,
    boardMinusNav: board.top - nav.bottom,
    titleMinusNav: title.top - nav.bottom,
    mainHorizontalOverflow: main.scrollWidth - main.clientWidth,
    mainVerticalOverflow: main.scrollHeight - main.clientHeight,
    documentHorizontalOverflow: document.documentElement.scrollWidth - innerWidth,
    search: inputBox ? { top: inputBox.top, height: inputBox.height, width: inputBox.width, id: input.id } : null,
    searchControl: controlBox ? { top: controlBox.top, width: controlBox.width, tagName: control.tagName } : null,
    searchLabel: label && labelBox ? { visible: labelBox.width > 0 && labelBox.height > 0, htmlFor: label.htmlFor } : null,
  };
})()`
function open(path: string) {
  browser('open', origin + path)
  browser('wait', '250')
}
function geometry(): Geometry {
  return evaluate<Geometry>(geometryScript)
}

for (const [width, height] of [[1440, 900], [1024, 768]]) {
  test(`archive titles align with the shared board top at ${width}x${height}`, () => {
    browser('set', 'viewport', String(width), String(height))
    const measurements: Record<string, Geometry> = {}
    for (const path of ['/speaker', '/blogs', '/projects']) {
      open(path)
      measurements[path] = geometry()
    }
    const reference = measurements['/speaker']
    for (const path of ['/blogs', '/projects']) {
      const result = measurements[path]
      expect(Math.abs(result.boardMinusNav - reference.boardMinusNav)).toBeLessThanOrEqual(1)
      expect(Math.abs(result.titleMinusNav - reference.titleMinusNav)).toBeLessThanOrEqual(1)
      expect(result.mainHorizontalOverflow).toBeLessThanOrEqual(1)
      expect(result.documentHorizontalOverflow).toBeLessThanOrEqual(1)
      expect(result.mainVerticalOverflow).toBeLessThanOrEqual(1)
      expect(result.search?.height).toBeGreaterThanOrEqual(44)
      expect(result.searchControl?.width).toBeLessThan(500)
      expect(result.search?.top).toBeGreaterThanOrEqual(result.boardBottom - 1)
      expect(result.searchControl?.tagName).toBe('SEARCH')
      expect(result.searchLabel?.visible).toBe(true)
      expect(result.searchLabel?.htmlFor).toBe(result.search?.id)
    }
  }, 120000)
}

test('search input and index toggle preserve focus through archive view changes', () => {
  browser('set', 'viewport', '1440', '900')
  open('/projects')
  const initial = geometry()
  browser('focus', '[data-archive-search]')
  browser('fill', '[data-archive-search]', 'ts-hooks-kit')
  browser('wait', '150')
  const searched = evaluate<Record<string, unknown>>(`(()=>({
    activeSearch: document.activeElement.matches('[data-archive-search]'),
    indexVisible: !document.querySelector('[data-directory]').hidden,
    boardHidden: document.querySelector('[data-board]').hidden,
    query: document.querySelector('[data-archive-search]').value,
  }))()`)
  expect(searched).toEqual({ activeSearch: true, indexVisible: true, boardHidden: true, query: 'ts-hooks-kit' })
  browser('click', '[data-view-toggle]')
  browser('wait', '150')
  const collection = evaluate<Record<string, unknown>>(`(()=>({
    activeMain: document.activeElement === document.querySelector('main'),
    boardVisible: !document.querySelector('[data-board]').hidden,
    indexHidden: document.querySelector('[data-directory]').hidden,
  }))()`)
  expect(collection).toEqual({ activeMain: true, boardVisible: true, indexHidden: true })
  const restored = geometry()
  expect(Math.abs(restored.boardMinusNav - initial.boardMinusNav)).toBeLessThanOrEqual(1)
  browser('click', '[data-view-toggle]')
  browser('wait', '150')
  expect(evaluate<boolean>(`document.activeElement === document.querySelector('[data-directory] h2')`)).toBe(true)
})

test('compact archive controls keep search first without horizontal overflow', () => {
  for (const width of [390, 320]) {
    browser('set', 'viewport', String(width), '844')
    open('/projects')
    const result = evaluate<Record<string, number | boolean>>(`(()=>{
      const box = selector => { const rect = document.querySelector(selector).getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, height: rect.height, width: rect.width } }
      const search = box('[data-archive-search]')
      const control = box('[data-search-control]')
      const filters = box('[data-editorial-filters]')
      const toggle = box('[data-view-toggle]')
      const firstFeature = box('[data-feature-category]')
      return {
        controlBottom: control.bottom,
        searchHeight: search.height,
        searchWidth: search.width,
        filtersTop: filters.top,
        toggleBottom: toggle.bottom,
        featureTop: firstFeature.top,
        horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
        searchBeforeFilters: control.bottom <= filters.top,
        controlsBeforeFeature: toggle.bottom <= firstFeature.top,
      }
    })()`)
    expect(result.searchBeforeFilters).toBe(true)
    expect(result.controlsBeforeFeature).toBe(true)
    expect(result.searchHeight).toBeGreaterThanOrEqual(44)
    expect(result.searchWidth).toBeLessThanOrEqual(width)
    expect(result.horizontalOverflow).toBeLessThanOrEqual(1)
  }
})
