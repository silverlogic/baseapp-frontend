import { createTestEnvironment } from '@baseapp-frontend/graphql'

import {
  allRolesMembersListMockData,
  fullMembersListMockData,
  fullMembersListNextPageMockData,
  simpleMembersListMockData,
  updateMemberRoleMockData,
} from './__mocks__/requests'
import MembersForTesting from './__utils__/MembersForTesting'

describe('Members', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  })

  it('renders MembersListItem correctly', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()
    cy.mount(<MembersForTesting environment={environment} />).then(() => {
      resolveMostRecentOperation({ data: allRolesMembersListMockData })
    })

    cy.step('renders pending member correctly (Name, Role, Status, Avatar)')
    cy.findByText('Pending Profile').should('exist')
    cy.findByText('Pending').should('exist')
    cy.findByText('Pending Profile').parent().parent().should('have.css', 'opacity', '0.6')
    cy.get('img[src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/django.svg"]').should(
      'exist',
    )

    cy.step('renders inactive member correctly (Name, Role, Status, Avatar)')
    cy.findByText('Inactive Profile').should('exist')
    cy.findByText('Inactive').should('exist')
    cy.findByText('Inactive Profile').parent().parent().should('have.css', 'opacity', '0.6')
    cy.get(
      'img[src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/javascript.svg"]',
    ).should('exist')

    cy.step('renders profile owner correctly (Name, Role, Status, Avatar)')
    cy.findByText('Owner Profile').should('exist')
    cy.findByText('Owner').should('exist')
    cy.findByText('Owner Profile').parent().parent().should('have.css', 'opacity', '1')
    cy.get('img[src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg"]').should(
      'exist',
    )

    cy.step('renders active member correctly (Name, Role, Status, Avatar)')
    cy.findByText('Manager Profile').should('exist')
    cy.findByText('Manager').should('exist')
    cy.findByText('Manager Profile').parent().parent().should('have.css', 'opacity', '1')

    cy.step('checks members order')
    cy.findByText('Pending Profile')
      .parent()
      .parent()
      .then(($pending) => {
        cy.findByText('Inactive Profile')
          .parent()
          .parent()
          .then(($inactive) => {
            cy.findByText('Owner Profile')
              .parent()
              .parent()
              .then(($owner) => {
                cy.findByText('Manager Profile')
                  .parent()
                  .parent()
                  .then(($active) => {
                    const pendingProfileOffset = $pending.offset()?.top || 0
                    const inactiveProfileOffset = $inactive.offset()?.top || 0
                    const ownerProfileOffset = $owner.offset()?.top || 0
                    const activeProfileOffset = $active.offset()?.top || 0

                    // pending is before all
                    expect(pendingProfileOffset).to.be.lessThan(
                      inactiveProfileOffset && ownerProfileOffset && activeProfileOffset,
                    )
                    // inactive is before owner and after pending
                    expect(inactiveProfileOffset).not.to.be.lessThan(pendingProfileOffset)
                    expect(inactiveProfileOffset).to.be.lessThan(
                      ownerProfileOffset && activeProfileOffset,
                    )
                    // owner is before active and after inactive
                    expect(ownerProfileOffset).not.to.be.lessThan(inactiveProfileOffset)
                    expect(ownerProfileOffset).to.be.lessThan(activeProfileOffset)
                    // active is at bottom
                    expect(activeProfileOffset).not.to.be.lessThan(
                      inactiveProfileOffset && ownerProfileOffset && pendingProfileOffset,
                    )
                  })
              })
          })
      })
  })

  it('can change role of MembersListItem and it shows confirm dialog', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()
    cy.mount(<MembersForTesting environment={environment} />).then(() => {
      resolveMostRecentOperation({ data: simpleMembersListMockData })
    })

    cy.step("it opens the role's dropdown")
    cy.findByText('Manager Profile').should('exist')
    cy.findByText('Manager').should('exist')
    cy.findByText('Manager').click()

    cy.step('it shows the role options and clicks on admin option')
    cy.findByRole('option', { name: /manager/i }).should('exist')
    cy.findByRole('option', { name: /admin/i }).should('exist')
    cy.findByRole('option', { name: /admin/i }).click()

    cy.step('it shows the confirm dialog')
    cy.findByText(/change user permissions?/i).should('exist')
    cy.findByRole('button', { name: 'Confirm' }).should('exist')
    cy.findByRole('button', { name: 'Back' }).should('exist')
    cy.findByText(
      'Are you sure you want to promote this member to an admin? They will have full administrative rights, including the ability to manage members and settings.',
    ).should('exist')

    cy.step('can cancel and close the dialog')
    cy.findByRole('button', { name: 'Back' }).click()
    cy.findByText(/change user permissions?/i).should('not.exist')

    cy.step('can confirm and close the dialog')
    cy.findByText('Manager').click()
    cy.findByRole('option', { name: /admin/i }).click()
    cy.findByRole('button', { name: 'Confirm' })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: updateMemberRoleMockData })
      })
    cy.findByText(/change user permissions?/i).should('not.exist')
  })

  it('renders MembersList correctly', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()
    cy.mount(<MembersForTesting environment={environment} />).then(() => {
      resolveMostRecentOperation({ data: fullMembersListMockData })
    })
    const numberOfMembers = fullMembersListMockData.data.profile.members.edges.length + 1

    cy.step('should render the correct number of members and the search bar')
    cy.findByText(`${numberOfMembers} members`).should('exist')

    cy.step('can scroll to the bottom and load more members')
    cy.findByText('Manager Profile 1').should('exist')
    cy.findByText('Manager Profile 2').should('exist')
    cy.findByText('Manager Profile 3').should('exist')
    cy.findByText('Manager Profile 4').should('exist')
    cy.findByText('Manager Profile 5').should('exist')
    cy.findByText('Manager Profile 6').should('exist').scrollIntoView()
    cy.findByText('Manager Profile 7').should('not.exist')
    cy.findByText('Manager Profile 8').should('not.exist')
    cy.findByText('Manager Profile 9').should('not.exist')

    cy.step('see the loading state')
    cy.findByRole('progressbar')
      .should('exist')
      .scrollIntoView()
      .then(() => {
        resolveMostRecentOperation({
          data: fullMembersListNextPageMockData,
        })
      })

    cy.step('loader should disappear')
    cy.findByRole('progressbar').should('not.exist')

    cy.step('see the next members')
    cy.findByText('Manager Profile 7').should('exist').scrollIntoView()
    cy.findByText('Manager Profile 8').should('exist').scrollIntoView()
    cy.findByText('Manager Profile 9').should('exist').scrollIntoView()
  })

  it('can filter members by name', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()
    cy.mount(<MembersForTesting environment={environment} />).then(() => {
      resolveMostRecentOperation({ data: simpleMembersListMockData })
    })

    cy.step('show all members')
    cy.findByText('Manager Profile').should('exist')
    cy.findByText('Owner Profile').should('exist')

    cy.step('make sure search bar exists and can filter members by name')
    cy.findByPlaceholderText(/search/i).should('exist')
    cy.findByPlaceholderText(/search/i).type('Manager Profile')
    cy.findByText('Manager Profile').should('exist')
    cy.findByText('Owner Profile').should('not.exist')

    cy.step('can clear the search')
    cy.findByPlaceholderText(/search/i).clear()
    cy.findByText('Manager Profile').should('exist')
    cy.findByText('Owner Profile').should('exist')
  })
})
