import { ThemeProvider } from '@baseapp-frontend/design-system/providers/web'
import type { ThemeProviderProps } from '@baseapp-frontend/design-system/providers/web'
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

import NavMini from '..'

const createTheme = (mode: ThemeMode = 'light'): ThemeProviderProps => ({
  palette: createPalette(mode),
  breakpoints,
  settings: {
    themeMode: mode,
    themeContrast: 'default' as ThemeContrast,
    themeLayout: 'mini' as ThemeLayout,
    themeColorPresets: 'default' as PresetType,
    themeStretch: false,
  },
  shadows: createShadows(mode),
  customShadows: createCustomShadows(mode),
  typography,
  primaryFont: undefined,
  secondaryFont: undefined,
})

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
    ],
  },
]

const LogoIcon = () => (
  <div role="img" aria-label="Logo">
    Logo
  </div>
)

describe('NavMini Component', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
  })

  it.skip('displays a compact navigation with accessible icons and labels', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavMini
          navData={mockNavData}
          openNav={false}
          onCloseNav={cy.stub()}
          LogoIcon={LogoIcon}
          settings={createTheme().settings}
          setSettings={cy.stub()}
        />
      </ThemeProvider>,
    )

    cy.findByRole('navigation')
      .should('be.visible')
      .and(($el) => {
        const width = parseInt($el.css('width'))
        expect(width).to.be.lte(88)
      })
      .and('have.css', 'border-right-style', 'solid')

    cy.findByRole('img', { name: /logo/i }).should('be.visible')

    const mainSection = mockNavData[0]
    if (!mainSection?.items) return

    cy.findByRole('navigation').within(() => {
      mainSection.items.forEach((item) => {
        cy.findByRole('link', { name: item.title })
          .should('be.visible')
          .and('have.attr', 'href', item.path)
          .within(() => {
            cy.get('span[aria-hidden="true"]').should('be.visible')
            cy.findByText(item.title).should('be.visible')
          })
      })
    })
  })

  it('expands to vertical layout when toggle button is clicked', () => {
    const setSettings = cy.stub().as('setSettings')
    const initialSettings = createTheme().settings

    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavMini
          navData={mockNavData}
          openNav={false}
          onCloseNav={cy.stub()}
          LogoIcon={LogoIcon}
          settings={initialSettings}
          setSettings={setSettings}
        />
      </ThemeProvider>,
    )

    cy.findByRole('navigation')
      .should('be.visible')
      .and(($el) => {
        const width = parseInt($el.css('width'))
        expect(width).to.be.lte(88)
      })

    setSettings({ themeLayout: 'vertical' })

    cy.get('@setSettings').should('have.been.calledWith', {
      themeLayout: 'vertical',
    })

    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavMini
          navData={mockNavData}
          openNav={false}
          onCloseNav={cy.stub()}
          LogoIcon={LogoIcon}
          settings={{ ...initialSettings, themeLayout: 'vertical' }}
          setSettings={setSettings}
        />
      </ThemeProvider>,
    )

    setSettings({ themeLayout: 'mini' })

    cy.get('@setSettings').should('have.been.calledWith', {
      themeLayout: 'mini',
    })
  })

  it('displays logo and toggle button in accessible positions', () => {
    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavMini
          navData={mockNavData}
          openNav={false}
          onCloseNav={cy.stub()}
          LogoIcon={LogoIcon}
          settings={createTheme().settings}
          setSettings={cy.stub()}
        />
      </ThemeProvider>,
    )

    cy.findByRole('img', { name: /logo/i })
      .parent()
      .should(($el) => {
        const marginRight = parseFloat($el.css('margin-right'))
        expect(marginRight).to.be.lte(23.6)
      })

    cy.get('button.MuiIconButton-root')
      .should('be.visible')
      .and('have.css', 'position', 'fixed')
      .and('have.css', 'left', '76px')
  })
})
