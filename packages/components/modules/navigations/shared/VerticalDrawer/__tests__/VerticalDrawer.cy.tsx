import '../../../../../styles/tailwind/globals.css'
import { VerticalDrawerForTesting } from './__utils__/VerticalDrawerForTesting'

describe('VerticalDrawer', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  it('renders drawer with correct structure', () => {
    cy.mount(<VerticalDrawerForTesting openNav={true} />)
    cy.get('[data-testid="mock-drawer"]').should('exist')
    cy.get('[data-testid="mock-scrollbar"]').should('exist')
    cy.get('[data-testid="mock-nav-section-vertical"]').should('exist')
    cy.get('[data-testid="mock-spacer"]').should('exist')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('displays logo when LogoIcon is provided', () => {
    const MockLogoIcon = () => <div>Logo</div>
    cy.mount(<VerticalDrawerForTesting openNav={true} LogoIcon={MockLogoIcon} />)
    cy.get('[data-testid="mock-logo"]').should('exist')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('displays navigation items correctly', () => {
    const navData = [
      {
        subheader: 'Test Group',
        items: [
          { title: 'Item 1', path: '/path1' },
          { title: 'Item 2', path: '/path2' },
        ],
      },
    ]
    cy.mount(<VerticalDrawerForTesting openNav={true} navData={navData} />)
    cy.get('[data-testid="mock-nav-item"]').should('have.length', 2)
    cy.get('[data-testid="mock-nav-item"]').first().should('contain', 'Item 1')
    cy.get('[data-testid="mock-nav-item"]').last().should('contain', 'Item 2')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('handles drawer open/close state', () => {
    cy.mount(<VerticalDrawerForTesting openNav={true} />)
    cy.get('[data-testid="mock-drawer"]').should('have.attr', 'data-open', 'true')

    cy.mount(<VerticalDrawerForTesting openNav={false} />)
    cy.get('[data-testid="mock-drawer"]').should('have.attr', 'data-open', 'false')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('calls onCloseNav when drawer is closed', () => {
    cy.mount(<VerticalDrawerForTesting openNav={true} />)
    cy.get('[data-testid="mock-drawer"]').click()
    cy.get('@onCloseNav').should('have.been.calledOnce')
    cy.get('@consoleError').should('not.have.been.called')
  })
})
