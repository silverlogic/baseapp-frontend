import { FC, PropsWithChildren } from 'react'

import { BaseAppLogoCondensed } from '@baseapp-frontend/design-system/components/web/icons'
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

import NavigationLayout from '..'

interface AccountMenuProps extends PropsWithChildren {
  additionalComponent?: React.ReactNode
  AccountMenuProps?: {
    additionalComponent?: React.ReactNode
  }
}

const LogoIcon = () => <div data-testid="logo-icon">Logo</div>
const AccountMenu: FC<AccountMenuProps> = ({ additionalComponent, children }) => (
  <div data-testid="account-menu">
    Account Menu
    {additionalComponent}
    {children}
  </div>
)
const AdditionalComponent = () => <div data-testid="additional-component">Additional Component</div>

const defaultTheme = {
  palette: createPalette('light'),
  breakpoints,
  settings: {
    themeMode: 'light' as ThemeMode,
    themeContrast: 'default',
    themeLayout: 'vertical',
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
    ],
  },
]

const defaultSettings = {
  themeMode: 'light' as ThemeMode,
  themeContrast: 'default' as ThemeContrast,
  themeColorPresets: 'default' as PresetType,
  themeStretch: false,
  themeLayout: 'vertical' as ThemeLayout,
}

let mockSetSettings: any

describe('NavigationLayout', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    mockSetSettings = cy.stub()
  })

  it('switches between navigation layouts and sees the appropriate layout applied', () => {
    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavigationLayout
          navData={mockNavData}
          settings={{ ...defaultSettings, themeLayout: 'centered' }}
          setSettings={mockSetSettings}
          LogoIcon={BaseAppLogoCondensed}
        >
          <div>Content</div>
        </NavigationLayout>
      </ThemeProvider>,
    )
    cy.contains('Dashboard').should('exist')
    cy.contains('Profile').should('exist')

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavigationLayout
          navData={mockNavData}
          settings={{ ...defaultSettings, themeLayout: 'horizontal' }}
          setSettings={mockSetSettings}
          LogoIcon={BaseAppLogoCondensed}
        >
          <div>Content</div>
        </NavigationLayout>
      </ThemeProvider>,
    )
    cy.contains('Dashboard').should('exist')
    cy.contains('Profile').should('exist')

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavigationLayout
          navData={mockNavData}
          settings={{ ...defaultSettings, themeLayout: 'mini' }}
          setSettings={mockSetSettings}
          LogoIcon={BaseAppLogoCondensed}
        >
          <div>Content</div>
        </NavigationLayout>
      </ThemeProvider>,
    )
    cy.contains('Dashboard').should('exist')
    cy.contains('Profile').should('exist')

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavigationLayout
          navData={mockNavData}
          settings={defaultSettings}
          setSettings={mockSetSettings}
          LogoIcon={BaseAppLogoCondensed}
        >
          <div>Content</div>
        </NavigationLayout>
      </ThemeProvider>,
    )
    cy.contains('Dashboard').should('exist')
    cy.contains('Profile').should('exist')
  })

  it('interacts with navigation toggle button and sees navigation open/close', () => {
    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavigationLayout
          navData={mockNavData}
          settings={{ ...defaultSettings, themeLayout: 'vertical' }}
          setSettings={mockSetSettings}
          LogoIcon={BaseAppLogoCondensed}
        >
          <div>Content</div>
        </NavigationLayout>
      </ThemeProvider>,
    )

    cy.contains('Dashboard').should('exist')

    cy.viewport(375, 667)
    cy.get('button').first().should('be.visible').click()
    cy.contains('Dashboard').should('be.visible')
    cy.get('body').click(0, 0)

    cy.viewport(1280, 800)
    cy.get('button').filter(':visible').last().click()
    cy.wrap(mockSetSettings).should('have.been.calledWith', { themeLayout: 'mini' })
  })

  it('displays logo and account menu correctly', () => {
    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavigationLayout
          navData={mockNavData}
          settings={defaultSettings}
          setSettings={cy.stub().as('setSettings')}
          LogoIcon={LogoIcon}
          AccountMenu={AccountMenu}
        >
          <div>Content</div>
        </NavigationLayout>
      </ThemeProvider>,
    )

    cy.get('[data-testid="logo-icon"]').should('exist')
    cy.get('[data-testid="account-menu"]').should('exist')
    cy.get('[data-testid="account-menu"]').should('be.visible')
  })

  it('uses custom AccountMenu component', () => {
    const CustomAccountMenu = () => <div data-testid="custom-account-menu">Custom Account Menu</div>

    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavigationLayout
          navData={mockNavData}
          settings={defaultSettings}
          setSettings={cy.stub().as('setSettings')}
          LogoIcon={LogoIcon}
          AccountMenu={CustomAccountMenu}
        >
          <div>Content</div>
        </NavigationLayout>
      </ThemeProvider>,
    )

    cy.get('[data-testid="custom-account-menu"]').should('exist')
    cy.get('[data-testid="custom-account-menu"]').should('contain.text', 'Custom Account Menu')
  })

  it('displays additional component in AccountMenuProps', () => {
    cy.mount(
      <ThemeProvider {...defaultTheme}>
        <NavigationLayout
          navData={mockNavData}
          settings={defaultSettings}
          setSettings={mockSetSettings}
          LogoIcon={LogoIcon}
          AccountMenu={AccountMenu}
          AccountMenuProps={{
            additionalComponent: <AdditionalComponent />,
          }}
        >
          <div>Content</div>
        </NavigationLayout>
      </ThemeProvider>,
    )

    cy.get('[data-testid="additional-component"]')
      .should('exist')
      .and('contain.text', 'Additional Component')
  })
})
