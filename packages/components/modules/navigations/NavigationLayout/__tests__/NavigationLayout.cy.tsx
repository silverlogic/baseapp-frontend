import '../../../../styles/tailwind/globals.css'
import { NavigationLayoutForTesting } from './__utils__/NavigationLayoutForTesting'

// Add mock logo component
const MockLogo = () => <div data-testid="mock-logo">Logo</div>

describe('NavigationLayout', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  it('renders vertical layout by default', () => {
    cy.mount(<NavigationLayoutForTesting>Content</NavigationLayoutForTesting>)
    cy.get('[data-testid="mock-header"]').should('exist')
    cy.get('[data-testid="mock-box"]').should('exist')
    cy.get('[data-testid="mock-nav-vertical"]').should('exist')
    cy.get('[data-testid="mock-main-container"]').should('exist')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('renders centered layout', () => {
    cy.mount(
      <NavigationLayoutForTesting settings={{ ...defaultSettings, themeLayout: 'centered' }}>
        Content
      </NavigationLayoutForTesting>,
    )
    cy.get('[data-testid="mock-header"]').should('exist')
    cy.get('[data-testid="mock-nav-centered"]').should('exist')
    cy.get('[data-testid="mock-main-container"]').should('have.attr', 'data-nav-centered', 'true')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('renders horizontal layout', () => {
    cy.mount(
      <NavigationLayoutForTesting settings={{ ...defaultSettings, themeLayout: 'horizontal' }}>
        Content
      </NavigationLayoutForTesting>,
    )
    cy.get('[data-testid="mock-header"]').should('exist')
    cy.get('[data-testid="mock-nav-horizontal"]').should('exist')
    cy.get('[data-testid="mock-main-container"]').should('have.attr', 'data-nav-horizontal', 'true')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('renders mini layout', () => {
    cy.mount(
      <NavigationLayoutForTesting settings={{ ...defaultSettings, themeLayout: 'mini' }}>
        Content
      </NavigationLayoutForTesting>,
    )
    cy.get('[data-testid="mock-header"]').should('exist')
    cy.get('[data-testid="mock-box"]').should('exist')
    cy.get('[data-testid="mock-nav-mini"]').should('exist')
    cy.get('[data-testid="mock-main-container"]').should('have.attr', 'data-nav-mini', 'true')
    cy.get('@consoleError').should('not.have.been.called')
  })

  describe('Layout Switching', () => {
    it('switches between different navigation layouts', () => {
      const layouts = ['centered', 'horizontal', 'mini', 'vertical'] as const

      layouts.forEach((layout) => {
        cy.mount(
          <NavigationLayoutForTesting settings={{ ...defaultSettings, themeLayout: layout }}>
            Content
          </NavigationLayoutForTesting>,
        )

        // Verify correct nav component is displayed
        if (layout === 'centered') {
          cy.get('[data-testid="mock-nav-centered"]').should('exist')
          cy.get('[data-testid="mock-main-container"]').should(
            'have.attr',
            'data-nav-centered',
            'true',
          )
        } else if (layout === 'horizontal') {
          cy.get('[data-testid="mock-nav-horizontal"]').should('exist')
          cy.get('[data-testid="mock-main-container"]').should(
            'have.attr',
            'data-nav-horizontal',
            'true',
          )
        } else if (layout === 'mini') {
          cy.get('[data-testid="mock-nav-mini"]').should('exist')
          cy.get('[data-testid="mock-main-container"]').should('have.attr', 'data-nav-mini', 'true')
        } else {
          cy.get('[data-testid="mock-nav-vertical"]').should('exist')
        }
      })
    })
  })

  describe('Navigation Toggle', () => {
    it('opens and closes navigation when toggle button is clicked', () => {
      cy.mount(<NavigationLayoutForTesting>Content</NavigationLayoutForTesting>)

      // Test opening
      cy.get('[data-testid="nav-toggle-button"]').click()
      cy.get('[data-testid="mock-nav-vertical"]').should('have.attr', 'data-open', 'true')

      // Test closing
      cy.get('[data-testid="nav-close-button"]').click()
      cy.get('[data-testid="mock-nav-vertical"]').should('have.attr', 'data-open', 'false')
    })

    it('closes navigation when clicking outside', () => {
      cy.mount(<NavigationLayoutForTesting>Content</NavigationLayoutForTesting>)

      // Open nav
      cy.get('[data-testid="nav-toggle-button"]').click()
      cy.get('[data-testid="mock-nav-vertical"]').should('have.attr', 'data-open', 'true')

      // Click outside (on the main container)
      cy.get('[data-testid="mock-main-container"]').click()

      // Verify nav is closed
      cy.get('[data-testid="mock-nav-vertical"]').should('have.attr', 'data-open', 'false')
    })
  })

  describe('Header Components', () => {
    it('displays logo and account menu correctly', () => {
      cy.mount(<NavigationLayoutForTesting LogoIcon={MockLogo}>Content</NavigationLayoutForTesting>)

      cy.get('[data-testid="mock-logo"]').should('exist')
      cy.get('[data-testid="mock-account-menu"]').should('exist')
    })

    it('renders without logo when LogoIcon is not provided', () => {
      cy.mount(
        <NavigationLayoutForTesting LogoIcon={undefined}>Content</NavigationLayoutForTesting>,
      )

      cy.get('[data-testid="mock-logo"]').should('not.exist')
      cy.get('[data-testid="mock-account-menu"]').should('exist')
    })

    it('renders custom account menu', () => {
      const CustomAccountMenu = () => (
        <div data-testid="custom-account-menu">Custom Account Menu</div>
      )

      cy.mount(
        <NavigationLayoutForTesting LogoIcon={MockLogo} AccountMenu={CustomAccountMenu}>
          Content
        </NavigationLayoutForTesting>,
      )

      cy.get('[data-testid="mock-logo"]').should('exist')
      cy.get('[data-testid="custom-account-menu"]').should('exist')
      cy.get('[data-testid="mock-account-menu"]').should('not.exist')
    })

    it('renders additional component in account menu props', () => {
      const AdditionalComponent = () => (
        <div data-testid="additional-component">Additional Content</div>
      )

      cy.mount(
        <NavigationLayoutForTesting
          AccountMenuProps={{
            additionalComponent: <AdditionalComponent />,
          }}
        >
          Content
        </NavigationLayoutForTesting>,
      )

      cy.get('[data-testid="additional-component"]').should('exist')
    })
  })
})

const defaultSettings = {
  themeLayout: 'vertical' as const,
  themeStretch: false,
  themeMode: 'light' as const,
  themeContrast: 'default' as const,
  themeColorPresets: 'default' as const,
}
