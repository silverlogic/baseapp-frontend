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
    ],
  },
]

const LogoIcon = () => <div data-testid="logo-icon">Logo</div>

describe('NavMini Component', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
  })

  it('displays a compact menu with only icons visible', () => {
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

    cy.get('.MuiBox-root')
      .first()
      .should('have.css', 'width', '88px')
      .and('have.css', 'border-right-style', 'solid')

    if (mockNavData[0]?.items) {
      mockNavData[0].items.forEach((item) => {
        cy.get(`a[href="${item.path}"]`).within(() => {
          cy.get('span').first().should('be.visible').and('contain', item.icon.props.children)

          cy.get('span.label').then(($el) => {
            const element = $el[0]
            if (!element) {
              throw new Error('Label element not found')
            }
            const style = window.getComputedStyle(element)
            expect(style.clip).to.equal('auto')
            expect(style.position).to.equal('static')
          })
        })
      })
    }
  })

  it('expands and collapses when toggle button is clicked', () => {
    const initialSettings = createTheme().settings
    const setSettings = cy.stub().as('setSettings')
    let currentSettings = { ...initialSettings }

    cy.mount(
      <ThemeProvider {...createTheme()}>
        <NavMini
          navData={mockNavData}
          openNav={false}
          onCloseNav={cy.stub()}
          LogoIcon={LogoIcon}
          settings={currentSettings}
          setSettings={(newSettings) => {
            currentSettings = { ...currentSettings, ...newSettings }
            setSettings(newSettings)
          }}
        />
      </ThemeProvider>,
    )

    cy.get('.MuiBox-root').first().should('have.css', 'width', '88px')

    cy.get('.MuiIconButton-root')
      .should('be.visible')
      .should('not.be.disabled')
      .as('toggleButton')
      .click()

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
          settings={{ ...currentSettings, themeLayout: 'vertical' }}
          setSettings={setSettings}
        />
      </ThemeProvider>,
    )

    cy.get('.MuiIconButton-root')
      .should('be.visible')
      .should('not.be.disabled')
      .as('toggleButton2')
      .click()

    cy.get('@setSettings').should('have.been.calledWith', {
      themeLayout: 'mini',
    })
  })

  it('displays logo and toggle button in correct positions', () => {
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

    cy.get('[data-testid="logo-icon"]')
      .should('be.visible')
      .parent('.MuiBox-root')
      .should('have.css', 'margin', '16px 23.6px')

    cy.get('.MuiIconButton-root')
      .should('be.visible')
      .should('have.css', 'position', 'fixed')
      .and('have.css', 'left', '76px')
  })
})
