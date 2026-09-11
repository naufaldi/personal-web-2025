import { buildSeoRoutes } from './seo-data'
import { mkdir } from 'node:fs/promises'
const origin = process.env.MOTION_TEST_ORIGIN ?? 'http://127.0.0.1:4341'
const output = 'docs/verification/interaction-audit.json'
const { routes, shorts } = await buildSeoRoutes()
function browser(...args: string[]) {
  const proc = Bun.spawnSync(['agent-browser', '--session', 'faldi-site-audit', ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (proc.exitCode) throw new Error(new TextDecoder().decode(proc.stderr))
  return new TextDecoder().decode(proc.stdout)
}
function evaluate<T>(code: string): T {
  return (JSON.parse(browser('eval', code, '--json')) as {data:{result:T}}).data.result
}
const results: unknown[] = []
let failures = 0
await mkdir('docs/verification', { recursive: true })
for (const [width,height] of [[1487,1058],[390,844]]) {
  browser('set','viewport',String(width),String(height))
  for (const route of routes) {
    browser('open',origin+route.path)
    const result=evaluate<{overflow:boolean;title:string;main:boolean;canonical:string;broken:string[]}>(`(async()=>{
      await document.fonts.ready;
      document.querySelectorAll('img').forEach(i=>i.loading='eager');
      await Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,1500))]);
      return {overflow:document.documentElement.scrollWidth>innerWidth+1,title:document.title,main:!!document.querySelector('main'),canonical:document.querySelector('link[rel="canonical"]')?.href,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)};
    })()`)
    const status = (await fetch(origin + route.path)).status
    const passed = status === 200 && !result.overflow && result.main && result.title === route.title && result.canonical === route.canonicalUrl && result.broken.length === 0
    if (!passed) failures++
    results.push({path:route.path,width,height,status,passed,...result})
    await Bun.write(output,JSON.stringify({origin,generated:new Date().toISOString(),results},null,2))
    console.log(`${width} ${route.path} ${result.overflow?'OVERFLOW':'ok'} ${result.broken.length?'BROKEN IMAGE':''}`)
  }
}
for (const path of ['/definitely-not-a-page','/shorts', ...shorts.map(short => `/shorts/${short.slug}`)]) {
  const response=await fetch(origin+path)
  const notFound = response.status === 404 && (await response.text()).includes('404')
  if (!notFound) failures++
  results.push({path,status:response.status,notFound})
}
await Bun.write(output,JSON.stringify({origin,generated:new Date().toISOString(),results},null,2))
browser('close')

process.exitCode = failures ? 1 : 0
