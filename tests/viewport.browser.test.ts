import { expect, test } from 'bun:test'
const origin = process.env.MOTION_TEST_ORIGIN ?? 'http://127.0.0.1:4341'
const nojsOrigin = process.env.NOJS_TEST_ORIGIN ?? 'http://127.0.0.1:4343'
function browser(...args: string[]) {
  const result = Bun.spawnSync(['agent-browser', '--session', 'faldi-viewport', ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (result.exitCode) throw new Error(new TextDecoder().decode(result.stderr))
  return new TextDecoder().decode(result.stdout)
}
function evaluate<T>(script: string): T {
  return (JSON.parse(browser('eval', script, '--json')) as { data: { result: T } }).data.result
}
const overviewRoutes = ['/', '/about', '/projects', '/blogs', '/speaker', '/book', '/manhwa', '/photography']
for (const [width, height] of [[1440, 900], [1280, 720], [1024, 768]]) {
  test(`desktop overviews fit and retain captions at ${width}x${height}`, () => {
    browser('set', 'viewport', String(width), String(height))
    for (const path of overviewRoutes) {
      browser('open', origin + path)
      const errors = evaluate<string[]>(`(async () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await document.fonts.ready;
        const main = document.querySelector('main'); const errors = [];
        if (document.documentElement.scrollHeight > innerHeight + 1) errors.push('document scroll');
        if (main.scrollHeight > main.clientHeight + 1) errors.push('overview scroll');
        if (main.scrollWidth > main.clientWidth + 1) errors.push('horizontal scroll');
        for (const el of document.querySelectorAll('[data-board] > article, [data-board] > figure, [data-board] > a, .company-paper, .writing-copy, .personal-note, .about-intro')) {
          if (el.scrollHeight > el.clientHeight + 3) errors.push(el.className + ' content overflow');
        }
        return errors;
      })()`)
      expect({ path, errors }).toEqual({ path, errors: [] })
    }
  }, 120000)
}
test('reading scroll, section tracking, history, and hash navigation use the main region', () => {
  browser('set', 'viewport', '1440', '900')
  browser('open', origin + '/blogs/state-management-in-reactjs')
  const result = evaluate<{ body: number; main: number; active: string | null }>(`(async () => {
    const main = document.querySelector('main'); main.focus(); main.scrollTop = 1200;
    await new Promise(resolve => setTimeout(resolve, 250));
    return {body: scrollY, main: main.scrollTop, active: document.querySelector('.reading-toc [aria-current]')?.getAttribute('href')};
  })()`)
  expect(result.body).toBe(0)
  expect(result.main).toBe(1200)
  expect(result.active).toBeTruthy()
  browser('click', '.collection-header nav a[href="/about"]')
  browser('back')
  expect(evaluate<number>(`document.querySelector('main').scrollTop`)).toBeGreaterThan(1100)
  evaluate(`document.querySelector('.reading-toc a:last-child').click()`)
  expect(evaluate<number>(`document.querySelector('main').scrollTop`)).toBeGreaterThan(1200)
  evaluate(`document.querySelector('.reading-end a[href="#"]').click()`)
  expect(evaluate<number>(`document.querySelector('main').scrollTop`)).toBe(0)
  browser('press', 'PageDown')
  expect(evaluate<boolean>(`scrollY === 0`)).toBe(true)
})
test('experience route and legacy link preserve all career records', () => {
  browser('open', origin + '/about#experiences-heading')
  browser('wait', '--url', '**/experience')
  expect(evaluate<number>(`document.querySelectorAll('.career-history article').length`)).toBe(6)
  expect(evaluate<string>(`document.querySelector('.collection-header a[href="/about"]').getAttribute('aria-current')`)).toBe('location')
  browser('open', nojsOrigin + '/about#experiences-heading')
  expect(evaluate<string>(`document.getElementById('experiences-heading').getAttribute('href')`)).toBe('/experience')
})
test('compact layouts and short desktop retain accessible content', () => {
  for (const width of [834, 390, 320]) {
    browser('set', 'viewport', String(width), '740')
    browser('open', origin + '/')
    expect(evaluate<boolean>(`document.documentElement.scrollHeight > innerHeight && document.documentElement.scrollWidth <= innerWidth`)).toBe(true)
  }
  browser('set', 'viewport', '1280', '550')
  browser('open', origin + '/')
  expect(evaluate<boolean>(`document.documentElement.scrollHeight <= innerHeight + 1 && document.querySelector('main').scrollHeight > document.querySelector('main').clientHeight`)).toBe(true)
})
