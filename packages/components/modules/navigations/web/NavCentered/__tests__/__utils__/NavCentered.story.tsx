import { useState } from 'react'

import type { ThemeProviderProps } from '@baseapp-frontend/design-system/providers/web'
import {
  type ThemeMode,
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  typography,
} from '@baseapp-frontend/design-system/styles/web'

import NavCenteredForTesting from '../NavCenteredForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/NavCentered.cy.tsx`. Its three tests cover two
 * scenarios — the drawer open (asserted at both mobile and tablet viewports) and
 * closed on desktop — so they map to two stories, with the viewport set by the
 * spec rather than the story.
 */
const defaultTheme = {
  palette: createPalette('light'),
  breakpoints,
  settings: {
    themeMode: 'light' as ThemeMode,
    themeContrast: 'default',
    themeLayout: 'centered',
    themeColorPresets: 'default',
    themeStretch: false,
  },
  shadows: createShadows('light'),
  customShadows: createCustomShadows('light'),
  typography,
  primaryFont: undefined,
  secondaryFont: undefined,
} as ThemeProviderProps

const navDataMock = [
  {
    subheader: 'Main',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <span aria-hidden="true">📊</span> },
      { title: 'Profile', path: '/profile', icon: <span aria-hidden="true">👤</span> },
      { title: 'Settings', path: '/settings', icon: <span aria-hidden="true">⚙️</span> },
      { title: 'Analytics', path: '/analytics', icon: <span aria-hidden="true">📈</span> },
      { title: 'Reports', path: '/reports', icon: <span aria-hidden="true">📑</span> },
    ],
  },
]

/** Desktop scenario: no drawer, the centered horizontal bar renders instead. */
export const Closed = () => (
  <NavCenteredForTesting
    navData={navDataMock}
    openNav={false}
    onCloseNav={() => {}}
    ThemeTestProviderProps={{ customTheme: defaultTheme }}
  />
)

/**
 * Drawer open, recording every `onCloseNav` call into a hidden form — replacing
 * the Cypress spec's `cy.stub().as('onCloseNav')`.
 */
export const Open = () => {
  const [closeNavCount, setCloseNavCount] = useState(0)

  return (
    <>
      <NavCenteredForTesting
        navData={navDataMock}
        openNav
        onCloseNav={() => setCloseNavCount((count) => count + 1)}
        ThemeTestProviderProps={{ customTheme: defaultTheme }}
      />
      <form hidden>
        <input data-testid="close-nav-count" readOnly value={String(closeNavCount)} />
      </form>
    </>
  )
}
