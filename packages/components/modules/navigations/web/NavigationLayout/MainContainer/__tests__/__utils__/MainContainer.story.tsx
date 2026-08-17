import { FC } from 'react'

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

import MainContainer from '../..'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/MainContainer.cy.tsx`. Each Cypress test mounted the
 * component inside a `ThemeProvider` configured with a different `themeLayout`,
 * so each becomes one story export — the layout is the scenario under test.
 *
 * This component has no `*ForTesting` harness; the Cypress spec wrapped
 * `ThemeProvider` directly, and so does `Scenario` below.
 */
const createTheme = (layout: ThemeLayout = 'vertical') =>
  ({
    palette: createPalette('light'),
    breakpoints,
    settings: {
      themeMode: 'light' as ThemeMode,
      themeContrast: 'default' as ThemeContrast,
      themeLayout: layout,
      themeColorPresets: 'default' as PresetType,
      themeStretch: false,
    },
    shadows: createShadows('light'),
    customShadows: createCustomShadows('light'),
    typography,
    primaryFont: undefined,
    secondaryFont: undefined,
  }) as ThemeProviderProps

const Scenario: FC<{ layout: ThemeLayout; isNavCentered?: boolean }> = ({
  layout,
  isNavCentered = false,
}) => (
  <ThemeProvider {...createTheme(layout)}>
    <MainContainer isNavCentered={isNavCentered}>
      <div role="main" aria-label="Test Content">
        Test Content
      </div>
    </MainContainer>
  </ThemeProvider>
)

export const CenteredLayout = () => <Scenario layout="centered" isNavCentered />

export const HorizontalLayout = () => <Scenario layout="horizontal" />

export const MiniLayout = () => <Scenario layout="mini" />

export const VerticalLayout = () => <Scenario layout="vertical" />
