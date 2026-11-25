export function decodeFragment(hash: string) {
  if (!hash.startsWith('#')) return ''
  try { return decodeURIComponent(hash.slice(1)) } catch { return '' }
}
