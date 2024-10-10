import * as authHooks from '@baseapp-frontend/authentication'
import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { userMockData } from './__mocks__/user'
import AccountPopoverForTesting from './__utils__/AccountPopoverForTesting'

describe('AccountPopover', () => {
  beforeEach(() => {
    cy.stub(authHooks, 'useJWTUser').callsFake(() => ({
      user: userMockData,
    }))

    const logoutSpy = cy.spy().as('logoutSpy')
    cy.stub(authHooks, 'useLogout').callsFake(() => ({
      logout: logoutSpy,
    }))
  })

  it('should render the account popover and be able to interact with it', () => {
    const { environment } = createTestEnvironment()

    cy.mount(<AccountPopoverForTesting environment={environment} />)

    cy.findByRole('button').click()
    cy.get('.MuiPaper-root').should('exist')

    cy.contains(userMockData.firstName).should('exist')
    cy.contains(userMockData.lastName).should('exist')
    cy.contains(userMockData.email).should('exist')

    cy.contains('button', /logout/i).click()

    cy.get('@logoutSpy').should('have.been.calledOnce')
  })

  it('should render custom menu items', () => {
    const { environment } = createTestEnvironment()

    const menusMock = [
      {
        label: 'Menu1',
        onClick: cy.stub().as('menu1'),
      },
      {
        label: 'Menu2',
        onClick: cy.stub().as('menu2'),
      },
    ]
    cy.mount(<AccountPopoverForTesting environment={environment} menuItems={menusMock} />)

    cy.findByRole('button').click()

    cy.contains('li', /menu1/i).click()
    cy.get('@menu1').should('have.been.calledOnce')
    cy.wait(300) // wait for the menu to close
    cy.get('.MuiPaper-root').should('not.exist')

    cy.findByRole('button').click()

    cy.contains('li', /menu2/i).click()
    cy.get('@menu2').should('have.been.calledOnce')
    cy.wait(300) // wait for the menu to close
    cy.get('.MuiPaper-root').should('not.exist')
  })

  it('should render custom sections', () => {
    const { environment } = createTestEnvironment()

    const accountSectionMock = {
      show: true,
      items: [<div key="account-section">Account Section</div>],
    }

    const menuSectionMock = {
      show: true,
      items: [<div key="menu-section">Menu Section</div>],
    }

    const accountActionsSectionMock = {
      show: true,
      items: [<div key="account-actions-section">Account Actions Section</div>],
    }

    cy.mount(
      <AccountPopoverForTesting
        environment={environment}
        accountSection={accountSectionMock}
        menuSection={menuSectionMock}
        accountActionsSection={accountActionsSectionMock}
      />,
    )

    cy.findByRole('button').click()

    cy.contains('div', /account section/i).should('exist')
    cy.contains('div', /menu section/i).should('exist')
    cy.contains('div', /account actions section/i).should('exist')
  })

  it('should hide custom section', () => {
    const { environment } = createTestEnvironment()

    const accountSectionMock = {
      show: false,
      items: [],
    }

    cy.mount(
      <AccountPopoverForTesting environment={environment} accountSection={accountSectionMock} />,
    )

    cy.findByRole('button').click()

    cy.contains('div', /account section/i).should('not.exist')
  })

  it('should add and hide extra sections', () => {
    const { environment } = createTestEnvironment()

    const extraSectionsMock = [
      {
        show: true,
        items: [<div key="extra-section-1">Extra Section 1</div>],
      },
      {
        show: false,
        items: [<div key="extra-section-2">Extra Section 2</div>],
      },
    ]

    cy.mount(
      <AccountPopoverForTesting environment={environment} extraSections={extraSectionsMock} />,
    )

    cy.findByRole('button').click()

    cy.contains('div', /extra section 1/i).should('exist')
    cy.contains('div', /extra section 2/i).should('not.exist')
  })
})
