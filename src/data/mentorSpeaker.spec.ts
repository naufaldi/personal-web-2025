import { describe, expect, test } from 'bun:test'
import { mentorSpeakerEngagements } from '@/data/mentorSpeaker'

describe('community chronology', () => {
  test('shows the latest Luma events first', () => {
    expect(mentorSpeakerEngagements.slice(0, 4).map(entry => entry.id)).toEqual([
      'luma-devday-exchange', 'luma-astraflow', 'luma-grok', 'luma-astra',
    ])
    expect(mentorSpeakerEngagements.find(entry => entry.id === 'luma-grok')?.date).toBe('4 October 2026')
  })

  test('interleaves older events and engagements by their latest known date', () => {
    const ids = new Set(['13', '14', 'luma-cursor-jan', '15', '1', '6', '3'])
    expect(mentorSpeakerEngagements.filter(entry => ids.has(entry.id)).map(entry => entry.id)).toEqual([
      '13', 'luma-cursor-jan', '14', '15', '1', '6', '3',
    ])
  })

  test('keeps undated ongoing entries at the end in their existing order', () => {
    expect(mentorSpeakerEngagements.slice(-2).map(entry => entry.id)).toEqual(['11', '18'])
    expect(new Set(mentorSpeakerEngagements.map(entry => entry.id)).size).toBe(mentorSpeakerEngagements.length)
  })
})
