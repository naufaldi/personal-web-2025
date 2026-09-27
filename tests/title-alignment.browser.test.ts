import { expect, test } from 'bun:test'
import artworkBefore from '../docs/verification/title-alignment/artwork-before.json'

const origin = process.env.MOTION_TEST_ORIGIN ?? 'http://127.0.0.1:4321'
const routes = ['/', '/projects', '/blogs', '/speaker', '/book', '/manhwa', '/photography', '/about']
function browser(...args: string[]) {
  const result = Bun.spawnSync(['agent-browser', '--session', 'title-regression', ...args])
  if (result.exitCode) throw new Error(result.stderr.toString())
  return result.stdout.toString()
}
function evaluate<T>(script: string): T {
  return (JSON.parse(browser('eval', script, '--json')) as { data: { result: T } }).data.result
}
function title() {
  return evaluate<{ x: number; y: number; count: number }>(`(() => {
    const titles = [...document.querySelectorAll('h1')].filter(el => el.getClientRects().length > 0);
    const rect = titles[0]?.getBoundingClientRect();
    return { x: rect?.x, y: rect?.y, count: titles.length };
  })()`)
}
for (const [width, height] of [[1440, 900], [1280, 720], [1024, 768], [834, 900], [390, 844], [320, 740]]) {
  test(`collection titles share an anchor at ${width}x${height}`, () => {
    browser('open', origin + '/about')
    browser('set', 'media', 'reduced-motion')
    browser('set', 'viewport', String(width), String(height))
    browser('wait', '--fn', 'document.fonts.status === "loaded"')
    const reference = title()
    for (const route of routes) {
      browser('open', origin + route)
      browser('wait', '--fn', 'document.fonts.status === "loaded"')
      const current = title()
      expect({ route, count: current.count }).toEqual({ route, count: 1 })
      expect(Math.abs(current.x - reference.x)).toBeLessThanOrEqual(1)
      expect(Math.abs(current.y - reference.y)).toBeLessThanOrEqual(1)
      expect(evaluate<boolean>('document.documentElement.scrollWidth <= innerWidth')).toBe(true)
      const expected = artworkBefore.find(sample => sample.w === width && sample.path === route)!
      const actual = evaluate<{ x: number; y: number; width: number; height: number }[]>(`[...document.querySelectorAll('[data-artifact], [data-board] > article, [data-board] > figure, [data-board] > a, .photograph')].map(el => el.getBoundingClientRect().toJSON())`)
      expect(actual.length).toBe(expected.artifacts.length)
      actual.forEach((rect, index) => {
        for (const key of ['x', 'y', 'width', 'height'] as const) {
          expect(Math.abs(rect[key] - expected.artifacts[index].rect[key])).toBeLessThanOrEqual(3)
        }
      })
    }
  }, 120000)
}
test('title remains visible and stable through search, empty results and index changes', () => {
  browser('set', 'viewport', '1440', '900')
  browser('open', origin + '/blogs')
  browser('wait', '--fn', 'document.fonts.status === "loaded"')
  const before = title()
  for (const query of ['react', 'no-matching-article-xyz', '']) {
    browser('fill', '[data-archive-search]', query)
    expect(title()).toEqual(before)
    expect(evaluate<boolean>('document.activeElement.matches("[data-archive-search]")')).toBe(true)
  }
  for (const route of ['/projects', '/blogs', '/speaker', '/book', '/manhwa', '/about']) {
    browser('open', origin + route)
    browser('wait', '--fn', 'document.fonts.status === "loaded"')
    const anchor = title()
    browser('click', '[data-view-toggle]')
    expect(title()).toEqual(anchor)
    browser('click', '[data-view-toggle]')
    expect(title()).toEqual(anchor)
  }
}, 120000)

test('200% text enlargement keeps the homepage title clear of artifacts', () => {
  browser('set', 'viewport', '1440', '900')
  browser('open', origin + '/')
  const clear = evaluate<boolean>(`(async () => {
    await document.fonts.ready;
    const sizes = [...document.querySelectorAll('body *')].map(el => [el, parseFloat(getComputedStyle(el).fontSize)]);
    for (const [element, size] of sizes) element.style.setProperty('font-size', size * 2 + 'px', 'important');
    await new Promise(resolve => setTimeout(resolve, 100));
    const title = document.querySelector('h1').getBoundingClientRect();
    return [...document.querySelectorAll('[data-artifact]')].every(el => el.getBoundingClientRect().top >= title.bottom);
  })()`)
  expect(clear).toBe(true)
})

test('keyboard-scrollable code examples expose a supported accessible name', () => {
  browser('open', origin + '/blogs/state-management-in-reactjs')
  browser('wait', '.reading-code-block')
  const audit = JSON.parse(browser('a11y', '--tags', 'wcag2a,wcag2aa', '--json')) as {
    data: { incomplete: { id: string }[]; violations: { id: string }[] }
  }
  expect([...audit.data.incomplete, ...audit.data.violations].some(rule => rule.id === 'aria-prohibited-attr')).toBe(false)
})

test('search labels remain inside the desktop scrollport', () => {
  browser('set', 'viewport', '1024', '768')
  for (const route of ['/blogs', '/projects']) {
    browser('open', origin + route)
    expect(evaluate<boolean>(`(() => {
      const label = document.querySelector('.archive-search label').getBoundingClientRect();
      const main = document.querySelector('main').getBoundingClientRect();
      return label.top >= main.top && label.bottom <= main.bottom;
    })()`)).toBe(true)
  }
})

test('increased text spacing keeps desktop titles and article text separate', () => {
  browser('set', 'viewport', '1024', '768')
  for (const route of routes) {
    browser('open', origin + route)
    const errors = evaluate<string[]>(`(async () => {
      await document.fonts.ready;
      const style = document.createElement('style');
      style.textContent = '* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important } p { margin-bottom: 2em !important }';
      document.head.append(style);
      await new Promise(resolve => setTimeout(resolve, 100));
      const errors = [];
      const title = document.querySelector('h1').getBoundingClientRect();
      const blocks = [...document.querySelectorAll('[data-artifact], [data-board] > article, [data-board] > figure, [data-board] > a, .photograph')];
      for (const element of blocks) {
        const rect = element.getBoundingClientRect();
        if (rect.top < title.bottom) errors.push('artifact overlaps title');
        if (element.scrollHeight > element.clientHeight + 3) errors.push('artifact clips text');
      }
      const main = document.querySelector('main');
      if (main.scrollWidth > main.clientWidth + 1) errors.push('main horizontal overflow');
      return errors;
    })()`)
    expect({ route, errors }).toEqual({ route, errors: [] })
  }
}, 120000)

test('text spacing does not introduce horizontal page scrolling', () => {
  browser('set', 'viewport', '320', '740')
  for (const route of [...routes, '/experience', '/404', '/blogs/state-management-in-reactjs', '/projects/ts-hooks-kit']) {
    browser('open', origin + route)
    browser('wait', '--fn', 'document.fonts.status === "loaded"')
    const width = evaluate<number>(`(() => {
      const style = document.createElement('style');
      style.textContent = '* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important } p { margin-bottom: 2em !important }';
      document.head.append(style);
      return document.documentElement.scrollWidth;
    })()`)
    expect({ route, width }).toEqual({ route, width: 320 })
  }
}, 120000)
