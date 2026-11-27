import { afterAll, expect, test } from 'bun:test'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

const origin = process.env.PROJECTS_INDEX_TEST_ORIGIN ?? process.env.MOTION_TEST_ORIGIN ?? 'http://127.0.0.1:4341'
const browserCommand = () => {
  const command = Bun.which('agent-browser') ?? 'agent-browser'
  if (process.platform === 'win32' && command.endsWith('.cmd')) {
    const binary = join(dirname(command), 'node_modules', 'agent-browser', 'bin', 'agent-browser-win32-x64.exe')
    if (existsSync(binary)) return binary
  }
  return command
}

function browser(...args: string[]) {
  const result = Bun.spawnSync([browserCommand(), '--session', 'faldi-projects-index-geometry', ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (result.exitCode) throw new Error(new TextDecoder().decode(result.stderr))
  return new TextDecoder().decode(result.stdout)
}

function evaluate<T>(script: string): T {
  return (JSON.parse(browser('eval', script, '--json')) as { data: { result: T } }).data.result
}

afterAll(() => {
  browser('close')
})

interface Geometry {
  visible: boolean
  boardHidden: boolean
  columns: string
  trackWidths: number[]
  teacherTitleWidth: number
  teacherTitleHeight: number
  teacherLineCount: number
  teacherSummaryHeight: number
  teacherTitleClearance: number
  coverlessCategoryDelta: number
  coverlessTitleDelta: number
  horizontalOverflow: boolean
}

const measureGeometry = `(async () => {
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
  await document.fonts.ready
  await pause(350)
  document.getAnimations().forEach(animation => { try { animation.finish() } catch {} })
  await pause(0)
  const directory = document.querySelector('.project-index')
  const board = document.querySelector('[data-board]')
  const teacher = document.querySelector('#teacher-exam')
  if (!directory || !teacher) return { error: 'missing project index or teacher-exam row' }
  const summary = teacher.querySelector('summary')
  const title = summary.querySelector('.index-title')
  const summaryStyle = getComputedStyle(summary)
  const summaryRect = summary.getBoundingClientRect()
  const titleRect = title.getBoundingClientRect()
  const range = document.createRange()
  range.selectNodeContents(title)
  const lineTops = new Set()
  for (const rect of range.getClientRects()) {
    if (rect.width > 0 && rect.height > 0) lineTops.add(Math.round(rect.top))
  }
  const xInSummary = (record, selector) => {
    const item = record.querySelector(selector)
    if (!item) return null
    return item.getBoundingClientRect().left - record.querySelector('summary').getBoundingClientRect().left
  }
  const coverlessRow = [...document.querySelectorAll('.project-index [data-record]')]
    .find(record => record !== teacher && !record.hidden && record.querySelector('.index-cover'))
  if (!coverlessRow) return { error: 'missing covered comparison row' }
  const coveredCategoryX = xInSummary(coverlessRow, '.index-category, summary > span:not(.index-cover):not(.index-title)')
  const coveredTitleX = xInSummary(coverlessRow, '.index-title')
  coverlessRow.querySelector('.index-cover').remove()
  void coverlessRow.offsetWidth
  const coverlessCategoryX = xInSummary(coverlessRow, '.index-category, summary > span:not(.index-cover):not(.index-title)')
  const coverlessTitleX = xInSummary(coverlessRow, '.index-title')
  return {
    visible: !directory.hidden && directory.getBoundingClientRect().width > 0,
    boardHidden: Boolean(board && board.hidden),
    columns: summaryStyle.gridTemplateColumns,
    trackWidths: (summaryStyle.gridTemplateColumns.match(/[\\d.]+px/g) || []).map(Number.parseFloat),
    teacherTitleWidth: titleRect.width,
    teacherTitleHeight: titleRect.height,
    teacherLineCount: lineTops.size,
    teacherSummaryHeight: summaryRect.height,
    teacherTitleClearance: summaryRect.right - titleRect.right,
    coverlessCategoryDelta: coverlessCategoryX - coveredCategoryX,
    coverlessTitleDelta: coverlessTitleX - coveredTitleX,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
  }
})()`

function nearly(value: number, expected: number, tolerance = 1.5) {
  return Math.abs(value - expected) <= tolerance
}

function geometryErrors(width: number, geometry: Geometry) {
  const errors: string[] = []
  const compact = width < 768
  const expectedTracks = compact ? 3 : 4
  if (!geometry.visible) errors.push('index is not visible')
  if (!geometry.boardHidden) errors.push('board is not hidden')
  if (geometry.horizontalOverflow) errors.push('horizontal overflow')
  if (geometry.trackWidths.length !== expectedTracks) errors.push(`expected ${expectedTracks} columns, got ${geometry.trackWidths.length}: ${geometry.columns}`)
  if (compact) {
    if (!nearly(geometry.trackWidths[0], 76)) errors.push(`compact cover track ${geometry.trackWidths[0]}`)
    if (!nearly(geometry.trackWidths[2], 24)) errors.push(`compact disclosure track ${geometry.trackWidths[2]}`)
    if (!(geometry.trackWidths[1] > 140)) errors.push(`compact title/category track ${geometry.trackWidths[1]}`)
    if (!(geometry.teacherTitleWidth > 140)) errors.push(`compact teacher title width ${geometry.teacherTitleWidth}`)
    if (!(geometry.teacherLineCount >= 1 && geometry.teacherLineCount <= 6)) errors.push(`compact teacher line count ${geometry.teacherLineCount}`)
    if (!(geometry.teacherSummaryHeight < 180)) errors.push(`compact teacher summary height ${geometry.teacherSummaryHeight}`)
  } else {
    if (!nearly(geometry.trackWidths[0], 120)) errors.push(`desktop cover track ${geometry.trackWidths[0]}`)
    if (!nearly(geometry.trackWidths[1], 160)) errors.push(`desktop category track ${geometry.trackWidths[1]}`)
    if (!nearly(geometry.trackWidths[3], 24)) errors.push(`desktop disclosure track ${geometry.trackWidths[3]}`)
    if (!(geometry.trackWidths[2] > 500)) errors.push(`desktop title track ${geometry.trackWidths[2]}`)
    if (!(geometry.teacherTitleWidth > 500)) errors.push(`desktop teacher title width ${geometry.teacherTitleWidth}`)
    if (!(geometry.teacherLineCount >= 1 && geometry.teacherLineCount <= 4)) errors.push(`desktop teacher line count ${geometry.teacherLineCount}`)
    if (!(geometry.teacherSummaryHeight < 180)) errors.push(`desktop teacher summary height ${geometry.teacherSummaryHeight}`)
    if (!(geometry.teacherTitleClearance > 24)) errors.push(`desktop title/disclosure clearance ${geometry.teacherTitleClearance}`)
  }
  if (!(Math.abs(geometry.coverlessCategoryDelta) < 1)) errors.push(`coverless category shifted by ${geometry.coverlessCategoryDelta}`)
  if (!(Math.abs(geometry.coverlessTitleDelta) < 1)) errors.push(`coverless title shifted by ${geometry.coverlessTitleDelta}`)
  return errors
}

for (const [width, height] of [[1440, 900], [390, 844]]) {
  for (const mode of ['direct', 'toggle'] as const) {
    test(`projects index geometry ${mode} ${width}`, () => {
      browser('set', 'viewport', String(width), String(height))
      browser('open', `${origin}/projects${mode === 'direct' ? '?view=index' : ''}`)
      if (mode === 'toggle') browser('click', '[data-view-toggle]')
      const geometry = evaluate<Geometry>(measureGeometry)
      const errors = geometryErrors(width, geometry)
      if (errors.length) throw new Error(`${mode} ${width} geometry failures: ${errors.join('; ')}\n${JSON.stringify(geometry, null, 2)}`)
      expect(errors).toEqual([])
    }, 120000)
  }
}
