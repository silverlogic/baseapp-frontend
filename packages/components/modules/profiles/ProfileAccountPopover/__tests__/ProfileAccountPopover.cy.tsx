import * as authHooks from '@baseapp-frontend/authentication'
import { createTestEnvironment } from '@baseapp-frontend/graphql'
import * as notificationsHooks from '@baseapp-frontend/utils'

import 'cypress-wait-until'

import { mockProfilesListData, mockUserProfileData } from './__mocks__/requests'
import ProfileAccountPopoverForTesting from './__utils__/ProfileAccountPopoverForTesting'

describe('ProfileAccountPopover', () => {
  const loadPopoverBasicStructure = (profilesSize: number) => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()

    cy.mount(<ProfileAccountPopoverForTesting environment={environment} />).then(() => {
      cy.waitUntil(() => environment.mock.getAllOperations().length > 0).then(() => {
        resolveMostRecentOperation({ data: mockUserProfileData })
      })
    })

    cy.findByRole('button').click()
    cy.get('.MuiPaper-root').should('exist')

    cy.contains(mockUserProfileData.data.me.profile.name).should('exist')
    cy.contains(mockUserProfileData.data.me.profile.urlPath.path).should('exist')

    const profileListData = mockProfilesListData(profilesSize)

    cy.contains('button', /switch profile/i)
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileListData })
      })

    return { environment, resolveMostRecentOperation, profileListData }
  }

  beforeEach(() => {
    const logoutSpy = cy.spy().as('logoutSpy')
    cy.stub(authHooks, 'useLogout').callsFake(() => ({
      logout: logoutSpy,
    }))

    const sendToastSpy = cy.spy().as('sendToastSpy')
    cy.stub(notificationsHooks, 'useNotification').callsFake(() => ({
      sendToast: sendToastSpy,
    }))
  })

  it('should render the profiles account popover and be able to interact with it', () => {
    const { profileListData } = loadPopoverBasicStructure(2)

    profileListData.data.me.profiles.forEach((profile) => {
      cy.contains('li', profile.name).should('exist')
      cy.contains('li', profile.urlPath.path).should('exist')
    })

    cy.contains(profileListData.data.me.profiles[1].name).click()
    cy.get('@sendToastSpy').should('have.been.calledOnce')
  })

  it('should close the switch profile submenu when clicking on cancel', () => {
    const { profileListData } = loadPopoverBasicStructure(2)

    profileListData.data.me.profiles.slice(1).forEach((profile) => {
      cy.contains('li', profile.name).should('exist')
      cy.contains('li', profile.urlPath.path).should('exist')
    })

    cy.contains('button', /cancel/i).click()

    profileListData.data.me.profiles.slice(1).forEach((profile) => {
      cy.contains('li', profile.name).should('not.exist')
      cy.contains('li', profile.urlPath.path).should('not.exist')
    })
  })

  it('should render more than 5 profiles with scrollbar', () => {
    const { profileListData } = loadPopoverBasicStructure(5)

    profileListData.data.me.profiles.forEach((profile) => {
      cy.contains('li', profile.name).should('exist')
      cy.contains('li', profile.urlPath.path).should('exist')
    })

    cy.get('.MuiList-root')
      .should('have.css', 'overflow-y', 'auto')
      .then(($el) => {
        const hasVerticalScroll = $el[0].scrollHeight > $el[0].clientHeight
        expect(hasVerticalScroll).to.equal(true)
      })

    cy.get('li:visible').should('have.length.gte', 5)
  })

  it('should not show the success toast when profile is not changed', () => {
    const { profileListData } = loadPopoverBasicStructure(2)

    cy.contains(profileListData.data.me.profiles[0].name).click()
    cy.get('@sendToastSpy').should('not.have.been.called')

    profileListData.data.me.profiles.forEach((profile) => {
      cy.contains('li', profile.name).should('not.exist')
      cy.contains('li', profile.urlPath.path).should('not.exist')
    })
  })

  // it('should not use other user current profile as the current profile', () => {})

  // it('should erase current profile when user logs out', () => {})

  // it('should erase old current profile when user logs in with a different user', () => {})

  // it('should fallback to the default AccountPopover when there is no current profile', () => {})

  // it('should fallback to the default AccountPopover when the user profile fetch fails', () => {})

  // it('should get the user from the local storage and not trigger the user profile fetch')
})
