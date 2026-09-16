import { handleImageErrors } from '@/astro/scripts/imageErrors'
import { isNativeLinkAction } from '@/astro/scripts/motion'

handleImageErrors(document.querySelector('.photography-grid')!)
const dialog = document.querySelector<HTMLDialogElement>('.photo-dialog')!
const image = dialog.querySelector<HTMLImageElement>('img')!
const frame = image.closest('.media-frame')!
const fallback = frame.querySelector<HTMLElement>('.media-unavailable')!
const caption = dialog.querySelector<HTMLElement>('#photo-caption')!
let opener: HTMLAnchorElement | undefined
image.addEventListener('error', () => {
  frame.classList.add('has-error')
  fallback.hidden = false
  image.style.visibility = 'hidden'
})
document.querySelectorAll<HTMLAnchorElement>('[data-photo-open]').forEach(link => {
  link.addEventListener('click', event => {
    if (isNativeLinkAction(event, link) || typeof dialog.showModal !== 'function') return
    event.preventDefault()
    opener = link
    const thumbnail = link.querySelector('img')!
    frame.classList.remove('has-error')
    fallback.hidden = true
    image.style.visibility = ''
    image.alt = thumbnail.alt
    image.width = thumbnail.naturalWidth || thumbnail.width
    image.height = thumbnail.naturalHeight || thumbnail.height
    image.src = link.href
    caption.textContent = link.closest('figure')!.querySelector('figcaption p')!.textContent
    dialog.showModal()
    document.documentElement.classList.add('photo-open')
  })
})
const restore = () => {
  if (dialog.open) return
  document.documentElement.classList.remove('photo-open')
  opener?.focus({ preventScroll: true })
}
const close = () => { dialog.close(); restore() }
dialog.querySelector('button')!.addEventListener('click', close)
dialog.addEventListener('cancel', event => { event.preventDefault(); close() })
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return
  event.preventDefault()
  dialog.querySelector('button')!.focus()
})
dialog.addEventListener('close', restore)
