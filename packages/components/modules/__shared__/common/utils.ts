export function formatHandle(path?: string): string | null {
  if (!path) return null
  return `@${path.replace('/', '')}`
}
