import { ThemeProvider } from '@baseapp-frontend/design-system/providers/web'
import { ThemeProviderProps } from '@baseapp-frontend/design-system/providers/web'
import {
  ThemeMode,
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  typography,
} from '@baseapp-frontend/design-system/styles/web'

import NavCentered from '..'

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

describe('NavCentered', () => {
  it('displays drawer-style menu on mobile screens', () => {
    cy.viewport(375, 667)

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavCentered navData={mockNavData} openNav={true} onCloseNav={cy.stub().as('onCloseNav')} />
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

  it('displays centered horizontal bar on desktop screens', () => {
    cy.viewport(1280, 800)

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavCentered
          navData={mockNavData}
          openNav={false}
          onCloseNav={cy.stub().as('onCloseNav')}
        />
      </ThemeProvider>,
    )

    cy.get('.MuiDrawer-root').should('not.exist')

    cy.get('.flex.min-h-16')
      .should('be.visible')
      .within(() => {
        cy.get('.flex.h-full').within(() => {
          cy.contains('Dashboard').should('be.visible')
          cy.contains('Profile').should('be.visible')
        })
      })
  })

  it('handles overflow with scrollable navigation on tablet screens', () => {
    cy.viewport(800, 600)

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavCentered navData={mockNavData} openNav={true} onCloseNav={cy.stub().as('onCloseNav')} />
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
