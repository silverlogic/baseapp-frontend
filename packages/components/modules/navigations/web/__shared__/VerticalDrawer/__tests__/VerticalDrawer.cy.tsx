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

describe('VerticalDrawer Component', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
  })

  it('displays accessible navigation with scrollable content', () => {
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

    cy.findByRole('presentation').should('be.visible')

    cy.findByRole('img', { name: /logo/i }).should('be.visible')

    const mainSection = mockNavData[0]
    if (!mainSection?.items) {
      throw new Error('Navigation data is empty')
    }

    cy.findByRole('navigation').within(() => {
      mainSection.items.forEach((item) => {
        cy.findByRole('button', { name: item.title })
          .should('be.visible')
          .within(() => {
            cy.get('span[aria-hidden="true"]').should('be.visible')
            cy.findByText(item.title).should('be.visible')
          })
      })
    })

    cy.findByRole('region', { name: 'scrollable content' })
      .should('have.css', 'overflow', 'hidden')
      .then(($nav) => {
        const element = $nav[0]
        if (!element) {
          throw new Error('Navigation element not found')
        }
        expect(element.scrollHeight).to.be.at.least(element.clientHeight)
      })
  })

  it('closes navigation when route changes', () => {
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
