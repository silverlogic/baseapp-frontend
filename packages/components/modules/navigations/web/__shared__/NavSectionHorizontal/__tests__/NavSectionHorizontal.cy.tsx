import { ThemeProvider } from '@baseapp-frontend/design-system/providers/web'
import { ThemeProviderProps } from '@baseapp-frontend/design-system/providers/web'
import {
  PresetType,
  ThemeContrast,
  ThemeLayout,
  ThemeMode,
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  typography,
} from '@baseapp-frontend/design-system/styles/web'

import NavSectionHorizontal from '..'

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

const mockNavData = {
  subheader: 'Main',
  items: [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <span data-testid="dashboard-icon">📊</span>,
    },
    {
      title: 'Profile',
      path: '/profile',
      icon: <span data-testid="profile-icon">👤</span>,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <span data-testid="settings-icon">⚙️</span>,
    },
  ],
}

describe('NavSectionHorizontal', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
  })

  it('displays navigation items in a horizontal row with proper spacing', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavSectionHorizontal navData={[mockNavData]} />
      </ThemeProvider>,
    )

    cy.get('.flex.min-h-16').should('exist')
    cy.get('.flex.h-full').should('exist')
    cy.get('a').should('have.length', mockNavData.items.length)

    cy.get('a').each(($el) => {
      cy.wrap($el)
        .should('be.visible')
        .and('have.css', 'display', 'flex')
        .and('have.css', 'align-items', 'center')
    })

    cy.get('.flex.h-full').should('have.css', 'gap', '6px')
  })

  it('highlights the active navigation item', () => {
    cy.window().then((win) => {
      win.history.pushState({}, '', '/dashboard')
    })

    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavSectionHorizontal navData={[mockNavData]} />
      </ThemeProvider>,
    )

    cy.get('a[href="/dashboard"]')
      .should('have.css', 'background-color')
      .and('equal', 'rgba(0, 0, 0, 0)')
  })

  it('displays icons and labels correctly', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavSectionHorizontal navData={[mockNavData]} />
      </ThemeProvider>,
    )

    mockNavData.items.forEach((item) => {
      cy.get(`a[href="${item.path}"]`).within(() => {
        cy.get('span').first().should('be.visible')
        cy.contains(item.title).should('be.visible').and('have.css', 'margin-left')
      })
    })
  })

  it('handles hover states correctly', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavSectionHorizontal navData={[mockNavData]} />
      </ThemeProvider>,
    )

    cy.get('a[href="/dashboard"]')
      .trigger('mouseover')
      .should('have.css', 'background-color')
      .and('equal', 'rgba(0, 0, 0, 0)')

    cy.get('a[href="/dashboard"]')
      .trigger('mouseout')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
  })
})
