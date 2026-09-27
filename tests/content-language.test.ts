import { expect, test } from 'bun:test'
import { readFile } from 'node:fs/promises'

test('static pages scope article languages without changing navigation language', async () => {
  for (const [path, language] of [
    ['blogs/menulis-untuk-membuat-sejarah', 'id'],
    ['blogs/reading-book', 'en'],
    ['blogs/state-management-in-reactjs', 'en'],
    ['projects/teacher-exam', 'en'],
  ]) {
    const html = await readFile(`dist/${path}/index.html`, 'utf8')
    expect(html).toContain('<html lang="en"')
    expect(html.match(/<article\b[^>]*id="reading-content"[^>]*>/)?.[0]).toContain(`lang="${language}"`)
  }
  const home = await readFile('dist/index.html', 'utf8')
  expect(home).toContain('<h2 lang="id">Menulis untuk Membuat Sejarah</h2>')
  expect(home).toMatch(/<p lang="id">Sejak zaman SMA/)
  const writing = await readFile('dist/blogs/index.html', 'utf8')
  expect(writing).toMatch(/<h2 lang="id"><a href="\/blogs\/menulis-untuk-membuat-sejarah"/)
  expect(writing).toMatch(/<h3[^>]*lang="id"[^>]*>Menulis untuk Membuat Sejarah<\/h3>/)
  const mixedArticle = await readFile('dist/blogs/state-management-in-reactjs/index.html', 'utf8')
  expect(mixedArticle).toContain('<span lang="id">code; buat para react developer')
})

test('404 offers a focusable skip destination', async () => {
  const html = await readFile('dist/404.html', 'utf8')
  expect(html).toContain('href="#not-found"')
  expect(html).toMatch(/<main[^>]*id="not-found"[^>]*tabindex="-1"/)
})
