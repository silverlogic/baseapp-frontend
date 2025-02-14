import { graphql, useLazyLoadQuery } from 'react-relay'

import ProfileComponent from '../..'
import { ProfileComponentWithQuery as Query } from '../../../../../../__generated__/ProfileComponentWithQuery.graphql'
import { ProfileComponentFragment$key } from '../../../../../__generated__/ProfileComponentFragment.graphql'

interface ProfileComponentWithQueryProps {
  currentProfileId: string
}

const ProfileComponentWithQuery = ({ currentProfileId }: ProfileComponentWithQueryProps) => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query ProfileComponentWithQuery @relay_test_operation {
        profile(id: "test-id") {
          ...ProfileComponentFragment
        }
      }
    `,
    {},
  )

  return (
    <ProfileComponent
      profile={data.profile as ProfileComponentFragment$key}
      currentProfileId={currentProfileId}
    />
  )
}

export default ProfileComponentWithQuery
