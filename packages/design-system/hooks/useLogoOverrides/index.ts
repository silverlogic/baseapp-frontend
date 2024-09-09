'use client'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage'

import { DEFAULT_LOGO_KEY, DEFAULT_LOGO_SETTINGS } from './constants'
import { LogoOverrides } from './types'

const localStorageSync: SyncStorage<LogoOverrides> = {
  getItem: (key: string) => {
    if (typeof window !== typeof undefined) {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }
    return null
  },
  setItem: (key: string, value: LogoOverrides) => {
    if (typeof window !== typeof undefined) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== typeof undefined) {
      localStorage.removeItem(key)
    }
  },
}

const logosAtom = atomWithStorage<LogoOverrides>(
  DEFAULT_LOGO_KEY,
  DEFAULT_LOGO_SETTINGS,
  localStorageSync,
  { getOnInit: true },
)

const useLogoOverrides = () => {
  const [logos, setLogos] = useAtom(logosAtom)
  const isSSR = typeof window === typeof undefined

  const handleSetLogoOverrides = (newLogos: Partial<LogoOverrides>) => {
    setLogos((prevLogos: LogoOverrides) => {
      const updatedLogoOverrides = { ...prevLogos, ...newLogos }
      return updatedLogoOverrides
    })
  }

  if (isSSR) {
    // SSR fallback, return default settings if in a server-side context
    return {
      logos: DEFAULT_LOGO_SETTINGS,
      setLogos: handleSetLogoOverrides,
    }
  }

  return {
    logos,
    setLogos: handleSetLogoOverrides,
  }
}

export default useLogoOverrides
