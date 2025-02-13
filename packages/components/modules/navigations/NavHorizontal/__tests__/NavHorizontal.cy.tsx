import '../../../../styles/tailwind/globals.css'
import { NavHorizontalForTesting } from './__utils__/NavHorizontalForTesting'

describe('NavHorizontal', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  describe('mobile view (lgDown)', () => {
    it('renders vertical drawer when on small screens', () => {
      cy.mount(<NavHorizontalForTesting isLgDown={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').should('exist')
      cy.get('[data-testid="mock-app-bar"]').should('not.exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('passes navigation data and state to drawer', () => {
      const navData = [
        {
          subheader: 'Test Section',
          items: [{ title: 'Test Item', path: '/test' }],
        },
      ]
      cy.mount(<NavHorizontalForTesting isLgDown={true} navData={navData} openNav={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').should('have.attr', 'data-open', 'true')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('handles drawer open/close interactions', () => {
      cy.mount(<NavHorizontalForTesting isLgDown={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').click()
      cy.get('@onCloseNav').should('have.been.calledOnce')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })

  describe('desktop view', () => {
    it('renders horizontal navigation bar on larger screens', () => {
      cy.mount(<NavHorizontalForTesting isLgDown={false} />)
      cy.get('[data-testid="mock-app-bar"]').should('exist')
      cy.get('[data-testid="mock-toolbar"]').should('exist')
      cy.get('[data-testid="mock-scrollbar"]').should('exist')
      cy.get('[data-testid="mock-nav-section-horizontal"]').should('exist')
      cy.get('[data-testid="mock-header-shadow"]').should('exist')
      cy.get('[data-testid="mock-vertical-drawer"]').should('not.exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('adapts to theme settings and highlights active items', () => {
      const settings = {
        themeMode: 'dark' as const,
        themeColorPresets: 'blue' as const,
        themeLayout: 'horizontal' as const,
        themeStretch: false,
        themeContrast: 'default' as const,
      }
      const navData = [
        {
          subheader: 'Test Section',
          items: [
            { title: 'Active Item', path: '/active', active: true },
            { title: 'Inactive Item', path: '/inactive' },
          ],
        },
      ]
      cy.mount(<NavHorizontalForTesting isLgDown={false} settings={settings} navData={navData} />)
      cy.get('[data-testid="mock-nav-section-horizontal"]')
        .should('have.attr', 'data-theme', 'dark')
        .and('have.attr', 'data-color', 'blue')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('provides horizontal scrolling for many navigation items', () => {
      const navData = [
        {
          subheader: 'Test Section',
          items: Array.from({ length: 10 }, (_, i) => ({
            title: `Item ${i}`,
            path: `/test${i}`,
          })),
        },
      ]
      cy.mount(<NavHorizontalForTesting isLgDown={false} navData={navData} />)
      cy.get('[data-testid="mock-scrollbar"]').should('exist')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })
})
