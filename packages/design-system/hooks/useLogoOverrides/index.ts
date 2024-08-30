'use client'

import { ServerSideRenderingOption, getCookie, setCookie } from '@baseapp-frontend/utils'

import { atom, useAtom } from 'jotai'

import { DEFAULT_LOGO_KEY, DEFAULT_LOGO_SETTINGS } from './constants'
import { LogoOverrides } from './types'

export const getLogoOverridesFromCookie = ({ noSSR = true }: ServerSideRenderingOption = {}) => {
  const settings = getCookie<LogoOverrides>(DEFAULT_LOGO_KEY, { noSSR }) ?? DEFAULT_LOGO_SETTINGS

  return settings
}

const initialLogos = getLogoOverridesFromCookie()

const settingsAtom = atom<LogoOverrides>(initialLogos)

/**
 * By using `useLogoOverrides` with the `noSSR` option set to `false`, causes Next.js to dynamically render the affected pages, instead of statically rendering them.
 */
const useLogoOverrides = ({ noSSR = true }: ServerSideRenderingOption = {}) => {
  const [settings, setSettings] = useAtom(settingsAtom)
  const isSSR = typeof window === typeof undefined

  const handleSetLogoOverrides = (newLogos: Partial<LogoOverrides>) => {
    setSettings((prevLogos: LogoOverrides) => {
      const updatedLogoOverrides = { ...prevLogos, ...newLogos }
      setCookie(DEFAULT_LOGO_KEY, updatedLogoOverrides)

      return updatedLogoOverrides
    })
  }

  if (isSSR) {
    return {
      settings: getLogoOverridesFromCookie({ noSSR }),
      setSettings: handleSetLogoOverrides,
    }
  }

  return {
    settings,
    setSettings: handleSetLogoOverrides,
  }
}

export default useLogoOverrides
