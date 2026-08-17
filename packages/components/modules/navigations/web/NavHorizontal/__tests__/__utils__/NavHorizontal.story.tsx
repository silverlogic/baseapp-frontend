import { FC, useState } from 'react'

import {
  ThemeProvider,
  type ThemeProviderProps,
} from '@baseapp-frontend/design-system/providers/web'
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

import NavHorizontal from '../..'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/NavHorizontal.cy.tsx`. No `*ForTesting` harness exists —
 * the Cypress spec wrapped `ThemeProvider` directly, and so do these.
 *
 * Its third test mounted the same scenario twice, once per theme mode, so the
 * mode becomes a separate story rather than a second mount.
 */
const createTheme = (mode: ThemeMode = 'light') =>
  ({
    palette: createPalette(mode),
    breakpoints,
    settings: {
      themeMode: mode,
      themeContrast: 'default' as ThemeContrast,
      themeLayout: 'horizontal' as ThemeLayout,
      themeColorPresets: 'default' as PresetType,
      themeStretch: false,
    },
    shadows: createShadows(mode),
    customShadows: createCustomShadows(mode),
    typography,
    primaryFont: undefined,
    secondaryFont: undefined,
  }) as ThemeProviderProps

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

const Closed: FC<{ mode: ThemeMode }> = ({ mode }) => (
  <ThemeProvider {...createTheme(mode)}>
    <NavHorizontal navData={navDataMock} openNav={false} onCloseNav={() => {}} />
  </ThemeProvider>
)

/** Desktop/tablet bar, light theme. */
export const ClosedLight = () => <Closed mode="light" />

/** Same scenario in dark mode, for the theme-adaptation test. */
export const ClosedDark = () => <Closed mode="dark" />

/**
 * Drawer open, recording every `onCloseNav` call into a hidden form — replacing
 * the Cypress spec's `cy.stub().as('onCloseNav')`.
 */
export const Open = () => {
  const [closeNavCount, setCloseNavCount] = useState(0)

  return (
    <>
      <ThemeProvider {...createTheme()}>
        <NavHorizontal
          navData={navDataMock}
          openNav
          onCloseNav={() => setCloseNavCount((count) => count + 1)}
        />
      </ThemeProvider>
      <form hidden>
        <input data-testid="close-nav-count" readOnly value={String(closeNavCount)} />
      </form>
    </>
  )
}
