import { useState } from 'react'

import type { ThemeProviderProps } from '@baseapp-frontend/design-system/providers/web'
import {
  type PresetType,
  type ThemeContrast,
  type ThemeLayout,
  type ThemeMode,
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  typography,
} from '@baseapp-frontend/design-system/styles/web'

import NavMiniForTesting from '../NavMiniForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/NavMini.cy.tsx`. The scenario setup that lived in the
 * Cypress spec (theme, nav data, callbacks) moves in here, because the story
 * runs in the browser while the Playwright test runs in Node.
 */
const customTheme = (mode: ThemeMode = 'light'): ThemeProviderProps => ({
  palette: createPalette(mode),
  breakpoints,
  settings: {
    themeMode: mode,
    themeContrast: 'default' as ThemeContrast,
    themeLayout: 'mini' as ThemeLayout,
    themeColorPresets: 'default' as PresetType,
    themeStretch: false,
  },
  shadows: createShadows(mode),
  customShadows: createCustomShadows(mode),
  typography,
  primaryFont: undefined,
  secondaryFont: undefined,
})

const navDataMock = [
  {
    subheader: 'Main',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <span aria-hidden="true">📊</span> },
      { title: 'Profile', path: '/profile', icon: <span aria-hidden="true">👤</span> },
      { title: 'Settings', path: '/settings', icon: <span aria-hidden="true">⚙️</span> },
    ],
  },
]

const LogoIcon = () => (
  <div role="img" aria-label="Logo">
    Logo
  </div>
)

export const Default = () => (
  <NavMiniForTesting
    ThemeTestProviderProps={{ customTheme: customTheme('light') }}
    navData={navDataMock}
    openNav={false}
    onCloseNav={() => {}}
    LogoIcon={LogoIcon}
  />
)

/**
 * Recorded-callback variant. The story owns the state, provides the callback and
 * records the observable outcome into a hidden form — the gallery pattern that
 * replaces `cy.stub()` + `have.been.calledWith`, since a spy cannot be shared
 * across the Node/browser boundary.
 */
export const RecordsCloseNav = () => {
  const [closeNavCount, setCloseNavCount] = useState(0)

  return (
    <>
      <NavMiniForTesting
        ThemeTestProviderProps={{ customTheme: customTheme('light') }}
        navData={navDataMock}
        openNav
        onCloseNav={() => setCloseNavCount((count) => count + 1)}
        LogoIcon={LogoIcon}
      />
      <form hidden>
        <input data-testid="close-nav-count" readOnly value={String(closeNavCount)} />
      </form>
    </>
  )
}
