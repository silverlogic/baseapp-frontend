import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { mockUserProfileData } from './__mocks__/requests'
import ProfileAccountPopoverForTesting from './__utils__/ProfileAccountPopoverForTesting'

describe('ProfileAccountPopover', () => {
  it('should render the profiles account popover and be able to interact with it', () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()

    cy.mount(<ProfileAccountPopoverForTesting environment={environment} />).then(() => {
      // FIXME: it's not working properly yet.
      resolveMostRecentOperation({ data: mockUserProfileData })
    })
  })
})
