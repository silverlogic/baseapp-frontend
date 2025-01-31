import '../../../../../styles/tailwind/globals.css'
import { NavSectionMiniForTesting } from './__utils__/NavSectionMiniForTesting'

describe('NavSectionMini', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  it('renders navigation section with default gap', () => {
    cy.mount(<NavSectionMiniForTesting />)
    cy.get('[data-testid="mock-nav-section"]').should('exist').and('have.attr', 'data-gap', '4')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('renders navigation items with correct structure', () => {
    cy.mount(<NavSectionMiniForTesting />)
    cy.get('[data-testid="mock-nav-list"]').should('exist')
    cy.get('[data-testid="mock-nav-item"]').should('exist').and('have.attr', 'data-depth', '1')
    cy.get('[data-testid="mock-icon"]').should('exist')
    cy.get('[data-testid="mock-title"]').should('contain', 'Test Item')
    cy.get('[data-testid="mock-chevron"]').should('exist')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('renders child items in popover', () => {
    cy.mount(<NavSectionMiniForTesting />)
    cy.get('[data-testid="mock-popover"]').should('exist')
    cy.get('[data-testid="mock-nav-list"]').last().should('have.attr', 'data-depth', '2')
    cy.get('[data-testid="mock-title"]').last().should('contain', 'Child Item')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('applies custom gap from slotProps', () => {
    cy.mount(<NavSectionMiniForTesting slotProps={{ gap: 8 }} />)
    cy.get('[data-testid="mock-nav-section"]').should('have.attr', 'data-gap', '8')
    cy.get('@consoleError').should('not.have.been.called')
  })
})
