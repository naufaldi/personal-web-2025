export function handleImageErrors(root: ParentNode) {
  root.querySelectorAll<HTMLImageElement>('.media-frame img').forEach(image => {
    const fail = () => {
      image.closest('.media-frame')?.classList.add('has-error')
      const fallback = image.parentElement?.querySelector<HTMLElement>('.media-unavailable')
      if (fallback) fallback.hidden = false
      image.style.visibility = 'hidden'
    }
    image.addEventListener('error', fail)
    if (image.complete && image.naturalWidth === 0) fail()
  })
}
