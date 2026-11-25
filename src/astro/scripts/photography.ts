import { handleImageErrors } from '@/astro/scripts/imageErrors'
import { isNativeLinkAction } from '@/astro/scripts/motion'

handleImageErrors(document.querySelector('.photography-grid')!)
const dialog = document.querySelector<HTMLDialogElement>('.photo-dialog')!
const image = dialog.querySelector<HTMLImageElement>('.photo-full')!
const preview = dialog.querySelector<HTMLImageElement>('.photo-preview')!
const frame = image.closest('.media-frame')!
const fallback = frame.querySelector<HTMLElement>('.media-unavailable')!
const caption = dialog.querySelector<HTMLElement>('#photo-caption')!
let opener: HTMLAnchorElement | undefined
let openAttempt = 0
let requestListeners: AbortController | undefined

type PhotoState = 'loading' | 'ready' | 'error'
function setPhotoState(state: PhotoState) {
  frame.classList.toggle('has-error', state === 'error')
  fallback.hidden = state !== 'error'
  image.classList.toggle('is-ready', state === 'ready')
}

document.querySelectorAll<HTMLAnchorElement>('[data-photo-open]').forEach(link => {
  link.addEventListener('click', event => {
    if (isNativeLinkAction(event, link) || typeof dialog.showModal !== 'function') return
    event.preventDefault()
    opener = link
    const thumbnail = link.querySelector('img')!
    const current = ++openAttempt
    requestListeners?.abort()
    const listeners = new AbortController()
    requestListeners = listeners
    const finish = (state: Exclude<PhotoState, 'loading'>) => {
      if (current === openAttempt) setPhotoState(state)
    }
    image.addEventListener('load', () => finish('ready'), { signal: listeners.signal })
    image.addEventListener('error', () => finish('error'), { signal: listeners.signal })

    preview.removeAttribute('src')
    const previewSource = thumbnail.currentSrc || thumbnail.src
    if (previewSource) preview.src = previewSource
    image.alt = thumbnail.alt
    image.width = thumbnail.naturalWidth || thumbnail.width
    image.height = thumbnail.naturalHeight || thumbnail.height
    setPhotoState('loading')
    image.src = link.href
    if (image.complete) {
      if (image.naturalWidth > 0) setPhotoState('ready')
      else if (image.currentSrc) setPhotoState('error')
    }
    caption.textContent = link.closest('figure')!.querySelector('figcaption p')!.textContent
    dialog.showModal()
    document.documentElement.classList.add('photo-open')
  })
})
const restore = () => {
  if (dialog.open) return
  document.documentElement.classList.remove('photo-open')
  const trigger = opener
  opener = undefined
  trigger?.focus({ preventScroll: true })
}
const close = () => { dialog.close() }
dialog.querySelector('button')!.addEventListener('click', close)
dialog.addEventListener('cancel', event => { event.preventDefault(); close() })
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return
  event.preventDefault()
  dialog.querySelector('button')!.focus()
})
dialog.addEventListener('close', () => {
  if (dialog.open) return
  requestListeners?.abort()
  requestListeners = undefined
  restore()
})
