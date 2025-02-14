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

import VerticalDrawer from '..'

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
      ...Array.from({ length: 10 }, (_, index) => ({
        title: `Menu Item ${index + 1}`,
        path: `/menu-${index + 1}`,
        icon: <span>📎</span>,
      })),
    ],
  },
]

const LogoIcon = () => <div data-testid="logo-icon">Logo</div>

describe('VerticalDrawer Component', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
  })

  it('displays all navigation items with scrolling capability', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <VerticalDrawer
          navData={mockNavData}
          openNav={true}
          onCloseNav={cy.stub()}
          LogoIcon={LogoIcon}
        />
      </ThemeProvider>,
    )

    cy.get('.MuiDrawer-root').should('exist').and('be.visible').and('have.class', 'MuiDrawer-root')

    cy.get('[data-testid="logo-icon"]').should('exist').and('be.visible')

    const mainSection = mockNavData[0]
    if (!mainSection) {
      throw new Error('Navigation data is empty')
    }

    if (!mainSection.items) {
      throw new Error('No navigation items found')
    }

    cy.get('.MuiDrawer-paper').within(() => {
      mainSection.items.forEach((item) => {
        cy.contains('a', item.title)
          .should('exist')
          .and('be.visible')
          .and('have.attr', 'href', item.path)
          .as(`navLink-${item.path}`)

        cy.get(`@navLink-${item.path}`).within(() => {
          cy.get('span')
            .first()
            .should('exist')
            .and('be.visible')
            .and('contain', item.icon.props.children)

          cy.get('span').contains(item.title).should('exist').and('be.visible')
        })
      })
    })

    cy.get('.simplebar-content-wrapper')
      .should('exist')
      .and('be.visible')
      .and('have.class', 'simplebar-content-wrapper')
      .then(($el) => {
        const element = $el[0]
        if (!element) {
          throw new Error('SimpleBar content wrapper element not found')
        }
        expect(element.scrollHeight).to.be.at.least(element.clientHeight)
      })

    cy.get('.simplebar-content-wrapper')
      .should('exist')
      .and('be.visible')
      .scrollTo('bottom', { ensureScrollable: false })
      .then(() => {
        cy.contains('a', 'Settings').should('exist').and('be.visible')
      })
  })

  it('closes drawer when navigating to a new page', () => {
    const onCloseNav = cy.stub().as('onCloseNav')

    cy.mount(
      <ThemeProvider {...createTheme()}>
        <VerticalDrawer
          navData={mockNavData}
          openNav={true}
          onCloseNav={onCloseNav}
          LogoIcon={LogoIcon}
        />
      </ThemeProvider>,
    )

    cy.window().then((win) => {
      win.dispatchEvent(new Event('popstate'))
    })

    cy.get('@onCloseNav').should('have.been.called')
  })
})
