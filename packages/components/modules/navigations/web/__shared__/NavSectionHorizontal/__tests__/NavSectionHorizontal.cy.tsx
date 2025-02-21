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
  ],
}

describe('NavSectionHorizontal', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
  })

  it('renders all navigation items in a horizontal layout', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavSectionHorizontal navData={[mockNavData]} />
      </ThemeProvider>,
    )

    cy.get('.flex.min-h-16').should('exist')

    mockNavData.items.forEach((item) => {
      cy.findByRole('link', { name: item.title })
        .should('be.visible')
        .and('have.attr', 'href', item.path)
    })

    cy.get('.flex.h-full').should('have.css', 'gap', '6px')
    cy.findAllByRole('link').should('have.length', mockNavData.items.length)
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

    cy.findByRole('link', { name: 'Dashboard' })
      .should('have.attr', 'href', '/dashboard')
      .find('.MuiListItemButton-root')
      .should('have.css', 'background-color')
  })

  it('displays navigation items with accessible icons and labels', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavSectionHorizontal navData={[mockNavData]} />
      </ThemeProvider>,
    )

    mockNavData.items.forEach((item) => {
      cy.findByRole('link', { name: item.title }).within(() => {
        cy.get('span[aria-hidden="true"]').should('be.visible')
        cy.get('.label').should('have.text', item.title)
      })
    })
  })

  it('provides visual feedback on hover', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavSectionHorizontal navData={[mockNavData]} />
      </ThemeProvider>,
    )

    cy.findByRole('link', { name: 'Dashboard' })
      .find('.MuiListItemButton-root')
      .trigger('mouseover')
      .should('have.css', 'background-color')
      .then((backgroundColor) => {
        cy.findByRole('link', { name: 'Dashboard' })
          .find('.MuiListItemButton-root')
          .trigger('mouseout')
          .should('have.css', 'background-color', backgroundColor)
      })
  })
})
