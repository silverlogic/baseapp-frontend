import * as authHooks from '@baseapp-frontend/authentication'
import { createTestEnvironment } from '@baseapp-frontend/graphql'
import * as utilsPackage from '@baseapp-frontend/utils'

import 'cypress-wait-until'

import { ProfileItemFragment$data } from '../../../../__generated__/ProfileItemFragment.graphql'
import { CURRENT_PROFILE_STORAGE_KEY } from '../../context/CurrentProfileProvider/constants'
import { CurrentProfileState } from '../../context/CurrentProfileProvider/types'
import { ProfileAccountPopoverProps } from '../types'
import {
  emptyMockUserProfileData,
  mockProfilesListFactory,
  mockUserProfileData,
  mockUserProfileFactory,
} from './__mocks__/requests'
import { userMockData, userMockData2 } from './__mocks__/user'
import ProfileAccountPopoverForTesting from './__utils__/ProfileAccountPopoverForTesting'

describe('ProfileAccountPopover', () => {
  const loadPopoverBasicStructure = (
    profilesSize: number,
    openSwitchProfileList: boolean = true,
    mountProps?: ProfileAccountPopoverProps,
  ) => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()

    cy.stub(authHooks, 'useJWTUser').callsFake(() => ({
      user: userMockData,
    }))

    cy.mount(<ProfileAccountPopoverForTesting environment={environment} {...mountProps} />).then(
      () => {
        cy.waitUntil(() => environment.mock.getAllOperations().length > 0).then(() => {
          resolveMostRecentOperation({ data: mockUserProfileData })
        })
      },
    )

    cy.findByRole('button').click()
    cy.get('.MuiPaper-root').should('exist')

    cy.contains(mockUserProfileData.data.me.profile.name).should('exist')
    cy.contains(mockUserProfileData.data.me.profile.urlPath.path).should('exist')

    const profileListData = mockProfilesListFactory(
      profilesSize,
      mockUserProfileData.data.me.profile,
    )

    if (openSwitchProfileList) {
      cy.contains('button', /switch profile/i)
        .click()
        .then(() => {
          resolveMostRecentOperation({ data: profileListData })
        })
    }

    return { environment, resolveMostRecentOperation, profileListData }
  }

  const loadPreStoredData = (customUserMockData: any, customUserProfileMockData: any) => {
    const storedCurrentProfile: CurrentProfileState = {
      profile: customUserProfileMockData.data.me.profile as ProfileItemFragment$data,
      userId: customUserMockData.id,
    }

    cy.window().then((win) => {
      win.localStorage.setItem(
        CURRENT_PROFILE_STORAGE_KEY,
        JSON.stringify({ state: storedCurrentProfile, version: 0 }),
      )
    })
  }

  beforeEach(() => {
    const sendToastSpy = cy.spy().as('sendToastSpy')
    cy.stub(utilsPackage, 'useNotification').callsFake(() => ({
      sendToast: sendToastSpy,
    }))
    cy.viewport('iphone-6')
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
        const hasVerticalScroll = ($el[0]?.scrollHeight ?? 0) > ($el[0]?.clientHeight ?? 0)
        expect(hasVerticalScroll).to.equal(true)
      })

    cy.get('li:visible').should('have.length.gte', 5)
  })

  it('should not show the success toast when profile is not changed', () => {
    const { profileListData } = loadPopoverBasicStructure(2)

    cy.contains(profileListData.data.me.profiles[0].name).click()
    cy.get('@sendToastSpy').should('not.have.been.called')

    profileListData.data.me.profiles.forEach((profile) => {
      cy.contains('li', profile.name).should('exist')
      cy.contains('li', profile.urlPath.path).should('exist')
    })
  })

  it('should get the user from the local storage and not trigger the user profile fetch', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()
    const newUserProfileMockData = mockUserProfileFactory('user-profile-2')

    loadPreStoredData(userMockData, newUserProfileMockData)

    cy.stub(authHooks, 'useJWTUser').callsFake(() => ({
      user: userMockData,
    }))

    cy.mount(<ProfileAccountPopoverForTesting environment={environment} />)

    cy.findByRole('button').click()
    cy.get('.MuiPaper-root').should('exist')

    cy.contains(newUserProfileMockData.data.me.profile.name).should('exist')
    cy.contains(newUserProfileMockData.data.me.profile.urlPath.path).should('exist')

    const profileListData = mockProfilesListFactory(2, newUserProfileMockData.data.me.profile)

    cy.contains('button', /switch profile/i)
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileListData })
      })

    profileListData.data.me.profiles.forEach((profile) => {
      cy.contains('li', profile.name).should('exist')
      cy.contains('li', profile.urlPath.path).should('exist')
    })
  })

  it('should not use other user current profile as the current profile', () => {
    const diffUserProfileMockData = mockUserProfileFactory('user-profile-2')
    loadPreStoredData(userMockData2, diffUserProfileMockData)

    const { profileListData } = loadPopoverBasicStructure(2)

    profileListData.data.me.profiles.forEach((profile) => {
      cy.contains('li', profile.name).should('exist')
      cy.contains('li', profile.urlPath.path).should('exist')
    })
  })

  it('should erase current profile when user logs out', () => {
    loadPopoverBasicStructure(2)

    cy.window().then((win) => {
      const currentProfileState = JSON.parse(
        win.localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY) ?? '{}',
      )
      expect(currentProfileState.state?.profile).to.be.not.undefined // eslint-disable-line @typescript-eslint/no-unused-expressions
    })

    cy.contains('button', /logout/i).click()

    cy.window().then((win) => {
      const currentProfileState = JSON.parse(
        win.localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY) ?? '{}',
      )
      expect(currentProfileState.state?.profile).to.be.undefined // eslint-disable-line @typescript-eslint/no-unused-expressions
    })
  })

  it('should fallback to the default AccountPopover when there is no current profile', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()

    cy.stub(authHooks, 'useJWTUser').callsFake(() => ({
      user: userMockData,
    }))

    cy.mount(<ProfileAccountPopoverForTesting environment={environment} />).then(() => {
      cy.waitUntil(() => environment.mock.getAllOperations().length > 0).then(() => {
        resolveMostRecentOperation({ data: emptyMockUserProfileData })
      })
    })

    cy.findByRole('button').click()
    cy.get('.MuiPaper-root').should('exist')

    cy.contains(userMockData.firstName).should('exist')
    cy.contains(userMockData.lastName).should('exist')
    cy.contains(userMockData.email).should('exist')
  })

  it('should fallback to the default AccountPopover when the user profile fetch fails', () => {
    const { environment, rejectMostRecentOperation } = createTestEnvironment()

    cy.stub(authHooks, 'useJWTUser').callsFake(() => ({
      user: userMockData,
    }))

    cy.mount(<ProfileAccountPopoverForTesting environment={environment} />).then(() => {
      cy.waitUntil(() => environment.mock.getAllOperations().length > 0).then(() => {
        rejectMostRecentOperation("Error finding user's profile")
      })
    })

    cy.findByRole('button').click()
    cy.get('.MuiPaper-root').should('exist')

    cy.contains(userMockData.firstName).should('exist')
    cy.contains(userMockData.lastName).should('exist')
    cy.contains(userMockData.email).should('exist')
  })

  it('should show the custom labels sent through props', () => {
    const { resolveMostRecentOperation, profileListData } = loadPopoverBasicStructure(2, false, {
      switchProfileLabel: 'Switch Organization',
      addNewProfileLabel: 'Add new Organization',
      logoutButtonLabel: 'Sign out',
      ProfilesSubmenusListProps: {
        cancelLabel: 'Back',
      },
    })

    cy.contains('button', /switch organization/i)
      .should('exist')
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileListData })
      })

    cy.contains('button', /back/i).should('exist')
    cy.contains('button', /add new organization/i).should('exist')
    cy.contains('button', /sign out/i).should('exist')
  })

  it('should change the profiles submenus list style through props', () => {
    loadPopoverBasicStructure(6, true, {
      ProfilesSubmenusListProps: {
        listMaxHeight: 240,
        MenuItemProps: {
          width: 24,
          height: 24,
        },
      },
    })

    cy.get('li:visible').should('have.length.gte', 4)
    cy.get('li > .MuiAvatar-root').each(($avatar) => {
      cy.wrap($avatar).within(() => {
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
})
