import { createRequestListener } from '@react-router/node'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BUILD_DIR = path.resolve(__dirname, '../dist')
const CLIENT_DIR = path.join(BUILD_DIR, 'client')
const SERVER_DIR = path.join(BUILD_DIR, 'server')

const port = parseInt(process.env.PORT || '3000', 10)
const hostname = process.env.HOSTNAME || '0.0.0.0'

let requestListener: ReturnType<typeof createRequestListener> | null = null

async function getRequestListener() {
  if (requestListener) return requestListener

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
    
    requestListener = createRequestListener({
      build: build as any,
      mode: process.env.NODE_ENV || 'production',
      getLoadContext() {
        return {}
      },
    })

    return requestListener
  } catch (error) {
    console.error('Failed to load server build:', error)
    throw error
  }
}

function bunRequestToNodeRequest(bunReq: Request): { req: any; res: any } {
  const req = {
    method: bunReq.method,
    url: bunReq.url,
    headers: Object.fromEntries(bunReq.headers.entries()),
    body: bunReq.body,
    [Symbol.asyncIterator]: async function* () {
      if (bunReq.body) {
        const reader = bunReq.body.getReader()
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            yield value
          }
        } finally {
          reader.releaseLock()
        }
      }
    },
  } as any

  const chunks: Uint8Array[] = []
  const res = {
    statusCode: 200,
    statusMessage: 'OK',
    headers: {} as Record<string, string | string[]>,
    setHeader(name: string, value: string | string[]) {
      this.headers[name.toLowerCase()] = value
    },
    getHeader(name: string) {
      return this.headers[name.toLowerCase()]
    },
    write(chunk: Uint8Array) {
      chunks.push(chunk)
      return true
    },
    end(chunk?: Uint8Array) {
      if (chunk) chunks.push(chunk)
    },
    writeHead(statusCode: number, statusMessage?: string, headers?: Record<string, string | string[]>) {
      this.statusCode = statusCode
      if (statusMessage) this.statusMessage = statusMessage
      if (headers) {
        Object.assign(this.headers, headers)
      }
    },
  } as any

  return { req, res }
}

async function handleRequestWithListener(bunReq: Request): Promise<Response> {
  const listener = await getRequestListener()
  const { req, res } = bunRequestToNodeRequest(bunReq)
  
  return new Promise((resolve) => {
    listener!(req, res)
    
    const headers = new Headers()
    Object.entries(res.headers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v))
      } else {
        headers.set(key, String(value))
      }
    })

    const body = new ReadableStream({
      start(controller) {
        res.chunks?.forEach((chunk: Uint8Array) => {
          controller.enqueue(chunk)
        })
        controller.close()
      },
    })

    resolve(new Response(body, {
      status: res.statusCode,
      statusText: res.statusMessage,
      headers,
    }))
  })
}

Bun.serve({
  port,
  hostname,
  async fetch(req: Request) {
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
      return await handleRequestWithListener(req)
    } catch (error) {
      console.error('Server error:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  },
})

console.log(`Server running at http://${hostname}:${port}`)
