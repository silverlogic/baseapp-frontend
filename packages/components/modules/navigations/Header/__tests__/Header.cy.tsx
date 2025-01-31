import '../../../../styles/tailwind/globals.css'
import { HeaderForTesting, HeaderWithLogoForTesting } from './__utils__/HeaderForTesting'

describe('Header', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  it('renders without crashing', () => {
    cy.mount(<HeaderForTesting />)
    cy.get('[data-testid="mock-app-bar"]').should('exist')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('calls onOpenNav when menu button is clicked', () => {
    cy.mount(<HeaderForTesting />)
    cy.get('[data-testid="mock-icon-button"]').click()
    cy.get('@onOpenNav').should('have.been.calledOnce')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('does not render logo when LogoIcon is not provided', () => {
    cy.mount(<HeaderForTesting />)
    cy.get('[data-testid="mock-logo"]').should('not.exist')
    cy.get('@consoleError').should('not.have.been.called')
  })

  describe('with horizontal layout', () => {
    it('renders logo when LogoIcon is provided', () => {
      cy.mount(
        <HeaderWithLogoForTesting
          settings={{
            themeLayout: 'horizontal',
            themeStretch: false,
            themeMode: 'light',
            themeContrast: 'default',
            themeColorPresets: 'default',
          }}
        />,
      )
      cy.get('[data-testid="mock-logo"]').should('exist')
      cy.get('[data-testid="mock-logo-icon"]').should('exist')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })

  describe('with centered layout', () => {
    it('renders logo when LogoIcon is provided', () => {
      cy.mount(
        <HeaderWithLogoForTesting
          settings={{
            themeLayout: 'centered',
            themeStretch: false,
            themeMode: 'light',
            themeContrast: 'default',
            themeColorPresets: 'default',
          }}
        />,
      )
      cy.get('[data-testid="mock-logo"]').should('exist')
      cy.get('[data-testid="mock-logo-icon"]').should('exist')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })

  it('renders custom AccountMenu with children', () => {
    const CustomAccountMenu = ({ children }: any) => (
      <div data-testid="custom-account-menu">{children}</div>
    )

    cy.mount(
      <HeaderForTesting AccountMenu={CustomAccountMenu}>
        <div data-testid="menu-children">Menu Content</div>
      </HeaderForTesting>,
    )

    cy.get('[data-testid="custom-account-menu"]').should('exist')
    cy.get('[data-testid="menu-children"]').should('exist')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('passes ToolbarProps to Toolbar component', () => {
    const toolbarProps = {
      'data-custom': 'test',
    } as any

    cy.mount(<HeaderForTesting ToolbarProps={toolbarProps} />)
    cy.get('[data-testid="mock-toolbar"]').should('have.attr', 'data-custom', 'test')
    cy.get('@consoleError').should('not.have.been.called')
  })
})
