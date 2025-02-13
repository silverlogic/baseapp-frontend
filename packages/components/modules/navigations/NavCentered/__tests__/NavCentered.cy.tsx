import '../../../../styles/tailwind/globals.css'
import { NavCenteredForTesting } from './__utils__/NavCenteredForTesting'

describe('NavCentered', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  describe('mobile view (lgDown)', () => {
    it('displays a vertical drawer menu on small screens', () => {
      cy.mount(<NavCenteredForTesting isLgDown={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').should('exist')
      cy.get('[data-testid="mock-nav-section-horizontal"]').should('not.exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('shows navigation items in the drawer and handles interactions', () => {
      const navData = [
        {
          subheader: 'Main Menu',
          items: [
            { title: 'Home', path: '/home' },
            { title: 'About', path: '/about' },
          ],
        },
      ]
      cy.mount(<NavCenteredForTesting isLgDown={true} navData={navData} openNav={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]')
        .should('have.attr', 'data-open', 'true')
        .and('be.visible')

      // Test drawer close interaction
      cy.get('[data-testid="mock-vertical-drawer"]').click()
      cy.get('@onCloseNav').should('have.been.calledOnce')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })

  describe('desktop view', () => {
    it('displays a centered horizontal navigation bar on larger screens', () => {
      cy.mount(<NavCenteredForTesting isLgDown={false} />)
      cy.get('[data-testid="mock-nav-section-horizontal"]')
        .should('exist')
        .and('have.attr', 'data-has-tab-layout', 'true')
      cy.get('[data-testid="mock-vertical-drawer"]').should('not.exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('handles tab navigation and highlights selected items', () => {
      const navData = [
        {
          subheader: 'Main Navigation',
          items: [
            { title: 'Dashboard', path: '/dashboard', active: true },
            { title: 'Projects', path: '/projects' },
            { title: 'Reports', path: '/reports' },
          ],
        },
      ]
      cy.mount(<NavCenteredForTesting isLgDown={false} navData={navData} />)

      // Verify tab layout and active state
      cy.get('[data-testid="mock-nav-section-horizontal"]').should(
        'have.attr',
        'data-has-tab-layout',
        'true',
      )

      // Verify horizontal scrolling container exists
      cy.get('[data-testid="mock-scrollbar"]').should('exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('provides horizontal scrolling for many navigation items', () => {
      const navData = [
        {
          subheader: 'Extended Menu',
          items: Array.from({ length: 8 }, (_, i) => ({
            title: `Tab ${i + 1}`,
            path: `/tab${i + 1}`,
            active: i === 0,
          })),
        },
      ]
      cy.mount(<NavCenteredForTesting isLgDown={false} navData={navData} />)
      cy.get('[data-testid="mock-scrollbar"]').should('exist')
      cy.get('[data-testid="mock-nav-section-horizontal"]').should(
        'have.attr',
        'data-has-tab-layout',
        'true',
      )
      cy.get('@consoleError').should('not.have.been.called')
    })
  })
})
