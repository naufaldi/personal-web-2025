import { afterAll, beforeEach, describe, expect, test } from 'bun:test'

// Run against `bun run preview` after building; development CSS has a different order.
const origin = process.env.PROJECTS_TEST_ORIGIN ?? 'http://127.0.0.1:4342'

function browser(...args: string[]) {
  const result = Bun.spawnSync(['agent-browser', '--session', 'faldi-projects-index-tests', ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (result.exitCode) throw new Error(new TextDecoder().decode(result.stderr))
  return new TextDecoder().decode(result.stdout)
}

function evaluate<T>(script: string): T {
  const response = JSON.parse(browser('eval', script, '--json')) as { success: boolean; data: { result: T }; error?: string }
  if (!response.success) throw new Error(response.error)
  return response.data.result
}

function expectReadableRows(withCovers: boolean) {
  const rows = evaluate<{ titleWidth: number; expectedTitleWidth: number; coverWidth: number | null; contained: boolean; overflow: boolean }[]>(`(() => {
    return [...document.querySelectorAll('[data-record]:not([hidden]) summary')].map(summary => {
      const row = summary.getBoundingClientRect();
      const title = summary.querySelector('h3').getBoundingClientRect();
      const cover = summary.querySelector('.index-cover')?.getBoundingClientRect();
      const mobile = innerWidth < 768;
      const gap = parseFloat(getComputedStyle(summary).columnGap);
      const expectedTitleWidth = row.width - 24 - (cover ? (mobile ? 76 : 280) : (mobile ? 0 : 180)) - gap * (cover && !mobile ? 3 : mobile && !cover ? 1 : 2);
      return {
        titleWidth: title.width, expectedTitleWidth, coverWidth: cover?.width ?? null,
        contained: title.left >= row.left && title.right <= row.right + 1,
        overflow: summary.scrollWidth > summary.clientWidth + 1
      };
    });
  })()`)
  expect(rows.length).toBeGreaterThan(0)
  const width = evaluate<number>('innerWidth')
  for (const row of rows) {
    expect(row.titleWidth).toBeCloseTo(row.expectedTitleWidth, 0)
    expect(row.titleWidth).toBeGreaterThan(100)
    expect(row.coverWidth).toBe(withCovers ? (width < 768 ? 76 : 120) : null)
    expect(row.contained).toBe(true)
    expect(row.overflow).toBe(false)
  }
  expect(evaluate<boolean>('document.documentElement.scrollWidth <= innerWidth')).toBe(true)
}

describe('production archive index layout', () => {
  beforeEach(() => {
    browser('set', 'media', 'light', 'reduced-motion')
    browser('set', 'viewport', '1536', '960')
  })
  afterAll(() => browser('close'))

  for (const width of [320, 390, 768, 1024, 1536]) {
    test(`project titles use the available row width at ${width}px`, () => {
      browser('set', 'viewport', String(width), '960')
      browser('open', `${origin}/projects#index`)
      browser('wait', '--fn', 'document.querySelector("[data-view-toggle]").getAttribute("aria-expanded") === "true"')
      evaluate('document.fonts.ready.then(() => true)')
      expectReadableRows(true)
    })
  }

  test('index navigation, keyboard disclosure, search and filters retain readable rows', () => {
    browser('open', `${origin}/projects`)
    browser('wait', '--fn', 'document.querySelector("[data-view-toggle]").hasAttribute("aria-expanded")')
    browser('click', '[data-view-toggle]')
    expect(evaluate<boolean>('!document.querySelector("[data-directory]").hidden')).toBe(true)
    browser('focus', '[data-record]:first-of-type summary')
    browser('press', 'Enter')
    expect(evaluate<boolean>('document.querySelector("[data-record]").open')).toBe(true)
    expectReadableRows(true)
    expect(evaluate<boolean>('document.querySelector("[data-record] a").getBoundingClientRect().width > 0')).toBe(true)
    browser('press', 'Escape')
    expect(evaluate<boolean>('!document.querySelector("[data-record]").open && document.activeElement.matches("summary")')).toBe(true)
    browser('fill', '[data-archive-search]', 'Teacher Exam')
    expect(evaluate<number>('document.querySelectorAll("[data-record]:not([hidden])").length')).toBe(1)
    expectReadableRows(true)
    browser('fill', '[data-archive-search]', 'no-such-project')
    expect(evaluate<boolean>('!document.querySelector("[data-empty]").hidden && document.querySelectorAll("[data-record]:not([hidden])").length === 0')).toBe(true)
    browser('fill', '[data-archive-search]', '')
    browser('click', '[data-editorial-filter="Experiments"]')
    expect(evaluate<boolean>('[...document.querySelectorAll("[data-record]:not([hidden])")].every(record => record.dataset.category.split("|").includes("Experiments"))')).toBe(true)
    expectReadableRows(true)
    browser('click', '[data-editorial-filter="All"]')
    expectReadableRows(true)
  })

  for (const route of ['blogs', 'book', 'manhwa']) {
    test(`${route} retains its shared index layout`, () => {
      for (const width of [390, 1536]) {
        browser('set', 'viewport', String(width), '960')
        browser('open', `${origin}/${route}#index`)
        browser('wait', '--fn', 'document.querySelector("[data-view-toggle]").getAttribute("aria-expanded") === "true"')
        evaluate('document.fonts.ready.then(() => true)')
        expectReadableRows(false)
      }
    })
  }
})
