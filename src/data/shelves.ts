import { readBooks, currentlyReadingBooks, wishlistBooks } from '@/data/books'
import { currentlyReadingManhwa, wishlistManhwa, recommendedManhwa } from '@/data/manhwa'
import { categoryLabels, type ArchiveEntry } from '@/data/archive'
import clean from '@/assets/shelves/book-clean.jpg'
import pragmatic from '@/assets/shelves/book-pragmatic.jpg'
import ddia from '@/assets/shelves/book-ddia.jpg'
import solo from '@/assets/shelves/manhwa-solo.jpg'
import eleceed from '@/assets/shelves/manhwa-eleceed.jpg'
import tower from '@/assets/shelves/manhwa-tower.jpg'
import boxer from '@/assets/shelves/manhwa-boxer.jpg'

const bookCovers = new Map([['1', clean], ['2', pragmatic], ['3', ddia]])
export const bookEntries: ArchiveEntry[] = [...readBooks, ...currentlyReadingBooks, ...wishlistBooks].map(book => ({
  id: `book-${book.id}`, title: book.title, meta: book.author,
  categories: [categoryLabels[book.category], ...(book.recommended ? ['Recommended'] : [])],
  image: bookCovers.get(book.id),
}))

const manhwaCovers = new Map([['Solo Leveling', solo], ['Eleceed', eleceed], ['Tower of God', tower], ['The Boxer', boxer]])
const byTitle = new Map<string, ArchiveEntry>()
for (const item of [...currentlyReadingManhwa, ...wishlistManhwa, ...recommendedManhwa]) {
  const category = categoryLabels[item.category]
  const existing = byTitle.get(item.title)
  if (existing) {
    if (!existing.categories.includes(category)) existing.categories.push(category)
  } else {
    byTitle.set(item.title, {
      id: `manhwa-${item.id}`, title: item.title, meta: item.author,
      categories: [category], image: manhwaCovers.get(item.title),
      tags: [item.genre, item.status ? `Listed publication status: ${item.status}` : undefined].filter((value): value is string => Boolean(value)),
    })
  }
}
export const manhwaEntries = [...byTitle.values()]
export function selectEntries(entries: ArchiveEntry[], ids: string[]): ArchiveEntry[] {
  return ids.map(id => {
    const entry = entries.find(entry => entry.id === id)
    if (!entry) throw new Error(`Missing archive entry: ${id}`)
    return entry
  })
}
