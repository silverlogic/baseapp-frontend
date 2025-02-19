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

describe('NavHorizontal', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
  })

  it('displays accessible drawer menu on mobile screens', () => {
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

    cy.get('[role="presentation"]').should('be.visible')

    cy.findByRole('navigation').within(() => {
      const mainSection = mockNavData[0]
      if (!mainSection?.items) return
      mainSection.items.forEach((item) => {
        cy.findByRole('link', { name: item.title }).should('be.visible')
      })
    })

    cy.get('@onCloseNav').should('have.been.called')
  })

  it('displays horizontal navigation bar with accessible tabs on desktop', () => {
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

    cy.get('[role="presentation"]').should('not.exist')

    const mainSection = mockNavData[0]
    if (!mainSection?.items) return

    mainSection.items.forEach((item) => {
      cy.findByRole('link', { name: item.title })
        .should('be.visible')
        .and('have.attr', 'href', item.path)
    })
  })

  it('adapts styling based on theme mode while maintaining accessibility', () => {
    cy.viewport(1280, 800)

    cy.mount(
      <ThemeProvider {...createTheme('light')}>
        <NavHorizontal navData={mockNavData} openNav={false} onCloseNav={cy.stub()} />
      </ThemeProvider>,
    )

    cy.findByRole('link', { name: 'Dashboard' })
      .should('exist')
      .should('be.visible')
      .should('have.css', 'color')

    cy.mount(
      <ThemeProvider {...createTheme('dark')}>
        <NavHorizontal navData={mockNavData} openNav={false} onCloseNav={cy.stub()} />
      </ThemeProvider>,
    )

    cy.findByRole('link', { name: 'Dashboard' })
      .should('exist')
      .should('be.visible')
      .should('have.css', 'color')

    const mainSection = mockNavData[0]
    if (!mainSection?.items) return

    mainSection.items.forEach((item) => {
      cy.findByRole('link', { name: item.title })
        .should('exist')
        .should('be.visible')
        .should('have.attr', 'href', item.path)
    })
  })

  it('provides accessible navigation with scroll on tablet screens', () => {
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

    cy.get('[role="presentation"]').within(() => {
      const mainSection = mockNavData[0]
      if (!mainSection?.items) return
      mainSection.items.forEach((item) => {
        cy.findByRole('link', { name: item.title })
          .should('be.visible')
          .and('have.attr', 'href', item.path)
      })
    })

    cy.get('@onCloseNav').should('have.been.called')
  })
})
