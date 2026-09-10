import { copyFile, writeFile } from 'node:fs/promises'
import { buildSeoRoutes } from './seo-data'

const { routes } = await buildSeoRoutes()
const publicRoutes = routes.filter(route => route.path !== '/' && !route.noindex)
await Promise.all(publicRoutes.map(route => copyFile(`dist${route.path}/index.html`, `dist${route.path}.html`)))
const redirects = publicRoutes.map(route => `${route.path}.html ${route.path} 301`).join('\n')
await writeFile('dist/_redirects', `/index.html / 301\n${redirects}\n/* /404.html 404\n`)
console.log(`Preserved ${publicRoutes.length} HTML aliases and static 404 handling.`)
