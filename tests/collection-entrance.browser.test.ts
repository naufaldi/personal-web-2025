import { expect, test } from 'bun:test'

const origin = process.env.MOTION_TEST_ORIGIN ?? 'http://127.0.0.1:4341'
function browser(...args: string[]) {
  const result = Bun.spawnSync(['agent-browser', '--session', 'faldi-entrance-tests', ...args])
  if (result.exitCode) throw new Error(result.stderr.toString())
  return result.stdout.toString().trim()
}
function evaluate<T>(script: string): T {
  return (JSON.parse(browser('eval', script, '--json')) as { data: { result: T } }).data.result
}
interface Entrance {
  target: string
  frames: { opacity: number; transform: string }[]
  options: { duration: number; delay: number; easing: string }
}

test('real collection navigation preserves C and excludes keyboard, history, hashes and reduced motion', async () => {
  browser('set', 'media', 'light')
  browser('set', 'viewport', '1440', '900')
  const url = `${origin}/?entrance-regression`
  browser('open', url)
  const socket = new WebSocket(browser('get', 'cdp-url'))
  await new Promise<void>(resolve => { socket.onopen = () => resolve() })
  let id = 0
  const pending = new Map<number, (value: unknown) => void>()
  socket.onmessage = event => {
    const message = JSON.parse(String(event.data)) as { id: number; result: unknown }
    pending.get(message.id)?.(message.result)
    pending.delete(message.id)
  }
  function send<T>(method: string, params: object = {}, sessionId?: string): Promise<T> {
    return new Promise(resolve => {
      pending.set(++id, value => resolve(value as T))
      socket.send(JSON.stringify({ id, method, params, sessionId }))
    })
  }
  const { targetInfos } = await send<{ targetInfos: { type: string; url: string; targetId: string }[] }>('Target.getTargets')
  const target = targetInfos.find(target => target.type === 'page' && target.url === url)!
  const { sessionId } = await send<{ sessionId: string }>('Target.attachToTarget', { targetId: target.targetId, flatten: true })
  await send('Page.enable', {}, sessionId)
  const { identifier } = await send<{ identifier: string }>('Page.addScriptToEvaluateOnNewDocument', {
    source: `window.__entrances=[];window.__handoff=null;
      addEventListener('pagereveal',event=>{event.viewTransition?.ready.then(()=>{
        const animations=document.getAnimations();
        window.__native=animations.filter(a=>a.animationName==='page-in'||a.animationName==='page-out').map(a=>({name:a.animationName,duration:a.effect.getTiming().duration,delay:a.effect.getTiming().delay,frames:a.effect.getKeyframes().map(f=>({opacity:f.opacity,transform:f.transform}))}));
        if(document.documentElement.dataset.collectionArrival!=='pointer')return;
        window.__handoff={prepared:document.documentElement.hasAttribute('data-collection-pending')||animations.filter(a=>a.playState==='paused').length>1,
          firstOpacity:getComputedStyle(document.querySelector('.collection-title, [data-board] > h1, .photography-title')).opacity,
          incomingOpacity:getComputedStyle(document.documentElement,'::view-transition-new(root)').opacity,
          outgoing:animations.some(a=>a.animationName==='page-out'),
          exit:animations.find(a=>a.animationName==='page-out')?.effect.getKeyframes().map(f=>({opacity:f.opacity,transform:f.transform})),
          exitDuration:animations.find(a=>a.animationName==='page-out')?.effect.getTiming().duration};
      }).catch(()=>{})});const original=Element.prototype.animate;
      Element.prototype.animate=function(frames,options){window.__entrances.push({target:[...document.querySelectorAll("*")].indexOf(this).toString(),frames,options});return original.call(this,frames,options)};
      addEventListener('pageshow',event=>{if(event.persisted)window.__entrances=[]});`,
  }, sessionId)
  const entrances = () => evaluate<Entrance[]>(`new Promise(resolve=>setTimeout(()=>resolve(window.__entrances),1150))`)
  const assertC = (items: Entrance[]) => {
    expect(items.length).toBeGreaterThan(1)
    expect(new Set(items.map(item => item.target)).size).toBe(items.length)
    items.forEach((item, index) => {
      expect(item.frames).toEqual([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }])
      expect(item.options.duration).toBe(380)
      expect(item.options.delay).toBe(index * 55)
      expect(item.options.easing).toBe('cubic-bezier(0.23, 1, 0.32, 1)')
    })
  }
  try {
    browser('reload')
    assertC(entrances())
    for (const route of ['/projects', '/about', '/blogs', '/speaker', '/book', '/manhwa', '/photography']) {
      browser('click', `.collection-header nav a[href="${route}"]`)
      assertC(entrances())
      const handoff = evaluate<{ prepared: boolean; firstOpacity: string; incomingOpacity: string; outgoing: boolean; exit: { opacity: string; transform: string }[]; exitDuration: number }>('window.__handoff')
      expect(handoff.prepared).toBe(true)
      expect(handoff.firstOpacity).toBe('0')
      expect(handoff.incomingOpacity).toBe('0')
      expect(handoff.outgoing).toBe(true)
      expect(handoff.exitDuration).toBe(220)
      expect(handoff.exit).toEqual([{ opacity: '1', transform: 'scale(1)' }, { opacity: '0', transform: 'scale(0.96)' }])
      expect(evaluate<number>('document.getAnimations().length')).toBe(0)
    }
    browser('back')
    expect(entrances()).toEqual([])
    browser('focus', '.collection-header nav a[href="/about"]')
    browser('press', 'Enter')
    expect(entrances()).toEqual([])
    browser('click', '#experiences-heading')
    expect(entrances()).toEqual([])
    const native = evaluate<{name: string; duration: number; delay: number; frames: {opacity: string; transform: string}[]}[]>('window.__native')
    expect(native.find(animation => animation.name === 'page-out')?.duration).toBe(220)
    expect(native.find(animation => animation.name === 'page-in')).toEqual({
      name: 'page-in', duration: 380, delay: 220,
      frames: [{opacity: '0', transform: 'scale(0.96)'}, {opacity: '1', transform: 'scale(1)'}],
    })
    browser('set', 'media', 'light', 'reduced-motion')
    browser('click', '.collection-header nav a[href="/projects"]')
    expect(entrances()).toEqual([])
    browser('set', 'media', 'light')
    browser('open', `${origin}/book#index`)
    expect(entrances()).toEqual([])
  } finally {
    await send('Page.removeScriptToEvaluateOnNewDocument', { identifier }, sessionId)
    socket.close()
  }
}, 30000)
