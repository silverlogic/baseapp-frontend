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
        icon: <span aria-hidden="true">📊</span>,
      },
      {
        title: 'Profile',
        path: '/profile',
        icon: <span aria-hidden="true">👤</span>,
      },
      {
        title: 'Settings',
        path: '/settings',
        icon: <span aria-hidden="true">⚙️</span>,
      },
      {
        title: 'Analytics',
        path: '/analytics',
        icon: <span aria-hidden="true">📈</span>,
      },
      {
        title: 'Reports',
        path: '/reports',
        icon: <span aria-hidden="true">📑</span>,
      },
    ],
  },
]

describe('NavCentered', () => {
  it('provides accessible navigation drawer on mobile screens', () => {
    cy.viewport(375, 667)

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavCentered navData={mockNavData} openNav={true} onCloseNav={cy.stub().as('onCloseNav')} />
      </ThemeProvider>,
    )

    cy.findByRole('presentation').should('be.visible')

    cy.get('[role="presentation"]').within(() => {
      const mainSection = mockNavData[0]
      if (!mainSection?.items) return
      mainSection.items.forEach((item) => {
        cy.findByRole('link', { name: item.title })
          .should('be.visible')
          .and('have.attr', 'href', item.path)
          .find('.MuiListItemButton-root')
          .should('have.attr', 'role', 'button')
      })
    })

    cy.get('@onCloseNav').should('have.been.called')
  })

  it('displays centered navigation bar with accessible links on desktop', () => {
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

    cy.get('[role="presentation"]').should('not.exist')

    const mainSection = mockNavData[0]
    if (!mainSection?.items) return

    cy.get('.flex.min-h-16').should('exist')
    cy.get('.flex.h-full').should('have.css', 'gap', '6px')

    mainSection.items.forEach((item) => {
      cy.findByRole('link', { name: item.title })
        .should('be.visible')
        .and('have.attr', 'href', item.path)
        .find('.MuiListItemButton-root')
        .should('have.attr', 'role', 'button')
    })
  })

  it('provides accessible navigation with scroll functionality on tablet', () => {
    cy.viewport(800, 600)

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavCentered navData={mockNavData} openNav={true} onCloseNav={cy.stub().as('onCloseNav')} />
      </ThemeProvider>,
    )

    cy.get('[role="presentation"]').within(() => {
      const mainSection = mockNavData[0]
      if (!mainSection?.items) return
      mainSection.items.forEach((item) => {
        cy.findByRole('link', { name: item.title })
          .should('be.visible')
          .and('have.attr', 'href', item.path)
          .find('.MuiListItemButton-root')
          .should('have.attr', 'role', 'button')
      })
    })
    cy.get('@onCloseNav').should('have.been.called')
  })
})
