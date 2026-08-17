import { FC, PropsWithChildren, ReactNode } from 'react'

import { BaseAppLogoCondensed } from '@baseapp-frontend/design-system/components/web/icons'
import type { ThemeProviderProps } from '@baseapp-frontend/design-system/providers/web'
import {
  type ThemeMode,
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  typography,
} from '@baseapp-frontend/design-system/styles/web'

import NavigationLayoutForTesting from '../NavigationLayoutForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/NavigationLayout.cy.tsx`. The Cypress spec varied the
 * scenario by passing component props (`LogoIcon`, `AccountMenu`,
 * `AccountMenuProps.additionalComponent`) — React components cannot cross the
 * Node/browser boundary as `mount()` props, so each variation is its own story.
 */
const defaultTheme = {
  palette: createPalette('light'),
  breakpoints,
  settings: {
    themeMode: 'light' as ThemeMode,
    themeContrast: 'default',
    themeLayout: 'vertical',
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
    ],
  },
]

const LogoIcon = () => (
  <div data-testid="logo-icon" role="img" aria-label="Logo">
    Logo
  </div>
)

interface AccountMenuProps extends PropsWithChildren {
  additionalComponent?: ReactNode
}

const AccountMenu: FC<AccountMenuProps> = ({ additionalComponent, children }) => (
  <div data-testid="account-menu" role="menu" aria-label="Account Menu">
    Account Menu
    {additionalComponent}
    {children}
  </div>
)

const CustomAccountMenu = () => <div data-testid="custom-account-menu">Custom Account Menu</div>

const AdditionalComponent = () => (
  <div data-testid="additional-component" role="complementary" aria-label="Additional Component">
    Additional Component
  </div>
)

/** Vertical layout with the explicit test theme. */
export const Default = () => (
  <NavigationLayoutForTesting
    navData={navDataMock}
    LogoIcon={BaseAppLogoCondensed}
    ThemeTestProviderProps={{ customTheme: defaultTheme }}
  >
    <div role="main">Content</div>
  </NavigationLayoutForTesting>
)

/**
 * Same scenario without `ThemeTestProviderProps`, so the harness's own default
 * theme applies. The Cypress spec mounted this as the second of three mounts in
 * its first test; the third mount was byte-identical to the first.
 */
export const DefaultTheme = () => (
  <NavigationLayoutForTesting navData={navDataMock} LogoIcon={BaseAppLogoCondensed}>
    <div role="main">Content</div>
  </NavigationLayoutForTesting>
)

export const WithAccountMenu = () => (
  <NavigationLayoutForTesting
    navData={navDataMock}
    LogoIcon={LogoIcon}
    AccountMenu={AccountMenu}
    ThemeTestProviderProps={{ customTheme: defaultTheme }}
  >
    <div>Content</div>
  </NavigationLayoutForTesting>
)

export const WithCustomAccountMenu = () => (
  <NavigationLayoutForTesting
    navData={navDataMock}
    LogoIcon={LogoIcon}
    AccountMenu={CustomAccountMenu}
    ThemeTestProviderProps={{ customTheme: defaultTheme }}
  >
    <div>Content</div>
  </NavigationLayoutForTesting>
)

export const WithAdditionalComponent = () => (
  <NavigationLayoutForTesting
    navData={navDataMock}
    LogoIcon={LogoIcon}
    AccountMenu={AccountMenu}
    AccountMenuProps={{ additionalComponent: <AdditionalComponent /> }}
    ThemeTestProviderProps={{ customTheme: defaultTheme }}
  >
    <div>Content</div>
  </NavigationLayoutForTesting>
)
