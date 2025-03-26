'use client'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAtom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

import { DEFAULT_LOGO_KEY, DEFAULT_LOGO_SETTINGS } from './constants'
import { LogoOverrides } from './types'

const asyncStorageSync = createJSONStorage<LogoOverrides>(() => AsyncStorage)

const logosAtom = atomWithStorage<LogoOverrides>(
  DEFAULT_LOGO_KEY,
  DEFAULT_LOGO_SETTINGS,
  asyncStorageSync,
  { getOnInit: true },
)

const useLogoOverrides = () => {
  const [logos, setLogos] = useAtom(logosAtom)
  const isSSR = typeof window === typeof undefined

  const handleSetLogoOverrides = (newLogos: Partial<LogoOverrides>) => {
    setLogos(async (prev: LogoOverrides | Promise<LogoOverrides>) => {
      const prevLogos = await prev
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
