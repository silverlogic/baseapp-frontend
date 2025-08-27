import { graphql, useLazyLoadQuery } from 'react-relay'

import { ProfileComponentFragment$key } from '../../../../../../../__generated__/ProfileComponentFragment.graphql'
import { ProfileSettingsForTestingQuery } from '../../../../../../../__generated__/ProfileSettingsForTestingQuery.graphql'
import { withComponentCompleteTestProviders } from '../../../../../../tests/web'
import ProfileSettings from '../../../index'
import { ProfileSettingsComponentProps } from '../../../types'

const ProfileSettingsForTesting = (props?: Partial<ProfileSettingsComponentProps>) => {
  const data = useLazyLoadQuery<ProfileSettingsForTestingQuery>(
    graphql`
      query ProfileSettingsForTestingQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...ProfileComponentFragment
        }
      }
    `,
    {},
  )

  return <ProfileSettings {...props} profile={data.target as ProfileComponentFragment$key} />
}

export default withComponentCompleteTestProviders(ProfileSettingsForTesting)
