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

import NavHorizontal from '..'

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

const mockNavData = [
  {
    subheader: 'Main',
    items: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <span>📊</span>,
      },
      {
        title: 'Profile',
        path: '/profile',
        icon: <span>👤</span>,
      },
      {
        title: 'Settings',
        path: '/settings',
        icon: <span>⚙️</span>,
      },
      {
        title: 'Analytics',
        path: '/analytics',
        icon: <span>📈</span>,
      },
      {
        title: 'Reports',
        path: '/reports',
        icon: <span>📑</span>,
      },
    ],
  },
]

describe('NavHorizontal', () => {
  it('displays drawer-style menu on mobile screens', () => {
    cy.viewport(375, 667)

    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavHorizontal
          navData={mockNavData}
          openNav={true}
          onCloseNav={cy.stub().as('onCloseNav')}
        />
      </ThemeProvider>,
    )

    cy.get('.MuiDrawer-root')
      .should('exist')
      .within(() => {
        cy.get('.MuiDrawer-paper').should('be.visible')
        cy.get('#nav-section-vertical').within(() => {
          cy.contains('Dashboard').should('be.visible')
          cy.contains('Profile').should('be.visible')
        })
      })

    cy.get('.MuiBackdrop-root').click({ force: true })
    cy.get('@onCloseNav').should('have.been.called')
  })

  it('displays horizontal navigation bar with scrollable tabs on desktop screens', () => {
    cy.viewport(1280, 800)

    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavHorizontal
          navData={mockNavData}
          openNav={false}
          onCloseNav={cy.stub().as('onCloseNav')}
        />
      </ThemeProvider>,
    )

    cy.get('.MuiDrawer-root').should('not.exist')

    cy.get('.MuiAppBar-root')
      .should('exist')
      .and('be.visible')
      .within(() => {
        cy.get('[data-simplebar="init"]').should('exist')

        cy.contains('Dashboard').should('be.visible')
        cy.contains('Profile').should('be.visible')
        cy.contains('Settings').should('exist')
        cy.contains('Analytics').should('exist')
        cy.contains('Reports').should('exist')
      })
  })

  it('adapts styling based on theme mode', () => {
    cy.viewport(1280, 800)

    cy.mount(
      <ThemeProvider {...createTheme('light')}>
        <NavHorizontal navData={mockNavData} openNav={false} onCloseNav={cy.stub()} />
      </ThemeProvider>,
    )

    cy.get('.MuiAppBar-root').should('have.css', 'background-color').and('not.eq', 'rgb(0, 0, 0)')

    cy.mount(
      <ThemeProvider {...createTheme('dark')}>
        <NavHorizontal navData={mockNavData} openNav={false} onCloseNav={cy.stub()} />
      </ThemeProvider>,
    )

    cy.get('.MuiAppBar-root')
      .should('have.css', 'background-color')
      .and('not.eq', 'rgb(255, 255, 255)')

    cy.get('.MuiAppBar-root').find('a[href="/dashboard"]').should('have.css', 'color')
  })

  it('handles overflow with scrollable navigation on tablet screens', () => {
    cy.viewport(800, 600)

    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavHorizontal
          navData={mockNavData}
          openNav={true}
          onCloseNav={cy.stub().as('onCloseNav')}
        />
      </ThemeProvider>,
    )

    cy.get('.MuiDrawer-root')
      .should('exist')
      .within(() => {
        cy.get('.MuiDrawer-paper').should('be.visible')

        cy.get('#nav-section-vertical').within(() => {
          cy.contains('Dashboard').should('be.visible')
          cy.contains('Profile').should('be.visible')
          cy.contains('Settings').should('exist')
          cy.contains('Analytics').should('exist')
          cy.contains('Reports').should('exist')
        })
      })

    cy.get('.MuiBackdrop-root').click({ force: true })
    cy.get('@onCloseNav').should('have.been.called')
  })
})
