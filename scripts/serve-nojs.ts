// Local verification fixture: serve the production build with all scripts blocked.
const root = new URL('../dist/', import.meta.url).pathname
Bun.serve({
  hostname: '127.0.0.1', port: Number(process.env.NOJS_TEST_PORT ?? 4343),
  async fetch(request) {
    const path = decodeURIComponent(new URL(request.url).pathname)
    if (path.includes('..')) return new Response('', { status: 400 })
    const relative = path.endsWith('/') ? `${path}index.html` : path.includes('.') ? path : `${path}/index.html`
    const file = Bun.file(root + relative)
    const exists = await file.exists()
    return new Response(exists ? file : Bun.file(root + '404.html'), {
      status: exists ? 200 : 404,
      headers: { 'Content-Security-Policy': "script-src 'none'" },
    })
  },
})
