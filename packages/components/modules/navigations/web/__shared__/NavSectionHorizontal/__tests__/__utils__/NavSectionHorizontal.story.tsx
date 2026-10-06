import { FC, PropsWithChildren } from 'react'

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

import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'

import NavSectionHorizontal from '../..'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/NavSectionHorizontal.cy.tsx`. This component has no
 * `*ForTesting` harness — the Cypress spec wrapped `ThemeProvider` directly, and
 * so does `Scenario`.
 *
 * `NavList` calls `usePathname()` to decide which item is active, so the active
 * scenario supplies `PathnameContext` rather than relying on
 * `history.pushState()` as the Cypress spec did — `mount()` navigates, so a
 * pushState before mounting would be discarded.
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

const navDataMock = {
  subheader: 'Main',
  items: [
    { title: 'Dashboard', path: '/dashboard', icon: <span aria-hidden="true">📊</span> },
    { title: 'Profile', path: '/profile', icon: <span aria-hidden="true">👤</span> },
    { title: 'Settings', path: '/settings', icon: <span aria-hidden="true">⚙️</span> },
  ],
}

const Scenario: FC<PropsWithChildren<{ pathname?: string }>> = ({ pathname = '/' }) => (
  <PathnameContext.Provider value={pathname}>
    <ThemeProvider {...createTheme()}>
      <NavSectionHorizontal navData={[navDataMock]} />
    </ThemeProvider>
  </PathnameContext.Provider>
)

export const Default = () => <Scenario />

/** Pathname matches the Dashboard item, so it renders in its active state. */
export const ActiveDashboard = () => <Scenario pathname="/dashboard" />
