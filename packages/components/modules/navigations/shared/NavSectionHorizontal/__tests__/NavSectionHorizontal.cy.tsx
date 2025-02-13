import '../../../../../styles/tailwind/globals.css'
import { NavSectionHorizontalForTesting } from './__utils__/NavSectionHorizontalForTesting'

describe('NavSectionHorizontal', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  it('renders navigation items horizontally', () => {
    cy.mount(<NavSectionHorizontalForTesting />)
    cy.get('[data-testid="mock-nav-section"]').should('exist')
    cy.get('[data-testid="mock-nav-container"]').should('exist')
    cy.get('[data-testid="mock-nav-list"]').should('have.length', 2)
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('displays navigation items with correct content', () => {
    cy.mount(<NavSectionHorizontalForTesting />)
    cy.get('[data-testid="mock-nav-item"]')
      .first()
      .within(() => {
        cy.get('[data-testid="mock-icon"]').should('exist')
        cy.get('[data-testid="mock-title"]').should('contain', 'Test Item 1')
      })
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('applies tab layout styling when hasTabLayout is true', () => {
    cy.mount(<NavSectionHorizontalForTesting hasTabLayout={true} />)
    cy.get('[data-testid="mock-nav-section"]').should('have.attr', 'data-tab-layout', 'true')
    cy.get('[data-testid="mock-nav-list"]').should('have.attr', 'data-tab-layout', 'true')
    cy.get('[data-testid="mock-nav-item"]').should('have.attr', 'data-tab-layout', 'true')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('handles active state for navigation items', () => {
    const navData = [
      {
        subheader: 'Test Group',
        items: [
          {
            title: 'Test Item 1',
            path: '/test1',
            icon: <div>icon1</div>,
            active: false,
          },
          {
            title: 'Test Item 2',
            path: '/test2',
            icon: <div>icon2</div>,
            active: true,
          },
        ],
      },
    ]
    cy.mount(<NavSectionHorizontalForTesting navData={navData} />)
    cy.get('[data-testid="mock-nav-item"]').first().should('have.attr', 'data-active', 'false')
    cy.get('[data-testid="mock-nav-item"]').last().should('have.attr', 'data-active', 'true')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('applies custom styles from slotProps', () => {
    const customSlotProps = {
      rootItem: { color: 'primary' },
      subItem: { color: 'secondary' },
    }
    cy.mount(<NavSectionHorizontalForTesting slotProps={customSlotProps} />)
    cy.get('[data-testid="mock-nav-list"]').should('exist')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('handles disabled navigation items', () => {
    const navData = [
      {
        subheader: 'Test Group',
        items: [
          {
            title: 'Disabled Item',
            path: '/disabled',
            disabled: true,
          },
        ],
      },
    ]
    cy.mount(<NavSectionHorizontalForTesting navData={navData} />)
    cy.get('[data-testid="mock-nav-item"]').should('have.attr', 'data-disabled', 'true')
    cy.get('@consoleError').should('not.have.been.called')
  })
})
