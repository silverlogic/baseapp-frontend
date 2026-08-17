import { useState } from 'react'

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

import VerticalDrawer from '../..'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/VerticalDrawer.cy.tsx`. No `*ForTesting` harness exists
 * for this component — the Cypress spec wrapped `ThemeProvider` directly.
 *
 * The drawer renders through a MUI Portal, so its content lands outside `#root`.
 * The recorder form below stays inside `#root`, which is fine: `getByTestId` is
 * attribute-based, so the `aria-hidden` MUI applies to the page behind an open
 * drawer does not hide it from the test.
 */
const createTheme = (mode: ThemeMode = 'light') =>
  ({
    palette: createPalette(mode),
    breakpoints,
    settings: {
      themeMode: mode,
      themeContrast: 'default' as ThemeContrast,
      themeLayout: 'vertical' as ThemeLayout,
      themeColorPresets: 'default' as PresetType,
      themeStretch: false,
    },
    shadows: createShadows(mode),
    customShadows: createCustomShadows(mode),
    typography,
    primaryFont: undefined,
    secondaryFont: undefined,
  }) as ThemeProviderProps

/** Three named items plus ten generated ones, so the drawer content overflows. */
const navDataMock = [
  {
    subheader: 'Main',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <span aria-hidden="true">📊</span> },
      { title: 'Profile', path: '/profile', icon: <span aria-hidden="true">👤</span> },
      { title: 'Settings', path: '/settings', icon: <span aria-hidden="true">⚙️</span> },
      ...Array.from({ length: 10 }, (_, index) => ({
        title: `Menu Item ${index + 1}`,
        path: `/menu-${index + 1}`,
        icon: <span aria-hidden="true">📎</span>,
      })),
    ],
  },
]

const LogoIcon = () => (
  <div data-testid="logo-icon" role="img" aria-label="Logo">
    Logo
  </div>
)

export const Default = () => (
  <ThemeProvider {...createTheme()}>
    <VerticalDrawer navData={navDataMock} openNav onCloseNav={() => {}} LogoIcon={LogoIcon} />
  </ThemeProvider>
)

/**
 * Records every `onCloseNav` call into a hidden form, replacing the Cypress
 * spec's `cy.stub().as('onCloseNav')` — a spy cannot be shared across the
 * Node/browser boundary.
 */
export const RecordsCloseNav = () => {
  const [closeNavCount, setCloseNavCount] = useState(0)

  return (
    <>
      <ThemeProvider {...createTheme()}>
        <VerticalDrawer
          navData={navDataMock}
          openNav
          onCloseNav={() => setCloseNavCount((count) => count + 1)}
          LogoIcon={LogoIcon}
        />
      </ThemeProvider>
      <form hidden>
        <input data-testid="close-nav-count" readOnly value={String(closeNavCount)} />
      </form>
    </>
  )
}
