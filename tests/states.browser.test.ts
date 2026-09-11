import { expect, test } from 'bun:test'
function browser(...args: string[]) {
  const result = Bun.spawnSync(['agent-browser', '--session', 'faldi-state-tests', ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (result.exitCode) throw new Error(new TextDecoder().decode(result.stderr))
  return new TextDecoder().decode(result.stdout)
}
function evaluate<T>(script: string): T {
  return JSON.parse(browser('eval', script, '--json')).data.result as T
}
const origin = 'http://127.0.0.1:4341'
test('Community offers its matching index instead of a blank board', () => {
  browser('open', `${origin}/speaker`)
  expect(evaluate<boolean>(`(() => {
    document.querySelector('[data-editorial-filter="Community"]').click();
    const state = document.querySelector('[data-empty]');
    if (state.hidden || !state.textContent.includes('More in the index')) return false;
    state.querySelector('[data-open-index]').click();
    return state.hidden && !document.querySelector('[data-directory]').hidden && [...document.querySelectorAll('[data-record]')].some(r => !r.hidden);
  })()`)).toBe(true)
}, 15000)
test('empty search resets query, filters and focus on narrow layouts', () => {
  for (const route of ['projects', 'blogs']) {
    browser('set', 'viewport', '320', '740')
    browser('open', `${origin}/${route}`)
    expect(evaluate<boolean>(`(() => {
      const search = document.querySelector('[data-archive-search]');
      search.value = 'zzzz-no-matching-entry'; search.dispatchEvent(new Event('input'));
      const state = document.querySelector('[data-empty]');
      if (state.hidden || !state.querySelector('[data-open-index]').hidden) return false;
      state.querySelector('[data-editorial-reset]').click();
      return state.hidden && search.value === '' && document.activeElement === search && document.documentElement.scrollWidth <= innerWidth;
    })()`)).toBe(true)
  }
}, 15000)
test('unknown route and image failures retain readable recovery content', () => {
  browser('open', `${origin}/not-a-real-page`)
  expect(evaluate<string>('document.querySelector("h1").textContent')).toBe('Lost page.')
  browser('open', `${origin}/speaker`)
  expect(evaluate<boolean>(`(() => {
    const image = document.querySelector('.media-frame img'); image.dispatchEvent(new Event('error'));
    const fallback = image.closest('.media-frame').querySelector('.media-unavailable');
    return !fallback.hidden && fallback.textContent.includes('Image unavailable') && getComputedStyle(fallback).backgroundImage.includes('unavailable.webp');
  })()`)).toBe(true)
}, 15000)
