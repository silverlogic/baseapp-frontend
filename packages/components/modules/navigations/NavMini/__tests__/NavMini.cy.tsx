import '../../../../styles/tailwind/globals.css'
import { NavMiniForTesting } from './__utils__/NavMiniForTesting'

describe('NavMini', () => {
  beforeEach(() => {
    cy.spy(window.console, 'error').as('consoleError')
  })

  describe('mobile view (lgDown)', () => {
    it('renders vertical drawer', () => {
      cy.mount(<NavMiniForTesting isLgDown={true} />)
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
      cy.mount(<NavMiniForTesting isLgDown={true} navData={navData} openNav={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').should('have.attr', 'data-open', 'true')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('calls onCloseNav when triggered', () => {
      cy.mount(<NavMiniForTesting isLgDown={true} />)
      cy.get('[data-testid="mock-vertical-drawer"]').click()
      cy.get('@onCloseNav').should('have.been.calledOnce')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })

  describe('desktop view', () => {
    it('displays a compact mini navigation with icons only', () => {
      const navData = [
        {
          subheader: 'Test Section',
          items: [{ title: 'Test Item', path: '/test', icon: <div>icon</div> }],
        },
      ]
      cy.mount(<NavMiniForTesting isLgDown={false} navData={navData} />)
      cy.get('[data-testid="mock-nav-section-mini"]').should('exist')
      cy.get('[data-testid="mock-nav-item-icon"]').should('exist')
      cy.get('[data-testid="mock-nav-item-label"]').should('not.exist')
      cy.get('@consoleError').should('not.have.been.called')
    })

    it('expands and collapses navigation when toggle button is clicked', () => {
      const settings = {
        themeLayout: 'mini' as const,
        themeStretch: false,
        themeMode: 'light' as const,
        themeContrast: 'default' as const,
        themeColorPresets: 'default' as const,
      }

      cy.mount(<NavMiniForTesting isLgDown={false} settings={settings} />)

      // Initial collapsed state
      cy.get('[data-testid="mock-nav-section-mini"]').should('have.attr', 'data-collapsed', 'true')

      // Expand
      cy.get('[data-testid="mock-nav-toggle-button"]').click()
      cy.get('@setSettings')
        .invoke('getCalls')
        .then((calls) => {
          expect(calls[0].args[0].themeLayout).to.equal('vertical')
        })

      // Collapse
      cy.get('[data-testid="mock-nav-toggle-button"]').click()
      cy.get('@setSettings')
        .invoke('getCalls')
        .then((calls) => {
          expect(calls[1].args[0].themeLayout).to.equal('vertical')
        })

      cy.get('@consoleError').should('not.have.been.called')
    })

    it('displays logo and toggle button in correct positions', () => {
      const MockLogoIcon = () => <div>Logo</div>
      cy.mount(<NavMiniForTesting isLgDown={false} LogoIcon={MockLogoIcon} />)

      cy.get('[data-testid="mock-logo"]').should('exist')
      cy.get('[data-testid="mock-nav-toggle-button"]').should('exist')
      cy.get('[data-testid="mock-nav-toggle-button"]').click()
      cy.get('@setSettings').should('have.been.called')

      cy.get('@consoleError').should('not.have.been.called')
    })

    it('maintains correct layout structure', () => {
      cy.mount(<NavMiniForTesting isLgDown={false} />)
      cy.get('[data-testid="mock-box"]').should('exist')
      cy.get('[data-testid="mock-stack"]').should('exist')
      cy.get('@consoleError').should('not.have.been.called')
    })
  })
})
