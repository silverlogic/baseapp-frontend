import '../../../../styles/tailwind/globals.css'
import { NavVerticalForTesting } from './__utils__/NavVerticalForTesting'

describe('NavVertical', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  describe('mobile view (lgDown)', () => {
    it('renders vertical drawer', () => {
      cy.mount(<NavVerticalForTesting isLgDown={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').should('exist')
      cy.get('[data-testid="mock-box"]').should('not.exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('passes correct props to VerticalDrawer', () => {
      const navData = [
        {
          subheader: 'Test Section',
          items: [{ title: 'Test Item', path: '/test' }],
        },
      ]
      cy.mount(<NavVerticalForTesting isLgDown={true} navData={navData} openNav={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').should('have.attr', 'data-open', 'true')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('calls onCloseNav when triggered', () => {
      cy.mount(<NavVerticalForTesting isLgDown={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').click()
      cy.get('@onCloseNav').should('have.been.calledOnce')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })

  describe('desktop view', () => {
    it('renders vertical navigation', () => {
      cy.mount(<NavVerticalForTesting isLgDown={false} />)
      cy.get('[data-testid="mock-box"]').should('exist')
      cy.get('[data-testid="mock-nav-toggle-button"]').should('exist')
      cy.get('[data-testid="mock-stack"]').should('exist')
      cy.get('[data-testid="mock-scrollbar"]').should('exist')
      cy.get('[data-testid="mock-nav-section-vertical"]').should('exist')
      cy.get('[data-testid="mock-spacer"]').should('exist')
      cy.get('[data-testid="mock-vertical-drawer"]').should('not.exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('renders logo when LogoIcon is provided', () => {
      const MockLogoIcon = () => <div>Logo</div>
      cy.mount(<NavVerticalForTesting isLgDown={false} LogoIcon={MockLogoIcon} />)
      cy.get('[data-testid="mock-logo"]').should('exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('hides toggle button when hideToggleButton is true', () => {
      cy.mount(<NavVerticalForTesting isLgDown={false} hideToggleButton={true} />)
      cy.get('[data-testid="mock-nav-toggle-button"]').should('not.exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('calls setSettings when toggle button is clicked', () => {
      cy.mount(<NavVerticalForTesting isLgDown={false} />)
      cy.get('[data-testid="mock-nav-toggle-button"]').click()
      cy.get('@setSettings').should('have.been.calledOnce')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })
})
