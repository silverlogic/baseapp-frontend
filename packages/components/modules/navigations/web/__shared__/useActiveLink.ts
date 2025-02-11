import { usePathname } from 'next/navigation'

export function useActiveLink(path?: string, deep = true) {
  const pathname = usePathname()

  if (!path) {
    return false
  }

  const normalActive = pathname === path
  const deepActive = pathname.includes(path)

  return deep ? deepActive : normalActive
}
