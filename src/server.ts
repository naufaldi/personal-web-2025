import { createRequestHandler } from '@react-router/node'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BUILD_DIR = path.resolve(__dirname, '../dist')
const CLIENT_DIR = path.join(BUILD_DIR, 'client')
const SERVER_DIR = path.join(BUILD_DIR, 'server')

const port = parseInt(process.env.PORT || '3000', 10)
const hostname = process.env.HOSTNAME || '0.0.0.0'

let requestHandler: ReturnType<typeof createRequestHandler> | null = null

async function getRequestHandler() {
  if (requestHandler) return requestHandler

  try {
    const serverBuildPath = path.join(SERVER_DIR, 'server.js')
    const serverBuild = await import(serverBuildPath)
    
    const build = {
      entry: {
        module: serverBuild,
      },
      routes: serverBuild.routes || {},
      assets: {
        url: '/assets',
        version: '',
      },
    }
    
    requestHandler = createRequestHandler({
      build: build as any,
      mode: process.env.NODE_ENV || 'production',
      getLoadContext() {
        return {}
      },
    })

    return requestHandler
  } catch (error) {
    console.error('Failed to load server build:', error)
    throw error
  }
}

const server = Bun.serve({
  port,
  hostname,
  async fetch(req) {
    const url = new URL(req.url)
    const pathname = url.pathname

    if (pathname.startsWith('/assets/') || pathname.startsWith('/src/') || (pathname.includes('.') && !pathname.endsWith('/'))) {
      const filePath = path.join(CLIENT_DIR, pathname.replace(/^\//, ''))
      try {
        const file = Bun.file(filePath)
        if (await file.exists()) {
          return new Response(file)
        }
      } catch (error) {
        console.error('Error serving static file:', error)
      }
    }

    try {
      const handler = await getRequestHandler()
      return handler(req)
    } catch (error) {
      console.error('Server error:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  },
})

console.log(`Server running at http://${hostname}:${port}`)
