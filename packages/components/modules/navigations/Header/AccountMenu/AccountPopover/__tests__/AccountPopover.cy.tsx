import * as authHooks from '@baseapp-frontend/authentication'
import { createTestEnvironment } from '@baseapp-frontend/graphql'
import * as utilsPackage from '@baseapp-frontend/utils'

import 'cypress-wait-until'

import {
  mockAddProfileData,
  mockProfilesListFactory,
  mockUserProfileData,
} from './__mocks__/profiles'
import { userMockData } from './__mocks__/user'
import AccountPopoverForTesting from './__utils__/AccountPopoverForTesting'

describe('AccountPopover', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')

    cy.stub(authHooks, 'useJWTUser').callsFake(() => ({
      user: userMockData,
    }))

    const logoutSpy = cy.spy().as('logoutSpy')
    cy.stub(authHooks, 'useLogout').callsFake(() => ({
      logout: logoutSpy,
    }))

    const sendToastSpy = cy.spy().as('sendToastSpy')
    cy.stub(utilsPackage, 'useNotification').callsFake(() => ({
      sendToast: sendToastSpy,
    }))
  })

  it('should render the account popover without profile and be able to interact with it', () => {
    const { environment } = createTestEnvironment()

    cy.mount(<AccountPopoverForTesting environment={environment} initialProfile={null} />)

    cy.findByRole('button').click()

    cy.contains(userMockData.firstName).should('exist')
    cy.contains(userMockData.lastName).should('exist')
    cy.contains(userMockData.email).should('exist')

    cy.findByRole('menuitem', { name: /logout/i }).click()

    cy.get('@logoutSpy').should('have.been.calledOnce')
  })

  it('should render the account popover with profile and be able to interact with it', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()

    cy.mount(
      <AccountPopoverForTesting environment={environment} initialProfile={mockUserProfileData} />,
    )

    cy.findByRole('button').click()

    cy.contains(mockUserProfileData.name).should('exist')
    cy.contains(mockUserProfileData.urlPath).should('exist')

    // Step 1.
    cy.step('should be able to switch profile')

    const profileListData = mockProfilesListFactory(mockUserProfileData)

    cy.findByRole('menuitem', { name: /switch profile/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: mockAddProfileData() })
      })
      .then(() => {
        resolveMostRecentOperation({ data: profileListData })
      })

    profileListData.data.me.profiles.edges.forEach((profile) => {
      cy.findAllByText(profile.node?.name!).should('exist')
      cy.findAllByText(profile.node?.urlPath?.path!).should('exist').scrollIntoView()
    })

    cy.findByLabelText(`Switch to ${profileListData.data.me.profiles.edges[9]?.node.name}`).click()
    cy.get('@sendToastSpy').should('have.been.calledOnce')

    // Step 2.
    cy.step('should show 5 profiles and allow scrolling thru the profiles list')

    cy.findByRole('menuitem', { name: /switch profile/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileListData })
      })

    cy.findByLabelText('List of available profiles')

    cy.findAllByLabelText(/^switch to/i)
      .filter(':visible')
      .should('have.length.lte', 5)

    // Step 3.
    cy.step('should be able to cancel the profile switch')

    cy.findByRole('menuitem', { name: /cancel/i }).click()

    // Step 4.
    cy.step('should not show the success toast when profile is not changed')

    cy.findByRole('menuitem', { name: /switch profile/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileListData })
      })

    cy.findByLabelText(`Switch to ${profileListData.data.me.profiles.edges[1]?.node.name}`).click()
  })

  it('should show all sub-components custom props', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()

    cy.mount(
      <AccountPopoverForTesting
        environment={environment}
        initialProfile={mockUserProfileData}
        MenuItemsProps={{
          menuItems: [
            {
              label: 'Custom Menu Item',
              onClick: () => {},
            },
          ],
        }}
        SwitchProfileMenuProps={{ switchProfileLabel: 'Change profile' }}
        ProfilesListProps={{
          cancelLabel: 'Close',
          listMaxHeight: 240,
          MenuItemProps: {
            width: 24,
            height: 24,
          },
        }}
        AddProfileMenuItemProps={{ addNewProfileLabel: 'Add organization' }}
        LogoutItemProps={{ logoutButtonLabel: 'Sign Out' }}
      />,
    )

    cy.findByRole('button').click()

    // Step 1.
    cy.step('should show custom menu item')

    cy.findByRole('menuitem', { name: /custom menu item/i }).should('exist')

    // Step 2.
    cy.step('should show custom switch profile label')

    cy.findByRole('menuitem', { name: /change profile/i }).should('exist')

    // Step 3.
    cy.step('should show profile list customizations')

    const profileListData = mockProfilesListFactory(mockUserProfileData)
    cy.findByRole('menuitem', { name: /change profile/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: mockAddProfileData() })
      })
      .then(() => {
        resolveMostRecentOperation({ data: profileListData })
      })

    cy.findByRole('menuitem', { name: /close/i }).should('exist')

    cy.findByLabelText('List of available profiles').within(() => {
      cy.get('li:visible').each(($li) => {
        cy.wrap($li)
          .find('.MuiAvatar-root')
          .within(($avatar) => {
            cy.get('img').then(($img) => {
              if ($img.length && $img.attr('width') && $img.attr('height')) {
                cy.wrap($img).should('have.attr', 'width', '24')
                cy.wrap($img).should('have.attr', 'height', '24')
              } else {
                cy.wrap($avatar).should('have.attr', 'width', '24')
                cy.wrap($avatar).should('have.attr', 'height', '24')
              }
            })
          })
      })
    })

    // Step 4.
    cy.step('should show custom add profile label')

    cy.findByRole('menuitem', { name: /add organization/i }).should('exist')

    // Step 5.
    cy.step('should show custom logout button label')

    cy.findByRole('menuitem', { name: /sign out/i }).should('exist')
  })
})
